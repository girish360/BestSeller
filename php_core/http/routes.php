<?php

// Generated by klodian , In this file must set all api routing ..................................
// set all shopping routes ......
route::department('/shopping')->routes( function() {

    route::group('/auth')->routes( function() {

        route::post('/check_token','client_auth@check_token')->auth()->exe(); // security route ....

        route::post('/check_client','client_auth@check_client')->exe();

        route::post('/check_supplier','client_auth@check_supplier')->exe();

    });

    route::group('/client')->routes( function() {

        route::get('/get_client','client@get_client')->auth()->exe(); // security route ....

    });

    route::group('/header')->routes( function(){

        route::get('/language','languages@get_language')->exe();

        route::get('/change_language','languages@change_language')->exe();

        route::post('/delete_items_inWish','header@delete_from_wishlist')->exe();

        route::get('/wishList_cartList','header@get_wishlist_cartList')->exe();

        route::post('/delete_items_inCart','header@delete_from_cartlist')->exe();

        route::post('/update_cartList','header@update_cartList')->exe();

        route::post('/add_inwishList','header@add_wish_cookie')->exe();

        route::post('/add_incartList','header@add_cart_cookie')->exe();

        route::get('/search','search@search_in_header')->exe();

    });

    route::group('/menu')->routes( function() {

        route::get('/category','menu@get_category')->exe();

    });

    route::group('/login_register')->routes( function() {

        route::get('/clientAuth','clientAuth@set_token')->exe();

        route::get('/check','clientAuth@check_token')->exe();

    });

    route::group('/home')->routes( function() {

        route::get('/categories','home@get_categories')->exe();

        route::get('/more_products_incarousel','home@more_products')->exe();

    });

    route::group('/products')->routes( function() {

        route::get('/category_products','products@getproducts')->exe();

        route::get('/product_details','products@get_product_details')->exe();

        route::get('/change_products_forpage','products@chnageProductsForPage')->exe();

    });

    route::group('/company')->routes( function() {

        route::get('/check','supplier@check')->exe();

        route::get('/home','supplier@home')->exe();


    });

    route::group('/settings')->routes( function() {

        route::get('/menu','settings@get_settings')->exe();

        route::get('/change_menu','settings@change_menu')->exe();

    });

});

// set all company routes ...
route::department('/company')->routes( function(){

    route::group('/menu')->routes( function() {

        route::get('/f','languages@get_language')->exe();

        route::get('/register','clientAuth@register')->exe();

    });
});

route::department('')->routes( function(){  // start server without any path or uri ....

    route::get('/','index@wellcome')->exe();

});


route::finished(); // if don't match any route display a throw error


?>