<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';

guard_spam();

$name    = field('name');
$email   = field('email');
$subject = field('subject');
$message = field('message');

$errors = [];
if ($name === '') $errors[] = 'name';
if (!is_email($email)) $errors[] = 'email';
if ($subject === '') $errors[] = 'subject';
if ($message === '') $errors[] = 'message';

if ($errors) {
    respond(false, 'Please complete the required fields.', ['fields' => $errors]);
}

$ok = send_submission('Contact form: ' . $subject, [
    'Name'    => $name,
    'Email'   => $email,
    'Subject' => $subject,
    'Message' => $message,
], $email, $name);

if ($ok) {
    respond(true, 'Message sent! We will get back to you within one business day.');
}
respond(false, 'Could not send your message. Please try again or contact us directly.');
