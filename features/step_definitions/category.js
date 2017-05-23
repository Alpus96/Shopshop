const { defineSupportCode } = require('cucumber');
const assert = require('assert');

const GroceryList = require('../../app/controllers/grocery-list.js');

defineSupportCode ( ( { Given, When, Then } ) => {
    let list;

    Given('I have an empty list', function (callback) {
        list = new GroceryList('TestList');
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    When('I add items with categories {categories}', function (categories, callback) {
        const cat = categories.split(', ');
        for (let category in cat) {
            list.addToList(makeString(2), 1, cat[category]);
        }
        callback();
    });

    Then('the lists categories should be {categories}', function (categories, callback) {
        const cat = categories.split(', ');
        assert.deepStrictEqual(list.categories, cat);
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    function makeString (length) {
        if (typeof length === 'number' && length > 0) {
            var alt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let res = '';
            for (let i = 0; i < length; i++) {
                res += alt[Math.random() * alt.length];
            }
            return res;
        } else {
            throw new Error('Cannot make string ' + length + ' long.');
        }
    }

});
