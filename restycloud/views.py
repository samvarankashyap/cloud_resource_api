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
"""
  { "data": "Accountname" },
            { "data": "AccountID" },
            { "data": "Provider" },
            { "data": "Operations" },
"""
def flat_file_creds():
    directory_list = os.listdir(settings.CREDS_DIR)
    creds = {}
    creds['data'] = []
    count = 1
    for provider in directory_list:
        for cred_file in os.listdir(settings.CREDS_DIR+provider+"/"):
            c_dict = {}
            c_dict['Provider'] = provider
            c_dict['AccountID'] = count
            c_dict['Accountname'] = cred_file
            c_dict['Operations'] = "<button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#creds_ops_modal' onclick=\"creds_show('"+str(count)+"')\">Show</button>"
            c_dict['Operations'] += "<button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#creds_ops_modal' onclick=\"creds_update('"+str(count)+"')\">Update</button>"
            c_dict['Operations'] += "<button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#creds_ops_modal' onclick=\"creds_delete('"+str(count)+"')\">Delete</button>"
            count += 1
            creds['data'].append(c_dict)
    return creds

def get_creds():
    creds_driver = get_credential_driver()
    if creds_driver == "flat_file":
        return flat_file_creds()


def get_creds_by_id(cred_id):
    creds = get_creds()
    for cred in creds['data']:
        if cred_id == cred['AccountID']:
            data = open(settings.CREDS_DIR+cred['Provider']+"/"+cred["Accountname"],"r").read()
            cred["data"] = yaml.load(data)
            return cred

def get_creds_path_by_id(cred_id):
    """with flat file creds only """
    directory_list = os.listdir(settings.CREDS_DIR)
    count = 1
    for provider in directory_list:
        for cred_file in os.listdir(settings.CREDS_DIR+provider+"/"):
            if cred_id == str(count):
                return settings.CREDS_DIR+provider+"/"+cred_file 
            count += 1

def update_aws_creds(creds,path):
    current_creds = yaml.load(open(path,"r").read())
    current_creds['aws_access_key_id'] = creds['aws_access_key_id']
    current_creds['aws_secret_access_key'] = creds['aws_secret_access_key']
    with open(path, 'w') as yml:
        yaml.dump(current_creds, yml, default_flow_style=False, allow_unicode=True)
    return current_creds 

def update_gcloud_creds(creds,path):
    return creds
def update_os_creds(creds,path):
    return creds

def creds_update(req):
    cred_id = req['AccountID']
    path = get_creds_path_by_id(cred_id)
    provider = req['Provider']
    update_functions = { 
                         "aws": update_aws_creds,
                         "gcloud": update_gcloud_creds,
                         "openstack": update_os_creds,
                       }
    resp = update_functions[provider](req,path)
    return resp

@csrf_exempt
def list_creds(request):
    """
    responds with list of credentials available
    """
    if request.method == 'GET':
        creds = get_creds()
        return JSONResponse(creds)

@csrf_exempt
def show_creds(request):
    """
    responds with  credentials available
    """
    if request.method == 'POST':
        cred_id = int(request.POST["id"])
        creds = get_creds_by_id(cred_id)
        return JSONResponse(creds)

@csrf_exempt
def update_creds(request):
    """
    responds with credential
    """
    if request.method == 'POST':
        req_obj = request.POST
        resp = creds_update(req_obj)
        return JSONResponse(resp)

@csrf_exempt
def delete_creds(request):
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
