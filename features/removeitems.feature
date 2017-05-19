Feature: Removing an item from the grocery-list
	As a shopper
	I Should be able to remove items to my grocery list so that I should be able to delete from list.

	Scenario: A user should not be able to remove from empty grocery list
		Given that I have no items in grocery list
		When I try to remove an item from empty list
		Then I should get runtime error.

	Scenario Outline: Removing an item from grocery list
		Given that I have an grocery list
		And I have <amount> items in grocery list
		When I remove <item> item to the list
		Then I should not have <item> item in my grocery list.
		And I should have <newAmount> items in the list
		

	    Examples:


	     | amount | newAmount | item    |
	     | 5      |         4 | "sugar" |