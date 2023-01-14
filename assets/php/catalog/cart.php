<?php

require_once '../database/connect.php';



$order = $_POST['order'];

$itemId = $_POST['itemId'];

$orderID = 1;

$username = $_POST['username'];

$itemImage = $_POST['productObjImage'];

$itemTitle = $_POST['productObjTitle'];

$itemPrice = $_POST['itemPrice'];

$itemQuantity = $_POST['productObjQuantity'];

$check_empty = mysqli_query($connect, "SELECT COUNT(*) FROM `ordersMain`");

if (mysqli_fetch_row($check_empty)[0] > 0) {
  $lastOrderSQL = "SELECT MAX(orderId) FROM ordersMain";
  $orderID = mysqli_fetch_row(mysqli_query($connect, $lastOrderSQL))[0] + 1;
}


if (!$connect) {
  die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";
print_r($orderId);


$sql = "INSERT INTO ordersMain (orderId, username, itemId, itemImage, itemTitle, itemPrice, itemQuantity) VALUES ('$orderID', '$username', '$itemId', '$itemImage', '$itemTitle', '$itemPrice' , '$itemQuantity')";

if (mysqli_query($connect, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($connect);
}

header('Location: http://yehorka.com/web-shop/bicycle/dist/assets/php/checkout/index.php');

mysqli_close($connect);
