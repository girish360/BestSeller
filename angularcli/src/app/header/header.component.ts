import { Component, OnInit ,Input , Output , EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HtppServicesComponent } from '../htpp-services/htpp-services.component';
import 'rxjs/add/observable/bindCallback';
import { DataServiceService } from '../htpp-services/data-service.service';
import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

declare var $:any;

@Injectable()

@Component({

  selector: 'app-header',
  templateUrl: './header.component.html' ,
  styleUrls: ['./header.component.css'],
  providers:[HtppServicesComponent ],
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
  ],

})
export class HeaderComponent implements OnInit {

  @Input() get_Language = {'id':'1'};

  public wishList_products = [];

  private card_products = [];

   private Response;

   public selected_wishList=[];

   public active = 'active';

   public toggle_checked_wishList=false;

   public button_delete=true;

   public  selectedAll_value_wishlist = false;

   public Array_wishID_delete_wishlist = [];

  constructor( private dataservices : DataServiceService, private Httpservices : HtppServicesComponent ) {

    this.dataservices.wishList_products.subscribe( ( wishList:any ) => { this.wishList_products = wishList } );

  }

  public language_allow = [
    {name: 'English', id: "1" , image:'england.png'},
    {name: 'Albanian', id: "2", image:'albania.png'},
    {name: 'Italy', id: "3" ,image:'italy.png'}

  ];

  choose_language( language ){  //  function for update language ..........

    this.Httpservices.create_obj( 'changeLanguage', language );

    this.Httpservices.Http_Post()
        .subscribe(language =>{ this.get_Language = language , this.update_language( language) }

            ,error=>(console.log( error +'gabim' ))

        );

  }

  update_language(new_language){ // change language to services file that  make share language to all components  .....

    this.dataservices.Language.emit(new_language);

  }

