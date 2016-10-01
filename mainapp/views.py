from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def index(request):
    template = loader.get_template('mainapp/index.html')
    context = {
             "hello":"hellostring"
    }
    return HttpResponse(template.render(context, request))
