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

  ngOnInit() {

    this.Httpservices.create_obj( 'language' , 'English' );

    this.Httpservices.Http_Post()
        .subscribe(data=>{ this.get_Language = data }
            ,error=>(console.log( error +'gabim' ))
        );


  }

  setLanguageFromHeader( data ){

    this.get_Language = data;

  }

}
