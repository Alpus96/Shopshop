// Clientside javascript
$(document).ready(() => {
    try {
        new Page();
    } catch (e) {
        console.log(e);
    }
});

const ajax = new Ajax();
const cookies = new Cookies();

class Page {
    constructor() {
        this.switchPage();
        window.onhashchange = this.switchPage;

        // Add Listeners with functions.
        const Page = this;

        $('#register').submit((event) => {
            event.preventDefault();
            Page.register($( this ).serializeArray());
        });

        $('#login').submit((event) => {
            event.preventDefault();
            Page.login($( this ).serializeArray());
        });

        $('#logout').submit((formSubmit) => {
            formSubmit.preventDefault();
            Page.logout($( this ).serializeArray());
        });

        $('#delete').submit((formSubmit) => {
            formSubmit.preventDefault();
            Page.delete($( this ).serializeArray());
        });

        $('#addList').submit((formSubmit) => {
            formSubmit.preventDefault();
            Page.addList($( this ).serializeArray());
        });

        $('#addItem').submit((formSubmit) => {
            formSubmit.preventDefault();
            Page.addtem($( this ).serializeArray());
        });
    }

    switchPage () {
        $('.page').hide();
        let l = location.hash ? location.hash : '#lists';

        //  TODO: Add location specific logic here.
        //  NOTE: loading userLists @ #lists, loading itemlists @ #itemlist
        //  NOTE: Pass itemlist to load with url, like; /#itemlist_name. Easy to 'split'.

        if (l === '#register' || l === '#login' || l === '#delete') {
            $('#account').show();
            //$(l).show();
        } else if (l === '#lists') {
            ajax.get('/categories', (error, response) => {
                this.categorySortList(!error ? response.data.replace(/[\[\]'"]+/g, '').split(',') : []);
            });

            //  TODO: Get lists and save them to this.lists.
        } else if (l.match('#itemlist')) {
            const listName = l.split('_');
            l = listName[0];
            console.log(this);
            this.itemlist(listName[1]);
        }

        $('header nav li').removeClass('active');
        $('header nav a[href = "' + l + '"]').parent().addClass('active');
        $(l).show();
    }

    register (data) {
        if (this.validateInput(data)) {
            ajax.post('/register', data, (error, result) => {
                if (!error) {
                    this.showMsg('Du har blivigt registrerad!');
                } else {
                    this.showMsg('Oops, något gick vist fel, vänligen försök igen senare.');
                }
            });
        } else { this.showMsg('Vänligen använd endast A-Ö, a-ö och 0-9.'); }
    }

    login (data) {
        const errMsg = 'Fel användarnamn eller lösenord, vänligen försök igen.';
        if (this.validateInput(data)) {
            const cookieData = ajax.post('/login', data, (error, response) => {
                if (response.data) {
                    this.loggedIn(response.data);
                } else {
                    this.showMsg(errMsg);
                }
            });
        } else { this.showMsg(errMsg); }
    }

    logout (data) {}

    delete (data) {}

    validateInput (input) {
        //  TODO: Add validating minimum length of inputs and that they only contain A-Ö, a-ö and 0-9.
        for (let val in input) {
            if (input[val].length < 6 || input[val].match(/\W/g)) {
                return false;
            }
        }
        return input.length > 0 ? true : false;
    }

    showMsg (msg) {
        // NOTE: Modal needed in view first.
        //  TODO: Add appanding message and title to a modal message.
    }

    loggedIn (cookieData) {
        //  TODO: Add saving a cookie to send with request.
        this.crums = this.crums ? this.crums : [];
        for (let i in cookieData) {
            console.log(i, cookieData[i], 1000*60*10);
            //cookies.create(i, cookieData[i], 1000*60*10);
            this.crums.push(i);
        }
    }

    categorySortList (categories) {
        const def = $('#categories > #default');
        let cat = $('#categories');
        cat.empty();

        let opt = [def];

        for(let item of categories){
            console.log(item);
            opt.push("<option name=\"" + item +"\">" + item +"</option>");
        }

        for(let op of opt){
            cat.append(op);
        }
    }

    itemlist (name) {
        this.lists = {list1: null};
        if (typeof this.lists[name] === 'undefined') {
            location.hash = '#lists';
        }
        $('#name').text(name);

    }

}
