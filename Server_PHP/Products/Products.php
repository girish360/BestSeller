<?php

class products extends Fetch_Data{

    public $all_products;

    public $products_for_pages=4;

    public $products_limit;

    public $pages_details;

    public $total_pages;

    public $count_row;

    public function getproducts( $details_products ){  // get all products .....................................

        if( $details_products['type'] == 'default' ){

            $result_fromDB = self::select_all( $tabel='products' ); // get product from db .....

            $tb_name_dep = 'adminat';

            $column_dep='id';

            $id='id_admin';

            $this->count_row = $result_fromDB ->rowCount();

            if( $this->count_row  < $this->products_for_pages ){

                $result = self::fetch_data_array_dependet( $result_fromDB , $tb_name_dep , $column_dep , $id );

                $this->all_products = $result;

                return $this->all_products;
            }
            else{

                 $result_limit = self::select_limit('products',$details_products['number_click'] ,$this->products_for_pages );

                 $this->products_limit = self::fetch_data_array_dependet(  $result_limit , $tb_name_dep , $column_dep , $id );

                 self::getpages(  $this->count_row  );

                 self::get_pages_details(  $this->total_pages ,$details_products['number_click'],'default');

                return array('products'=>$this->products_limit , 'pages_details'=>  $this->pages_details );
            }
        }
        else{
        }
    }

    public function get_pages_details( $total_number , $number_click , $type_link ){

        $this->pages_details = array( 'total_number'=>$total_number  , 'number_click'=>$number_click , 'type_link'=> $type_link );



    }

    public function getpages( $all_row ){

        $this->total_pages = ceil($all_row/$this->products_for_pages);



    }



    public function getpage_link( $number_total_pages , $number_click , $type_link ){
        $link='';
        if($number_click==0){ // this get when page make first load .............

            $number_click++;

            if($number_total_pages<=9){ // check if number total is  bigger than 10 or  equals .....................
                for( $i=1;$i<=$number_total_pages;$i++ ){
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
                for( $i=1;$i<=$number_click+6;$i++ ){
                    if($i==1){
                        $link.="<div class='pagess_link' ><a href='#' ><div class='padding_link active_link' id='$i'><div class='link_page_value' (click)='page($i)'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
                    }else{
                        $link.="<div class='pagess_link'><a href='#'><div class='padding_link' id='$i'><div class='link_page_value' (click)='page($i)'>$i</div></div></a><div class='type_products' id='$type_link'></div></div>";
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

$products = new products; // create object ..............................................................


?>










