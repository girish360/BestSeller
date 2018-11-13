<?php

namespace server\services\language;

class language {

    private $defaultLang ='1';

    public static function language( $lang ){

        $language=[];

        switch ( $lang ) {
            case '1':
                $language['id']='1';
                $language['wellcome']='Wellcome';
                $language['choselanguage']='Choose your language';
                $language['seemorelanguage']='See more';
                $language['searchproducts']='search products or company....';
                $language['imgactivlanguage']='england.png';
                $language['chooselanguage']=$lang;
                $language['btngotologin']='Go to login';
                $language['logout']='Your session Expired';
                $language['bodylogout']='Please login again!!';
                $language['exitlogin']='Exit login';
                $language['category']='Categorys';
                $language['subscribe']='Subscriptions';
                $language['settings']= 'settings';
                $language['users']='User Panel';
                $language['chat']='Chat Online';
                $language['allkat']='All';
                $language['emptycat']='Category empty';
                $language['add_wishlist']='WishList';
                $language['header']="EN";
                $language['sign']="Sign In";
                $language['wish']="WishList";
                $language['notification']="Notifications";
                $language['card']="Cart";
                $language['more']="More";
                $language['User']="User";
                $language['login_register']="Login/Register";
                $language['chat']="Chat Live";
                $language['Wish_Write']="Wish products";
                $language['Cart_Write']="Cart products";
                $language['page_products']="Page";
                $language['total_page_products']="Of";
                $language['see_all']="See All";

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
                $language['sign']="Hyni";
                $language['wish']="Preferencat";
                $language['card']="Karta";
                $language['notification']="Njoftimet";
                $language['more']="Me shum";
                $language['User']="Perdorues";
                $language['login_register']="Hyni/Regjistrohu";
                $language['chat']="Komunikim Live";
                $language['Wish_Write']="Produktet e Preferuara";
                $language['Cart_Write']="Preduktet ne kart";
                $language['page_products']="Faqa";
                $language['total_page_products']="Nga";
                $language['see_all']="Te Gjitha";


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
                $language['sign']="Sign In";
                $language['wish']="WishList";
                $language['categorywrite']='Kategorit it';
                $language['card']="Card";
                $language['more']="more it";
                $language['User']="Perdorues it";
                $language['login_register']="Hyni/Regjistrohu it";
                $language['add_wishlist']='WishList it';
                $language['chat']="Chat Live it";
                $language['notification']="Njoftimet";
                $language['emptycat']='Category Bosh it';
                $language['Wish_Write']="Wish products it";
                $language['Cart_Write']="Preduktet ne kart";
                $language['see_all']="Te Gjitha";



                break;

        }

        return $language;
    }
}



?>