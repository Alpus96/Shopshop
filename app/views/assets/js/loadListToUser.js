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
			            data: JSON.stringify(data),
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

			                /*document.cookie = "id=" + '0';
							document.cookie = "username=" + 'testUser';
							document.cookie = "password=" + 'testPass123';*/
				               for(let vl in varuListor){
	                  				let propertyValeu = varuListor[vl];
	                            	console.log(propertyValeu.name);
						        	$('#vl').append(
						            ' <div class="well-sm"><div class="onClickToItems"><h3>Namn på listan:<b>'+propertyValeu.name+'<b>'+
						            '</div><button type="button" class="btn btn-danger btn-lg">'+
			  						'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Ta bort lista'+
									'</button></h3></div>'
									 );
					            }

			            },
			            error: function (errormessage) {


			            }
			        });

	}
