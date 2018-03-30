import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';

import { DataService } from '../services/data.service';

import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']

})

export class BodyComponent implements OnInit {


  constructor( private productsService : ProductService , private dataservices : DataService ) {


  }

  ngOnInit(){

  }
}
