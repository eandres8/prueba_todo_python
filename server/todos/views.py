from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ToDo
from .serializers import ToDoSerializer

class ToDoView():

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
            try:
                serializer = ToDoSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except error:
                return Response("No se pudo realizar el proceso", status=status.HTTP_400_BAD_REQUEST)


    @api_view(['GET', 'PUT', 'DELETE'])
    def todo_detail(request, pk):
        """
        Update, Return or Delete a ToDo
        """
        try:
            todo = ToDo.objects.get(pk=pk)
        except ToDo.DoesNotExist:
            return Response("No se encontró el TODO", status=status.HTTP_404_NOT_FOUND)
            
        if request.method == 'GET':
            serializer = ToDoSerializer(todo)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            serializer = ToDoSerializer(todo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            todo.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)