import { Component, OnInit,ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

import { EncryptDecryptService } from '../../../share_services/encrypt-decrypt.service';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ...........

import { SetRouterService } from '../../../share_services/set-router.service';

import { SettingsService } from '../../services/settings.service';

import { MenuService } from '../../services/menu.service';

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import 'rxjs/Rx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class MenuComponent  implements OnInit  {

  constructor(
      private cd :ChangeDetectorRef, // cd as ChangeDetectorRef
      private ps:ProductService , // ps as product service  ....
      private sr :SetRouterService ,  // sr as set router
      private route:ActivatedRoute , // route as ActivatedRoute
      private ds:DataService , // ds as data service
      private ms :MenuService, // ms as menu service
      private scroll : ScrollbarService  // scroll as ScrollbarService
  )
  {
    this.scroll.window(0,0);

    this.ds.Http_Get( 'shopping/menu/category', false ) // make request ......

        .subscribe( //  take success

            data => {

              this.ms.categories = data;

              this.cd.markForCheck();

            }
        );
  }

  private top_menus:object = [
    { icon:'home',id:1,name:'Home'   },
    { icon:'star rate',id:2,name:'Expensive'  },
    { icon:'last_page',id:3,name:'Lastest'  },
    { icon:'subscriptions',id:4,name:'Subscriptions' },
    { icon:'whatshot',id:5,name:'Trending'  },
    { icon:'history',id:6,name:'History'  }
  ];

  private subscriptions:object = [
    { icon:'klo.jpg',id:1,name:'Elektronics' },
    { icon:'1234.jpg',id:2,name:'Fashion' },
    { icon:'b3.jpg',id:3,name:'Agricultural Machinery' },
    { icon:'klo.jpg',id:4,name:'Vehicles' }
  ];

  private settings:object = [
    { icon:'settings',id:1,name:'Settings' },
    { icon:'help',id:2,name:'Help' },
    { icon:'feedback',id:3,name:'Feedback' }

  ];

  private user:object = [
    { icon:'language',id:14,name:'Language' },
    { icon:'person pin',id:15,name:'User Panel' }


  ];



  click_top_menu( id_top_menu ){

    if( id_top_menu == '1'){

      this.set_router( { path:'shopping' , data:false ,relative:false } );

      return;
    }
    else if(  id_top_menu == '2' ){
      // user clicked expensice
      return;
    }
    else if(  id_top_menu == '3' ){
      // user clicked today
      return;
    }
    else if(  id_top_menu == '4' ){
      // user clicked subscriptions
      return;
    }


  }

  public set_router( data ){

    this.sr.set_router( data , this.route );

  }

  click_settings( item ){

    if( item.id == 1){

      this.ps.more_properties.selectedIndex = 1;

    }else if(item.id == 2){

      this.ps.more_properties.selectedIndex = 2;

    }else if(item.id == 3){

      this.ps.more_properties.selectedIndex = 3;

    }

    if( this.ps.active_button != 0){

      this.ps.show_dropdown_button(0);

    }

  }

  check_subscribes( company ){

    this.ds.update_body(false);

    let company_path = 'shopping/company/'+company.name+'@'+company.id;

    this.set_router( { path:company_path, data: false  , relative:false } );

  }

  ngOnInit(){

  }

  category_products( category ){

   let router = { path:'shopping/products/'+category.name , data:
        [
          {keyparams :'id', params:  category.id },
          {keyparams :'page', params:  1 }

        ] , relative:false };

    this.set_router( router );

  }

}
