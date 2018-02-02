import { Component, OnInit } from '@angular/core';

import { HtppServicesComponent } from '../htpp-services/htpp-services.component';



import { Routes, RouterModule , ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import { DataServiceService } from '../htpp-services/data-service.service';




@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
  providers : [HtppServicesComponent]
})
export class VisitorsComponent implements OnInit {

  constructor( private dataservices: DataServiceService , private route:ActivatedRoute ,private Httpservice : HtppServicesComponent ) {

      this.dataservices.Language.subscribe( ( language:object ) => { this.get_Language = language } );

  }


  public get_Language:object={};

  private wishList_products = [];
  public innerWidth;

  ngOnInit() {

  }



}
