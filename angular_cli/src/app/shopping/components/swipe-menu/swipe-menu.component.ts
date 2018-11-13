import { Component, OnInit } from '@angular/core';

import { SwipeMenuService } from '../../services/swipe-menu.service';

@Component({
  selector: 'app-swipe-menu',
  templateUrl: './swipe-menu.component.html',
  styleUrls: ['./swipe-menu.component.scss']
})
export class SwipeMenuComponent implements OnInit {

  constructor(private swipe :SwipeMenuService ) { }

  ngOnInit() {
  }

}
