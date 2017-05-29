/**
*       TODO: Write comments.
*
*       TODO: Review code.
**/
class Cookies {
    constructor() {
        this.read('');
    }

    create (name, value, exp) {
        let expires;
        if (exp) {
            const date = new Date();
            date.setTime(date.getTime() + exp);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }

        document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
        this.read(name);
    }

    read (name){
        if (this.cache && typeof this.cache[name] != 'undefined') {
            return this.cache[name];
        }

        const c = document.cookie.split('; ');
        this.cache = {};

        let C;
        for (let i = c.length - 1; i >= 0; i--) {
           C = c[i].split('=');
           this.cache[C[0]] = typeof C[1] != 'undefined' ? JSON.parse(C[1]) : null;
        }

        return this.cache[name];
    }

    delete (name) {
        this.create(name, '', -1);
    }

}
