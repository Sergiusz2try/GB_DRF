from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email',)


class CustomUserUpdateModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')


class CustomUserDetailModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
