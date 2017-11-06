     <?php
     include 'class_connection.php';
     // start class for category....................
     class category_sub extends connection
     {
         public  $category;
         public $sub_category = Array();

         public function redukto($word, $limit = '20')
         {
             if (strlen($word) < 20) {
                 return $word;
             } else {
                 $wordsub = substr($word, '0', $limit);
                 $subtotal = $wordsub . '...';
                 return $subtotal;
             }

         }

         public function get_category() // method get category .......
         {
             $query = "SELECT * FROM categorytype"; // query
             $resu = self::run_query($query); // run_query ..
             $category_and_subCategory = []; // declare array ......
             $categorys =[];
             $length = $resu->num_rows; // count  row data in db ........
             if( $length > 0 ) { // check  if is bigger than 0 .....

                 while ( $category = $resu->fetch_assoc() ) { // fetch all row  from db.....................
                     $category_and_subCategory[] = $category;
                     $sub_category = self::get_subcategory($category['id']); // call method to fetch sub_category

                      // concat array  category with sub_category both .....
                        $category_and_subCategory [] = $sub_category;
                 }
                 $this->category = $categorys;
                 return $category_and_subCategory;  // return array with category and sub_category .......
             }
         }

         public function get_subcategory( $id_category ) // method get sub_category .......
         {
             $query = "SELECT * from allcategory_item  where id_categorytype='".$id_category."' "; // query
             $res_query = self::run_query($query); // run_query ....
             $length = $res_query->num_rows; // count row in db ....
             $sub_category = array(); //declare array ......
             if ( $length > 0 ) { // check if bigger than 0 ....

                while( $sub_categorys = $res_query->fetch_assoc() ){ // fetch all row from db ...

                    $sub_category[] = $sub_categorys; // build array with sub_category ....
                }
             }
             return $sub_category; // return array with sub_category .......
         }



     }

     header('Access-Control-Allow-Origin:*');
     $category_obj = new category_sub();

     if($_SERVER['REQUEST_METHOD']=='GET'){
         if(isset($_GET['get_category'])){

             $category_subcategory = $category_obj->get_category(); // call method get_category .....

             echo json_encode( array( "status"=>"get_category",$category_subcategory) , JSON_FORCE_OBJECT ); // convert array to json

         }
        if(isset($_GET['cookie_menu'])){
            if(isset($_COOKIE["cookie_menu"])){
                 setcookie("cookie_menu","",time()-((3600*60)*24)*30, "/");
              
            }
            else{
                setcookie("cookie_menu","menu_active",time()+((3600*60)*24)*30, "/");

            }
         }
         if(isset($_GET['check_cookie_menu'])){
              if(isset($_COOKIE["cookie_menu"])){
                setcookie("cookie_menu","",time()-((3600*60)*24)*30, "/");
                echo '1';
              }
              else{
                echo '0';
              }
              

          }

     }

     @$resu=$conn->query("SELECT * from categorytype");
     $result=$resu->fetch_assoc();
    
     echo '<div class="totaldiv">
                <div class="writecategory on_hover_category" id="on_hover_category"> 
                     <div class="catgow">
                        '.$language['categorywrite'].'
                     </div>
                     <div class="numberkategory">
                        <div class="minimize" id="minimize_category">
                            <a href="#"><img class="minimize_category_icon" src="images/remove.png"></a>
                        </div>
                        <div class="big_click" id="big_category">
                            <a href="#"><img src="images/big.png"></div>
                        </div>
                     </div>
                <div class="categorywidth mini_cat on_hover_category" id="on_hover_category">';
             
              
                while($result=$resu->fetch_assoc()){
                     ?>
                     <div class="cat_sub">
                     <a href="#" class="underline" id="<?php echo $result['id']?>">
                          <div class="categorytype" id="category<?php echo $result['id'] ?>">
                                  <div class="bordertypecat"></div>
                                  <div class="imgsubscribe">
                                         <img class="" src="images/<?php echo $result['image']?>">
                                             
                                  </div>
                                 
                                  <div class="namecate">
                                       <div class="namecategory" href="#"><?php echo  $catego->redukto($result['name_category'])?></div>
                                       <div class="full_name_hover"> Open <?php echo $result['name_category']?></div>
                                       <div class="full_name_hover_category_active"> Close <?php echo $result['name_category']?></div>
                                  </div>
                                  <div class="imgnc ">
                                        <img class="moresubcategory" src="images/morecat.png"><img  class="exitsubcategory" src="images/closesubcat.png">
                                  </div>
                          </div>
                     </a>
                     </div>
                     <?php
                     $nencategori=$conn->query("SELECT * from allcategory_item where id_categorytype='".$result['id']."' ");
                     $length=$nencategori->num_rows;
                     if($length>0){
                         $rows = array();
                         while($resul=$nencategori->fetch_assoc()){
                               $rows[]=$resul;
                         }
                         ?>
                         <div class="subcategory sub<?php echo $result['id']?>">
                         <?php
                               foreach($rows as $row){
                                      ?>
                                    <div class="cat_sub">
                                     <a href="#" class="nondecoration" id="<?php echo $row['id']?>">
                                          <div class="subcat" id="subcategory<?php  echo $row['id']?>">
                                                  <div class="bordertypecat"></div>
                                                  <div class="imgcategory">
                                                        <img src="images/<?php echo $row['image']?>">
                                                  </div>
                                                  <div class="namecate">
                                                       <div class="namecategory" href="#"><?php echo  $catego->redukto($row['name_category'])?></div>
                                                        <div class="full_name_hover"> <?php echo $row['name_category']?></div>

                                                  </div>
                                                  <div class="imgnc iconsubcategory">
                                                        <img src="images/drop1.png">
                                                  </div>
                                          </div>
                                     </a>
                                     </div>
                                     <?php
                                }//end foreach
                        echo'</div>';
                    } //end if
                    else{
                        ?>
                         <div class="subcategory sub<?php echo $result['id']?>">
                         <div class="cat_sub">
                         <a href="#" class="nondecoration">
                              <div class="dont_have_subcategory">
                                      <div class="bordertypecat"></div>
                                      <div class="imgcategory">
                                            <img src="images/not.png">
                                      </div>
                                      <div class="namecate">
                                           <div class="namecategory" href="#"><?php echo $catego->redukto($language['emptycat'])?></div>
                                      </div>
                                      <div class="imgnc iconsubcategory">
                                            <img src="images/drop1.png">
                                      </div>
                              </div>
                          </a>
                          </div>
                          </div>
                       <?php
                   } //end else
              } // end while primary
      echo '</div>';
      // in menu subscribe..
    if(isset($accessToken) || isset($_SESSION['id'])){
            if(isset($_SESSION['facebook_access_token']) || isset($_SESSION['id'])){
                    if(isset($_SESSION['id'])){
                            $sql=$conn->query("SELECT * from users where id='".@$_SESSION['id']."'");
                            $allresuser=$sql->fetch_assoc();
                    }
                    if(isset($_SESSION['facebook_access_token'])){
                          if(isset($_SESSION['id_fb'])){
                              $sql=$conn->query("SELECT * from users where oauth_uid='".@$_SESSION['id_fb']."'");
                              $allresuser=$sql->fetch_assoc();
                          }
                    }
            }
           
    }

    // subscribe for user
     $sqlsubscribe=$conn->query("SELECT ad.imageprofile,ad.name_company ,ad.id from adminat ad inner join followers fo on ad.id=fo.id_admin 
                               inner join users us on us.id=fo.id_user Where fo.id_user='".$allresuser['id']."'");
     $sqlcounsubscribe=$sqlsubscribe->num_rows;
     echo '<div class="writecategory on_hover_category min_sub_click"> 
               <div class="catgow">
                   '.$language['subscribewrite'].'
               </div>
                <div class="numberkategory">
                        <div class="minimize" id="minimize_subscribe">
                            <a href="#"><img class="minimize_category_icon" src="images/remove.png"></a>
                        </div>
                        <div class="big_click" id="big_subscribe">
                            <a href="#"><img src="images/big.png"></div>
                        </div>
                </div>
           </div>
           <div class="categorywidth subscribeonly minimize_subscribe  on_hover_category" id="on_hover_category">
           
           <div class="subuser">'; 
       while($sqlsubscrib=$sqlsubscribe->fetch_assoc()){
         ?>
            <div class="cat_sub">
           <a href="#" class="nondecoration" id="<?php echo $sqlsubscrib['id']?>">
                    <div class="company_subscribe" id="subscribe<?php echo $sqlsubscrib['id']?>">
                           
                            <div class="bordertypecat"></div>
                            <div class="imgsubscribe">
                                   
                                           <img class="imagesubscribe" src="images/<?php echo $sqlsubscrib['imageprofile']?>">
                                   
                            </div>
                            <div class="namecate">
                                 <div class="namecategory"  href="#"><?php echo  $catego->redukto($sqlsubscrib['name_company'])?></div>
                                  <div class="full_name_hover"> <?php echo $sqlsubscrib['name_company']?></div>
                            </div>
                            <div class="imgnc iconsubcategory">
                                  <img src="images/drop1.png">
                            </div>
                    </div>
            </a>
            </div>
      <?php } 
       ?>
       <div class="morecontact"> <div class="writemorecompany">MORE COMPANY</div></div>
       </div>

       </div>
       </div>
      <?php
     
    

?>