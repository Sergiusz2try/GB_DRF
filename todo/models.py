from django.db import models

from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=100)
    repo_link = models.URLField(blank=True)
    users = models.ManyToManyField(CustomUser, related_name='users')


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)
