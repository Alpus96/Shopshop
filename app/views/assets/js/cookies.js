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
        console.log(this.cache)
        const c = document.cookie.split(';');
        this.cache = {};

        let C;
        for (let i = c.length - 1; i >= 0; i--) {
           C = c[i].split('=');

           console.log(C);
           this.cache[C[0]] = C[1];

          // this.cache[C[0]] = typeof C[1] != 'undefined' ? JSON.parse(C[1]) : null;

        }

        return this.cache[name];
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

    delete (name) {
        this.create(name, '', -1);
    }

}
