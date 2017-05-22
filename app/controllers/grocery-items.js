class GroceryItem {
    constructor(name, quantity, category){
        //  !str.replace(/\s/g, '').length : confirm string length != 0, after removing all white space.
        if (typeof name !== "string" || !name.replace(/\s/g, '').length) {
            throw new Error("A list item must have a name that is an non-empty string.");
        } else if (typeof quantity !== 'number' || quantity < 0) {
            throw new Error("A quantity must be a number");
        } else if (typeof category !== 'string' || !category.replace(/\s/g, '').length) {
            throw new Error("There must be a category selected");
        }

        this.name = name;
        this.bought = false;
        this.quantity = quantity;
        this.category = category;
    }

}

typeof module !== 'undefined' && module.exports && typeof window === 'undefined' && (module.exports = GroceryItem);
