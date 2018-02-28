$(document).ready(function(){

    var degrees = 0;

    var server_degrees = 0;

    rotate(degrees);

    rotate_Servere(server_degrees);

    function rotate( degrees ){

        $('.Content  b').css({'transform' : 'rotate('+ degrees +'deg)'});

        setTimeout(function(){

            if( degrees == 360 ){

                degrees = 0;
            }

          rotate( degrees+1 );

        },10);

    }



    function rotate_Servere( server_degrees ){

        $('.Content').css({'transform' : 'rotate('+ server_degrees +'deg)'});

        setTimeout(function(){

            if( server_degrees == 360 ){

                server_degrees = 0;
            }

            rotate_Servere( server_degrees+1 );

        },15);

    }

});