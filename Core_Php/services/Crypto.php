<?php
namespace  server\services\crypto;

class Crypto  {

    private static $key;

    private static $iv;

    public static function init(){

        self::$key = pack("H*", md5('?>~!.0!?best_seller!secretkey95,KSWEB></!`~`.' ) );
        self::$iv =  pack("H*", md5('?>~!.0!?best_seller!ivkey95,KSWEB></!`~`.' ) );
    }

    public function encrypt_in_server( $text ){

        self::init();

        $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, self::$key , $text , MCRYPT_MODE_CBC, self::$iv );

        return base64_encode( $ciphertext );

    }

    public function decrypt_in_server( $encrypted ){

        self::init();

         //Now we receive the encrypted from the post, we should decode it from base64,

        $encrypted = base64_decode( $encrypted );

        return mcrypt_decrypt(MCRYPT_RIJNDAEL_128, self::$key, $encrypted, MCRYPT_MODE_CBC, self::$iv );


    }

    public function decrypt( $ivHashCiphertext, $password ) {

        $method = "AES-256-CBC";

        $iv = substr($ivHashCiphertext, 0, 16);

        $hash = substr($ivHashCiphertext, 16, 32);

        $ciphertext = substr($ivHashCiphertext, 48);

        $key = hash('sha256', $password, true);

        if ( hash_hmac('sha256', $ciphertext, $key, true) !== $hash ) return null;

        return openssl_decrypt( $ciphertext, $method, $key, OPENSSL_RAW_DATA, $iv );

    }

    public function encrypt( $plaintext, $password ) {

        $method = "AES-256-CBC";

        $key = hash('sha256', $password, true);

        $iv = openssl_random_pseudo_bytes(16);

        $ciphertext = openssl_encrypt( $plaintext, $method, $key, OPENSSL_RAW_DATA, $iv );

        $hash = hash_hmac('sha256', $ciphertext, $key, true);

        return $iv . $hash . $ciphertext;
    }

    public function encode_string( $string  ){

        self::init();

        $mcrypt_iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);

        $mcrypt_iv = mcrypt_create_iv($mcrypt_iv_size, MCRYPT_RAND);

        $mcrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, self::$key, $string, MCRYPT_MODE_ECB, $mcrypt_iv);

        $encoded = base64_encode( $mcrypted );

         return self::encrypt( $encoded , self::$key );

    }

    public function decode_string( $hash ){

        self::init();

        $hash = self::decrypt( $hash , self::$key );

        $mcrypt_iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);

        $mcrypt_iv = mcrypt_create_iv($mcrypt_iv_size, MCRYPT_RAND);

        $basedecoded = base64_decode( $hash );

        return mcrypt_decrypt(MCRYPT_RIJNDAEL_128, self::$key, $basedecoded, MCRYPT_MODE_ECB, $mcrypt_iv);

    }

}

?>