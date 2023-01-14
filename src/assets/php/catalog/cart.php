<?php

require_once '../database/connect.php'; 

$order = $_POST['order'];

$itemId = $_POST['itemId'];

$orderId = $_POST['orderId'];

$username = $_POST['username'];

$itemImage = $_POST['productObjImage'];

$itemTitle = $_POST['productObjTitle'];

$itemPrice = $_POST['itemPrice'];

$itemQuantity = $_POST['productObjQuantity'];

$orderIsPaid =  $_POST['orderObjIsPaid'];

if (!empty($orderId)) {

  if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";
print_r($orderId);


$sql = "INSERT INTO ordersMain (orderId, username, itemId, itemImage, itemTitle, itemPrice, itemQuantity, isPaid	) VALUES ('$orderId', '$username', '$itemId', '$itemImage', '$itemTitle', '$itemPrice' , '$itemQuantity', '$orderIsPaid')";
if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connect);
}
mysqli_close($connect);


// print_r($order);
  
}

// mysqli_close($connect);
