<?php



class Crypto  {

  private $key;

  private $iv;

  public function __construct(){

      $this->key = pack("H*", "0123456789abcdef0123456789abcdef");
      $this->iv =  pack("H*", "abcdef9876543210abcdef9876543210");
  }

  public function encrypt_in_server(){

  }

  public function decrypt_in_server($encrypted){

//Now we receive the encrypted from the post, we should decode it from base64,
      $encrypted = base64_decode($encrypted);

      $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $this->key, $encrypted, MCRYPT_MODE_CBC, $this->iv);

      return $decrypted;
  }

   public function decrypt($ivHashCiphertext, $password) {
        $method = "AES-256-CBC";
        $iv = substr($ivHashCiphertext, 0, 16);
        $hash = substr($ivHashCiphertext, 16, 32);
        $ciphertext = substr($ivHashCiphertext, 48);
        $key = hash('sha256', $password, true);

        if (hash_hmac('sha256', $ciphertext, $key, true) !== $hash) return null;

        return openssl_decrypt($ciphertext, $method, $key, OPENSSL_RAW_DATA, $iv);
    }



    public function encrypt($plaintext, $password) {
        $method = "AES-256-CBC";
        $key = hash('sha256', $password, true);
        $iv = openssl_random_pseudo_bytes(16);

        $ciphertext = openssl_encrypt($plaintext, $method, $key, OPENSSL_RAW_DATA, $iv);
        $hash = hash_hmac('sha256', $ciphertext, $key, true);

        return $iv . $hash . $ciphertext;
    }

}


?>