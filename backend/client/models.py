from passage_auth.models import PassageUser
from django.db import models

class ProfileModel(models.Model):
    user = models.ForeignKey(PassageUser, on_delete=models.CASCADE)
    motivation_quote = models.TextField(default="Opportunities don't happen, you create them.")

    def __str__(self):
        return self.user.email + "'s Profile"