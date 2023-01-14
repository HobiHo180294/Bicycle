<?php
session_start();
require_once('db.php');

?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Hugo 0.84.0">
  <title>Checkout Bicycle</title>
  <link href="../../../pages/checkout/css/bootstrap.css" rel="stylesheet" type="text/css">
  <link rel="icon" type="image/x-icon" href="../../images/company-logo.svg">

  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/checkout/">



  <!-- Bootstrap core CSS -->
  <link href="bootstrap.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <!-- Favicons -->
  <link rel="apple-touch-icon" href="/docs/5.0/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
  <link rel="icon" href="/docs/5.0/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="/docs/5.0/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
  <link rel="manifest" href="/docs/5.0/assets/img/favicons/manifest.json">
  <link rel="mask-icon" href="/docs/5.0/assets/img/favicons/safari-pinned-tab.svg" color="#7952b3">
  <link rel="icon" href="/docs/5.0/assets/img/favicons/favicon.ico">
  <meta name="theme-color" content="#7952b3">


  <style>
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }
  </style>


  <!-- Custom styles for this template -->
  <link href="form-validation.css" rel="stylesheet">
</head>

<body class="bg-light">

  <div class="container">
    <main>
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="../../images/company-logo.svg" alt="" width="94" height="85">
        <h2>Checkout Form</h2>
        <p class="lead">Below you need to fill in all the required information to complete an order.</p>
      </div>

      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your order</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Products</h6>


                <small class="text-muted">
                  <tr>
                    <?php

                    $current_username = $_SESSION['logged-user']['username'];

                    $orderID_SQL = "SELECT MAX(orderId) FROM ordersMain WHERE username='$current_username'";
                    $orderResult = mysqli_query($connect, $orderID_SQL);


                    $orderId = mysqli_fetch_row($orderResult)[0];

                    $query = "select * from ordersMain where orderId = " . $orderId;
                    $result = mysqli_query($connect, $query);



                    while ($row = mysqli_fetch_assoc($result)) {
                    ?>


                  <tr> <?php echo $row['itemTitle']; ?> </tr>
                  <?php echo "<br/>" ?>
                <?php
                    }

                ?>

                </tr>
                </small>
              </div>
              <div class="sum">
                <span id="first-price" class="text-muted">
                  <?php

                  $orderID_SQL = "SELECT MAX(orderId) FROM ordersMain WHERE username='$current_username'";
                  $orderResult = mysqli_query($connect, $orderID_SQL);


                  $orderId = mysqli_fetch_row($orderResult)[0];

                  $query = "select * from ordersMain where orderId = " . $orderId;
                  $result = mysqli_query($connect, $query);

                  while ($row = mysqli_fetch_assoc($result)) {
                  ?>


                    <tr><br> <?php echo "€",  $row['itemPrice']; ?> </tr>
                  <?php
                  }

                  ?>
                </span>
              </div>
            </li>


            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Shipping method</h6>
                <div class="result"></div>
              </div>
              <div id="shipping-cost"></div>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span class="ddd">Total (EUR)</span>
              <span id="total-cost" class="total-cost">
                <div class="sum">
                  <span id="first-price" class="text-muted">
                    <?php

                    $orderID_SQL = "SELECT MAX(orderId) FROM ordersMain WHERE username='$current_username'";
                    $orderResult = mysqli_query($connect, $orderID_SQL);


                    $orderId = mysqli_fetch_row($orderResult)[0];

                    $query = "select * from ordersMain where orderId = " . $orderId;
                    $result = mysqli_query($connect, $query);
                    $sum = 0;
                    while ($row = mysqli_fetch_assoc($result)) {
                      $sum += $row['itemPrice'];
                    ?>
                    <?php
                    }
                    ?>
                    <tr> <?php echo "€",  $sum; ?> </tr>
                  </span>
                </div>
              </span>
            </li>
          </ul>
        </div>




        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Billing address</h4>
          <form class="needs-validation" novalidate action="connect.php" method="post" name="myForm">
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">First name</label>
                <input name="firstdata" type="text" class="form-control" id="firstName" placeholder="" value="" required>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">Last name</label>
                <input name="lastdata" type="text" class="form-control" id="lastName" placeholder="" value="" required>
                <div class="invalid-feedback">hidden
                  Valid last name is required.
                </div>
              </div>

              <div class="col-12">
                <label for="username" class="form-label">Username</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input name="userdata" type="text" class="form-control" id="username" placeholder="Username" required>
                  <div class="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
                <input name="emaildata" type="email" class="form-control" id="email" placeholder="you@example.com">
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input name="addressdata" type="text" class="form-control" id="address" placeholder="1234 Main St" required>
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>


              <div class="col-12">
                <label for="address2" class="form-label">Shipping methods</label>
                <select name="shippingdata" class="form-select" name="shipping" id="country" required>
                  <option value="">Choose...</option>
                  <option value="DPD">DPD</option>
                  <option value="DHL">DHL</option>
                  <option value="DHL Express">DHL Express</option>
                </select>
                </label>
                <script type="text/javascript">
                  const selectElement = document.querySelector('.form-select');

                  selectElement.addEventListener('change', (event) => {
                    const result = document.querySelector('.result');
                    result.textContent = ` ${event.target.value}`;
                    let shippingCost = '';
                    switch (event.target.value) {
                      case 'DPD':
                        shippingCost = '€15';
                        break;
                      case 'DHL':
                        shippingCost = '€10';
                        break;
                      case 'DHL Express':
                        shippingCost = '€67';
                        break;
                      default:
                        shippingCost = '€0';
                    }

                    const shippingCostDisplay = document.getElementById('shipping-cost');
                    shippingCostDisplay.innerHTML = shippingCost;




                  });
                </script>

                <div class="result"></div>

                <script type="text/javascript">
                  const selectElement = document.querySelector('.form-select');

                  selectElement.addEventListener('change', (event) => {
                    const result = document.querySelector('.result');
                    result.textContent = ` ${event.target.value}`;
                  });
                </script>

                <script type="text/javascript">
                  const shippingSelect = document.querySelector('.form-select');

                  const totalCost = document.querySelector('.total-cost');

                  shippingSelect.addEventListener('change', (event) => {
                    let shippingCost = 0;
                    switch (event.target.value)


                    {

                      case 'DPD':
                        shippingCost = 15;
                        break;
                      case 'DHL':
                        shippingCost = 10;
                        break;
                      case 'DHL Express':
                        shippingCost = 67;
                        break;


                    }

                    var sum = <?php echo $sum; ?>


                    const total = sum + shippingCost;
                    totalCost.innerHTML = `€${total}`;
                  });
                </script>

                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div class="col-md-5">
                <label for="country" class="form-label">Country</label>
                <select name="countrydata" class="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>Germany</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div class="col-md-4">
                <label for="state" class="form-label">City</label>
                <select name="citydata" class="form-select" id="state" required>
                  <option value="">Choose...</option>
                  <option>Berlin</option>
                  <option>Reutlingen</option>
                  <option>Cologne</option>
                  <option>Munich</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div class="col-md-3">
                <label for="zip" class="form-label">Zip</label>
                <input name="zipdata" type="text" class="form-control" id="zip" placeholder="" required>
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>

            <hr class="my-4">

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="same-address">
              <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="save-info">
              <label class="form-check-label" for="save-info">Save this information for next time</label>
            </div>

            <hr class="my-4">

            <h4 class="mb-3">Payment</h4>



            <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>

              <div class="col-md-6">
                <label for="cc-number" class="form-label">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required>
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>

            <hr class="my-4">

            <?php

            $orderID_SQL = "SELECT MAX(orderId) FROM ordersMain WHERE username='$current_username'";
            $orderResult = mysqli_query($connect, $orderID_SQL);


            $orderId = mysqli_fetch_row($orderResult)[0];

            echo '<input type="hidden" name="orderId" value="' . $orderId . '">';

            ?>

            <button href="google.com" class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
    </main>

    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2022 Bicycle</p>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Privacy</a></li>
        <li class="list-inline-item"><a href="#">Terms</a></li>
        <li class="list-inline-item"><a href="#">Support</a></li>
      </ul>

    </footer>
  </div>
</body>

</html>


<script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<script src="../../../pages/checkout/js/form-validation.js"></script>
</body>

</html>