import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ....................

import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection :ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {

  constructor( private productService : ProductService , private dataservices : DataService) { }

  ngOnInit() {
  }

}
