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
$message = "Delete process failed";

// Delete file on server
function deleteUserDirectory($id)
{
    if (!$id) {
        return;
    }
    global $success, $message;
    $dirPath = "./images/" . $id;

    if (is_dir($dirPath)) {
        array_map('unlink', glob($dirPath."/*"));
        $success = rmdir($dirPath);
        $message = "Directory successfully deleted";
    } else {
        $message = "Failed to delete directory [is_dir == false]";
    }
}
function deleteImageFile($path)
{
    if (!$path) {
        return;
    }
    global $success, $message;
    $filePath = "./" . $path;

    if (file_exists($filePath)) {
        $success = unlink($filePath);
        $message = "File successfully deleted";
    }
}
if (isset($_REQUEST["path"])) {
    deleteImageFile($_REQUEST["path"]);
} elseif (isset($_REQUEST["id"])) {
    deleteUserDirectory($_REQUEST["id"]);
} else {
    $message = "Failed to catch \$_REQUEST values";
}

$output['status']['code'] = $success ? 200 : 400;
$output['status']['description'] = "Delete image/dir";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = ["deleted" => $success, "message" => $message];

echo json_encode($output);

