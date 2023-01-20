from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),
    path('answers/', views.getAnswers),
    path('addanswer/', views.addAnswer),
    path('update/', views.updateVocab),

    path('allentry/', views.getAllEntry),
    path('words/', views.getWords),
    path('examples/', views.getExamples),
    
    path('register/', views.RegisterView.as_view(), name = 'auth_register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]
