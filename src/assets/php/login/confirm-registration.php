<?php
// IMPORT
require_once '../database/connect.php';
require_once '../functions/functions.php';


if (
  !empty($_POST['user-default-pass']) &&
  !empty($_POST['user-new-pass']) &&
  !empty($_POST['user-confirm-pass'])
) {

  $successful_registration_message = 'Your registration is successfully completed! Now you can log into your account';
  $redirect_location = 'http://yehorka.com/web-shop/bicycle/dist/login.html';

  $user_default_pass = defendValueFromViralInput($_POST['user-default-pass']);
  $user_new_pass = defendValueFromViralInput($_POST['user-new-pass']);
  $user_confirm_pass = defendValueFromViralInput($_POST['user-confirm-pass']);

  $encrypted_default_pass = encryptPassSHA512($user_default_pass);
  $encrypted_new_pass = encryptPassSHA512($user_new_pass);

  $update_default = mysqli_query($connect, "UPDATE `users` 
                          SET `userPasswordHash` = '$encrypted_new_pass', `isConfirmed` =  '1' 
                          WHERE `userPasswordHash` = '$encrypted_default_pass'");

  mysqli_close($connect);

  if ($update_default) displayAlertAndRedirectTo($successful_registration_message, $redirect_location);
}
