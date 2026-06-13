# EXERCISE 1: Variables and Assertions
# The expected error message is "Invalid Password"
# This test is currently failing. Run it with `pytest test_phase1_basics.py`, 
# read the error message in the terminal, and fix the actual_error variable so the test passes.

def test_login_error_message():
    expected_error = "Invalid Password"
    actual_error = "invalid password" # <-- FIX ME
    
    assert expected_error == actual_error


# EXERCISE 2: Lists
# We want to check if "Chrome" is in our list of supported browsers.
# This test is broken. The `assert` statement is failing. Fix the list!

def test_browser_is_supported():
    supported_browsers = ["Firefox", "Safari", "Edge"] # <-- FIX ME
    
    assert "Chrome" in supported_browsers


# EXERCISE 3: Dictionaries (JSON data)
# We have a user profile dictionary. We want to assert that the user's role is "admin".
# The code below is trying to access the role, but it has a typo. Fix it!

def test_user_is_admin():
    user_profile = {
        "name": "Ana",
        "role": "admin",
        "active": True
    }
    
    assert user_profile["Role"] == "admin" # <-- FIX ME
