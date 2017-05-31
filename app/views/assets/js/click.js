
$(document).ready(function(){
	getList();
	deleteList();
	
	



function getList(){
	 $("#vl").on("click",".onClickToItems b",function(){
          let selectedList= $(this).text();
          	data =  {id: 0, username: 'testUser', password: 'testPass123'};
			 $.ajax({
			            type: "post",
			            url: '/lists',
			            crossDomain: true,
			            data:JSON.stringify({cookie: data}),
			            contentType: "application/json; charset=utf-8",
			            dataType: "json",
			            success: function (response) {
			            	//	{error: true/false, data:{...}}
			            	console.log(response);
			            	for(let item in response.data){

			            		let pvalue = response.data[item];
			        
			               		varuListor.push(pvalue);
			                }
			                	console.log(selectedList);
				               for(let vl in varuListor){
				               		
	                  				let propertyValeu = varuListor[vl];
	                  				console.log(propertyValeu.name);
	                  				if(propertyValeu.name === selectedList){
	                  					$('#addItems').empty();
	                  					for(let item in propertyValeu.items){
	                  						
	                  						let itemValue = propertyValeu.items[item];
	                  						console.log(itemValue);
	                  						$('#addItems').append(
						               		 ' <div class="row" "well-sm"><div class="col-xs-2" >'+ itemValue.name+'</div><div class="col-xs-2" "form-control" >'+ itemValue.quantity+'</div>'+
									    	'<div class="col-xs-3">'+ itemValue.category+'</div><div class="col-xs-2">'+ itemValue.bought+'</div>'+
									    	 '<div class="col-xs-1"><button type="button" class="btn btn-default btn-ok" id="btn-ok11"><span class="glyphicon glyphicon-ok"></span></button></div>'+
											'<div class="col-xs-1"><button type="button" class="btn btn-default btn-pen" id="btn-pen1"><span class="glyphicon glyphicon-pencil"></span></button></div>'+
											 '<div class="col-xs-1"><button type="button" class="btn btn-default btn-trash" id="btn-trash1"><span class="glyphicon glyphicon-trash"></span> </button></div></div>'
									    	);
	                  					}
				               			console.log(propertyValeu);
				               			
				               		}
	                            	
						        	
					            }
			 			
			            },
			            error: function (errormessage) {


			            }
			 });
          
          window.location.hash = '#itemlist';
      });
	}
	function deleteList(){


		$("#vl").on("click",".delete",function(){
	                 let  cookie = {id: 0, username: 'testUser', password: 'testPass123'};
	                    cookies.create('testUser', cookie);
	               
	                   let data= $('#vl .delete').first().text().trim();
	                   console.log('test',data);
	                
	                 ajax.post('/removelist',{cookie: cookie, data: data}, (error, result) => {
	                        if (!error) {
	                            // location.reload();
	                        } else {
	                            alert('Oops, något gick vist fel, vänligen försök igen senare.');
	                        }
	                });
	                // We have to remove the real item from our class as well
	                // Right now we are just playing around with the DOM
	            });
	}

});
