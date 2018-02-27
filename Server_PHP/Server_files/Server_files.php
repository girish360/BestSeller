<?php
namespace server\dir\files{

    class Directorys_Files
    {
        private $root_dir = '../Controllers';

        public function get_directorys()
        {
            return self::dirToArray($this->root_dir);
        }

        public function dirToArray($dir)
        {
            $this->result = [];

            $scandir = scandir($dir);

            $result =[];

            foreach ($scandir as $key => $value) {

                if (!in_array($value, array(".", ".."))) {

                    if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {

                        $result[$value] = self::dirToArray($dir . DIRECTORY_SEPARATOR . $value);

                    } else {

                        $result[] = $value;
                    }
                }
            }

            return $result;
        }

        public function get_root_dir()
        {
            return $this->root_dir;
        }
    }
}

namespace server\files\Controllers {

    use Exception;

    use server\dir\files as dir;

    include '../Fetch_Data/Fetch_Data.php';

    $object_directorys = new dir\Directorys_Files();

    $directorys = $object_directorys->get_directorys();

    $Object=[];

    foreach ($directorys as $dir_name => $dir_value) {

        foreach ($dir_value as $file_key => $file_name) {

            $root_dir = $object_directorys->get_root_dir();

            $dynamic_dir = $root_dir . '/' . $dir_name . '/';

            $class_name = substr($file_name, 0, strlen($file_name) - 4);

            if (file_exists($dynamic_dir . $class_name . '.php')) {

                include $dynamic_dir . $class_name . '.php';

                $Object[$class_name] = new $class_name;

            } else {

                throw new Exception('file name: ' . $file_name . ' not found');
            }
        }
    }
}

?>