from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ToDo
from .serializers import ToDoSerializer

@api_view(['GET', 'POST'])
def todo_list(request):
    """
    List all code ToDos, or create a new ToDo.
    """
    if request.method == 'GET':
        todos = ToDo.objects.all()
        serializer = ToDoSerializer(todos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ToDoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)