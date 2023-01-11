<?php
require_once '../database/connect.php';

// Functions
function genRandDefaultPass()
{
  return bin2hex(openssl_random_pseudo_bytes(5)) . 'Ao1';
}

function makePassSHA512Encrypted($password)
{
  $encryption_hash = hash('sha512', $password);
  $encrypted_pass = password_hash($encryption_hash, PASSWORD_DEFAULT);

  return $encrypted_pass;
}

// Check form fireld
if (!empty($_POST['user-email'])) {
  $user_email = filter_var(
    trim($_POST['user-email']),
    FILTER_SANITIZE_EMAIL
  );

  // Pass encryption + generation
  $random_default_pass = genRandDefaultPass();

  $encrypted_pass = makePassSHA512Encrypted($random_default_pass);

  // Sending e-mail
  $mail_subject = strtoupper('registration confirmation');

  $send_mail_to = $user_email;
  $send_mail_from = 'hitechnic.uu68@gmail.com';

  $mail_message = 'Your temporary password: ' . $random_default_pass;

  $mail_headers = "From: $send_mail_from" . "\r\n" .
    "Reply-To: $send_mail_from" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

  // Fulfilling cells 
  mysqli_query($connect, "INSERT INTO `users` (`username`, `defaultPass`, `isRegistered`) 
                            VALUES('$user_email', '$encrypted_pass', '1')");

  if (mail($send_mail_to, $mail_subject, $mail_message, $mail_headers))
    header('Location: ../../../reassign.html');
  else die('Mail is not sended!');
}




  // // Check customer in databse
  // $check_customer = mysqli_query($connect, "SELECT * FROM `customers` 
  //                                         WHERE `username` = '$customer_email' 
  //                                         AND `isRegistered` = '1'");

  // if (mysqli_num_rows($check_customer) > 0) {
  //   $row = mysqli_fetch_assoc($check_customer);
  //   json_encode(['status' => 'success']);
  // } else {
  //   json_encode(['status' => 'error']);
  // }