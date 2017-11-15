<?php
class Cookie {

    public function set_cookie($name_cookie){

        if(isset($_COOKIE['cookie_menu'])){
            setcookie('cookie_menu','',time()-((3600*60)*24)*30 ,'/');
            return 0;
        }
        else{

            setcookie('cookie_menu','menu_active',time()+((3600*60)*24)*30 ,'/');

            return 1;
        }

    }


    public function check_cookie($name_cookie){
        if(isset($_COOKIE['cookie_menu'])){
            setcookie('cookie_menu','',time()-((3600*60)*24)*30 ,'/');
            return 1;
        }
        else{
            return 0;
        }
    }
}
$cookie = new Cookie(); //  declare obj .....
?>

