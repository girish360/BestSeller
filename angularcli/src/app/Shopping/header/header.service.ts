import { Injectable,OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Injectable()

export class HeaderService implements OnInit {

  constructor(  private dataservices : DataService ) {

    let wishlist = this.dataservices.Make_Request_InServer( 'get_wishList', 'wish' );

    wishlist.then( response =>{

      if( response!= 'false' ){

        this.wish_properties.wishList = response;

      }

    });
  }

  ngOnInit(){

  }




  public cart_properties:any = {

    button:true,
    icon_search: false,
    array_cartId : [],
    filter_cart: '',
    selectedAll : false,
    cartList : [],
    selected : [] ,
    status_in_cart:false

  };

  public wish_properties:any = {

    button:true ,
    icon_search: false,
    array_wishId : [],
    filter_wish: '',
    selectedAll : false,
    wishList : [],
    selected : [] ,
    status_in_wish:false

  };

  update_wishList( new_wishlist ){

    this.wish_properties.wishList = new_wishlist;

  }
}
