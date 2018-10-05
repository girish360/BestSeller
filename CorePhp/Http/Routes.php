<?php
// Generated by klodian , In this file must set all api routing ..................................
// set all shopping routes ......
Route::department('/shopping')->routes( function() {

    Route::group('/header')->routes( function() {

        Route::get('/language','Language_con@get_language');

        Route::get('/change_language','Language_con@change_language');

        Route::post('/delete_items_inWish','Header@delete_from_wishlist');

        Route::post('/delete_items_inCart','Header@delete_from_cartlist');

        Route::post('/update_cartList','Header@update_cartList');

        Route::post('/add_inwishList','Header@add_wish_cookie');

        Route::post('/add_incartList','Header@add_cart_cookie');

        Route::get('/wishList_cartList','Header@get_wishlist_cartList');

        Route::get('/search','Search@search_in_header');
    });

    Route::group('/menu')->routes( function() {

        Route::get('/category','Menu@get_category');

    });

    Route::group('/login_register')->routes( function() {

        Route::get('/auth','Auth@set_token');

        Route::get('/check','Auth@check_token');

    });

    Route::group('/home')->routes( function() {

        Route::get('/categories','Home@get_categories');

        Route::get('/more_products_incarousel','Home@more_products');

    });

    Route::group('/products')->routes( function() {

        Route::get('/category_products','Products@getproducts');

        Route::get('/product_details','Products@get_product_details');

        Route::get('/change_products_forpage','Products@chnageProductsForPage');

    });

    Route::group('/company')->routes( function() {

        Route::get('/check','Company@check');

        Route::get('/home','Company@home');


    });


    Route::group('/settings')->routes( function() {

        Route::get('/menu','Settings@get_settings');
         Route::get('/change_menu','Settings@change_menu');

    });



});



// set all company routes ...
Route::department('/company')->routes( function(){

    Route::group('/menu')->routes( function() {

        Route::get('/f','Language_con@get_language');

        Route::get('/register','Auth@register');

    });
});

Route::finished(); // if don't match any route display a throw error


?>