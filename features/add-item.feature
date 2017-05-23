Feature: Adding an item to the grocery-list
	As a shopper
	I Should be able to add named items to my grocery list so that I can remember to buy them.


	Scenario Outline: An user should not be able to add unnamed items.
		Given that I have a grocery list
		When I try to add an item called <name>
		Then I should get a runtime error.
		Examples:
			| name |
			| " "  |
 			| " /" |
			| " *" |


	Scenario Outline: User giving grocery quantity to an item.
		Given that i have a grocery list and a item <name>
		When I try to add a <number> quantity to a item <name> in grocery list
		Then I should get a runtime error

		Examples:
			| number   || name   	|
			|  " "     ||"Morotter" |
 			| "gar"    ||"Potatis" 	|
 			| " /" 	   ||"Applen" 	|
			| " *" 	   ||"Bananer"  |

	Scenario: User should choose category.
		Given that I have a grocery list
		When I try to add an item to a grocery list and catagory is undefined
		Then I should get a runtime error
