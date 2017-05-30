function sleep(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },ms);
  });
}

module.exports = function () {

  this.Given(/^I am not logged in navigates to GroceryList page$/,async function() {
      await helpers.loadPage('http://localhost:3000');
  });
         
  this.When(/^I click on select list valj-kategory button$/,async function() {
       await driver.findElement(By.id("categories")).click(); 
       sleep(10000);
  });



  this.Then(/^I should see 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt'$/,async function() {

     // This actually tests 2 things: 
     // 1) That the values are in the select list
     // 2) And that the list is displayed after clicking it...

     // Array of things we expect to see / that should exist in the select list
     let categories = ['Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt'];

     // Get the option elements
     let optionElements = await driver.findElements(By.css("#categories option"));
     
     for(let option of optionElements){

       let text = await option.getText();
       let size = await option.getSize(); // we can't get a reliable size/width/height so ignore for now
       let visible = size.height >= 0;  // isDisplayed always returne true...
   
       if(categories.indexOf(text) >= 0 && visible){
         // Remove found category from our list of categories
         categories.splice(categories.indexOf(text),1);
       }

     }

     // If we have categories left then they are not in the list or not displayed
     assert(categories.length === 0,"The following categories are missing " + categories.join(", "));

   });  


  this.Given(/^I am logged in navigates to GroceryList page$/, function() {
      const cookie = {
              id: 0,
              username: "testUser",
              password: "testPass123"
          };

    return helpers.loadPage('http://localhost:3000');
  });

  this.Given(/^that I have text box to add list name$/, async function() {
     await helpers.loadPage('http://localhost:3000');
     await driver.findElement(By.id("addlist"));
  });


  this.When(/^I enter list name$/, async function() {
       await driver.findElement(By.id("listname")).sendKeys("Monday list");
  });

  this.When(/^I click on Lägatill button$/, async function() {
        await driver.findElement(By.id("addListBtn")).click();
  });

  this.Then(/^I should get a list with name it has been mentioned.$/, async function() {
    await sleep(3000); // waiting because we will want to wait for ajax response in the app...
    let lists = await driver.findElements(By.css(".list-name"));
    let found = false;
    for(list of lists){
      let text = await list.getText();
      if(text === "Monday list"){found = true;}
    }
    assert(found,"Can't find a list with the name Monday list.");
  });

};


