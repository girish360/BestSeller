import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import { DataService } from '../../services/data.service';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ..................

import { SetRouterService } from '../../../share_services/set-router.service';

import { trigger, sequence, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card_list.component.html',
  styleUrls: ['./card_list.component.scss'],
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
    ]),


  ]
})
export class CardListComponent implements OnInit {

  constructor(
      private  ds: DataService , //ds as DataService
      private ps : ProductService , //ps as ProductService
      private sr : SetRouterService, // route sr  SetRouterService
      private route : ActivatedRoute // route as ActivatedRoute

  ) { }

  ngOnInit(){

  }

  set_router(data){

     this.sr.set_router( data,this.route );

  }

}
