import {Component, OnInit, Input, Output, EventEmitter, DoCheck,  ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { RouterStateSnapshot,ActivatedRouteSnapshot, ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { HttpService } from '../services/http.service';

import { DataService } from '../services/data.service';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

declare  var $:any;

@Component({

  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css'],

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



export class ClientProductsComponent implements OnInit,DoCheck  {

    public loader = false;

    public  products:any = [] ;

    public products_detail:any;

    private wishList_products:any = [];

    public productInWish = false;

    public Response:any;

    public status_in_wish=false;

    public nr_products=0;

    public pages_link:any=[];

    public pages_details:any={};

    public send_data_products={};


    public property_products = {

        hover_wish_list:false,

        empty_full:0,

        index_product:'empty'

    };

    my_timer_wish: Subscription ;

    constructor(private cdr:  ChangeDetectorRef, private router : Router, private crypto:EncryptDecryptService , private dataservices: DataService ,    private Httpservice :HttpService , private route: ActivatedRoute  ) {

        this.dataservices.update_loader(true);

        this.wishList_products = this.dataservices.wishlist;


        let response = this.dataservices.Make_Request_InServer( 'products' , { 'type': 'default', 'number_click': 1 } );

        response.then( response => {

            this.pages_details = this.dataservices.products['pages_details'];

            this.build_pages_link(this.dataservices.products['pages_details']);

            this.products = this.dataservices.products['products'];

            this.dataservices.update_loader(false);
        });

    }

    ngDoCheck(){

        this.wishList_products = this.dataservices.wishlist;
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

        this.dataservices.update_loader(true);

       let response = this.dataservices.Make_Request_InServer( 'products', this.send_data_products );

       response.then( products_details =>{

             this.products =  products_details['products'];

             this.pages_details = products_details['pages_details'];

             this.build_pages_link( products_details['pages_details']) ;

             this.dataservices.update_loader(false);

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


    add_wish_list( product_data ){  // function to add product in wishList

        this.status_in_wish = false; // status to find  if this  product is in wish......

        for ( var i =  0 ; i<this.wishList_products.length ; i++ ){ // loop wish list with product ...

            if( this.wishList_products[i].id == product_data.id ){ // if product .id is equals with one product.id in wish status should be true ...

                this.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

            }
        }

        if( this.status_in_wish != true ){ // check if status is not equals with true  to  add this prod in wish ....

            this.ondestroyInterval_wish();

            this.wishList_products.unshift( product_data ); // push wish product in wishList products

            this.dataservices.update_wishList( this.wishList_products); // change wish list in services   that get this  when change component with router outlet


            this.dataservices.create_object_request( 'add_wishProduct', product_data.id );

            this.Httpservice.Http_Post( this.dataservices.object_request) // make request ......

                .subscribe( //  take success

                    data => {
                        if( data['status'] == 'add_wishProduct' ){
                            this.Response = data['data']
                        }
                    },
                    error => console.log( error['data'] ) // take error .....

                );
        }
    }

    check_wish(product){

        this.status_in_wish = false;

        for ( let i = 0 ; i < this.wishList_products.length ; i++){

            if( this.wishList_products[i].id ==  product.id ){

                this.status_in_wish = true;
            }
        }
        return this.status_in_wish;
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

    change_nr(){

        this.nr_products++;

    }
    mouseHover_wish( product , i ){

        this.property_products.index_product = i;

        this.property_products.empty_full=1;

        this.check_wish_icon( product );

        this.onStartInterval_wish(product);

    }

    mouseLeave_wish( product ){

        this.property_products.index_product = 'empty';

        this.property_products.empty_full=0;

        this.ondestroyInterval_wish();

        this.check_wish_icon( product );

    }

    check_wish_icon( product ){

        this.status_in_wish = false; // status to find  if this  product is in wish......

        for ( var i =  0 ; i < this.wishList_products.length ; i++ ){ // loop wish list with product ...

            if( this.wishList_products[i].id == product.id ){ // if product .id is equals with one product.id in wish status should be true ...

                this.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

            }
        }

        if( this.status_in_wish != true ) { // check if status is not equals with true  to  add this prod in wish ....


            if( this.property_products.empty_full == 1 ){

                this.property_products.hover_wish_list = true;

            }else{

                this.property_products.hover_wish_list = false;
            }
        }
    }

    onStartInterval_wish( product ) {

        this.my_timer_wish = Observable.interval(500).subscribe( val => {

            if(this.property_products.empty_full == 1){

                this.property_products.empty_full = 0;

            }else{

                this.property_products.empty_full = 1;
            }

            this.check_wish_icon( product );
        });
    }

    ondestroyInterval_wish(){

        this.my_timer_wish.unsubscribe();
    }




}
