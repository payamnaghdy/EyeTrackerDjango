from django.urls import path, re_path, include
from .views import indexView
urlpatterns = [
    path('',indexView.as_view()),
]
