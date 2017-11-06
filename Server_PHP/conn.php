  <?php
   $dbHost     = "localhost";
   $dbUsername = "root";
   $dbPassword = "";
   $dbName     = "world_sell";
 
   $conn=new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);

   if ($conn->connect_error) {
    die('Connect Error: ' . $conn->connect_error);
}
    
?>