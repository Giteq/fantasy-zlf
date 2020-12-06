from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser

MAX_LENGTH = 30


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class Position(models.Model):
    position = models.CharField(max_length=MAX_LENGTH)

    def __str__(self):
        return self.position


class Player(models.Model):
    name = models.CharField(max_length=MAX_LENGTH, primary_key=True)
    total_points = models.IntegerField(default=0)
    actual_points = models.IntegerField(default=0)
    position = models.ForeignKey(Position, db_column="position", on_delete=models.CASCADE)
    price = models.FloatField()


class User(AbstractUser):
    total_points = models.IntegerField(default=0)
    objects = CustomUserManager()
    players = models.ManyToManyField(Player, blank=True, default=[])
    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']

