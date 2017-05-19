Feature: A visitor should be able to view the site.

    Scenario Outline: Create an instance of user with and without a cookie
        Given I have required the User Class
        When <createInstance>
        Then logged in status should be set to <loggedIn>
        And an object holding the cookie

        Examples:
            |                      createInstance                       | loggedIn |
            | create a new instance without a cookie |     false    |
            |    create a new instance with a cookie    |     true     |

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
        And they should disappear when I delete them

        Examples:
            |       status       | amount | saved |
            | not logged in |       4       |     0     |
            |    logged in     |       4       |     4     |

    Scenario Outline: Add items to a groceryList as a visitor.
        Given I am not logged in
        When I create 1 lists
        And I add an <amount> of groceryItems to my groceryList
        Then I should have an <amount> items in my groceryList
        And every item should be an instance of groceryItem
        And the groceryItems should not remain after the page is reloaded
        And there should be no groceryList remaining after the page is reloaded

    Scenario Outline: Add items to a groceryList as a user.
        Given I am <status>
        When I create 1 lists
        And I add <amount> groceryItems to my groceryList
        Then I should have <amount> items in my groceryList
        And every item should be a groceryItem
        And <saved> items should remain in my groceryList after the page is reloaded

        Examples:
            |       status       | amount | saved |
            |     logged in    |       6       |     6     |
            | not logged in |       6       |     0     |
