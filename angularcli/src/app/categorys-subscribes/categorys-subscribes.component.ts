import { Component, OnInit , AfterViewInit , Input, NgZone  } from '@angular/core';

import { RouterModule, Router , } from '@angular/router';

import { HtppServicesComponent } from '../htpp-services/htpp-services.component';

import { EncryptDecryptService } from '../encrypt-decrypt.service';

@Component({
  selector: 'app-categorys-subscribes',
  templateUrl: './categorys-subscribes.component.html',
  styleUrls: ['./categorys-subscribes.component.css']
})
export class CategorysSubscribesComponent implements OnInit {

  constructor( private router:Router, private Httpservice : HtppServicesComponent , private crypto: EncryptDecryptService) { }



  public categorys = [];

   public id_company:any;

  @Input() get_Language = {};

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
      //  user clicked home ...

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

  encrypt_id( id_company ){

    this.router.navigate(['/company',{ companyId: this.crypto.encryp_AES( id_company , this.crypto.secret_key_company_profile ) }]);

  }




  ngOnInit() {

    this.Httpservice.create_obj( 'category','category' );

    this.Httpservice.Http_Post()
        .subscribe(
            data => {
              if( data['status'] == 'category' ){
                this.categorys = data['data']
              }
            },
            error => console.log( error +'gabim' )

        );
  }

}
