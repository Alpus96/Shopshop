Feature: A visitor should be able to view the site.

Scenario: User should not be able to remove the item from the empty selected list. 

    Given that I have no items in the selected grocery list
        When I try to remove an item from empty selected list
        Then I should get runtime error.
