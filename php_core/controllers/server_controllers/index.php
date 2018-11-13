<?php

use server\db\DB as database;



class index{


    public function wellcome() // say hellcome in this sserver
    {

        echo 'Wellcome in WorldSell Server-Side';


        echo '<br>';

        $insetr = database::table('users')
            ->insert(
                [
                    'first_name'=>'fgg' ,
                    'last_name'=>'fgdfg',

                ]
            );

        echo  $insetr;






    }

}

?>