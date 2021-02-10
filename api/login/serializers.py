from rest_framework import serializers
from .models import Users, UserLoginInfo

class UsersSerializer(serializers.ModelSerializer):
  class Meta:
    model = Users
    fields = ('userId', 'email', 'passcode')

class UsersLoginInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserLoginInfo
    fields = ('userId', 'lastSuccess', 'lastUnsuccess', 'visits')