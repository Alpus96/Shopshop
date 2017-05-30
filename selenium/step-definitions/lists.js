function sleep(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },ms);
  });
}

module.exports = function () {

this.Given(/^I am not logged in navigates to GroceryList page$/,function() {
    return helpers.loadPage('http://localhost:3000');
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




this.Then(/^I am logged in as a user$/, function() {
  const cookie = {
            id: 0,
            username: "testUser",
            password: "testPass123"
        };

  return helpers.loadPage('http://localhost:3000');
  //check usename and password
});

this.Then(/^I click on plus button$/,async function() {
   await driver.findElement(By.id('btnplus')).click();
});

this.Then(/^I should be able to submit the list name.$/,async function() {
    await driver.findElement(By.id('addlist'));
});
   


     

};


