import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

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


      $(window).bind("load", function() {
        setTimeout(function(){
          var cookie_menu = 'cookie_menu';
          $.ajax({
            type:'GET',
            url:'category_and_subscribe.php',
            data:'check_cookie_menu='+cookie_menu,
            success:function(data){
              if(data==1){
                actuallist=1;

                $('.containere').addClass('newcontainere');
                $('.space').addClass('newspace');
                $('.listcategory').hide();
                $('.closelist').show();
                show_category_menu();

              }else{
              }
            },
            error:function(){

            }

          });

        },800);
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


      $('.gjuha').click(function(){
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
        if(actuallist==1){

          static_click='actuallist';
          closecontainere(actuallist,static_click);
          activclick='iconmenu';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').hide();

          hide_category_menu(width);

          $('.containere').addClass('exitcalculation');
          $('.space').addClass('exitspace');
          setTimeout(function(){
            $('.containere').removeClass('newcontainere');
            $('.space').removeClass('newspace');

          },500);

          actuallist=0;


        }
        else{

          static_click='actuallist';
          closecontainere(actuallist,static_click);
          activclick='iconmenu';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').show();


          if(actualchat==1){
            var heig= $(window).height();
            hide_chat_div(heig);//call function hide chat...................................
            $('.pasiv_activ_bodychat').hide();


            $('.containere').removeClass('newcontainerechat');
            $('.space').removeClass('newspacechat');

            actualchat=0;
          }


          $('.containere').removeClass('exitcalculationchat');
          $('.space').removeClass('exitspacechat');

          $('.containere').addClass('newcontainere');
          $('.space').addClass('newspace');
          $('.space').removeClass('exitspace');
          $('.containere').removeClass('exitcalculation');

          show_category_menu()// call function show category_menu.................................

          $('.listcategory').each(function(){
            $(this).hide();

          });
          $('.closelist').each(function(){
            $(this).show();
          });



          actuallist=1;




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

          if(actuallist==1){
            hide_category_menu(width); // call function hide category menu ..........................
            actuallist=0;
          }

          $('.containere').removeClass('newcontainere');
          $('.space').removeClass('newspace');

          show_chat_div(width); //call function show chat...........................................




          $('.containere').addClass('newcontainerechat');
          $('.space').addClass('newspacechat');
          $('.space').removeClass('exitspacechat');
          $('.containere').removeClass('exitcalculationchat');

          actualchat=1;
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

          $('.containere').addClass('exitcalculationchat');
          $('.space').addClass('exitspacechat');
          setTimeout(function(){
            $('.containere').removeClass('newcontainerechat');
            $('.space').removeClass('newspacechat');

          },100);
          actualchat=0;

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
        var val = $(this).val();
        if(val.length>0){
          $('.imgsearch').hide();
          $('.imgsearchexit').show();
        }
        else{
          $('.imgsearchexit').hide();
          $('.imgsearch').show();
        }
      });
      $('.imgsearchexit').click(function(){
        $('.kerkim').val("");
        $('.imgsearchexit').hide();
        $('.imgsearch').show();
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

      $('.language').click(function(){
        var name = $(this).attr('id');
        nameposition=name;
        findposition(name);
        if(language==0){
          $('.opacity_dropdown').fadeIn();
          static_click = 'language';
          closecontainere(language,static_click);
          activclick='language';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);
          $('.dropworld').show()
          $('.treguesi').show();

        }
        else{
          $('.opacity_dropdown').fadeOut();
          static_click='language';
          closecontainere(language,static_click);
          activclick='language';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').hide();
          $('.dropworld').hide()
        }

      });
      $('.card').click(function(){
        var name = $(this).attr('id');
        nameposition=name;
        findposition(name);
        if(card==0){
          $('.opacity_dropdown').fadeIn();
          static_click = 'card';
          closecontainere(card ,static_click);
          activclick='card';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);
          $('.dropcard').show()
          $('.treguesi').show();
        }
        else{
          closecontainere(card,static_click);
          $('.opacity_dropdown').fadeOut();
          activclick='card';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').hide();
          $('.dropcard').hide()
        }
      });

      $('.favority').click(function(){
        var name = $(this).attr('id');
        nameposition=name;
        findposition(name);
        if(favority==0){
          $('.opacity_dropdown').fadeIn();
          static_click='favorite';
          closecontainere(favority,static_click);
          activclick='favority';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);
          $('.dropfavority').show()
          $('.treguesi').show();

        }
        else{
          closecontainere(favority,static_click);
          $('.opacity_dropdown').fadeOut();
          activclick='favority';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').hide();
          $('.dropfavority').hide()
        }
      });


      $('.pictureuser').click(function(){
        var name = $(this).attr('id');
        nameposition=name;
        findposition(name);
        if(more==0){
          $('.opacity_dropdown').fadeIn();
          static_click='more';
          closecontainere(more,static_click);

          activclick='more';
          numberpassicoractiv=1;
          zerovariablat(activclick,numberpassicoractiv);
          $('.dropmore').show()
          $('.treguesi').show();

        }
        else{
          closecontainere(more,static_click);
          activclick='more';
          numberpassicoractiv=0;
          zerovariablat(activclick,numberpassicoractiv);
          $('.treguesi').hide();
          $('.dropmore').hide()
        }
      });

      $('body').on('click', function(e) { // click in bady and close some div element................
        var width =$(window).width();
        if($(e.target).closest('.language').length == 0 && $(e.target).closest('.dropworld').length == 0  && $(e.target).closest('.treguesi').length == 0 ) {
          $('.dropworld').hide();

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
        if($(e.target).closest('.favority').length == 0 && $(e.target).closest('.dropfavority').length == 0 && $(e.target).closest('.treguesi').length == 0 ) {
          $('.dropfavority').hide();

        }
        if($(e.target).closest('.card').length == 0 && $(e.target).closest('.dropcard').length == 0 && $(e.target).closest('.treguesi').length == 0  ) {
          $('.dropcard').hide();
        }
        if($(e.target).closest('.moreprofile').length == 0 && $(e.target).closest('.pictureuser').length==0 && $(e.target).closest('.treguesi').length == 0
            && $(e.target).closest('.dropmore').length==0) {
          $('.dropmore').hide();
        }
        if($(e.target).closest(
                '.card, .language, .dropworld, .dropcard ,.dropfavority ,.dropmore, .treguesi, .favority, .moreprofile, .pictureuser,'+
                ' .treguesi, .listcategoryfind, .category, .searchsubscribe'
            ).length == 0 )
        {

          $('.treguesi').hide();
          $('.opacity_dropdown').fadeOut();
        }
        if($(e.target).closest('.details_products_container, .button_footer_products, .more_detail_product,#map').length==0){
          hide_details_product();
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
          $('.treguesi').css({"margin-left":left.left+4,"background-color":"#E6E6FA"});
        }
        else if(position=='card'){
          $('.treguesi').css({"margin-left":left.left+6,"background-color":"white"});
        }

        else{
          $('.treguesi').css({"margin-left":left.left+4,"background-color":"white"});
        }

      } // ............................................... end

      function show_category_menu(){ //  function for show category menu and subsribe  when user click show menu call this function for show with animate ............................
        $('.category , .under_category ,.searchsubscribe,.loadersubscribe').animate({
          left:"0px"
        },"fast");

        $('.radius_category').animate({
          left:"208px",
          borderTopRightRadius:"0px",
          borderBottomRightRadius:"0px",

        },"fast",function(){

          $('.all_show_multiple_open').show();
          $('.position_icon_ctegory').css('left','8px');
        });
        $('.all_show_multiple').hide();

        var cookie_menu = 'cookie_menu';
        $.ajax({
          type:'GET',
          url:'category_and_subscribe.php',
          data:'cookie_menu='+cookie_menu,
          success:function(data){

          },
          error:function(){

          }

        });

      } // ............................................ end

      function hide_category_menu(width_function){ // function for hide category menu when user click for close it  call this function with animate ...........................

        if(width_function<800){
          $('.listcategory').css("display","block");
          $('.closelist').css("display","none");
          $('.category , .under_category ,.searchsubscribe ,.loadersubscribe').animate({
            left:"-800px"
          },"fast");


        }
        else{
          $('.listcategory').css("display","block");
          $('.closelist').css("display","none");
          $('.category , .under_category ,.searchsubscribe ,.loadersubscribe').animate({
            left:"-270px"
          },"fast");
          $('.radius_category').animate({
            left:"0px",
            borderTopRightRadius:"100px",
            borderBottomRightRadius:"100px",
            borderTopLeftRadius:"0px",
            borderBottomLeftRadius:"0px"

          },"fast",function(){
            $('.all_show_multiple').show();
            $('.position_icon_ctegory').css('left','5px');
          });
          $('.all_show_multiple_open').hide();

          var cookie_menu = 'cookie_menu';
          $.ajax({
            type:'GET',
            url:'category_and_subscribe.php',
            data:'cookie_menu='+cookie_menu,
            success:function(data){

            },
            error:function(){

            }

          });

        }

      } // ........................................................end

      function show_chat_div(width_function){ /// function show show element  for chat  when user click  on the chat call this function  and open div for chat with animate  ........................
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
            height:"95vh",
            bottom:"0px",
            width : '250px',
            borderTopLeftRadius: "3px",

            borderColor: 'darkolivegreen',
            borderWidth : '1px',


          },300,function(){
            $('.pointerchat').css("visibility","visible");
            $('.pasiv_activ_bodychat').show();
          });

        }


      } //..................................................end

      function hide_chat_div(heig){ // function for hide chat when user click close chat   , then call this for close ...............................
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

      } //.....................................end

      function zerovariablat(name,nr){ //  ky function therrite sa here useri clikon mbi nje dropdown menu  , edhe mbane activ vete ate dropdown menu te tjerat behen 0 ..............
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
    });
  }

}
