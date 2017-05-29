/*
*       TODO: Review comments.
*
*       TODO: Review code.
* */
const User = require('./user.js');

// Server requests are passed to this file.
class Router {
    get (request, response) {
        const user = new User();
        if (request.url === '/') {
            response.render('index.ejs');
        } else if (request.url === '/categories') {
            //  TODO: get categories.
            //  TODO: Send JSON response with all the categories.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: false, data: JSON.stringify( user.categoryList ) } ) );
        }  else if (request.url === '/lists') {
            //  TODO: Get lists.
            //  TODO: Send JSON response with all the lists.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: false, data:  user.getSavedLists()  } ) );
        } else {
            response.render('index.ejs');
        }
    }

    post (request, response) {
        const user = new User(request.body ? request.body : null);

        console.log(request.body);
        console.log(request.url);
        if (request.url === '/savelist') {
            //  TODO: Save the sent lists.
            const res = user.saveList(request.body.data);
            //  TODO: Send JSON response with success status.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: res, data: '' } ) );
        } else if (request.url === '/lists') {
            //  TODO: Get lists.
            //  TODO: Send JSON response with all the lists.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: false, data: user.getSavedLists() } ) );
        } else if (request.url === '/removelist') {
            //  TODO: remove sent list.
            const res = user.removeList(request.body.data)
            //  TODO: Send JSON response with success status.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: res, data: '' } ) );
        } else if (request.url === '/login') {
            //  TODO: confirm cridentials.
            const [res, data] = user.login(request.body.data);
            //  TODO: Send JSON response with success status.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: res, data: data } ) );
        } else if (request.url === '/register') {
            //  TODO: save the sent user data.
            const res = user.register(request.body.data);
            //  TODO: Send JSON response with success status.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: res, data: '' } ) );
        } else if (request.url === '/delete') {
            //  TODO: delete user.
            const res = user.remove(request.body.data);
            //  TODO: Send JSON response with success status.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify( { error: res, data: '' } ) );
        } else {
            //  TODO:   Error response, 400 bad request.
            response.writeHead(400);
            response.end();
        }
    }

}

module.exports = new Router();
