from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from django.contrib.auth.models import User


@api_view(['GET'])
def event_list(request):
    query = request.query_params.get('query', '')
    if query:
        events = Event.objects.filter(title__icontains=query) | Event.objects.filter(author__icontains=query) | Event.objects.filter(genre__icontains=query) | Event.objects.filter(publication_date__icontains=query) | Event.objects.filter(price__icontains=query)
    else:
        events = Event.objects.all().order_by('-id')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def event_create(request):
	serializer = EventSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['GET'])
def get_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view(['POST'])
def user_register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return JsonResponse({'message': 'Username and password are required.'}, status=400)
    
    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': 'Username already exists.'}, status=400)
    
    if username and password:
        user = User.objects.create_user(username=username, password=password)
        if user:
            return JsonResponse({'message': 'User registered successfully.'})
    return JsonResponse({'message': 'User registration failed.'}, status=400)

@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return JsonResponse({'message': 'Username and password are required.'}, status=400)
    
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return JsonResponse({'message': 'User logged in successfully.'})
    return JsonResponse({'message': 'Invalid credentials.'}, status=401)

@api_view(['POST'])
def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'User logged out successfully.'})

