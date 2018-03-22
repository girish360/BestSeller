import {Component, OnInit, Input, Output, EventEmitter, DoCheck,  ChangeDetectorRef , OnDestroy } from '@angular/core';

import 'rxjs/Rx'

import 'rxjs/add/observable/interval';

import {  ActivatedRoute  } from '@angular/router';

import { DataService } from '../services/data.service';

import { SetRouterService } from '../services/set-router.service';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { ProductService } from './product.service'; // ProductServices extend HeaderServices that cartList and  wishList ....................

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

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
export class ProductsComponent   implements OnInit  {

  public Response:any;

  public status_in_wish = false;

  public pages_link:any=[];

  public pages_details:any={};

  public send_data_products={};

  public product_properties = {

    hover_wish_list:false,

    icon_wish:0,

    index_product:'empty'

  };

  my_products :Subscription;


  constructor(

      private productsService : ProductService,
      private setRouter: SetRouterService,
      private dataservices: DataService ,
      private route: ActivatedRoute

  ) {


    this.dataservices.update_loader(true);

    this.dataservices.create_object_request( 'products', { 'type': 'default', 'number_click': 1 }  );

    this.my_products = this.dataservices.Http_Post( this.dataservices.object_request ) // make request ......

        .subscribe( //  take success

            data => {

              if ( data['status'] == 'product' ) {

                this.productsService.products = data['data']['products'];

                this.build_pages_link( data['data']['pages_details']);

                this.productsService.checked_products_inCart_and_inWish();

                this.dataservices.update_loader(false);

              }
            },
            error => console.log( error['data'] ) // take error .....

        );


  }



  ngOnInit(){

  }

  public  set_router( data ){

    this.setRouter.set_router( data , this.route ); // set router .....

  }

  click_pages( click_details ){

    if( click_details.active != true ){ // check if is different from active page ...........



      if ( click_details.icon_material == 'skip_next' ) {

        this.send_data_products ={ 'type':click_details.type_link ,'number_click':this.pages_details.number_click+1 };

        this.get_page_products();

      }
      else if ( click_details.icon_material == 'fast_forward' ) {

        this.send_data_products ={ 'type':click_details.type_link ,'number_click':this.pages_details.number_click+5 };

        this.get_page_products();
      }
      else if ( click_details.icon_material =='skip_previous' ) {

        this.send_data_products ={ 'type':click_details.type_link ,'number_click':this.pages_details.number_click-1 };

        this.get_page_products();
      }
      else if ( click_details.icon_material == 'fast_rewind' ) {

        this.send_data_products ={ 'type':click_details.type_link ,'number_click':this.pages_details.number_click-5 };

        this.get_page_products();

      }else{

        this.send_data_products ={ 'type':click_details.type_link ,'number_click':click_details.page };

        this.get_page_products();
      }

    }
  }

  get_page_products(){

    this.dataservices.body_loader = true;

    this.dataservices.create_object_request( 'products', this.send_data_products  );

    this.my_products = this.dataservices.Http_Post( this.dataservices.object_request ) // make request ......

        .subscribe( //  take success

            data => {

              if ( data['status'] == 'product' ) {

                this.productsService.products = data['data']['products'];

                this.build_pages_link( data['data']['pages_details']);

                this.dataservices.update_loader(false);

              }
            },
            error => console.log( error['data'] ) // take error .....

        );
  }

