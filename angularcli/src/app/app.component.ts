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

        $(window).scroll(function(){
            if( $(this).scrollTop() <= 60 && $(this).scrollTop() >= 20  ){
               var opacity  = $(this).scrollTop()/60;
                $('.above_space_header').css({opacity:opacity});
            }else{
                var opacity  = 1;
            }
        })

    }
}
