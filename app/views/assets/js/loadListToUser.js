$(document).on("pageload",function(){

addLists();
 
});



 function addLists(){

 	let varuLista = [];
 	let userId = this.cookie.id;
 	let user = new User();
	 	if(userId !== undefined){
	 		varuLista = user.getSavedLists(userId);
	 		for(let vl in varuLista){
                  let propertyValeu = varuLista[vl];
                  console.log(propertyValeu);
			        $('#vl').append(
			            ' <div class=""><div class="well-sm"><h4> Namn:<b>' + propertyValeu.name + '</b></h4></div></div>'
			        );
            }
	 	}
	 	else{
	 		console.log('Loggain')
	 	}
 }