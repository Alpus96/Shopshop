Feature: A visitor should be able to view the site.

Scenario: User should not be able to remove the item from the empty selected list. 

    Given that I have no items in the selected grocery list
    When I try to remove an item from empty selected list
    Then I should get runtime error.

Scenario Outline: Removing an item from selected grocery list
	Given that I have selected grocery list
	And I have <amount> items in selected grocery list
	When I remove <item> item from the selected grocery list
	Then I should not have <item> item in my selected grocery list.
	

    Examples:


     | amount | newAmount | item    |
     | 5      |         4 | "sugar" |