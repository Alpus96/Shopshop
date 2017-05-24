Feature: Scenario for grocery item

Scenario Outline: Verify if the grocery item is created or not
    Given I create a new grocery item as sugar and quantity as <int> 
    Then the item name should be sugar
    And the quantity should be <int>.
     
       Examples:
           | int |
           |  3  |
           |  1  | 