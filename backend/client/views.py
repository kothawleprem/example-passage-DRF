from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist

from passage_auth.authentication import TokenAuthentication

from .models import ProfileModel
class ProfieView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = request.user
        try:
            profile = ProfileModel.objects.get(user=user)
        except ObjectDoesNotExist:
            profile = ProfileModel.objects.create(user=user)
        response = {
            "email": user.email,
            "motivation_quote": profile.motivation_quote
        }
        return Response(response, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        motivation_quote = request.data.get("motivation_quote")
        profile = ProfileModel.objects.get(user=user)
        profile.motivation_quote = motivation_quote
        profile.save()
        return Response({"detail": "Profile Updated"}, status=status.HTTP_201_CREATED)