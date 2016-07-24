from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
import pdb
import os
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

@csrf_exempt
def list_creds(request):
    """
    responds with list of credentials available
    """
    if request.method == 'GET':
        directory_list = os.listdir(settings.CREDS_DIR)
        creds = {}
        for provider in directory_list:
            creds[provider] = os.listdir(settings.CREDS_DIR+"/"+provider)
        creds['directories'] =  directory_list
        return JSONResponse(creds)
