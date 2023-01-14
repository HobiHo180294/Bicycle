<?php


$id = $_POST['orderID'];
$named = $_POST['firstdata'];
$surnamed = $_POST['lastdata'];
$usernamed = $_POST['userdata'];
$emailnamed = $_POST['emaildata'];
$addressnamed = $_POST['addressdata'];
$shippingnamed = $_POST['shippingdata'];
$countrynamed = $_POST['countrydata'];
$citynamed = $_POST['citydata'];
$zipnamed = $_POST['zipdata'];


$connect = mysqli_connect('sql.freedb.tech', 'freedb_webteam30', '@CWg2pvVMgWA%aU', 
  'freedb_webshop');

if (!$connect) die('Error connecting to database');


$query = "select * from ordersMain";
$result = mysqli_query($connect, $query);


$sql = "INSERT INTO order_data (order_fn, order_ln, order_username, order_email, order_address, order_shipping, order_country, order_city, order_zip)
VALUES ('$named', '$surnamed', '$usernamed', '$emailnamed', '$addressnamed', '$shippingnamed', '$countrynamed', '$citynamed', '$zipnamed')";



if (mysqli_query($connect, $sql)) {
    echo "\nSUCCESS!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connect);
}


require_once("connect.php");
$query = "select itemTitle, itemQuantity from ordersMain join order_data on order_shipping where orderId = ".$id;
$result = mysqli_query($connect, $query);

// Initialize an empty string to store the item prices

while ($row = mysqli_fetch_assoc($result)) {
    // Add the item price to the string
    $itemTitle = $row['itemTitle'];
    $itemQuantity = $row['itemQuantity'];
    $order_shipping = $row['order_shipping'];

    echo $itemQuantity;

    echo $row['itemQuantity'];


}



// Set the recipient email address
$to = "mhayman30@gmail.com";

// Set the email subject
$subject = "Your order:";


// Set the message

$message = "You just ordered ". $itemQuantity. "bikes. \r\nNamed:". $itemTitle.
"\r\nUsing ". $order_shipping;

// Set the headers
$headers = "From: sender@example.com" . "\r\n" .
"CC: cc@example.com";

// Send the email
mail($to, $subject, $message, $headers);




mysqli_close($connect);
