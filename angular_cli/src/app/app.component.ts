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

            $(window).on('beforeunload', function(){

                $(window).scrollTop(0);

            });

            $('body').click('a',function(e){

                e.preventDefault();

            });

            $(window).scroll(function (e) {

                var scroll_top = $(this).scrollTop();

                if( scroll_top >= 200 ){

                     $('.icon_header_write').addClass('new_icon_header_write');


                 }else{

                     $('.icon_header_write').removeClass('new_icon_header_write');

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
