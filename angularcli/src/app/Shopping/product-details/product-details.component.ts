import { Component, OnInit , OnDestroy} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { DataService } from '../services/data.service';

import { Subscription } from 'rxjs/Subscription';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

declare var $ :any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy {

  public product_id:any;

    public carouselTileOne: NgxCarousel;

    public carouselTileOneItems: Array<any> = [];

  my_product: Subscription;

  public company : any ={}; // company details for specific product ..................

  public product_images: any = []; // images for specific product .....................


    public product_details: any = {};

  constructor( private dataservices :DataService,  private crypto : EncryptDecryptService , private route: ActivatedRoute , private router: Router  ) {

    this.route.params.subscribe( params => {

        this.product_id = params['name'] ;

        this.dataservices.update_loader(true);

        this.dataservices.create_object_request( 'product_details',  this.product_id  );

        this.my_product = this.dataservices.Http_Post( this.dataservices.object_request ) // make request ......

            .subscribe( //  take success

                data => {

                    if ( data['status'] == 'product_details' ) {

                        this.product_details = data['data']['product'];

                        this.company =  this.product_details['company'];

                        this.dataservices.update_loader(false);
                    }
                },
                error => console.log( error['data'] ) // take error .....

            );

    });
  }

  ngOnInit() {

      this.carouselTileOneItems = [
          {src: '../../assets/images/products_image/klo.jpg' ,title:'klodian'},
          {src: '../../assets/images/products_image/klo.jpg' ,title:'gentian'},
          {src: '../../assets/images/products_image/1234.jpg' ,title:'roland'},
          {src: '../../assets/images/products_image/b3.jpg' ,title:'bedri'},
          {src: '../../assets/images/products_image/klo.jpg' ,title:'klodian'},
          {src: '../../assets/images/products_image/klo.jpg' ,title:'gentian'},
          {src: '../../assets/images/products_image/1234.jpg' ,title:'roland'},
          {src: '../../assets/images/products_image/b3.jpg' ,title:'bedri'},



      ];



      this.carouselTileOne = {
          grid: { xs: 1, sm: 1, md: 1, lg: 3, all: 0 },
          speed: 500,
          interval: 8000,
          point: {
              visible: false,
          },
          load: 1,
          touch: true,
          custom: 'banner',
          animation: 'lazy'
      };

      $(function(){

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

}
