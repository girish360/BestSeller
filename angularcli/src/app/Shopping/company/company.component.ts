import { Component, OnInit , Input ,OnDestroy ,Renderer } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import {Subscription} from "rxjs/Subscription";

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { ScrollbarService } from '../../share/scrollbar.service';

import { DataService } from '../services/data.service';

declare var $:any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],

})


export class CompanyComponent implements OnInit , OnDestroy {

    public get_Language:object;

    private company_id:any;

    private id:any;



    private subscription : Subscription;

    cryp :any;

    public button_slide_css:any = {

        transition: '0.2s',

        width: '50px',

        height: '100px',

        opacity: 0.4,

        marginTop: '100px',

        status:false
    };

    public top_slide:any = {'top':0 , 'opacity':1};

    public carousel_category: NgxCarousel;

    public category_items = [

        { src:'1234.jpg' , title:'Category1'},
        { src:'klo.jpg' , title:'Category2'},
        { src:'b3.jpg' , title:'Category3'},
        { src:'1234.jpg' , title:'Category4'},
        { src:'1234.jpg' , title:'Category5'},
        { src:'1234.jpg' , title:'Category1'},
        { src:'1234.jpg' , title:'Category5'},
        { src:'1234.jpg' , title:'Category1'},
        { src:'1234.jpg' , title:'Category1'},
        { src:'klo.jpg' , title:'Category2'},
        { src:'b3.jpg' , title:'Category3'},
        { src:'1234.jpg' , title:'Category4'},
        { src:'1234.jpg' , title:'Category5'},
        { src:'1234.jpg' , title:'Category1'},
        { src:'1234.jpg' , title:'Category5'},
        { src:'1234.jpg' , title:'Category1'},


    ];

    public carouselOne: NgxCarousel;

    public images_slide = [

        { src:'1.jpg' , title:'Category1'},
        { src:'2.jpg' , title:'Category2'},
        { src:'1.jpg' , title:'Category3'},
        { src:'2.jpg' , title:'Category4'},
        { src:'1.jpg' , title:'Category5'}

    ];



    constructor(
        private scroll :ScrollbarService,
        private dataservices:DataService ,
        private crypto : EncryptDecryptService ,
        private route: ActivatedRoute ,
        private router: Router ,
        private renderer : Renderer,
    ) {

        this.subscription = this.route.params.subscribe( params => {

            this.company_id = crypto.decrypt_AES( params['name']  );



        });

        this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

            let scroll = this.scroll.window_scroll();

            this.top_slide.top = scroll.top/1.5 + 'px';

            this.top_slide.opacity =   ( 300 - scroll.top  ) / 300 ;

            if( scroll.top >= 80 ){

                this.button_slide_css.status=true;

            }else{

                this.button_slide_css.status=false;
            }

            if( scroll.top >= 400 ){

                $('.sticky_company').slideDown('fast');

            }else{
                $('.sticky_company').hide();
            }

        }); // end scroll event .............................................................................

        this.dataservices.update_loader(true);

        setTimeout(()=>{

            this.dataservices.update_loader(false);

        },1000);

    }

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

        };

        this.carousel_category = {

            grid: {xs: 3, sm: 3, md: 4, lg: 6, all: 0},

            speed: 500,
            interval: 8000,
            point: {
                visible: false,
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
            easing: 'ease',
            animation: 'lazy'
        }
    }

    ngOnDestroy():void{

        this.subscription.unsubscribe();

    }
    carouselTileOneLoad(ev){

    }

    onmove_carousel(ev){

    }

    public myfunc( event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel
    }

    public onmove_item_slide( data: NgxCarouselStore ){



    }

}
