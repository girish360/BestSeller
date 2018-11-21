import {
  Component, OnInit, OnChanges, Input, Output, EventEmitter, DoCheck, ChangeDetectorRef, OnDestroy,
  ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

import 'rxjs/Rx'

import 'rxjs/add/observable/interval';

import { ActivatedRoute  } from '@angular/router';

import { DataService } from '../../services/data.service';

import { SetRouterService } from '../../../share_services/set-router.service';

import { trigger, sequence, transition, animate, style, state,keyframes } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../../services/product.service';

import { MenuService } from '../../services/menu.service';

import { until } from "selenium-webdriver";

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import alertIsPresent = until.alertIsPresent; // ProductServices extend HeaderServices that cartList and  wishList ....................

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProductsComponent   implements OnInit , AfterViewInit  {


  public Response:any;

  public status_in_wish = false;

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
      private ps : ProductService,
      private sr: SetRouterService,
      private ds: DataService ,
      private ms :MenuService,
      private route: ActivatedRoute,
      private cd : ChangeDetectorRef,

  ) {

      this.route.params.subscribe( params => {  // get uri

          this.uri = params.name;

          if ( this.uri.includes("_") ) {

              let index =  this.uri.indexOf('_');

              this.uri = this.uri.substring(0, index + 1);
          }

      });

      this.route.data.subscribe( response => {

          this.scroll.window(0, 0);

          if ( this.ds.resolve ){ // response from  resolve .....

              this.ds.loaded_component = true;

              if( response.products ){  // response from database is is not false this company exist

                  this.ps.products = response.products['products'];

                  this.ps.checked_products_inCart_and_inWish();

                  if ( response['pages_details'] != false ) {

                      this.ps.pages_details = response.products['pages_details'];

                      this.pages_details = response.products['pages_details'];

                      this.ps.build_pages_link( this.pages_details  );
                  }

                  this.ds.not_founded = false;

              }else{ // dont exists  this company .......

                  this.ds.not_founded = true;
              }

              this.ds.update_products(true);

              this.cd.markForCheck();

          } else {

              this.ds.loaded_component = false;

              this.route.queryParams.subscribe( params => {

                  this.ps.load_products( { queryParams:params } ).subscribe( response =>{

                      this.ds.loaded_component = true;

                      if( response ){

                          this.ds.not_founded = false;

                          this.ps.products = response['products'];

                          this.ps.checked_products_inCart_and_inWish();

                          if ( response['pages_details'] != false ) {

                              this.ps.pages_details = response['pages_details'];

                              this.pages_details = response['pages_details'];

                              this.ps.build_pages_link( this.pages_details  );
                          }

                      }else{

                          this.ds.not_founded = true;
                      }

                      this.ds.update_products(true);

                      this.cd.markForCheck();

                  });
              });
          }
      });
  }


  ngAfterViewInit(){


}

  public change_products_for_page(){

      this.my_products = this.ds.Http_Get('shopping/products/change_products_forpage', { products_for_page:this.pages_details.products_for_page } ) // make request to get products ......

          .subscribe( //  take success

              data => {

                  if( data ){

                      if( this.ps.data_products.page == 1 ){

                          this.ps.change_products_for_page();

                      }else{

                          let router = { path:'shopping/products/'+this.uri , data:
                              [
                                  { keyparams :'id', params:  this.ps.data_products.category_id },
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

    this.sr.set_router( data , this.route ); // set router .....

  }

  public click_pages( click_details  ){

      let router:any = {};

      if( click_details.active != true ){ // check if is different from active page ...........

        if ( click_details.icon_material == 'skip_next' ) {

          router = { path:'shopping/products/'+this.uri+'_'+(this.pages_details.page+1) , data:
              [
                { keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  this.pages_details.page+1 }

              ] , relative:false };
        }
        else if ( click_details.icon_material == 'fast_forward' ) {

          router = { path:'shopping/products/'+this.uri+'_'+(this.pages_details.page+5) , data:
              [
                {keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  this.pages_details.page+5 }

              ] , relative:false };
        }
        else if ( click_details.icon_material =='skip_previous' ) {

          router = { path:'shopping/products/'+this.uri+'_'+(this.pages_details.page-1) , data:
              [
                {keyparams :'id', params: this.pages_details.category_id},
                {keyparams :'page', params:  this.pages_details.page-1 }

              ] , relative:false };
        }
        else if ( click_details.icon_material == 'fast_rewind' ) {

          router = { path:'shopping/products/'+this.uri+'_'+(this.pages_details.page-5) , data:
              [
                {keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  this.pages_details.page-5 }

              ] , relative:false };

        }else{

          router = { path:'shopping/products/'+this.uri+'_'+click_details.page , data:
              [
                {keyparams :'id', params:  this.pages_details.category_id },
                {keyparams :'page', params:  click_details.page }

              ] , relative:false };
        }

        this.set_router(router);

      }

  }

}
