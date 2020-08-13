from django.contrib.auth import login

# Create your views here.
from django.views.generic import RedirectView
from rest_framework.authtoken.models import Token


class TokenLoginRedirect(RedirectView):

    def get_redirect_url(self, *args, **kwargs):
        next_url = self.request.GET.get('next', '/')
        token_key = self.request.GET.get('auth_token')

        if token_key:
            try:
                token = Token.objects.get(key=token_key)
                login(self.request, token.user, backend='django.contrib.auth.backends.ModelBackend')
            except Token.DoesNotExist:
                pass
        return next_url
