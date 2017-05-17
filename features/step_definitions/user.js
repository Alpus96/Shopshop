const { defineSupportCode } = require('cucumber');
const assert = require('assert');

// Require the User Class to test.
const User = require('../../app/controllers/user.js');

defineSupportCode ( ( { Given, When, Then } ) => {
    //  Variable to ceep the user instance in.
    let user, cookie;

    Given('I am not logged in', function (callback) {
        //  Create a new instance of a user that is not logged in.
        user = new User();
        // End action.
        callback();
    });

    Given('I am logged in', function (callback) {
        //  Create a new instance of a user.
        user = new User();
        //  Then loggin.
        user.loggin({username: 'testUser', password: 'testPass123'});
        // End action.
        callback();
    });

    When('I make a request with a cookie', function (callback) {
        // Write code here that turns the phrase above into concrete actions


        // End action.
        callback();
    });

    When('I make a request', function (callback) {
        // Write code here that turns the phrase above into concrete actions


        // End action.
        callback();
    });

    Then('the user class should throw an error', function (callback) {
        // Write code here that turns the phrase above into concrete actions


        // End action.
        callback();
    });

    Then('the user class should handle that cookie', function (callback) {
        // Write code here that turns the phrase above into concrete actions


        // End action.
        callback();
    });

    Then('the user class should handle that request', function (callback) {
        // Write code here that turns the phrase above into concrete actions


        // End action.
        callback();
    });

});
