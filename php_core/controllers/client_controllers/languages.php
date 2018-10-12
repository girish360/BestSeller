<?php

use server\services\cookie\cookie as cookie;

use server\services\fetch\fetch as fetch;

use server\services\language\language as language;

class languages extends controller {

    public function get_language(){

        $language_in_coockie = cookie::check_cookie( 'language' ); //  call method check if have cookie  for language

        if( $language_in_coockie != false ){ // check if  exists cookie for language

            $objct_language = language::language( json_decode( $_COOKIE['language'] )); // call method to get language .......

            return fetch::json_data( $objct_language );// return object with language  in frontend.........

        }else{ // else if not exists cookie with language ..........

            $objct_language = language::language( '1' ); // call method to get language with default value  .......

            return fetch::json_data($objct_language );// return object with language  in frontend.........
        }
    }

    public function change_language( $new_language ){

        $objct_language = language::language( $new_language->language ); // call method to get language .......

        cookie::save_coockie( 'language', $new_language->language  ); //save language in cookie .............

        return fetch::json_data($objct_language );// return object with language  in frontend.......
    }

}
?>