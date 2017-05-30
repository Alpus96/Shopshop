
$(document).ready(function(){
	getList();
	
	



function getList(){
	 $("#vl").on("click",".onClickToItems b",function(){
          let v= $(this).text();
          console.log('click test',v);
          window.location.hash = '#itemlist';
      });
	}

});