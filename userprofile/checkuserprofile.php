<script src="../js/js_userprofile/dropdown_header_chat.js" type="text/javascript"></script><!-- jequry dropdowns header -->
<?php
 include '../connection/conn.php';
 include 'classlangugage.php';
 include '../conn.php';
 require_once '../fbConfig.php';// Include FB config file && User class
 require_once '../classlogin.php';


if(isset($accessToken)){
    if(isset($_SESSION['facebook_access_token'])){
        $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
    }else{
        // Put short-lived access token in session
        $_SESSION['facebook_access_token'] = (string) $accessToken;
        
        // OAuth 2.0 client handler helps to manage access token
        $oAuth2Client = $fb->getOAuth2Client();
        
        // Exchanges a short-lived access token for a long-lived one
        $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_SESSION['facebook_access_token']);
        $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;
        
        // Set default access token to be used in script
        $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
    }
    // Getting user facebook profile info
    try {
        $profileRequest = $fb->get('/me?fields=name,first_name,last_name,email,link,gender,locale,picture');
        $fbUserProfile = $profileRequest->getGraphNode()->asArray();
    } catch(FacebookResponseException $e) {
        echo 'Graph returned an error: ' . $e->getMessage();
        session_destroy();
        // Redirect user back to app login page
        header("Location: ./");
        exit;
    } catch(FacebookSDKException $e) {
        echo 'Facebook SDK returned an error: ' . $e->getMessage();
        exit;
    }
    
    // Initialize User class
    $user = new User();
    
    // Insert or update user data to the database
    $fbUserData = array(
        'oauth_provider'=> 'facebook',
        'oauth_uid'     => $fbUserProfile['id'],
        'first_name'    => $fbUserProfile['first_name'],
        'last_name'     => $fbUserProfile['last_name'],
        'email'         => $fbUserProfile['email'],
        'gender'        => $fbUserProfile['gender'],
        'locale'        => $fbUserProfile['locale'],
        'picture'       => $fbUserProfile['picture']['url'],
        'link'          => $fbUserProfile['link']
        
    );
    $_SESSION['id_fb']=$fbUserData['oauth_uid'];
    $userData = $user->checkUser($fbUserData);
    
    // Put user data into session
    $_SESSION['userData'] = $userData;
    
    // Get logout url
  $logoutURL = $helper->getLogoutUrl($accessToken, $redirectURL.'logout.php');
  }
  // chechk if exsist cookie in browser  for language  if it exsits call method with it ............................. 
 
  $lang = new language();
  if(isset($_COOKIE['lang'])) {
      $lan=$_COOKIE['lang'];
      $language=$lang->languages($lan);
  } 
  else{ // call method with language default.........................................................................
      $lan='English';
      $language=$lang->languages($lan);
   }
   
if(isset($accessToken) || isset($_SESSION['id'])){
    if(isset($_SESSION['facebook_access_token']) || isset($_SESSION['id'])){
        if(isset($_SESSION['id'])){
            $sql=$conn->query("SELECT * from users where id='".@$_SESSION['id']."'");
            $res=$sql->fetch_assoc();
        }
        if(isset($_SESSION['facebook_access_token'])){
            if(isset($_SESSION['id_fb'])){
                $sql=$conn->query("SELECT * from users where oauth_uid='".@$_SESSION['id_fb']."'");
                $res=$sql->fetch_assoc();
            }
        }
    }
    else{
        header('location:../index.php');
        }
}
else{
     header('location:../index.php');
}

if(isset($_COOKIE['favoi'])){
      $array_favorite = unserialize($_COOKIE['favoi']);
      $favorite_cookie = count($array_favorite); 
}else{
     $value=0;
     $favorite_cookie = $value;
}
if(isset($_COOKIE['card_products'])){
      $card_cookie = unserialize($_COOKIE['card_products']);
      $card_count_cookie = count($card_cookie);
 
 }else{
     $value=0;
     $card_count_cookie = $value;
 }
?>

    <!DOCTYPE html>

