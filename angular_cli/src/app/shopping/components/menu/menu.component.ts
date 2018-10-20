import { Component, OnInit , AfterViewInit , Input, NgZone ,DoCheck,ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';

import { RouterModule, Router , ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

import { EncryptDecryptService } from '../../../share_services/encrypt-decrypt.service';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ...........

import { SetRouterService } from '../../../share_services/set-router.service';

import { SettingsService } from '../../services/settings.service';

import { MenuService } from '../../services/menu.service';

import { ScrollbarService } from '../../../share_services/scrollbar.service';

import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class MenuComponent  implements OnInit  {

  constructor(
      private cd :ChangeDetectorRef,
      private productsService:ProductService ,
      private setRouter :SetRouterService ,
      private route:ActivatedRoute ,
      private dataservices:DataService ,
      private menuservice :MenuService,
      private router:Router ,
      private crypto: EncryptDecryptService,
      private Settings : SettingsService,
      private scroll : ScrollbarService
  )
  {
    this.scroll.window(0,0);

    this.dataservices.Http_Get( 'shopping/menu/category', false ) // make request ......

        .subscribe( //  take success

            data => {

              this.menuservice.categories = data;

              this.cd.markForCheck();



            },

            error => console.log(error) // take error .....

        );

  }



  public id_company:any;

  private top_menus:object = [
    { icon:'home',id:'1',name:'Home'   },
    { icon:'star rate',id:'2',name:'Expensive'  },
    { 'icon':'last_page','id':'3','name':'Lastest'  },
    { 'icon':'subscriptions','id':'4','name':'Subscriptions' },
    { 'icon':'whatshot','id':'5','name':'Trending'  },
    { 'icon':'history','id':'6','name':'History'  }
  ];

  private subscriptions:object = [
    { 'icon':'klo.jpg','id':'1','name':'Elektronics' },
    { 'icon':'1234.jpg','id':'2','name':'Fashion' },
    { 'icon':'b3.jpg','id':'3','name':'Agricultural Machinery' },
    { 'icon':'klo.jpg','id':'4','name':'Vehicles' }
  ];

  private settings:object = [
    { 'icon':'settings','id':'11','name':'Settings' },
    { 'icon':'help','id':'12','name':'Help' },
    { 'icon':'feedback','id':'13','name':'Feedback' }

  ];

  private user:object = [
    { 'icon':'language','id':'14','name':'Language' },
    { 'icon':'person pin','id':'15','name':'User Panel' }


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

    this.setRouter.set_router( data , this.route );

  }

  check_subscribes( company ){

    this.dataservices.update_body(false);

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
