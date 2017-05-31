$(document).ready(function(){

	getAllLists();

});

let varuListor = [];
let varaList = [];
//const cookies = new Cookies(1000*60*10);

	function getAllLists(){
		//Ajax.post(‘/lists’, , (error, response) => { JSON.parse(response.data) });
					data = {id: 0, username: 'testUser', password: 'testPass123'};
					cookies.create('testUser', data);
			 $.ajax({
			            type: "post",
			            url: '/lists',
			            crossDomain: true,
			            data: JSON.stringify({cookie: data}),
			            contentType: "application/json; charset=utf-8",
			            dataType: "json",
			            success: function (response) {
			            	//	{error: true/false, data:{...}}
			            	console.log(response);
			            	for(let item in response.data){

			            		let pvalue = response.data[item];

			               		varuListor.push(pvalue);
			                }

							// NOTE: cookies.read('testUser');

			                
				               for(let vl in varuListor){
	                  				let propertyValeu = varuListor[vl];
	                            	console.log(propertyValeu.name);
						        	 $("#vl").append('<div class="row navbar navbar-default"><h3> <p class="list-name onClickToItems"><b>'+propertyValeu.name+'<b></p>'+
                    				' <button type="button" class="delete btn btn-default btn-remove pull-right">'+
                     				' <span class="glyphicon glyphicon-remove"><b>'+propertyValeu.name+'</b></span></button></h3></div>'
                   					 );
					            }

			            },
			            error: function (xhr, opt, err) {
			            	console.log(xhr, opt, err);

			            }
			        });

	}
