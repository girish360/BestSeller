<?php

class products extends connection{

    public $all_product;
    public $imageproduct = array();
    public $favorite_cookie;
    public $card_cookie;
    public $allpages;
    public $products_for_pages=6;
    public $products_limit;
    public $total_pages;

    public function getproducts($type){  // get all products .....................................

        if($type=='default'){
            $sql = 'SELECT * from products';
            $result = self::select_query($sql);
            $this->all_product = $result;
            return $this->all_product;
        }
        else{
            $sql = "SELECT * from products WHERE id_category='".$type."'";
            $result = self::select_query($sql);
            $this->all_product = $result;
            return $this->all_product;
        }
    }
    public function  get_image_products($id){ // get image of products ........................
        $query = 'SELECT * from image_products where id_product="'.$id.'" ';
        $res = self::select_query($query);
        $i=0;
        while($result = $res->fetch_assoc()){
            foreach ($result as $key => $value) {
                $this->imageproduct[$i][$key] = $value;
            }
            $i++;
        }
    }
    public function get_owner_product($id_prod){
        $sql = "SELECT * from adminat where id ='".$id_prod."'";
        $result = self::select_query($sql);
        $owner = $result->fetch_assoc();
        return $owner;
    }
    public function add_favority_product($id_product){ // add favority method .................

        $query = "SELECT * from products where id='".$id_product."'"; // query for get data  in the database for this product................
        $go_query = self::select_query($query); // call method run_query for execute query ....................................
        if(mysqli_num_rows($go_query)>0){ // check if the result is more bigger than  0 ...............................
            $result = $go_query->fetch_assoc(); // get array assoc from database with data products that user click for add into wishlist.........................
            $array_cookie = self::cookie_favorite_products($result); // call functian  cookie_products_favority  and send data product  add into cookie for fvority products.......

            echo $array_cookie; // echo number  . ............................

        }else{

        }
    }

    public function cookie_favorite_products($array_product_favorite){ // method for favorite_products into the cookie ..............................
        $nr=0;
        if(isset($_COOKIE['favoi'])){ // check if exzists cookie for favorite_products.. if it exists add another products ................
            $array_favorite = unserialize($_COOKIE['favoi']);
            for ($i=0;$i<count($array_favorite);$i++){
                if($array_favorite[$i]['id']==$array_product_favorite['id']){
                    $nr++;
                }
            }
            if($nr==0 && $nr=='0'){
                $count = count($array_favorite); // count the products that exists into the array ...........................
                $array_favorite[$count]=$array_product_favorite; // build array with a other product .................
                $array_final = serialize($array_favorite); // make  serialize array that add into the cookie as string (data) ................
                $count = count($array_favorite); // count array ...............
                setcookie('favoi','',time()-3600, "/"); // cookie destory ...............................
                setcookie('favoi',$array_final,time()+(3600*60), "/"); //  one month  ..create cookie  with array data for  favority_products............................

                return $count; // return new array ..........................................
            }
            else{

                return count($array_favorite);
            }
        }
        // end if .......................
        else{ // create cookie for favorite_products..................................................................................................

            $array_favorite_products= array(); // create first array..........................
            $i=0; // number start from 0 ...................................................
            $array_favorite_products[$i]=$array_product_favorite; // build array with another  array that have details for this product ..........
            $count = count($array_favorite_products);
            $array_final=serialize($array_favorite_products); // make  serialize array that add into the cookie as string (data) ................
            setcookie('favoi',$array_final,time()+(3600*60), "/"); // one month  ..create  first cookie ........................................

            return $count; // return data from product that is add ...............................

        } //end else ...................

    } // end method ......................

    public function getcookie_favorite_products(){
        if(isset($_COOKIE['favoi'])){
            $this->favorite_cookie= unserialize($_COOKIE['favoi']);

        }else{
            $value=0;
            $this->favorite_cookie=$value;
        }

    }

    public function getcookie_card_products(){
        if(isset($_COOKIE['card_products'])){
            $this->card_cookie= unserialize($_COOKIE['card_products']);

        }else{
            $value=0;
            $this->card_cookie=$value;
        }
    }

    public function get_product_details($id_product){
        $sql = "SELECT * from products where id='".$id_product."'";


        $getrow=self::select_query($sql); // call methos run_query ...............................
        $i=0;
        $ret = array(); // array
        while ($row = mysqli_fetch_assoc($getrow)) { // fetch row  from db.....................
            foreach ($row as $key => $value) { //  data as row ................................
                $ret[$i][$key] = $value; // build array ...............................
            }
            $i++;
        }
        return ($ret); // return array........................

    }

    public function getpages($all_row, $start){
        $this->total_pages = ceil($all_row/$this->products_for_pages);
        $query_pages= self::select_limit('products' , $start , $this->products_for_pages);
        $this->products_limit = $query_pages;
        return $query_pages;
    }
    public function getpages_category($all_row, $start, $id_category){

        $this->total_pages =  ceil($all_row/$this->products_for_pages);

        $query_pages = "SELECT * from products WHERE id_category='".$id_category."' LIMIT ".$start*$this->products_for_pages." , ".$this->products_for_pages."";
        $query_exe = self::select_query($query_pages);
        $this->products_limit = $query_exe;
        return $query_exe;
    }


