import { Component, OnInit , OnDestroy} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { DataService } from '../services/data.service';

import { Subscription } from 'rxjs/Subscription';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { ScrollbarService } from '../../share/scrollbar.service';

declare var $ :any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy {

  public product_id:any;

  public carouselTile: NgxCarousel;

  public carousel_image: Array<any> = [];

  my_product: Subscription;

  primary_image = '';

  public company : any ={}; // company details for specific product ..................

  public product_images: any = []; // images for specific product .....................

   public location:any;


    public product_details: any = {};

  constructor(
      private scroll :ScrollbarService ,
      private dataservices :DataService,
      private crypto : EncryptDecryptService ,
      private route: ActivatedRoute ,
      private router: Router
  )
  {



      if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition((position) => {

          });
      } else {
          alert("Geolocation is not supported by this browser.");
      }

      this.route.queryParams.subscribe( params => {

          this.product_id = params.id;

          this.dataservices.update_loader(true);

          this.my_product = this.dataservices.Http_Get( 'shopping/products/product_details',  { 'product_id' : this.product_id} ) // make request ......

              .subscribe( //  take success

                  data => {

                      this.scroll.window(0,0);

                      this.product_details = data['product'];

                      this.company =  this.product_details['company'];

                      setTimeout(()=>{
                          this.dataservices.update_loader(false);
                      },1000);

                      $(function() {

                          $('.zoomImg').remove();

                          $('.primary_image').zoom({ duration: 120, touch: true});
                      });

                  },
                  error => console.log( error ) // take error .....
              );
      });
  }

  ngOnInit() {

      this.carouselTile = {
          grid: {xs: 3, sm: 3, md: 3, lg: 3, all: 0},
          slide: 2,
          speed: 400,
          animation: 'lazy',
          point: {
              visible: false
          },
          load: 1,
          touch: true,
          easing: 'ease'
      };

      $(function(){

          $('.primary_image').zoom({duration:120 ,touch:true});

          var scroll_status = false;

          $(window).scroll(function (e) {

              var scroll_top = $(this).scrollTop();

              if( scroll_top >= 400 ){ // scroll for option_products ................

                  if( scroll_status == false ) {

                      $('.top_product').addClass('new_top_product');

                      $('.new_top_product').hide().slideDown('fast');

                      $('.bodyRight_product').addClass('fixed_bodyRight_product');
                  }

                  scroll_status = true;

              }else{

                  if( scroll_status == true ) {

                      $('.top_product').hide().slideDown('fast');


                      $('.top_product').removeClass('new_top_product');

                      $('.bodyRight_product').removeClass('fixed_bodyRight_product');
                  }

                  scroll_status = false;
              }

          });
      });
  }

  ngOnDestroy(){

      this.my_product.unsubscribe();

  }

    carouselTileOneLoad(){

    }

  show_image( image ){ // chnage primary image......

      this.product_details.product_image = image;

      $(function() {

          $('.zoomImg').remove();

          $('.primary_image').zoom({ duration: 120, touch: true});
      });



  }



}
