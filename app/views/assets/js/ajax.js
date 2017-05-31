class Ajax {
    /**
    *   @desc   A function to send ajax requests with json data to the server.
    *
    *   @param	url: 		'/example', a string containing the url where to send
    *           			the post request.
    *           data: 		{username: "", password: ""}, an object containing
    *           			the information to send to the server.
    *           callback:	(error, result) => {...}, a function to call when done.
	**/
	post (url, data, callback) {
		const request = new XMLHttpRequest();
		request.open('POST', url, true);
		request.responseType = 'json';
		request.setRequestHeader('Content-Type', 'application/json');
		request.onload = () => {
			callback(null, request.response);
		};
		request.onerror = () => {
			console.log(request.status, ':', request.statusText);
			callback(true, request.status);
		};
		request.send(JSON.stringify(data));
	}

    /**
    *	@desc 	A function to send get requests to the server.
    *
    *	@param 	url: 		'/example', a string containing the relative url for
    *                       where to send the requets.
    *			callback:	(error, response) => {}, a function hadling the
    *                       response or error from the request.
    **/
    get (url, callback) {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'json';
        request.onload = () => {
            callback(false, request.response);
        };
        request.onerror = () => {
            console.log(request.status, ':', request.statusText);
            callback(true, request.status);
        };
		request.send();
    }

}
