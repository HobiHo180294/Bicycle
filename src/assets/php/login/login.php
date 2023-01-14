<?php

// IMPORT
require_once './screen-resolution.php';
require_once '../database/connect.php';
require_once '../functions/functions.php';

if (
  isset($_POST['user-email']) &&
  isset($_POST['user-pass'])
) {
  $user_email = filter_var(
    trim($_POST['user-email']),
    FILTER_SANITIZE_EMAIL
  );

  $user_password = defendValueFromViralInput($_POST['user-pass']);

  $encrypted_user_password = encryptPassSHA512($user_password);

  $check_user = mysqli_query($connect, "SELECT * FROM `users` 
                                        WHERE `username` = '$user_email' 
                                        AND `userPasswordHash` = '$encrypted_user_password'
                                        AND `isConfirmed` = '1'
                                        AND (`isLogged` IS NULL OR `isLogged`='1')");

  // ! MESSAGES 
  $check_user_success = 'Congratulations with successful login into account!';
  $check_user_error = 'We cannot find user with such a data!';

  // ! LOCATIONS 
  $login_page_location = 'http://yehorka.com/web-shop/bicycle/dist/login.html';
  $catalog_page_location = 'http://yehorka.com/web-shop/bicycle/dist/index.html';

  if (mysqli_num_rows($check_user) > 0) {

    $logged_user = mysqli_fetch_assoc($check_user);

    $login_date_time = date("Y-m-d H:i:s");

    $user_os = getOS();

    echo "$user_os";

    $_SESSION['logged-user'] = [
      'id' => $logged_user['id'],
      'username' => $logged_user['username'],
      'realName' => $logged_user['realName'],
      'surname' => $logged_user['userSurname'],
      'loginDateTime' => $login_date_time
    ];

    $session_user_id = $_SESSION['logged-user']['id'];

    mysqli_query($connect, "UPDATE `users` 
                          SET `isLogged` = '1', `loginDateTime` =  '$login_date_time', 
                          `OS` = '$user_os', `status` = 'online'
                          WHERE `id` = '$session_user_id'");

    mysqli_close($connect);
    // displayAlertAndRedirectTo($check_user_success, $catalog_page_location);
  }

  if (mysqli_num_rows($check_user) == 0) {
    mysqli_close($connect);
    session_destroy();
    displayAlertAndRedirectTo($check_user_error, $login_page_location);
  }
}




// $operatorLogin = filter_var(
//   trim($_POST['operatorLogin']),
//   FILTER_SANITIZE_STRING
// );

// $operatorPass = filter_var(
//   trim($_POST['operatorPassword']),
//   FILTER_SANITIZE_STRING
// );

// $check_operator = mysqli_query($connect, "SELECT * FROM `operators` WHERE `login` = '$operatorLogin' AND `password` = '$operatorPass'");

// if (mysqli_num_rows($check_operator) > 0) {

//   $operator = mysqli_fetch_assoc($check_operator);

//   $_SESSION['operator'] = [
//     "id" => $operator['id'],
//     "login" => $operator['login'],
//     "password" => $operator['password'],
//   ];

//   mysqli_close($connect);

//   header('Location: requests.php');
// } else {
//   $_SESSION['message'] = 'Login or password incorrect!';
//   header('Location: error-auth.php');
// }