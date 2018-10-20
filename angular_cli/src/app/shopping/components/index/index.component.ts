import {  Component,DoCheck,HostListener,OnInit,Renderer ,ElementRef ,AfterViewInit,ChangeDetectorRef, HostListener} from '@angular/core';

import {Observable} from 'rxjs/Rx'; // Angular 5

import { trigger, sequence, transition, animate, style, state,keyframes } from '@angular/animations';

declare var $:any;

import { DataService } from '../../services/data.service';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ....................

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import { SettingsService } from '../../services/settings.service';

import { MenuService } from '../../services/menu.service';

import { Router, ActivatedRoute ,Event,NavigationStart,NavigationEnd,NavigationError } from '@angular/router';

import { IndexService } from '../../services/index.service';


import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('openClose', [
      state('closed', style({display:'none'}),{params:{top:0 , left:0 , beforeTop:0}}),
      state('open', style({top:'{{top}}px', left:'{{left}}px'}),{params:{top:0 , left:0 , beforeTop:0}}),

      transition('open => closed', [
        style({ opacity: '1'}),
        sequence([
          animate("0.1s ease", style({  opacity: '0.1',  transform: 'translateY(50px)'  })),
        ])
      ]),

      transition('closed => open', [
        style({ opacity: '0',   top:'{{beforeTop}}px', left:'{{left}}px' }),
        sequence([
          animate("0.2s ease", style({  opacity: '1', transform: 'translateY(-50px)'  }))
        ])
      ])
    ]),

  ]
})
export class IndexComponent implements OnInit {


  @HostListener("mouseup") public pressup_swipemenu(){
    this.press_swipe_menu = false;
  }

  public status_scroll_up:any= false;

  public hover_settings:any = false;

  public style_settings_icon:any={ 'transform': 'rotate( 0deg )' };

  public deg_rotate_settings_icon: any = 0;

  public content_settings:any = false;

  public get_Language:object={};

  private wishList_products = [];

  public innerWidth;

  public press_swipe_menu:boolean = false;

