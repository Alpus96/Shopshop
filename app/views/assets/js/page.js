// Clientside javascript
$(document).ready(() => {
    new Page();
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
            Page.logout(formSubmit.serializeArray());
        });

        $('#delete').submit((formSubmit) => {
            formSubmit.preventDefault();
            Page.delete(formSubmit.serializeArray());
        });

        this.addEventHandlersForAddingListItems();
    }

    switchPage () {
        $('.page').hide();
        let l = location.hash ? location.hash : '#lists';

        //  TODO: Add location specific logic here.
        //  NOTE: loading userLists @ #lists, loading itemlists @ #itemlist
        //  NOTE: Pass itemlist to load with url, like; /#itemlist_name. Easy to 'split'.

        if (l === '#register' || l === '#login' || l === '#delete') {
            $('#account').show();
            $(l).show();
        } else if (l === '#lists') {
            ajax.get('/categories', (error, response) => {
                this.categorySortList(!error ? response.data.replace(/[\[\]'"]+/g, '').split(',') : []);
            });
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
   
    

    addList (name){  //Alex tell me which id shld I use as function parameter

        // TODO: check that the name does not exist before continuing.

        const id = ''; // TODO: auto generate an id and add it to a class variable to be used later.
        const listrow = $('#listrow'); // TODO: add hidden element to copy.
        listrow.attr('id', id);// set id for list.
        listrow.children('#listlabel').text(name).attr('id', id + '_label'); // set id for list label.
        $('list-of-lists').append(); // Add it to the page
    }

    //  n run a function
    addEventHandlersForAddingListItems(){ 

        $(function(){

            $(".addBtn").click(function(){
                
                let name = $('#listname').val();//input text
                
                // Check that the name is not the same as that of another item
                // ONCE we have connected this code to the real class!!!!

                // Do we really want this to happen?
                // Should be bound to our object-oriented classes
                // And add a real lidt object.
                // Maybe it would be better to rerender the whole list of lists
                // after this has happened...

                $("#list-of-lists").append(`
                    <div class="row navbar navbar-default ">       
                        <label for="listitemName" class ="control-label controlitemlabel" id = "listlabel" >${name}</label>
                        <button type="button" class="btn btn-default btn-remove pull-right">
                            <span class="glyphicon glyphicon-remove"></span>
                        </button>
                    </div>`
                );

                // Rest the input field to empty
                $('#listname').val("");
                //$('#addlist').hide(); // DON'T DO THIS AND SKIP LARGE BTN?

            });

            $('#listname').keyup(function(e){
                if(e.which === 13){
                    // pressed enter so add list
                    // by faking a click on the addBtn
                    $('.addBtn').click();   
                }
            });

            $(document).on("click",".btn-remove",function(){
                $(this).closest(".row").remove();
                // We have to remove the real item from our class as well
                // Right now we are just playing around with the DOM
            });

        });
     
    }

}
