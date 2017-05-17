Feature: A visitor should be able to view the site.

Scenario Outline: Create an instance of user with an without a cookie
    Given I have required the User Class
    When <createInstance>
    Then logged in status should be set to <loggedIn>
    And an object holding the cookie

    Examples:
        |                      createInstance                       | loggedIn |
        | create a new instance without a cookie |     false    |
        |    create a new instance with a cookie    |     true      |

Scenario: Create an instance of user with an invalid cookie
    Given I have required the User Class
    When I create an instance with an invalid cookie
    Then I should get an error
