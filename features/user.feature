

Scenario: The user class should throw error on cookie when not logged in.
    Given I am not logged in
    When I make a request with a cookie
    Then the user class should throw an error

Scenario: The user class should handle logged in users cookie.
    Given I am logged in
    When I make a request with a cookie
    Then the user class should handle that cookie

Scenario: The user class should handle users.
    Given I make a request
    When <status>
    Then the user class should handle that request

    Examples:
        |            status   |
        | I am not logged in  |
        |    I am logged in   |

        |            status   |
        | I am not logged in  |
        |    I am logged in   |

