# from fcm_django.models import FCMDevice
# from rest_framework import viewsets, mixins
# from rest_framework.permissions import IsAuthenticated
#
# from api.devices.serializers import FCMDeviceSerializer
#
#
# class FCMDeviceViewSet(mixins.CreateModelMixin,
#                        viewsets.GenericViewSet):
#     queryset = FCMDevice.objects.all()
#     serializer_class = FCMDeviceSerializer
#     permission_classes = [IsAuthenticated]
