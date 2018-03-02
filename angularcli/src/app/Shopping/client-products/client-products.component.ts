import { Component, OnInit,Input , Output , EventEmitter , DoCheck  } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

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

export class ClientProductsComponent implements OnInit,DoCheck {

    constructor( private router : Router, private crypto:EncryptDecryptService , private dataservices: DataService ,    private Httpservice :HttpService , private route: ActivatedRoute  ) {

        this.get_Language = this.dataservices.language;

        this.wishList_products = this.dataservices.wishlist;

        let response = this.dataservices.Make_Request_InServer( 'products' , { 'type': 'default', 'number_click': 1 } );

        response.then(response =>{

            this.pages_details = this.dataservices.products['pages_details'];

            this.build_pages_link(this.dataservices.products['pages_details']);

            this.products = this.dataservices.products['products'];

        });
    }

    ngDoCheck(){

        this.get_Language = this.dataservices.language;

        this.wishList_products = this.dataservices.wishlist;

    }

    public  products:any = [] ;

    public products_detail:any;

    private wishList_products:any = [];

    public productInWish = false;

    public get_Language :object={};

    public Response:any;

    public status_in_wish;

    public nr_products=0;

    public pages_link:any=[];

    public pages_details:any={};

    public send_data_products={};



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

       response.then( products_details =>{

             this.products =  products_details['products'];

             this.pages_details = products_details['pages_details'];

             this.build_pages_link( products_details['pages_details']) ;

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

    set_status_wish(){
         this.status_in_wish=true;
    }
    update_status_wish(){
        this.status_in_wish=false;
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

    ngOnInit() {

        $(document).ready(function(){

            var wish_list_active_pass=0; //  make this variable active  when mouse is hover in wishlist  ..........................

            var small_big=0;  //  make this variable small ore big every time ........

            var id_wish=0; // get id products where mouse is hover .................................................................

            // setInterval call function every time that is located in this function  .............
            setInterval(function(){

                wish_list(wish_list_active_pass,small_big,id_wish);


            },100);

            setInterval(function(){

                small_big=change_value(small_big);


            },500);
            // end ............


            // mouse hover add wishlist active variable that make hearts small and bit .............................
            $('body').on('mouseenter','.hover_all_wish',function(){

                $(this).find('.wish_list').addClass('wish_list_hover') ;

                id_wish = $(this).attr('id');

                wish_list_active_pass=1;

                small_big=1;

            }); // ens .........................................


          // mouse leave from add wishlist into the products remove all variable that make hearts small and big .......................................
            $('body').on('mouseleave','.hover_all_wish',function(){

                $(this).find('.wish_list').removeClass('wish_list_hover');

                id_wish = $(this).attr('id');

                small_big=0;

                wish_list_active_pass=0;

            }); // end .....................................................

            // function change number value   of small_big value  every 0.5 sec ....................

            function change_value(value){

                if(value=='1'){

                    var val = 0;

                    return val;
                }
                if(value=='0'){

                    var val = 1;

                    return 1;
                }
            } // end .......................................


            function wish_list(active_pasive_wish_hover , small_big ,id){

                var width = $(window).width();

                if(width<=800){

                }else{

                    if(active_pasive_wish_hover=='1'){

                        if(small_big=='1'){

                            $('#'+id).find('.hearts_div').addClass('wish_list_icon_hover') ;

                        }else{

                            $('#'+id).find('.hearts_div').removeClass('wish_list_icon_hover') ;
                        }

                    }
                    else{
                        $('#'+id).find('.hearts_div').removeClass('wish_list_icon_hover') ;

                    }

                }
            } // end ......................................................


            $('.click_up').click(function(){

                $('body').animate({
                    scrollTop:'0px'
                });

            });


        });
    }

}
