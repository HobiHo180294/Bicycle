<?php

require_once '../database/connect.php';

if (!empty($_POST['userEmailValue'])) {
  $user_email = filter_var(
    trim($_POST['userEmailValue']),
    FILTER_SANITIZE_EMAIL
  );


  // Check if user exists in databse
  $check_user = mysqli_query($connect, "SELECT * FROM `users` 
                                            WHERE `username` = '$user_email' 
                                            AND `isRegistered` = '1'");

  if (mysqli_num_rows($check_user) > 0) {
    $row = mysqli_fetch_assoc($check_user);
    echo json_encode(['status' => 'success']);
  } else {
    echo json_encode(['status' => 'error']);
  }
}
