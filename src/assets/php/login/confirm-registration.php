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

  $user_default_pass = defendValueFromViralInput('user-default-pass');
  $user_new_pass = defendValueFromViralInput('user-new-pass');
  $user_confirm_pass = defendValueFromViralInput('user-confirm-pass');

  $encrypted_default_pass = encryptPassSHA512($user_default_pass);
  $encrypted_new_pass = encryptPassSHA512($user_new_pass);

  $update_default = mysqli_query($connect, "UPDATE `users` 
                          SET `userPasswordHash` = '$encrypted_new_pass', `isConfirmed` =  '1' 
                          WHERE `userPasswordHash` = '$encrypted_default_pass'");

  if ($update_default) {
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>Successful Registration</title>
    </head>
    <body>
       <script>
        alert('$successful_registration_message');
        window.location.href = '$redirect_location';
        window.location.replace('$redirect_location');
       </script>
    </body>
    </html>";
  }
}
