<?php
// Include FB config file
require_once '../fbConfig.php';
require_once '../classlogin.php';

// Remove access token from session
unset($_SESSION['facebook_access_token']);

// Remove user data from session
unset($_SESSION['userData']);

unset($_SESSION['id']);

unset($_SESSION['id_fb']);


// Redirect to the homepage
header("Location:../index.php");
?>