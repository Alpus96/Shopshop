const fs = require('fs');
const path = require('path');
const ListTable = path.join(__dirname, 'database/ListTable.json');
console.log(ListTable);

class ListModel {
    constructor() {}

    getUsersLists (userId, callback) {
        const jsonFile = fs.readFileSync(ListTable, 'utf8');
        const table = JSON.parse(jsonFile);
        const existingLists = table.index ? table.index[userId].split(', ') : [];
        let usersLists = {};
        for (let i = 0; i < existingLists.length; i++) {
            usersLists[table.lists[existingLists[i]].name] = table.lists[existingLists[i]];
        }
        return usersLists;

        // fs.readFileSync(ListTable, 'utf8', (err, data) => {
        //     if (!err) {
        //         const table = JSON.parse(data);
        //         const existingLists = table.index[userId].split(', ');
        //         let usersLists = [];
        //         for (let i = 0; i < existingLists.length; i++) {
        //             usersLists.push(table.lists[existingLists[i]]);
        //         }
        //         callback(null, usersLists);
        //     } else {
        //         console.log(err);
        //         callback(e, null);
        //     }
        // });
    }

    saveList (userId, list) {
        let found = false;
        fs.readFile(ListTable, 'utf8', (err, data) => {
            if (!err) {
                table = JSON.parse(data);
                usersLists = table.index[userId];
                const existingLists = usersLists.split(', ');
                for (let i = 0; i < existingLIsts.length; i++) {
                    const listToCheck = table.lists[existingLists[i]];
                    if (listToCheck.name === list.name) {
                        table.lists[existingLists[i]] = list;
                        found = true;
                    }
                }
                if (!found) {
                    table.lists.push(list);
                    table.index[userId] += ', ' + table.lists.indexOf(list);
                }
                const json = JSON.stringify(table);
                fs.writeFile(ListTable, json, 'utf8', 4);
            } else {
                console.error(err);
            }
        });
    }
}

module.exports = new ListModel();
