/*
*       TODO: Add error hanling for GET requets.
* */
class Ajax {
    /**
    *   @description    A function to send ajax requests with json data to the server.
    *
    *   @param               url:                '/example', a string containing the url where to send
    *                                                      the post request.
    *                                 data:            {username: "", password: ""}, an object containing
    *                                                       the information to send to the server.
    *                                 callback:     (error, result) => {...}, a function to call when done.
    *
    *   TODO: Use XMLHttpRequest here too. ($.ajax() requires jQuery)
    **/
    post (url, data, callback) {
        //  Ajax json post request.
        $.ajax({
            url: url,   //  Pass the input url parameter.
            type: "POST",
            data: data, //  Pass the input data parameter.
            dataType: "json",
            success: function (result) {
                //  Returns the result as result through the callback function.
                //  TODO: Add comments about what response could be.
                callback(null, result);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //  If there was an error log it.
                console.error(xhr.status);
                console.error(ajaxOptions);
                console.error(thrownError);
                //  Then return error true through the callback.
                callback(true, null);
            }
        });
    }

    /**
    *       @description        A function to send get requests to the server.
    *
    *       @param                url:              '/example', a string containing the relative url for
    *                                                           where to send the requets.
    *                                       callback:   (error, response) => {}, a function hadling the
    *                                                           response or error from the request.
    **/
    get (url, callback) {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();
        request.onload = () => {
            callback(false, request.response);
        };
        request.onerror = () => {
            console.log('Get request to ' + url + 'failed.');
            callback(true, null);
        };
    }

}