<html lang="en">
<head>
  <title>User Profile</title>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> <!-- bootstrap -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript">
        var lang ='<?php echo($lan); ?>';
    </script>
       <style type="text/css">
       h1{font-family:Arial, Helvetica, sans-serif;color:#999999;}


    </style>
     <script src="../js/jquery-3.2.1.min .js"></script>
   
     <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
     <script src="../js/js_userprofile/requestchecksession.js"></script><!-- check if exits session every sec-->
     <script src="//cdn.jsdelivr.net/jquery.color-animation/1/mainfile"></script>   <!-- jequry library in animate bg color border e tj -->
     <script class="scriptdrodsown" src="../js/js_userprofile/dropdown_header_chat.js" type="text/javascript"></script><!-- jequry dropdowns header -->
     <script src="../js/js_userprofile/language_more.js" type="text/javascript"></script><!-- jequry language and more from profile -->
     <script src="../js/js_userprofile/category.js" type="text/javascript"></script><!-- jequry category -->
     <script type="text/javascript" src="../js/js_login/login.js"></script>  <!-- jquery file for login -->
     <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
     <script type="text/javascript" src="../js/js_userprofile/products.js"></script>  <!-- jquery file for login -->

    
     <link rel="stylesheet" type="text/css" href="../css/css_user_profile/userchat.css">  <!-- css style user chat -->
     <link rel="stylesheet" type="text/css" href="../css/css_user_profile/usercategory.css">  <!-- css style category user-->
     <link rel="stylesheet" typee="text/css" href="css/css_products/style_products.css"> <!-- css style products user-->
      <link rel="stylesheet" type="text/css" href="../css/css_user_profile/userpage.css">  <!-- css style userpage -->
       
     <script>
            $(window).load(function(){
                $('.preloader').fadeOut("slow",function(){
                $('.reload_page').show();
                });
            });
     </script>

   <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 50%;
        width: 50%;

        position: absolute;
        z-index: 20 !important;
      }
      /* Optional: Makes the sample page fill the window. */
  
    </style>
</head>

<body class="body">                       
   
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcuMQUe3S0Qk7WTfy8XnBxQPk79eiTTrk&callback=initMap">
    </script>
     
       <div class="details_products">
          <div id="map"></div>
          <a href="#">
                 <div class="hide_details_product">
                   <div class="exit_details_product btn-primary btn">
                      X
                   </div>
                </div>
                  
           </a> 
           <div class="loading_product_details">
                 <center>
                   <div class="imgpreloader_prduct">
                        <img src="../images/preloader.gif">
                   </div>
                   <div class="writeloader">
                      <h3>Loading </h3>
                   </div>
                   <div class="imgloading">
                       <img src="../images/loading.gif">
                   </div>
                  </center>
                  
             
           </div>
           <div class="details_products_container">
                  <div class="message_error_detail_product">
                    there isnot connection
                  </div>
                  <div class="open_detail_product">
                      
                  </div>

           </div>

       </div>
    
        
        

       <div class="opacity_detail_product">
         
       </div> 
      
       <div class="opacity_dropdown">
         
       </div> 
       <div class="opacity_hover_category_sub">
       
       </div>
        <div class="checksession">  <!-- div full screen when expired session -->
 
        </div>
        <div class="popuplogout">  <!-- div for login when expired session  -->
            <a href="#">
               <div class="hidelogin">
                 <div class="exitlogin btn-primary btn">
                    X
                 </div>
              </div>
                
            </a> 
            <div class="logincheck" style="display: none;">
               <?php include 'login.php';?> 

            </div>

            <div class="checksessioncenter" style="width: 300px ; height: 100px; background-color:#ebebe0; position: relative; top: 200px; border-radius: 2px; margin :0px auto; -webkit-box-shadow: 0px 1px 5px 1px rgba(224,224,224,1);
                 -moz-box-shadow: 0px 1px 5px 1px rgba(224,224,224,1);
                 box-shadow: 0px 1px 5px 1px rgba(224,224,224,1);">
                  <div class="writelogout">
                      <div class="movewrite">
                         <?php echo $language['logout'];?>
                      </div>
                  </div>  
                  <div class="bodylogout">
                     <div class="movebody">
                        <?php echo $language['bodylogout'];?> 
                     </div>
                  </div> 
                  <center>
                  <div class="" id="movebtn">
                     <div class="btngotologin btn-primary btn"><?php  echo $language['btngotologin'];?></div>
                  </div> 
                  </center>  
            </div>
        </div>
         <center>
            <div class="preloader">
                 <div class="imgpreloader">
                      <img src="../images/preloader.gif">
                 </div>
                 <div class="writeloader">
                    <h3>Loading </h3>
                 </div>
                 <div class="imgloading">
                     <img src="../images/loading.gif">
                 </div>
            </div>
        </center>
