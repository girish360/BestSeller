<?php

class Cookie {

    public function set_cookie($name_cookie ,$value)
    {

        setcookie( $name_cookie , $value, time() + ((3600*60)*24)*30, '/'); // set cookie ..////////

        return array('Value'=>'set');


    }

    public function remove_cookie( $name_cookie ){

        setcookie( $name_cookie, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        return array('Value'=>'remove');
    }

    public function check_cookie( $name_cookie ){

        if(isset($_COOKIE[$name_cookie])){

            return array('Value'=>'true');

        }
        else{

            return array('Value'=>'false');
        }
    }

    public function set_cookie_serialize( $cookie_name , $data ){

        if( isset($_COOKIE[$cookie_name])){
             $_COOKIE[$cookie_name]=serialize( $data );
        }else{
            setcookie($cookie_name , serialize($data) , time() + ((3600*60)*24)*30, '/' );
        }

        return array("Value"=>"true");
    }

    public function get_cookie_unserialize( $cookie_name ){

        if( isset($_COOKIE[$cookie_name])) {

           return unserialize($_COOKIE[$cookie_name]);

        }else{

            return array("Value"=>"false");
        }
    }
}

$cookie = new Cookie(); //  declare obj .....

?>
