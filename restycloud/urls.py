from django.conf.urls import url
from restycloud import views

urlpatterns = [
    url(r'hello$', views.hello),
    url(r'list_creds$', views.list_creds),
]
