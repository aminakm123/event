from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import event_create, event_list, get_event, user_register, user_login, user_logout


urlpatterns = [
    path('user/register/', user_register, name='user_register'),
    path('user/login/', user_login, name='user_login'),
    path('user/logout/', user_logout, name='user_logout'),
    path('eventlist/', event_list, name='event_list'),  # Add eventList view
    path('create-event/', event_create, name='event_create'),  # Add eventCreate view
    # path('getevent/<int:event_id>/', get_event, name='get_event'),  # Add get_event view
]
