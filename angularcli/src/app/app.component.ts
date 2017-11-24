import { Component,OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit{
  title = 'app';
 kush ='f';
    ngOnInit(){
        $(document).ready(function() {


           var scroll_top = 0;
           var scroll_top_move=0;
           var up_scroll = false;
           var active_menu = 0;
           var nr = 0 ;
           var nrr = 0;
            setInterval(function(){
                checkscroll_top( scroll_top , scroll_top_move, nrr);
            },100);
            $(window).scroll(function () {

                scroll_top_move = $(this).scrollTop();

                var scroll = 0;
                if ($(this).scrollTop() <= 60 && $(this).scrollTop() >= 20) {
                    var opacity = $(this).scrollTop() / 60;
                    $('.above_space_header').css({opacity: opacity});


                } else {
                    var opacity = 1;

                }
                if ($(this).scrollTop() >= 60) {
                    $('.navigation').addClass('fixed_navigation');
                    $('.category ,.under_category').addClass('fixed_category');
                } else {
                    $('.navigation').removeClass('fixed_navigation');
                    $('.category , .under_category').removeClass('fixed_category');

                }


            });
             function checkscroll_top( scroll_topi , scroll_top_movee , nrrr ) {
                 console.log(active_menu , nrr);
                        if ( scroll_topi > scroll_top_movee ) {

                            if( nrrr == 0 ){
                                active_menu = scroll_top_movee;
                                nrr = 1;
                            }
                            up_scroll = true;

                            scroll_top = scroll_top_move;

                        } else {

                            scroll_top = scroll_top_move;
                            up_scroll = false;
                        }
                        if ( up_scroll == true ){
                            if ( nr == 0 ) {

                                $('.navigation').addClass('up_scroll');

                                $('.up_scroll').css({marginTop: scroll_top_movee});
                                nr = 1;
                            }else{

                            }
                            if( active_menu-60 >= scroll_top_movee ) {
                                $('.navigation').removeClass('up_scroll');
                                $('.fixed_navigation').css({marginTop:'60px'});
                            }


                        } else {

                        }

                    }


            function scroller(  ) {


                setTimeout(function(){
                    scroller();
                }, 1000);
            }


        });
    }
}
