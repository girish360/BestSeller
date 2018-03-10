<?php
// start class for category....................

class Category_Subscribe extends Fetch_Data
{
    public  $category;
    public $sub_category = Array();

    private $select_columns = array('id','name','image');

    private $table_name='category';



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
        $category_result = self::select_all($this->table_name ,$this->select_columns);

        $category_and_subcategory = self::fetch_data_array_dependet(

            $category_result,

            array('id','name','image'),

            array('column_dependet'=>'category_id','table_name'=>'sub_category','column'=>'id')

        );


        return self::json_data('category', $category_and_subcategory );
    }

}

?>