import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';

import { VisitorsComponent } from '../visitors/visitors.component';

import { DataService } from '../services/data.service';

import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers : [ VisitorsComponent ]
})

export class BodyComponent implements OnInit {


  constructor( private header : HeaderService , private dataservices : DataService ) {


  }



  ngOnInit(){

  }



}
