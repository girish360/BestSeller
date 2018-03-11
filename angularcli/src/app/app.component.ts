import { Component,OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit{




    ngOnInit(){
        $(document).ready(function() {

            var top_scroll = 0;

            var scroll_status = false;

            $('body').click('a',function(e) {
                e.preventDefault();


            });

            $(window).scroll(function (e) {

                var scroll_top = $(this).scrollTop();


                if ( scroll_top >= 60  ) {

                    $('.header').addClass('fixed_header');
                    $('.menu_left ,.under_menu_left').addClass('fixed_category');
                    $('.icon_header_write').addClass('new_icon_header_write');

                    $('.dropdown_search').addClass('down_dropwdown_search');
                    top_scroll = scroll_top;

                } else {

                    $('.header').removeClass('fixed_header');
                    $('.menu_left , .under_menu_left').removeClass('fixed_category');
                    $('.icon_header_write').removeClass('new_icon_header_write');
                    $('.dropdown_search').removeClass('down_dropwdown_search');


                    top_scroll = scroll_top;
                }

                if( scroll_top >= 380 ){ // scroll for option_products ................

                    if( scroll_status == false ) {

                        $('.option_products').addClass('option_products_fixed_show');

                        $('.option_products_fixed_show').hide().slideDown();
                    }

                    scroll_status = true;

                }else{
                    if( scroll_status == true ) {

                        $('.option_products').hide().slideDown();


                        $('.option_products').removeClass('option_products_fixed_show');
                    }

                    scroll_status = false;
                }


            });

             $('.body_wish').scroll(function(){
                 var topscroll = $(this).scrollTop();
                 if(topscroll > 10 ){
                      $('.top_wish').addClass('border_bottom');
                 }else{
                     $('.top_wish').removeClass('border_bottom');
                 }
             });
        });
    }
}
