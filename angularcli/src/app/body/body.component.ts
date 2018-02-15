import { Component, OnInit ,Input , Output , EventEmitter   } from '@angular/core';

import { VisitorsComponent } from '../visitors/visitors.component';

import { DataService } from '../services/data.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers : [ VisitorsComponent ]
})

export class BodyComponent implements OnInit {


  constructor( private dataservices : DataService ) { }

  ngOnInit() {

  }

}
