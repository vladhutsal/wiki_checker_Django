from django.urls import path
from .views import text, keyphrases

urlpatterns = [
    path('text/create/', text.add_text)
]