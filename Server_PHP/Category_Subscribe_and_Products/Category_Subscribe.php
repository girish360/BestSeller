<?php
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
        $table = "categorytype"; // query
        $resu = self::select_all($table); // run_query ..
        $category_and_subCategory = []; // declare array ......
        $categorys =[];
        $length = $resu->num_rows; // count  row data in db ........
        if( $length > 0 ) { // check  if is bigger than 0 .....

            while ( $category = $resu->fetch_assoc() ) { // fetch all row  from db.....................

                $category_and_subCategory[]= $category;

                $sub_category = self::get_subcategory( $category['id'] );

                $category_and_subCategory[] = $sub_category;

            }
            $this->category = $categorys;
            return $category_and_subCategory;  // return array with category and sub_category .......
        }
    }

    public function get_subcategory( $id_category ) // method get sub_category .......
    {
        $table = 'allcategory_item';
        $column = 'id_categorytype';

        // query
        $res_query = self::select_dependet( $table , $column , $id_category ); // run_query ....
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
$category = new category_sub(); // declare obj .................
?>