from django.urls import path
from . import views

urlpatterns = [
  path('login/', views.login_request),
  path('nonce/', views.nonce),
  #path('login/', views.UsersView.as_view()),
]