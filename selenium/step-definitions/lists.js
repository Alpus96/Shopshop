
module.exports = function () {

  this.Given(/^I am not logged in navigates to GroceryList page$/,function() {
        return helpers.loadPage('http://localhost:3000');
        /*.then(function() {
        return page.groceryList.performSearch(searchQuery);
    })
        //return;*/
});
       
  this.When(/^I click on option button valj-kategory button$/,function() {
      driver.findElement(By.id("default")).click(); 
       
});
  this.Then(/^I should see 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt'$/, function() {
     var down_list = driver.find_element(By.id('default'));
     let options = down_list.find_element(By.tag_name("option"));
     //options.each { |option| option.click if option.text == 'Kött' }
     let selected_option = options.map { |option| option.text if option.selected? }.join
     expect(selected_option).to eql 'Kött'


 });  

};


