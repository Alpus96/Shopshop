let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryListItem = require('../../app/controllers/grocery-list-items.js');

defineSupportCode(function({Given, When, Then}) {

	let theList, runtimeErrorOnNoName;
		let listOfItems = [];
		let itemsList = [];
		let categoriesList =[];
	

	 Given('logged in user', function (callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback();
	  });

	  Given('I have created list a list with name {name} that contains {items} whith category {categories}', function (name, items,categories, callback) {
	        theList = new GroceryList(name);
	        for(let i=0;i<10;i++){
		        itemsList = items.split(",");
		        console.log('Adding: ' + itemsList);
		        categoriesList = categories.split(",");
	    	}
	       
	        for(let i=0;i<itemsList.length;i++){
	        theList.addToList(itemsList[i],20,categoriesList[i]);
	        }
	        
	        callback();
	   });

	   When('I want to sort the {items} in the lists according to category {sort}', function (items, sort, callback) {

	   		items= theList.getItemsInTheList();
	   			 console.warn('Lista test1 ', items);
		     listOfItems = theList.getSortedList(sort);
		     console.warn('Lista test2 ',listOfItems);
	         callback();
	    });

	   Then('I should see {items} in the list {name} whith the category {sort} first.', function (items,name,sort, callback) {
	   		// This is a test of filtering on a category not sorting by categories
	   		/*sorted = true;
	        for(let item in listOfItems){
	        	assert(item.category===sort, '');
		     }*/
		      //listOfItems = theList.getSortedList(sort);
		      console.warn('Lista test20 ', listOfItems);
		    let foundCategories = [];
		    for(let item of listOfItems){
		    	if(foundCategories.indexOf(item.category) < 0){
		    		foundCategories.push(item.category);
		    		 console.warn('Lista test1 ', foundCategories);
		    	}
		    	else if(foundCategories.indexOf(item.category) >= 0){
		    		// if not last in list then not ok - things seems unsorted
		    		if(foundCategories[foundCategories.length - 1] !== item.category){
		    			assert(false);
		    		}
		    	}
		    }
	        callback();
	    });

});