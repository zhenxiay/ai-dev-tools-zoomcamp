# Week 1 Homework Answers

## Django TODO Application

This document contains the answers to all homework questions for Week 1 of the AI Dev Tools Zoomcamp.

---

## Question 1: Install Django

**What's the command you used to install Django?**

```bash
uv add django
```

**Explanation:**
- Used `uv` as the package manager (as confirmed by the user)
- This command initializes a Python project (if needed) and adds Django as a dependency
- It automatically creates/updates `pyproject.toml` and `uv.lock` files
- Django 5.2.8 was installed along with its dependencies (asgiref, sqlparse, tzdata)

---

## Question 2: Project and App

**What's the file you need to edit to include the app in the project?**

**Answer:** `settings.py`

**Explanation:**
- Located at `todo_project/settings.py`
- Need to add the app name to the `INSTALLED_APPS` list
- Modified code:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo_app',  # Added our app here
]
```

---

## Question 3: Django Models

**What's the next step you need to take after creating models?**

**Answer:** Run migrations

**Explanation:**
- After defining the `Todo` model in `models.py`, we need to create and apply migrations
- Two commands are required:

```bash
# Create migration files
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

**Our Todo Model:**
```python
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

## Question 4: TODO Logic

**Where do we put the TODO application logic?**

**Answer:** `views.py`

**Explanation:**
- The `views.py` file contains all the application logic and request handling
- Located at `todo_app/views.py`
- Implemented the following views:
  - `home()` - Display all TODOs
  - `create_todo()` - Create new TODO
  - `edit_todo()` - Edit existing TODO
  - `delete_todo()` - Delete TODO
  - `toggle_resolved()` - Mark TODO as resolved/pending

---

## Question 5: Templates

**Where do you need to register the directory with the templates?**

**Answer:** `TEMPLATES['DIRS']` in project's `settings.py`

**Explanation:**
- Located in `todo_project/settings.py`
- Modified the `TEMPLATES` configuration:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Added templates directory here
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

**Templates Created:**
- `base.html` - Base template with common structure and styling
- `home.html` - Main TODO list display
- `create_todo.html` - Form to create new TODO
- `edit_todo.html` - Form to edit existing TODO
- `delete_todo.html` - Confirmation page for deletion

---

## Question 6: Tests

**What's the command you use for running tests in the terminal?**

**Answer:** `python manage.py test`

**Alternative commands:**
```bash
# Run all tests
python manage.py test

# Run with verbose output
python manage.py test --verbosity=2

# Run specific app tests
python manage.py test todo_app

# Run specific test class
python manage.py test todo_app.tests.TodoModelTest
```

**Test Results:**
- ✅ All 16 tests passed
- Test coverage includes:
  - 5 Model tests
  - 10 View tests
  - 1 Integration test

**Test Scenarios Covered:**
1. **Model Tests:**
   - Todo creation with all fields
   - String representation
   - Todo without due date
   - Resolved status toggling
   - Automatic timestamps

2. **View Tests:**
   - Home view rendering with/without todos
   - Create todo (GET and POST)
   - Edit todo (GET and POST)
   - Delete todo (GET and POST)
   - Toggle resolved status
   - Error handling (404 for invalid IDs)

3. **Integration Tests:**
   - Complete workflow: Create → Edit → Mark Resolved → Delete

---

## Application Features Summary

### ✅ Required Features Implemented:
1. **Create TODOs** - Form with title, description, and due date
2. **Edit TODOs** - Update any field of existing TODOs
3. **Delete TODOs** - Confirmation before deletion
4. **Assign Due Dates** - Optional date field
5. **Mark as Resolved** - Toggle button to mark completion status

### 🎯 Additional Features:
- Admin panel integration
- Timestamps for creation and updates
- Clean, simple UI with CSS styling
- Comprehensive test suite
- Proper error handling
- CSRF protection

---

## Commands Summary

```bash
# Project Setup
uv add django
django-admin startproject todo_project .
python manage.py startapp todo_app

# Database Operations
python manage.py makemigrations
python manage.py migrate

# Testing
python manage.py test

# Running the Application
python manage.py runserver

# Admin (optional)
python manage.py createsuperuser
```

---

## Project Structure

```
week1/homework/
├── manage.py
├── pyproject.toml
├── uv.lock
├── README.md
├── .gitignore
├── db.sqlite3
├── todo_project/
│   ├── __init__.py
│   ├── settings.py      # Q2: Added todo_app to INSTALLED_APPS
│   ├── urls.py          # Q5: Configured TEMPLATES['DIRS']
│   └── wsgi.py
├── todo_app/
│   ├── __init__.py
│   ├── models.py        # Q3: Defined Todo model
│   ├── views.py         # Q4: Implemented CRUD logic
│   ├── urls.py
│   ├── admin.py
│   ├── tests.py         # Q6: Comprehensive test suite
│   └── migrations/
│       └── 0001_initial.py
└── templates/
    ├── base.html
    ├── home.html
    ├── create_todo.html
    ├── edit_todo.html
    └── delete_todo.html
```

---

## Technologies Used

- **Framework:** Django 5.2.8
- **Language:** Python 3.11
- **Database:** SQLite (default)
- **Package Manager:** uv
- **Testing:** Django TestCase

---

## Verification

All requirements have been met:
- ✅ Django installed using uv
- ✅ Project and app created and configured
- ✅ Models created with migrations applied
- ✅ Views implemented for CRUD operations
- ✅ Templates created and configured
- ✅ Comprehensive tests written and passing (16/16)
- ✅ Application runs successfully

---

**Homework completed successfully!** 🎉
