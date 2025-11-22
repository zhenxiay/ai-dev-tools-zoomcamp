# Quick Start Guide

## Get the Application Running in 3 Steps

### Step 1: Install Dependencies
```bash
cd week1/homework
uv add django
```

### Step 2: Setup Database
```bash
python manage.py migrate
```

### Step 3: Run the Server
```bash
python manage.py runserver
```

Visit: **http://127.0.0.1:8000/**

---

## Run Tests
```bash
python manage.py test
```

Expected output: **16 tests passing** ✅

---

## Create Admin User (Optional)
```bash
python manage.py createsuperuser
```

Then visit: **http://127.0.0.1:8000/admin/**

---

## Homework Answers Quick Reference

| Question | Answer |
|----------|--------|
| Q1: Install Django | `uv add django` |
| Q2: File to edit for app | `settings.py` |
| Q3: Next step after models | Run migrations |
| Q4: Where to put logic | `views.py` |
| Q5: Register templates | `TEMPLATES['DIRS']` in `settings.py` |
| Q6: Command to run tests | `python manage.py test` |

See **HOMEWORK_ANSWERS.md** for detailed explanations.
