
const { defineSupportCode } = require('cucumber');
const assert = require('assert');

const User = require("../../app/controllers/user.js");
const List = require("../../app/controllers/grocery-list.js")
const GroceryItem = require("../../app/controllers/grocery-list-items.js")

defineSupportCode ( ( { Given, When, Then } ) => {


       let theUser,runTimeErroronSelectedEmptyList,itemName,listName,items;
       items = ["sugar","milk","Tea","fish","rice","cake"];
       itemName = "sugar";

       Given('that I have no items in the selected grocery list', function (callback) {
           theUser = new User();
           cookie = null;
  		     runTimeErroronSelectedEmptyList= false;
           callback();
       });

       Given('that I have selected grocery list', function (callback) {
          listName = "testList";
          theUser.addList(listName);
          callback();
       });

       Given('I have {int} items in selected grocery list', function (int, callback) {
          for(var i = 0; i <int-1; i++) {
            theUser.lists[listName].addToList(items[i],10,"Grosöker");
          }

          callback();
       });

       When('I try to remove an item from empty selected list', function (callback) {
           try{
             theUser.removeItemFromUserList(listName,itemName);
           }
           catch(e){
              runTimeErroronSelectedEmptyList= true;
           }
           callback();
      
       });
       
      When('I remove {item} item from the selected grocery list', function (item, callback) {
          let listindex =2;
           
           /*for(var i = 0; i <int; i++) {
            items.push(makeString());
            theUser.lists[listName].addToList(items[i], 5,"morrot");
        }*/
           theUser.removeItemFromUserList(listindex,item);
           callback();
       });
   


        

       Then('I should not have {stringInDoubleQuotes} item in my selected grocery list.', function (stringInDoubleQuotes, callback) {
          for(let item of theUser.lists[listName].items){
            assert(item.name !== stringInDoubleQuotes);
         }
         
          callback();
        });
       


      
       Then('I should get runtime errors.', function (callback) {
         assert(runTimeErroronSelectedEmptyList);
         callback();
        
       });

       /*
        Then('I should have {int} items in the selected grocery list', function (int, callback) {
          assert(theUser.items.length = int);
         callback();
       });*/


 });



