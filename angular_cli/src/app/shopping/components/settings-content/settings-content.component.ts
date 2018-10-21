import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

import {Observable} from 'rxjs/Rx'; // Angular 5

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.css']
})
export class SettingsContentComponent implements OnInit {

  public hover_settings:any = false;

  public style_settings_icon:any={ 'transform': 'rotate( 0deg )' };

  public deg_rotate_settings_icon: any = 0;

  public content_settings:any = false;

  constructor(private settings:SettingsService) {

    Observable.interval(20 * 2).subscribe(x => {
      this.get_deg_rotate();
    });
  }

  ngOnInit() {
  }

  setting_menu(){

    if( this.settings.menu == false ){

      this.menuservice.menu.next(true);

    }else{

      this.menuservice.menu.next(false);
    }

    this.settings.menu = !this.settings.menu;

    this.dataservices.Http_Get( 'shopping/settings/change_menu' , false ) // make request ......

        .subscribe( //  take success

            data => {

              let d =  data['data'];

            },
            error => console.log( error['data'] ) // take error .....

        );

  }

  get_deg_rotate(){

    if( this.deg_rotate_settings_icon < 360 ){

      this.deg_rotate_settings_icon =  this.deg_rotate_settings_icon +8;

      this.style_settings_icon = { 'transform': 'rotate( '+ this.deg_rotate_settings_icon +'deg )' };

    }else{

      this.deg_rotate_settings_icon = 0;

      this.style_settings_icon = { 'transform': 'rotate( '+ this.deg_rotate_settings_icon +'deg )' };
    }

  }

  show_settings(){

  }

  out_hover_setting(){

    this.hover_settings = false;


  }
  in_hover_setting(){
    this.hover_settings = true;
  }

  check_settings(){

    this.hover_settings = false;

    this.content_settings =  !this.content_settings;


  }

}
