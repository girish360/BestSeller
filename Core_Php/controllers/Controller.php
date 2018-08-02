<?php

class Controller{


    public static function call( $class , $method , $params ){

       $func = array( new $class , $method ); // new object of controller ......................

       return $func( $params );

   }


}

?>