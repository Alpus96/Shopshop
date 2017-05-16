<<<<<<< HEAD
Feature: description text.

Scenario: description text.
    Given ...
    When ...
    Then ...

Scenario Outline: description text.
    Given ... <var1>
    When ... <var1>
    Then ... <var2>

    Examples:
    |  var1  |  var2  |
    |     4    | "four" |
    |     5    | "five"  |
=======
Feature: Scenario for grocery item 

Scenario: Verify if the grocery item is created or not
    Given I create a new grocery item as sugar and quantity 1
    Then the item name should be sugar 
    And the quantity should be 1


  









>>>>>>> feature/AddingGroceryItem
