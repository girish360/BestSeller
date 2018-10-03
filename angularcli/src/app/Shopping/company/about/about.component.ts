import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../company.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( private company:CompanyService) {

    this.company.company_properties.company_nav_active = 2;



  }

  ngOnInit() {

  }

}
