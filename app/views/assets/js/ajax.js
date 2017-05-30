class Ajax {
    /**
    *   @description    A function to send ajax requests with json data to the server.
    *
    *   @param			url: 		'/example', a string containing the url where to send
    *                               the post request.
    *                   data: 		{username: "", password: ""}, an object containing
    *                               the information to send to the server.
    *                   callback: 	(error, result) => {...}, a function to call when done.
    *
    *   TODO: Use XMLHttpRequest to post. ($.ajax() requires jQuery)
    **/
	post (url, data, callback) {
		const request = new XMLHttpRequest();
		request.open('POST', url, true);	//  Pass the input url parameter.
		request.responseType = 'json';
		request.setRequestHeader('Content-Type', 'Application/JSON');
		//	Handle when the request succeds.
		request.onload = () => {
			//  Returns the result as result through the callback function.
			callback(null, request.response);
		};
		//	Handle error response on request.
		request.onerror = () => {
			//  Log and return the error through the callback.
			console.log(request.status, ':', request.statusText);
			callback(true, request.status);
		};
		request.send(JSON.stringify(data));	//  Pass the input data parameter converted to JSON.
	}

    /*post (url, data, callback) {
        //  Ajax json post request.
        $.ajax({
            url: url,   //  Pass the input url parameter.
            type: "POST",
            crossDomain: true,
            data: '{"some":"json"}',
           // data: data, //  Pass the input data parameter.
            dataType: "json",
            success: (result) => {
                //  Returns the result as result through the callback function.
                //  TODO: Add comments about what response could be.
                callback(null, result);
            },
            error: (xhr, ajaxOptions, thrownError) => {
                //  If there was an error log it.
                console.error(xhr.status);
                console.error(ajaxOptions);
                console.error(thrownError);
                //  Then return error true through the callback.
                callback(true, null);
            }
        });
    }*/

    /**
    *       @description 	A function to send get requests to the server.
    *
    *       @param 			url: 		'/example', a string containing the relative url for
    *                                    where to send the requets.
    *						callback: 	(error, response) => {}, a function hadling the
    *                                   response or error from the request.
    **/
    get (url, callback) {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'json';
        request.onload = () => {
            callback(false, request.response);
        };
        request.onerror = () => {
            console.log('Get request to ' + url + ' failed.');
            callback(true, null);
        };
        request.send();
    }

}
