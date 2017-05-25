// Clientside javascript
$(document).ready(() => {
    try {
        new Page();
    } catch (e) {
        console.log(e);
    }
});

class Page {
    constructor() {
        this.Load = new GetRequests();
        //this.Send = new PostRequests();

        // Add listeners etc. here.
        this.switchPage();
        window.onhashchange = this.switchPage();

        
        

        /*const Page = this;

        $('#register').submit((formSubmit) => {
            formSubmit.preventDefault();
            const data = formSubmit.serializeArray();
            if (Page.validateInput(data)) {
                Page.Send.register(data, (error, result) => {
                    if (!error) {
                        Page.showMsg('Du har blivigt registrerad!')
                    } else {
                        Page.showMsg('Oops, något gick vist fel, vänligen försök igen senare.');
                    }
                });
            }
            else { Page.showMsg('Vänligen använd endast A-Ö, a-ö och 0-9.'); }
        });

        $('#login').submit((formSubmit) => {
            formSubmit.preventDefault();
            const errMsg = 'Fel användarnamn eller lösenord, vänligen försök igen.';
            const data = formSubmit.serializeArray();
            if (Page.validateInput(data)) {
                if (Page.Send.login(data)) {
                    Page.loggedIn();
                } else {
                    Page.showMsg(errMsg);
                }
            } else { Page.showMsg(errMsg); }
        });

        $('#logout').submit((formSubmit) => {
            formSubmit.preventDefault();
        });

        $('#delete').submit((formSubmit) => {
            formSubmit.preventDefault();
        });*/
    }

    switchPage () {
        let l;
        $('.page').hide();
        if (location.hash) {
            console.log(location.hash);
            l = location.hash;
        } else if (!location.hash) {
            l = '#lists';
        }

        //  add location specific logic here.
        if (l === '#lists') {
            this.Load.categories((resp) => {
                this.categorySortList(resp);
            });   
        }

        $('header nav li').removeClass('active');
        $('header nav a[href = "' + l + '"]').parent().addClass('active');
        $(l).show();
    }

    /*validateInput (input) {

    }

    showMsg (msg) {

    }

    loggedIn () {

    }*/

    categorySortList (categories) {
        const def = $('#categories > #default');
        let cat = $('#categories');
        cat.empty();

        let opt = [def];

        for(let item of categories){
            console.log(item);
            opt.push("<option>" + item +"</option>");
        }

        for(let op of opt){
            cat.append(op);
        }

        //$('#categories') = cat;
    }

}

//typeof module !== 'undefined' && module.exports && typeof window === 'undefined' && (module.exports = Page);
