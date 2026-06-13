import requests

# EXERCISE 1: Fixing a 404 Error
# We are trying to fetch User ID #1 from the API.
# But the URL is wrong, so the API returns a 404 (Not Found) instead of a 200 (OK).
# Fix the URL so the test passes.

def test_get_user_success():
    # Hint: The correct endpoint is /users/1, not /userz/1
    response = requests.get("https://jsonplaceholder.typicode.com/userz/1") # <-- FIX ME
    
    assert response.status_code == 200


# EXERCISE 2: Parsing JSON
# Now we successfully fetched User ID 1.
# The JSON response looks like this: {"id": 1, "name": "Leanne Graham", "username": "Bret"}
# We want to assert that her username is "Bret". 
# The assert statement below has a typo. Fix it so it correctly accesses the dictionary!

def test_user_data():
    response = requests.get("https://jsonplaceholder.typicode.com/users/1")
    data = response.json()
    
    assert data["user_name"] == "Bret" # <-- FIX ME
