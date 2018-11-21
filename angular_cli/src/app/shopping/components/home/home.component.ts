
import { Component, OnInit ,OnDestroy ,HostListener, ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';

import {  ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { SetRouterService } from '../../../share_services/set-router.service';

import { HomeService } from '../../services/home.service';

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import { IndexService } from '../../services/index.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {





    public carousel_categories: NgxCarousel;

    carousel = Subscription;

    constructor( // constructor initial data

        private scroll : ScrollbarService,

        private hs : HomeService,

        private ds : DataService,

        private cd :ChangeDetectorRef,

        private sr : SetRouterService,

        private route : ActivatedRoute ,

        private is:IndexService

    )
    {
      this.route.data.subscribe( response => {

          this.scroll.window(0, 0);

          if ( this.ds.resolve ){ // response from  resolve .....

              this.ds.loaded_component = true;

              if( response.home ){  // response from database is is not false this company exist

                  this.hs.categories_products = response.home['categories'];

                  this.hs.store_data_carousel = response.home['store_data'];

                  this.ds.not_founded = false;

              }else{ // dont exists  this company .......

                  this.ds.not_founded = true;
              }

              this.ds.update_products(true);

              this.cd.markForCheck();

          } else {

              this.ds.loaded_component = false;

              this.hs.load_home().subscribe( response =>{

                  this.ds.loaded_component = true;

                  if( response ){

                      this.ds.not_founded = false;

                      this.hs.categories_products = response['categories'];

                      this.hs.store_data_carousel = response['store_data'];

                  }else{

                      this.ds.not_founded = true;
                  }

                  this.ds.update_products(true);

                  this.cd.markForCheck();

              });
          }
      });


  } // end constructor ...................................


    ngOnDestroy() {
    }


    ngOnInit() {


        this.carousel_categories = { // initial carousel .....................
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
     
        `},
            load: 2,
            touch: true,
            animation:'lazy'
        };

  } // end ngOnInit.....................................

    carouselTileOneLoad(){

  }

    onmove_carousel( data_carousel : NgxCarouselStore , current_category ){ // onmove_carousel function is called when user is waching more products  in specific category

        if( data_carousel.currentSlide + data_carousel.items  ==

          data_carousel.itemLength &&

          current_category.current_page_products < 1
      ) // check if this category have more products in server and is less than 1
      {

      this.ds.update_loader(true);

      this.hs.store_data_carousel.category_id = current_category.id;

      this.hs.store_data_carousel.current_page_products = current_category.current_page_products+1;

      this.ds.Http_Get( 'shopping/home/more_products_incarousel',  this.hs.store_data_carousel  ) // make request ......

          .subscribe( //  take success

              data => {

                  this.more_products( data , current_category.id );

                  setTimeout(()=>{

                      this.ds.update_loader(false);

                  },1000);

              },
              error => console.log( error ) // take error .....

          );

    }else{

    } //

  } // end onmove_scroll ....................

    public more_products( array_data , category_id ){ // add more products in specific category..........................

      for ( let i = 0 ; i < this.hs.categories_products.length ; i++ ){

          if( category_id == this.hs.categories_products[i].id ){

              for( let j = 0 ; j < array_data.products.length ; j++ ){

                  this.hs.categories_products[i].products.push( array_data.products[j] );

              }
              this.hs.categories_products[i].current_page_products = array_data.current_page_products;

          } // end if
      } // end loop

      this.cd.markForCheck(); // make refresh component ..................................

  } //end more_products

    onScroll() {  //  onscroll function is called when scroll is bottom............

      if ( ( this.hs.store_data_carousel.current_page_categories+1 ) * this.hs.store_data_carousel.categories_for_page
          < this.hs.store_data_carousel.total_categories
      )  // check if have more category in server ......................
      {

          this.hs.store_data_carousel.current_page_products = 0;

          this.hs.store_data_carousel.current_page_categories = this.hs.store_data_carousel.current_page_categories + 1;

          this.ds.update_spinner(true);

          this.ds.Http_Get( 'shopping/home/categories' , this.hs.store_data_carousel ) // make request ......

              .subscribe( //  take success

                  data => {

                      let more_categories = data['categories'];

                      this.hs.store_data_carousel = data['store_data'];

                      this.more_categories( more_categories );

                  },
                  error => console.log(error) // take error .....

              );
      }
  } // end onScroll ..............

    public more_categories( more_categories ){   // add more categories ..........................

        for( let i = 0 ; i < more_categories.length ; i++ ){

            this.hs.categories_products.push(more_categories[i]);
        }

        this.cd.markForCheck();

        setTimeout(()=>{

            this.ds.update_spinner(false);

            this.is.check_footer();

        },50);

    } // end more_categories

    public  set_router( data ){  // set router ..............................

        this.sr.set_router( data , this.route ); // set router .....

  } // end set_rouer





}
