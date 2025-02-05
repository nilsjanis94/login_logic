from django.urls import path
from .views import user_data, list_users, login_view, register_view

urlpatterns = [
    path('user_data/', user_data, name='user_data'),
    path('users/', list_users, name='list_users'),
    path('login/', login_view, name='login_view'),
    path('register/', register_view, name='register_view'),
] 