const { defineSupportCode } = require('cucumber');
const assert = require('assert');

defineSupportCode ( ( { Given, When, Then } ) => {

    let User, user, cookie, error;

    Given('I have required the User Class', function (callback) {
        // Require the User Class to test.
        User = require('../../app/controllers/user.js');
        callback();
    });

    When('create a new instance without a cookie', function (callback) {
        //  Create a new instance of User.
        cookie = null;
        user = new User();
        callback();
    });

    When('create a new instance with a cookie', function (callback) {
        //  Create a new instance of User.
        cookie = {id: 0, username: 'testUser', password: 'testPass123'};
        user = new User(cookie);
        callback();
    });

    When('I create an instance with an invalid cookie', function (callback) {
        //  Create a new instance of User.
        error = true;
        assert.throws(
            () => {
                cookie = {id: 'testUser', username: -2, password: 'testPass123'};
                user = new User(cookie);
                error = false;
            },
            'Unexpected success.'
        );
        callback();
    });

    Then('logged in status should be set to false', function (callback) {
        assert(
            user.loggedIn === false,
            'Incorrect logged in status.'
        );
        callback();
    });

    Then('logged in status should be set to true', function (callback) {
        assert(
            user.loggedIn === true,
            'Incorrect logged in status.'
        );
        callback();
    });

    Then('an object holding the cookie', function (callback) {
        assert(
            user.cookie === cookie,
            'Incorrect cookie.'
        );
        callback();
    });


    Then('I should get an error', function (callback) {
        assert(
            error,
            'Unexpected success.'
        );
        callback();
    });

});
