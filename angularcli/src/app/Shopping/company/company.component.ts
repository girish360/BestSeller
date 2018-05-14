import { Component, OnInit ,ViewChild, ElementRef, Input ,OnDestroy ,Renderer,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import {Subscription} from "rxjs/Subscription";

import { NgxCarousel ,NgxCarouselStore } from 'ngx-carousel';

import { ScrollbarService } from '../../share/scrollbar.service';

import { DataService } from '../services/data.service';

import { CompanyService } from './company.service';

import { SetRouterService } from '../services/set-router.service';

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

    public category_items = [

        {src: '1234.jpg', title: 'Category1'},
        {src: 'klo.jpg', title: 'Category2'},
        {src: 'b3.jpg', title: 'Category3'},
        {src: '1234.jpg', title: 'Category4'},
        {src: '1234.jpg', title: 'Category5'},
        {src: '1234.jpg', title: 'Category1'},
        {src: '1234.jpg', title: 'Category5'},
        {src: '1234.jpg', title: 'Category1'},
        {src: '1234.jpg', title: 'Category1'},
        {src: 'klo.jpg', title: 'Category2'},
        {src: 'b3.jpg', title: 'Category3'},
        {src: '1234.jpg', title: 'Category4'},
        {src: '1234.jpg', title: 'Category5'},
        {src: '1234.jpg', title: 'Category1'},
        {src: '1234.jpg', title: 'Category5'},
        {src: '1234.jpg', title: 'Category1'},


    ];

    public comapny_slide: NgxCarousel;

    public images_slide = [

        {id: 1, src: '1.jpg', title: 'Category1'},
        {id: 2, src: '2.jpg', title: 'Category2'},

    ];

    public company_nav:any = [

        {id:0 , name:'Home', icon:'home' ,
            router:{
                path:'home',data:false,relative:true
            }
        },
        {id:1 , name:'Categories', icon:'view_module',
            router:{
                path:'categories',data:false,relative:true
            }
        },

        {id:2 , name:'About', icon:'info',
            router:{
                path:'about',data:false,relative:true
            }
        }
    ];

    constructor(private company: CompanyService,
                private setRouter: SetRouterService,
                private scroll: ScrollbarService,
                private dataservices: DataService,
                private crypto: EncryptDecryptService,
                private route: ActivatedRoute,
                private router: Router,
                private renderer: Renderer,
                private cd: ChangeDetectorRef
    ) {

        this.route.params.subscribe( params => {

            let id = params['name'];

            this.scroll.window(0, 0);

            this.dataservices.update_loader(true);

            if ( this.company.categories_products.length == 0 || this.company.store_data_carousel.company_id != id) {

                this.company.store_data_carousel = {

                    current_page_products: 0,

                    current_page_categories: 0,

                    total_categories: 0,

                    categories_for_page: 5,

                    company_id: id,

                    category_id: false,


                }; // inital  can change later ....


                let en = this.crypto.encryp_AES(JSON.stringify(this.company.store_data_carousel));

                this.dataservices.create_object_request('categories_products', this.company.store_data_carousel);

                this.dataservices.Http_Post(this.dataservices.object_request) // make request ......

                    .subscribe( //  take success

                        data => {

                            if (data['status'] == 'categories_products') {

                                this.company.categories_products = data['data']['categories'];

                                this.company.store_data_carousel = data['data']['store_data'];

                                this.cd.markForCheck();

                                this.company.categories_products_async.next(true);

                            }

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

        });

        this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

            let scroll = this.scroll.window_scroll();

            this.top_slide.top = scroll.top / 1.5 + 'px';

            this.top_slide.opacity = ( 300 - scroll.top  ) / 300;

            if (scroll.top >= 80) {

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

    focus_search_function() { // focus in search

        this.company.company_properties.focus_input_search = !this.company.company_properties.focus_input_search;

    }

    check_focus() {

        this.el.nativeElement.focus();

    }

    hover_nav(){ // enter hover navvv........................

        this.company.company_properties.tmp_nav_active = this.company.company_properties.company_nav_active;

        this.company.company_properties.company_nav_active = -1 ;
    }

    leave_hover_nav(){ // leave from hover navvvvvvvvvvvv..............

        if( this.company.company_properties.tmp_nav_active != -1 ) {

            this.company.company_properties.company_nav_active = this.company.company_properties.tmp_nav_active;
        }

    }

    change_active_nav( nav_index ){ // click on nav, change active nav..................

        this.company.company_properties.tmp_nav_active = -1;

        this.company.company_properties.company_nav_active = nav_index;
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


    carouselTileOneLoad(ev) {

    }

    onmove_carousel(ev) {

    }

    public  set_router(data) {

        this.setRouter.set_router(data, this.route); // set router .....

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
}