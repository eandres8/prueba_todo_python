from django.urls import path
from .views import ToDoView

urlpatterns = [
    path('todos/', ToDoView.todo_list),   
    path('todos/<int:pk>/', ToDoView.todo_detail),   
]