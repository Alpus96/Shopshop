Feature: A visitor should be able to view the site.


 Scenario Outline: Add items to a groceryList as a visitor. 
    Given that I am visiting the page as a User
    And I have an empty list
    When I add an <amount> of groceryItems to my groceryList 
    Then I should have an <amount> items in my groceryList
    And every item should be an instance of groceryItem
    And the groceryItems should not remain after the page is reloaded
    And there should be no groceryList remaining after the page is reloaded

    Examples: 
    | amount | 
    |      1 | 
    |      3 |

 Scenario Outline: Add items to a groceryList as a user. 
    Given that I am logged in as a User to the page
    When I add an <amount> of groceryItems to my groceryList
    Then I should have an <amount> of groceryItems in my groceryList
    And every item should be an instance of groceryItem
    And <amount> of groceryItems should remain in my groceryList after the page is reloaded
    
    Examples: 
    | amount | 
    |      1 | 
    |      3 |
