<?php
// serve the 
// fileheader('X-Sendfile: /path/outside/of/web/root/myimage.jpg');
// header('Content-type: image/jpeg');
// header('Content-Disposition: inline; filename="myimage.jpg"');

// Specify the directory where your images are stored
$imageDirectory = 'images/';

// Get the requested file path
$requestedImage = $_SERVER['REQUEST_URI'];

// Combine the image directory with the requested file path
$filePath = $imageDirectory . basename($requestedImage);

// Check if the file exists
if (file_exists($filePath)) {
    // Set the appropriate content type header
    header('Content-Type: ' . mime_content_type($filePath));

    // Output the file content
    // readfile($filePath);
    header('Content-Disposition: inline; filename='. $filePath);
} else {
    // If the file does not exist, return a 404 error
    http_response_code(404);
    echo 'File not found.';
}