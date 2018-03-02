
 import { Component, OnInit ,Input , Output , EventEmitter,DoCheck } from '@angular/core';

 import { Injectable } from '@angular/core';

 import 'rxjs/add/observable/bindCallback';

 import { DataService } from '../services/data.service';

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

 export class HeaderComponent implements OnInit ,DoCheck  {

    public get_Language:any = {};

    public wishList_products:any = [];

    public cart = [];

    private card_products = [];

    private Response;

    public selected_wishList=[];

    public active = 'active';

    public toggle_checked_wishList=false;

    public button_delete=true;

    public  selectedAll_value_wishlist = false;

    public Array_wishID_delete_wishlist = [];

    private show_hide_search_in_wishList = false;

    public  filter_wish='';

     public property_button:any = { active:0 , disabled:false ,pointer:1 };

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

     constructor( private dataservices : DataService , private route : ActivatedRoute , private setRouter :SetRouterService ) {

        this.wishList_products = this.dataservices.wishlist;

        this.get_Language = this.dataservices.language;

        Observable.interval(5 * 2).subscribe( x => {

            this.find_position(this.property_button.pointer);

        });

        let wishlist = this.dataservices.Make_Request_InServer( 'get_wishList', 'wish' );

        wishlist.then(response =>{

            this.wishList_products=response;

        });
    }

    ngDoCheck(){

        this.get_Language = this.dataservices.language;
    }

     public check_button( button ){

        if( this.property_button.disabled == false ) {

            this.property_button.disabled = true;

            setTimeout(()=>{    //<<<---    using ()=> syntax

                this.property_button.disabled = false;

            },300);

            if (this.property_button.active != button.id) {

                this.property_button.active = button.id;

                if (button.id == 1) {

                   this.set_router( { path:'login' , data:false , relative:true } );

                } else {

                    this.show_dropdown_button( button.dropdown_class, button.dropdown_body, button.id);

                    this.property_button.pointer = button.id;
                }

            } else {

                this.hide_dropdown_button(button.dropdown_class, button.dropdown_body);

                this.property_button.active = 0;
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

        }, 300, function () { //  function after effect ............

            $('.treguesi').css({display: 'block'}); // show pionter......

            $('.write_icon_header').css('visibility', 'visible');

            $('.write_icon_header'+id).css('visibility', 'hidden'); // remove write below icon in header

            $('.treguesi').css({display: 'block'});

        });

        $('.' + body_inside).animate({

            top: '0'

        }, 400);

    }

    public hide_dropdown_button( dropdown_class, body_inside){

        $('.treguesi').css({display: 'none'});

        $('.write_icon_header').css('visibility', 'visible');

        $('.' + body_inside).css({top: '0px'});

        $('.' + dropdown_class).css({top: '30px', opacity: '1'}); // css style...

        $('.' + dropdown_class).animate({ // animation effect hide dropdown header......

            top: '30',

            opacity: '0.1',

        }, 300, function () { //  function after effect ............

            $('.' + dropdown_class).hide();

        });

        $('.' + body_inside).animate({

            top: '15'

        }, 400);

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

    delete_from_wishList( All_wishList ){

        this.filter_wish='';

        for( var i = 0 ; i < this.selected_wishList.length ; i++ ) { // remove from wish list products that are in selected

            var index = this.wishList_products.indexOf( this.selected_wishList[i] );

            this.Array_wishID_delete_wishlist.push( this.selected_wishList[i].id );

            if( index  > -1 ){

                this.wishList_products.splice( index , 1 );
            }

        }

        for( var i = 0 ; i < this.selected_wishList.length ; i ++ ){

            this.selected_wishList.splice( this.selected_wishList[i] , this.selected_wishList.length );
        }


        this.Response = this.dataservices.Make_Request_InServer('delete_itemFromCookie', this.Array_wishID_delete_wishlist);

        this.Response.then( response =>{

            this.Response = response;

        });

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

    current_language(id_language){

        if( this.get_Language.id == id_language ){

            return true;
        }

        return false;
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

        $(document).ready(function () {

            $('body').on('click', function (e) { // click in bady and close some div element................

                e.preventDefault();

                var width = $(window).width();

                if ($(e.target).closest('.notCloseDropdawnLanguage').length == 0) {

                    $('.dropmore').hide();

                }

                if ($(e.target).closest('.notCloseDropdawnFavorite').length == 0) {

                    $('.dropfavority').hide();


                }
                if ($(e.target).closest('.notCloseDropdawnSearch').length == 0) {

                    $('.dropdown_search').hide();
                }
                if ($(e.target).closest('.notCloseDropdawnCard').length == 0) {

                    $('.dropcard').hide();

                }

                if ($(e.target).closest('.notCloseDropdawnFavorite , .notClosepointerHeader ,.notCloseDropdawnCard').length == 0) {
                    $('.treguesi').css({display: 'none'});

                    give_bgcolor_icon_header('menu3', 'card', 1, 'write_icon_header');

                }

            });



            function give_bgcolor_icon_header(all, single, status, removewrite) {  // effect when click icon header ........

                $('.' + all).css({backgroundColor: '', borderTop: ''});

                $('.write_icon_header').css('visibility', 'visible');

                if (status == 0) {

                    $('.' + single).find('.glyphicon').css({

                        marginTop: '40px',

                        borderRadius: '100px'

                    }).animate({backgroundColor: "green"}, 50, function () {

                        $('.' + single).find('.glyphicon').animate({backgroundColor: "#E6E6FA", marginTop: '0px'}, 200);

                    }); // change bg color when click on icon in header

                    $(removewrite).css('visibility', 'hidden'); // remove write below icon in header

                }

            } // end

        });
    }

 }
