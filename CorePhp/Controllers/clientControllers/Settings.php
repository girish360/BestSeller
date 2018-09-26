<?php

use server\services\cookie\Cookie as cookie;

use server\services\fetch\Fetch as fetch;

class  Settings{

    public static $menu = 'menu';

    public function get_settings(){

        $menu = self::cookie_settings();

        return fetch::json_data( $menu );

    }

    public function cookie_settings(){

             return cookie::check_cookie('menu');
    }

    public function user_settings(){

    }



    public function menu()

    {

        if ( cookie::check_cookie('menu') == false ) {


            cookie::save_coockie('menu','');

            return fetch::json_data('false');

        }else{

            cookie::remove_cookie('menu');

            return fetch::json_data('true');


        }


    }

}

?>