from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.Serializer):
    
    class Meta:
        model = ToDo
        fields = ['id', 'title' , 'description', 'complete', 'user', 'create_at', 'updated_at']

    def validate(self, attrs):
        return attrs
