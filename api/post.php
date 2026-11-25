<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['newItems'])) {
        $jsongetData = json_decode(file_get_contents('../public/fish.json'), true);
        $id = count($jsongetData["fish"]) + 1;
        $fishdata = json_decode($data['newItems'], true);
        $newItem = [
            'id' => $id,
            'name' => $fishdata['name'],
            'price' => $fishdata['price'],
            'image' => $fishdata['image']
        ];

        foreach ($jsongetData["fish"] as $item) {
            if ($item['name'] === $newItem['name']) {
                echo json_encode(['status' => 'error', 'message' => 'Fish with the same name already exists.']);
                exit;
            }
        }

        $jsonData = json_encode($newItem, JSON_PRETTY_PRINT);

        $jsongetData["fish"][] = $newItem;

        $jsonData = json_encode($jsongetData, JSON_PRETTY_PRINT);

        file_put_contents('../public/fish.json', $jsonData);
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No data received.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
