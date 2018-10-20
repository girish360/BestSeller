<?php

namespace  server\services\date_time;

class date_time{


    private static $date;

    private static $time;

    private static $date_time;

    public static function set_current_zone(){
        date_default_timezone_set( date_default_timezone_get() );  // set current zone
    }


    public static function current_date(){

        self::set_current_zone();

        return date('Y-m-d');
    }

    public static function current_datetime(){

        self::set_current_zone();

        return date('Y-m-d h:i:s');

    }

    public static function current_time(){

        self::set_current_zone();

        return  date('h:i:s');

    }

    public static function past_date( $past_date ){ //  any past time / months / days / years

        self::set_current_zone();

        return date('Y-m-d h:i:s', strtotime( $past_date ));

    }

}



?>