import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

import { MenuService } from '../../services/menu.service';

import { DataService } from '../../services/data.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  public hover:any = false;

  public style_settings_icon:any={ 'transform': 'rotate( 0deg )' };

  public deg_rotate_settings_icon: any = 0;

  public content_settings:any = false;

  public buttons =[
    {
      id:1 , name:'Product' , icon:'library_add', exit_icon:'exit_to_app', rotate:false
    },

    {
      id:2 , name:'Settings' , icon:'settings', exit_icon:'exit_to_app', rotate:true
    },

    {
      id:3, name:'Color' , icon:'color_lens', exit_icon:'exit_to_app', rotate:false
    }
  ];

  public index_button :number;

  constructor(
      private settings:SettingsService ,
      private menuservice:MenuService,
      private dataservices:DataService,
  ) {

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

    this.hover = false;

    this.index_button = -1;

  }

  in_hover_setting(index){

    this.hover = true;

    this.index_button = index;

  }

  check_button( button ){

    if( button.id == 2 ){
      this.hover = false;

      this.content_settings =  true;
    }




  }

  hide_settings(){
    this.content_settings =  false;
  }

}
