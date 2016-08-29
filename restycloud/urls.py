from django.conf.urls import url
from restycloud import views

urlpatterns = [
    url(r'hello$', views.hello),
    url(r'list_creds$', views.list_creds),
    url(r'list_instances$', views.list_instances),
    url(r'show_creds$', views.show_creds),
    url(r'update_creds$', views.update_creds),
    url(r'list_resource_group_types$', views.list_resource_group_types),
    url(r'list_res_types_by_res_grp$', views.list_res_types_by_res_grp),
    url(r'list_regions_by_res_type$', views.list_regions_by_res_type),
]
