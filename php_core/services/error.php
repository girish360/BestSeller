<?php

namespace server\services\error;

use Exception;

 class error{

     public static function header_error( $status ){

         header('HTTP/1.1 '.$status );

     }

     public static function error( $message ){

         throw new Exception( $message );

     }

 }



?>