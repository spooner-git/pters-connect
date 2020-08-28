# Create your views here.
import base64
import hashlib
import hmac
import json
import random
import time
import httplib2

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.utils import timezone

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.account.serializers import SmsAuthSerializer
from apps.account.models import SmsAuthTb
from configs import settings


# Sms 인증 번호 요청
class SmsAuthAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        request_data = request.data.copy()
        max_range = 99999
        auth_number = str(random.randrange(0, max_range)).zfill(len(str(max_range)))
        request_data['auth_check'] = False
        request_data['auth_number'] = auth_number
        serializer = SmsAuthSerializer(data=request_data)

        if serializer.is_valid():
            serializer.save()
            error = func_send_sms_auth(request_data['phone_number'], auth_number, 'PTERS-CONNECT')
            if error is None:
                return Response(serializer.data, status=201)
            else:
                return Response({"fail": error}, status=400)

        return Response(serializer.errors, status=400)


# Sms 인증 번호 확인
class SmsAuthCheckAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        error = None

        try:
            sms_auth_info = SmsAuthTb.objects.filter(phone_number=request.data['phone_number']).latest('id')
        except ObjectDoesNotExist:
            raise Http404

        if str(sms_auth_info.auth_number) == str(request.data['auth_number']):
            time_interval = (timezone.now() - sms_auth_info.reg_dt).total_seconds()

            if int(time_interval) < int(settings.SMS_ACTIVATION_SECONDS):
                sms_auth_info.auth_check = True
                sms_auth_info.save()
            else:
                error = '입력 시한이 지났습니다.'
        else:
            error = '인증번호를 다시 확인해주세요.'

        if error is None:
            return Response({"success": "ok"}, status=201)

        return Response({"fail": error}, status=400)


def func_send_sms_auth(phone, activation_number, app_name):
    error = None
    h = httplib2.Http()
    acc_key_id = settings.PTERS_NAVER_ACCESS_KEY_ID
    acc_sec_key = settings.PTERS_NAVER_SECRET_KEY.encode('utf-8')

    sms_uri = "/sms/v2/services/{}/messages".format(settings.PTERS_NAVER_SMS_API_KEY_ID)
    sms_url = "https://sens.apigw.ntruss.com{}".format(sms_uri)

    now = int(float(time.time()) * 1000)
    hash_str = "POST {}\n{}\n{}".format(sms_uri, str(now), acc_key_id)
    digest = hmac.new(acc_sec_key, msg=hash_str.encode('utf-8'), digestmod=hashlib.sha256).digest()
    d_hash = base64.b64encode(digest).decode()
    data = {
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": settings.PTERS_NAVER_SMS_PHONE_NUMBER,
        "content": "["+app_name+"] 인증번호 ["+activation_number+"]를 입력해주세요.",
        "messages": [
            {
                "to": str(phone),
                "content": "["+app_name+"] 인증번호 ["+activation_number+"]를 입력해주세요."
            }
        ]
    }
    body = json.dumps(data)

    resp, content = h.request(sms_url,
                              method="POST", body=body,
                              headers={'Content-Type': 'application/json; charset=utf-8',
                                       'x-ncp-apigw-timestamp': str(now),
                                       'x-ncp-iam-access-key': acc_key_id,
                                       'x-ncp-apigw-signature-v2': d_hash})
    if resp['status'] != '202':
        error = '비정상적인 접근입니다.[2-1]'
    return error
