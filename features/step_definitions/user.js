const { defineSupportCode } = require('cucumber');
const assert = require('assert');

const User = require("../../app/controllers/user.js");
const List = require("../../app/controllers/grocery-list.js")
const GroceryItem = require("../../app/controllers/grocery-items.js")

defineSupportCode ( ( { Given, When, Then } ) => {

    let User, user, cookie, error, listName = "Grönsoker", items, cridentials;
    //let items = ["sugar","milk","Tea","fish","rice","cake"];

    /*
    *   Given. In scenario order.
    * */

    Given('I have required the User Class', function (callback) {
        // Require the User Class to test.
        User = require('../../app/controllers/user.js');
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

    Given('I have an account', function (callback) {
        cridentials = {username: 'accountTest', password: 'accountPass123'}
        user.registerAccount(cridentials);
        callback();
    });

    Given('I am visitor of the page', function (callback) {
        user = new User(cookie.id >= 0 ? cookie : null);
        callback();
    });

     Given('I have a bought items in a selected list', function (callback) {
         let itemName = "Gurka";
         listOfBoughtItems = new List();
         listOfBoughtItems.buy(itemName);
         listOfBoughtItems.boughtItems(itemName);
         listOfBoughtItems.addToList(itemName,10,"Grönsoker");
         callback();
       });

     When('I want to know the bought items', function (callback) {
          user.boughtitemsinList(listName);
         callback();
       });

      Given('I make a request', function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback();
       });
     When('<status>', function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });
     
    /*
    *   When. In scenario order.
    * */

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

    When('I create {int} lists', function (int, callback) {
        callback(null);
        for (var i = 0; i < int; i++) {
            user.addList(makeString());
        }
        for (let list in user.lists) {
            user.lists[list].addToList('Beaf', 2, 'meat');
        }
        callback();
    });

    When('I save the lists', function (callback) {
        user.saveLists();
        callback();
    });

    When('I reload the page', function (callback) {
        user = new User(cookie.id >= 0 ? cookie : null);
        callback();
    });

    When('I add {int} groceryItems to my groceryList', function (int, callback) {
        //  Code for testing goes here.
        for(var i = 0; i <int; i++) {
            items.push(makeString());
            user.lists[listName].addToList(items[i], 5,"morrot");
        }
        callback();
    });

    When('I delete my account', function (callback) {
        cookie = user.login(cridentials);
        console.log(cookie, cridentials);
        user = new User(cookie);
        user.deleteAccount(cridentials);
        callback();
    });


    When('I create my account', function (callback) {
        cridentials = {username: 'accountTest', password: 'accountPass123'}
        user.registerAccount(cridentials);
        callback();
       });
    
    


    /*
    *   Then. In scenario order.
    * */

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
            Object.keys(user.lists).length === int,
            'Invalid amount of lists.'
        );
        callback();
    });

    Then('they should disappear when I delete them', function (callback) {
        for (let listName in user.lists) {
            user.deleteList(listName);
        }
        user = new User(typeof cookie != 'object' ? cookie : null);
        assert(Object.keys(user.lists).length === 0);
        callback();
    });

    Then('I should have {int} items in my groceryList', function (int, callback) {
        assert(user.lists[listName].items.length === int);
        callback();
    });

    Then('every item should be a groceryItem', function (callback) {
        //  Code for testing goes here.
        for (let item of user.lists[listName].items){
            assert(item instanceof GroceryItem);
       }
        callback();
    });

    Then('{int} items should remain in my groceryList after the page is reloaded', function (callback) {
        user= new User();
        callback();
    });

    Then('I should no longer have an account', function (callback) {
        //assert.deepStrictEqual(user.login(cridentials), false);
        assert(!user.login(cridentials));
        callback();
    });

    Then('I should have an account.', function (callback) {
         assert(user.login(cridentials));
         callback();
       });

     Then('I should be able to see all items thar are bought from a selected list.', function (callback) {
         // Write code here that turns the phrase above into concrete actions
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
