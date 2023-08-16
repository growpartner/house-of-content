<?php

$filePath = 'data.json';
$jsonContent = file_get_contents($filePath);
$dataArray = array();

if ( $jsonContent ) {
    $dataArray = json_decode($jsonContent, true);
}

var_dump(json_decode(file_get_contents('php://input')));
// Check if the form fields are set
if (isset($_POST['name']) && isset($_POST['mobile']) && isset($_POST['email'])) {
    // Collect form data
    $name = $_POST['name'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    
    // Create an associative array
    $data = array(
        'name' => $name,
        'mobile' => $mobile,
        'email' => $email
    );
    
    // Convert the array to JSON format
    array_push($dataArray, $data);
    $jsonData = json_encode($dataArray, JSON_PRETTY_PRINT);
    
    // Write the JSON data to the file
    file_put_contents($filePath, $jsonData);
    
    http_response_code(200);
    echo "Data saved successfully!";
} else {
    http_response_code(400);
    echo "All fields are required.";
}
?>