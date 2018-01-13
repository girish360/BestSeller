import { Component, OnInit , AfterViewInit , Input, NgZone  } from '@angular/core';

import { RouterModule, Router , } from '@angular/router';

import { HtppServicesComponent } from '../htpp-services/htpp-services.component';

import { EncryptDecryptService } from '../encrypt-decrypt.service';

declare var $:any;

@Component({
  selector: 'app-categorys-subscribes',
  templateUrl: './categorys-subscribes.component.html',
  styleUrls: ['./categorys-subscribes.component.css']
})
export class CategorysSubscribesComponent implements OnInit {

  constructor( private router:Router, private Httpservice : HtppServicesComponent , private crypto: EncryptDecryptService) { }



  public categorys = [];

   public id_company:any;

  @Input() get_Language = {};

  private top_menus:object = [
    { icon:'home',id:'1',name:'Home'   },
    { icon:'star rate',id:'2',name:'Expensive'  },
    { 'icon':'today','id':'3','name':'Today'  },
    { 'icon':'subscriptions','id':'4','name':'Subscriptions' },
    { 'icon':'whatshot','id':'5','name':'Trending'  },
    { 'icon':'history','id':'6','name':'History'  }
  ];

  private subscriptions:object = [
    { 'icon':'klo.jpg','id':'7','name':'Electronics' },
    { 'icon':'1234.jpg','id':'8','name':'Phone' },
    { 'icon':'b3.jpg','id':'9','name':'Samsung' },
    { 'icon':'klo.jpg','id':'10','name':'T-shirt' }
  ];

  private settings:object = [
    { 'icon':'settings','id':'11','name':'Settings' },
    { 'icon':'help','id':'12','name':'Help' },
    { 'icon':'feedback','id':'13','name':'Feedback' }

  ];

  private user:object = [
    { 'icon':'language','id':'14','name':'Language' },
    { 'icon':'person pin','id':'15','name':'User Panel' }


  ];

  click_top_menu( id_top_menu ){

    if( id_top_menu == '1'){
      //  user clicked home ...
      return;
    }
    else if(  id_top_menu == '2' ){
      // user clicked expensice
      return;
    }
    else if(  id_top_menu == '3' ){
      // user clicked today
      return;
    }
    else if(  id_top_menu == '4' ){
      // user clicked subscriptions
      return;
    }


  }

  encrypt_id( id_company ){

    this.router.navigate(['/company',{ companyId: this.crypto.encryp_AES( id_company , this.crypto.secret_key_company_profile ) }]);

  }

