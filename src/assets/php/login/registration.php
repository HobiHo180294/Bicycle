<?php
// IMPORT
require_once '../database/connect.php';
require_once '../functions/functions.php';

// Check form field
if (!empty($_POST['user-email'])) {
  $user_email = filter_var(
    trim($_POST['user-email']),
    FILTER_SANITIZE_EMAIL
  );

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
  mysqli_query($connect, "INSERT INTO `users` (`username`, `userPasswordHash`, `isRegistered`) 
                            VALUES('$user_email', '$encrypted_pass', '1')");

  if (mail($send_mail_to, $mail_subject, $mail_message, $mail_headers))
    header('Location: ../../../reassign.html');
  else die('Mail is not sended!');
}
