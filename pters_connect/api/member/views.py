# Create your views here.
import base64
import hashlib
import hmac
import json
import time
import httplib2

from configs import settings


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
