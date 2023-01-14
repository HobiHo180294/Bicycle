<?php
session_start();

require_once '../database/connect.php';

// sending order to database
$lastOrderSQL = "SELECT MAX(orderId) FROM ordersMain";
$orderID =  mysqli_fetch_row(mysqli_query($connect, $lastOrderSQL))[0] + 1;

$orderID_from_form = $_POST['orderID'];

$orderSQL = "SELECT `username`, `itemId`, `itemImage`, `itemTitle`, `itemPrice`, `itemQuantity` 
            FROM `ordersMain` WHERE `orderId`= '$orderID_from_form'";

$orderResult = mysqli_query($connect, $orderSQL);

$items = '';
$totalItems = 0;

while ($order = mysqli_fetch_assoc($orderResult)) {
  $insert = "INSERT INTO ordersMain (orderId, username, itemId, itemImage, itemTitle, itemPrice, itemQuantity, isPaid)
      VALUES('$orderID', '{$order['username']}', '{$order['itemId']}', '{$order['itemImage']}', '{$order['itemTitle']}', '{$order['itemPrice']}', '{$order['itemQuantity']}', '1')";
  mysqli_query($connect, $insert);

  $items .= "\n\t- " . $order['itemTitle'] . "(" . $order['itemQuantity'] . " PC.)";
  $totalItems += $order['itemQuantity'];
}

// sending e-mail
$mail_subject = strtoupper('order #' . $orderID);

$send_mail_to = $_SESSION['logged-user']['username'];
$send_mail_from = 'hitechnic.uu68@gmail.com';

$mail_message = 'DETAILS ABOUT YOUR ORDER: ' . "\r\n" .
  'Order ID: ' . $orderID . "\r\n" .
  'Ordered items: ' . $items . "\r\n" .
  'Total items: ' . $totalItems . "\r\n" .
  'Total price: €' . $_POST['totalPrice'] . "\r\n";

$mail_headers = "From: $send_mail_from" . "\r\n" .
  "Reply-To: $send_mail_from" . "\r\n" .
  "X-Mailer: PHP/" . phpversion();

if (mail($send_mail_to, $mail_subject, $mail_message, $mail_headers)) echo "YESS";
else echo "NOOOO";

// ending
mysqli_close($connect);
header('Location: ./overview.php');
