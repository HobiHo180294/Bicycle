<?php
session_start();

require_once '../database/connect.php';

if (
  !empty($_POST['screenWidth']) &&
  !empty($_POST['screenHeight']) &&
  !empty($_POST['userEmailVal'])
) {
  $_SESSION['screen-resolution'] = [
    'screenWidth' =>  $_POST['screenWidth'],
    'screenHeight' => $_POST['screenHeight'],
  ];

  $user_screen_width = $_SESSION['screen-resolution']['screenWidth'];
  $user_screen_height = $_SESSION['screen-resolution']['screenHeight'];
  $logged_user_email = $_POST['userEmailVal'];

  mysqli_query($connect, "UPDATE `users` 
                          SET `screenWidth` = $user_screen_width, `screenHeight` =  '$user_screen_height' 
                          WHERE `username` = '$logged_user_email'");

  mysqli_close($connect);
}
