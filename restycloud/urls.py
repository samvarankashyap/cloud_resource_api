from django.conf.urls import url
from restycloud import views

urlpatterns = [
    url(r'hello$', views.hello),
]
