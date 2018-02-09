import { Component, OnInit,Input , Output , EventEmitter  } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import { Routes, RouterModule , ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { HttpService } from '../services/http.service';

import { DataService } from '../services/data.service';



declare  var $:any;

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css']

})

export class ClientProductsComponent implements OnInit {

    constructor( private router : Router, private crypto:EncryptDecryptService , private dataservices: DataService ,    private Httpservice :HttpService , private route: ActivatedRoute  ) {

        this.get_Language = this.dataservices.language;

        this.dataservices.Language.subscribe( ( language:object ) => { this.get_Language = language  } );

        this.wishList_products = this.dataservices.wishlist;

        this.dataservices.wishList_products.subscribe( ( wishList:any ) => { this.wishList_products = wishList  } );

        this.products = this.dataservices.products;

        this.dataservices.Products.subscribe( ( products:any ) => { this.products = products  } );


    }

    public  products = [] ;

    private wishList_products = [];

    public productInWish = false;

    public get_Language :object={};

    private Response;

    public status_in_wish;

    public nr_products=0;




    add_wish_list( product_data ){  // function to add product in wishList

        this.status_in_wish = false; // status to find  if this  product is in wish......

        for ( var i =  0 ; i<this.wishList_products.length ; i++ ){ // loop wish list with product ...

            if( this.wishList_products[i].id == product_data.id ){ // if product .id is equals with one product.id in wish status should be true ...

                this.status_in_wish = true; //  true status that tell you  that this prod is in wishlist ...

            }
        }

        if( this.status_in_wish != true ){ // check if status is not equals with true  to  add this prod in wish ....

            this.wishList_products.unshift( product_data ); // push wish product in wishList products

            this.dataservices.wishList_products.emit( this.wishList_products );  // change wish list to services to deliver this  chnage into header that tell number wishlist ....

            this.dataservices.update_wishList( this.wishList_products); // change wish list in services   that get this  when change component with router outlet

            this.Httpservice.create_obj( 'add_wishProduct', product_data.id ); //  create obj to change this in server

            this.Httpservice.Http_Post() // make request ......
                .subscribe( //  take success
                    data => {
                        if( data['status'] == 'add_wishProduct' ){
                            this.Response = data['data'] ,console.log(data['data'])
                        }
                    },
                    error => console.log( error['data'] ) // take error .....

                );
        }
    }

    set_status_wish(){
         this.status_in_wish=true;
    }
    update_status_wish(){
        this.status_in_wish=false;
    }

    encrypt_id( id_company ){

        this.router.navigate(['/company',{ companyId: this.crypto.encryp_AES( id_company , this.crypto.secret_key_company_profile ) }]);

    }

    product_details( id_product ){

        this.router.navigate(['/product_details',{ productId: this.crypto.encryp_AES( id_product , this.crypto.secret_key_product_profile ) }]);
    }

    change_nr(){
        this.nr_products++;
    }

    ngOnInit() {

        $(document).ready(function(){


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
