
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

 import { FormControl } from '@angular/forms';



 import { } from 'googlemaps';

 import { MapsAPILoader } from '@agm/core';

 import { AuthService } from '../../services/auth.service';

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
        ]),

         trigger('filter_options', [

             state('closed', style({display:'none',position:'relative'})),

             state('open', style({position:'relative'})),

             transition('open => closed', [

                 style({ opacity: '1',position:'absolute',margin: 'auto',top:0,left:'5px',right:0,bottom:0 }),

                 animate(".40s ease", style({  opacity: '0.3', top:'40px' })),

             ]),

             transition('closed => open', [

                 style({ opacity: '1' ,position:'absolute',margin: 'auto' ,top:'-40px',left:'5px',right:0,bottom:0}),


                 animate(".40s ease", style({  opacity: '0.3', top:0  })),

             ])
         ]),
     ]


 })

 export class HeaderComponent implements OnInit   {

     @HostListener("mouseup") public enable_button(){

         this.mousedown = false;
     }

     public latitude: number;
     public longitude: number;
     public searchControl: FormControl;
     public zoom: number;

     @ViewChild("searchInput") searchEl: ElementRef;

     @ViewChild("search") public searchElementRef: ElementRef;

     @ViewChild("movescroll") public movescroll: ElementRef;

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

         { id:1 , name:'sign' ,mat_tooltip:'User Panel',
             icon :'glyphicon-user gh-productsService' , dropdown_class:'dropclient' , dropdown_body:'.bodydropclient' ,
             hide_notification:true ,different_class :'notCloseDropdawnClient notClosepointerHeader'
         },
         { id:2 , name:'wish' , mat_tooltip:'WishList',  different_class:' notCloseDropdawnFavorite notClosepointerHeader',
             icon :'glyphicon-heart' , dropdown_class:'dropfavorites' ,dropdown_body:'.dropfavorites  .wishlist_component  .body_div',
             hide_notification:false
         },
         { id:3 , name:'card' ,mat_tooltip:'Your Cart',  different_class:'notClosepointerHeader notCloseDropdawnCard',
             icon :'glyphicon-shopping-cart gh-productsService' , dropdown_class:'dropcard' ,dropdown_body:'.body_cart',
             hide_notification:false
         },
         { id:4 , name:'more' ,mat_tooltip:'More Options',  different_class:'notClosepointerHeader notCloseDropdawnLanguage',
             icon :'glyphicon-option-vertical', dropdown_class:'dropmore' ,dropdown_body:'.dropdown_more .mat-tab-body-wrapper',
             hide_notification:true
         },

     ];

     constructor(
         private renderer : Renderer ,
         private el : ElementRef,
         private productsService : ProductService,
         private deviceService: DeviceDetectorService,
         private dataservices : DataService ,
         private menuservice :MenuService,
         private searchService:SearchService,
         private route : ActivatedRoute ,
         private setRouter :SetRouterService,
         private cd: ChangeDetectorRef,
         private scroll :ScrollbarService,
         private mapsAPILoader: MapsAPILoader,
         private ngZone: NgZone,
         private auth:AuthService


    ) {
         this.dataservices.Http_Get('shopping/header', false )

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

                            this.productsService.wish_properties.wishList = wishlist ;
                        }

                        if( cartlist  ){

                            this.productsService.set_quantity_in_cartList( quantity_items_incart , cartlist );

                            this.productsService.total_items_and_price();
                        }


                        this.dataservices.language = language;

                        this.cd.markForCheck();
                    }

                }
            );


         this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

             let screen = this.scroll.screen_size();

             let scroll = this.scroll.window_scroll();

             if( this.productsService.top_nav_data.last_scroll >  scroll.top ){

                 this.top_nav_mobile_style = { top:0 };

                 if( screen.x > 750 ){

                     if( scroll.top > 60 ){

                         this.productsService.mobile_sticky_style = {position:'sticky', top:'50px' };

                     }else{

                         this.productsService.mobile_sticky_style = { position:'relative', top:0, transition:'none' };

                     }

                 }else{

                     if( scroll.top > 60 ){

                         this.productsService.mobile_sticky_style ={ position:'sticky' ,top:'40px' };

                     }else{

                         this.productsService.mobile_sticky_style ={ position:'relative', top:0 ,transition:'none' };
                     }
                 }

             }else{

                 if( screen.x > 750 ){

                     if( scroll.top > 60 ){

                         this.top_nav_mobile_style = {top: '-40px'};

                         this.productsService.mobile_sticky_style = { position:'sticky', top:'-50px' };

                     }else{

                         this.productsService.mobile_sticky_style = { position:'relative',  top:0 };

                     }

                 }else{

                     if( scroll.top > 60 ){

                         this.top_nav_mobile_style = { top: '-40px'};

                         this.productsService.mobile_sticky_style = { position:'sticky', top:0 };

                     }else{

                         this.productsService.mobile_sticky_style = {position:'relative', top:0 };
                     }
                 }
             }

             this.productsService.top_nav_data.last_scroll = scroll.top;

             this.dataservices.update_products(true);

             this.cd.markForCheck();

         });

    }



     ngOnInit() {
         //set google maps defaults
         this.zoom = 4;
         this.latitude = 39.8282;
         this.longitude = -98.5795;

         //create search FormControl
         this.searchControl = new FormControl();

         //set current position
         this.setCurrentPosition();

         //load Places Autocomplete
         this.mapsAPILoader.load().then(() => {
             let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                 types: ["address"]
             });
             autocomplete.addListener("place_changed", () => {
                 this.ngZone.run(() => {
                     //get the place result
                     let place: google.maps.places.PlaceResult = autocomplete.getPlace();



                     //verify result
                     if (place.geometry === undefined || place.geometry === null) {
                         return;
                     }

                     //set latitude, longitude and zoom
                     this.latitude = place.geometry.location.lat();
                     this.longitude = place.geometry.location.lng();
                     this.zoom = 12;
                 });
             });
         });
     }

     private setCurrentPosition() {
         if ("geolocation" in navigator) {
             navigator.geolocation.getCurrentPosition((position) => {
                 this.latitude = position.coords.latitude;
                 this.longitude = position.coords.longitude;
                 this.zoom = 12;
             });
         }
     }

     public pagex:number;

     public mousedown:boolean = false;

     public kot :number = 2;

     public walk_scroll:number;

     public block:boolean = false;

     public down(event){

         this.mousedown = true;

         this.block = false;

         this.pagex = event.clientX;

     }

     public up(event){

         this.mousedown = false;

         setTimeout(()=>{

             this.block = false;

         },100);
     }

     public move(event ,el){

         if( this.mousedown ){

             this.block = true;

             this.walk_scroll = event.clientX - this.pagex;

             this.pagex += this.walk_scroll;

             this.movescroll.nativeElement.scrollLeft -= this.walk_scroll;
         }
     }

     public route_on_search( result ){

         if( this.searchService.search_data.searchFor =='products' ){

             this.set_router( { path:'shopping/product_details/show' , data:{ keyparams:'id' , params:result.id} , relative:false });

         }else if( this.searchService.search_data.searchFor == 'company'){

             let company_path = 'shopping/company/'+result.name+'@'+result.id;

             this.set_router( { path:company_path, data: false  , relative:false } );

         }
    }

     check_body(boolean){ // change width inner body

         this.dataservices.change_inner = boolean;
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

                if ( button.id == 1) {

                    if( this.auth.token ){

                        this.productsService.button_properties.pointer = button.id;

                        this.find_position( this.productsService.button_properties.pointer ,button.dropdown_class );

                        this.productsService.show_dropdown_button(button.dropdown_class, button.dropdown_body , button.id);

                    }else{
                        this.set_router( { path:'login_register' , data:false , relative:true } );
                    }



                } else {


                    this.productsService.button_properties.pointer = button.id;

                    this.find_position( this.productsService.button_properties.pointer ,button.dropdown_class );

                    this.productsService.show_dropdown_button(button.dropdown_class, button.dropdown_body , button.id);
                }

            } else {


                $('.write_icon_header').css('color', 'slategrey');

                this.productsService.hide_dropdown_button( button.dropdown_class, button.dropdown_body  );

                this.productsService.button_properties.active = 0;

                this.productsService.button_properties.selectedIndex = 'empty';
            }
        }

    }

     public  set_router( data ){

         this.setRouter.set_router( data , this.route ); // set router .....

    }

    client_profile(){

        this.set_router( { path:'shopping/client/'+this.auth.client.first_name , data:false , relative:false} );
    }

    button_search(el){

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

             var left =  $('.button'+id).offset();

             if( id == 2 ){

                 $( '.'+dropdown_Class ).css({ left:  left.left - 430  });

                 $('.treguesi').css({"margin-left": left.left + 27, "background-color": "white"});

             }
             else if( id ==3 ){
                 $( '.'+dropdown_Class ).css({ left:  left.left - 430  });

                 $('.treguesi').css({"margin-left": left.left + 27, "background-color": "white"});
             }
             else if ( id == 4 ){

                 $( '.'+dropdown_Class ).css({ left:  left.left - 430  });

                 $('.treguesi').css({"margin-left": left.left +27, "background-color": "white"});
             }else{

                 $( '.'+dropdown_Class ).css({ left:  left.left - 180  });

                 $('.treguesi').css({"margin-left": left.left +27, "background-color": "white"});
             }
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

         if( this.menuservice.menu.getValue() == false ){

             this.menuservice.menu.next(true);

             return;
         }

         this.menuservice.menu.next(false);

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


        this.dataservices.Http_Get( 'shopping/header/change_language', { 'language':language }  ) // make request ......

            .subscribe( //  take success

                data => {

                    this.dataservices.language = data;

                    this.dataservices.update_app(true);

                },
                error => console.log( error ) // take error .....

            );

    }

    update_language( new_language ){ // change language to services file that  make share language to all components  .....

        this.dataservices.update_language( new_language );

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

         this.productsService.delete_from_wishList();

         this.dataservices.Http_Post( 'shopping/header/add_incartList', this.productsService.cart_properties.array_cartId ) // make request ......

             .subscribe( //  take success

                 data => {

                     this.Response = data['data']
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