  constructor(
      private scroll : ScrollbarService,
      private productsService :ProductService,
      private elementRef : ElementRef,
      private renderer : Renderer,
      private dataservices: DataService,
      private searchService:SearchService,
      private indexService:IndexService,
      private menuservice : MenuService,
      private settings: SettingsService,
      private router: Router,

  ) {

    this.router.events.subscribe( ( event:Event )  =>{

      if( event instanceof NavigationStart ){

        this.dataservices.update_loader(true);
      }

      if( event instanceof NavigationEnd ) {

        setTimeout(() => {

          this.dataservices.update_loader(false);

        }, 1000);
      }

    });

    this.get_Language = this.dataservices.language;

    this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

      let scroll = this.scroll.window_scroll();

      this.productsService.close_options();

       if( scroll.top >= 50 ){

         this.status_scroll_up = true;


       }else{

         this.status_scroll_up = false;
       }

       this.indexService.check_footer();


    });

    Observable.interval(20 * 2).subscribe(x => {
      this.get_deg_rotate();
    });

  }

  ngDoCheck() {

  }

  show_footer(){

  }

  setting_menu(){

    if( this.settings.menu == false ){

      this.menuservice.menu.next(true);

    }else{

      this.menuservice.menu.next(false);
    }

    this.settings.menu = !this.settings.menu;

    this.dataservices.Http_Get( 'shopping/settings/change_menu' , false ) // make request ......

        .subscribe( //  take success

            data => {

             let d =  data['data'];

            },
            error => console.log( error['data'] ) // take error .....

        );

  }

  go_top(){

    this.scroll.window_animate(0,0);

  }

  get_deg_rotate(){

    if( this.deg_rotate_settings_icon < 360 ){

      this.deg_rotate_settings_icon =  this.deg_rotate_settings_icon +8;

     this.style_settings_icon = { 'transform': 'rotate( '+ this.deg_rotate_settings_icon +'deg )' };

    }else{

      this.deg_rotate_settings_icon = 0;

      this.style_settings_icon = { 'transform': 'rotate( '+ this.deg_rotate_settings_icon +'deg )' };
    }

  }

  show_settings(){

  }

  out_hover_setting(){

    this.hover_settings = false;


  }
  in_hover_setting(){
    this.hover_settings = true;
  }

  check_settings(){

    this.hover_settings = false;

    this.content_settings =  !this.content_settings;


  }

  public clientX;

  public swipe_menu_style :any = {};

  swipe_menu( event ){

    

    let move_clientX = this.clientX - (event.srcEvent.clientX+100);

  console.log(move_clientX);


     if( move_clientX <= 0 ){
       this.show_menu_content(move_clientX);
     }

  }

  pressdown_menu(event){

    this.press_swipe_menu = true;

    this.clientX = event.srcEvent.clientX;
  }
  pressup_menu(){

    console.log('up');

    this.press_swipe_menu = false;


  }

  public hide_menu_content(clientx){
    this.swipe_menu_style  = { right:clientx+'px'};
  }

  public show_menu_content(clientx){
    this.swipe_menu_style  = { right:clientx+'px' };
  }


  ngAfterViewInit() {

    this.renderer.listen( this.elementRef.nativeElement, 'click', (event) => {

      if ( event.target.closest('.notCloseDropdawnLanguage') == null) {

        this.productsService.hide_dropdown_button('dropmore','.dropdown_more .mat-tab-body-wrapper');

      }

      if ( event.target.closest('.notCloseDropdawnFavorite') == null ) {

        this.productsService.hide_dropdown_button('dropfavorites','.dropfavorites  .wishlist_component  .body_div');

      }

      if ( event.target.closest('.notCloseDropdawnSearch') == null) {

        this.searchService.hide_search_content();

      }

      if ( event.target.closest('.notCloseDropdawnCard') == null ) {

        this.productsService.hide_dropdown_button('dropcard','.body_cart');

      }

      if ( event.target.closest('.product_options') == null ) {

        this.productsService.close_options();

      }

      if( event.target.closest('.swipe_content_menu') == null ){

        this.hide_menu_content(-100);

      }

      if ( event.target.closest(' .notCloseDropdawnFavorite , .notClosepointerHeader ,.notCloseDropdawnCard' ) == null ) {

        $('.treguesi').css({display: 'none'});

        this.productsService.refresh_button_properties();

        $('.write_icon_header').css('visibility', 'visible');

      }

    })
  }

  ngOnInit() {




    $(document).ready(function () {

      var activ_category=0;
      var on_hover_category = 0;
      var name=0;
      var offset = 0;
      var id='';
      var width = $(window).width();
      var koha = 0;
      var stay_over_elemnt = 0;
      var active_category=0;
      var nrclick_category='fillimi';
      var menu_status=0;
      var Server_path_http='http://localhost/bestseller/Core_Php/http/route.php'; //  path where go requests .. ..
      var Data = ''; // data is to send data in server .........
      var Status = ''; // status is for identify  what kind of http is requests post or get
      var Response;  // response from server ....


      $('body').on({ // moseover  category and subscribe for remove class when use isn't over element from category and subscribe .....................
        mouseover: function(e){
          if($(e.target).closest('.categorytype, .pointer_catego, .subcat, .company_subscribe,.morecontact,.writecategory').length==0){
            $('.opacity_hover_category_sub,.opacity_border_pointer').fadeOut();
            $('.pointer_catego').fadeOut();
            $('.bordertypecat').removeClass('animateborderleft');
            $('.subcat , .company_subscribe').removeClass('subscribe_add_hover');
            $('.subcat ,.company_subscribe').find('.bordertypecat').removeClass('visibleborder');

          }
          if($(e.target).closest('.morecontact,.writecategory').length>0){
            $('.pointer_catego').fadeOut();
            $('.bordertypecat').removeClass('animateborderleft');
            $('.subcat , .company_subscribe').removeClass('subscribe_add_hover');
            $('.subcat ,.company_subscribe').find('.bordertypecat').removeClass('visibleborder');

          }
          if( $(e.target).closest('.on_hover_category').length==0 && $(e.target).closest('.pointer_catego').length==0){
            koha=0;
            stay_over_elemnt=0;
          }
          if($(e.target).closest('.categorywidth, .pointer_catego').length==0){
            $('.categorytype').removeClass('categorytype_add_hover');
          }

        }
      }); // end mouseover category and subscribe .................................................................





//mouse hover categorytype..............................
      $('body').on('mouseenter' ,'.categorytype',function(){ // add class for style .................


        $('.bordertypecat').removeClass('animateborderleft');

        $(this).find('.bordertypecat').addClass('animateborderleft');

        // end add..........
      });
// end mouse hover categorytype .......................................
// mouse hover subcategory......... add class for style ...............
      $('body').on('mouseenter','.subcat ',function(){

        $('.bordertypecat').removeClass('animateborderleft');

        $(this).find('.bordertypecat').addClass('animateborderleft');

      });



      var active_click_category;
// start click to show subcategory ........................
      $('body').on('click','.underline',function(){ //

        var id =$(this).attr('id');

        menu_mini_navigation(id);

        category_click( id  , $(this)  ,active_click_menu_navgation );

      });  // end click show  subcategory

      var active_click_menu_navgation;
      $('body').on('click' , '.menu_navigation',function(){

        var id = $(this).attr('id');

        menu_mini_navigation(id);

        menu_navigation(  id , active_click_category  );

      });

      $('body').on('click' , '.menu_mini_navigation',function(){

        var  id = $(this).attr('id');

        menu_mini_navigation(id);

        menu_navigation( id , active_click_category);

      });


      function  category_click( id , this_click , active_click_menu_navgation ){

        if (id == nrclick_category) { // check if the click is again on one category ..........
          $('.sub' + id).slideUp('fast');
          nrclick_category = 'fillimi';
          active_click_category = '';
          $('.categorytype').removeClass("categorytype_newBackground");
          $('.bordertypecat').removeClass("new_border_cat");

          $('.moresubcategory').removeClass("moresub");
          $('.exitsubcategory').removeClass("exitsub");

          $(active_click_menu_navgation).find('.categorytype').addClass("categorytype_newBackground");
          $(active_click_menu_navgation).find('.bordertypecat').addClass("new_border_cat");
          $(active_click_menu_navgation).find('.moresubcategory').addClass("moresub");
          $(active_click_menu_navgation).find('.exitsubcategory').addClass("exitsub");
        }
        else {

          active_click_category = this_click;
          activ_category = id;
          $('.subcategory').slideUp('fast');
          $('.sub' + id).slideDown('fast');
          active_category = id; // active category varioable ...............
          nrclick_category = id;

          $('.categorytype').removeClass("categorytype_newBackground");
          $('.bordertypecat').removeClass("new_border_cat");
          $('.moresubcategory').removeClass("moresub");
          $('.exitsubcategory').removeClass("exitsub");

          $(this_click).find('.categorytype').addClass("categorytype_newBackground");
          $(this_click).find('.bordertypecat').addClass("new_border_cat");
          $(this_click).find('.moresubcategory').addClass("moresub");
          $(this_click).find('.exitsubcategory').addClass("exitsub");

          $(active_click_menu_navgation).find('.categorytype').addClass("categorytype_newBackground");
          $(active_click_menu_navgation).find('.bordertypecat').addClass("new_border_cat");
          $(active_click_menu_navgation).find('.moresubcategory').addClass("moresub");
          $(active_click_menu_navgation).find('.exitsubcategory').addClass("exitsub");

        }




      }

      function menu_navigation( this_click  , active_click_category ){

        active_click_menu_navgation = this_click;

        $('.categorytype').removeClass("categorytype_newBackground");
        $('.bordertypecat').removeClass("new_border_cat");
        $('.mat-icon').removeClass("new_color_mat_icon");
        $('.exitsubcategory').removeClass("exitsub");
        $('.namecategory').removeClass("new_color_namecategory");

        $(active_click_category).find('.categorytype').addClass("categorytype_newBackground");
        $(active_click_category).find('.bordertypecat').addClass("new_border_cat");
        $(active_click_category).find('.exitsubcategory').addClass("exitsub");

        $('.menu_navigation'+this_click).find('.categorytype').addClass("categorytype_newBackground");
        $('.menu_navigation'+this_click).find('.bordertypecat').addClass("new_border_cat");
        $('.menu_navigation'+this_click).find('.mat-icon').addClass("new_color_mat_icon");
        $('.menu_navigation'+this_click).find('.exitsubcategory').addClass("exitsub");
        $('.menu_navigation'+this_click).find('.namecategory').addClass("new_color_namecategory");
      }

      function menu_mini_navigation( id_mini_menu ){

        $('.button-fab-menu-right').removeClass('active_mini_menu_button');
        $('.mat-icon').removeClass("active_mini_menu_button_icon");

        $('.menu_mini_navigation'+id_mini_menu).find('.button-fab-menu-right').addClass("active_mini_menu_button");
        $('.menu_mini_navigation'+id_mini_menu).find('.mat-icon').addClass("active_mini_menu_button_icon");



      }

    }); // end document ready.................................................................................
  }

}
