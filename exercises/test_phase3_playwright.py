# EXERCISE 1: Your First UI Fix
# This Playwright test tries to add a "Learn Python" todo item and check if it appears.
# But the locator is wrong! The placeholder on the actual website is "What needs to be done?"
# Run the test, watch it fail in the browser, and fix the locator.

# (Make sure to run `pip install pytest-playwright` and `playwright install` first!)

def test_add_todo_item(page):
    # 1. Arrange: Go to the Todo app
    page.goto("https://demo.playwright.dev/todomvc")

    # 2. Act: Fill the input and press Enter
    page.get_by_placeholder("Type a new todo item here...").fill("Learn Python") # <-- FIX ME
    page.keyboard.press("Enter")

    # 3. Assert: The item should be visible on the list
    assert page.get_by_text("Learn Python").is_visible()


# EXERCISE 2: Completing a Todo (Your Turn!)
# Write a test that adds a todo item, then clicks the little circle checkbox next to it 
# to mark it as completed. Use the Playwright codegen tool if you get stuck!

def test_complete_todo_item(page):
    page.goto("https://demo.playwright.dev/todomvc")
    
    # <-- Write your code here
