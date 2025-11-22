# Django TODO Application

A simple TODO application built with Django framework as part of the AI Dev Tools Zoomcamp Week 1 homework.

## Features

- ✅ **Create** new TODO items with title, description, and due date
- ✅ **Edit** existing TODO items
- ✅ **Delete** TODO items
- ✅ **Mark as Resolved** - Toggle completion status
- ✅ **Due Dates** - Assign and track due dates
- ✅ **Clean UI** - Simple, functional interface
- ✅ **Comprehensive Tests** - Full test coverage

## Technology Stack

- **Framework**: Django 5.2.8
- **Database**: SQLite (default)
- **Package Manager**: uv
- **Python**: 3.11+

## Project Structure

```
homework/
├── manage.py                  # Django management script
├── pyproject.toml            # Project dependencies (managed by uv)
├── uv.lock                   # Lock file for dependencies
├── db.sqlite3                # SQLite database
├── todo_project/             # Django project settings
│   ├── settings.py           # Project settings
│   ├── urls.py               # Project URL configuration
│   └── wsgi.py               # WSGI configuration
├── todo_app/                 # Django application
│   ├── models.py             # Todo model definition
│   ├── views.py              # View logic for CRUD operations
│   ├── urls.py               # App URL patterns
│   ├── admin.py              # Admin panel configuration
│   ├── tests.py              # Comprehensive test suite
│   └── migrations/           # Database migrations
└── templates/                # HTML templates
    ├── base.html             # Base template
    ├── home.html             # Main TODO list view
    ├── create_todo.html      # Create TODO form
    ├── edit_todo.html        # Edit TODO form
    └── delete_todo.html      # Delete confirmation
```

## Homework Answers

### Question 1: Install Django
**Command used:**
```bash
uv add django
```

### Question 2: Project and App
**File to edit to include the app in the project:**
- `settings.py`

Added `'todo_app'` to the `INSTALLED_APPS` list in `todo_project/settings.py`.

### Question 3: Django Models
**Next step after creating models:**
- Run migrations

Commands used:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Question 4: TODO Logic
**Where to put the application logic:**
- `views.py`

All CRUD operations (Create, Read, Update, Delete) and the toggle resolved functionality are implemented in `todo_app/views.py`.

### Question 5: Templates
**Where to register the templates directory:**
- `TEMPLATES['DIRS']` in project's `settings.py`

Updated the `TEMPLATES` configuration in `settings.py`:
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        ...
    },
]
```

### Question 6: Tests
**Command to run tests:**
```bash
python manage.py test
```

For more verbose output:
```bash
python manage.py test --verbosity=2
```

## Installation & Setup

### Prerequisites
- Python 3.11 or higher
- uv package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd week1/homework
```

### Step 2: Install Dependencies
```bash
uv add django
```

### Step 3: Run Migrations
```bash
python manage.py migrate
```

### Step 4: Create a Superuser (Optional)
To access the admin panel:
```bash
python manage.py createsuperuser
```

### Step 5: Run the Development Server
```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` in your web browser.

## Running Tests

Run all tests:
```bash
python manage.py test
```

Run tests with verbose output:
```bash
python manage.py test --verbosity=2
```

Run specific test class:
```bash
python manage.py test todo_app.tests.TodoModelTest
```

## Test Coverage

The application includes **16 comprehensive tests** covering:

### Model Tests (5 tests)
- Todo creation with all fields
- String representation
- Todo without due date
- Resolved status toggling
- Timestamps (created_at, updated_at)

### View Tests (10 tests)
- Home view with todos
- Home view without todos
- Create todo GET and POST
- Create todo with minimal fields
- Edit todo GET and POST
- Delete todo GET and POST
- Toggle resolved status
- Invalid todo ID (404 handling)

### Integration Tests (1 test)
- Complete workflow: Create → Edit → Resolve → Delete

**All tests pass successfully! ✅**

## Usage

### Creating a TODO
1. Click "Add New TODO" on the home page
2. Fill in the title (required)
3. Optionally add description and due date
4. Click "Create TODO"

### Editing a TODO
1. Click "Edit" on any TODO item
2. Modify the fields
3. Click "Save Changes"

### Marking as Resolved
- Click "Mark as Resolved" to complete a TODO
- Click "Mark as Pending" to reopen it

### Deleting a TODO
1. Click "Delete" on any TODO item
2. Confirm the deletion

## Database Model

The `Todo` model includes:

| Field | Type | Description |
|-------|------|-------------|
| `title` | CharField | TODO title (required, max 200 chars) |
| `description` | TextField | Detailed description (optional) |
| `due_date` | DateField | Due date (optional) |
| `is_resolved` | BooleanField | Completion status (default: False) |
| `created_at` | DateTimeField | Creation timestamp (auto) |
| `updated_at` | DateTimeField | Last update timestamp (auto) |

## Admin Panel

Access the admin panel at `http://127.0.0.1:8000/admin/` to:
- View all TODOs in a table format
- Filter by resolved status and due date
- Search by title and description
- Bulk actions

## Development Notes

- **SQLite** database is used for simplicity
- **No authentication** is implemented (single-user app)
- **Simple CSS** styling for clean, functional UI
- **CSRF protection** enabled on all forms
- **Proper error handling** with 404 pages for invalid IDs

## Learning Outcomes

Through this project, I learned:
- ✅ Setting up Django projects and apps
- ✅ Creating database models and relationships
- ✅ Implementing CRUD operations in views
- ✅ Working with Django templates and forms
- ✅ Writing comprehensive unit and integration tests
- ✅ Using Django's admin interface
- ✅ Managing dependencies with uv
- ✅ Understanding the Django MVT pattern

## Author

Created as part of the [AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp/) by DataTalksClub.

## License

This project is open source and available for educational purposes.
