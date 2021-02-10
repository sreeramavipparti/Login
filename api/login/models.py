from django.db import models

# Create your models here.
class Users(models.Model):
  userId = models.AutoField(primary_key=True)
  email = models.CharField(max_length=255)
  passcode = models.CharField(max_length=255)

  class Meta:
    # managed = False
    db_table = 'users'
    ordering = ['userId']

class UserLoginInfo(models.Model):
  userId = models.OneToOneField(Users, unique=True, on_delete=models.CASCADE)
  lastSuccess = models.DateTimeField(null=True)
  lastUnsuccess = models.DateTimeField(null=True)
  visits = models.IntegerField(default=0)

  class Meta:
    # managed = False
    db_table = 'userlogininfo'
    ordering = ['userId']
  