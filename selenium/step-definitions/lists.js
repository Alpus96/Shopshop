function sleep(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },ms);
  });
}

let checklist = false;
let numberOfLists;

module.exports = function () {

  this.Given(/^I am not logged in navigates to GroceryList page$/,async function() {
    await helpers.loadPage('http://localhost:3000');
  });
         
  this.When(/^I click on select list valj-kategory button$/,async function() {
    await driver.findElement(By.id("categories")).click(); 
    checklist = true;
  });


  this.Then(/^I should see 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt'$/,async function() {
    
     // Array of things we expect to see / that should exist in the select list
    let categories = ['Fisk','Kött', 'Godis', 'Grönsaker','Frukt'];

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
     assert(checklist && categories.length === 0,"The following categories are missing " + categories.join(", "));

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
    //await helpers.loadPage('http://localhost:3000');
    let lists = await driver.findElements(By.css(".list-name"));
    let found = false;
    for(list of lists){
      let text = await list.getText();
      if(text === "Monday list"){found = true;}
    }
    assert(found,"Can't find a list with the name Monday list.");
  });


  this.Given(/^that I have entered listname$/,async function() {
    await helpers.loadPage('http://localhost:3000');
    await driver.findElement(By.id("listname")).sendKeys("Tuesday list");
  
  });

  this.When(/^I see listName wiith remove button$/,async function() {
    await sleep(3000); // waiting because we will want to wait for ajax response in the app...
    await driver.findElement(by.css(".list-name"));
    await driver.findElement(By.css(".btn-remove"));
    numberOfLists = (await driver.findElements(by.css(".list-name"))).length;
  });
     
  
  
  this.When(/^I click on remove button$/,async function() {

    await driver.findElement(By.css(".btn-remove")).click();
  });

  this.Then(/^I should not see the removed list on the page.$/, async function() {

    // Now we expect one list less
    let newNumberOfLists = (await driver.findElements(by.css(".list-name"))).length;
    assert(numberOfLists - 1 === newNumberOfLists, "Didn´t remove the list");
  
  });


};