<div class="reload_page">
<div class="allpage">
   <nav class="navigation" >
       <div class="writemenu">  <!-- this is open category  -->
           <div class="herewrite">
                <div class="radius_category">
                    <div class="position_icon_ctegory">
                        <div class="listcategory" id="laptopscreen">
                            <img src="images/list.png">
                        </div>
                        <div class="listcategory closelist" id="laptopscreen">
                            <img  src="images/close.png">
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <div class="space">
            <div class="widthi">
               <center>
                   <div class="kerkimresponse" style="display: none;">
                       <div class="exitsearch1"><a href="#"><img class="imggback" src="images/back_white.png"></a></div>
                       <input type="text"  name="respondesearch" class="searchinputresp" placeholder="<?php echo $language['searchproducts'];?>">
                       <div class="exitsearch">
                          <a href="#">
                              <div class="exit"><a href="#"><img src="../images/close1.png"></a></div>
                          </a>
                          <div class="searchimg"><a href="#"><img  src="images/search.png"></a></div>
                       </div>
                   </div>
               </center>
               <div class="pcheader">
                    <div class="menu1">
                        <a href="#">BestSeller</a>
                    </div>
                    <div class="search">
                        <input type="text" class="kerkim" name="search" placeholder="<?php echo $language['searchproducts'];?>"><a href="#"><div class="iconsearch"><img class="imgsearch" src="images/search.png"><img class="imgsearchexit" src="../images/close1.png" ></div></a>
                    </div>
                    <span class="rightee">
                        <div class="klo" style="display: inline-block; position: relative; top: -2px;
                              left: 5px;">
                              <a href="#" class="gjuha"  id="1">
                                 <div class="nameuser">
                                     <?php echo $language['wellcome'];?>: <?php echo $res['first_name'];?>
                                 </div>
                              </a>
                        </div>
                        <div class="menu3">
                           <a href="#" class="gjuha"  id="1">
                               <center>
                                    <div class="photouser">
                                         <img  class="pictureuser" id="pictureuser" src="<?php echo $res['picture']; ?>">
                                     </div> 
                               </center>
                           </a>
                        </div>
                        <div class="menu3" id="responselist">
                            <a  href="#" class="listcategoryfind">
                                <div class="listcategory" id="iconmenu"> 
                                    <img  src="images/list.png">
                                </div>
                                <div class="listcategory closelist" id="iconmenu">
                                   <img class="iconmenu" style="width:23px;" src="images/close.png">
                                </div>
                            </a>
                        </div>
                        <div class="menu3" id="search">
                             <a class="searchresponse" href="#"><img src="images/search.png"></a>
                        </div> 
                        <div class="menu3 fvk">
                            <a  class="favority " id="favority" href="#" style="z-index: 3 !important;">
                                <img  src="images/wish.png">
                               <?php 
                                   if($favorite_cookie==0){
                                        ?>
                                            <div class="nrnotification nrnotification_favority nrnotification_favority_first" id="nrnotification">
                                                <div class="count_number_favorite">
                                                    
                                                </div>     
                                            </div>
                                        <?php
                                   }
                                   else{
                                       ?>
                                            <div class="nrnotification nrnotification_favority" id="nrnotification">
                                                <div class="count_number_favorite">
                                                    <?php 
                                                       if($favorite_cookie>=100){
                                                            echo '99+';
                                                        }
                                                        else{
                                                            echo $favorite_cookie;
                                                        }
                                                    ?>
                                                </div> 
                                            </div>
                                       <?php
                                   }
                               ?>
                               
                            </a>
                            <?php 
                               if($favorite_cookie==0){
                                 ?>
                                    <div class="color_hearts_first">
                                    </div>
                                 <?php
                               }
                               else{
                                   ?>
                                    <div class="color_hearts_build">
                                    </div>
                                 <?php

                               }
                            ?>
                        </div> 
                        <div class="menu3">  
                            <a class="card" id="card" href="#">
                                <img src="images/card.png">
                                 <?php 
                                   if($card_count_cookie==0){
                                     ?>
                                         <div class="nrnotification nrnotification_card nrnotification_card_first" id="nrnotification">
                                
                                         </div> 
                                     <?php 
                                   }
                                   else{
                                       ?>
                                         <div class="nrnotification nrnotification_card" id="nrnotification">
                                           <?php echo $card_count_cookie;?>
                                         </div>
                                        
                                     <?php

                                   }
                                ?>
                            </a>
                        </div>
                        <div class="menu3">
                            <a class="language" id="language" href="#"><img src="images/world.png"></a>
                            <div class="write_language">
                           
                            </div>
                        </div>
                     </span>
                 </div> <!--  end headerdi v................-->

        
                  <div class="dropmore">
                      <div class="lang">
                          <a href="logout.php"><div class="">logout</div></a>
                          <a href="#"><div class="">other</div></a>
                          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                      </div>
                  </div>
                  <div class="languagefull">
                      <div class="dropworld">
                           <div class="lang">
                                <div class="choose" style="color:gray; text-align: left; position: relative; left: 10px;">
                                   <h2><?php echo $language['choselanguage'];?>:</h2>
                                </div>
                                <div class="typelanguage"><br>
                                      <div class="activelanguage">
                                          <div class="imgactiv"> 
                                                <img src="../images/<?php echo $language['imgactivlanguage']; ?>">
                                          </div>
                                          <div class="writeactivlanguage">
                                              <h2><?php echo $language['chooselanguage'];?></h2>
                                          </div>
                                          <div class="iconactive">
                                               <img class="radiolang" src="../images/ok.png">
                                          </div>

                                      </div>
                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Albania" id="radiolang1">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/albania.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Albanian</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang1" id="Albania" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian English" id="radiolang2">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/england.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>English</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang2" id="English" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Italy" id="radiolang3">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/italy.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Italy</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                          <input class="radiolang" name="radiolang3" id="Italy" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Germany" id="radiolang4">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/germany.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Germany</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang4" id="Germany" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Greece" id="radiolang5">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/greece.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Grece</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang5" id="Greece" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Turkey" id="radiolang6">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/turkey.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Turkey</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                          <input class="radiolang" name="radiolang6" id="Turkey" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Canada" id="radiolang7">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/canada.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Canada</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                          <input class="radiolang" name="radiolang7" id="Canada" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian France" id="radiolang8">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/france.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>France</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang8" id="France" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>

                                      <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian Spanish" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="Spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>
                                      <!-- more language here click buttoon see more -->
                                      <div class="morelanguageclick">
                                          <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                          </div>
                                          <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                          </div>
                                          <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                          </div> 
                                          <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                          </div> 
                                          <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                          </div> 
                                          <div class="alllanguages">
                                          <a href="#">
                                              <div class="albanian" id="radiolang9">
                                                  <div class="positionlang">
                                                      <div class="centerlang">
                                                           <div class="iconlang">
                                                               <img  src="images/spain.png">
                                                           </div>
                                                           <div class="writelang">
                                                               <h2>Spanish</h2>
                                                           </div>
                                                      </div>
                                                      <div class="leftlang">
                                                           <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                      </div>
                                                  </div>
                                              </div>
                                          </a>
                                          </div> 
                                          <div class="alllanguages">
                                              <a href="#">
                                                  <div class="albanian" id="radiolang9">
                                                      <div class="positionlang">
                                                          <div class="centerlang">
                                                               <div class="iconlang">
                                                                   <img  src="images/spain.png">
                                                               </div>
                                                               <div class="writelang">
                                                                   <h2>Spanish</h2>
                                                               </div>
                                                          </div>
                                                          <div class="leftlang">
                                                               <input class="radiolang" name="radiolang9" id="spanish" type="radio">
                                                          </div>
                                                      </div>
                                                  </div>
                                              </a>

                                          </div>   
                                   
                                       </div>
                                       <div class="morelang">
                                              <a href="#"><div class="writemore"><?php echo $language['seemorelanguage'];?></div></a>
                                       </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                    <div class="dropcard">
                        <div class="lang">
                             <a href="#"><div class="">Shporta</div></a>
                             <a href="#"><div class="">plus</div></a>
                             <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                        </div>
                    </div>
                     <div class="dropfavority">
                        <div class="lang">
                             <a href="#"><div class="">favority</div></a>
                             <a href="#"><div class="">plus</div></a>
                             <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                        </div>
                    </div>

                    <div class="search_width">
                         <div class="search_body">
                             ckemi si jeni 
                         </div>

                    </div>
                    <div class="treguesi"></div>
              </div>
           </div>
      </nav>
