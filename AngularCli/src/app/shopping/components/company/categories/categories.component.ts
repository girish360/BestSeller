import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor( private company : CompanyService ) {

    this.company.company_properties.company_nav_active = 1;
  }

  ngOnInit() {
  }

}
