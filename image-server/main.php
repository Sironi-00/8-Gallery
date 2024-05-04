<?php

# Image server 
## POST -> Receive image and save images at "uploads/{artist}/filename
## GET -> Serve image files


// remove next two lines for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");

include ("./upload.php");
$save_image = uploadImage($_FILES["file"]);

$output['status']['code'] = $save_image["code"];
$output['status']['description'] = "serve upload image";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data']["message"] = $save_image["message"];

echo json_encode($output);

?>