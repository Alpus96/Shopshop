
module.exports = function () {

this.Given(/^I am not logged in navigates to GroceryList page$/,function() {
    return helpers.loadPage('http://localhost:3000');
        /*.then(function() {
        return page.groceryList.performSearch(searchQuery);
    })
        //return;*/
});
       
this.When(/^I click on option button valj-kategory button$/,async function() {
    await driver.findElement(By.id("default")).click(); 
       
});
this.Then(/^I should see 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt'$/,async function() {
   await driver.wait(until.elementsLocated(by.id('default')), 10000)
   let elements = await driver.findElement(by.name('def'));
    expect(elements.length).to.not.equal(0);
 });  

this.Then(/^I am logged in navigates to GroceryList page$/, function() {

     return helpers.loadPage('http://localhost:3000');
});

/*this.Then(/^I should see 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt'$/, async function() {
    await driver.wait(until.elementsLocated(by.id('default')).click(),1000)
    let elements = await driver.findElement(by.name('def'));
    expect(elements.length).to.not.equal(0);
});*/
this.Then(/^I am logged in as a user$/, function() {
  return helpers.loadPage('http://localhost:3000');
  //check usename and password
});

this.Then(/^I click on plus button$/,async function() {
   await driver.findElement(By.id('btnplus')).click();
});

this.Then(/^I should be able to add a list$/, function() {
   //add method
});
this.Then(/^save the list.$/, function() {
  
});

     

};


