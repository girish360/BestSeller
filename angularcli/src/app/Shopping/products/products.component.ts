import {Component, OnInit, Input, Output, EventEmitter, DoCheck,  ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { RouterStateSnapshot,ActivatedRouteSnapshot, ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { HeaderService } from '../header/header.service';

import { HttpService } from '../services/http.service';

import { DataService } from '../services/data.service';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

declare  var $:any;

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
export class ProductsComponent implements OnInit,DoCheck  {


  public loader = false;

  public  products:any = [] ;

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

  my_timer_wish: Subscription ;

  constructor( private header :HeaderService,  private cdr:  ChangeDetectorRef, private router : Router, private crypto:EncryptDecryptService , private dataservices: DataService ,    private Httpservice :HttpService , private route: ActivatedRoute  ) {

    this.dataservices.update_loader(true);

    let response = this.dataservices.Make_Request_InServer( 'products' , { 'type': 'default', 'number_click': 1 } );

    response.then( response => {

      this.products = response['products'];

      this.build_pages_link( response['pages_details']);

      this.dataservices.update_loader(false);

    });

  }

  ngDoCheck(){


  }

  ngOnInit() {


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



    let response = this.dataservices.Make_Request_InServer( 'products', this.send_data_products );

    this.dataservices.body_loader = true;

    response.then( products_details =>{

      this.products =  products_details['products'];

      this.pages_details = products_details['pages_details'];

      this.build_pages_link( products_details['pages_details']) ;

      this.dataservices.body_loader = false;

    });
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


  check_wish( product ){

    this.header.wish_properties.status_in_wish = false;

    for ( let i = 0 ; i < this.header.wish_properties.wishList.length ; i++){

      if( this.header.wish_properties.wishList[i].product_id ==  product.product_id ){

        this.header.wish_properties.status_in_wish = true;
      }
    }
    return   this.header.wish_properties.status_in_wish;
  }

  check_cart( product ){

    this.header.cart_properties.status_in_cart = false;

    for ( let i = 0 ; i < this.header.cart_properties.cartList.length ; i++){

      if( this.header.cart_properties.cartList[i].product_id ==  product.product_id ){

        this.header.cart_properties.status_in_cart = true;
      }
    }
    return  this.header.cart_properties.status_in_cart;
  }


  encrypt_id( id_company ){

    this.router.navigate(['/company',{ companyId: this.crypto.encryp_AES( id_company , this.crypto.secret_key_company_profile ) }]);

  }

  product_details( id_product ){

    this.router.navigate(['./product_details',

          { productId: this.crypto.encryp_AES( id_product , this.crypto.secret_key_product_profile ) }],

        { relativeTo: this.route }

    );
  }


  mouseHover_wish( product , i ){

    this.product_properties.index_product = i;

    this.product_properties.icon_wish=1;

    this.check_wish_icon( product );

    this.onStartInterval_wish( product );

  }

  mouseLeave_wish( product ){

    this.product_properties.index_product = 'empty';

    this.product_properties.icon_wish=0;

    this.ondestroyInterval_wish();

    this.check_wish_icon( product );

  }

  check_wish_icon( product ){

    this.status_in_wish = false; // status to find  if this  product is in wish......

    for ( var i =  0 ; i < this.header.wish_properties.wishList.length ; i++ ){ // loop wish list with product ...

      if( this.header.wish_properties.wishList[i].id == product.product_id ){ // if product .id is equals with one product.id in wish status should be true ...

        this.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

      }
    }

    if( this.status_in_wish != true ) { // check if status is not equals with true  to  add this prod in wish ....


      if( this.product_properties.icon_wish == 1 ){

        this.product_properties.hover_wish_list = true;

      }else{

        this.product_properties.hover_wish_list = false;
      }
    }
  }

  onStartInterval_wish( product ) {

    this.my_timer_wish = Observable.interval(500).subscribe( val => {

      if(this.product_properties.icon_wish == 1){

        this.product_properties.icon_wish = 0;

      }else{

        this.product_properties.icon_wish = 1;
      }

      this.check_wish_icon( product );
    });
  }

  ondestroyInterval_wish(){

    this.my_timer_wish.unsubscribe();
  }



}
