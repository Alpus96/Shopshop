
let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryUserRemove = require('../../app/controllers/grocery-list.js');
let GroceryItem = require('../../app/controllers/grocery-list-items.js');

defineSupportCode(function({Given, When, Then}) {

       let theItem,runTimeErroronSelectedEmptyList,quantity,category,itemName;
       items = ["sugar","milk","Tea","fish","rice","cake"];

       Given('that I have no items in the selected grocery list', function (callback) {
           theItem = new GroceryUserRemove('Mat');
  		     runTimeErroronSelectedEmptyList= false;
           callback();
       });

       Given('that I have selected grocery list', function (callback) {
         theItem = new GroceryUserRemove('Mat');
          runTimeErroronSelectedEmptyList= false;
         callback();
       });

       Given('I have {amount} items in selected grocery list', function (amount, callback) {
           for(let i = 0; i < amount-1; i++){
             theItem.addToList("Test " + i, 10, "Grönsaker");
         }
         callback();
       });


        When('I try to remove an item from empty selected list', function (callback) {
           try{
             theItem.removeItemNameInList(itemName);
           }
           catch(e){
              runTimeErroronSelectedEmptyList= true;
           }
           callback();
      
       });

         When('I remove {item} item from the selected grocery list', function (item, callback) {
         theItem.addToList(item,10,"Grönsaker");
         theItem.removeItemNameInList(item);
         callback();
       });



       Then('I should get runtime errors.', function (callback) {
         assert(runTimeErroronSelectedEmptyList);
         callback();
        
       });

       Then('I should not have {stringInDoubleQuotes} item in my selected grocery list.', function (itemName,callback) {
         for(let item of theItem.items){
            assert(item.name !== itemName);
         }
         callback();
       });

        Then('I should have {int} items in the selected grocery list', function (int, callback) {
          assert(theItem.items.length = int);
         callback();
       });



 });



