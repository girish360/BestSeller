
import { Component, OnInit ,OnDestroy , ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../../services/data.service';

import {  ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { SetRouterService } from '../../../../share_services/set-router.service';

import { CompanyService } from '../../../services/company.service';

import { ScrollbarService } from '../../../../share_services/scrollbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public carousel_categories: NgxCarousel;

  carousel = Subscription;

  constructor(

      private cs : CompanyService,

      private scroll : ScrollbarService,

      private ds : DataService,

      private cd :ChangeDetectorRef,

      private sr : SetRouterService,

      private route : ActivatedRoute ,

  )
  {
    this.cs.company_properties.company_nav_active = 0;

    this.scroll.window_animate(0,0);
  }


  ngOnInit() {

    this.carousel_categories = {
      grid: { xs: 2, sm: 3, md: 4, lg: 5, all: 0 },

      speed: 500,
      point: {
        visible: false,
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
      animation:'lazy'



    };

  }

  carouselTileOneLoad(){

  }


  onmove_carousel( data_carousel : NgxCarouselStore , current_category ){

    console.log(this.cs.carousel_data);

    if( data_carousel.currentSlide + data_carousel.items  == data_carousel.itemLength

        && current_category.current_page_products < 1 && current_category.total_products > current_category.products_for_page
    ){

      this.ds.update_loader(true);

      this.cs.carousel_data.category_id = current_category.id;

      this.cs.carousel_data.current_page_products = current_category.current_page_products+1;

      this.ds.Http_Get( 'shopping/company/more_products_incarousel' , this.cs.carousel_data ) // make request ......

          .subscribe( //  take success

              data => {

                this.more_products( data['data'] , current_category.id );

                setTimeout(()=>{

                  this.ds.update_loader(false);

                },1000);

              },
              error => console.log( error['data'] ) // take error .....

          );

    }else{

    }

  }

  public more_products( array_data , category_id ){

    for ( let i = 0 ; i < this.cs.categories_products.length ; i++ ){

      if( category_id == this.cs.categories_products[i].id ){


        for( let j = 0 ; j < array_data.products.length ; j++ ){

          this.cs.categories_products[i].products.push( array_data.products[j] );

        }

        this.cs.categories_products[i].current_page_products = array_data.current_page_products;

      } //

    }

    this.cd.markForCheck();

  }

  onScroll() {

    if( (this.cs.carousel_data.current_page_categories+1)*this.cs.carousel_data.categories_for_page < this.cs.carousel_data.total_categories ) {

      this.cs.carousel_data.current_page_products = 0;

      this.cs.carousel_data.current_page_categories = this.cs.carousel_data.current_page_categories + 1;

      this.ds.update_spinner(true);

      this.ds.Http_Get( 'shopping/company/categories', this.cs.carousel_data ) // make request ......

          .subscribe( //  take success

              data => {

                let more_categories = data['data']['categories'];

                this.cs.carousel_data = data['data']['store_data'];

                this.more_categories( more_categories );

              },
              error => console.log(error['data']) // take error .....

          );
    }
  }




  public more_categories( more_categories ){



    for( let i = 0 ; i < more_categories.length ; i++ ){

      this.cs.categories_products.push(more_categories[i]);
    }

    this.cd.markForCheck();

    setTimeout(()=>{

      this.ds.update_spinner(false);

    },1000);


  }

  public  set_router( data ){

    this.sr.set_router( data , this.route ); // set router .....

  }

}
