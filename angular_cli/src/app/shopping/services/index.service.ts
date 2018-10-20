
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

import { ScrollbarService } from '../../share_services/scrollbar.service';

@Injectable()

export class IndexService {

  constructor( private dataservices: DataService , private scroll:ScrollbarService) { }

  public check_footer(){

    let footer = 200;

    let header = 50;

    let scroll_size = this.scroll.scroll_size();

    let screen_size = this.scroll.screen_size();

    let window_scroll = this.scroll.window_scroll();

    if( screen_size.x > 750 ) { // only if width of screen is grater than 750 px

      if (scroll_size.height - screen_size.y - footer <= window_scroll.top) {

        let height = window_scroll.top - ( scroll_size.height - screen_size.y - footer ) + header;

        this.dataservices.menu_style = {'height': 'calc( 100vh - ' + height + 'px )'};

      } else {

        this.dataservices.menu_style = {'height': 'calc( 100vh - 40px  )'};

      }
    }else{
      this.dataservices.menu_style ={};
    }
    this.dataservices.update_menu(true);



  }

}