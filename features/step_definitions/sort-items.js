let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryListItem = require('../../app/controllers/grocery-items.js');

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

		        categoriesList = categories.split(",");
	    	}

	        for(let i=0;i<itemsList.length;i++){
	        theList.addToList(itemsList[i],20,categoriesList[i]);
	        }

	        callback();
	   });

	   When('I want to sort the {items} in the lists according to category {sort}', function (items, sort, callback) {

	   		items= theList.getItemsInTheList();

		     listOfItems = theList.getSortedList(sort);

	         callback();
	    });

	   Then('I should see {items} in the list {name} whith the category {sort} first.', function (items,name,sort, callback) {
	   		// This is a test of filtering on a category not sorting by categories
	   		/*sorted = true;
	        for(let item in listOfItems){
	        	assert(item.category===sort, '');
		     }*/
		      //listOfItems = theList.getSortedList(sort);

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

	    Given('I have a list with name {name} that contains {items}', function (name,items, callback) {
          theList = new GroceryList(name);
	        for(let i=0;i<10;i++){
		        itemsList = items.split(",");

	    	}

	        for(let i=0;i<itemsList.length;i++){
	        theList.addToList(itemsList[i],20,category = "Frukt");
	        }
         callback();
        });

         When('I sort the {items} in the lists according to alfabetic order', function (items,callback) {
        		 items= theList.getItemsInTheList();
        		 listOfItems = theList.getListSortedAlfabeticalOrder();
         callback();
       });


		Then('I should see {items} in alfabetic order.', function (items, callback) {
			for(let item in listOfItems){
				if(it) {}
			}
			/*_.every(arr, function(value, index, listOfItems) {
			  // either it is the first element, or otherwise this element should
			  // not be smaller than the previous element.
			  // spec requires string conversion
			  return index === 0 || String(array[index - 1]) <= String(value);
			});*/
			callback();
		});

          Then('I should see <items> in alfabetic order.', function (callback) {
        			for(let i = 0; i < listOfItems.length; i++){
        				if(listOfItems[i] < listOfItems[i+1]) {
							assert(false);
						}
        			}
         	callback();
       });

});
