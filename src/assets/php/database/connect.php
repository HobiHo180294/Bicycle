<?php

$connect = mysqli_connect('sql.freedb.tech', 'freedb_webteam30', '@CWg2pvVMgWA%aU', 'freedb_webshop');

if (!$connect) {
  die('Error connecting to database');
} else {
  echo 'Success!!!';
}
