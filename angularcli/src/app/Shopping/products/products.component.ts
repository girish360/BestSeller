import {
  Component, OnInit, OnChanges, Input, Output, EventEmitter, DoCheck, ChangeDetectorRef, OnDestroy,
  ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

import 'rxjs/Rx'

import 'rxjs/add/observable/interval';

import { ActivatedRoute  } from '@angular/router';

import { DataService } from '../services/data.service';

import { SetRouterService } from '../services/set-router.service';

import { trigger, sequence, transition, animate, style, state } from '@angular/animations';

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

  public selected_for_page :any  = 20; // default is set 20 products for page .......................

  public product_properties = {

    hover_wish_list:false,

    icon_wish:0,

    index_product:'empty'

  };

  public uri:any;

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

    this.productsService.products = [];

    this.dataservices.loaded_component = false;

      this.dataservices.not_founded = false;

    this.route.params.subscribe( params => {  // get uri

      this.uri = params.name;

    });

    this.route.queryParams.subscribe( params => { // get params from url.................

      this.scroll.window(0, 0);

      this.dataservices.update_loader( true );



        if( !isNaN( params.id )  &&  ( !isNaN( params.page ) || params.page == null  ) ){

          this.productsService.data_products.category_id = params.id; // get category_id from url

          if( params.page == null ){

              this.productsService.data_products.page = 1; // set dafault page number start from 1

          }else{

              this.productsService.data_products.page = params.page; // get number of page from url
          }

          this.my_products = this.dataservices.Http_Get('shopping/products/category_products', this.productsService.data_products ) // make request to get products ......

              .subscribe( //  take success

                  data => {

                      this.productsService.pages_link = [];

                      if( data ){ // products have came

                          this.productsService.products = data['products'];

                          this.productsService.checked_products_inCart_and_inWish();

                          if ( data['pages_details'] != false ) {

                              this.productsService.pages_details = data['pages_details'];

                              this.pages_details = data['pages_details'];

                              this.productsService.build_pages_link( this.pages_details  );

                          }

                          this.dataservices.loaded_component = true; // data are came display them ........

                      }else{ // this page does not exists

                            this.dataservices.not_founded = true; // nothing founded in server
                      }

                      this.cd.markForCheck();

                      setTimeout(() => {

                          this.dataservices.update_loader(false);

                      }, 1000);

                  },
                  error => console.log(error) // take error .....

              );

      }else{ // this page does not exists ..........................

          this.dataservices.update_loader( false );

          this.dataservices.not_founded = true;

      }
    });
  }

    right_click(){

      alert('fg');
    }

  ngAfterViewInit(){


}

  public change_products_for_page(){

      this.my_products = this.dataservices.Http_Get('shopping/products/change_products_forpage', { products_for_page:this.pages_details.products_for_page } ) // make request to get products ......

          .subscribe( //  take success

              data => {

                  if( data ){

                      if( this.productsService.data_products.page == 1 ){

                          this.productsService.change_products_for_page();

                      }else{

                          let router = { path:'shopping/products/'+this.uri , data:
                              [
                                  { keyparams :'id', params:  this.productsService.data_products.category_id },
                                  { keyparams :'page', params:  1 }

                              ] , relative:false };

                          this.set_router(router);
                      }
                  }

              },

              error => console.log(error) // take error .....

          );

  }

  public index( index , item ){

    if(!item) return null;

    return item.product_id;
  }

  ngOnInit(){

  }

  public set_router( data ){

    this.setRouter.set_router( data , this.route ); // set router .....

  }

  public click_pages( click_details  ){

      console.log(click_details);

    let router:any = {};

      if( click_details.active != true ){ // check if is different from active page ...........

        if ( click_details.icon_material == 'skip_next' ) {

          router = { path:'shopping/products/'+this.uri , data:
              [
                { keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  this.pages_details.page+1 }

              ] , relative:false };
        }
        else if ( click_details.icon_material == 'fast_forward' ) {

          router = { path:'shopping/products/'+this.uri , data:
              [
                {keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  this.pages_details.page+5 }

              ] , relative:false };
        }
        else if ( click_details.icon_material =='skip_previous' ) {

          router = { path:'shopping/products/'+this.uri , data:
              [
                {keyparams :'id', params: this.pages_details.category_id},
                {keyparams :'page', params:  this.pages_details.page-1 }

              ] , relative:false };
        }
        else if ( click_details.icon_material == 'fast_rewind' ) {

          router = { path:'shopping/products/'+this.uri , data:
              [
                {keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  this.pages_details.page-5 }

              ] , relative:false };

        }else{

          router = { path:'shopping/products/'+this.uri , data:
              [
                {keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  click_details.page }

              ] , relative:false };
        }

        this.set_router(router);

      }

  }

}
