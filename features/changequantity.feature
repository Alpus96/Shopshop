Feature: Changing quantity of an item from the selected grocery-list
	As a shopper
	I Should be able to change the quantity of items from selected grocery list.


	Scenario: An user should not be able to change quantity of a nonexisting item.
        Given that I have a selected grocery list
        And that I do not have an item from the selected list
        When I try to change the quantity of a nonexisting item from the selected list
        Then I should get run time Quantity error.			
         

    Scenario Outline: change item quantity
		Given that I have a selected grocery list
		When I try to change qunatity to <newquantity> 
		Then I should have <newquantity> in quantity on the item.
		
		Examples:
			| newquantity |
			|        6    | 


        
 			



