   
$(document).ready(function(){

    $('.'+lang).css("display","none");

   $('.albanian').on("click",function(){
       var valid=$(this).attr('id');
       $('.radiolang').attr('checked',false);
       $(this).find('input[name='+valid+']').attr('checked', true);
       var language = $(this).find('input[name='+valid+']').attr('id');
   
       $.ajax({
             type:'GET',
             url:'classlangugage.php',
             data:'lang='+language,
             success:function(data){
             location.reload();
             }
       });


    });
     /* see more language jqury*/
    $('.morelang').on("click",function(){

        $('.morelanguageclick').slideDown(function(){
           $('.morelang').hide();
        });
        
    });

    $('.category').mouseover(function(){
      
      var leftscroll =$(this).scrollTop(0);

    });

  
});