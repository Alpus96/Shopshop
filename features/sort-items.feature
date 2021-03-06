Feature: Sorting an item from the grocery-list
	As a shopper

	Scenario Outline: Sort <name> according to <sort>.
		Given logged in user
		And I have created list a list with name <name> that contains <items> whith category <categories>
		When I want to sort the items in the lists according to category <sort>
		Then I should see <items> in the list <name> whith the category <sort> first.

		Examples:
		| name             | items 				                   |  categories                  |sort|
		| "week 42"        | Kolja,Oxsvans,Torsk,Bacon	 		   |  Fish,Meat,Fish,Meat 		  |Meat|

	Scenario Outline: Sort <name> in alfabetic order.
		Given logged in user
		And I have a list with name <name> that contains <items> 
		When I sort the <items> in the lists according to alfabetic order
		Then I should see <items> in alfabetic order.

		Examples:
		| name             | items						|
		| "week 42"        | Kolja,Oxsvans,Torsk,Bacon	|
