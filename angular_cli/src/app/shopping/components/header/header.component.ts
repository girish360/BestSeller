
 import { Component, OnInit,NgZone ,HostListener,ViewChild,ChangeDetectorRef,ChangeDetectionStrategy , EventEmitter  ,ElementRef, Renderer } from '@angular/core';

 import { Injectable } from '@angular/core';

 import 'rxjs/add/observable/bindCallback';

 import { DataService } from '../../services/data.service';

 import { DeviceDetectorService } from 'ngx-device-detector';

 import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ....................

 import { MenuService } from '../../services/menu.service';

 import { Subscription } from 'rxjs/Subscription';

 import {  ActivatedRoute  ,Params , Data , Router} from '@angular/router';

 import { trigger, sequence, transition, animate, style, state } from '@angular/animations';

 import { SetRouterService } from '../../../share_services/set-router.service';

 import { SearchService} from '../../services/search.service';

 import { ScrollbarService } from '../../../share_services/scrollbar.service';

 import { AuthService } from '../../services/auth.service';

 declare var $:any;


 @Injectable()

 @Component({

    selector: 'app-header',

    templateUrl: './header.component.html' ,

     styleUrls: ['./header.component.scss'],

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
        ]),
     ]


 })

 export class HeaderComponent implements OnInit   {


     private Response;

     public active = 'active';

     drop_Card = false;

     deviceInfo = null;

     public quantity_products:any='1';

     public typing_search:any='';

     timer_pointer_dropdown : Subscription;

     private time_search:number;

     public language_allow = [

         {name: 'English', id: "1" , image:'england.png'},
         {name: 'Albanian', id: "2", image:'albania.png'},
         {name: 'Italy', id: "3" ,image:'italy.png'}

     ];

     public top_nav_mobile_style = {};

     public button_right = [

         { id:4 , name:'sign' ,tooltip:'User Panel',  length:'',
             icon :'account_box' , dropdown_class:'dropclient' , dropdown_body:'.bodydropclient' ,
             hide_notification:true ,different_class :'notCloseDropdawnClient notClosepointerHeader'
         },
         { id:3 , name:'notification' ,tooltip:'Notify Panel',length:'count_notify',
             icon :'notifications_active' , dropdown_class:'dropnotify' , dropdown_body:'.body_notify' ,
             hide_notification:false ,different_class :'notCloseDropdawnNotify notClosepointerHeader'
         },
         { id:2 , name:'wish' , tooltip:'WishList.length', length:'count_wish', different_class:' notCloseDropdawnFavorite notClosepointerHeader',
             icon :'favorite' , dropdown_class:'dropfavorites' ,dropdown_body:'.dropfavorites  .wishlist_component  .body_div',
             hide_notification:false
         },
         { id:1 , name:'card' ,tooltip:'Your Cart',length:'count_cart',  different_class:'notClosepointerHeader notCloseDropdawnCard',
             icon :'shopping_cart' , dropdown_class:'dropcard' ,dropdown_body:'.body_cart',
             hide_notification:false
         },
         { id:0 , name:'more' ,tooltip:'More Options', length:'', different_class:'notClosepointerHeader notCloseDropdawnMore',
             icon :'view_module', dropdown_class:'dropmore' ,dropdown_body:'.dropdown_more .mat-tab-body-wrapper',
             hide_notification:true
         },

     ];

     constructor(
         private renderer : Renderer ,
         private el : ElementRef,
         private ps : ProductService,
         private device: DeviceDetectorService,
         private ds : DataService ,
         private ms :MenuService,
         private searchService:SearchService,
         private route : ActivatedRoute ,
         private sr :SetRouterService,
         private cd: ChangeDetectorRef,
         private scroll :ScrollbarService,
         private ngZone: NgZone,
         private auth:AuthService


    ) {
         this.ds.Http_Get('shopping/header', false )

            .subscribe( //  take success

                response => {

                    if( response ){

                        let language = response['language'];

                        let wishlist = response['wishlist_cartlist']['wishList'];

                        let cartlist = response['wishlist_cartlist']['cartList'];

                        let quantity_items_incart = response['wishlist_cartlist']['quantity_items_incart'] ;

                        if( response['client'] ){

                           this.auth.client = response['client'];

                        }

                        if( wishlist ){

                            this.ps.wish_properties.wishList = wishlist ;
                        }

                        if( cartlist  ){

                            this.ps.set_quantity_in_cartList( quantity_items_incart , cartlist );

                            this.ps.total_items_and_price();
                        }


                        this.ds.language = language;

                        this.ds.update_header('true');

                        this.cd.markForCheck();
                    }

                }
            );


         this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

             let screen = this.scroll.screen_size();

             let scroll = this.scroll.window_scroll();

             if( this.ps.top_nav_data.last_scroll >  scroll.top ){

                 this.top_nav_mobile_style = { top:0 };

                 if( screen.x > 750 ){

                     if( scroll.top > 60 ){

                         this.ps.mobile_sticky_style = {position:'sticky', top:'50px' };

                     }else{

                         this.ps.mobile_sticky_style = { position:'relative', top:0, transition:'none' };

                     }

                 }else{

                     if( scroll.top > 60 ){

                         this.ps.mobile_sticky_style ={ position:'sticky' ,top:'40px' };

                     }else{

                         this.ps.mobile_sticky_style ={ position:'relative', top:0 ,transition:'none' };
                     }
                 }

             }else{

                 if( screen.x > 750 ){

                     if( scroll.top > 60 ){

                         this.top_nav_mobile_style = {top: '-40px'};

                         this.ps.mobile_sticky_style = { position:'sticky', top:'-50px' };

                     }else{

                         this.ps.mobile_sticky_style = { position:'relative',  top:0 };

                     }

                 }else{

                     if( scroll.top > 60 ){

                         this.top_nav_mobile_style = { top: '-40px'};

                         this.ps.mobile_sticky_style = { position:'sticky', top:0 };

                     }else{

                         this.ps.mobile_sticky_style = {position:'relative', top:0 };
                     }
                 }
             }

             this.ps.top_nav_data.last_scroll = scroll.top;

             this.ds.update_products(true);

             this.cd.markForCheck();

         });

    }



     ngOnInit() {

     }

     check_body(boolean){ // change width inner body

         this.ds.change_inner = boolean;
     }

     index(index , item){

        if(!item) return null;

        return item.id;
    }

     public get_device_info() {

        this.deviceInfo = this.device.getDeviceInfo();

    }

     public check_button( button , i  ,event ){

         this.ps.button_properties.selectedIndex = i;

        if( this.ps.button_properties.disabled == false ) {

            this.ps.button_properties.disabled = true;

            setTimeout(()=>{    //<<<---    using ()=> syntax

                this.ps.button_properties.disabled = false;

            },300);

            if ( this.ps.button_properties.active != button.id ) {

                this.ps.button_properties.active = button.id;

                if ( button.id == 4) {

                    if( this.auth.token ){

                        this.ps.button_properties.pointer = button.id;

                        this.find_position( this.ps.button_properties.pointer ,button.dropdown_class );

                        this.ps.show_dropdown_button( button.id );

                    }else{
                        this.set_router( { path:'login_register' , data:false , relative:true } );
                    }

                } else {

                    this.ps.button_properties.pointer = button.id;

                    this.find_position( this.ps.button_properties.pointer ,button.dropdown_class );

                    this.ps.show_dropdown_button( button.id );
                }

            } else {

                this.ps.button_properties.active = -1;

                this.ps.hide_dropdown_button(  button.id );

                this.ps.button_properties.selectedIndex = 'empty';
            }
        }
     }

     public  set_router( data ){

         this.sr.set_router( data , this.route ); // set router .....

    }

    client_profile(){

         let client_name = this.auth.client.first_name;

         let client_id = this.auth.client.id;


        let client = 'shopping/client/'+client_name+'@'+client_id;

        this.set_router( { path:client , data:false , relative:false} );
    }

    button_search( el ){

      this.searchService.search_component = true;


        this.searchEl.nativeElement.focus();

        this.set_router({ path:'shopping/results' , data:{ keyparams:'keyword' , params: ''} ,relative:false });
    }

     seeAll_searchResuls( data ){

       this.searchService.hide_search_content();

         this.set_router( data );

     }

     public find_position(id , dropdown_Class ){

         $(function(){

             let position = id * 70 ;


             $( '.'+dropdown_Class ).css({ right: position });

         });
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

         if( this.ms.menu.getValue() == false ){

             this.ms.menu.next(true);

             return;
         }

         this.ms.menu.next(false);

         return;

     }

     check_chat(){

         if( this.ps.status_chat == true ){

             this.hide_chat();

             this.ps.status_chat = !this.ps.status_chat;

             return;

         }

         this.show_chat();

         this.ps.status_chat = !this.ps.status_chat;

         return;
     }

    choose_language( language ){  //  function for update language ..........


        this.ds.Http_Get( 'shopping/header/change_language', { 'language':language }  ) // make request ......

            .subscribe( //  take success

                data => {

                    this.ds.language = data;

                    this.ds.update_app(true);

                },
                error => console.log( error ) // take error .....

            );

    }

    update_language( new_language ){ // change language to services file that  make share language to all components  .....

        this.ds.update_language( new_language );

     }

    toggle_select_wish( item_wish ){

        var index = this.ps.wish_properties.selected.indexOf( item_wish );

        if( index > -1 ){

            this.ps.wish_properties.selected.splice(index,1);

        }else{

            this.ps.wish_properties.selected.push(item_wish);
        }

        this.check_button_deleteProducts_fromwishlist();



    }

    check_selected_wish( item_wish ){

        if( this.ps.wish_properties.selected.indexOf( item_wish ) > -1 ) {

            return true;

        }else{

            return false;
        }
    }

    getStyle_wish( item_wish ){

        if( this.ps.wish_properties.selected.indexOf( item_wish ) > -1 ) {

            return 'selected_wish';

        }else{

            return '';
        }

    }

    selecteAll_wishList( ){

        if( this.ps.wish_properties.selectedAll == true ){ // check if  are all wish list  selected  .........

            for( var i = 0 ; i < this.ps.wish_properties.selected.length ; i ++ ){

                this.ps.wish_properties.selected.splice(this.ps.wish_properties.selected[i] , this.ps.wish_properties.selected.length);
            }

            this.ps.wish_properties.selectedAll = false;
            return;
        }

        for( var i = 0 ; i < this.ps.wish_properties.wishList.length ; i ++ ){

            if( this.ps.wish_properties.selected.indexOf(this.ps.wish_properties.wishList[i]) > -1 ){

                continue // exist in selected_wishlist next .....

            }

            this.ps.wish_properties.selected.push( this.ps.wish_properties.wishList[i] ); // push in selected_wishlist
        }

        this.ps.wish_properties.selectedAll = true;

        this.check_button_deleteProducts_fromwishlist();

        return;

    }

    selecteAll_cartList(){

     }

     add_from_wish_to_cart( selected_wish ){

         this.ps.cart_properties.array_cartId = [];

         for( let i = 0 ; i  < selected_wish.length  ; i++  ){

             this.ps.cart_properties.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

             this.ps.cart_properties.cartList.unshift( selected_wish[i] ); // push wish product in wishList products

             this.ps.cart_properties.array_cartId.push( selected_wish[i].product_id );

         }

         this.ps.delete_from_wishList();

         this.ds.Http_Post( 'shopping/header/add_incartList', this.ps.cart_properties.array_cartId ) // make request ......

             .subscribe( //  take success

                 data => {

                     this.Response = data['data']
                 },
                 error => console.log( error['data'] ) // take error .....

             );

     }

    check_button_deleteProducts_fromwishlist(){

        if( this.ps.wish_properties.selected.length > 0 ){

            this.ps.wish_properties.button = false;

            return;
        }

        this.ps.wish_properties.button = true;

    }

    current_language(id_language){

        if( this.ds.language.id == id_language ){

            return true;
        }

        return false;
    }

    show_hide_search_in_wishlist(){

        return this.ps.wish_properties.icon_search = !this.ps.wish_properties.icon_search

    }

    check_show_hide_search_in_wishlist(){

        if( this.ps.wish_properties.icon_search == true ){

            return 'show_search_in_wishlist';
        }

        return '';
    }

 }
