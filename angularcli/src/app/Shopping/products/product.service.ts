import { Injectable ,ChangeDetectorRef } from '@angular/core';

import { HeaderService } from '../header/header.service';

import { DataService } from '../services/data.service';


@Injectable()

export class ProductService extends HeaderService {

  public  products:any = [];


  constructor(

      protected dataservices: DataService ,


  ) {

    super(  dataservices );


  }

  checked_products_inCart_and_inWish(){

    for( let i = 0 ;  i <  this.products.length ; i ++ ){

      let nr_wish = 0 ;

      let nr_cart = 0 ;

      for ( let j = 0; j < this.wish_properties.wishList.length; j++ ) {

        if ( this.products[i].product_id == this.wish_properties.wishList[j].product_id ) {

          nr_wish = 1 ;
        }
      }

      if( nr_wish > 0 ) {
        this.products[i].product_in_wishList = 'true';
      }else{
        this.products[i].product_in_wishList = 'false';

      }

      for ( let j = 0; j < this.cart_properties.cartList.length; j++ ) {

        if ( this.products[i].product_id == this.cart_properties.cartList[j].product_id ) {

          nr_cart = 1 ;
        }
      }

      if( nr_cart > 0 ) {
        this.products[i].product_in_cartList = 'true';
      }else{
        this.products[i].product_in_cartList = 'false';

      }
    }
  }



  check_delete_from_wishList(){

    this.delete_from_wishList(); // delete from wish list in header services  ..............................


    this.checked_products_inCart_and_inWish(); // remove checked  in products .........................

  }

  check_delete_from_cartList(){

    this.delete_from_cartList();

    this.checked_products_inCart_and_inWish();
  }






}
