import { Component, OnInit,Input , Output , EventEmitter  } from '@angular/core';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HtppServicesComponent } from '../htpp-services/htpp-services.component';


declare  var $:any;

@Injectable()

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css'],
    providers:[HtppServicesComponent]
})
export class ClientProductsComponent implements OnInit {

   public  products = [] ;

   @Input() get_Language = {};

   @Input() wishList_products = [];

    public productInWish = false;

    private Response;

    @Output() wish_product_fromProducts:EventEmitter<object> = new EventEmitter;


    constructor( private Httpservice :HtppServicesComponent ) { }

      add_wish_list( product_data ){

        if( this.wishList_products.indexOf(product_data) == -1 ){

            this.wish_product_fromProducts.emit( product_data );

            this.Httpservice.create_obj( 'add_wishProduct', this.wishList_products );

            this.Httpservice.Http_Post()
                .subscribe(
                    data => {
                        if( data['status'] == 'add_wishProduct' ){
                          this.Response = data['data'];
                        }
                    },
                    error => console.log( error +'gabim' )

                );
        }
      }

    set_productInWish(){

     this.productInWish = true;

    }
    update_product_in_wish(){

        this.productInWish = false;

    }



  ngOnInit() {

      this.Httpservice.create_obj( 'products','products' );

      this.Httpservice.Http_Post()
          .subscribe(
               data => {
                  if( data['status'] == 'products' ){
                       this.products = data['data'];
                  }
               },
               error => console.log( error +'gabim' )

          );



      $(document).ready(function(){
          var scrollTop=0;
          var scroll_status = false;

          $(window).scroll(function(){  // function for get scrolltop .................................

              scrollTop  = $(this).scrollTop();

              if($(this).scrollTop()>380){ // chech if scrollTop is  more bigger than 60 ..............................

                  if( scroll_status == false ) {

                      $('.option_products').addClass('option_products_fixed_show');

                      $('.option_products_fixed_show').hide().slideDown();
                  }

                  scroll_status = true;

              }else{
                     if( scroll_status == true ) {

                         $('.option_products').hide().slideDown();


                         $('.option_products').removeClass('option_products_fixed_show');
                     }

                  scroll_status = false;
              }
          }); // end ...........................................

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
          $('.hover_all_wish').on('mouseenter',function(){
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
// function for wish list  it is active when  mouse is over elemnet for add wishlist  it make small dhe big  along the time that mouse is hover ..................
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


// function  animate hearts  into the products when click it  , it move and go to the favority icon ........................................................

          $('body').on('mouseenter','.button_footer_products',function(){
              $(this).addClass('hover_footer_products');


          });
          $('body').on('mouseleave','.button_footer_products',function(){

              $(this).removeClass('hover_footer_products');



          });


          $('.click_up').click(function(){


              $('body').animate({
                  scrollTop:'0px'
              });
          });

          $('body').on('click','.pagess_link',function(){


              var number_page = $(this).find('.padding_link').attr('id');

              var id_category = $(this).find('.type_products').attr('id');

              request_pagination(number_page,id_category);
          });
          $('body').on('click','.pagess_link_back_forward',function(){ // click button on pages forward and backward . .......
              var type_go = $(this).attr('id');
              var number_page_active = $(this).find('.padding_link_fast_step_forward_backward').attr('id');
              var type_products = $(this).find('.type_products').attr('id');

              if( type_go == 'step_forward'){
                  number_page_active=parseInt(number_page_active)+1;
                  request_pagination(number_page_active,type_products);
              }
              else if( type_go == 'fast_forward'){
                  number_page_active=parseInt(number_page_active)+5;

                  request_pagination(number_page_active,type_products);

              }
              else if( type_go == 'step_backward'){
                  number_page_active=number_page_active-1;
                  request_pagination(number_page_active,type_products);

              }
              else if( type_go == 'fast_backward'){
                  number_page_active=number_page_active-5;
                  if(number_page_active=='0'){
                      number_page_active=1;
                  }
                  request_pagination(number_page_active,type_products);

              }
          }); // end ...................
          $('body').on('click','.nondecoration',function(){
              var id_category = $(this).attr('id');
              request_category_products(id_category);
          });

          function request_pagination(number_pages , id_category){

              $.ajax({
                  type:'POST',
                  url:'products/products.php',
                  data:'getpages='+number_pages+'&id_category='+id_category,
                  BbforSend:function(){

                  },
                  success:function(data){

                      $('.all_prod').html(data);
                      $('.width_products').hide();
                      $('.width_products').fadeIn();

                      $('.nrtotal_products').each(function(){ // make all primary image zoom ..................................
                          var id = $(this).attr('id');
                          $('#'+id).zoom({ on:'click' });
                      });

                      var html = $('.pagination_containerleft').html();
                      $('.pagin_number').html(html).fadeIn();




                  },
                  error:function(){

                  }

              });

          }
          function request_category_products(id_category){

              $.ajax({
                  type:'POST',
                  url:'products/products.php',
                  data:'get_products_unic_category='+id_category,
                  beforSend:function(){

                  },
                  success:function(data){

                      $('.all_prod').html(data);
                      $('.width_products').hide();
                      $('.width_products').fadeIn();

                      $('.nrtotal_products').each(function(){ // make all primary image zoom ..................................
                          var id = $(this).attr('id');
                          $('#'+id).zoom({ on:'click' });

                          var html = $('.pagination_containerleft').html();

                          $('.pagin_number').html(html).hide();

                          $('.pagin_number').fadeIn();

                      }); // .......................end
                  },
                  error:function(){

                  }

              });

          }



      });

  }




}
