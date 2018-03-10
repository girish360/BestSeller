
 import { Component, OnInit ,Input , Output , EventEmitter,DoCheck ,AfterViewInit   } from '@angular/core';

 import { Injectable } from '@angular/core';

 import 'rxjs/add/observable/bindCallback';

 import { DataService } from '../services/data.service';

 import { DeviceDetectorService } from 'ngx-device-detector';

 import { HttpService } from '../services/http.service';

 import { HeaderService } from './header.service';

 import { RouterStateSnapshot,ActivatedRouteSnapshot, ActivatedRoute  ,Params , Data , Router} from '@angular/router';

 import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

 import { SetRouterService } from '../services/set-router.service';

 import {Observable} from 'rxjs/Rx';

 declare var $:any;

 @Injectable()

 @Component({

    selector: 'app-header',

    templateUrl: './header.component.html' ,

    styleUrls: ['./header.component.css'],

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

 export class HeaderComponent implements OnInit ,DoCheck ,AfterViewInit  {

     private Response;

     public active = 'active';

     deviceInfo = null;


     public button_properties:any = { active:0 , disabled:false , pointer:1 };


     public language_allow = [

         {name: 'English', id: "1" , image:'england.png'},
         {name: 'Albanian', id: "2", image:'albania.png'},
         {name: 'Italy', id: "3" ,image:'italy.png'}

     ];


    public button_right = [

         { id:1 , name:'sing' ,mat_tooltip:'User Panel', different_class:'',
             icon :'glyphicon-user gh-header'
         },
         { id:2 , name:'wish' , mat_tooltip:'WishList',  different_class:' notCloseDropdawnFavorite notClosepointerHeader',
             icon :'glyphicon-heart' , dropdown_class:'dropfavority' ,dropdown_body:'body_wish'
         },
         { id:3 , name:'card' ,mat_tooltip:'Your Cart',  different_class:'notClosepointerHeader notCloseDropdawnCard',
             icon :'glyphicon-shopping-cart gh-header' , dropdown_class:'dropcard' ,dropdown_body:'body_cart'
         },
         { id:4 , name:'more' ,mat_tooltip:'More Options',  different_class:'notClosepointerHeader notCloseDropdawnLanguage',
             icon :'glyphicon-option-vertical', dropdown_class:'dropmore' ,dropdown_body:'body_more'
         }

    ];


    constructor( private header : HeaderService, private HttpService :HttpService , private deviceService: DeviceDetectorService, private dataservices : DataService , private route : ActivatedRoute , private setRouter :SetRouterService ) {

         Observable.interval(5 * 2).subscribe( x => {

            this.find_position(this.button_properties.pointer);

         });


         this.get_device_info();


    }


    ngDoCheck(){


    }

    ngAfterViewInit() {

    }

    public get_device_info() {

        this.deviceInfo = this.deviceService.getDeviceInfo();

    }


    public check_button( button , i ){

        this.dataservices.Header_property.selectedIndex = i;

        if( this.button_properties.disabled == false ) {

            this.button_properties.disabled = true;

            setTimeout(()=>{    //<<<---    using ()=> syntax

                this.button_properties.disabled = false;

            },300);

            if (this.button_properties.active != button.id) {

                this.button_properties.active = button.id;

                if (button.id == 1) {

                   this.set_router( { path:'login' , data:false , relative:true } );

                } else {

                    this.show_dropdown_button( button.dropdown_class, button.dropdown_body, button.id);

                    this.button_properties.pointer = button.id;
                }

            } else {

                this.hide_dropdown_button(button.dropdown_class, button.dropdown_body);

                this.button_properties.active = 0;

                this.dataservices.Header_property.selectedIndex = 'empty';
            }
        }

    }



    public  set_router( data ){

        this.setRouter.set_router( data , this.route ); // set router .....

    }

    public find_position(id){

         $(function(){

             var left=  $('.button'+id).find('.glyphicon').offset();

             if(id == 2){

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

    public show_dropdown_button( dropdown_class, body_inside , id ){

        $('.treguesi').css({display: 'none'});

        $('.'+body_inside).css({top: '15px'});

        $('.' + dropdown_class).css({top: '30px', opacity: '0.1'}); //  css style...

        $('.' + dropdown_class).show().animate({ // animation effect show dropdown header......

            top: '2',

            opacity: 1

        }, 200, function () { //  function after effect ............

            $('.treguesi').css({display: 'block'}); // show pionter......

            $('.write_icon_header').css('visibility', 'visible');

            $('.write_icon_header'+id).css('visibility', 'hidden'); // remove write below icon in header

            $('.treguesi').css({display: 'block'});

        });

        $('.' + body_inside).animate({

            top: '0'

        }, 300);

    }

    public hide_dropdown_button( dropdown_class, body_inside){

        $('.treguesi').css({display: 'none'});

        $('.write_icon_header').css('visibility', 'visible');

        $('.' + body_inside).css({top: '0px'});

        $('.' + dropdown_class).css({top: '30px', opacity: '1'}); // css style...

        $('.' + dropdown_class).animate({ // animation effect hide dropdown header......

            top: '30',

            opacity: '0.1',

        }, 200, function () { //  function after effect ............

            $('.' + dropdown_class).hide();

        });

        $('.' + body_inside).animate({

            top: '15'

        }, 300);

    }




    public  show_menu(){ //  function for show category menu and subsribe  when user click show menu call this function for show with animate ............................

         $('.response_outer').removeClass(' exit_chat ');

         $('.menu_right_inside').hide();

         $('.menu_left_inside').addClass('hide_mini_category');

         $('.menu_left').addClass('menu_left_open');

         $('.containerright').addClass('containerright_new_openmenu');

         $('.containerleft').addClass('containerleft_new_openmenu');

         $('.response_outer').addClass(' active_menu ');

         $('.listcategory').hide();

         $('.closelist').show();

         $('.menu_left , .under_menu_left').animate({

             left: "0px",

             width: '250px'

         }, 50);

         $('.radius_category').animate({

             left: "200px",

             borderTopRightRadius: "0px",

             borderBottomRightRadius: "0px",

         }, 200, function () {

             $('.all_show_multiple_open').show();

         });

         $('.width_menu_left').css({top: '25px', opacity: '0.1'});

         $('.width_menu_left').animate({

             top: '0',

             opacity: 1

         }, 500);

         $('.all_show_multiple').hide();


    } // ............................................ end

     public  hide_menu( ){ // function for hide category menu when user click for close it  call this function with animate ...........................

         $('.menu_right_inside').show();

         $('.menu_left_inside').removeClass('hide_mini_category');

         $('.menu_left').removeClass('menu_left_open');

         $('.listcategory').css("display","block");

         $('.closelist').css("display","none");

         $('.menu_left , .under_menu_left ,.searchsubscribe ,.loadersubscribe').animate({

             left:"-250px",

             width:'300px'

         },50);

         $('.radius_category').animate({

             left:"0px",

             borderTopRightRadius:"100px",

             borderBottomRightRadius:"100px",

             borderTopLeftRadius:"0px",

             borderBottomLeftRadius:"0px"

         },200,function(){

             $('.all_show_multiple').show();


         });

         $('.all_show_multiple_open').hide();


         $('.response_outer').addClass('exit_menu');

         $('.response_outer').removeClass(' active_menu  ');

         setTimeout(function(){

             $('.containerright').removeClass('containerright_new_openmenu');

             $('.containerleft').removeClass('containerleft_new_openmenu');

             $('.response_inner').removeClass(' response_inner_new ');

         },200);

         $('.width_menu_left').css({top:'25px' ,opacity:'0.1'});

         $('.width_menu_left').animate({

             top:'0',

             opacity:1

         },500,function(){

         });

     } // ........................................................end

     show_chat(){ /// function show show element  for chat  when user click  on the chat call this function  and open div for chat with animate  ........................

         $('.bodychat').animate({

             height:"86vh",

             bottom:"0px",

             width : '250px',

             borderTopLeftRadius: "3px",

             borderColor: '#d6d6c2',

             borderWidth : '1px',

         },200,function(){

             $('.pointerchat').css("visibility","visible");

             $('.pasiv_activ_bodychat').show();

         });

         $('.response_outer').removeClass('exit_menu');

         $('.response_outer').addClass('active_chat  ');

     } //..................................................end

     hide_chat(){ // function for hide chat when user click close chat   , then call this for close ...............................

         $('.bodychat').animate({

         height:"60px",

         position:'fixed',

         width : '60px',

         borderTopLeftRadius: "100px",

         right:'-1px',

         display:'inline-block',

         borderColor: 'darkolivegreen',

         borderWidth : '1px',

         },200,function(){

             $('.pasiv_activ_bodychat').hide();

         });

         $('.pointerchat').css("visibility","hidden");

         $('.response_outer').removeClass(' exit_menu , active_chat  ');

         $('.response_outer').addClass(' exit_chat ');

     } //.....................................end

     check_menu(){

         if( this.dataservices.status_menu == true ){

             this.hide_menu();

             this.dataservices.status_menu = !this.dataservices.status_menu;

             return;

         }

         if(this.dataservices.status_chat == true ){

             this.hide_chat();

             this.dataservices.status_chat = !this.dataservices.status_chat;
         }
         this.show_menu();

         this.dataservices.status_menu = !this.dataservices.status_menu;

         return;

     }

     check_chat(){

         if( this.dataservices.status_chat== true ){

             this.hide_chat();

             this.dataservices.status_chat = !this.dataservices.status_chat;

             return;

         }

         if( this.dataservices.status_menu == true ){

             this.hide_menu();

             this.dataservices.status_menu = !this.dataservices.status_menu;
         }

         this.show_chat();

         this.dataservices.status_chat = !this.dataservices.status_chat;

         return;
     }

    choose_language( language ){  //  function for update language ..........

      this.dataservices.Make_Request_InServer( 'changeLanguage', language );

    }

    update_language( new_language ){ // change language to services file that  make share language to all components  .....

        this.dataservices.update_language( new_language );

    }

    delete_from_wishList(  ){

        this.header.wish_properties.filter_wish='';

        for( var i = 0 ; i < this.header.wish_properties.selected.length ; i++ ) { // remove from wish list products that are in selected

            var index = this.header.wish_properties.wishList.indexOf( this.header.wish_properties.selected[i] );

            this.header.wish_properties.array_wishId.push( this.header.wish_properties.selected[i].product_id );

            if( index  > -1 ){

                this.header.wish_properties.wishList.splice( index , 1 );
            }

        }

        for( var i = 0 ; i < this.header.wish_properties.selected.length ; i ++ ){

            this.header.wish_properties.selected.splice( this.header.wish_properties.selected[i] , this.header.wish_properties.selected.length );
        }


        this.Response = this.dataservices.Make_Request_InServer('delete_itemFromCookie', this.header.wish_properties.array_wishId);

        this.Response.then( response =>{

            this.Response = response;

        });

        this.check_button_deleteProducts_fromwishlist();



        this.header.wish_properties.array_wishId = []; // empty ....
    }


    toggle_select_wish( item_wish ){

        var index = this.header.wish_properties.selected.indexOf( item_wish );

        if( index > -1 ){

            this.header.wish_properties.selected.splice(index,1);

        }else{

            this.header.wish_properties.selected.push(item_wish);
        }

        this.check_button_deleteProducts_fromwishlist();



    }

    check_selected_wish( item_wish ){

        if( this.header.wish_properties.selected.indexOf( item_wish ) > -1 ) {

            return true;

        }else{

            return false;
        }
    }

    getStyle_wish( item_wish ){

        if( this.header.wish_properties.selected.indexOf( item_wish ) > -1 ) {

            return 'selected_wish';

        }else{

            return '';
        }

    }

    selecteAll_wishList( ){

        if( this.header.wish_properties.selectedAll == true ){ // check if  are all wish list  selected  .........

            for( var i = 0 ; i < this.header.wish_properties.selected.length ; i ++ ){

                this.header.wish_properties.selected.splice(this.header.wish_properties.selected[i] , this.header.wish_properties.selected.length);
            }

            this.header.wish_properties.selectedAll = false;
            return;
        }

        for( var i = 0 ; i < this.header.wish_properties.wishList.length ; i ++ ){

            if( this.header.wish_properties.selected.indexOf(this.header.wish_properties.wishList[i]) > -1 ){

                continue // exist in selected_wishlist next .....

            }

            this.header.wish_properties.selected.push( this.header.wish_properties.wishList[i] ); // push in selected_wishlist
        }

        this.header.wish_properties.selectedAll = true;

        this.check_button_deleteProducts_fromwishlist();

        return;

    }

     selecteAll_cartList(){

     }

     add_from_wish_to_cart( selected_wish ){

         this.header.cart_properties.array_cartId = [];

         for( let i = 0 ; i  < selected_wish.length  ; i++  ){

             this.header.cart_properties.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

             this.header.cart_properties.cartList.unshift( selected_wish[i] ); // push wish product in wishList products

             this.header.cart_properties.array_cartId.push( selected_wish[i].product_id );

         }

         this.delete_from_wishList();

         this.dataservices.update_cartList(   this.header.cart_properties.cartList ); // change wish list in services   that get this  when change component with router outlet

         this.dataservices.create_object_request( 'add_cartProducts', this.header.cart_properties.array_cartId  );

         this.HttpService.Http_Post( this.dataservices.object_request) // make request ......

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

        if( this.header.wish_properties.selected.length > 0 ){

            this.header.wish_properties.button = false;

            return;
        }

        this.header.wish_properties.button = true;

    }



    current_language(id_language){

        if( this.dataservices.language.id == id_language ){

            return true;
        }

        return false;
    }

    show_hide_search_in_wishlist(){

        return this.header.wish_properties.icon_search = !this.header.wish_properties.icon_search

    }


    check_show_hide_search_in_wishlist(){

        if( this.header.wish_properties.icon_search == true ){

            return 'show_search_in_wishlist';
        }

        return '';
    }




     ngOnInit() {


     }

 }
