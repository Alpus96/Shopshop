// Clientside javascript
$(document).ready(() => {
    try {
        new Page();
    } catch (e) {
        console.log(e);
    }
});

const ajax = new Ajax();
const cookies = new Cookies(1000*60*10);

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
        } else if (l === '#lists') {
            ajax.get('/categories', (error, response) => {
                this.categoryList(!error ? response.data.replace(/[\[\]'"]+/g, '').split(',') : []);
            });

            //  TODO: Get lists and save them to this.lists.
        } else if (l.match('#itemlist')) {
            const listName = l.split('_');
            l = listName[0];
            console.log(this);
            console.log("this.itemlist",this.itemlist);
            // itemlist is not (always at least a function)
            // for the #itemlist page in turns out to be
            // a DOM element. You can't call a DOM element
            // as if it were a function!!!
            // SO: Commenting this out for now! Check your code!

            //this.itemlist(listName[1]);
        }

        $('header nav li').removeClass('active');
        $('header nav a[href = "' + l + '"]').parent().addClass('active');
        $(l).show();
    }

    register (data) {
        if (this.validateInput(data)) {
            const Page = this;
            ajax.post('/register', data, (error, result) => {
                if (!error) {
                    Page.showMsg('Du har blivigt registrerad!');
                } else {
                    Page.showMsg('Oops, något gick vist fel, vänligen försök igen senare.');
                }
            });
        } else { this.showMsg('Vänligen använd endast A-Ö, a-ö och 0-9.'); }
    }

    login (data) {
        const errMsg = 'Fel användarnamn eller lösenord, vänligen försök igen.';
        if (this.validateInput(data)) {
            const Page = this;
            ajax.post('/login', data, (error, response) => {
                if (!error && !response.error) {
                    cookies.create('loggedIn', response.data);
                    Page.crums.push('loggedIn');
                } else {
                    Page.showMsg(errMsg);
                }
            });
        } else { this.showMsg(errMsg); }
    }

    logout (data) {}

    delete (data) {}

    validateInput (input) {
        for (let val in input) {
            if (input[val].length < 6 || input[val].match(/\W/g)) {
                return false;
            }
        }
        return input.length > 0 ? true : false;
    }

    showMsg (msg) {
        //  TODO:   Display a message.
    }

    categoryList (categories) {
        const def = $('#categories > #default');
        let cat = $('#categories');
        cat.empty();

        let opt = [def];

        for(let item of categories){
            //console.log(item);
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

                let data = $('#listname').val();//input text
                
                 ajax.post('/savelist', data, (error, result) => {
                        if (!error) {
                            alert('Din lista har blivit skapad');
                        } else {
                            alert('Oops, något gick vist fel, vänligen försök igen senare.');
                        }
                });

                
                // Check that the name is not the same as that of another item
                // ONCE we have connected this code to the real class!!!!

                // Do we really want this to happen?
                // Should be bound to our object-oriented classes
                // And add a real lidt object.
                // Maybe it would be better to rerender the whole list of lists
                // after this has happened...

                // Emulate that this takes som time (because later it will when we
                // change this to redrawing the list on server reponse)

               /* setTimeout(function(){
                    $("#vl").append('<div class="row navbar navbar-default "> <p class="list-name"></p>'+
                    ' <button type="button" class="btn btn-default btn-remove pull-right">'+
                     ' <span class="glyphicon glyphicon-remove"></span></button></div>'+
                    );
                },500);*/
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

            $(document).on("click",".onClickToItems b",function(){
                $(this).closest(".row").remove();
                   let data= $(this).text();
                
                 ajax.post('/removelist', data, (error, result) => {
                        if (!error) {
                            alert('Din lista har blivit skapad');
                        } else {
                            alert('Oops, något gick vist fel, vänligen försök igen senare.');
                        }
                });
                // We have to remove the real item from our class as well
                // Right now we are just playing around with the DOM
            });

        });

    }

    itemlist (name) {
        this.lists = {list1: null};
        if (typeof this.lists[name] === 'undefined') {
            location.hash = '#lists';
        }
        $('#name').text(name);

    }

    addList (data) {}

    addItem (data) {}

}
