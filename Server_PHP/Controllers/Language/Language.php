<?php

class Language extends Cookie {

    public function get_language( $lang ){

        $language_in_coockie = self::check_cookie( 'language' ); //  call method check if have cookie  for language

        if( $language_in_coockie != 'false' ){ // check if  exists cookie for language

            $objct_language = self::object_language( json_decode($_COOKIE['language'] )); // call method to get language .......

            return self::json_data('language' ,$objct_language );// return object with language  in frontend.........

        }else{ // else if not exists cookie with language ..........

            $objct_language = self::object_language( $lang ); // call method to get language .......

            return self::json_data('language' ,$objct_language );// return object with language  in frontend.........
        }
    }

    public function change_language( $new_language ){

        $objct_language = self::object_language( $new_language ); // call method to get language .......

        return self::json_data('language' ,$objct_language );// return object with language  in frontend.......
    }

    public function object_language( $lang ){

        $language=[];

        switch ( $lang ) {
            case '1':
                $language['id']='1';
                $language['wellcome']='Wellcome';
                $language['choselanguage']='Choose your language';
                $language['seemorelanguage']='See more';
                $language['searchproducts']='Search products or company....';
                $language['imgactivlanguage']='england.png';
                $language['chooselanguage']=$lang;
                $language['btngotologin']='Go to login';
                $language['logout']='Your Session Expired';
                $language['bodylogout']='Please login again!!';
                $language['exitlogin']='Exit login';
                $language['category']='Categorys';
                $language['subscribe']='Subscriptions';
                $language['settings']='Settings';
                $language['users']='User Panel';
                $language['chat']='Chat Online';
                $language['allkat']='All';
                $language['emptycat']='Category empty';
                $language['add_wishlist']='WishList';
                $language['header']="EN";
                $language['sing']="Sing In";
                $language['wish']="WishList";
                $language['card']="Cart";
                $language['more']="More";
                $language['User']="User";
                $language['login_register']="Login/Register";
                $language['chat']="Chat Live";
                $language['Wish_Write']="Wish Products";
                $language['Cart_Write']="Cart Products";
                $language['page_products']="Page";
                $language['total_page_products']="Of";

                break;
            case '2':
                $language['id']='2';
                $language['wellcome']='Mirsevini';
                $language['choselanguage']='Zgjidhni gjuhen tuaj';
                $language['seemorelanguage']='Shikoni me shume';
                $language['searchproducts']='Kerkoni produkte ose kompani....';
                $language['imgactivlanguage']='albania.png';
                $language['chooselanguage']=$lang;
                $language['logout']='Sesioni juaj skadoj';
                $language['btngotologin']='Shkoni tek logimi';
                $language['bodylogout']='Porta juaj e aksesit eshte mbyllur!!';
                $language['exitlogin']='Ju lutem hyni persesi';
                $language['category']='Kategorit';
                $language['subscribe']='Ndjekesit';
                $language['settings']='Regullimet';
                $language['users']='Paneli Perdoruesit';
                $language['chat']='Bisedo Online';
                $language['allkat']='Total';
                $language['emptycat']='Category Bosh';
                $language['add_wishlist']='Preferencat';
                $language['header']="AL";
                $language['sing']="Hyni";
                $language['wish']="Preferencat";
                $language['card']="Karta";
                $language['more']="Me shum";
                $language['User']="Perdorues";
                $language['login_register']="Hyni/Regjistrohu";
                $language['chat']="Komunikim Live";
                $language['Wish_Write']="Produktet e Preferuara";
                $language['Cart_Write']="Preduktet ne kart";
                $language['page_products']="Faqa";
                $language['total_page_products']="Nga";

                break;


            case '3':
                $language['id']='3';
                $language['wellcome']='Mirsevini';
                $language['choselanguage']='Scegli la tua LINGUA';
                $language['seemorelanguage']='Shikoni me shume';
                $language['searchproducts']='Kerkoni produkte ose kompani it....';
                $language['imgactivlanguage']='italy.png';
                $language['chooselanguage']=$lang;
                $language['Active_language']="Italy";
                $language['Active_language_image']="italy.png";
                $language['sing']="Sing In";
                $language['wish']="WishList";
                $language['categorywrite']='Kategorit it';
                $language['card']="Card";
                $language['more']="more it";
                $language['User']="Perdorues it";
                $language['login_register']="Hyni/Regjistrohu it";
                $language['add_wishlist']='WishList it';
                $language['chat']="Chat Live it";
                $language['emptycat']='Category Bosh it';
                $language['Wish_Write']="Wish Products it";
                $language['Cart_Write']="Preduktet ne kart";



                break;



        }

        self::save_coockie( 'language', $lang ); //save language in cookie .............

        return $language;
    }
}



?>