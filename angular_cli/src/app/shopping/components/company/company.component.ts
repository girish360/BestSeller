import { Component, OnInit ,OnDestroy,ViewChild, ElementRef, Input  ,Renderer,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';

import {Location} from '@angular/common';

import { Router, ActivatedRoute ,Event,NavigationStart,NavigationEnd,NavigationError } from '@angular/router';

import { EncryptDecryptService } from '../../../share_services/encrypt-decrypt.service';

import {Subscription} from "rxjs/Subscription";

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import { DataService } from '../../services/data.service';

import { CompanyService } from '../../services/company.service';

import { SetRouterService } from '../../../share_services/set-router.service';

import { ProductService } from '../../services/product.service';

import { SearchService} from '../../services/search.service';

declare var $:any;

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class CompanyComponent implements OnInit {

    @ViewChild("focusInput") el: ElementRef;

    @ViewChild("movecarousel") carousel: ElementRef;

    private _timeoutslide: number;

    public button_slide_css: any = {

        transition: '0.2s',

        width: '50px',

        height: '100px',

        opacity: 0.4,

        marginTop: '100px',

        status: false
    };

    public top_slide: any = {'top': 0, 'opacity': 1};

    public carousel_category: NgxCarousel;

    public comapny_slide: NgxCarousel;

    private _timeoutId: number;

    private currentSlide=0;

    private currentSlide_category = 0;

    private sticky :any ={visibility:'hidden'};

    public company_nav:any = [

        { id:0 , name:'Home', icon:'home' ,

        },
        { id:1 , name:'Categories', icon:'view_module',

        },

        { id:2 , name:'About', icon:'info',

        }

    ];


    constructor(
        private ps :ProductService,
        private cs: CompanyService,
        private sr: SetRouterService,
        private scroll: ScrollbarService,
        private ds: DataService,
        private search: SearchService,
        private crypto: EncryptDecryptService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private renderer: Renderer,
        private cd: ChangeDetectorRef,
        private er : ElementRef
    ) {

        this.route.data.subscribe( response => {

           this.currentSlide = 0;

           this.currentSlide_category = 0;

            if ( this.ds.resolve ){ // response from  resolve .....

                this.ds.loaded_component = true;

                if( response.company ){  // response from database is is not false this company exist

                    this.cs.categories = response.company['categories'];

                    this.cs.company = response.company['company_info'];

                    this.cs.categories_products = response.company['categories_products'];

                    this.ds.not_founded = false;

                }else{ // dont exists  this company .......

                    this.ds.not_founded = true;
                }

                this.ds.update_company(true);

                this.cd.markForCheck();

            } else {

                this.ds.loaded_component = false;

                this.route.params.subscribe( params => {

                    this.cs.load_company( {params : params } ).subscribe( response =>{

                        this.ds.loaded_component = true;

                        if( response ){

                            this.ds.not_founded = false;

                            this.cs.categories = response['categories'];

                            this.cs.company = response['company_info'];

                            this.cs.categories_products = response['categories_products'];

                        }else{

                            this.ds.not_founded = true;
                        }

                        this.ds.update_company(true);

                        this.cd.markForCheck();

                        this.search.hide_search_content();

                    });
                });
            }

        });

        this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

            let scroll = this.scroll.window_scroll();

            if( scroll.top > 300 ){

                this.sticky.visibility = 'visible';


            }else{

                this.sticky.visibility = 'hidden';

            }


                this.top_slide.top = scroll.top / 2 + 'px';




            this.top_slide.opacity = ( 300 - scroll.top  ) / 300;

            if ( scroll.top >= 80 ) {

                this.button_slide_css.status = true;

            } else {

                this.button_slide_css.status = false;
            }

            this.cd.markForCheck();

        }); // end scroll event .............................................................................

        this.on_move_company_slide();

    }


    ngOnDestroy(){

        this.ps.data_products.type_products='default'; // when company component destroied type_products should be default ...
    }

    get_style_sticky(){
       return Object.assign( this.ps.mobile_sticky_style, this.sticky );
    }

    ngOnInit() {

        this.comapny_slide = {
            grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
            slide: 1,
            speed: 500,
            interval: 6000,
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
            interval: 10000,
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

    public focus_search_function() { // focus in search

        this.cs.company_properties.focus_input_search = !this.cs.company_properties.focus_input_search;

    }

    public check_focus() {

        this.el.nativeElement.focus();

    }

    public hover_nav(){ // enter hover navvv........................

        this.cs.company_properties.tmp_nav_active = this.cs.company_properties.company_nav_active;

        this.cs.company_properties.company_nav_active = -1 ;
    }

    public leave_hover_nav(){ // leave from hover navvvvvvvvvvvv..............

        if( this.cs.company_properties.tmp_nav_active != -1 ) {

            this.cs.company_properties.company_nav_active = this.cs.company_properties.tmp_nav_active;
        }

    }

    public change_active_nav( nav_index ){ // click on nav, change active nav..................

        this.cs.company_properties.tmp_nav_active = -1;

        this.cs.company_properties.company_nav_active = nav_index;
    }

    public carouselTileOneLoad(ev) {

    }

    public move_carousel_categories(data : NgxCarouselStore) {

        this.currentSlide_category = data.currentSlide;

    }

    public  set_router( data ) {

        this.sr.set_router( data, this.route); // set router .....

    }

    public myfunc( event: NgxCarouselStore ) {



        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel


    }

    public move_carousel_slide( data:NgxCarouselStore ) {

        this.on_move_company_slide();

        this.currentSlide = data.currentSlide;
    }

    public on_move_company_slide() {

        $('.slide_title').css({top: '30px', opacity: 0.1, display: 'none'});

        if( this._timeoutslide ){

            clearTimeout(this._timeoutslide);

        }

        this._timeoutslide = setTimeout(() => {

            $('.slide_title').css({display: 'block'}).animate({
                top:0,
                opacity:0.9
            })
        },500);
    }

    public click_nav( data_nav ){


        let route;

        if( data_nav.id == 0 ){

            route = { path:'shopping/company/'+this.cs.company.name+'@'+this.cs.company.id , data: false  , relative:false } ;

        }else if(data_nav.id == 1){

            route = { path:'categories/' ,data:false,relative:true};

        }else if(data_nav.id == 2){

            route = {path:'about/',data:false,relative:true};

        }

        this.set_router( route );

    }

    public on_search(){

        clearTimeout( this._timeoutId );

        this._timeoutId = setTimeout(() => {

                if( this.cs.text_search != '' ) {

                    this.set_router({path: 'search', data: false, relative: true});

                }else{

                    this.location.back();

                }


        }, 500) //play with delay

    }


}