from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import CustomUser
from users.serializers import CustomUserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('name', 'repo_link', 'users',)


class ToDoModelSerializer(HyperlinkedModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        fields = ('user', 'text', 'create_date', 'done',)
