<?php
session_start();
require_once '../database/connect.php';


if (
  !empty($_POST['userName'])
) {

$user_id = $_SESSION['logged-user']['id'];

  $check_online_user = mysqli_query($connect, "SELECT * FROM `users` 
                                            WHERE `id` = '$user_id' 
                                            AND `status` = 'online'");

if(mysqli_num_rows($check_online_user) > 0){
  $user_name = $_SESSION['logged-user']['username'];
  echo json_encode(['status' => 'success', 'username' => "$user_name"]);
} else echo json_encode(['status' => 'error']);


  // $online_now = mysqli_num_rows($check_online);
  // if ($online_now >= 0)
  //   echo json_encode(['status' => 'success', 'online' => "$online_now"]);
  // else echo json_encode(['status' => 'error']);
}