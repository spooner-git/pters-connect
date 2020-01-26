# Create your views here.
import collections

import requests
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.views.generic import TemplateView

from configs.const import USE

class IndexView(TemplateView):
    template_name = 'connect_main.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context

class GolfProMypageView(TemplateView):
    template_name = 'golf_pro_mypage.html'

    def get_context_data(self, **kwargs):
        context = super(GolfProMypageView, self).get_context_data(**kwargs)
        return context

class GolfProProfileEditView(TemplateView):
    template_name = 'golf_pro_profile_edit.html'

    def get_context_data(self, **kwargs):
        context = super(GolfProProfileEditView, self).get_context_data(**kwargs)
        return context
