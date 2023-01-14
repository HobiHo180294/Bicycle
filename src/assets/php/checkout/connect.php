<?php
session_start();

require_once("../database/connect.php");

$id = $_POST['orderId'];
$named = $_POST['firstdata'];
$surnamed = $_POST['lastdata'];
$usernamed = $_POST['userdata'];
$emailnamed = $_POST['emaildata'];
$addressnamed = $_POST['addressdata'];
$shippingnamed = $_POST['shippingdata'];
$countrynamed = $_POST['countrydata'];
$citynamed = $_POST['citydata'];
$zipnamed = $_POST['zipdata'];

print_r($_POST);

$sql = "INSERT INTO `order_data` 
        VALUES ('$id', '$named', '$surnamed', '$usernamed', 
        '$emailnamed', '$addressnamed', '$shippingnamed', 
        '$countrynamed', '$citynamed', '$zipnamed')";

mysqli_query($connect, $sql);

echo "$id";

$orderSQL = "SELECT `itemTitle`, `itemPrice`, `itemQuantity` 
            FROM `ordersMain` WHERE `orderId`= '$id'";

$result = mysqli_query($connect, $orderSQL);

// Initialize an empty string to store the item prices
$items = '';
$totalItems = 0;
$totalPrice = 0;

while ($order = mysqli_fetch_assoc($result)) {
  $items .= "\n\t- " . $order['itemTitle'] . "(" . $order['itemQuantity'] . " PC.)";
  $totalItems += $order['itemQuantity'];
  $totalPrice += $order['itemPrice'] * $order['itemQuantity'];
}

// sending e-mail
$mail_subject = strtoupper('order #' . $id);

$send_mail_to = $_SESSION['logged-user']['username'];
$send_mail_from = 'hitechnic.uu68@gmail.com';

$mail_message = 'DETAILS ABOUT YOUR ORDER: ' . "\r\n" .
  'Order ID: ' . $id . "\r\n" .
  'Ordered items: ' . $items . "\r\n" .
  'Total items: ' . $totalItems . "\r\n" .
  'Total price: ' . $totalPrice .  ' EUR' . "\r\n";

$mail_headers = "From: $send_mail_from" . "\r\n" .
  "Reply-To: $send_mail_from" . "\r\n" .
  "X-Mailer: PHP/" . phpversion();

if (mail($send_mail_to, $mail_subject, $mail_message, $mail_headers)) {
  $updateSQL = "UPDATE `ordersMain` SET `isPaid` = '1' 
                WHERE `orderId`= '$id'";

  mysqli_query($connect, $updateSQL);
} else echo "NOOOO";

mysqli_close($connect);

header('Location: ../overview/overview.php');
