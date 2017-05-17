const { defineSupportCode } = require('cucumber');
const assert = require('assert');

defineSupportCode ( ( { Given, When, Then } ) => {
    Given('...', function (callback) {
        //  Code for testing goes here.
        callback(null, "pending");
    });

    When('...', function (callback) {
        //  Code for testing goes here.
        callback(null, "pending");
    });

    Then('...', function (callback) {
        //  Code for testing goes here.
        callback(null, "pending");
    });

});
