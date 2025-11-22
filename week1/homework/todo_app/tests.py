from django.test import TestCase, Client
from django.urls import reverse
from datetime import date, timedelta
from .models import Todo

# Create your tests here.

class TodoModelTest(TestCase):
    """Test cases for the Todo model"""
    
    def setUp(self):
        """Set up test data"""
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            due_date=date.today() + timedelta(days=7)
        )
    
    def test_todo_creation(self):
        """Test that a todo can be created"""
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertEqual(self.todo.description, "Test Description")
        self.assertFalse(self.todo.is_resolved)
        self.assertIsNotNone(self.todo.created_at)
        self.assertIsNotNone(self.todo.updated_at)
    
    def test_todo_string_representation(self):
        """Test the string representation of a todo"""
        self.assertEqual(str(self.todo), "Test Todo")
    
    def test_todo_without_due_date(self):
        """Test creating a todo without a due date"""
        todo = Todo.objects.create(title="No Due Date")
        self.assertIsNone(todo.due_date)
        self.assertEqual(todo.description, "")
    
    def test_todo_resolved_status(self):
        """Test toggling the resolved status"""
        self.assertFalse(self.todo.is_resolved)
        self.todo.is_resolved = True
        self.todo.save()
        self.assertTrue(self.todo.is_resolved)


class TodoViewTest(TestCase):
    """Test cases for the Todo views"""
    
    def setUp(self):
        """Set up test client and data"""
        self.client = Client()
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            due_date=date.today() + timedelta(days=7)
        )
    
    def test_home_view(self):
        """Test the home view displays todos"""
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Todo")
        self.assertContains(response, "Test Description")
    
    def test_home_view_empty(self):
        """Test home view with no todos"""
        Todo.objects.all().delete()
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No TODOs yet")
    
    def test_create_todo_view_get(self):
        """Test GET request to create todo view"""
        response = self.client.get(reverse('create_todo'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Create New TODO")
    
    def test_create_todo_view_post(self):
        """Test POST request to create a new todo"""
        data = {
            'title': 'New Todo',
            'description': 'New Description',
            'due_date': date.today() + timedelta(days=3)
        }
        response = self.client.post(reverse('create_todo'), data)
        self.assertEqual(response.status_code, 302)  # Redirect
        self.assertTrue(Todo.objects.filter(title='New Todo').exists())
    
    def test_create_todo_without_optional_fields(self):
        """Test creating a todo with only required fields"""
        data = {'title': 'Minimal Todo'}
        response = self.client.post(reverse('create_todo'), data)
        self.assertEqual(response.status_code, 302)
        todo = Todo.objects.get(title='Minimal Todo')
        self.assertEqual(todo.description, '')
        self.assertIsNone(todo.due_date)
    
    def test_edit_todo_view_get(self):
        """Test GET request to edit todo view"""
        response = self.client.get(reverse('edit_todo', args=[self.todo.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Edit TODO")
        self.assertContains(response, self.todo.title)
    
    def test_edit_todo_view_post(self):
        """Test POST request to update a todo"""
        data = {
            'title': 'Updated Todo',
            'description': 'Updated Description',
            'due_date': date.today() + timedelta(days=10)
        }
        response = self.client.post(reverse('edit_todo', args=[self.todo.id]), data)
        self.assertEqual(response.status_code, 302)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated Todo')
        self.assertEqual(self.todo.description, 'Updated Description')
    
    def test_delete_todo_view_get(self):
        """Test GET request to delete todo view"""
        response = self.client.get(reverse('delete_todo', args=[self.todo.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Delete TODO")
        self.assertContains(response, self.todo.title)
    
    def test_delete_todo_view_post(self):
        """Test POST request to delete a todo"""
        todo_id = self.todo.id
        response = self.client.post(reverse('delete_todo', args=[todo_id]))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Todo.objects.filter(id=todo_id).exists())
    
    def test_toggle_resolved_view(self):
        """Test toggling the resolved status"""
        self.assertFalse(self.todo.is_resolved)
        response = self.client.post(reverse('toggle_resolved', args=[self.todo.id]))
        self.assertEqual(response.status_code, 302)
        self.todo.refresh_from_db()
        self.assertTrue(self.todo.is_resolved)
        
        # Toggle back
        response = self.client.post(reverse('toggle_resolved', args=[self.todo.id]))
        self.todo.refresh_from_db()
        self.assertFalse(self.todo.is_resolved)
    
    def test_invalid_todo_id(self):
        """Test accessing a non-existent todo"""
        response = self.client.get(reverse('edit_todo', args=[9999]))
        self.assertEqual(response.status_code, 404)


class TodoIntegrationTest(TestCase):
    """Integration tests for the complete TODO workflow"""
    
    def setUp(self):
        """Set up test client"""
        self.client = Client()
    
    def test_complete_todo_workflow(self):
        """Test creating, editing, resolving, and deleting a todo"""
        # Create a todo
        create_data = {
            'title': 'Integration Test Todo',
            'description': 'Testing the complete workflow',
            'due_date': date.today() + timedelta(days=5)
        }
        response = self.client.post(reverse('create_todo'), create_data)
        self.assertEqual(response.status_code, 302)
        
        # Verify it exists
        todo = Todo.objects.get(title='Integration Test Todo')
        self.assertIsNotNone(todo)
        
        # Edit the todo
        edit_data = {
            'title': 'Updated Integration Test',
            'description': 'Updated description',
            'due_date': date.today() + timedelta(days=7)
        }
        response = self.client.post(reverse('edit_todo', args=[todo.id]), edit_data)
        todo.refresh_from_db()
        self.assertEqual(todo.title, 'Updated Integration Test')
        
        # Mark as resolved
        response = self.client.post(reverse('toggle_resolved', args=[todo.id]))
        todo.refresh_from_db()
        self.assertTrue(todo.is_resolved)
        
        # Delete the todo
        response = self.client.post(reverse('delete_todo', args=[todo.id]))
        self.assertFalse(Todo.objects.filter(id=todo.id).exists())
