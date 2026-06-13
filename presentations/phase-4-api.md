---
marp: true
theme: default
paginate: true
header: "Phase 4: API Testing"
footer: "IRA Mentoring Program"
---

# 🔌 Phase 4: API Testing
## Testing Without the User Interface

A huge amount of modern testing happens "under the hood." 
Before the UI is even built, the backend sends and receives data through an API (Application Programming Interface).

**Goal:** Understand APIs well enough to test them manually in Postman and automatically in Python.
**Duration:** Weeks 8-9.

---

# 🗣️ How APIs Talk (HTTP Methods)

When we talk to an API, we send an "HTTP Request". We have to specify the "Method" (the action we want to take):

- **GET:** "Give me data!" (e.g., Load a user's profile)
- **POST:** "Create new data!" (e.g., Register a new user)
- **PUT / PATCH:** "Update existing data!" (e.g., Change my password)
- **DELETE:** "Destroy this data!" (e.g., Delete my account)

---

# 🚦 Status Codes (How the API replies)

The API always replies with a 3-digit status code. You must memorize the categories:

- **200s (Success):** `200 OK`, `201 Created`. Everything went great!
- **400s (Client Error):** `400 Bad Request`, `401 Unauthorized`, `404 Not Found`. YOU made a mistake in your request.
- **500s (Server Error):** `500 Internal Server Error`. The server crashed. This is almost always a bug for QA to report!

---

# 📨 JSON Data

APIs send data back and forth using a format called **JSON**.
It looks exactly like the Python Dictionaries we learned in Phase 1!

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}
```
*We will need to parse this data to write our assertions.*

---

# 🚀 Starting with Postman

Before we write code, we test APIs manually using a visual tool called **Postman**.

1. Open Postman.
2. Create a new `GET` request.
3. Enter the URL: `https://jsonplaceholder.typicode.com/users/1`
4. Click **Send**.
5. Look at the bottom pane: Check the Status Code (`200 OK`) and read the JSON Body.

---

# 🐍 Moving to Python (`requests`)

Once you know the API works in Postman, we automate it in pytest!
First, install the library: `pip install requests`

```python
import requests

def test_get_user():
    # 1. Act: Send the GET request
    response = requests.get("https://jsonplaceholder.typicode.com/users/1")
    
    # 2. Assert: Check the status code
    assert response.status_code == 200
    
    # 3. Assert: Parse the JSON and check the data
    data = response.json()
    assert data["name"] == "Leanne Graham"
```

---

# 🤖 AI Practice for APIs

APIs can be confusing at first. AI is great at explaining them.

**Great prompts:**
- *"I sent a GET request to `[URL]` and got this JSON response: `[paste JSON]`. Explain what this data means."*
- *"I need to test an endpoint that creates a new User. What are 5 negative test cases I should automate?"*
- *"I am getting a `401 Unauthorized` error on this Python API test. What does that mean and how do I fix it?"*

---

# 🏋️ Exercises for This Week

Use the free API: `https://jsonplaceholder.typicode.com/`

1. **Postman:** Create a Postman collection. Add a `GET` request for `/posts/1` and a `POST` request to `/posts`. Save them.
2. **Pytest GET:** Write a Python test that GETs `/posts/1` and asserts the `userId` is `1`.
3. **Pytest 404:** Write a Python test that GETs `/posts/999999` (which doesn't exist) and asserts the `response.status_code == 404`.

---

# ✅ Week 9 Complete!

**Definition of Done Checklist:**
- [ ] You have a Postman collection with at least 2 requests saved.
- [ ] You have 5 API tests written in Python using `requests`.
- [ ] You can explain the difference between a `200`, `404`, and `500` status code.
- [ ] You understand what JSON is and how to read it.

**You are now a full-stack QA! UI and API automation unlocked. 🔓**
