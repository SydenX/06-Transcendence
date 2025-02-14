from django.shortcuts import render

def home(request):
    data = {"message": "Bienvenue dans mon application SSR avec Django !"}
    return render(request, "home.html", data)
