<?php
// start class for category....................

class Category_Subscribe extends Fetch_Data
{
    public  $category;
    public $sub_category = Array();

    private $select_columns = array('id','name_category','language','image');

    private $table_name='categorytype';

    private $table_name_dependet = 'allcategory_item';

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

            array('id','name_category','image'),

            array('column_dependet'=>'id_categorytype','table_name'=>'allcategory_item','column'=>'id')

        );


        return self::json_data('category', $category_and_subcategory );
    }

}

?>