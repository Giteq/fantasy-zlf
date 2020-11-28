from rest_framework import serializers
from fantasy.users.models import Player, User
from django.contrib.auth.hashers import make_password


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['name', 'total_points', 'actual_points', 'position']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'groups', 'total_points', 'password']

    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)
