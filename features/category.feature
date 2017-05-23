Feature: Item and list categories.

    Scenario Outline: All items categories should be in the lists categories.
        Given I have an empty list
        When I add items with categories <categories>
        Then the lists categories should be <categories>

        Examples:
            |              categories             |
            |                  Dairy                   |
            | Meat, Vegetables, Candy |
