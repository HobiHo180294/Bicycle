<?php

session_start();
require_once '../database/connect.php';


if (
  !empty($_POST['welcomeUserSurname'])
) {

  $user_surname = $_SESSION['logged-user']['surname'];

  $check_online_user = mysqli_query($connect, "SELECT * FROM `users` 
                                            WHERE `userSurname` = '$user_surname' 
                                            AND `status` = 'online'");

  if (mysqli_num_rows($check_online_user) > 0)
    echo json_encode(['status' => 'success', 'userSurname' => "$user_surname"]);
  else echo json_encode(['status' => 'error']);
}
