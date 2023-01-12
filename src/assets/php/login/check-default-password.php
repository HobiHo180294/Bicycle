<?php
// IMPORT
require_once '../database/connect.php';
require_once '../functions/functions.php';

if (!empty($_POST['defaultPassValue'])) {
  $user_input_default_pass = defendValueFromViralInput('defaultPassValue');

  $encrypted_input_default_pass = encryptPassSHA512($user_input_default_pass);

  $check_default_pass = mysqli_query($connect, "SELECT * FROM `users` 
                                                WHERE `userPasswordHash` = '$encrypted_input_default_pass'");

  if (mysqli_num_rows($check_default_pass) > 0)
    echo json_encode(['status' => 'success']);
  else echo json_encode(['status' => 'error']);
}