  ngOnInit() {



    this.Httpservice.create_obj( 'category','category' );

    this.Httpservice.Http_Post()
        .subscribe(
            data => {
              if( data['status'] == 'category' ){
                this.categorys = data['data']
              }
            },
            error => console.log( error +'gabim' )

        );

    $(document).ready(function(){

      var activ_category=0;
      var on_hover_category = 0
      var name=0;
      var offset = 0;
      var id='';
      var width = $(window).width();
      var koha = 0;
      var stay_over_elemnt = 0;
      var active_category=0;

      var nrclick_category='fillimi';


      var Server_path_http='http://localhost/bestseller/Server_PHP/Http_Request/Route_Http.php'; //  path where go requests .. ..
      var Data = ''; // data is to send data in server .........
      var Status = ''; // status is for identify  what kind of http is requests post or get
      var Response;  // response from server ....






      $('body').on({ // moseover  category and subscribe for remove class when use isn't over element from category and subscribe .....................
        mouseover: function(e){
          if($(e.target).closest('.categorytype, .pointer_catego, .subcat, .company_subscribe,.morecontact,.writecategory').length==0){
            $('.opacity_hover_category_sub,.opacity_border_pointer').fadeOut();
            $('.pointer_catego').fadeOut();
            $('.bordertypecat').removeClass('animateborderleft');
            $('.subcat , .company_subscribe').removeClass('subscribe_add_hover');
            $('.subcat ,.company_subscribe').find('.bordertypecat').removeClass('visibleborder');

          }
          if($(e.target).closest('.morecontact,.writecategory').length>0){
            $('.pointer_catego').fadeOut();
            $('.bordertypecat').removeClass('animateborderleft');
            $('.subcat , .company_subscribe').removeClass('subscribe_add_hover');
            $('.subcat ,.company_subscribe').find('.bordertypecat').removeClass('visibleborder');

          }
          if( $(e.target).closest('.on_hover_category').length==0 && $(e.target).closest('.pointer_catego').length==0){
            koha=0;
            stay_over_elemnt=0;
          }
          if($(e.target).closest('.categorywidth, .pointer_catego').length==0){
            $('.categorytype').removeClass('categorytype_add_hover');
          }

        }
      }); // end mouseover category and subscribe .................................................................

      // mouse hover for category and subscribe show detail when mouse stay about 1 sec over one elemnt from category and subscribe ......................
      $('body').on('mouseenter','.categorytype ,.subcat, .company_subscribe',function() {


        id = $(this).attr('id');
        offset = $(this).offset();
        $('.bordertypecat').removeClass('animateborderleft');

        $('.categorytype').removeClass('categorytype_add_hover');
        $('.subcat , .company_subscribe').removeClass('subscribe_add_hover');
        $('.subcat ,.company_subscribe').find('.bordertypecat').removeClass('visibleborder');

        var width = $(window).width();
        if(width>800){
          if( id == 'category'+active_category ){ // active category here ...............................................................................
            name = $(this).find('.full_name_hover_category_active').text();

            if(koha==1 && stay_over_elemnt==1){ // check if is actual  time for show detail ......................
              remove_show_detail_category();
              show_detail_category(offset,name ,id); // call show detail ...........
              $('.opacity_hover_category_sub,.opacity_border_pointer').show();

            }else{

              $(this).data('timeout', setTimeout( function () {
                remove_show_detail_category();
                show_detail_category(offset,name ,id); // call show detail ...........
                koha=1;
                stay_over_elemnt=1;
                $('.opacity_hover_category_sub,.opacity_border_pointer').fadeIn();

              }, 1000));
            }

          } // end active category ...............................................................
          else{ // category isnot active ...............................................
            name = $(this).find('.full_name_hover').text();

            if(koha==1 && stay_over_elemnt==1){ // check if is actual  time for show detail ......................
              remove_show_detail_category();
              show_detail_category(offset,name ,id); // call show detail ...........
              $('.opacity_hover_category_sub,.opacity_border_pointer').show();

            }else{

              $(this).data('timeout', setTimeout( function () {
                remove_show_detail_category();
                show_detail_category(offset,name ,id); // call show detail ...........
                koha=1;
                stay_over_elemnt=1;
                $('.opacity_hover_category_sub,.opacity_border_pointer').fadeIn();
              }, 1000));
            }

          } // end hover  isnot active ...............
        } // check if is screen more bigger than 800 px

      }, function () {

        clearTimeout($(this).data('timeout'));


      }); // end  show detail from category and subscribe ................................



      //mouse hover categorytype..............................
      $('body').on('mouseenter' ,'.categorytype',function(){ // add class for style .................


        $('.bordertypecat').removeClass('animateborderleft');

        $(this).find('.bordertypecat').addClass('animateborderleft');

        // end add..........
      });
      // end mouse hover categorytype .......................................
      // mouse hover subcategory......... add class for style ...............
      $('body').on('mouseenter','.subcat ',function(){

        $('.bordertypecat').removeClass('animateborderleft');

        $(this).find('.bordertypecat').addClass('animateborderleft');

      });

      // hover company that add when user search for products .........................
      $('body').on('mouseenter mouseleave','.hover_add_search',function(evt) {  // function mouseenter and mouseleave for element that add when user search for company

        if(evt.type=='mouseenter'){ // chech if is mouseenter ............................
          $('.subcat , .company_subscribe').removeClass('subscribe_add_hover');
          $('.hover_add_search').find('.bordertypecat').removeClass('visibleborder');
          $('.hover_add_search').find('.iconsubcategory').hide();

          $(this).addClass('subscribe_add_hover');
          $(this).find('.bordertypecat').addClass('visibleborder').css('left','-5px').animate({left:'0px'},'fast');
          $(this).find('.iconsubcategory').show().css({'left':'-10px','top':'8px'}).animate({left:'-5px'});
          id = $(this).attr('id');
          offset = $(this).offset();
          name = $(this).find('.full_name_hover').text();
          if(koha==1 && stay_over_elemnt==1 ){
            remove_show_detail_category(); // remove detail moseleave .......................

            show_detail_category(offset,name,id);
            $('.opacity_hover_category_sub,.opacity_border_pointer').show();

          }else{
            $(this).data('timeout',setTimeout(function(){
              remove_show_detail_category(); // remove detail moseleave .......................

              show_detail_category(offset,name,id);
              koha=1;
              stay_over_elemnt=1;
              $('.opacity_hover_category_sub,.opacity_border_pointer').fadeIn();

            },1000));
          }
        }
        else if(evt.type=='mouseleave'){ //check if is mouseleave .......................

          clearTimeout($(this).data('timeout')); //remove time .....................................

        }
      }); // end mouseenter and mouseleave search company.......................
      // end mouse hover subcategory.............................

       var active_click_category;
      // start click to show subcategory ........................
      $('body').on('click','.underline',function(){ //

        var id =$(this).attr('id');



        category_click( id  , $(this)  ,active_click_menu_navgation );

      });  // end click show  subcategory

      var active_click_menu_navgation;
      $('body').on('click' , '.menu_navigation',function(){

        var id = $(this).attr('id');

        menu_mini_navigation(id);

        menu_navigation(  id , active_click_category  );

      });

      $('body').on('click' , '.menu_mini_navigation',function(){

        var  id = $(this).attr('id');

         menu_mini_navigation(id);

         menu_navigation( id , active_click_category);

      });


      function  category_click( id , this_click , active_click_menu_navgation ){

        if(id==nrclick_category){ // check if the click is again on one category ..........
          $('.sub'+id).slideUp();
          nrclick_category='fillimi';
          active_click_category='';
          $('.categorytype').removeClass("categorytype_newBackground");
          $('.bordertypecat').removeClass("new_border_cat");

          $('.moresubcategory').removeClass("moresub");
          $('.exitsubcategory').removeClass("exitsub");

          $(active_click_menu_navgation).find('.categorytype').addClass("categorytype_newBackground");
          $(active_click_menu_navgation).find('.bordertypecat').addClass("new_border_cat");
          $(active_click_menu_navgation).find('.moresubcategory').addClass("moresub");
          $(active_click_menu_navgation).find('.exitsubcategory').addClass("exitsub");
        }
        else{

          active_click_category =this_click;
          activ_category=id;
          $('.subcategory').slideUp();
          $('.sub'+id).slideDown();
          active_category=id; // active category varioable ...............
          nrclick_category=id;

          $('.categorytype').removeClass("categorytype_newBackground");
          $('.bordertypecat').removeClass("new_border_cat");
          $('.moresubcategory').removeClass("moresub");
          $('.exitsubcategory').removeClass("exitsub");

          $(this_click).find('.categorytype').addClass("categorytype_newBackground");
          $(this_click).find('.bordertypecat').addClass("new_border_cat");
          $(this_click).find('.moresubcategory').addClass("moresub");
          $(this_click).find('.exitsubcategory').addClass("exitsub");

          $(active_click_menu_navgation).find('.categorytype').addClass("categorytype_newBackground");
          $(active_click_menu_navgation).find('.bordertypecat').addClass("new_border_cat");
          $(active_click_menu_navgation).find('.moresubcategory').addClass("moresub");
          $(active_click_menu_navgation).find('.exitsubcategory').addClass("exitsub");

        }
        remove_show_detail_category(); // call remove detail when click on the category ......................................

      }

      function menu_navigation( this_click  , active_click_category ){

        active_click_menu_navgation = this_click;

        $('.categorytype').removeClass("categorytype_newBackground");
        $('.bordertypecat').removeClass("new_border_cat");
        $('.mat-icon').removeClass("new_color_mat_icon");
        $('.exitsubcategory').removeClass("exitsub");
        $('.namecategory').removeClass("new_color_namecategory");

        $(active_click_category).find('.categorytype').addClass("categorytype_newBackground");
        $(active_click_category).find('.bordertypecat').addClass("new_border_cat");
        $(active_click_category).find('.exitsubcategory').addClass("exitsub");

        $('.menu_navigation'+this_click).find('.categorytype').addClass("categorytype_newBackground");
        $('.menu_navigation'+this_click).find('.bordertypecat').addClass("new_border_cat");
        $('.menu_navigation'+this_click).find('.mat-icon').addClass("new_color_mat_icon");
        $('.menu_navigation'+this_click).find('.exitsubcategory').addClass("exitsub");
        $('.menu_navigation'+this_click).find('.namecategory').addClass("new_color_namecategory");
      }

      function menu_mini_navigation( id_mini_menu ){

        $('.button-fab-menu-right').removeClass('active_mini_menu_button');
        $('.mat-icon').removeClass("active_mini_menu_button_icon");

        $('.menu_mini_navigation'+id_mini_menu).find('.button-fab-menu-right').addClass("active_mini_menu_button");
        $('.menu_mini_navigation'+id_mini_menu).find('.mat-icon').addClass("active_mini_menu_button_icon");



      }

      function show_detail_category(offset,name ,id){ //function for  show detail when mouseover in category , and find position  ..............................
        $('.pointer_catego').show().css("top",offset.top);
        $('.writepointer').append(name);
      }  // end ......................

      function remove_show_detail_category(){ // unction for remove detail when  use mouseleave from the category .............................................
        $('.pointer_catego').hide();
        $('.writepointer').html('');
      }

      // search company or subscribe......................................
      var search_static_nr=0;
      $('.imgsearchsub').click(function(){
        $('.inputsearchcompany').focus();
      });
      var nradd_total=0;
      $('.inputsearchcompany').keyup(function(){ // keyup function search subscribe and company else ..................................
        var val =$(this).val(); //get val in input ...............................

        var valu = this.value.toLowerCase(); // get val in input tolowercase ..................
        search_subscribe_static(valu);  // call function search static with jquery..........................
        search_company_dinamicy(val ,nradd_total); // call function search dynamically with jquery ajax json  and php fro akses DB .....................

      });


      function search_subscribe_static(value ){ //function search static for subscribe
        $('.company_subscribe').each(function(index) {  // search statis from subscribe that exists in div ...........
          if (index === 0) {
            return;
          }
          var name= $(this).find('.namecategory').text().toLowerCase(); // find name company ...........
          $(this).toggle(name.indexOf(value) !== -1);

          // show company from search .............
        });

      }

      function search_company_dinamicy(valu , nr_add_total){  // function for search  from databse .....................

        var control='search12';

        if(valu.length>0){
          $('.imgsearchsub').hide();
          $('.delete_search_company').show();
          setTimeout(function(){ // call every 0.5 minutes ......................................................
            var valu1=$('.inputsearchcompany').val();
            if(valu1==valu){ // check if user stay without press any keypress for 0.5 minutes , if it's true  get data with ajax for search ..........


              // show loader until data are complete here in ajax ..........................

              $.ajax({
                type:'GET',
                url:'class_search_company.php',
                data:{searchsubscribe:valu,control:control},
                beforeSend: function() { // before send request in server  loder show ...................................

                  $('.loadersubscribe').show();
                },

                error:function(e){ // when the ajax return error ...........................
                  if(e.status==0){ // chach if exists error  or not connection internet.....................
                    $('.loadersubscribe').show(); // shos loader ..............
                    setTimeout(function(){  // function after 1 sec .................................
                      search_company_dinamicy(valu,nr_add_total); // call function agan ......................................
                    },1000); // time for call function after 1 sec .................

                  }

                },
                success:function(data){ //  success data .....................................................

                  var json = $.parseJSON(data); // get data external file php , and parsejson...................................

                  $('.loadersubscribe').fadeOut(); // close loader  when data are complete here ...........................

                  if(json.length>0){ // check if have 1 result minimum  .....................
                    $('.all_count_subscribe').hide();
                    $('.all_countsearch_number').text('All Result : ' +json.length).show();

                    $('.no_result').remove();
                    var array = []; // array with subscribe .........................................
                    var i =0;
                    $('.company_subscribe').each(function(){// build array with id from company that user have subscrations..............
                      var id = $(this).attr('id');
                      array[i]=id;
                      i++;
                    }); //..............end

                    var array_add = []; //array with exist add from search
                    var i =0;
                    $('.add_search').each(function(){// build array with id from company that user search company..............
                      var id = $(this).attr('id');
                      array_add[i]=id;
                      i++;
                    }); // .....................end
                    // code for remove element that are add from search , but those  remove ore add more when user change the search .......................................
                    if(array_add.length>0){ // check if is add any search .................................................

                      for (var i=0;i<array_add.length;i++){// loop div that are add in search....................
                        var exist=0;
                        for(var j = 0; j<json.length;j++){ // loop json that get from databse when user change search.........................
                          if(array_add[i]===json[j]['id']){ // check if any element that is add and it exist in search actual ,if not then remove it..........................
                            exist++; // ++ exist in search...............................
                          }
                        }
                        if(exist==0){ // check if this element is 0 remove it ....................................
                          $('.add'+array_add[i]).remove(); // remove it ...........................................

                        }
                      }
                    } // ..................end

                    for(var i=0;i<json.length;i++){ // loop json search from database...................................
                      var nr_add=0;
                      for(var j=0; j<array.length;j++){ // loop array with subscribe that are alredy .and those dont add again into the div ...........

                        if(json[i]['id']===array[j]){ // subscribe that exists don't add.....................
                          nr_add++; // ++ if exist this company into the div and it dont add again .............................
                        }
                      }

                      for(var t =0 ;t<array_add.length;t++){ // loop  array with div that are add from search ..........
                        if(json[i]['id']===array_add[t]){ // check  if this element is agan into the search when user change it then it dont add again
                          nr_add++; //++ nr_add...........
                        }


                      }

                      if(nr_add<1){ // check if nr_add is 0 then it add into the div search company .................
                        nr_add_total++;
                        $('.subscribeonly').append( // add elemnt for search .................................
                            '<div class="add_search add'+json[i]['id']+'"  id="'+json[i]['id']+'">'+

                            '<a href="#" class="nondecoration" id="">'+
                            '<div class="subcat hover_add_search" id=search_subscribe"'+json[i]['id']+'">'+
                            '<div class="bordertypecat"></div>'+
                            '<div class="imgsubscribe">'+
                            '<img class="imagesubscribe" src="images/'+json[i]['imageprofile']+'">'+
                            '</div>'+
                            '<div class="namecate">'+
                            '<div class="namecategory" style="position:relative; left:25px;" href="#">'+json[i]['name_company']+'</div>'+
                            '<div class="full_name_hover">'+json[i]['name_company']+'</div>'+
                            '</div>'+

                            '<div class="imgnc iconsubcategory">'+
                            '<img src="images/drop1.png">'+
                            '</div>'+
                            '</div>'+
                            '</a>'+
                            '</div>'
                        ); // ..........................  end append
                      } // ............ end chech
                    } // ......... end for json .......

                    if(nr_add_total>0){
                      $('.morecontact').show();
                    }
                    else{
                      $('.morecontact').hide();
                    }



                  } // and check if json is more big than 0 ...........................
                  else{ // here don't have search result ........
                    $('.morecontact').hide();
                    $('.add_search').remove();
                    $('.all_count_subscribe').hide();
                    $('.all_countsearch_number').text('All Result : ' +json.length).show();
                    $('.subscribeonly').append( // add element no result................................
                        '<div class="add_search no_result">'+
                        '<a href="#" class="nondecoration" id="">'+
                        '<div class="subcat">'+
                        '<div class="bordertypecat"></div>'+
                        '<div class="imgsubscribe">'+
                        '<img class="imagesubscribe" src="images/not.png">'+
                        '</div>'+
                        '<div class="namecate">'+
                        '<div class="namecategory" href="#">0 Result</div>'+
                        '</div>'+
                        '<div class="imgnc iconsubcategory">'+
                        '<img src="images/drop1.png">'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '</div>'
                    ); // ...............end append  0 result from search.........................................
                  } // .end else ....................

                }


              });
            } // and check if  is the value for search th same after  0.5 sec ..........................................
          },700); // end  call  setTimeout function for search when user wait about 1 sec without keypres .............................
        } // end check if value that user search is  more big than 0..............
        else{ //  if is characters that user search equals with 0.................................................................................................................................
          $('.all_count_subscribe').show(); // show number subscribe .........................
          $('.all_countsearch_number').text('').hide(); //hide number result from search.........................
          $('.add_search').remove(); // remove add_search ..................
          $('.morecontact').hide(); // hide write more company ..............................
          $('.imgsearchsub').show(); // show icon search................
          $('.delete_search_company').hide(); // hide icon delete search.......................................................
        }
      } // end function for search company  from database ...

      $('.delete_search_company').click(function(){ // click icon remove all characters from input search...............
        $('.all_count_subscribe').show(); // show number subscribe .........................
        $('.all_countsearch_number').text('').hide(); //hide number result from search.........................
        $('.morecontact').hide(); //hide write more company ..............
        $('.add_search').remove(); //hide add_reash .................
        $('.subuser').show();  // show subscribe ..................
        $('.inputsearchcompany').val("").focus(); // remove value into the input .......................
        $('.imgsearchsub').show(); // show icon search ........................
        $('.delete_search_company').hide(); // hide icon delete value .........................................................

        $('.company_subscribe').each(function(index) {  // show all subscribe with each ,  when user click delete button  search ...........
          if (index === 0) {
            return;
          }
          else{
            $(this).show(); // shos this subscribe
          }

        });
      }); // end delete charcters from input search.............................

      var statusi=0;
      var errori=0;


      function Send_Request_In_Server( Path , Data , Status ){

        if(Status == 'GET'){

          $.ajax({
            type: Status,
            url: Path,
            data: Data,
            dataType:'json',
            success:function(json){

              Response = json;

              success_response() // success


            },error:function(e){
              console.log(e.error);
            },beforeSend:function(){

            }
          });

        }
        else if(Status == 'POST'){

          $.ajax({
            type: Status,
            url: Path,
            data: Data,
            dataType: 'json',

            success:function(data){

              Response = data;

              success_response(); // call function success

            },error:function(e){

            },beforeSend:function(){

            }
          });

        }
        else{
          Response  = 'Nothing';

        }

      }
      function success_response() {

      }


    }); // end document ready.................................................................................


  }

}
