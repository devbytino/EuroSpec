<?php
// api.php
// Een zeer eenvoudige API. Ontvangt een SQL-string en voert die uit.
// LET OP: dit is alleen voor de les / om te leren. NIET voor een echte website
// gebruiken: zomaar elke SQL uitvoeren is onveilig (SQL injection).

// Headers: we sturen JSON terug en staan requests vanaf elke pagina toe
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// --- 1. Connectie maken met de database ---
$host = 'localhost';
$gebruiker = 'root';
$wachtwoord = '';      // Standaard leeg bij XAMPP
$database = 'eurospec';

$conn = new mysqli($host, $gebruiker, $wachtwoord, $database);

// Lukte de connectie niet? Stuur een foutmelding terug en stop.
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'error' => 'Connectie mislukt: ' . $conn->connect_error
    ]);
    exit;
}

// --- 2. De SQL-string ophalen ---
// De query komt mee als parameter, bijvoorbeeld:  api.php?sql=SELECT * FROM product
$sql = $_REQUEST['sql'] ?? '';

if ($sql === '') {
    echo json_encode([
        'success' => false,
        'error' => 'Geen SQL meegegeven'
    ]);
    exit;
}

// --- 3. De query uitvoeren ---
$resultaat = $conn->query($sql);

// Ging er iets fout met de query?
if ($resultaat === false) {
    echo json_encode([
        'success' => false,
        'error' => $conn->error
    ]);
    exit;
}

// --- 4. Het resultaat terugsturen ---
if ($resultaat === true) {
    // De query was een INSERT, UPDATE of DELETE (geen rijen om terug te geven)
    echo json_encode([
        'success' => true,
        'data' => []
    ]);
} else {
    // De query was een SELECT: rijen omzetten naar een array
    $rijen = [];
    while ($rij = $resultaat->fetch_assoc()) {
        $rijen[] = $rij;
    }
    echo json_encode([
        'success' => true,
        'data' => $rijen
    ]);
}

$conn->close();
?>
