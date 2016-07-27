from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from cloud_resource_lib.cloud_service_factory import CloudServiceFactory as csf
import os
import json
import yaml
import pdb
class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def hello(request):
    """
    responds hello on get.
    """
    if request.method == 'GET':
        snippets = {"hello": "this is GET"}
        return JSONResponse(snippets)

def get_credential_driver():
    return settings.CREDENTIAL_DRIVER

def flat_file_creds():
    directory_list = os.listdir(settings.CREDS_DIR)
    creds = {}
    for provider in directory_list:
        creds[provider] = []
        for cred_file in os.listdir(settings.CREDS_DIR+provider+"/"):
            cred_json = open(settings.CREDS_DIR+provider+"/"+cred_file).read()
            cred_json = yaml.load(cred_json)
            cred_json["cred_id"] = cred_file
            creds[provider].append(cred_json)
        #creds['directories'] =  directory_list
    return creds

def get_creds():
    creds_driver = get_credential_driver()
    if creds_driver == "flat_file":
        return flat_file_creds()

@csrf_exempt
def list_creds(request):
    """
    responds with list of credentials available
    """
    if request.method == 'GET':
        creds = get_creds()
        return JSONResponse(creds)

@csrf_exempt
def list_instances(request):
    """
    responds with list of credentials available
    """
    pdb.set_trace()
    c_obj = csf()
    creds = get_creds()
    j_obj = c_obj.list_instances(creds)
    if request.method == 'GET':
        creds = get_creds()
        return HttpResponse(json.dumps(j_obj))
        #return JSONResponse(creds)
