Feature: A visitor should be able to mark item as bought.


	Scenario outline: Mark the groceries.
	 	Given I am logged user
	 	When I have bought <amount > of items from  Grocery List <List> bought is set too true 
		Then <amount> of items from Grocery List <List>should be marked as bought. 
		Examples:
		|amount| |     List     |
		|    1 | |  "Fruit "    |
	 	|    2 | | "Vegetables" |
