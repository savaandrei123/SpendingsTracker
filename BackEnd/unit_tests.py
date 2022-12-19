from user import User
from spending import Spending
from datetime import datetime

def test_new_user():
    print("Begin testing user creation")
    user = User("Test11", "testEmail1@yahoo.com", "testPassword1")
    assert user.username == "Test11" , "Should be Test11"
    assert user.email == "testEmail1@yahoo.com", "should be testEmail1@yahoo.com"
    assert user.password == "testPassword1", "should be testPassword1"
    print("everything passed")

def test_spendings():
    d = datetime.today()
    print("Begin testing spendings functionalities")
    converted_values = Spending.convert_currencies(100,"EUR",d)
    spending = Spending("name","category",converted_values[0],converted_values[1],converted_values[2],converted_values[3],d,"testEmail1@yahoo.com")
    assert spending.name == "name", "should be name"
    assert spending.category == "category", "should be category"
    assert spending.value_eur == converted_values[0], "should be the value of converted_values[0] "
    assert spending.value_usd == converted_values[1], "should be the value of converted_values[1] "
    assert spending.value_gbp == converted_values[2], "should be the value of converted_values[2] "
    assert spending.value_ron == converted_values[3], "should be the value of converted_values[3] "
    assert spending.email == "testEmail1@yahoo.com", "should be testEmail1@yahoo.com"
    print("Everything passed")
    
    
test_new_user()
test_spendings()

     