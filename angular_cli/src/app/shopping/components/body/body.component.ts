import {Component, OnInit, Input, Output, EventEmitter, DoCheck ,AfterViewChecked} from '@angular/core';

import { DataService } from '../../services/data.service';

import { ProductService } from '../../services/product.service';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']

})

export class BodyComponent implements OnInit {


  constructor(
      private ps : ProductService ,

      private ds : DataService,

      private ms : MenuService,
  ) {


  }

  ngOnInit(){

  }

  ngAfterViewChecked(){

    this.ds.app_rendered = true; // first load  true ........

  }
}
