from django.test import TestCase
import pytest
from django.urls import reverse
from django.contrib.auth.models import User


# Fixture to create a preexisting user for login tests
@pytest.fixture
def existing_user(db):
    return User.objects.create_user(
        username="user12", email="asdf@asd.com", password="GoodUser123!"
    )


# Sign-up test cases
@pytest.mark.django_db
def test_signup_valid(client):
    # Test case 1: Valid sign-up
    response = client.post(
        reverse("signup"),
        {
            "username": "user12",
            "email": "asdf@asd.com",
            "password1": "GoodUser123!",
            "password2": "GoodUser123!",
        },
    )
    assert response.status_code == 201  # Redirect to home page
    assert User.objects.filter(username="user12").exists()
    assert response.url == reverse("home")


@pytest.mark.django_db
def test_signup_existing_user(client, existing_user):
    # Test case 2: Existing user trying to sign up again
    response = client.post(
        reverse("signup"),
        {
            "username": "user12",
            "email": "asdf@asd.com",
            "password1": "GoodUser123!",
            "password2": "GoodUser123!",
        },
    )
    assert response.status_code == 400  # Remains on the signup page
    assert "error" in response.content.decode().lower()  # Check for error message


@pytest.mark.django_db
def test_signup_invalid_password(client):
    # Test case 3: Invalid password parameters
    response = client.post(
        reverse("signup"),
        {
            "username": "Hack1",
            "email": "hack1@hack.com",
            "password1": "Badlen1",  # Doesn't meet criteria
            "password2": "Badlen1",
        },
    )
    assert response.status_code == 400  # Remains on the signup page
    assert "error" in response.content.decode().lower()  # Check for error message


@pytest.mark.django_db
def test_signup_duplicate_username(client, existing_user):
    # Test case: Attempt to sign up with an already existing username
    response = client.post(
        reverse("signup"),
        {
            "username": "user12",  # This username is already taken by existing_user
            "email": "newuser@example.com",  # New email to avoid email conflict
            "password1": "GoodUser123!",
            "password2": "GoodUser123!",
        },
    )

    assert response.status_code == 400  # Remains on the signup page
    assert "username already exists" in response.content.decode().lower()


@pytest.mark.django_db
def test_signup_invalid_user_params(client):
    # Test case 4: Invalid username/email parameters
    response = client.post(
        reverse("signup"),
        {
            "username": "nocaps!!!",
            "email": "asdf@asdfcom",  # Invalid email
            "password1": "WorkingPassword123",
            "password2": "WorkingPassword123",
        },
    )
    assert response.status_code == 400  # Remains on the signup page
    assert "error" in response.content.decode().lower()  # Check for error message


# Login test cases
@pytest.mark.django_db
def test_login_valid(client, existing_user):
    # Test case 5: Valid login
    response = client.post(
        reverse("login"), {"username": "user12", "password": "GoodUser123!"}
    )
    assert response.status_code == 201  # Redirect to home page
    assert response.url == reverse("home")


@pytest.mark.django_db
def test_login_valid_user_invalid_pass(client, existing_user):
    # Test case 6: Valid username, invalid password
    response = client.post(
        reverse("login"), {"username": "user12", "password": "IncorrectPword12"}
    )
    assert response.status_code == 400  # Remains on login page
    assert "error" in response.content.decode().lower()  # Check for error message


@pytest.mark.django_db
def test_login_invalid_user_valid_pass(client):
    # Test case 7: Invalid username, valid password
    response = client.post(
        reverse("login"), {"username": "BadUser1`//_-=", "password": "GoodUser123!"}
    )
    assert response.status_code == 400  # Remains on login page
    assert "error" in response.content.decode().lower()  # Check for error message
