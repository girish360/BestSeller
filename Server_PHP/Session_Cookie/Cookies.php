<?php

class Cookie {

    public function set_cookie($name_cookie)
    {

        setcookie('cookie_menu', 'menu_active', time() + ((3600*60)*24)*30, '/'); // set cookie ..////////

        return array('Value'=>'set');


    }

    public function remove_cookie( $name_cookie ){

        setcookie( $name_cookie, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        return array('Value'=>'false');
    }

    public function check_cookie( $name_cookie ){

        if(isset($_COOKIE[$name_cookie])){

            return array('Value'=>'true');

        }
        else{

            return array('Value'=>'false');
        }
    }
}

$cookie = new Cookie(); //  declare obj .....

?>
