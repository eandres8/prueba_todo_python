from django.db import models
from django.utils import timezone

# Create your models here.
class ToDo(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255, default='', blank=True, null=True)
    complete = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'todos'
