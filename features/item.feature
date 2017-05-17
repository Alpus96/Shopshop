Feature: Scenario for grocery item

Scenario: Verify if the grocery item is created or not
    Given I create a new grocery item as sugar and quantity 1
    Then the item name should be sugar
    And the quantity should be 1
