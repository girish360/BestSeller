
 import { Component, OnInit ,Input ,DoCheck,OnChanges,ChangeDetectorRef,ChangeDetectionStrategy, Output , EventEmitter  ,ElementRef, Renderer } from '@angular/core';

 import { Injectable } from '@angular/core';

 import 'rxjs/add/observable/bindCallback';

 import { DataService } from '../services/data.service';

 import { DeviceDetectorService } from 'ngx-device-detector';

 import { ProductService } from '../products/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ....................

 import { Subscription } from 'rxjs/Subscription';

 import { RouterStateSnapshot,ActivatedRouteSnapshot, ActivatedRoute  ,Params , Data , Router} from '@angular/router';

 import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

 import { SetRouterService } from '../services/set-router.service';

 import {Observable} from 'rxjs/Observable';

 import 'rxjs/Rx';

 declare var $:any;

 @Injectable()

 @Component({

    selector: 'app-header',

    templateUrl: './header.component.html' ,

    styleUrls: ['./header.component.css'],

     changeDetection :ChangeDetectionStrategy.OnPush,

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

 export class HeaderComponent implements OnInit   {

     private Response;

     public active = 'active';

     drop_Card = false;

     deviceInfo = null;

     public typing_search:any;

     timer_pointer_dropdown : Subscription;

     public language_allow = [

         {name: 'English', id: "1" , image:'england.png'},
         {name: 'Albanian', id: "2", image:'albania.png'},
         {name: 'Italy', id: "3" ,image:'italy.png'}

     ];


     public button_right = [

         { id:1 , name:'sign' ,mat_tooltip:'User Panel', different_class:'',
             icon :'glyphicon-user gh-productsService'
         },
         { id:2 , name:'wish' , mat_tooltip:'WishList',  different_class:' notCloseDropdawnFavorite notClosepointerHeader',
             icon :'glyphicon-heart' , dropdown_class:'dropfavority' ,dropdown_body:'body_wish'
         },
         { id:3 , name:'card' ,mat_tooltip:'Your Cart',  different_class:'notClosepointerHeader notCloseDropdawnCard',
             icon :'glyphicon-shopping-cart gh-productsService' , dropdown_class:'dropcard' ,dropdown_body:'body_cart'
         },
         { id:4 , name:'more' ,mat_tooltip:'More Options',  different_class:'notClosepointerHeader notCloseDropdawnLanguage',
             icon :'glyphicon-option-vertical', dropdown_class:'dropmore' ,dropdown_body:'mat-tab-body-wrapper'
         }

    ];


    constructor(
        private renderer : Renderer ,
        private el : ElementRef,
        private productsService : ProductService,
        private deviceService: DeviceDetectorService,
        private dataservices : DataService ,
        private route : ActivatedRoute ,
        private setRouter :SetRouterService,
        private cd: ChangeDetectorRef



    ) {

        this.get_device_info();

    }

     ngOnInit() {

     }


     index(index , item){

        if(!item) return null;

        return item.id;
    }

    public get_device_info() {

        this.deviceInfo = this.deviceService.getDeviceInfo();

    }


     public check_button( button , i  ,event ){

        this.productsService.button_properties.selectedIndex = i;

        if( this.productsService.button_properties.disabled == false ) {

            this.productsService.button_properties.disabled = true;

            setTimeout(()=>{    //<<<---    using ()=> syntax

                this.productsService.button_properties.disabled = false;

            },300);

            if (this.productsService.button_properties.active != button.id) {

                this.productsService.button_properties.active = button.id;

                if (button.id == 1) {

                   this.set_router( { path:'login' , data:false , relative:true } );

                } else {

                    this.find_position_dropdown(event,button.dropdown_class );



                    this.show_dropdown_button(button.dropdown_class, button.dropdown_body , button.id);

                    this.productsService.button_properties.pointer = button.id;

                    this.find_position( this.productsService.button_properties.pointer );
                }

            } else {



                this.hide_dropdown_button( button.dropdown_class, button.dropdown_body  );

                this.productsService.button_properties.active = 0;

                this.productsService.button_properties.selectedIndex = 'empty';
            }
        }

    }



    public  set_router( data ){

        this.setRouter.set_router( data , this.route ); // set router .....

    }

    public find_position(id){

         $(function(){

             var left=  $('.button'+id).find('.glyphicon').offset();

             if( id == 2 ){

                 $('.treguesi').css({"margin-left": left.left + 12, "background-color": "white"});
             }
             else if( id ==3 ){

                 $('.treguesi').css({"margin-left": left.left + 11, "background-color": "white"});
             }
             else if ( id == 4 ){

                 $('.treguesi').css({"margin-left": left.left + 7, "background-color": "white"});
             }
         });
    }

    public find_position_dropdown( event , dropdown_Class  ){

        let left  = event.clientX;

        $( '.'+dropdown_Class ).css({ right: 100% - left-30 });

    }



    public show_dropdown_button( dropdown_class, body_inside , id ){

        $('.treguesi').css({display: 'none'});

        $('.'+body_inside).css({ top: '15px'});

        $('.' + dropdown_class).css({top: '70px', opacity: '0.1'}); //  css style...

        $('.' + dropdown_class).show().animate({ // animation effect show dropdown productsService......

            top: '40px',

            opacity: 1

        }, 100, function () { //  function after effect ............

            $('.treguesi').css({display: 'block'}); // show pionter......

            $('.write_icon_productsService').css('visibility', 'visible');

            $('.write_icon_header'+id).css('visibility', 'hidden'); // remove write below icon in productsService

            $('.treguesi').css({display: 'block'});

        });

        $('.' + body_inside).animate({

            top: '0'

        }, 200);

    }

    public hide_dropdown_button( dropdown_class, body_inside){

        $('.treguesi').css({display: 'none'});

        $('.write_icon_header').css('visibility', 'visible');

        $('.' + body_inside).css({top: '0px'});

        $('.' + dropdown_class).css({top: '40px', opacity: '1'}); // css style...

        $('.' + dropdown_class).animate({ // animation effect hide dropdown productsService......

            top: '70',

            opacity: '0.1',

        }, 100, function () { //  function after effect ............

            $('.' + dropdown_class).hide();

        });

        $('.' + body_inside).animate({

            top: '15'

        }, 200);

    }


     show_chat(){ /// function show show element  for chat  when user click  on the chat call this function  and open div for chat with animate  ........................

         $('.chat').animate({

             height:"400px",

             bottom:"70px",

             width : '250px',

             borderRadius: "3px",

             borderColor: '#d6d6c2',

             borderWidth : '1px',

         },200,function(){

             $('.pointerchat').css("visibility","visible");

             $('.pasiv_activ_chat').show();

         });

         $('.body_chat').css({top: '25px', opacity: '0.1'});

         $('.body_chat').animate({

             top: '0',

             opacity: 1

         }, 500);


     } //..................................................end

     hide_chat(){ // function for hide chat when user click close chat   , then call this for close ...............................

         $('.chat').animate({

         height:"60px",

         position:'fixed',

             bottom:"5px",

         width : '60px',

         borderRadius: "100px",

             borderColor: 'darkolivegreen',

         borderWidth : '1px',

         },200,function(){

             $('.pasiv_activ_chat').hide();

         });

         $('.pointerchat').css("visibility","hidden");

     } //.....................................end

     check_menu(){

         if( this.productsService.menu_subject.getValue() == false ){

             this.productsService.menu_subject.next(true);

             return;
         }

         this.productsService.menu_subject.next(false);

         return;

     }

     check_chat(){

         if( this.productsService.status_chat == true ){

             this.hide_chat();

             this.productsService.status_chat = !this.productsService.status_chat;

             return;

         }

         this.show_chat();

         this.productsService.status_chat = !this.productsService.status_chat;

         return;
     }

    choose_language( language ){  //  function for update language ..........

      this.dataservices.Make_Request_InServer( 'changeLanguage', language );

    }

    update_language( new_language ){ // change language to services file that  make share language to all components  .....

        this.dataservices.update_language( new_language );

        this.cd.markForCheck();

    }



    delete_from_wishList( ){

        this.productsService.wish_properties.filter_wish='';

        for( var i = 0 ; i < this.productsService.wish_properties.selected.length ; i++ ) { // remove from wish list products that are in selected

            var index = this.productsService.wish_properties.wishList.indexOf( this.productsService.wish_properties.selected[i] );

            this.productsService.wish_properties.array_wishId.push( this.productsService.wish_properties.selected[i].product_id );

            if( index  > -1 ){

                this.productsService.wish_properties.wishList.splice( index , 1 );
            }

        }

        for( var i = 0 ; i < this.productsService.wish_properties.selected.length ; i ++ ){

            this.productsService.wish_properties.selected.splice( this.productsService.wish_properties.selected[i] , this.productsService.wish_properties.selected.length );
        }


        this.Response = this.dataservices.Make_Request_InServer('delete_itemFromCookie', this.productsService.wish_properties.array_wishId);

        this.Response.then( response =>{

            this.Response = response;

        });

        this.check_button_deleteProducts_fromwishlist();



        this.productsService.wish_properties.array_wishId = []; // empty ....
    }


    toggle_select_wish( item_wish ){

        var index = this.productsService.wish_properties.selected.indexOf( item_wish );

        if( index > -1 ){

            this.productsService.wish_properties.selected.splice(index,1);

        }else{

            this.productsService.wish_properties.selected.push(item_wish);
        }

        this.check_button_deleteProducts_fromwishlist();



    }

    check_selected_wish( item_wish ){

        if( this.productsService.wish_properties.selected.indexOf( item_wish ) > -1 ) {

            return true;

        }else{

            return false;
        }
    }

    getStyle_wish( item_wish ){

        if( this.productsService.wish_properties.selected.indexOf( item_wish ) > -1 ) {

            return 'selected_wish';

        }else{

            return '';
        }

    }

    selecteAll_wishList( ){

        if( this.productsService.wish_properties.selectedAll == true ){ // check if  are all wish list  selected  .........

            for( var i = 0 ; i < this.productsService.wish_properties.selected.length ; i ++ ){

                this.productsService.wish_properties.selected.splice(this.productsService.wish_properties.selected[i] , this.productsService.wish_properties.selected.length);
            }

            this.productsService.wish_properties.selectedAll = false;
            return;
        }

        for( var i = 0 ; i < this.productsService.wish_properties.wishList.length ; i ++ ){

            if( this.productsService.wish_properties.selected.indexOf(this.productsService.wish_properties.wishList[i]) > -1 ){

                continue // exist in selected_wishlist next .....

            }

            this.productsService.wish_properties.selected.push( this.productsService.wish_properties.wishList[i] ); // push in selected_wishlist
        }

        this.productsService.wish_properties.selectedAll = true;

        this.check_button_deleteProducts_fromwishlist();

        return;

    }

     selecteAll_cartList(){

     }

     add_from_wish_to_cart( selected_wish ){

         this.productsService.cart_properties.array_cartId = [];

         for( let i = 0 ; i  < selected_wish.length  ; i++  ){

             this.productsService.cart_properties.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

             this.productsService.cart_properties.cartList.unshift( selected_wish[i] ); // push wish product in wishList products

             this.productsService.cart_properties.array_cartId.push( selected_wish[i].product_id );

         }

         this.delete_from_wishList();

         this.dataservices.create_object_request( 'add_cartProducts', this.productsService.cart_properties.array_cartId  );

         this.dataservices.Http_Post( this.dataservices.object_request) // make request ......

             .subscribe( //  take success

                 data => {

                     if( data['status'] == 'add_wishProduct' ){

                         this.Response = data['data']
                     }
                 },
                 error => console.log( error['data'] ) // take error .....

             );

     }

    check_button_deleteProducts_fromwishlist(){

        if( this.productsService.wish_properties.selected.length > 0 ){

            this.productsService.wish_properties.button = false;

            return;
        }

        this.productsService.wish_properties.button = true;

    }



    current_language(id_language){

        if( this.dataservices.language.id == id_language ){

            return true;
        }

        return false;
    }

    show_hide_search_in_wishlist(){

        return this.productsService.wish_properties.icon_search = !this.productsService.wish_properties.icon_search

    }


    check_show_hide_search_in_wishlist(){

        if( this.productsService.wish_properties.icon_search == true ){

            return 'show_search_in_wishlist';
        }

        return '';
    }






 }
