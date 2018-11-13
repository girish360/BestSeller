import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private zoom = 4;
  private latitude = 39.8282;
  private longitude = -98.5795;


  constructor( private company:CompanyService) {

    this.company.company_properties.company_nav_active = 2;



  }

  ngOnInit() {

  }

}
