from django.shortcuts import redirect
from django.views.generic import TemplateView


# Create your views here.

class IndexView(TemplateView):
    template_name = 'connect_main.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context
