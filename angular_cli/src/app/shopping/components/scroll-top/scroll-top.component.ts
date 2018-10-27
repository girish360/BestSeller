import { Component, OnInit,Renderer } from '@angular/core';

import { ScrollbarService } from '../../../share_services/scrollbar.service';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit {

  public status_scroll_up:any= false;

  constructor(private renderer: Renderer , private scroll:ScrollbarService) {

    this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

      let scroll = this.scroll.window_scroll();

      if( scroll.top >= 50 ){

        this.status_scroll_up = true;

      }else{

        this.status_scroll_up = false;
      }

    });

  }

  ngOnInit() {

  }

  go_top(){

    this.scroll.window_animate(0,0);

  }

}
