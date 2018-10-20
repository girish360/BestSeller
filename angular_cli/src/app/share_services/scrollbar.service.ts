
import { Injectable  , ElementRef} from '@angular/core';

@Injectable()

export class ScrollbarService {

  private el : ElementRef;

  private scroll:any={};

  private screen:any={};

  constructor( ) {

  }

  public window( x , y ){ //move windows scroll

       window.scrollTo(  x , y  );


  }

  public element( target ){

    target.scrollIntoView({ behavior:"smooth" });

  }
  public window_animate( x , y ){

    window.scrollTo( {left: x , top:y , behavior: 'smooth' } );

  }

  public window_scroll(){ // find top and left of scroll...........

    let doc = document.documentElement;

    let left = ( window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);

    let top = ( window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    this.scroll = { left:left , top:top };

    return this.scroll ;

  }

  public offset(el){

    let rect = el.getBoundingClientRect();

    return rect;

  }

  public  element_scroll( event ){

    let left = event.srcElement.scrollLeft;

    let top = event.srcElement.scrollTop;

    this.scroll = {left:left , top:top};

    return this.scroll;
  }

  public scroll_size(){ // find  height and width of scroll...............

    let body = document.body,
        html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );

    this.scroll = { height:height };

    return this.scroll ;
  }

  public screen_size(){ // find width and height of client window......................

    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.screen = { x:x , y:y };

    return this.screen ;
  }






}
