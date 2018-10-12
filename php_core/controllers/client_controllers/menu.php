<?php
// start class for category....................

use server\services\fetch\fetch as fetch;

use server\database\database as db;


class menu extends controller
{
    public  $category;

    public $sub_category = Array();

    private $select_columns = array('id','name','image');

    private $table_name='categories';

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
        $category_result = db::select( $this->table_name ,$this->select_columns );

        $category_and_subcategory = fetch::fetch_data_array_dependet(

            $category_result,

            array('id','name','image'),

            array('column_dependet'=>'category_id','table_name'=>'subcategories','column'=>'id')

        );

        return fetch::json_data( $category_and_subcategory );
    }

}

?>