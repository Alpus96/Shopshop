$(document).on("pageload",function(){

addLists();
 
});

let varuLista = [];
function getlist(callback){
	 ajax.get('/ListTable.json', (error,response) => {
	 	if (!error) {
				callback(!response.error ? response.data.replace(/[\[\]'"]+/g, '').split(',') : []);
			} else {
				console.log(error);
				callback([]);
			}
	 });
	}
function addLists(){
	
	

	console.log(varuLista);


 	
 	cookie = {id: 0, username: 'testUser', password: 'testPass123'};
 	let userId = this.cookie.id;
	 	if(userId !== undefined){

	 		for(let vl in varuLista){
                  let propertyValeu = varuLista[vl];
                  console.log(propertyValeu);
			        $('#vl').append(
			            ' <div class=""><div class="well-sm"><h2> Namn:<b>' + propertyValeu.name + 
			            '<button type="button" class="btn btn-default btn-lg">'+
  						'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Star'+
						'</button></b></h2></div></div>'
			        );
            }
	 	}
	 	else{
	 		console.log('Loggain')
	 	}
}

