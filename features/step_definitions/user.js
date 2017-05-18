const { defineSupportCode } = require('cucumber');
const assert = require('assert');

const User = require("../../app/controllers/user.js");
const List = require("../../app/controllers/grocery-list.js")
const GroceryItem = require("../../app/controllers/grocery-list-items.js")

defineSupportCode ( ( { Given, When, Then } ) => {

    let User, user, cookie, error, listName, items;

    Given('I have required the User Class', function (callback) {
        // Require the User Class to test.
        User = require('../../app/controllers/user.js');
        callback();
    });

    Given('that I am visiting the page as a User', function (callback) {
        //  Code for testing goes here.
        user = new User();
        callback();
    });

    Given('I have an empty list', function (callback) {
        //  Code for testing goes here.
        listName = "testList";
        user.addList(listName);
        callback();
    });

    Given('I am not logged in', function (callback) {
        cookie = {};
        user = new User();
        callback();
    });

    Given('I am logged in', function (callback) {
        cookie = {id: 0, username: 'testUser', password: 'testPass123'};
        user = new User(cookie);
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
        cookie = {id: 'testUser', username: -2, password: 'testPass123'};
        assert.throws(
            () => {
                user = new User(cookie);
                error = false;
            },
            'Unexpected success.'
        );
        callback();
    });

    When('I add an {int} of groceryItems to my groceryList', function (int, callback) {
        //  Code for testing goes here.
        for(var i = 0; i <int; i++) {
            items.push(makeString());
            user.lists[listName].addToList(items[i], 5,"morrot");
        }
        callback();
    });

    When('I create {int} lists', function (int, callback) {
        callback(null);
        for (var i = 0; i < int; i++) {
            user.addList(makeString());
        }
        callback();
    });

    When('I save the lists', function (callback) {
        user.saveLists();
        callback();
    });

    When('I reload the page', function (callback) {
        user = new User(cookie.id ? cookie : null);
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

    Then('I should have {int} lists', function (int, callback) {
        assert(
            user.lists.length === int,
            'Invalid amount of lists.'
        );
        callback();
    });

    Then('I should have an {int} items in my groceryList', function (int, callback) {
        assert(user.lists[listName].items.length === int);
        callback();

    });

    Then('every item should be an instance of groceryItem', function (callback) {
        //  Code for testing goes here.
        for (let item of user.lists[listName].items){
            assert(item instanceof GroceryItem);
       }
        callback();
    });

    Then('the groceryItems should not remain after the page is reloaded', function (callback) {
        user= new User();
        callback();
    });

    Then('there should be no groceryList remaining after the page is reloaded', function (callback) {
        //  Code for testing goes here.
        assert(user.lists.length ===0)
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
