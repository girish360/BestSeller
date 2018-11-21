import { Component, OnInit,DoCheck,ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute} from '@angular/router';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

import { HttpService } from '../../../share_services/http.service';

import { DataService } from '../../services/data.service';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ..................

import { SetRouterService } from '../../../share_services/set-router.service';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish_list.component.html',
  styleUrls: ['./wish_list.component.scss'],
  changeDetection :ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('wishList_animations', [
      transition('* => void', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)'}),
        sequence([
          animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(40px)', 'box-shadow': 'none'  })),
          animate(".1s ease", style({ height: '0', opacity: 0, transform: 'translateX(40px)', 'box-shadow': 'none'  }))
        ])
      ]),
      transition('void => active', [
        style({ height: '0', opacity: '0', transform: 'translateX(40px)', 'box-shadow': 'none' }),
        sequence([
          animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)'  }))
        ])
      ])
    ])
  ]
})
export class WishListComponent implements OnInit,DoCheck {


  public active = 'active';

  constructor(  private route :ActivatedRoute , private setRouter :SetRouterService, private productsService: ProductService , private dataservices : DataService, private Httpservices : HttpService ) {


  }

  public  set_router( data ){

    this.setRouter.set_router( data , this.route ); // set router .....

  }

  ngDoCheck(){


  }


  ngOnInit() {
  }


}