<div class="under_category"></div>
      
      <div class="category">
      <div class="border_write_cat"></div>
         <div class="categoposition" style="z-index: 4 !important;" >
        <!--  show all category type -->
         
          <?php include'category_and_subscribe.php';?>

         </div>  
      </div>

      <div class="loadersubscribe"> <!-- loader  div .......................--> 
             <div class="position_loader">
                 <div class="imgpreloader">
                      <img src="../images/preloader.gif">
                 </div>
                 <div class="writeloader">
                    <h3>Loading Search </h3>
                 </div>
                 <div class="imgloading">
                     <img src="../images/loading.gif">
                 </div>
             </div>
      </div>
      <div class="searchsubscribe">

             <div class="wisthisearchsub">
                 <a href="#" class="nondecoration">
                     <div class="settings_delete_search_company">
                          <div class="imgsearchsub">
                              <center>
                              <img src="images/searchcompany.png">
                              </center>
                          </div>
                          
                          <div class="delete_search_company">
                               <center>
                                <img src="images/delete.png">
                                </center>
                          </div>
                     </div>
                 </a>
                
                 <div class="searchsub">
                      <input class="inputsearchcompany" type="text" placeholder="Search Company" style="border:none;">
                 </div>
                  <a href="#" class="nondecoration">
                     <div class="iconsearchsub">
                        <div class="settings_search_company">
                               <center>
                               <img src="images/settings.png">
                               </center>
                          </div> 
                     </div>
                 </a>
             </div>
        
        </div>

        <div class="pointer_catego">
             <div class="border_pointer_category">
                 <div class="pointer_div"></div>
             </div>
             <div class="opacity_border_pointer">
               
             </div>
             <div class="bodypointer">
                 
                 <div class="writepointer">
                     
                 </div>
             </div> 
            
               
        </div><br>

        <div class="containere">  <!-- container for products .....................................-->
             <div class="gjeresia">
                 <div class="containerleft">
                     <div class="option_products"></div>
                     <div class="add_elemnt_option"></div>
                     <div class="all_prod"> </dd>
                      <?php include 'products/products.php';?>
                     </div>

                      <br><br>
                        <script src='zoom/jquery.zoom.js'></script>

                          <style type="text/css">
                             /* styles unrelated to zoom */
                          * { border:0; margin:0; padding:0; }
                          p { position:absolute; top:3px; right:28px; color:white; font:bold 13px/1 sans-serif;}

                          /* these styles are for the demo, but are not required for the plugin */
                          .zoom {
                              display:inline-block;
                              position: relative;
                              width: 100%;

                          }
                          
                          /* magnifying glass icon */
                          .zoom:after {
                              content:'';
                              display:block; 
                              width:33px; 
                              height:33px; 
                              position:absolute; 
                              top:0;
                              right:0;
                              background:url(zoom/icon.png);
                          }

                          .zoom img {
                              display: block;
                          }

                          .zoom img::selection { background-color: transparent; }
                          </style>
                    </div>

                    <div class="containerright" >
                        
                          <div class="sponsorized_right">
                                 <div class="icon_go_up">
                                 <a href="#"><img class="click_up" src="images/up.png"></a>

                                 
                            </div>
                          </div>
                          <div class="pagination_profucts">
                           

                            <div class="pagin_number">
                            
                            </div>
                          </div>
                    </div>
            </div>
        </div>



        <div class="clickchat"> <!--  start the chat ................................................-->
            <a href="#">
                <div class="openchat" id="showchat">
                    <div class="imgopenchat">
                        <div class="pointerchat"></div>
                            <img src="images/chat.png">
                             <div class="nrnotification" id="nrnotification">
                            1
                            </div>
                        </div>
                 </div>
            </a>
            <div class="bodychat">
                  <div class="pasiv_activ_bodychat">
                        <div class="headerchat">
                            <div class="writechat">
                              Live Chat
                            </div>
                            <div class="minimizechat">
                                
                            </div>
                            <div class="closechat">
                                
                            </div>
                        </div>
                  </div>  

            </div>
        </div>  <!--  End the chat ................................................-->

</div>

</div>

</body>

</html>


