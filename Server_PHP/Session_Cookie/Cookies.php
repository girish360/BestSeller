<?php

class Cookie {

    public function set_cookie($name_cookie)
    {
        if (isset($_COOKIE['cookie_menu'])) {
            setcookie('cookie_menu', '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......
            return array('Value'=>'false');
        } else {
            setcookie('cookie_menu', 'menu_active', time() + ((3600*60)*24)*30, '/'); // set cookie ..////////
            return array('Value'=>'true');
        }

    }

    public function check_cookie($name_cookie){

        if(isset($_COOKIE['cookie_menu'])){
            setcookie('cookie_menu','',time()-((3600*60)*24)*30 ,'/');
            return array('Value'=>'1');
        }
        else{
            return array('Value'=>'0');
        }
    }
}
$cookie = new Cookie(); //  declare obj .....

?>
