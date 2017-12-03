import { Component, OnInit } from '@angular/core';

import { HtppServicesComponent } from '../htpp-services/htpp-services.component';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
  providers : [HtppServicesComponent]
})
export class VisitorsComponent implements OnInit {

  constructor( private Httpservices : HtppServicesComponent ) { }

  private get_Language = {};

  private wishList_products = [];

  ngOnInit() {

    this.get_languageFromServer(); // fill language

    this.get_WishListFromServer(); // fill wish list

  }

  setLanguageFromHeader( language ){

    this.get_Language = language;

  }

  get_wish_product( wish_product ){

    if(this.wishList_products.indexOf(wish_product) !== -1){

    }else{
      this.wishList_products.push ( wish_product );
    }


  }

  get_WishListFromServer(){ // take wish list from  server ............


  }

  push_WishProduct_Server(){


  }


  get_languageFromServer(){ //  take language from server .........

    this.Httpservices.create_obj( 'language' , 'English' );

    this.Httpservices.Http_Post()
        .subscribe(data=>{ this.get_Language = data }
            ,error=>(console.log( error +'gabim' ))
        );
  }


}
