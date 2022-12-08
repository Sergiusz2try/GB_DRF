from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        fields = ('user', 'text', 'project', 'create_date', 'done',)
