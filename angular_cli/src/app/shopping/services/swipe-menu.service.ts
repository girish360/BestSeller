import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeMenuService {

  constructor() { }

  public clientX:number = 0;

  public swipe_content_menu :any = {display:'none'};

  public opacity:number = 0;

  public opacity_content_style:any ={display:'none'};

  public swipeleft_menu:any = {
    width:100
  }

  public swipe_menu_style:any = { width:'7px',transition:'0.2s' };

  public swipe_menu( event ){

    if(this.clientX == 0){

      this.clientX = event.srcEvent.clientX;
    }

    let move_clientX = this.clientX - (event.srcEvent.clientX+100);

    let dif_move = this.clientX  - event.srcEvent.clientX;

    this.swipe_menu_style = { width:0,transition:'0.2s' };

    let calc_opacity = ( ( this.swipeleft_menu.width + dif_move  ) / this.swipeleft_menu.width )-1 ;

    if( calc_opacity <= 0.8 ){

      this.opacity = calc_opacity;

      this.opacity_content_style ={ opacity:this.opacity , display:'block'};

    }
    if( move_clientX <= 0 ){

      this.swipe_content_menu  = { right:move_clientX+'px' , opacity:this.opacity , display:'block' };

    }

  }

  public pressdown_menu(event){

    this.swipe_menu_style = { width:'15px',transition:'0.2s' };

    this.clientX = event.srcEvent.clientX;
  }

  public pressup_menu(){

    this.swipe_menu_style = { width:'7px',transition:'0.2s' };
  }

  public swipeend_menu(event){ //  swipe up event

    let calc_swipeend = this.clientX - event.srcEvent.clientX;

    if( calc_swipeend < 50 ){

      this.hide_menu_content(-100);

    }else{
      this.show_menu_content(0);
    }
  }

  public hide_menu_content(clientx){

    this.swipe_content_menu  = { right:clientx+'px' , opacity:0 ,transition:'0.3s'  };

    this.opacity_content_style ={ opacity:0 , transition:'0.3s',display:'none' };

    this.swipe_menu_style = { width:'7px',transition:'0.2s' };

  }

  public show_menu_content( clientx ){

    this.swipe_content_menu  = { right:clientx+'px' , opacity:0.8 ,transition:'0.3s',display:'block' };

    this.opacity_content_style ={ opacity:0.8 , transition:'0.3s',display:'block' };
    this.swipe_menu_style = { width:0,transition:'0.2s' };
  }
}
