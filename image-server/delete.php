<?php

# Image server 
## Delete images

// remove next two lines for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");

$success = false;
$message = "File doesn't exist";

// Delete file on server
$filePath = "./" . $_REQUEST["path"];

if (isset($_REQUEST["path"]) &&  file_exists($filePath)) {
    $success = unlink($filePath);
    $message = "File successfully deleted";
}

$output['status']['code'] = $success? 200: 400;
$output['status']['description'] = "test delete";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = ["deleted" => $success, "message"=> $message, "s" => $_SERVER];

echo json_encode($output);

