import {
  Component, OnInit, OnChanges, Input, Output, EventEmitter, DoCheck, ChangeDetectorRef, OnDestroy,
  ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

import 'rxjs/Rx'

import 'rxjs/add/observable/interval';

import {  ActivatedRoute  } from '@angular/router';

import { DataService } from '../services/data.service';

import { SetRouterService } from '../services/set-router.service';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { ProductService } from './product.service';

import { MenuService } from '../menu/menu.service';

import {until} from "selenium-webdriver";

import { ScrollbarService } from '../../share/scrollbar.service';



import alertIsPresent = until.alertIsPresent; // ProductServices extend HeaderServices that cartList and  wishList ....................

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations: [
    trigger('products_animations', [

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
export class ProductsComponent   implements OnInit , AfterViewInit  {

  public Response:any;

  public status_in_wish = false;

  public pages_link:any=[];

  public pages_details:any={};

  public send_data_products={};

  public selected_for_page :any  = 2; // default is set 40 products for page .......................

  public product_properties = {

    hover_wish_list:false,

    icon_wish:0,

    index_product:'empty'

  };

  my_products :Subscription;

  constructor(
      private scroll:ScrollbarService,
      private productsService : ProductService,
      private setRouter: SetRouterService,
      private dataservices: DataService ,
      private menuservice :MenuService,
      private route: ActivatedRoute,
      private cd : ChangeDetectorRef,

  ) {

    this.route.params.subscribe( params => {

      this.scroll.window(0, 0);

      this.dataservices.update_loader( true );

      let category_id = params['name'];

      this.my_products = this.dataservices.Http_Get('products', {'type_products':this.productsService.type_products, 'category_id': category_id , 'number_click': 1 }) // make request ......

          .subscribe( //  take success

              data => {

                this.productsService.pages_link = [];

                if( data['data']['products'].length > 0 ){

                    this.productsService.products = data['data']['products'];

                    this.productsService.checked_products_inCart_and_inWish();

                  }

                  if ( data['data']['pages_details'] != 'null') {

                    this.productsService.pages_details = data['data']['pages_details'];

                    this.productsService.build_pages_link(this.productsService.pages_details);

                  }

                  this.cd.markForCheck();

                  setTimeout(() => {

                    this.dataservices.update_loader(false);

                  }, 1000);

              },
              error => console.log(error['data']) // take error .....

          );
    });
  }

ngAfterViewInit(){


}

  change_products_for_page(){



  }

  index( index , item ){

    if(!item) return null;

    return item.product_id;
  }

  ngOnInit(){

  }

  public  set_router( data ){

    this.setRouter.set_router( data , this.route ); // set router .....

  }



  click_pages( click_details  ){

     this.productsService.check_pages( click_details  );








  }






}
