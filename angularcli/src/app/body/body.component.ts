import { Component, OnInit ,Input , Output , EventEmitter   } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @Input() get_Language = {};

  @Input() wishList_products = [];

  @Output() wish_product_fromProducts:EventEmitter<object> = new EventEmitter;

  constructor() { }

  ngOnInit() {

  }

}
