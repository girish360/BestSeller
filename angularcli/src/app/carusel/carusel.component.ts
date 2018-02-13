import { Component, OnInit } from '@angular/core';

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.css']
})
export class CaruselComponent implements OnInit {

  constructor() { }

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

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
      {src: '../../assets/images/products_image/klo.jpg' ,title:'klodian'},
      {src: '../../assets/images/products_image/klo.jpg' ,title:'gentian'},

    ];

    this.carouselTileOne = {
      grid: { xs: 2, sm: 3, md: 4, lg: 4, all: 0 },
      speed: 600,
      interval: 7000,
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
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

  }

  carouselTileOneLoad(){

  }


}
