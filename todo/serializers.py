from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('id', 'users', 'name', 'repo_link',)


class ToDoModelSerializer(HyperlinkedModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        fields = ('id', 'user', 'text', 'project', 'create_date', 'done',)
