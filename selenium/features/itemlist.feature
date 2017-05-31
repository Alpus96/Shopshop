Feature: Item list 
	As a user I should be able to add the item into the list.

	Scenario: Add the item name quantity and catagory.
	   Given that I have item quantity and category of an item
	   When I enter item name quantity and category
	   And click on Lägatill button
	   Then I should be able to save the item.