  delete_from_wishList( All_wishList ){

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

  selectedAll_wishList(){

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

  ngOnInit() {

    $(document).ready(function(){
      var nameposition='language';
      focus();
      var width=$(window).width();
      var actuallist=0;
      var actualchat=0;
      var more =0;
      var card=0;
      var favority=0;
      var language = 0;
      var activclick='';
      var numberpassicoractiv;
      var nrclicksearchresponse=0;
      var static_click = '';
      var Server_path_http='http://localhost/bestseller/Server_PHP/Http_Request/Route_Http.php'; //  path where go requests .. ..
      var Data = ''; // data is to send data in server .........
      var Status = ''; // status is for identify  what kind of http is requests post or get
      var Response;  // response from server ....

       var show_dropdown_search=0;
       var pointer_status = 0;

      var active_icon_header = 1;

      var  value_search_header;


      $(window).bind("load", function() {
        setTimeout(function(){
          var cookie_menu = 'cookie_menu';
          Data = 'check_cookie_menu='+cookie_menu;
          Status = 'GET';
          Send_Request_In_Server( Server_path_http , Data , Status ); // call method that send http request to check cookie menu ................
        },100);
      });

      $('.albanian').click(function(e){ // make checked radio language when user choose a language
        e.preventDefault();
        $('.radiolang').attr('checked',false);
        $(this).find('.radiolang').attr('checked', true);
      });

      $('.optionprofile').click(function(){
        $('.dropmenuprofile').css("top","50px");
        $('.dropmenuprofile').slideToggle(function(){
          $('.dropmenuprofile').animate({
            top : "50px"
          });
        });

        $('.dropdowngjuha').hide();

      });


      $('.gjuha').click(function(e){
        e.preventDefault();
        $('.dropdowngjuha').css("top","50px");
        $('.dropdowngjuha').slideToggle(function(){
          $('.dropdowngjuha').animate({
            top : "50px"
          });
        });

        $('.dropmenuprofile').hide();


      });

      $('.listcategory').click(function(){

        var width = $(window).width();
        var name = $(this).attr('id');

        if(name=='laptopscreen'){

        }
        else{
          nameposition=name;
          findposition(name);
        }
        if( actuallist == 1 ){

          static_click='actuallist';
          closecontainere(actuallist,static_click);
          activclick='iconmenu';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').hide();

          hide_category_menu(width);


        }
        else{

          static_click='actuallist';
          closecontainere(actuallist,static_click);
          activclick='iconmenu';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').show();


          if( actualchat == 1 ){

            var heig= $(window).height();

            hide_chat_div(heig);//call function hide chat...................................

            $('.pasiv_activ_bodychat').hide();

          }

          show_category_menu();// call function show category_menu.................................

          $('.listcategory').each(function(){
            $(this).hide();

          });
          $('.closelist').each(function(){
            $(this).show();
          });
        }
      });

      $('.openchat').click(function(){

        var width = $(window).width();
        if(actualchat==0){
          static_click='openchat';
          closecontainere(actualchat , static_click);
          activclick='openchat';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);

          if( actuallist == 1 ){
            hide_category_menu(width); // call function hide category menu ..........................

          }
          show_chat_div(width); //call function show chat...........................................
        }
        else{
          static_click='openchat';
          closecontainere(actualchat , static_click);
          activclick='openchat';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          var heig= $(window).height();

          hide_chat_div(heig);

          $('#showchat').show();

        }
      });

      $('.searchresponse').click(function(){
        var widthto = $(window).width();
        if(widthto>'500'){
          $('.pcheader').hide();
          $('.kerkimresponse').show();
          $('.searchinputresp').animate({
            width:"80%"
          });
        }
        else{
          $('.pcheader').hide();
          $('.kerkimresponse').show();
          $('.searchinputresp').animate({
            width:"75%"
          });
        }

      });

      $('.kerkim').keyup(function(){

        var new_value_search = $(this).val();

        value_search_header = new_value_search;

        setTimeout(function(){

          if( value_search_header == new_value_search ){

            check_value_search(value_search_header);
          }

        },200);


      });

      $('.kerkim').on('click',function(){

         if( value_search_header.length > 0 ){
           check_value_search(value_search_header);
         }

      });

     function  check_value_search( value_search_header ){

       if( active_icon_header == 1 ) {

         if ( value_search_header.length > 0 ) {

           $('.imgsearch').hide();
           $('.imgsearchexit').show();

           if (show_dropdown_search != 1) {

             show_dropdown_header('dropdown_search');
             show_dropdown_search = 1;

             return;

           }

           return;

         }
         $('.imgsearchexit').hide();
         $('.imgsearch').show();
         hide_dropdown_header('dropdown_search');
         show_dropdown_search = 0;
         return;
       }

      } // end function

      $('.imgsearchexit').click(function(){

        $('.kerkim').val("");
        $('.imgsearchexit').hide();
        $('.imgsearch').show();
        value_search_header='';
        check_value_search( value_search_header );

      });
      $('.iconsearch').click(function(){
        $('.kerkim').focus();
      });



      $('.exitsearch1').click(function(){

        $('.searchinputresp').animate({
          width:"2px"
        },function(){
          $('.kerkimresponse').css("display","none");
          $('.pcheader').show();
        });
      });

      $('.exit').click(function(){
        $('.searchinputresp').val("");
        $('.searchimg').show();
        $('.exit').hide();
      });

      $('.searchinputresp').keyup(function(){
        var value = $(this).val();
        if(value.length>0){
          $('.searchimg').hide();
          $('.exit').show();
        }
        else{
          $('.searchimg').show();
          $('.exit').hide();
        }
      });
      $('.searchimg').click(function(){
        $('.searchinputresp').focus();
      });
      $('.searchinputresp').click(function(){

      });


      $('.user-login').click(function(){


          give_bgcolor_icon_header('menu3', 'user-login', 0 , $(this).find('.write_icon_header'));


      });

      $('.language').click(function(e){
        e.preventDefault();
        if( active_icon_header == 1 ) {
          var name = $(this).attr('id');


          give_bgcolor_icon_header('menu3', 'language', language, $(this).find('.write_icon_header'));
          nameposition = name;
          findposition(name);
          if (language == 0) {

            $('.opacity_dropdown').fadeIn();
            static_click = 'language';
            closecontainere(language, static_click);
            activclick = 'language';
            numberpassicoractiv = 1;
            zerovariablat(activclick, numberpassicoractiv);
            show_dropdown_header('dropworld');

          }
          else {
            $('.opacity_dropdown').fadeOut();
            static_click = 'language';
            closecontainere(language, static_click);
            activclick = 'language';
            numberpassicoractiv = 0;
            zerovariablat(activclick, numberpassicoractiv);
            hide_dropdown_header('dropworld');
          }
        }

      });
      $('.card').click(function(e){
        e.preventDefault();
        if( active_icon_header == 1 ) {
          var name = $(this).attr('id');

          give_bgcolor_icon_header('menu3', 'card', card, $(this).find('.write_icon_header'));
          nameposition = name;
          findposition(name);
          if (card == 0) {
            $('.opacity_dropdown').fadeIn();
            static_click = 'card';
            closecontainere(card, static_click);
            activclick = 'card';
            numberpassicoractiv = 1;
            zerovariablat(activclick, numberpassicoractiv);
            show_dropdown_header('dropcard');
          }
          else {
            closecontainere(card, static_click);
            $('.opacity_dropdown').fadeOut();
            activclick = 'card';
            numberpassicoractiv = 0;
            zerovariablat(activclick, numberpassicoractiv);
            hide_dropdown_header('dropcard');
          }
        }
      });

      $('.favority').click(function(e){
        e.preventDefault();
        if( active_icon_header == 1 ) {
          var name = $(this).attr('id');

          give_bgcolor_icon_header('menu3', 'favority', favority, $(this).find('.write_icon_header'));

          nameposition = name;
          findposition(name);
          if (favority == 0) {
            $('.opacity_dropdown').fadeIn();
            static_click = 'favorite';
            closecontainere(favority, static_click);
            activclick = 'favority';
            numberpassicoractiv = 1;
            zerovariablat(activclick, numberpassicoractiv);

            show_dropdown_header('dropfavority');


          }
          else {
            closecontainere(favority, static_click);
            $('.opacity_dropdown').fadeOut();
            activclick = 'favority';
            numberpassicoractiv = 0;
            zerovariablat(activclick, numberpassicoractiv);

            hide_dropdown_header('dropfavority');

          }
        }
      });




      $('body').on('click', function(e) { // click in bady and close some div element................
          var width =$(window).width();

          if($(e.target).closest('.language ,.dropworld ,.treguesi').length == 0  ) {
             $('.dropworld').hide();
             language = 0;
          }
          if(width<=800){ // close category menu when click else  in 600px......................
              if($(e.target).closest('.listcategoryfind').length == 0 && $(e.target).closest('.category').length == 0  && $(e.target).closest('.treguesi').length == 0 && $(e.target).closest('.searchsubscribe').length == 0 ) {
                  hide_category_menu(width);
                  actuallist=0;
              }
               if($(e.target).closest('.pasiv_activ_bodychat').length == 0 && $(e.target).closest('.openchat').length == 0 && $(e.target).closest('.bodychat').length == 0  ) {

                  var heig= $(window).height();
                  hide_chat_div(heig);

                  actualchat=0;
               }
          }
          if($(e.target).closest('.favority , .delete ,.about_wish,' +
                '.hearts_div  ,.checkboxTwoInput ,.dropfavority ,.treguesi').length == 0  ) {

             $('.dropfavority').hide();

       favority = 0;

          }
          if($(e.target).closest('.search ,.dropdown_search').length == 0  ) {
              $('.dropdown_search').hide();
              show_dropdown_search = 0;

          }
          if($(e.target).closest('.card ,.dropcard ,.treguesi').length == 0  ) {
              $('.dropcard').hide();

                card=0;
          }

          if($(e.target).closest(
                '.card, .language, .dropworld, .dropcard ,.dropfavority ,.dropmore, .treguesi, .favority, .moreprofile, .pictureuser,'+
                ' .treguesi, .listcategoryfind, .category, .searchsubscribe ,.delete ,.about_wish,.hearts_div ,.checkboxTwoInput'
            ).length == 0 )

          {
            $('.treguesi').css({display: 'none'});// disabled pointer header icon.....
            give_bgcolor_icon_header('menu3' , 'card', 1 ,'write_icon_header');

          }


      });

      $(window).scroll(function(){

        if($(this).scrollTop()>20){
          $('.navigation').addClass('Box-shodown');
        }
        else{
          $('.navigation').removeClass('Box-shodown');
        }
      });



      setInterval(function(){ // call function with setinterval findpossition for pointer when user click dropdown menu  ......................................
        findposition(nameposition);
      },100); //................................................................................................ end

      function closecontainere(valu , static_div){ // function close containere when users click dropdown menu card or chat or ect ... ..................................
        var width= $(window).width();
        if (static_div=='openchat'){
          if(valu==1){
            $('.containere').show();
          }
          else{
            if(width<=800){
              setTimeout(function(){
                $('.containere').hide();
              },500);

            }
            else{

              $('.containere').show();

            }
          }

        }else{
          if(valu==1){
            $('.containere').show();
          }
          else{
            if(width<=800){

              $('.containere').hide();
            }
            else{

              $('.containere').show();

            }
          }
        }
      } // .................................................. end

      // ..............................................end

      // scroll top 20 show box-shodown
      function hide_details_product(){   // function to show detail product ..................................

        $('.details_products_container').animate({
          width:'50px',
          height:'50px',
          borderRadius:'100px'
        },function(){
          $('.details_products_container').hide();
          $('.opacity_detail_product,.details_products').fadeOut();
        });

      }

      function findposition(position){ //  function findposition for pointer when user click a dropdown menu  the pointer find position and go there  ................................

        var left = $('.'+position).offset();

        if(position=='iconmenu'){
          $('.treguesi').css({"margin-left":left.left+28,"background-color":"#E6E6FA"});
        }
        else if(position=='card'){
          $('.treguesi').css({"margin-left":left.left+28,"background-color":"white"});
        }

        else{
          $('.treguesi').css({"margin-left":left.left+28,"background-color":"white"});
        }

      } // ............................................... end

      function show_category_menu(){ //  function for show category menu and subsribe  when user click show menu call this function for show with animate ............................
        actuallist = 1;

        $('.menu_right_inside').hide();
        $('.menu_left_inside').addClass('hide_mini_category');

        $('.containere,.space,.above_space_header').addClass('active_menu');

        $('.listcategory').hide();
        $('.closelist').show();
        $('.menu_left , .under_menu_left' ).animate({
          left:"0px",
          width:'250px'
        },"fast");

        $('.radius_category').animate({
          left:"200px",
          borderTopRightRadius:"0px",
          borderBottomRightRadius:"0px",

        },"fast",function(){

          $('.all_show_multiple_open').show();

        });
        $('.all_show_multiple').hide();

        var cookie_menu = 'cookie_menu';
        Data = 'cookie_menu_set='+cookie_menu;
        Status = 'GET';
        Send_Request_In_Server( Server_path_http , Data ,Status ); // method to send data in server ......

      } // ............................................ end

      function hide_category_menu( width_function ){ // function for hide category menu when user click for close it  call this function with animate ...........................

        $('.menu_right_inside').show();
        $('.menu_left_inside').removeClass('hide_mini_category');
        actuallist = 0;
        if(width_function<800){
          $('.listcategory').css("display","block");
          $('.closelist').css("display","none");
          $('.menu_left , .under_menu_left ,.searchsubscribe ,.loadersubscribe').animate({
            left:"-800px"
          },"fast");


        }
        else{
          $('.listcategory').css("display","block");
          $('.closelist').css("display","none");
          $('.menu_left , .under_menu_left ,.searchsubscribe ,.loadersubscribe').animate({
            left:"-250px",
            width:'300px'
          },"fast");
          $('.radius_category').animate({
            left:"0px",
            borderTopRightRadius:"100px",
            borderBottomRightRadius:"100px",
            borderTopLeftRadius:"0px",
            borderBottomLeftRadius:"0px"

          },"fast",function(){
            $('.all_show_multiple').show();

          });
          $('.all_show_multiple_open').hide();

              $('.containere,.space,.above_space_header').addClass('exit_menu');


              $('.containere,.space,.above_space_header').removeClass('active_menu');


          var cookie_menu = 'cookie_menu';
          Data = 'cookie_menu_remove='+cookie_menu;
          Status = 'GET';
          Send_Request_In_Server( Server_path_http , Data , Status ); // method to send data in server ......

        }

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

          $('.containere,.space,.above_space_header').removeClass('exit_menu');



          $('.containere ,.space ,.above_space_header').addClass('active_chat');

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


        $('.containere,.space,.above_space_header').removeClass('exit_menu');


        $('.containere ,.space ,.above_space_header').removeClass('active_chat');



      } //.....................................end

      function show_dropdown_header( dropdown_class ){  // function to make show dropdwon that are in header ....

          if( active_icon_header == 1 ) { // check if  header button is active to click.......

              active_icon_header = 0; // disabled header button............

              $('.treguesi').css({display:'none'}); // disabled pointer header icon.....

              $('.' + dropdown_class).css({top: '30px', opacity: '0.1'}); //  css style...

              $('.' + dropdown_class).show().animate({ // animation effect show dropdown header......

                  top: '2',
                  opacity: 1

              }, 300, function () { //  function after effect ............

                  if( card != 0 || language !=0 || favority != 0  ) {

                    $('.treguesi').css({display: 'block'}); // show pionter......

                  }else{
                    give_bgcolor_icon_header('menu3' , 'card', 1 ,'write_icon_header');
                  }
                active_icon_header = 1;

              });
          }

      } // end function....

      function hide_dropdown_header( dropdown_class ) { // function to make hide dropdwon that are in header ....
          if (active_icon_header == 1) { // ccheck if  header button is active to click.......

               active_icon_header = 0; //disabled header button............

               $('.treguesi').css({display: 'none'});// disabled pointer header icon.....

               $('.' + dropdown_class).css({top: '30px', opacity: '1'}); // css style...

               $('.' + dropdown_class).animate({ // animation effect hide dropdown header......

                   top: '30',
                   opacity: '0.1',

               }, 300, function () { //  function after effect ............
                    $('.' + dropdown_class).hide();
                    active_icon_header=1;
               });
          }
      } // end function .......

      function zerovariablat( name , nr ){ //  ky function therrite sa here useri clikon mbi nje dropdown menu  , edhe mbane activ vete ate dropdown menu te tjerat behen 0 ..............
        var width = $(window).width();
        if(name=='more' && nr=='1'){
          more=1;
        }else{
          more=0;
        }
        if(name=='language' && nr=='1'){
          language=1;
        }else{
          language=0;
        }
        if(name=='card' && nr=='1'){
          card=1;
        }else{
          card=0;
        }
        if(name=='favority' && nr=='1'){
          favority=1;
        }else{
          favority=0;
        }

      }// ..................................................................end


      function give_bgcolor_icon_header( all , single , status , removewrite){

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


      }

      function Send_Request_In_Server( Server_path_http , Data , Status) { // function for send http request POST and GET in SERVER .......
        if (Status == 'GET') { // check if request is with  GET .....

          $.ajax({ // declare ajax syntax ..........
            type: Status, // put Status is GET ...........
            url: Server_path_http, // Path where is going the request .........
            data: Data, // data that are going in server ..........
            dataType:'json',// type of response   json  .............
            xhrFields: {
              withCredentials: true // credencials in header to set cookie in browser ..............
            },
            crossDomain: true, // cross true .......
            success: function (data) { // success function  get  response ................
              Response = data;
              console.log('success');
              success_response(); // call function success
            }, error: function (e) { // error response from server ...........
              console.log(e.error);
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
      function success_response(){

        if(Response['status']=='cookie_menu'){
           if(Response['data']=='true'){
             show_category_menu();
           }
        }
      }
    });
  }

}
