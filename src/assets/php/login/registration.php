<?php
// IMPORT
require_once '../database/connect.php';
require_once '../functions/functions.php';

// Check form field
if (
  !empty($_POST['user-email']) &&
  !empty($_POST['real-name']) &&
  !empty($_POST['user-surname'])
) {
  $user_email = filter_var(
    trim($_POST['user-email']),
    FILTER_SANITIZE_EMAIL
  );

  $real_user_name = defendValueFromViralInput($_POST['real-name']);
  $user_surname = defendValueFromViralInput($_POST['user-surname']);

  // Pass encryption + generation
  $random_default_pass = genRandDefaultPass();

  $encrypted_pass = encryptPassSHA512($random_default_pass);

  // Sending e-mail
  $mail_subject = strtoupper('registration confirmation');

  $send_mail_to = $user_email;
  $send_mail_from = 'hitechnic.uu68@gmail.com';

  $mail_message = 'Your temporary password: ' . $random_default_pass;

  $mail_headers = "From: $send_mail_from" . "\r\n" .
    "Reply-To: $send_mail_from" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

  // Fulfilling cells 
  mysqli_query($connect, "INSERT INTO `users` (`username`, `realName`, `userSurname`, `userPasswordHash`, `isRegistered`) 
                            VALUES('$user_email', '$real_user_name', '$user_surname', '$encrypted_pass', '1')");

  mysqli_close($connect);


  if (mail($send_mail_to, $mail_subject, $mail_message, $mail_headers))
    header('Location: ../../../reassign.html');
  else die('Mail is not sended!');
}
