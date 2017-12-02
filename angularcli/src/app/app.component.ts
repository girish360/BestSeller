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
        });
    }
}
