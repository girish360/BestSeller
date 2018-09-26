import { Component, OnInit ,OnDestroy,ViewChild, ElementRef, Input  ,Renderer,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';

import {Location} from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import {Subscription} from "rxjs/Subscription";

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { ScrollbarService } from '../../share/scrollbar.service';

import { DataService } from '../services/data.service';

import { CompanyService } from './company.service';

import { SetRouterService } from '../services/set-router.service';

import { ProductService } from '../products/product.service';

declare var $:any;

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class CompanyComponent implements OnInit {

    @ViewChild("focusInput") el: ElementRef;

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

    public company_nav:any = [

        { id:0 , name:'Home', icon:'home' ,

        },
        { id:1 , name:'Categories', icon:'view_module',

        },

        { id:2 , name:'About', icon:'info',

        }

    ];

    constructor(
        private products :ProductService,
        private company: CompanyService,
        private setRouter: SetRouterService,
        private scroll: ScrollbarService,
        private dataservices: DataService,
        private crypto: EncryptDecryptService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private renderer: Renderer,
        private cd: ChangeDetectorRef
    ) {

        this.route.params.subscribe( params =>{

            let company = params.details;

            let company_name;

            let company_id;

            if( company.includes("@") ){

                let index = company.indexOf('@');

                company_name = company.substring( 0, index ) ;

                company_id  = company.substring( index+1, company.length );

                if( !isNaN( company_id ) && ( company_name instanceof String || isNaN( parseInt(company_name) ) ) ){

                    this.products.data_products.type_products = company_id;

                    this.scroll.window(0, 0);

                    this.dataservices.update_loader( true );

                    if ( this.company.categories_products.length == 0 || this.company.company_data_carousel.company_id != company_id ) {

                        this.dataservices.loaded_component = false;

                        this.company.company_data_carousel = {

                            current_page_products: 0,

                            current_page_categories : 0,

                            total_categories : 0,

                            categories_for_page : 5,

                            company_id:company_id,

                            company_name :company_name

                        }; // inital  can change later ....

                        let en = this.crypto.encryp_AES( JSON.stringify( this.company.company_data_carousel ) );

                        this.dataservices.Http_Get( 'shopping/company/load' , this.company.company_data_carousel ) // make request ......

                            .subscribe( //  take success

                                response => {

                                    if( response.data != false ){

                                        this.company.categories_products = response.data.categories_products;

                                        this.company.company_data_carousel = response.data.store_data;

                                        this.company.categories = response.data.categories;

                                        this.company.company_info = response.data.company_info;

                                        this.dataservices.loaded_component = true;

                                    }else{

                                        this.dataservices.not_founded = true;
                                    }

                                    this.cd.markForCheck();

                                    this.dataservices.update_company(true);

                                    setTimeout(() => {

                                        this.dataservices.update_loader(false);

                                    }, 1000);

                                },

                                error => console.log(error['data']) // take error .....

                            );
                    }else{

                        setTimeout(() => {

                            this.dataservices.update_loader(false);

                        }, 1000);
                    }

                }else{ // // does not exists this page name must be string and id must be number ..........

                    this.dataservices.not_founded = true;

                }

            }else{ // does not exists this page @ symbol is not included ..........

                this.dataservices.not_founded = true;
            }



        });

        this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

            let scroll = this.scroll.window_scroll();

            this.top_slide.top = scroll.top / 1.5 + 'px';

            this.top_slide.opacity = ( 300 - scroll.top  ) / 300;

            if ( scroll.top >= 80 ) {

                this.button_slide_css.status = true;

            } else {

                this.button_slide_css.status = false;
            }

            if (scroll.top >= 400) {

                $('.company_sticky').slideDown('fast');

                this.company.company_properties.sticky_company = true;


            } else {

                this.company.company_properties.sticky_company = false;

                $('.company_sticky').hide();
            }
            this.cd.markForCheck();

        }); // end scroll event .............................................................................

        this.dataservices.update_loader(true);

        setTimeout(() => {

            this.dataservices.update_loader(false);

        }, 1000);

        this.on_move_company_slide();

    }

    ngOnDestroy(){

        this.products.data_products.type_products='default'; // when company component destroied type_products should be default ...
    }

    ngOnInit() {

        this.comapny_slide = {
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

    public focus_search_function() { // focus in search

        this.company.company_properties.focus_input_search = !this.company.company_properties.focus_input_search;

    }

    public check_focus() {

        this.el.nativeElement.focus();

    }

    public hover_nav(){ // enter hover navvv........................

        this.company.company_properties.tmp_nav_active = this.company.company_properties.company_nav_active;

        this.company.company_properties.company_nav_active = -1 ;
    }

    public leave_hover_nav(){ // leave from hover navvvvvvvvvvvv..............

        if( this.company.company_properties.tmp_nav_active != -1 ) {

            this.company.company_properties.company_nav_active = this.company.company_properties.tmp_nav_active;
        }

    }

    public change_active_nav( nav_index ){ // click on nav, change active nav..................

        this.company.company_properties.tmp_nav_active = -1;

        this.company.company_properties.company_nav_active = nav_index;
    }

    public carouselTileOneLoad(ev) {

    }

    public onmove_carousel(ev) {

    }

    public  set_router( data ) {

        this.setRouter.set_router( data, this.route); // set router .....

    }

    public myfunc(event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel


    }

    public onmove_item_slide(data: NgxCarouselStore) {

        this.on_move_company_slide();

    }

    public on_move_company_slide() {

        $('.slide_title').css({top: '30px', opacity: 0.1, display: 'none'});

        clearTimeout(this._timeoutslide);

        this._timeoutslide = setTimeout(() => {

            $('.slide_title').css({display: 'block'}).animate({
                top:0,
                opacity:0.9
            })
        },300);
    }

    public click_nav( data_nav ){

        let route;

        if( data_nav.id == 0 ){

            route = { path:'shopping/company/'+this.company.company_info.name+'@'+this.company.company_info.id , data: false  , relative:false } ;

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

                if( this.company.text_search != '' ) {

                    this.set_router({path: 'search', data: false, relative: true});

                }else{

                    this.location.back();

                }


        }, 500) //play with delay

    }


}