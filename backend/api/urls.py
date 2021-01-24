from django.urls import path
from . import views

urlpatterns = [
    path('text/create/', views.parse_text),
    path('text/get_all/', views.get_all_text),
    path('kp/get_all/', views.get_all_kp)
]