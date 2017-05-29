/*
*       TODO: Improve comments.
*
*       TODO: Replace all fs reads with one require.
* */

const path = require('path');
const ListTable = path.join(__dirname, 'database/ListTable.json');
const fs = require('fs');
const GroceryList = require('../controllers/grocery-list.js');

class ListModel {

    getUsersLists (userId, callback) {
        console.log("Test12", userId);
        let jsonObj = JSON.parse(fs.readFileSync(ListTable, 'utf8'));

        if (jsonObj.index[userId]) {
            let existingLists = Object.keys(jsonObj.index[userId]).map((e) => {
                return Number(e);
            });
            let usersLists = {};
            for (let i = 0; i < existingLists.length; i++) {
                usersLists[jsonObj.lists[existingLists[i]].name] = new GroceryList(jsonObj.lists[existingLists[i]].name);
                for (let itemIndex = 0; itemIndex < jsonObj.lists[existingLists[i]].items.length; itemIndex++) {
                    usersLists[jsonObj.lists[existingLists[i]].name].addToList(
                        jsonObj.lists[existingLists[i]].items[itemIndex].name,
                        jsonObj.lists[existingLists[i]].items[itemIndex].quantity,
                        jsonObj.lists[existingLists[i]].items[itemIndex].category
                    );
                }
            }
            return usersLists;
        } else {
            return {};
        }

        //  Not saving file since no chages are made.
    }

    saveList (userId, list) {
        let jsonObj = JSON.parse(fs.readFileSync(ListTable, 'utf8'));

        let found = false;
        const existingLists = jsonObj.index.length > 0 ? jsonObj.index[userId]: [];
        for (let i = 0; i < existingLists.length; i++) {
            const listToCheck = jsonObj.lists[existingLists[i]] ? jsonObj.lists[existingLists[i]] : {name: ''};
            if (listToCheck.name === list.name) {
                jsonObj.lists[existingLists[i]] = list;
                found = true;
            }
        }

        if (!found) {
            jsonObj.lists.push(list);
            if (jsonObj.index[userId]) {
                let arr = Object.keys(jsonObj.index[userId]).map((e) => {
                    return Number(e);
                });
                arr.push(jsonObj.lists.indexOf(list));
                jsonObj.index[userId] = arr;
            } else {
                jsonObj.index[userId] = [jsonObj.lists.indexOf(list)];
            }
        }

        fs.writeFileSync(ListTable, JSON.stringify(jsonObj, null, 4), 'utf8');
    }

    deleteList (userId, listName) {
        let jsonObj = JSON.parse(fs.readFileSync(ListTable, 'utf8'));

        if (jsonObj.index[userId]) {
            let existingLists = Object.keys(jsonObj.index[userId]).map((e) => {
                return Number(e);
            });

            for (let index of existingLists) {
                if (jsonObj.lists[index] && jsonObj.lists[index].name === listName) {
                    delete jsonObj.lists[index];
                    //delete jsonObj.index[userId][jsonObj.index[userId].indexOf(index)];
                }
            }
        }

        fs.writeFileSync(ListTable, JSON.stringify(jsonObj, null, 4), 'utf8');
        this.reindexTable();
    }

    reindexTable () {
        let jsonObj = JSON.parse(fs.readFileSync(ListTable, 'utf8'));

        let markedHoles = [];
        for (let list of jsonObj.lists) {
            if (!list) {
                let index = jsonObj.lists.indexOf(list);
                markedHoles.push(index);
                jsonObj.lists.splice(index, 1);
            }
        }

        for (let holeIndex = 0; holeIndex < markedHoles.length; holeIndex++) {
            for (let userIndex = 0; userIndex < jsonObj.index.length; userIndex++) {
                for (let indexPos = 0; indexPos < jsonObj.index[userIndex].length; indexPos++) {
                    if (jsonObj.index[userIndex][indexPos] === markedHoles[holeIndex]) {
                        jsonObj.index[userIndex].splice(indexPos--, 1);
                    } else if (jsonObj.index[userIndex][indexPos] > markedHoles[holeIndex]) {
                        jsonObj.index[userIndex][indexPos] -= 1;
                    }
                }
            }
        }

        fs.writeFileSync(ListTable, JSON.stringify(jsonObj, null, 4), 'utf8');
    }

}

module.exports = new ListModel();
