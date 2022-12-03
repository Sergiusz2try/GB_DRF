from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email',)


class CustomUserDetailModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
