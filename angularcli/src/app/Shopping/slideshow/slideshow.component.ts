import { Component, OnInit , OnDestroy , ChangeDetectionStrategy} from '@angular/core';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import {observableToBeFn} from "rxjs/testing/TestScheduler";

declare var $:any;

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent implements OnInit ,OnDestroy {


  public carouselOne: NgxCarousel;

  public images_slide = [

    { src:'1.jpg' , title:'Category1'},
    { src:'2.jpg' , title:'Category2'},
    { src:'1.jpg' , title:'Category3'},
    { src:'2.jpg' , title:'Category4'},
    { src:'1.jpg' , title:'Category5'}

  ];

  ngOnInit() {

    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 500,
      interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            top: 0px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: #004080;
              width: 10px;
          }
        `
      },
      load: 1,
      touch: true,
      loop: true,
      easing: 'ease'

    }

  }
  ngOnDestroy():void{




  }




     public myfunc( event: Event) {
          // carouselLoad will trigger this funnction when your load value reaches
          // it is helps to load the data by parts to increase the performance of the app
         // must use feature to all carousel
     }

     public onmove_item_slide( data: NgxCarouselStore ){



     }




}
