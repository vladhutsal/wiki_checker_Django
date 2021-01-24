from django.urls import path
from .views import text, keyphrases

urlpatterns = [
    path('text/create/', text.parse_text),
    path('kp/get_all/', keyphrases.get_all)
]