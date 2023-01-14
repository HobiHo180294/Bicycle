<?php
session_start()
?>

<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Orders Overview</title>
  <link rel="stylesheet" href="../../../overview.css" />
</head>

<body>
  <div class="wrapper">
    <h1>Orders History</h1>

    <div class="orders-container">
      <?php
      require_once '../database/connect.php';

      $current_username = $_SESSION['logged-user']['username'];

      $orderID_SQL = "SELECT `orderId` FROM `ordersMain` WHERE `username` = '$current_username'
                      AND `isPaid` = '1' GROUP BY `orderId`";
      $orderResult = mysqli_query($connect, $orderID_SQL);

      while ($orderID = mysqli_fetch_row($orderResult)) {
        $itemSQL = "SELECT itemId, itemImage, itemTitle, itemPrice, itemQuantity FROM ordersMain WHERE orderId=" . $orderID[0];
        $itemResult = mysqli_query($connect, $itemSQL);

        $totalPrice = 0;

        echo '<div class="order">
          <div class="order__id">#' . $orderID[0] . '</div>
          <div class="item-container">';

        while ($itemDetails = mysqli_fetch_assoc($itemResult)) {
          echo
          '<div class="item">
              <div class="item__img" "><img width="150" src="' . $itemDetails['itemImage'] . '" alt="pic" /></div>
              <div class="item__title">' . $itemDetails['itemTitle'] . '</div>
              <div><span>Price:</span> €' . $itemDetails['itemPrice'] . '</div>
              <div><span>Amount:</span> ' . $itemDetails['itemQuantity'] . '</div>
            </div>';

          $totalPrice += $itemDetails['itemPrice'] * $itemDetails['itemQuantity'];
        }
        echo
        '</div>
          <div class="order__price">Total: €' . $totalPrice . '</div>
          <form action="./buy-again.php" method="POST">
            <input type="hidden" name="orderID" value="' . $orderID[0] . '">
            <input type="hidden" name="totalPrice" value="' . $totalPrice . '">
            <div class="order__button"><button type="submit">Buy again</button></div>
          </form>
        </div>';
      }
      mysqli_close($connect);
      ?>
    </div>
  </div>
</body>

</html>