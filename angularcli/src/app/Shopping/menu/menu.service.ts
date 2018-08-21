import { Injectable } from '@angular/core';

import{ BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class MenuService {

  public menu = new BehaviorSubject<boolean>(false);

  status_menu = this.menu.asObservable();


  constructor() { }


}
