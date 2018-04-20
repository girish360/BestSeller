
import { Injectable  , ElementRef} from '@angular/core';

@Injectable()

export class ScrollbarService {

  private el : ElementRef;

  private scroll:any={};

  constructor( ) {

  }

  public window( x ,y ){ //move windows scroll

       window.scrollTo( x , y );
  }

  public element(target){

    target.scrollIntoView({ behavior:"smooth" });

  }

  public window_scroll(){ //

    let doc = document.documentElement;

    let left = ( window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);

    let top = ( window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    this.scroll = { left:left , top:top };

    return this.scroll ;

  }

  public  element_scroll(event){

    let left = event.srcElement.scrollLeft;

    let top = event.srcElement.scrollTop;

    this.scroll = {left:left , top:top};

    return this.scroll;
  }





}