  build_pages_link( pages_details ){ // that create pages link for products ...............................................................................

    this.pages_link = []; // empty pages_link .........

    if( pages_details.number_click <= 3 ){ // check if pages is  smaller than 3 or equals ...........................

      if( pages_details.total_number <= 8 ){  // check if total pages are smaller than 8  or equals

        if( pages_details.number_click > 1 ){ // check if number_click that more bigger than 1  to add skip_previouse  icon ......................

          this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_previous' ,'icon':true  });
        }
        for( var i =1 ; i <= pages_details.total_number ; i++ ){  // loop with number page

          if( i == pages_details.number_click ){ // check if  number_ click is equals with item in loop to add property active true .........

            this.pages_link.push( {'page': i ,'active': true , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

          }else{ // pages not active .................................................

            this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });
          }
        }
        if( pages_details.number_click+5 <= pages_details.total_number ) { // check if number click + 5 is more bigger or equals to add fast_forward icon  with 5 pages ...........

          this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'fast_forward' ,'icon':true  });

        }else{ //  add skip_next icon with  one page  increment  ....................
          if(  pages_details.number_click < pages_details.total_number ){

            this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_next' ,'icon':true  });

          }
        }
        return ;  // return pages_link that is a array with some objects inside ...........................................................
      }
      else{  // here total_number pages are more bigger than 8  ...........................

        if( pages_details.number_click == 1 ){ // check if number click is equals with one .............................................

          for( var i =1 ; i <= pages_details.number_click+7 ; i++ ){ // loop with number page

            if( i == pages_details.number_click ){ // check if  number_ click is equals with item in loop to add property active true .........

              this.pages_link.push( {'page': i ,'active': true , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

            }else{ // pages not active .................................................

              this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });
            }

          }
        }
        else{

          if( pages_details.number_click == 2 ){  // check if number click is equals with two .............................................

            this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_previous' ,'icon':true  });


            for( var i =1 ; i <= pages_details.number_click+5 ; i++ ){

              if( i == pages_details.number_click ){

                this.pages_link.push( {'page': i ,'active': true , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

              }else{

                this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });
              }
            }
          }
          else{
            if( pages_details.number_click == 3 ){

              this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_previous' ,'icon':true  });

              for( var i =1 ; i <= pages_details.number_click+4 ; i++ ){

                if( i == pages_details.number_click ){

                  this.pages_link.push( {'page': i ,'active': true , 'type_link':pages_details.type_link,'icon_material':'x' ,'icon':false  });

                }else{

                  this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link,'icon_material':'x' ,'icon':false  });
                }
              }
            }
          }
        }

        this.pages_link.push( {'page': pages_details.total_number ,'active': false , 'type_link':pages_details.type_link,'icon_material':'x' ,'icon':false  });


        if( pages_details.number_click+5 <= pages_details.total_number ){

          this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'fast_forward' ,'icon':true  });

        }else{

          this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_next' ,'icon':true  });
        }

        return ;

      }

    } // end number click is smaller than 3 or equals ................
    else{ // here number click is bigger than 3 ................

      if( pages_details.total_number > pages_details.number_click+3 ){

        if( pages_details.number_click > 5){

          this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'fast_rewind' ,'icon':true  });
        }
        else{
          this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_previous' ,'icon':true  });
        }

        this.pages_link.push( {'page': 1 ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

        for(  var i = pages_details.number_click-2 ; i <= pages_details.number_click+3 ; i++ ){

          if( i == pages_details.number_click ){

            this.pages_link.push( {'page': i ,'active': true , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

          }else{
            this.pages_link.push( {'page': i ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

          }
        }

        this.pages_link.push( {'page': pages_details.total_number ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'x' ,'icon':false  });

        if( pages_details.number_click+5 <= pages_details.total_number ){

          this.pages_link.push( {'page': 1 ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'fast_forward' ,'icon':true  });

        }else{
          this.pages_link.push( {'page': 1 ,'active': false , 'type_link':pages_details.type_link ,'icon_material':'skip_next' ,'icon':true  });
        }
        return ;
      }
      else{
        if( pages_details.total_number >= 10 ) {

          if (pages_details.number_click > 5) {

            this.pages_link.push({'page': 1, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'fast_rewind', 'icon': true});
          }
          else {

            this.pages_link.push({'page': 1, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'skip_previous', 'icon': true});

          }
          this.pages_link.push({'page': 1, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

          if ( pages_details.number_click + 1 == pages_details.total_number ) {

            for (var i = pages_details.number_click - 5; i <= pages_details.total_number; i++) {

              if (i == pages_details.number_click) {

                this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

              } else {

                this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false
                });
              }
            }
          } else {
            if ( pages_details.number_click == pages_details.total_number ) {

              for (var i = pages_details.number_click - 7; i <= pages_details.total_number; i++) {

                if (i == pages_details.number_click) {

                  this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

                } else {

                  this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false
                  });
                }
              }
            }
            else {

              if( pages_details.number_click+3 == pages_details.total_number ){

                for ( var i = pages_details.number_click - 3; i <= pages_details.total_number; i++) {

                  if (i == pages_details.number_click) {

                    this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

                  } else {

                    this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});
                  }
                }

              }
              else{
                for ( var i = pages_details.number_click - 4; i <= pages_details.total_number; i++) {

                  if (i == pages_details.number_click) {

                    this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

                  } else {

                    this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});
                  }
                }

              }

            }
          }

          if (pages_details.number_click != pages_details.total_number) {

            this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'skip_next', 'icon': true});

          }

          return;

        }else{

          if (pages_details.number_click > 5) {

            this.pages_link.push({'page': 1, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'fast_rewind', 'icon': true});
          }
          else {

            this.pages_link.push({'page': 1, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'skip_previous', 'icon': true});

          }
          this.pages_link.push({'page': 1, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});


          if( pages_details.total_number <= 8 ){

            for ( var i = 2; i <= pages_details.total_number; i++) {

              if (i == pages_details.number_click) {

                this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

              } else {

                this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});
              }
            }

          }else{

            if( pages_details.total_number != pages_details.number_click ){

              for ( var i = 3; i <= pages_details.total_number; i++) {

                if (i == pages_details.number_click) {

                  this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

                } else {

                  this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});
                }
              }

            }else{

              for ( var i = 2; i <= pages_details.total_number; i++) {

                if (i == pages_details.number_click) {

                  this.pages_link.push({'page': i, 'active': true, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});

                } else {

                  this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'x', 'icon': false});
                }
              }

            }

          }

          if (pages_details.number_click != pages_details.total_number) {

            this.pages_link.push({'page': i, 'active': false, 'type_link': pages_details.type_link, 'icon_material': 'skip_next', 'icon': true});

          }

          return;
        }
      }
    }

  } // End function that build pages link ........................................................

}
