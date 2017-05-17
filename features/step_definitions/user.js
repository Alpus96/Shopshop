const { defineSupportCode } = require('cucumber');
const assert = require('assert');
const User = require("../../controllers/user.js");
const List = require("../../controllers/grocery-list.js")
const GroceryItem = require("../../controllers/grocery-list-items.js")


defineSupportCode ( ( { Given, When, Then } ) => {
    let user,listName,items;

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

    When('I add an {int} of groceryItems to my groceryList', function (int, callback) {
        //  Code for testing goes here.
        for(var i = 0; i <int; i++) {
            items.push(makeString());
            user.lists[listName].addToList(items[i], 5,"morrot");
        }
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
    }

    Then('the groceryItems should not remain after the page is reloaded', function (callback) {
        user= new User();
        callback();
    });

    Then('there should be no groceryList remaining after the page is reloaded', function (callback) {
        //  Code for testing goes here.
        assert(user.lists.length ===0)
        callback();
    });

    makeString () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for ( var i=0; i <= 4; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
    

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
