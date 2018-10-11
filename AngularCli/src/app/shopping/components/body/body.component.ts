import {Component, OnInit, Input, Output, EventEmitter, DoCheck ,AfterViewChecked} from '@angular/core';

import { DataService } from '../../services/data.service';

import { ProductService } from '../../services/product.service';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']

})

export class BodyComponent implements OnInit {


  constructor(
      private productsService : ProductService ,

      private dataservices : DataService,

      private menuservice : MenuService,
  ) {


  }

  ngOnInit(){

  }

  ngAfterViewChecked(){

    this.dataservices.app_rendered = true;

  }
}
