import sys
from django.shortcuts import render
from django.utils import timezone
import pytz

import libnacl
import libnacl.utils
import binascii

# Create your views here.
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

from .models import Users, UserLoginInfo
from .serializers import UsersSerializer, UsersLoginInfoSerializer

key = "93ef662b41f24974dc21648969914087e1d4dd6390a68a1425ece159ef082c3b"

class UsersView(generics.RetrieveAPIView):
  serializer_class = UsersSerializer
  lookup_field = ['email']

  def get_queryset(self):
    print(self.request.data)
    return self.queryset

@api_view(['GET',])
def nonce(request):
  print()
  print()
  print(request.META['HTTP_ORIGIN'])
  print(request.META['REMOTE_ADDR'])
  print(request.META['HTTP_HOST'])
  nnc = libnacl.utils.rand_nonce()
  nonce = binascii.hexlify(nnc)
  print(nonce)
  return Response({
    'status': True,
    'data' : {'nonce': nonce}
  })


@api_view(['GET',])
def login_request(request):
  print()
  print()
  print(request.META['HTTP_ORIGIN'])
  print(request.META['REMOTE_ADDR'])
  print(request.META['HTTP_HOST'])
  email=request.query_params['email']
  password=request.query_params['password']
  print(email)
  print(password)

  n = binascii.unhexlify(email[0:libnacl.crypto_secretbox_NONCEBYTES*2])
  eml = binascii.unhexlify(email[libnacl.crypto_secretbox_NONCEBYTES*2:])
  passcode = binascii.unhexlify(password)
  ky = binascii.unhexlify(key)

  #print(n)
  #print(eml)
  #print(passcode)

  email = libnacl.crypto_secretbox_open(eml, n, ky)
  passcode = libnacl.crypto_secretbox_open(passcode, n, ky)
  
  print(email.decode())
  print(passcode.decode())
  
  try:
    qsetUsers = Users.objects.get(email=email.decode(),passcode=passcode.decode())
    userserializer = UsersSerializer(qsetUsers)
    #print(userserializer.data)

    userId=userserializer.data['userId']
    qsetUserInfo = UserLoginInfo.objects.get(userId=userId)
    #print(qsetUserInfo)

    userInfoSerializer = UsersLoginInfoSerializer(qsetUserInfo)
    #print(userInfoSerializer.data)

    qsetUserInfo.visits = userInfoSerializer.data['visits'] + 1
    qsetUserInfo.lastSuccess = timezone.now()
    qsetUserInfo.save()
     
    qsetUserInfo = UserLoginInfo.objects.get(userId=userserializer.data['userId'])
    userInfoSerializer = UsersLoginInfoSerializer(qsetUserInfo)
    #print(userInfoSerializer.data)

    return Response({'status': True, 
      'data': { 
        'userId': userserializer.data['userId'],
        'success': userInfoSerializer.data['lastSuccess'],
        'unsuccess': userInfoSerializer.data['lastUnsuccess'],
        'visits': userInfoSerializer.data['visits']
        } 
      })
  except Users.DoesNotExist as e:
    #print(e.__str__())
    return Response({'status': False, 'data': e.__str__()})
  except UserLoginInfo.DoesNotExist as e:
    #print(e.__str__())
    return Response({'status': False, 'data': e.__str__()})
  except:
    e = sys.exc_info()[0]
    #print(e)
    return Response({'status': False, 'data' : e.__name__ })