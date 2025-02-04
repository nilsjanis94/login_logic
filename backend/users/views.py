from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
from .models import CustomUser 
from rest_framework.authtoken.models import Token  
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Bitte geben Sie Benutzername und Passwort ein'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if user:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)  # Token erzeugen oder abrufen
        return Response({
            'status': 'success',
            'message': 'Login erfolgreich.',
            'token': token.key,          # Token in der Antwort hinzufügen
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        }, status=status.HTTP_200_OK)
    
    return Response(
        {'error': 'Benutzername oder Passwort ist falsch'},
        status=status.HTTP_401_UNAUTHORIZED
    )

@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # erstellt einen neuen Benutzer in der Datenbank
        return Response({
            'status': 'success',
            'message': 'Registrierung erfolgreich',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_users(request):
    # Nur authentifizierte Nutzer mit Admin-Rechten (is_staff) dürfen die Liste abrufen.
    if not request.user.is_staff:
        return Response({'error': 'Zugriff verweigert.'}, status=status.HTTP_403_FORBIDDEN)
    
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
