module.exports = {
 
    url: 'http://localhost:3000',
 
    elements: {
        searchInput: by.name('select_cat'),
        searchResultLink: by.css('formcontrol')
    },
 
    /**
     * enters a search term into Google's search box and presses enter
     * @param {string} searchQuery 
     * @returns {Promise} a promise to enter the search values
     */
    preformSearch: function (searchQuery) {
 
        var selector = page.groceryList.elements.searchInput;
 
        // return a promise so the calling function knows the task has completed 
        return driver.findElement(selector).sendKeys(searchQuery, selenium.Key.ENTER);
    }
};