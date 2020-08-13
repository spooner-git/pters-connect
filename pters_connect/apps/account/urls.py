from django.urls import path

from . import views


urlpatterns = [
    path('login/redirect/', views.TokenLoginRedirect.as_view(), name='login_redirect')
]
