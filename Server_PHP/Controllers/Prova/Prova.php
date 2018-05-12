<?php

class Prova extends Fetch_Data{

    public function decrypt( $status, $en ){

        $string_decrypt = self::decrypt_in_server($en); // decrypt object into string ................
        $end_string=0;
        for( $i = 0 ; $i < strlen($string_decrypt); $i++ ){ // loop string object
            if( $i != 0 && $string_decrypt[$i] =='}' ){ // find end number string object...................
                $end_string = $i; // end _String varibale equals with end number string object
                break; // break loop ..........................
            } // end if
        } // end loop
        $decrypt_object = json_decode( substr( $string_decrypt ,0 , ++$end_string )); // convert string into object .........
        return self::json_data( $status,$decrypt_object ); // return decrypted object ............
    } // end method

} //end class

?>


