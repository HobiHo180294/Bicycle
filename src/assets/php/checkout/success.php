<?php
if($_SERVER["REQUEST_METHOD"] === "POST"){
    // Processing the form data here
    // ...
    // Redirect the user to the "success.html" page
    header("Location: success.html");
    exit;
}
?>
