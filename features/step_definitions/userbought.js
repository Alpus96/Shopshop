const { defineSupportCode } = require('cucumber');
const assert = require('assert');

const User = require("../../app/controllers/user.js");
const List = require("../../app/controllers/grocery-list.js")
const GroceryItem = require("../../app/controllers/grocery-items.js")


defineSupportCode ( ( { Given, When, Then } ) => {

    let User, user, cookie, error, listName;

    Given('I am logged user', function (callback) {
        // Require the User Class to test.
        //User = require('../../app/controllers/user.js');
        callback();
    });


    When('I have bought <amount > of items from  Grocery List <List> bought is set too true', function (callback) {
        //  Create a new instance of User.
        cookie = null;
        user = new User();
        callback();
    });

    Then('<amount> of items from Grocery List <List>should be marked as bought. ', function (callback) {
        assert(
            user.loggedIn === false,
            'Incorrect logged in status.'
        );
        callback();
    });


    function makeString () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for ( var i=0; i <= 4; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

});
