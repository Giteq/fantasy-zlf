
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from fantasy.users.models import Player, User, Position
from fantasy.users.serializers import UserSerializer, PlayerSerializer, PositionSerializer


class PositionView(viewsets.ModelViewSet):

    #permission_classes = (IsAuthenticated,)
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


class PlayerView(viewsets.ModelViewSet):

    #permission_classes = (IsAuthenticated,)
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=True)
    def info(self, request, *args, **kwargs):
        queryset = Player.objects.get(name=kwargs['pk'])
        if not queryset:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    #permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=True)
    def info(self, request, *args, **kwargs):
        queryset = User.objects.get(username=kwargs['pk'])
        if not queryset:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
