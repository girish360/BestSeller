

<?php

require_once (__DIR__.'/vendor/autoload.php');

AutoLoaderClasses::loadclass();

Route::get('/menu' ,'Menu@get_category');

Route::get('/wishList_cartList' ,'Header@get_wishlist_cartList');

Route::get('/language' ,'Language@get_language');

Route::post('/categories_products' ,'Home@get_categories');

Route::post('/products','Products@getproducts');

Route::post('/addInWishList','Header@add_wish_cookie');



?>







