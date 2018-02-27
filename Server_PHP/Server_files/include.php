<?php
include '../Fetch_Data/Fetch_Data.php';
include '../Controllers/AA_Help_Controllers/Cookie.php';
include '../Controllers/AA_Help_Controllers/Session.php';
include '../Controllers/Category_Subscribe_and_Products/Category_Subscribe.php';
include '../Controllers/Header/Header.php';
include  '../Controllers/Language/Language.php';
include  '../Controllers/Products/Products.php';


$Object = [];

$Object['Cookie'] = new Cookie();

$Object['Session'] = new Session();

$Object['Products'] = new Products();

$Object['Category_Subscribe'] = new Category_Subscribe();

$Object['Header'] = new Header();

$Object['Language'] = new Language();


?>