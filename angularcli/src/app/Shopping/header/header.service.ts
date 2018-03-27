import { Injectable,OnInit,ChangeDetectorRef,Input, } from '@angular/core';

import { DataService } from '../services/data.service';

import{BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/interval';

import {Observable} from 'rxjs/Observable';

import{Subject} from 'rxjs/Subject';




import 'rxjs/Rx';




@Injectable()

export class HeaderService  implements OnInit {

  constructor( protected dataservices : DataService ) {

    let wishlist_and_cartList = this.dataservices.Make_Request_InServer( 'get_wishList_cartList', 'wish' );

    wishlist_and_cartList.then( response =>{

      if( response != 'false' ){

        this.wish_properties.wishList = response['wishList'];

        this.subject.next( response['cartList'] );

        this.menu_subject.next( false );

        this.set_quantity_in_cartList( response['cookie_cartList'] , response['cartList'] );

        this.total_items_and_price();

      }
    });

  }


  private subject = new Subject();




  public menu_subject = new BehaviorSubject<boolean>(false);

  status_menu = this.menu_subject.asObservable();

  cart = this.subject.asObservable();



  ngOnInit(){

  }

  private Response :any;

  public status_chat = false;

  public cart_properties:any= {

    button:true,
    icon_search: false,
    array_cartId : [],
    filter_cart: '',
    selectedAll : false,
    cartList :this.subject.asObservable(),
    cartCookie : [],
    wish_to_cart : [],
    add_in_server : false,
    selected : [] ,
    status_in_cart:false,
    total_price : 0,
    total_items : 0

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

  public button_properties:any = { active:0 , disabled:false , pointer:1 , selectedIndex:'empty' };


  update_wishList( new_wishlist ){

    this.wish_properties.wishList = new_wishlist;

  }

  refresh_button_properties(){

    this.button_properties = { active:0 , disabled:false , pointer:1 , selectedIndex:'empty' };

  }

  total_items_and_price(){

    let total_price = 0;

    let total_items = 0;

    for( let i = 0 ; i < this.cart_properties.cartList.length ; i++ ){

      total_price += parseInt(this.cart_properties.cartList[i].product_price)*parseInt(this.cart_properties.cartList[i].product_quantity);

      total_items += parseInt(this.cart_properties.cartList[i].product_quantity);

    }

    this.cart_properties.total_price = total_price;

    this.cart_properties.total_items = total_items;

  }

  update_quantity_cartList( event , cart_product){

    let total_price = 0;

    let total_items = 0;

    for( let i = 0 ; i < this.cart_properties.cartList.length ; i++ ){

      total_price += parseInt(this.cart_properties.cartList[i].product_price)*parseInt(this.cart_properties.cartList[i].product_quantity);

      total_items += parseInt(this.cart_properties.cartList[i].product_quantity);

    }

    this.cart_properties.total_price = total_price;

    this.cart_properties.total_items = total_items;

    let update_quantity = [{ "id":cart_product.product_id , "quantity": event.target.value }];

    this.dataservices.create_object_request( 'update_quantity_cartList', update_quantity );

    this.dataservices.Http_Post( this.dataservices.object_request) // make request ......

        .subscribe( //  take success

            data => {

              if( data['status'] == 'update_quantity_cartList' ){

                this.Response = data['data'];

              }

            },
            error => console.log( error['data'] ) // take error .....

        );
  }

  set_quantity_in_cartList( cartList_in_cookie ,cartList ){

    for( let i = 0 ; i < cartList.length ; i++ ){

      for( let j = 0 ; j < cartList_in_cookie.length ; j++ ){

        if( cartList_in_cookie[j].id == cartList[i].product_id ){

          cartList[i].product_quantity =  cartList_in_cookie[j].quantity ;

        }

      }

    }

    this.cart_properties.cartList = cartList;

  }

  add_wish_list( product ){  // function to add product in wishList

    this.wish_properties.status_in_wish = false; // status to find  if this  product is in wish......

    this.wish_properties.array_wishId = [];

    for ( let i =  0 ; i < this.wish_properties.wishList.length ; i++ ){ // loop wish list with product ...

      if( this.wish_properties.wishList[i].product_id == product.product_id ){ // if product .id is equals with one product.id in wish status should be true ...

        this.wish_properties.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

      }

      this.wish_properties.array_wishId.push( {'id':this.wish_properties.wishList[i].product_id , 'quantity':this.wish_properties.wishList[i].product_quantity });
    }

    if( this.wish_properties.status_in_wish != true ){ // check if status is not equals with true  to  add this prod in wish ....

      this.wish_properties.array_wishId.unshift( {'id': product.product_id ,'quantity':product.product_quantity} );

      this.wish_properties.wishList.unshift( product ); // push wish product in wishList products

      this.dataservices.create_object_request( 'add_wishProduct', this.wish_properties.array_wishId );

      this.dataservices.Http_Post( this.dataservices.object_request) // make request ......

          .subscribe( //  take success

              data => {

                if( data['status'] == 'add_wishProduct' ){

                  this.Response = data['data'];

                }

              },
              error => console.log( error['data'] ) // take error .....

          );
      }

  }

  add_cart_list( product ){  // function to add product in wishList

    this.cart_properties.status_in_cart = false; // status to find  if this  product is in wish......

    this.cart_properties.array_cartId = [];

    for ( let i =  0 ; i < this.cart_properties.cartList.length ; i++ ){ // loop wish list with product ...

      if( this.cart_properties.cartList[i].product_id == product.product_id ){ // if product .id is equals with one product.id in wish status should be true ...

        this.cart_properties.status_in_cart = true; //  true status that tell you  that this prod is in wishlist ...

      }
      this.cart_properties.array_cartId.push( {'id':this.cart_properties.cartList[i].product_id , 'quantity':this.cart_properties.cartList[i].product_quantity } );

    }

    if( this.cart_properties.status_in_cart != true ){ // check if status is not equals with true  to  add this prod in wish ....

      this.cart_properties.array_cartId.unshift( {'id': product.product_id ,'quantity':product.product_quantity} );

      console.log( this.cart_properties.array_cartId);

      this.cart_properties.cartList.unshift( product ); // push wish product in wishList products

      this.total_items_and_price();

      this.dataservices.create_object_request( 'add_cartProduct', this.cart_properties.array_cartId );

      this.dataservices.Http_Post( this.dataservices.object_request ) // make request ......

          .subscribe( //  take success

              data => {

                if( data['status'] == 'add_cartProduct' ){

                  this.Response = data['data'];

                  console.log(data['data']);

                }

              },
              error => console.log( error['data'] ) // take error .....

          );
    }


    this.subject.next(this.cart_properties.cartList);



  }



  delete_from_wishList( ){

    this.wish_properties.filter_wish='';

  this.wish_properties.array_wishId = [];

  for( var i = 0 ; i < this.wish_properties.selected.length ; i++ ) { // remove from wish list products that are in selected

    var index = this.wish_properties.wishList.indexOf( this.wish_properties.selected[i] );

    this.wish_properties.array_wishId.push( this.wish_properties.selected[i].product_id );

    if( index  > -1 ){

      this.wish_properties.wishList.splice( index , 1 );

    }

  }

  for( var i = 0 ; i < this.wish_properties.selected.length ; i ++ ){

    this.wish_properties.selected.splice( this.wish_properties.selected[i] , this.wish_properties.selected.length );
  }




  this.Response = this.dataservices.Make_Request_InServer('delete_items_in_wish', this.wish_properties.array_wishId);

  this.Response.then( response =>{

    this.Response = response;

  });

    this.check_button_deleteProducts_fromwishlist();

    this.wish_properties.array_wishId = []; // empty ....

  }

  delete_from_cartList( ){

    this.cart_properties.filter_cart='';

    for( var i = 0 ; i < this.cart_properties.selected.length ; i++ ) { // remove from wish list products that are in selected

      var index = this.cart_properties.cartList.indexOf( this.cart_properties.selected[i] );

      this.cart_properties.array_cartId.push( this.cart_properties.selected[i].product_id );

      if( index  > -1 ){

        this.cart_properties.cartList.splice( index , 1 );
      }

    }

    for( var i = 0 ; i < this.cart_properties.selected.length ; i ++ ){

      this.cart_properties.selected.splice( this.cart_properties.selected[i] , this.cart_properties.selected.length );
    }


    this.Response = this.dataservices.Make_Request_InServer('delete_items_in_cart', this.cart_properties.array_cartId);

    this.Response.then( response =>{

      this.Response = response;

    });

    this.check_button_deleteProducts_fromwishlist();



    this.cart_properties.array_cartId = []; // empty ....

    this.total_items_and_price();
  }



  toggle_select_wish( item_wish ){

    var index = this.wish_properties.selected.indexOf( item_wish );

    if( index > -1 ){

      this.wish_properties.selected.splice(index,1);

    }else{

      this.wish_properties.selected.push(item_wish);
    }

    this.check_button_deleteProducts_fromwishlist();
  }

  toggle_select_cart( item_cart ){

    var index = this.cart_properties.selected.indexOf( item_cart );

    if( index > -1 ){

      this.cart_properties.selected.splice(index,1);

    }else{

      this.cart_properties.selected.push( item_cart );
    }

    this.check_button_deleteProducts_fromcartlist();
  }

  check_selected_wish( item_wish ){

    if( this.wish_properties.selected.indexOf( item_wish ) > -1 ) {

      return true;

    }else{

      return false;
    }
  }

  check_selected_cart( item_cart ){

    if( this.cart_properties.selected.indexOf( item_cart ) > -1 ) {

      return true;

    }else{

      return false;
    }
  }

  getStyle_wish( item_wish ){

    if( this.wish_properties.selected.indexOf( item_wish ) > -1 ) {

      return 'selected_wish';

    }else{

      return '';
    }

  }

  getStyle_cart( item_wish ){

    if( this.cart_properties.selected.indexOf( item_wish ) > -1 ) {

      return 'selected_wish';

    }else{

      return '';
    }
  }

  selecteAll_wishList( ){

    if( this.wish_properties.selectedAll == true ){ // check if  are all wish list  selected  .........

      for( var i = 0 ; i < this.wish_properties.selected.length ; i ++ ){

        this.wish_properties.selected.splice(this.wish_properties.selected[i] , this.wish_properties.selected.length);
      }

      this.wish_properties.selectedAll = false;
      return;
    }

    for( var i = 0 ; i < this.wish_properties.wishList.length ; i ++ ){

      if( this.wish_properties.selected.indexOf(this.wish_properties.wishList[i]) > -1 ){

        continue // exist in selected_wishlist next .....

      }

      this.wish_properties.selected.push( this.wish_properties.wishList[i] ); // push in selected_wishlist
    }

    this.wish_properties.selectedAll = true;

    this.check_button_deleteProducts_fromwishlist();

    return;

  }

  selecteAll_cartList(){

    if( this.cart_properties.selectedAll == true ){ // check if  are all wish list  selected  .........

      for( var i = 0 ; i < this.cart_properties.selected.length ; i ++ ){

        this.cart_properties.selected.splice(this.cart_properties.selected[i] , this.cart_properties.selected.length);
      }

      this.cart_properties.selectedAll = false;
      return;
    }

    for( var i = 0 ; i < this.cart_properties.cartList.length ; i ++ ){

      if( this.cart_properties.selected.indexOf(this.cart_properties.cartList[i]) > -1 ){

        continue // exist in selected_wishlist next .....

      }

      this.cart_properties.selected.push( this.cart_properties.cartList[i] ); // push in selected_wishlist
    }

    this.cart_properties.selectedAll = true;

    this.check_button_deleteProducts_fromcartlist();

    return;
  }

  add_from_wish_to_cart( selected_wish ) {

    this.cart_properties.array_cartId = [];

    this.cart_properties.wish_to_cart = [];

    this.cart_properties.add_in_server = false;

    for (let i = 0; i < selected_wish.length; i++) {

      this.cart_properties.status_in_cart = false;

      for (let j = 0; j < this.cart_properties.cartList.length; j++) {

        if (this.cart_properties.cartList[j].product_id == selected_wish[i].product_id) {

          this.cart_properties.status_in_cart = true;

        }
      }

      if (this.cart_properties.status_in_cart != true) {

        this.cart_properties.wish_to_cart.unshift(selected_wish[i]);

        this.cart_properties.add_in_server = true;
      }

    }

    this.delete_from_wishList();

    if ( this.cart_properties.add_in_server != false ) {

      for ( let i = 0; i < this.cart_properties.wish_to_cart.length; i++ ) {

        this.cart_properties.cartList.unshift(this.cart_properties.wish_to_cart[i]);

      }

      for (let i = 0; i < this.cart_properties.cartList.length; i++) {

        this.cart_properties.array_cartId.push(this.cart_properties.cartList[i].product_id);
      }

      this.total_items_and_price();

      this.dataservices.create_object_request('add_cartProducts', this.cart_properties.array_cartId);

      this.dataservices.Http_Post(this.dataservices.object_request) // make request ......

          .subscribe( //  take success

              data => {

                if (data['status'] == 'add_wishProduct') {

                  this.Response = data['data']
                }
              },
              error => console.log(error['data']) // take error .....

          );
    }
  }

  check_button_deleteProducts_fromwishlist(){

    if( this.wish_properties.selected.length > 0 ){

      this.wish_properties.button = false;

      return;
    }

    this.wish_properties.button = true;

  }
  check_button_deleteProducts_fromcartlist(){

    if( this.cart_properties.selected.length > 0 ){

      this.cart_properties.button = false;

      return;
    }

    this.cart_properties.button = true;

  }






  show_hide_search_in_wishlist(){

    return this.wish_properties.icon_search = !this.wish_properties.icon_search

  }

  show_hide_search_in_cartlist(){

    return this.cart_properties.icon_search = !this.cart_properties.icon_search

  }


  check_show_hide_search_in_wishlist(){

    if( this.wish_properties.icon_search == true ){

      return 'show_search_in_wishlist';
    }

    return '';
  }
  check_show_hide_search_in_cartlist(){

    if( this.cart_properties.icon_search == true ){

      return 'show_search_in_wishlist';
    }

    return '';
  }

}
