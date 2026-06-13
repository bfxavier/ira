import pytest

# EXERCISE 1: The AAA Pattern
# This test works, but it's messy and hard to read. 
# Add comments labeling the # 1. Arrange, # 2. Act, and # 3. Assert steps.

def test_calculate_cart_total():
    item1_price = 10
    item2_price = 15
    tax = 2
    total = item1_price + item2_price + tax
    assert total == 27


# EXERCISE 2: Parametrize
# Here are three separate tests that do the EXACT same thing with different data.
# This is a bad QA practice (copy-pasting). 
# Rewrite them into ONE single test using @pytest.mark.parametrize.

def is_adult(age):
    return age >= 18

def test_adult_age_18():
    assert is_adult(18) is True

def test_adult_age_25():
    assert is_adult(25) is True

def test_adult_age_17():
    assert is_adult(17) is False

# <-- Write your new parametrized test here and delete the three above!
