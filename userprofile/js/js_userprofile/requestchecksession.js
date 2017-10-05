$(document).ready(function(){
    checksession();
    checkscroll();
    var valuechecksession=0;

	function checksession(){
		$.ajax({
	        url:'check_session/check_session.php',
	        method:'POST',
	        success:function(data){
	         	if(data=='1'){
	         		$('.popuplogout').show();
	         		$('.checksession').show();
	         		valuechecksession=data;
	         	}
	         	else{
	         		valuechecksession=0;
	         	}
	        }
		});
    }

   setInterval(function(){
   	    checksession(); //call function checksession
   },500);

    $('#movebtn').click(function(){
	   gotologin();
	});

    function checkscroll(){
       if(valuechecksession=='1'){
	        $(window).scroll(function(){
	           gotologin();
	           $(window).scrollTop('0');
	        });
        }
    }
    function gotologin(){
    	     var height = $(window).height();
    	
    	      $('.logincheck').show();
            $('.loginandhija').css('top','-600px');
            $('.loginandhija').show();
            $('.opacity').show();
            $('.loginandhija').animate({
                top:"100px"
            },'fast',function(){
            	$('.checksessioncenter').hide();
            });

    	

    }

   setInterval(function(){
   	   checkscroll(); // call function checkscroll
   },500);

    

   $('#showlogin').click(function(){
   	alert('jn');
   });

   $('.hidelogin').click(function(){
   location.reload();
      
   });
   $('.hidelogin').mouseover(function(){
       $('.infoexit').show();
       $('.treguesi').show();
      var lefto=$('.hidelogin').offset();
      $('.treguesi').css('left',lefto.left);
      
   });
    $('.hidelogin').mouseleave(function(){
       $('.infoexit').hide();
       $('.treguesi').hide();
   });


      
});