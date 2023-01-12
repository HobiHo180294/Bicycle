<?php

function genRandDefaultPass()
{
  return bin2hex(openssl_random_pseudo_bytes(5)) . 'Ao1';
}

function encryptPassSHA512($password)
{
  $encrypted_pass = hash('sha512', $password);
  return $encrypted_pass;
}

function defendValueFromViralInput($value_from_form)
{
  $defend_value = htmlspecialchars($_POST["$value_from_form"]);
  $defend_value = urldecode($defend_value);
  $defend_value = trim($defend_value);

  return $defend_value;
}

function displayAlert($message)
{
  // Display the alert box 
  echo "<script>alert('$message');</script>";
}
