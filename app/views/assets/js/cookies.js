class Cookies {
    /**
    *       @desc       Constructor does the required setup on initiation. Sets
    *                           standard duration for cookies and caches current cookies.
    *
    *       @param   duration; <Number>, the standad duration a cookie should exist.
    *
    *       @throws  If the parameter duration was not passed; "Duration required;
    *                         The instance of Cookies requires a standard cookie duration in
    *                         milliseconds. [ new Cookies(milliseconds) ]".
    **/
    constructor(duration) {
        this.duration = this.assertDuration(duration);
        this.read('');
    }

    /**
    *       @desc       This function asserts that a valid duration was passed.
    *
    *       @param   duration; Any, the duration parameter that should be asserted.
    *
    *       @returns Returns the duration of it was valid or parseable.
    *
    *       @throws  If the duration was not a number and can not be parsed to a number;
    *                         "Invalid duration; The duration should be in Number of milliseconds.
    *                          (Is ' + typeof duration + ')"
    **/
    assertDuration (duration) {
        if (typeof duration != 'number') {
            const parsed = !isNaN(duration) ? parseInt(duration) : false;
            if (parsed === false) { throw new Error('Invalid duration; The duration should be in Number of milliseconds. (Is ' + typeof duration + ')'); }
            return parsed;
        }
        return duration;
    }

    /**
    *       @desc       Converts milliseconds to string of time after milliseconds.
    *
    *       @param    duration; <Number>, in how long from now I want the date string for.
    *
    *       @return    Returns an object with string and milliseconds of current time + duration.
    *
    *       @throws   If the duration was not a number; "Invalid duration; The duration
    *                          should be in Number of milliseconds. (Is ' + typeof duration + ')".
    **/
    expireStamp (duration = this.duration) {
        duration = this.assertDuration(duration);
        const date = new Date();
        date.setTime(date.getTime() + duration);
        return date.toUTCString();
    }

    /**
    *       @desc       This function checks if it a cookie has expired, if not
    *                           checks again when it would.
    *
    *       @param    name; <String>, the name of the cookie to check.
    **/
    expired (name) {
        if (typeof this.cache[name] === 'undefined') { return; }
        delete this.cache[name];
    }

    /**
    *       @desc       Creates a cookie.
    *
    *       @param      name; <String>, the name of the cookie that is created.
    *                            value: Any, a variable that is conterted to a JSON string and saved in the cookie.
    *                            exp; <Number>, the amount of milliseconds the cookie will exist.
    **/
    create (name, value, duration = this.duration) {
        duration = this.assertDuration(duration);
        const expires = setTimeout( () => { this.expired(name); }, duration );
        document.cookie = name + '=' + JSON.stringify( value ? { value: value, expires: expires } : '' ) + '; expires=' + this.expireStamp(duration) + '; path=/';
        this.cache[name] = { value: value, expires:  expires};
    }

    /**
    *       @desc       Returns a cookie with the passed name if it has been cached. If it
    *                          does not all current cookies are cached and the cookie with the
    *                          passed is returned if it exists.
    *
    *       @param   name; <String>, the name of the cookie to read.
    *
    *       @return   An object with the cookie value.
    **/
    read (name) {
        if (this.cache && typeof this.cache[name] !== 'undefined' && typeof this.cache[name].expires !== 'undefined') { return this.cache[name].value; }
        const cookies = document.cookie.split('; ');
        this.cache = {};
        for (let i = cookies.length - 1; i >= 0; i--) {
           const [cookieName, cookieJSON] = cookies[i].split('=');
           const cookieValue = typeof cookieJSON !== 'undefined' && cookieJSON !== 'undefined' && cookieJSON ? JSON.parse(cookieJSON) : null;
           this.cache[cookieName] = cookieValue;
        }
        return this.cache[name] ? this.cache[name].value : null;
    }

    /**
    *       @desc       Updates the expiration stamp for the cookie with the passed name.
    *
    *       @param   name; <String>, the name of the cookie to update.
    *                         duration; <Number>, how long from the current time the cookie expires in milliseconds.
    *
    *       @throws  If a cokkie with the passed name does not exist; "Can not set expires of undefined.".
    **/
    extendDuration (name, duration) {
        duration = this.assertDuration(duration);
        if (typeof this.cache[name] === 'undefined') { throw new Error('Can not extend duration of undefined.'); }
        const oldCookie = this.cache[name];
        clearTimeout(oldCookie.expires);
        this.create(name, oldCookie.value, duration ? duration : this.duration);
    }
    getCookie(name) {

         var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        console.log(ca);
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
    return null;
    }

    /**
    *       @desc       Deletes the cookie with the passed name.
    *
    *       @param    name; <String>, the name of the cookie to delete.
    **/
    delete (name) {
        if (typeof this.cache[name] === 'undefined') { return; }
        this.create(name, '', -1);
        delete this.cache[name];
    }

}
