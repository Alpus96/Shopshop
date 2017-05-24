const tools = require('selenium-webdriver');
const drivers = [
    new tools.Builder().forBrowser('chrome').build()
];

for (let driver of drivers) {
    runTests(driver, tools);
    driver.quit();
}

function runTests (driver, tools) {
    // Specify tests here and pass the driver and tools.
}
