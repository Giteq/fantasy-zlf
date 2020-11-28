from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from fantasy.users.models import Player, User
from fantasy.users.serializers import UserSerializer, PlayerSerializer


class PlayerView(viewsets.ModelViewSet):

    permission_classes = (IsAuthenticated,)
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
