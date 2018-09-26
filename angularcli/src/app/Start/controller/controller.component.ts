import { Component, OnInit } from '@angular/core';

import { DataService } from '../../share-service/data.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {

  constructor( private shareService:DataService ) {

    this.shareService.loading = false;
  }

  ngOnInit() {
  }

  set_router(){

       this.shareService.loading = true;

  }

}
