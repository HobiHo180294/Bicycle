<?php

$connect = mysqli_connect('localhost', 'id19295223_webteam30', 'E0Nv}W#e~t)KHu0q', 'id19295223_webshop');

if (!$connect) {
  die('Error connecting to database');
} else {
  echo 'Success!!!';
}
