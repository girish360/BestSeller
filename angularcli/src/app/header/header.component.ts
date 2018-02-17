
 import { Component, OnInit ,Input , Output , EventEmitter,DoCheck } from '@angular/core';

 import { Injectable } from '@angular/core';

 import { HttpService } from '../services/http.service';

 import 'rxjs/add/observable/bindCallback';

 import { DataService } from '../services/data.service';

 import { AuthService } from '../services/auth.service';

 import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

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

    public get_Language = {};

    public wishList_products = [];

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

    public array_data_insert ={'title':'klodia','description':'shitet','id_image':'1','id_category':'1','id_admin':'1','price':'800','quantity':'5','image':'klo.jpg'};

    constructor( private auth  : AuthService ,  private dataservices : DataService, private Httpservices : HttpService ) {

        this.wishList_products = this.dataservices.wishlist;

        this.get_Language = this.dataservices.language
    }

    ngDoCheck(){
        this.get_Language = this.dataservices.language;
    }



    public language_allow = [

        {name: 'English', id: "1" , image:'england.png'},
        {name: 'Albanian', id: "2", image:'albania.png'},
        {name: 'Italy', id: "3" ,image:'italy.png'}

    ];

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

            this.Array_wishID_delete_wishlist.push(this.selected_wishList[i].id);

            if( index  > -1 ){
                this.wishList_products.splice( index , 1 );
            }

        }

        for( var i = 0 ; i < this.selected_wishList.length ; i ++ ){

            this.selected_wishList.splice(this.selected_wishList[i] , this.selected_wishList.length);
        }

        this.dataservices.create_object_request('delete_itemFromCookie', this.Array_wishID_delete_wishlist);

        this.Httpservices.Http_Post(this.dataservices.object_request)

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

    insert(){

        this.dataservices.create_object_request('insert',this.array_data_insert);

        this.Httpservices.Http_Post(this.dataservices.object_request).subscribe( response => {

             if( response['status'] =='insert' ){

                 console.log(response['data']);
             }
         });

    }

     check_status_menu(){

        this.dataservices.status_menu = !this.dataservices.status_menu;

     }



    ngOnInit() {

        $(document).ready(function () {

            var pointer_name_header = 'language';

            var width = $(window).width();

            var actuallist = 0;

            var actualchat = 0;

            var more = 0;

            var card = 0;

            var favority = 0;

            var language = 0;

            var activclick = '';

            var numberpassicoractiv;

            var nrclicksearchresponse = 0;

            var static_click = '';

            var Server_path_http = 'http://localhost/bestseller/Server_PHP/Http_Request/Route_Http.php'; //  path where go requests .. ..

            var Data = ''; // data is to send data in server .........

            var Status = ''; // status is for identify  what kind of http is requests post or get

            var Response;  // response from server ....

            var show_dropdown_search = 0;

            var active_icon_header = 1;

            var value_search_header;



            $(window).bind("load", function () {

                if(width >700) {

                    setTimeout(function () {

                        var cookie_menu = 'cookie_menu';

                        Data = 'check_cookie_menu=' + cookie_menu;

                        Status = 'GET';

                        Send_Request_In_Server(Server_path_http, Data, Status); // call method that send http request to check cookie menu ................

                    }, 100);
                }
            });


            $('body').on('click', function (e) { // click in bady and close some div element................

                e.preventDefault();

                var width = $(window).width();

                if ($(e.target).closest('.notCloseDropdawnLanguage').length == 0) {

                    $('.dropworld').hide();

                    language = 0;
                }

                if ($(e.target).closest('.notCloseDropdawnFavorite').length == 0) {

                    $('.dropfavority').hide();

                    favority = 0;

                }
                if ($(e.target).closest('.notCloseDropdawnSearch').length == 0) {

                    $('.dropdown_search').hide();

                    show_dropdown_search = 0;

                }
                if ($(e.target).closest('.notCloseDropdawnCard').length == 0) {

                    $('.dropcard').hide();

                    card = 0;
                }

                if ($(e.target).closest('.notCloseDropdawnFavorite , .notClosepointerHeader').length == 0

                    || $(e.target).closest('.about_wish ,.hearts_div').length > 0 && favority == 0) {
                    $('.treguesi').css({display: 'none'});// disabled pointer header icon.....

                    give_bgcolor_icon_header('menu3', 'card', 1, 'write_icon_header');

                }

            });



            $('.radius_category').click(function () {

                var width = $(window).width();

                var name = $(this).attr('id');

                if (name == 'laptopscreen') {

                }

                else {

                    pointer_name_header = name;

                    findposition(name);

                }

                if (actuallist == 1) {

                    static_click = 'actuallist';

                    closecontainere(actuallist, static_click);

                    activclick = 'iconmenu';

                    numberpassicoractiv = 0;

                    zerovariablat(activclick, numberpassicoractiv);

                    $('.treguesi').hide();

                    hide_category_menu(width);

                }

                else {

                    static_click = 'actuallist';

                    closecontainere(actuallist, static_click);

                    activclick = 'iconmenu';

                    numberpassicoractiv = 1;

                    zerovariablat(activclick, numberpassicoractiv);

                    $('.treguesi').show();

                    if (actualchat == 1) {

                        var heig = $(window).height();

                        hide_chat_div(heig);//call function hide chat...................................

                        $('.pasiv_activ_bodychat').hide();

                    }

                    show_category_menu();// call function show category_menu.................................

                    $('.listcategory').each(function () {

                        $(this).hide();

                    });

                    $('.closelist').each(function () {

                        $(this).show();

                    });

                }

            });

            $('.openchat').click(function () {

                var width = $(window).width();

                if (actualchat == 0) {

                    static_click = 'openchat';

                    closecontainere(actualchat, static_click);

                    activclick = 'openchat';

                    numberpassicoractiv = 1;

                    zerovariablat(activclick, numberpassicoractiv);

                    if (actuallist == 1) {

                        hide_category_menu(width); // call function hide category menu ..........................

                    }

                    show_chat_div(width); //call function show chat...........................................

                }

                else {

                    static_click = 'openchat';

                    closecontainere(actualchat, static_click);

                    activclick = 'openchat';

                    numberpassicoractiv = 0;

                    zerovariablat(activclick, numberpassicoractiv);

                    var heig = $(window).height();

                    hide_chat_div(heig);

                    $('#showchat').show();

                }

            });




            $('.kerkim').keyup(function () {

                var new_value_search = $(this).val();

                value_search_header = new_value_search;

                setTimeout(function () {

                    if (value_search_header == new_value_search) {

                        check_value_search(value_search_header);
                    }

                }, 200);

            });

            $('.kerkim').on('click', function () {

                if (value_search_header.length > 0) {

                    check_value_search(value_search_header);

                }

            });

            function check_value_search(value_search_header) { // function to check value that user put to search.....

                if (active_icon_header == 1) {

                    if (value_search_header.length > 0) {

                        $('.imgsearch').hide();

                        $('.imgsearchexit').show();

                        if (show_dropdown_search != 1) {

                            show_dropdown_header('dropdown_search', 'body_search_header');

                            show_dropdown_search = 1;

                            return;

                        }

                        return;

                    }

                    $('.imgsearchexit').hide();

                    $('.imgsearch').show();

                    hide_dropdown_header('dropdown_search', 'body_search_header');

                    show_dropdown_search = 0;

                    return;

                }

            } // end function

            $('.imgsearchexit').click(function () {

                $('.kerkim').val("");

                $('.imgsearchexit').hide();

                $('.imgsearch').show();

                value_search_header = '';

                check_value_search(value_search_header);

            });

            $('.iconsearch').click(function () {

                $('.kerkim').focus();

            });

            $('.exitsearch1').click(function () {

                $('.searchinputresp').animate({

                    width: "2px"

                }, function () {

                    $('.kerkimresponse').css("display", "none");

                    $('.pcheader').show();

                });

            });

            $('.exit').click(function () {

                $('.searchinputresp').val("");

                $('.searchimg').show();

                $('.exit').hide();

            });


            $('.searchinputresp').keyup(function () {

                var value = $(this).val();

                if (value.length > 0) {

                    $('.searchimg').hide();

                    $('.exit').show();

                }

                else {

                    $('.searchimg').show();

                    $('.exit').hide();

                }

            });

            $('.searchimg').click(function () {

                $('.searchinputresp').focus();

            });

            $('.user-login').click(function () {

                give_bgcolor_icon_header('menu3', 'user-login', 0, $(this).find('.write_icon_header'));

            });



      $('.hide_menu').click(function(){

          var width_window = $(window).width();
          hide_category_menu(width_window);
      });

            $('.language').click(function () {

                if (active_icon_header == 1) {

                    var name = $(this).attr('id');

                    give_bgcolor_icon_header('menu3', 'language', language, $(this).find('.write_icon_header'));

                    pointer_name_header = name;

                    findposition(name);

                    if (language == 0) {

                        $('.opacity_dropdown').fadeIn();

                        static_click = 'language';

                        closecontainere(language , static_click);

                        activclick = 'language';

                        numberpassicoractiv = 1;

                        zerovariablat(activclick, numberpassicoractiv);

                        show_dropdown_header('dropworld', 'body_more');

                    }

                    else {

                        $('.opacity_dropdown').fadeOut();

                        static_click = 'language';

                        closecontainere(language, static_click);

                        activclick = 'language';

                        numberpassicoractiv = 0;

                        zerovariablat(activclick, numberpassicoractiv);

                        hide_dropdown_header('dropworld', 'body_more');

                    }

                }

            });

            $('.card').click(function () {

                if (active_icon_header == 1) {

                    var name = $(this).attr('id');

                    give_bgcolor_icon_header('menu3', 'card', card, $(this).find('.write_icon_header'));

                    pointer_name_header = name;

                    findposition(name);

                    if (card == 0) {

                        $('.opacity_dropdown').fadeIn();

                        static_click = 'card';

                        closecontainere(card, static_click);

                        activclick = 'card';

                        numberpassicoractiv = 1;

                        zerovariablat(activclick, numberpassicoractiv);

                        show_dropdown_header('dropcard', 'body_cart');

                    }

                    else {

                        closecontainere(card, static_click);

                        $('.opacity_dropdown').fadeOut();

                        activclick = 'card';

                        numberpassicoractiv = 0;

                        zerovariablat(activclick, numberpassicoractiv);

                        hide_dropdown_header('dropcard', 'body_cart');

                    }

                }

            });


            $('.favority').click(function (e) {

                if (active_icon_header == 1) {

                    var name = $(this).attr('id');

                    give_bgcolor_icon_header('menu3', 'favority', favority, $(this).find('.write_icon_header'));

                    pointer_name_header = name;

                    findposition(name);

                    if (favority == 0) {

                        $('.opacity_dropdown').fadeIn();

                        static_click = 'favorite';

                        closecontainere(favority, static_click);

                        activclick = 'favority';

                        numberpassicoractiv = 1;

                        zerovariablat(activclick, numberpassicoractiv);

                        show_dropdown_header('dropfavority', 'body_wish');

                    }

                    else {

                        closecontainere(favority, static_click);

                        $('.opacity_dropdown').fadeOut();

                        activclick = 'favority';

                        numberpassicoractiv = 0;

                        zerovariablat(activclick, numberpassicoractiv);

                        hide_dropdown_header('dropfavority', 'body_wish');

                    }

                }

            });

            function closecontainere( valu, static_div ) { // function close containere when users click dropdown menu card or chat or ect ... ..................................

                var width = $(window).width();

                if ( static_div == 'openchat' ) {

                    if (valu == 1) {

                        $('.containere').show();

                    }
                    else {

                        if (width <= 800) {

                            setTimeout(function () {

                                $('.containere').hide();

                            }, 500);

                        }
                        else {

                            $('.containere').show();

                        }

                    }

                } else {

                    if ( valu == 1 ) {

                        $('.containere').show();

                    }
                    else {

                        if (width <= 600) {

                            $('.containere').hide();

                        }
                        else {

                            $('.containere').show();

                        }

                    }

                }

            } // .................................................. end

            // ..............................................end

            // scroll top 20 show box-shodown

            function hide_details_product() {   // function to show detail product ..................................

                $('.details_products_container').animate({

                    width: '50px',

                    height: '50px',

                    borderRadius: '100px'

                }, function () {

                    $('.details_products_container').hide();

                    $('.opacity_detail_product,.details_products').fadeOut();

                });

            }


            function findposition( position ) { //  function findposition for pointer when user click a dropdown menu  the pointer find position and go there  ................................

                var left = $('.' + position).find('.glyphicon').offset();


                $('.treguesi').css({"margin-left": left.left + 11, "background-color": "white"});

            } // ............................................... end

            setInterval(function(){
                findposition( pointer_name_header );
            },50);


            function show_category_menu(){ //  function for show category menu and subsribe  when user click show menu call this function for show with animate ............................

                    actuallist = 1;

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

                    var cookie_menu = 'cookie_menu';

                    Data = 'cookie_menu_set=' + cookie_menu;

                    Status = 'GET';

                    Send_Request_In_Server(Server_path_http, Data, Status); // method to send data in server ......



            } // ............................................ end

            function hide_category_menu( width_function ){ // function for hide category menu when user click for close it  call this function with animate ...........................



                $('.menu_right_inside').show();

                $('.menu_left_inside').removeClass('hide_mini_category');

                $('.menu_left').removeClass('menu_left_open');

                actuallist = 0;

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

                    var cookie_menu = 'cookie_menu';

                    Data = 'cookie_menu_remove='+cookie_menu;

                    Status = 'GET';

                    Send_Request_In_Server( Server_path_http , Data , Status ); // method to send data in server ......



            } // ........................................................end

            function show_chat_div(width_function){ /// function show show element  for chat  when user click  on the chat call this function  and open div for chat with animate  ........................

                actualchat = 1;

                if(width_function<=800){

                    $('.bodychat').animate({

                        height:"93.8vh",

                        bottom:"0px",

                        width : '101%',

                        borderTopLeftRadius: "0px",

                        borderColor: '#d6d6c2',

                        borderWidth : '1px',

                    },300,function(){

                        $('.pointerchat').css("visibility","visible");

                        $('.pasiv_activ_bodychat').show();

                    });

                }

                else{

                    $('.bodychat').animate({

                        height:"86vh",

                        bottom:"0px",

                        width : '250px',

                        borderTopLeftRadius: "3px",

                        borderColor: '#d6d6c2',

                        borderWidth : '1px',

                    },300,function(){

                        $('.pointerchat').css("visibility","visible");

                        $('.pasiv_activ_bodychat').show();

                    });

                    $('.response_outer').removeClass('exit_menu');

                    $('.response_outer').addClass('active_chat  ');

                }

            } //..................................................end

            function hide_chat_div(heig){ // function for hide chat when user click close chat   , then call this for close ...............................

                actualchat = 0;

                $('.bodychat').animate({

                    height:"60px",

                    position:'fixed',

                    width : '60px',

                    borderTopLeftRadius: "100px",

                    right:'-1px',

                    display:'inline-block',

                    borderColor: 'darkolivegreen',

                    borderWidth : '1px',

                },300,function(){

                    $('.pasiv_activ_bodychat').hide();

                });

                $('.pointerchat').css("visibility","hidden");

                $('.response_outer').removeClass(' exit_menu , active_chat  ');

                $('.response_outer').addClass(' exit_chat ');

            } //.....................................end

            function show_dropdown_header(dropdown_class, body_inside) {  // function to make show dropdwon that are in header ....

                if (active_icon_header == 1) { // check if  header button is active to click.......

                    active_icon_header = 0; // disabled header button............

                    $('.treguesi').css({display: 'none'}); // disabled pointer header icon.....

                    $('.' + body_inside).css({top: '15px'});

                    $('.' + dropdown_class).css({top: '30px', opacity: '0.1'}); //  css style...

                    $('.' + dropdown_class).show().animate({ // animation effect show dropdown header......

                        top: '2',

                        opacity: 1

                    }, 300, function () { //  function after effect ............

                        if (card != 0 || language != 0 || favority != 0) {

                            $('.treguesi').css({display: 'block'}); // show pionter......

                        } else {

                            give_bgcolor_icon_header('menu3', 'card', 1, 'write_icon_header');

                        }

                        active_icon_header = 1;

                    });

                    $('.' + body_inside).animate({

                        top: '0'

                    }, 400);

                }

            } // end function....

            function hide_dropdown_header(dropdown_class, body_inside) { // function to make hide dropdwon that are in header ....

                if (active_icon_header == 1) { // ccheck if  header button is active to click.......

                    active_icon_header = 0; //disabled header button............

                    $('.treguesi').css({display: 'none'});// disabled pointer header icon.....

                    $('.' + body_inside).css({top: '0px'});

                    $('.' + dropdown_class).css({top: '30px', opacity: '1'}); // css style...

                    $('.' + dropdown_class).animate({ // animation effect hide dropdown header......

                        top: '30',

                        opacity: '0.1',

                    }, 300, function () { //  function after effect ............

                        $('.' + dropdown_class).hide();

                        active_icon_header = 1;

                    });

                    $('.' + body_inside).animate({

                        top: '15'

                    }, 400);

                }

            } // end function .......

            function zerovariablat(name, nr) { //  ky function therrite sa here useri clikon mbi nje dropdown menu  , edhe mbane activ vete ate dropdown menu te tjerat behen 0 ..............

                var width = $(window).width();

                if (name == 'more' && nr == '1') {

                    more = 1;

                } else {

                    more = 0;

                }

                if (name == 'language' && nr == '1') {

                    language = 1;

                } else {

                    language = 0;

                }

                if (name == 'card' && nr == '1') {

                    card = 1;

                } else {

                    card = 0;

                }

                if (name == 'favority' && nr == '1') {

                    favority = 1;

                } else {

                    favority = 0;

                }

            }// ..................................................................end

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

            function Send_Request_In_Server(Server_path_http, Data, Status) { // function for send http request POST and GET in SERVER .......

                if (Status == 'GET') { // check if request is with  GET .....

                    $.ajax({ // declare ajax syntax ..........

                        type: Status, // put Status is GET ...........

                        url: Server_path_http, // Path where is going the request .........

                        data: Data, // data that are going in server ..........

                        dataType: 'json',// type of response   json  .............

                        xhrFields: {

                            withCredentials: true // credencials in header to set cookie in browser ..............

                        },

                        crossDomain: true, // cross true .......

                        success: function (data) { // success function  get  response ................

                            Response = data;



                            success_response(); // call function success

                        }, error: function (e) { // error response from server ...........



                        }, beforeSend: function () {  // before send request in server ..........

                        }

                    });

                }

                else if (Status == 'POST') { // check if request is POST

                }

                else {

                    Response = 'Nothing';

                }

            }

            function success_response() {

                if (Response['status'] == 'cookie_menu') {

                    if (Response['data'] == 'true') {

                        show_category_menu();
                    }
                }
            }
        });
    }

 }
