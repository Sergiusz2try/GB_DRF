from django.http import Http404
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserAPIView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get(self, request, format=None):
        users = CustomUser.objects.all()
        serializer = CustomUserModelSerializer(users, many=True)
        return Response(serializer.data)

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except Exception:
            raise Http404

    def details(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = CustomUserModelSerializer(user)
        return Response(serializer.data)

    def patch(self, request, user_id):
        user = CustomUser.objects.get(id=user_id)

        serializer = CustomUserModelSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_204_NO_CONTENT)

        return Response(status=HTTP_400_BAD_REQUEST)


# class CustomUserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer
