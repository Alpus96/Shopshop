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
 			| "909"|
 			| " /" |
			| " *" |


	Scenario Outline: Adding an item to an empty grocery list
		Given that I have an empty grocery list
		When I add <itemsInList> item to the list
		Then I should have <itemsInList> item in my grocery list.
		And the item shoud be a grocery list item.

	    Examples:
	      | itemsInList | 
	      | 		  1 |
	      |  		 99 | 
	      |  	  10000 |  


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
 			
 			
			
