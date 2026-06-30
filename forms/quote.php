<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';

guard_spam();

$name     = field('name');
$phone    = field('phone');
$email    = field('email');
$company  = field('company');
$type     = field('printing_type');
$quantity = field('quantity');
$paper    = field('paper_type');
$size     = field('size');
$finish   = field('finishing');
$date     = field('delivery_date');
$message  = field('message');

$errors = [];
if ($name === '') $errors[] = 'name';
if ($phone === '') $errors[] = 'phone';
if (!is_email($email)) $errors[] = 'email';
if ($type === '') $errors[] = 'printing_type';
if ($quantity === '') $errors[] = 'quantity';

if ($errors) {
    respond(false, 'Please complete the required fields.', ['fields' => $errors]);
}

$file = $_FILES['artwork'] ?? null;
if ($file && !empty($file['tmp_name']) && ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
    if (($file['size'] ?? 0) > 10 * 1024 * 1024) {
        respond(false, 'Artwork file is too large (max 10 MB).');
    }
} else {
    $file = null;
}

$ok = send_submission('Quote request: ' . $type . ' x ' . $quantity, [
    'Name'           => $name,
    'Phone'          => $phone,
    'Email'          => $email,
    'Company'        => $company,
    'Printing type'  => $type,
    'Quantity'       => $quantity,
    'Paper type'     => $paper,
    'Size'           => $size,
    'Finishing'      => $finish,
    'Delivery date'  => $date,
    'Message'        => $message,
], $email, $name, $file);

if ($ok) {
    respond(true, 'Quote request received! Our team will get back to you shortly.');
}
respond(false, 'Could not submit your request. Please try again or contact us directly.');
