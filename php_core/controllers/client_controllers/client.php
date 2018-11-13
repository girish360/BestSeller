<?php

use server\services\fetch\fetch as fetch;

use server\db\DB as database;

use server\services\auth\auth as auth;


class client {

    public function load_client(){





        return fetch::json_data(auth::$user_details);



    }

}

?>