<?php

if( $status == 'categories_products'){

    echo $Router['Home']->get_categories( $status , $data_from_client );

}

if( $status == 'more_products' ){

    echo $Router['Home']->more_products( $status , $data_from_client );
}

?>