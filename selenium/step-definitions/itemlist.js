let clicklist = false;
module.exports = function(){

	this.Given(/^that I have item quantity and category of an item$/, async function(){
          await helpers.loadPage('http://localhost:3000/#itemlist');   
          await driver.findElement(By.id("usritem"));
          // await driver.wait(until.elementsLocated(by.css('usritem')),1000)
          await driver.findElement(By.id("usrquantity"));
          await driver.findElement(By.id("defalt"));

	});

	this.When(/^I enter item name quantity and category$/,async function(){
       //await sleep(3000); // waiting because we will want to wait for ajax response in the app...
        await sleep(3000);
        await driver.findElement(By.id("usritem")).sendKeys("Milk");
        await driver.findElement(By.id("usrquantity")).sendKeys("3");

	});

	this.When(/^click on Lägatill button$/,async function() {
     await sleep(5000);
		 await driver.findElement(By.id("usradd-btn")).click();
		 clicklist = true;
     console.log(clicklist);
   });

	this.Then(/^I should be able to save the item.$/,async function() {
	     //= await driver.findElement(By.id("usradd-btn")).click();
        assert(clicklist,"Button is not clicked");

   });
     


};