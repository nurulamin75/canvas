<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';

guard_spam();

$email = field('email');
if (!is_email($email)) {
    respond(false, 'Please enter a valid email address.', ['fields' => ['email']]);
}

$ok = send_submission('Newsletter signup', ['Email' => $email], $email);

if ($ok) {
    respond(true, 'Subscribed! Thanks for joining.');
}
respond(false, 'Could not subscribe right now. Please try again later.');
