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

            var top_scroll = 0;

            $('body').click('a',function(e) {
                e.preventDefault();
            });

            $(window).scroll(function () {

                var scroll_top = $(this).scrollTop();


                if ( scroll_top >= 60  ) {
                    $('.navigation').addClass('fixed_navigation');
                    $('.menu_left ,.under_menu_left').addClass('fixed_category');
                    $('.icon_header_write').addClass('new_icon_header_write');

                    $('.dropdown_search').addClass('down_dropwdown_search');

                    top_scroll = scroll_top;
                } else {
                    $('.navigation').removeClass('fixed_navigation');
                    $('.menu_left , .under_menu_left').removeClass('fixed_category');
                    $('.icon_header_write').removeClass('new_icon_header_write');
                    $('.dropdown_search').removeClass('down_dropwdown_search');


                    top_scroll = scroll_top;

                }
            });

             $('.body_wish').scroll(function(){
                 var topscroll = $(this).scrollTop();
                 if(topscroll > 10 ){
                      $('.top_wish').addClass('top_wish_change');
                 }else{
                     $('.top_wish').removeClass('top_wish_change');
                 }
             });
        });
    }
}
