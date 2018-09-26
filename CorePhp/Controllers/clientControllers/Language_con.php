<?php

use server\services\cookie\Cookie as cookie;

use server\services\fetch\Fetch as fetch;

use server\services\language\Language as language;

class Language_con extends Controller {

    public function get_language(){

        $language_in_coockie = cookie::check_cookie( 'language' ); //  call method check if have cookie  for language

        if( $language_in_coockie != false ){ // check if  exists cookie for language

            $objct_language = language::object_language( json_decode( $_COOKIE['language'] )); // call method to get language .......

            return fetch::json_data( $objct_language );// return object with language  in frontend.........

        }else{ // else if not exists cookie with language ..........

            $objct_language = self::object_language( $this->defaultLang ); // call method to get language .......

            return fetch::json_data($objct_language );// return object with language  in frontend.........
        }
    }

    public function change_language( $new_language ){

        $objct_language = language::object_language( $new_language->language ); // call method to get language .......

        cookie::save_coockie( 'language', $new_language->language  ); //save language in cookie .............

        return fetch::json_data($objct_language );// return object with language  in frontend.......
    }

}
?>