    public function getpage_link($number_total_pages , $number_click , $type_link){
        $link='';
        if($number_click==0){ // this get when page make first load .............
            $number_click++;
            if($number_total_pages<=9){ // check if number total is  bigger than 10 or  equals .....................
                for($i=1;$i<=$number_total_pages;$i++){
                    if($i==1){
                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    }else{
                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    }
                }
                if($number_click+5<=$number_total_pages){
                    $link.="<div class='pagess_link_back_forward' id='fast_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                               <span class='glyphicon glyphicon-fast-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                }else{
                    $link.="<div class='pagess_link_back_forward' id='step_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                               <span class='glyphicon glyphicon-step-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                }
                return $link;
            }
            else{
                for($i=1;$i<=$number_click+6;$i++){
                    if($i==1){
                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    }else{
                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    }
                }
                $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='1'><div class='link_page_value'>..</div></div></a><div class='type_products' id='$type_link'></div></div>";
                $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$number_total_pages'><div class='link_page_value'>$number_total_pages</div></div></a><div class='type_products' id='$type_link'></div></div>";
                $link.="<div class='pagess_link_back_forward' id='fast_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-fast-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";

                return $link;
            }
        }else{   // get link for pages when user click on any pages to show ...............
            if($number_click<=3){ // check if pages is  smaller than 3 or equals ...........................
                if($number_total_pages<=9){
                    if($number_click>1){
                        $link.="<div class='pagess_link_back_forward' id='step_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-step-backward'></span></div></div></a><div class='type_products' id='$type_link'></div></div>";
                    }
                    for($i=1;$i<=$number_total_pages;$i++){
                        if($i==$number_click){
                            $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                        }else{
                            $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                        }
                    }
                    if($number_click+5<=$number_total_pages){
                        $link.="<div class='pagess_link_back_forward' id='fast_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-fast-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                    }else{
                        if($number_click<$number_total_pages){
                            $link.="<div class='pagess_link_back_forward' id='step_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                        <span class='glyphicon glyphicon-step-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                        }
                    }
                    return $link;
                }
                else{
                    if($number_click==1){
                        for($i=1;$i<=$number_click+6;$i++){
                            if($i==$number_click){
                                $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                            }else{
                                $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a> <div class='type_products' id='$type_link'></div></div>";
                            }

                        }
                    }
                    else{
                        if($number_click==2){
                            $link.="<div class='pagess_link_back_forward' id='step_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                       <span class='glyphicon glyphicon-step-backward'></span></div></div></a><div class='type_products' id='$type_link'></div></div>";
                            for($i=1;$i<=$number_click+4;$i++){
                                if($i==$number_click){
                                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                }else{
                                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                }
                            }
                        }
                        else{
                            if($number_click==3){
                                $link.="<div class='pagess_link_back_forward' id='step_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                             <span class='glyphicon glyphicon-step-backward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                                for($i=1;$i<=$number_click+3;$i++){
                                    if($i==$number_click){
                                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                    }else{
                                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                    }
                                }
                            }
                        }
                    }
                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$number_total_pages'><div class='link_page_value'>..</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$number_total_pages'><div class='link_page_value'>$number_total_pages</div></div></a><div class='type_products' id='$type_link'></div></div>";


                    if($number_click+5<=$number_total_pages){
                        $link.="<div class='pagess_link_back_forward' id='fast_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-fast-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                    }else{
                        $link.="<div class='pagess_link_back_forward' id='step_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-step-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                    }

                    return $link;

                }

            } // end number click is smaller than 3 or equals ................
            else{ // here number click is bigger than 3 ................

                if($number_total_pages>$number_click+2){
                    if($number_click>=5){
                        $link.="<div class='pagess_link_back_forward' id='fast_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                  <span class='glyphicon glyphicon-fast-backward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                    }
                    else{
                        $link.="<div class='pagess_link_back_forward' id='step_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                  <span class='glyphicon glyphicon-step-backward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";

                    }

                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='1'><div class='link_page_value'>1</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='1'><div class='link_page_value'>..</div></div></a><div class='type_products' id='$type_link'></div></div>";


                    for($i=$number_click-1;$i<=$number_click+2;$i++){
                        if($i==$number_click){
                            $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                        }else{
                            $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                        }
                    }
                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='1'><div class='link_page_value'>..</div></div></a><div class='type_products' id='$type_link'></div></div>";

                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$number_total_pages'><div class='link_page_value'>$number_total_pages</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    if($number_click+5<=$number_total_pages){
                        $link.="<div class='pagess_link_back_forward' id='fast_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-fast-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                    }else{
                        $link.="<div class='pagess_link_back_forward' id='step_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-step-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";

                    }
                    return $link;
                }
                else{
                    if($number_click>=5){
                        $link.="<div class='pagess_link_back_forward' id='fast_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                  <span class='glyphicon glyphicon-fast-backward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";
                    }
                    else{
                        $link.="<div class='pagess_link_back_forward' id='step_backward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                  <span class='glyphicon glyphicon-step-backward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";

                    }
                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='1'><div class='link_page_value'>1</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='1'><div class='link_page_value'>..</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    if($number_click+1==$number_total_pages){
                        for($i=$number_click-4;$i<=$number_total_pages;$i++){
                            if($i==$number_click){
                                $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                            }else{
                                $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                            }
                        }
                    }else{
                        if($number_click==$number_total_pages){
                            for($i=$number_click-6;$i<=$number_total_pages;$i++){
                                if($i==$number_click){
                                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                }else{
                                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                }
                            }
                        }
                        else{
                            for($i=$number_click-3;$i<=$number_total_pages;$i++){
                                if($i==$number_click){
                                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link active_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                }else{
                                    $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                                }
                            }

                        }
                    }


                    if($number_click!=$number_total_pages){
                        $link.="<div class='pagess_link_back_forward' id='step_forward'><a href='#'><div class='padding_link_fast_step_forward_backward' id='$number_click'><div class='link_page_value'>
                                   <span class='glyphicon glyphicon-step-forward'></span></div></div></a><div class='type_products' id='$type_link'></div><div class='type_products' id='$type_link'></div></div>";

                    }

                    return $link;


                }



            }
        }

    }

}

$products=new products; // create object ..............................................................


?>










