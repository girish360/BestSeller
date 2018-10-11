<?php

class mail{

    public function userforgetpassword($email){

        $conf=mt_rand();

        $confirmcode=substr($conf,0,6);

//        $this->db->query("UPDATE users set confirmacc='$confirmcode' where email='$email'");

        if(mysqli_affected_rows() >= 0){
            // send email
            $to = $email;
            $subject = "'".$confirmcode."' is your World's sell account recovery code";
            $message = "
       <html>
       <head> 
       <title> '".$confirmcode."' is your World's sell account recovery code</title>
       </head>
       <body>
       <p> This code is for confirm your account '".$confirmcode."'</p>

       <p>Or you can click button Confirm</p><br>
       <a href='localhost/shitble/login/changepassword.php'>Confrim your account</a>

     
       </body>
       </html>";

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            // More headers
            $headers .= 'From: <klodi282011@gmail.com>' . "\r\n";
            $headers .= 'Cc: klodi282011@gmail.com' . "\r\n";

            mail($to,$subject,$message,$headers);

            return true;


        }
        else{
            return false;
        }



    }


}




?>