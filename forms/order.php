<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';

/* Honeypot field name used in product.html is "_hp" */
if (trim((string) ($_POST['_hp'] ?? '')) !== '') {
    respond(true, 'Thanks!');
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.');
}

$name    = field('name');
$phone   = field('phone');
$address = field('address');
$product = field('product');
$variant = field('variant');
$option  = field('option');
$price   = field('price');
$notes   = field('notes');

$errors = [];
if ($name === '')    $errors[] = 'name';
if ($phone === '')   $errors[] = 'phone';
if ($address === '') $errors[] = 'address';
if ($product === '') $errors[] = 'product';

if ($errors) {
    respond(false, 'Please complete all required fields.', ['fields' => $errors]);
}

$rows = [
    'Product'    => $product,
    'Quantity'   => $variant,
    'Option'     => $option,
    'Price'      => $price,
    'Name'       => $name,
    'Phone'      => $phone,
    'Address'    => $address,
    'Notes'      => $notes,
];

$ok = send_submission('New order: ' . $product . ' (' . $variant . ')', $rows);

if ($ok) {
    respond(true, 'Order placed! We will call you to confirm within a few hours.');
}
respond(false, 'Could not submit your order. Please try again or WhatsApp us.');
