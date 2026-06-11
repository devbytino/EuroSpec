<?php
// api.php
// A very simple API. Receives a SQL string and executes it.
// NOTE: this is only for educational purposes. DO NOT use this for a real website
// as executing any SQL directly is insecure (SQL injection).

// Headers: we return JSON and allow requests from any page
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// --- 1. Database Connection ---
$host = 'localhost';
$user = 'root';
$password = '';      // Default empty in XAMPP
$database = 'eurospec';

$conn = new mysqli($host, $user, $password, $database);

// Connection failed? Return an error and stop.
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'error' => 'Connection failed: ' . $conn->connect_error
    ]);
    exit;
}

// --- 2. Retrieve SQL String ---
// The query comes as a parameter, e.g.: api.php?sql=SELECT * FROM product
$sql = $_REQUEST['sql'] ?? '';

if ($sql === '') {
    echo json_encode([
        'success' => false,
        'error' => 'No SQL provided'
    ]);
    exit;
}

// --- 3. Execute Query ---
$result = $conn->query($sql);

// Query error?
if ($result === false) {
    echo json_encode([
        'success' => false,
        'error' => $conn->error
    ]);
    exit;
}

// --- 4. Return Results ---
if ($result === true) {
    // Query was INSERT, UPDATE, or DELETE (no rows to return)
    echo json_encode([
        'success' => true,
        'data' => []
    ]);
} else {
    // Query was SELECT: convert rows to an array
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode([
        'success' => true,
        'data' => $rows
    ]);
}

$conn->close();
?>
