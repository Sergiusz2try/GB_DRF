import graphene
from graphene_django import DjangoObjectType
from todo.models import ToDo, Project
from users.models import CustomUser


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = ['project', 'text', 'user']


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = ['username']


class Query(graphene.ObjectType):
    all_todo = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()


schema = graphene.Schema(query=Query)
