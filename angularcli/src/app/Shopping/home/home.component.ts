



import { Component, OnInit ,OnDestroy , ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../services/data.service';

import {  ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { SetRouterService } from '../services/set-router.service';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {


  public carousel_categories: NgxCarousel;

  carousel = Subscription;

  constructor(

      private homeservice : HomeService,

      private dataservices : DataService,

      private cd :ChangeDetectorRef,

      private setRouter : SetRouterService,

      private route : ActivatedRoute ,

  )
  {

      if(   this.homeservice.categories_products.length  == 0) {


          this.dataservices.update_loader(true);

          this.dataservices.create_object_request('categories_products', this.homeservice.store_data_carousel);

          this.dataservices.Http_Post(this.dataservices.object_request) // make request ......

              .subscribe( //  take success

                  data => {

                      if (data['status'] == 'categories_products') {

                          this.homeservice.categories_products = data['data']['categories'];

                          this.homeservice.store_data_carousel = data['data']['store_data'];

                          this.cd.markForCheck();

                      }

                      setTimeout(() => {

                          this.dataservices.update_loader(false);

                      }, 1000);


                  },

                  error => console.log(error['data']) // take error .....

              );
      }

  }



  ngOnDestroy() {

  }

  ngOnInit() {

    this.carousel_categories = {
      grid: { xs: 2, sm: 3, md: 4, lg: 4, all: 0 },
      speed: 500,
      interval: 8000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin-top: -10px;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            background: #6b6b6b;
            padding: 5px;
            margin: 0 3px;
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
          
              border: 2px solid rgba(0, 0, 0, 0.55);
              transform: scale(1.2);
              background: transparent;
              
           }
        `
      },
      load: 2,
      touch: true,
      custom: 'banner',
      animation: 'lazy'
    };

  }

  carouselTileOneLoad(){

  }



  onmove_carousel( data_carousel : NgxCarouselStore , current_category ){

      if( data_carousel.currentSlide + data_carousel.items  == data_carousel.itemLength
        && (current_category.current_page+1)*current_category.products_for_page < current_category.total_products
     ){

      this.dataservices.update_loader(true);

      this.dataservices.create_object_request( 'more_products', { current_page : current_category.current_page+1 , category :current_category.id }  );

      this.dataservices.Http_Post( this.dataservices.object_request ) // make request ......

          .subscribe( //  take success

              data => {

                if( data['status'] == 'more_products' ){

                  this.more_products(data['data'] , current_category.id );

                }
                setTimeout(()=>{

                  this.dataservices.update_loader(false);

                },1000);

              },
              error => console.log( error['data'] ) // take error .....

          );

    }else{

    }

  }

  public more_products( array_data , category_id ){

    for ( let i = 0 ; i < this.homeservice.categories_products.length ; i++ ){

      if( category_id == this.homeservice.categories_products[i].id ){


        for( let j = 0 ; j < array_data.products.length ; j++ ){

          this.homeservice.categories_products[i].products.push( array_data.products[j] );

        }

        this.homeservice.categories_products[i].current_page = array_data.current_page;

      } //

    }

    this.cd.markForCheck();

  }

  onScroll() {

      if( (this.homeservice.store_data_carousel.current_page+1)*this.homeservice.store_data_carousel.categories_for_page < this.homeservice.store_data_carousel.total_categories ) {


     this.homeservice.store_data_carousel.current_page = this.homeservice.store_data_carousel.current_page + 1;

     this.dataservices.update_loader(true);

     this.dataservices.create_object_request('categories_products', this.homeservice.store_data_carousel);

     this.dataservices.Http_Post(this.dataservices.object_request) // make request ......

         .subscribe( //  take success

             data => {

               if (data['status'] == 'categories_products') {

                 let more_categories = data['data']['categories'];

                 this.homeservice.store_data_carousel = data['data']['store_data'];

                 this.more_categories(more_categories);

               }

             },
             error => console.log(error['data']) // take error .....

         );
   }
  }

  public more_categories( more_categories ){

    for( let i = 0 ; i < more_categories.length ; i++ ){

       this.homeservice.categories_products.push(more_categories[i]);
    }

    this.cd.markForCheck();

    setTimeout(()=>{

      this.dataservices.update_loader(false);

    },1000);

  }

  public  set_router( data ){

    this.setRouter.set_router( data , this.route ); // set router .....

  }





}
