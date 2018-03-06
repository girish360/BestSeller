import { Component, OnInit , AfterViewInit , Input, NgZone ,DoCheck  } from '@angular/core';

import { RouterModule, Router , ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data.service';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { SetRouterService } from '../services/set-router.service';

@Component({
  selector: 'app-categorys-subscribes',
  templateUrl: './categorys-subscribes.component.html',
  styleUrls: ['./categorys-subscribes.component.css']
})
export class CategorysSubscribesComponent implements OnInit , DoCheck {

  constructor( private setRouter :SetRouterService , private route:ActivatedRoute , private dataservices:DataService , private router:Router , private crypto: EncryptDecryptService) {

    let category = this.dataservices.Make_Request_InServer( 'category', 'category' );

     category.then(response =>{

        this.categorys = response;

     });

  }

  ngDoCheck(){


  }

  public categorys:any = [];

  public id_company:any;

  

  private top_menus:object = [
    { icon:'home',id:'1',name:'Home'   },
    { icon:'star rate',id:'2',name:'Expensive'  },
    { 'icon':'today','id':'3','name':'Today'  },
    { 'icon':'subscriptions','id':'4','name':'Subscriptions' },
    { 'icon':'whatshot','id':'5','name':'Trending'  },
    { 'icon':'history','id':'6','name':'History'  }
  ];

  private subscriptions:object = [
    { 'icon':'klo.jpg','id':'7','name':'Electronics' },
    { 'icon':'1234.jpg','id':'8','name':'Phone' },
    { 'icon':'b3.jpg','id':'9','name':'Samsung' },
    { 'icon':'klo.jpg','id':'10','name':'T-shirt' }
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

    let encryp_id = this.crypto.encryp_AES( company.id , this.crypto.secret_key_company_profile );

    this.router.navigate([ company.name ,encryp_id.toString()],
        {
          relativeTo: this.route
        }
    );

    this.set_router( { path:company.name , data:company.id , relative:true } );

  }

  ngOnInit(){

  }

}