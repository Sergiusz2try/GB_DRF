from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from .views import CustomUserAPIView
from .models import CustomUser


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/get_users/")
        view = CustomUserAPIView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        user = CustomUser.objects.create(username="Lola", first_name="Linda", last_name="Sara", email="ggg@ru.ru")
        client = APIClient()
        response = client.get(f'/api/get_users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestCaseUserSet(APITestCase):

    def test_create_mixer(self):
        user = mixer.blend(CustomUser)
        response = self.client.get(f'/api/get_users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
