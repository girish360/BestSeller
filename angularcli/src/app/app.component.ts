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
            $('body').click('a',function(e) {
                e.preventDefault();
            });

            $(window).scroll(function () {


                if ($(this).scrollTop() >= 60) {
                    $('.navigation').addClass('fixed_navigation');
                    $('.category ,.under_category').addClass('fixed_category');
                    $('.icon_header_write').addClass('new_icon_header_write');
                } else {
                    $('.navigation').removeClass('fixed_navigation');
                    $('.category , .under_category').removeClass('fixed_category');
                    $('.icon_header_write').removeClass('new_icon_header_write');

                }


            });

             $('.body_wish').scroll(function(){
                 var topscroll = $(this).scrollTop();
                 if(topscroll > 10 ){
                      $('.width_top_wish').addClass('top_wish_change');
                 }else{
                     $('.width_top_wish').removeClass('top_wish_change');
                 }
             });

        });
    }
}
