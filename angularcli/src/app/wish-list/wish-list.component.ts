import { Component, OnInit,AfterContentChecked } from '@angular/core';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

import { HttpService } from '../services/http.service';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
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
    ])
  ]
})
export class WishListComponent implements OnInit,AfterContentChecked {

  public wishList_products = [];

  public get_Language = {};

  public selected_wishList=[];

  private Response;

  public active = 'active';

  public toggle_checked_wishList=false;

  public button_delete=true;

  public  selectedAll_value_wishlist = false;

  public Array_wishID_delete_wishlist = [];

  private show_hide_search_in_wishList = false;

  public  filter_wish='';

  constructor( private dataservices : DataService, private Httpservices : HttpService ) {

  }

  ngAfterContentChecked(){

    this.wishList_products = this.dataservices.wishlist;

    this.get_Language = this.dataservices.language;

  }

  delete_from_wishList( All_wishList ){

    this.filter_wish='';

    for( var i = 0 ; i < this.selected_wishList.length ; i++ ) { // remove from wish list products that are in selected

      var index = this.wishList_products.indexOf( this.selected_wishList[i] );

      this.Array_wishID_delete_wishlist.push(this.selected_wishList[i].id);

      if( index  > -1 ){
        this.wishList_products.splice( index , 1 );
      }

    }

    for( var i = 0 ; i < this.selected_wishList.length ; i ++ ){

      this.selected_wishList.splice(this.selected_wishList[i] , this.selected_wishList.length);
    }

    this.Httpservices.create_obj('delete_itemFromCookie', this.Array_wishID_delete_wishlist ); // delete from server

    this.Httpservices.Http_Post()

        .subscribe(data => {

              if (data['status'] == 'delete_itemFromCookie') {

                this.Response = data['data'] , console.log( data['data'])
              }
            }
            , error => (console.log(error['data']))
        );

    this.check_button_deleteProducts_fromwishlist();

    this.check_selectedAll_checkbox_wish();

    this.Array_wishID_delete_wishlist = []; // empty ....
  }


  toggle_select_wish( item_wish ){

    var index = this.selected_wishList.indexOf( item_wish );

    if( index > -1 ){

      this.selected_wishList.splice(index,1);

    }else{

      this.selected_wishList.push(item_wish);
    }

    this.check_button_deleteProducts_fromwishlist();

    this.check_selectedAll_checkbox_wish();

  }

  check_selected_wish( item_wish ){

    if( this.selected_wishList.indexOf( item_wish ) > -1 ) {

      return true;

    }else{

      return false;
    }
  }

  getStyle_wish( item_wish ){

    if( this.selected_wishList.indexOf( item_wish ) > -1 ) {

      return 'selected_wish';

    }else{

      return '';
    }

  }

  selectedAll_wishList( ){

    if( this.selectedAll_value_wishlist == true ){ // check if  are all wish list  selected  .........

      for( var i = 0 ; i < this.selected_wishList.length ; i ++ ){

        this.selected_wishList.splice(this.selected_wishList[i] , this.selected_wishList.length);
      }

      this.check_selectedAll_checkbox_wish();

      return;
    }

    for( var i = 0 ; i < this.wishList_products.length ; i ++ ){

      if( this.selected_wishList.indexOf(this.wishList_products[i]) > -1 ){

        continue // exist in selected_wishlist next .....

      }

      this.selected_wishList.push( this.wishList_products[i] ); // push in selected_wishlist
    }

    this.check_button_deleteProducts_fromwishlist();

    this.check_selectedAll_checkbox_wish();
  }

  check_button_deleteProducts_fromwishlist(){

    if( this.selected_wishList.length > 0 ){

      this.button_delete = false;

      return;
    }

    this.button_delete = true;

  }

  check_selectedAll_checkbox_wish(){

    if( this.wishList_products.length == this.selected_wishList.length &&  this.selected_wishList.length > 0  ){

      this.selectedAll_value_wishlist = true;

      return;
    }

    this.selectedAll_value_wishlist = false;

  }



  show_hide_search_in_wishlist(){

    return this.show_hide_search_in_wishList = !this.show_hide_search_in_wishList

  }


  check_show_hide_search_in_wishlist(){

    if(this.show_hide_search_in_wishList == true){

      return 'show_search_in_wishlist';
    }

    return '';
  }

  ngOnInit() {
  }

}
