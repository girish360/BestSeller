import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function(){

      var start_slide = 0;

      var nr_total_slide = $('.slider').length;

      var active = 0;

      var timer = null;

      slider_interval( start_slide , nr_total_slide );

      function slider_interval( active_slide , nr_total_slide ){

           var nr=0;

           $('.slider').each(function(){

               $(this).css({display:'none'}).fadeOut();


               if( nr == active_slide ){

                 $(this).fadeIn();
                 $(this).find('.write_slider').css({marginLeft:'-100px'});
                 $(this).find('.write_slider').animate({
                           marginLeft:'3%'
                 },500);
               }

               nr++;
           });

           $('.number_point').each(function(){

               var nr = $(this).attr('id');

               $(this).removeClass( 'active_pointer' );

               if( nr == active_slide ){

                  $(this).addClass('active_pointer');

               }

           });

           if( active_slide == nr_total_slide-1 ){

               active_slide = -1;

           }
           active = active_slide;

           if(timer != null){ // clear time out  before that time set

               clearTimeout( timer );
           }

           timer = setTimeout(function(){  // set timer

               slider_interval( active_slide+1 , nr_total_slide );

           },5000);


           if( active != 0 ) { // if is not the first image

                  $('.backward_position').removeClass('red_forward');

                  $('.backward_position').find('.icon_backward').removeClass('red_forward');
           }else {
                 $('.backward_position').addClass('red_forward');

                 $('.backward_position').find('.icon_backward').addClass('red_forward');
           }

           if( active != -1 ) { // if is not the end image

                $('.forward_position').removeClass('red_forward');

                $('.forward_position').find('.icon_forward').removeClass('red_forward');
           }else {

                 $('.forward_position').addClass('red_forward');

                 $('.forward_position').find('.icon_forward').addClass('red_forward');
           }
       }

      function go_forward( nr ){ //  click button go forward..........

         slider_interval(nr , nr_total_slide);

      }
      function go_backward( nr ){ // click button  go backward .........

         slider_interval(nr , nr_total_slide);

      }

      $('.forward_position').click( function(){


          if( active != -1 ) {

            go_forward( active + 1 );

          }

      });

      $('.backward_position').click( function(){

          if( active != 0 ){

             if(active == -1){
               go_backward( active+2 );
             }else{
               go_backward( active-1 );
             }
          }

      });

      $('.number_point').click( function(){

           var nr_click = $(this).attr('id');

           slider_interval( parseInt(nr_click) , nr_total_slide );

      });

    });

  }

}
