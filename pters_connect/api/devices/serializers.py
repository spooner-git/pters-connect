# from fcm_django.models import FCMDevice
# from rest_framework import serializers
#
#
# class FCMDeviceSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = FCMDevice
#         fields = ['name', 'registration_id', 'device_id', 'type']
#
#     def validate(self, attrs):
#         attrs['user'] = self.context['request'].user
#         attrs['active'] = True
#         return attrs
#
#     def create(self, validated_data):
#         registration_id = validated_data['registration_id']
#         user = validated_data['user']
#
#         FCMDevice.objects.filter(registration_id=registration_id).exclude(user=user).delete()
#
#         devices = FCMDevice.objects.filter(user=user, registration_id=registration_id)
#         device = devices.first()
#
#         if device:
#             devices.exclude(id=device.id).delete()
#             return self.update(device, validated_data)
#         else:
#             return super(FCMDeviceSerializer, self).create(validated_data)
