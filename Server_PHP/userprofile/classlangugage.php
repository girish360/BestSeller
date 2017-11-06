<?php
if(isset($_GET['lang'])){
  $lang=$_GET['lang'];
  $language = new language();
  $res=$language->languages($lang);
  echo $res;
}
class language{
        private $dbHost     = "localhost";
        private $dbUsername = "root";
        private $dbPassword = "";
        private $dbName     = "world_sell";
        private $userTbl    = 'users';
        public $datauser;


   public function __construct(){
       if(!isset($this->db)){
            // Connect to the database
            $conn = new mysqli($this->dbHost, $this->dbUsername, $this->dbPassword, $this->dbName);
            if($conn->connect_error){
                die("Failed to connect with MySQL: " . $conn->connect_error);
            }else{
                $this->db = $conn;
            }
        }
   }

    public function languages($lang){
      $language=[];
      switch ($lang) {
        case 'English':
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
           $language['categorywrite']='CATEGORY';
           $language['subscribewrite']='SUBSCRIPTIONS';
           $language['chat']='Chat Online';
           $language['allkat']='All';
           $language['emptycat']='This is empty';
           $language['add_wishlist']='WishList';
           $language['header']="EN";
           self::setcookie($lang);
           break;
        case 'Albania':
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
             $language['categorywrite']='KATEGORITE';
             $language['subscribewrite']='SUBSCRIPTIONS';
             $language['chat']='Bisedo Online';
             $language['allkat']='Total';
             $language['emptycat']='Kjo eshte bosh';
             $language['add_wishlist']='Preferencat';
             $language['header']="AL";
            self::setcookie($lang);
          break;
        case 'Germany':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='germany.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;
        case 'Greece':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='greece.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;
          case 'Italy':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='italy.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;
          case 'Turkey':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='turkey.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;
          case 'Canada':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='canada.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;
          case 'France':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='france.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;

          case 'Spanish':
              $language['wellcome']='Mirsevini';
             $language['choselanguage']='Zgjidhni gjuhen tuaj';
             $language['seemorelanguage']='Shikoni me shume';
             $language['searchproducts']='Kerkoni produkte ose kompani....';
             $language['imgactivlanguage']='spain.png';
             $language['chooselanguage']=$lang;
            self::setcookie($lang);
              break;
        
      }
     
      return $language;
  }

  public function setcookie($lang,$name='lang'){

   setcookie($name, $lang, time() + (86400 * 30), "/");
   return true;
  }


}
?>