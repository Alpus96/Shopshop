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

    Examples:
        |                      createInstance                       | loggedIn |
        | create a new instance without a cookie |     false    |
        |    create a new instance with a cookie |     true     |

    Scenario: Create an instance of user with an invalid cookie
        Given I have required the User Class
        When I create an instance with an invalid cookie
        Then I should get an error


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
            |  |
    

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
