from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from .models import Todo

# Create your views here.

def home(request):
    """Display all todos"""
    todos = Todo.objects.all()
    return render(request, 'home.html', {'todos': todos})

def create_todo(request):
    """Create a new todo"""
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description', '')
        due_date = request.POST.get('due_date') or None
        
        Todo.objects.create(
            title=title,
            description=description,
            due_date=due_date
        )
        return redirect('home')
    return render(request, 'create_todo.html')

def edit_todo(request, todo_id):
    """Edit an existing todo"""
    todo = get_object_or_404(Todo, id=todo_id)
    
    if request.method == 'POST':
        todo.title = request.POST.get('title')
        todo.description = request.POST.get('description', '')
        todo.due_date = request.POST.get('due_date') or None
        todo.save()
        return redirect('home')
    
    return render(request, 'edit_todo.html', {'todo': todo})

def delete_todo(request, todo_id):
    """Delete a todo"""
    todo = get_object_or_404(Todo, id=todo_id)
    if request.method == 'POST':
        todo.delete()
        return redirect('home')
    return render(request, 'delete_todo.html', {'todo': todo})

def toggle_resolved(request, todo_id):
    """Toggle the resolved status of a todo"""
    todo = get_object_or_404(Todo, id=todo_id)
    if request.method == 'POST':
        todo.is_resolved = not todo.is_resolved
        todo.save()
    return redirect('home')
