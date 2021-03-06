Feature: A visitor should be able to view the site.

    Scenario Outline: Create an instance of user with an without a cookie
        Given I have required the User Class
        When <createInstance>
        Then logged in status should be set to <loggedIn>
        And an object holding the cookie

    Scenario Outline: The user class should throw error on cookie when not logged in.
        Given I am not logged in
        When I make a request with a cookie
        Then the user class should throw an error

    Scenario Outline: The user class should handle logged in users cookie.
        Given I am logged in
        When I make a request with a cookie
        Then the user class should handle that cookie

    Scenario Outline: The user class should handle users.
        Given I make a request
        When <status>
        Then the user class should handle that request

    Scenario: Create an instance of user with an invalid cookie
        Given I have required the User Class
        When I create an instance with an invalid cookie
        Then I should get an error

    Scenario Outline: A user should be able to create new lists
        Given I am <status>
        When I create <amount> lists
        Then I should have <amount> lists

        Examples:
            |       status       | amount |
            | not logged in |       1       |
            | not logged in |       3       |
            |    logged in     |       1       |
            |    logged in     |       3       |

    Scenario Outline: Saving lists.
        Given I am <status>
        When I create <amount> lists
        And I save the lists
        And I reload the page
        Then I should have <saved> lists

        Examples:
            |       status       | amount | saved |
            | not logged in |       4       |     0     |
            |    logged in     |       4       |     4     |

    Scenario Outline: Add items to a groceryList as a visitor.
        Given that I am visiting the page as a User
        And I have an empty list
        When I add an <amount> of groceryItems to my groceryList
        Then I should have an <amount> items in my groceryList
        And every item should be an instance of groceryItem
        And the list should not remain after the page is reloaded.

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

        
    Scenario: As user I should be able to know the items that are bought in a selected list.
        Given I have a bought items in a selected list
        When I want to know the bought items
        Then I should be able to see all items thar are bought from a selected list.

        
