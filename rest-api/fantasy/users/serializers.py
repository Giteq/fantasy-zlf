from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from fantasy.users.models import Player, User, Position
from django.contrib.auth.hashers import make_password


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['position']


class PlayerSerializer(serializers.ModelSerializer):
    position = PositionSerializer()

    class Meta:
        model = Player
        fields = ['name', 'total_points', 'actual_points', 'position', 'price']


class UserSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'total_points', 'password', 'players']

    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)
