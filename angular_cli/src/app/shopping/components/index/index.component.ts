import {  Component,DoCheck,OnInit,Renderer ,ElementRef ,AfterViewInit,ChangeDetectorRef, HostListener} from '@angular/core';

import {Observable} from 'rxjs/Rx'; // Angular 5

import { trigger, sequence, transition, animate, style, state,keyframes } from '@angular/animations';

declare var $:any;

declare var Fingerprint2: any;

import { DataService } from '../../services/data.service';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ....................

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import { SettingsService } from '../../services/settings.service';

import { MenuService } from '../../services/menu.service';

import { Router, ActivatedRoute ,Event,NavigationStart,NavigationEnd,NavigationError,NavigationCancel } from '@angular/router';

import { IndexService } from '../../services/index.service';


import { SearchService } from '../../services/search.service';

import { SwipeMenuService } from '../../services/swipe-menu.service';

import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],

})
export class IndexComponent implements OnInit {



  public get_Language:object={};

  private wishList_products = [];

  public innerWidth;

  constructor(
      private scroll : ScrollbarService,
      private ps :ProductService,
      private elementRef : ElementRef,
      private renderer : Renderer,
      private ds: DataService,
      private search:SearchService,
      private is:IndexService,
      private router: Router,
      private swipe:SwipeMenuService,

  ) {

    this.router.events.subscribe( ( event:Event )  =>{

      if( event instanceof NavigationStart ){

        this.ds.update_loader(true);
      }

      if( event instanceof NavigationEnd || event instanceof NavigationCancel) {

        setTimeout(() => {

          this.ds.update_loader(false);

        }, 1000);
      }

    });

    this.get_Language = this.ds.language;

    this.renderer.listen('window', 'scroll', (evt) => { // scroll event in company page ..................

      let scroll = this.scroll.window_scroll();

      this.ps.close_options();

      this.is.check_footer();


    });

  }

  ngDoCheck() {

  }

  show_footer(){

  }



  ngAfterViewInit() {

    this.renderer.listen( this.elementRef.nativeElement, 'click', (event) => {

      if ( event.target.closest('.notCloseDropdawnClient') == null) {

        this.ps.hide_dropdown_button(4);

      }

      if ( event.target.closest('.notCloseDropdawnNotify') == null) {

        this.ps.hide_dropdown_button(3);

      }

      if ( event.target.closest('.notCloseDropdawnMore') == null) {

        this.ps.hide_dropdown_button(0);

      }

      if ( event.target.closest('.notCloseDropdawnFavorite') == null ) {

        this.ps.hide_dropdown_button(2);

      }

      if ( event.target.closest('.notCloseDropdawnSearch') == null) {

        this.search.hide_search_content();

      }

      if ( event.target.closest('.notCloseDropdawnCard') == null ) {

        this.ps.hide_dropdown_button(1);

      }

      if ( event.target.closest('.product_options') == null ) {


        this.ps.close_options();

      }

      if( event.target.closest('.swipe_content_menu') == null ){

        this.swipe.hide_menu_content(-100);
      }

      if ( event.target.closest(' .notCloseDropdawnFavorite , .notClosepointerHeader ,.notCloseDropdawnCard ,.notCloseDropdawnClient' ) == null  ||
          event.target.closest('.logout') != null ) {

        $('.write_icon_header').css('color', 'slategrey');

        this.ps.refresh_button_properties();

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
