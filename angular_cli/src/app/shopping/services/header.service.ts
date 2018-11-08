import { Injectable,OnInit,ChangeDetectorRef,Input,ElementRef ,ViewChild} from '@angular/core';

import { DataService } from './data.service';

import{BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/interval';

import {Observable} from 'rxjs/Observable';

import{Subject} from 'rxjs/Subject';

import 'rxjs/Rx';

declare var $:any;

@Injectable()

export class HeaderService  implements OnInit {


  constructor( protected dataservices : DataService ) {

  }

  public subject_products =  new BehaviorSubject<boolean>(true); // identify if cartlist should change

  public status_products = this.subject_products.asObservable();// identify if cartlist should change

  ngOnInit(){}

  private Response :any;

  public status_chat = false;

  public top_nav_data:any = {

     last_scroll:0,

     up:false,

     activated_up:0,

    activated_down:0,

     position_static:false,

    diff:false

  };

  public mobile_sticky_style :any={};

  public cart_properties:any= {

    button:true,
    icon_search: false,
    array_cartId : [],
    filter_cart: '',
    selectedAll : false,
    cartList :[],
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

    this.subject_products.next(true);

  }

  total_items_and_price(){

    let total_price = 0;

    let total_items = 0;

    for( let i = 0 ; i < this.cart_properties.cartList.length ; i++ ){

      total_price += parseInt(this.cart_properties.cartList[i].price)*parseInt(this.cart_properties.cartList[i].quantity);

      total_items += parseInt(this.cart_properties.cartList[i].quantity);

    }

    this.cart_properties.total_price = total_price;

    this.cart_properties.total_items = total_items;

  }

  update_quantity_cartList( cart_product){

    let total_price = 0;

    let total_items = 0;

    for( let i = 0 ; i < this.cart_properties.cartList.length ; i++ ){

      total_price += parseInt(this.cart_properties.cartList[i].price)*parseInt(this.cart_properties.cartList[i].quantity);

      total_items += parseInt(this.cart_properties.cartList[i].quantity);

    }

    this.cart_properties.total_price = total_price;

    this.cart_properties.total_items = total_items;

    let update_quantity = [{ "id":cart_product.product_id , "quantity": cart_product.quantity }];

    this.dataservices.Http_Post( 'shopping/header/update_cartList', update_quantity ) // make request ......

        .subscribe( //  take success

            data => {

              this.Response = data;

            },

            error => console.log( error ) // take error .....

        );
  }

  set_quantity_in_cartList( cartList_in_cookie ,cartList ){

    for( let i = 0 ; i < cartList.length ; i++ ){

      for( let j = 0 ; j < cartList_in_cookie.length ; j++ ){

        if( cartList_in_cookie[j].id == cartList[i].product_id ){

          cartList[i].quantity =  cartList_in_cookie[j].quantity;

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

      this.wish_properties.array_wishId.push( {'id':this.wish_properties.wishList[i].product_id });
    }

    if( this.wish_properties.status_in_wish != true ){ // check if status is not equals with true  to  add this prod in wish ....

      this.wish_properties.array_wishId.unshift( {'id': product.product_id } );

      this.wish_properties.wishList.unshift( product ); // push wish product in wishList products

      this.subject_products.next(true);

      this.dataservices.Http_Post( 'shopping/header/add_inwishList', this.wish_properties.array_wishId  ) // make request ......

          .subscribe( //  take success

              data => {

                this.Response = data;

                },
              error => console.log( error ) // take error .....

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
      this.cart_properties.array_cartId.push( {'id':this.cart_properties.cartList[i].product_id , 'quantity':this.cart_properties.cartList[i].quantity } );

    }

    if( this.cart_properties.status_in_cart != true ){ // check if status is not equals with true  to  add this prod in wish ....

      this.cart_properties.array_cartId.unshift( {'id': product.product_id ,'quantity':product.quantity} );

      this.cart_properties.cartList.unshift( product ); // push wish product in wishList products

      this.total_items_and_price();

      this.subject_products.next(true);

      this.dataservices.Http_Post( 'shopping/header/add_incartList' , this.cart_properties.array_cartId ) // make request ......

          .subscribe( //  take success

              data => {

                this.Response = data;

              },

              error => console.log( error ) // take error .....

          );
    }
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

    this.subject_products.next(true);

    this.dataservices.Http_Post( 'shopping/header/delete_items_inWish' , this.wish_properties.array_wishId ) // make request ......

        .subscribe( //  take success

            data => {

              this.Response = data;

            },

            error => console.log( error ) // take error .....

        );

    this.check_button_deleteProducts_fromwishlist();

    this.wish_properties.array_wishId = []; // empty ....

  }

  delete_from_cartList(){

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

    this.subject_products.next(true);

    this.dataservices.Http_Post( 'shopping/header/delete_items_inCart' , this.cart_properties.array_cartId ) // make request ......

        .subscribe( //  take success

            data => {

              this.Response = data;

            },

            error => console.log( error ) // take error .....

        );

    this.check_button_deleteProducts_fromwishlist();



    this.cart_properties.array_cartId = []; // empty ....

    this.total_items_and_price();
  }

  public show_dropdown_button( dropdown_class, body_inside , id ){



    $(body_inside).css({ top: '15px'});

    $('.' + dropdown_class).css({top: '70px', opacity: '0.1'}); //  css style...

    $('.' + dropdown_class).show().animate({ // animation effect show dropdown productsService......

      top: '50px',

      opacity: 1

    }, 100, function () { //  function after effect ............

      $('.write_icon_header').css('color', 'slategrey');

      $('.write_icon_header'+id).css('color', 'white'); // remove write below icon in productsService

    });

    $(body_inside).animate({

      top: '0'

    }, 200);

  }

  public hide_dropdown_button( dropdown_class, body_inside){

    $(body_inside).css({top: '0px'});

    $('.' + dropdown_class).css({top: '50px', opacity: '1'}); // css style...

    $('.' + dropdown_class).animate({ // animation effect hide dropdown productsService......

      top: '70',

      opacity: '0.1',

    }, 100, function () { //  function after effect ............

      $('.' + dropdown_class).hide();

    });

    $(body_inside).animate({

      top: '15'

    }, 200);

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

        this.cart_properties.cartList.unshift(this.cart_properties.wish_to_cart[i] );

      }

      for (let i = 0; i < this.cart_properties.cartList.length; i++) {

        this.cart_properties.array_cartId.push(  {'id':this.cart_properties.cartList[i].product_id , 'quantity':this.cart_properties.cartList[i].quantity } );
      }

      this.total_items_and_price();

      this.dataservices.Http_Post( 'shopping/header/add_incartList', this.cart_properties.array_cartId ) // make request ......

          .subscribe( //  take success

              data => {

                this.Response = data

              },
              error => console.log(error) // take error .....

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
