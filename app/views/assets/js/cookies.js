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

        document.cookie = name + "=" + value + expires + "; path=/";
        this.read(name);
    }

    read (name){
        if (typeof this.cache[name] != 'undefined') {
            return this.cache[name];
        }

        const c = document.cookie.split('; ');
        this.cache = {};

        let C;
        for (let i = c.length - 1; i >= 0; i--) {
           C = c[i].split('=');
           this.cache[C[0]] = C[1];
        }

        return this.cache[name];
    }

    delete (name) {
        this.create(name, '', -1);
    }

}
