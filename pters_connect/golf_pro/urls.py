"""skill_abc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^mypage/$', views.GolfProMypageView.as_view(), name='mypage'),
    url(r'^profile_edit/$', views.GolfProProfileEditView.as_view(), name='profile_edit'),
    url(r'^message_box/$', views.GolfProMessageBoxView.as_view(), name='message_box'),
    url(r'^cert_info/$', views.GolfProCertInfoView.as_view(), name='cert_info')
]
