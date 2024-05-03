<?php
# In your "php.ini" file, search for the file_uploads directive, and set it to On: "file_uploads = On"

function uploadImage($cur_file)
{
  $output = [];

  $artist_path = htmlspecialchars($_POST["artistId"]) . "/";
  $target_dir = "./images/" . $artist_path;

  if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
  }
  $target_file = $target_dir . basename($cur_file["name"]);
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  $check = getimagesize($cur_file["tmp_name"]);
  if ($check == false) {
    $output["message"] = "File is not an image.";
    $output["code"] = "400";
    return $output;
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    $output["message"] = "Process Failed, file already exists.";
    $output["code"] = "400";
    return $output;
  }

  // Allow certain file formats
  if (
    $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif"
  ) {
    $output["message"] = "Process Failed, only JPG, JPEG, PNG & GIF files are allowed.";
    $output["code"] = "400";
    return $output;
  }

  // Check if $uploadOk is set to 0 by an error
  if (move_uploaded_file($cur_file["tmp_name"], $target_file)) {
    $output["message"] = $artist_path . htmlspecialchars(basename($cur_file["name"]));
    $output["code"] = "201";
  } else {
    $output["message"] = "Process Failed, there was an error uploading your file.";
    $output["code"] = "400";
    return $output;
  }

  return $output;
}
