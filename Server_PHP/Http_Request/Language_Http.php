<?php

if( $status == 'language' ){

    $lang = $_POST->value;

    $objct_language = $language->languages( $lang );

    echo json_encode($objct_language );
}
?>