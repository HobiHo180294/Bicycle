<?php

require_once '../database/connect.php';


if (
  !empty($_POST['amountOfOnline']) ||
  $_POST['amountOfOnline'] == 0
) {

  $check_online = mysqli_query($connect, "SELECT * FROM `users` 
                                            WHERE `isLogged` = '1' 
                                            AND `status` = 'online'");

  $online_now = mysqli_num_rows($check_online);
  if ($online_now >= 0)
    echo json_encode(['status' => 'success', 'online' => "$online_now"]);
  else echo json_encode(['status' => 'error']);
}
