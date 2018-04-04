import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
      private dataservices : DataService
  )
  {
    setTimeout(()=>{

      this.dataservices.update_loader(false);

    },1000);
  }

  ngOnInit() {
  }

}
