<?php
declare(strict_types=1);

/**
 * Shared helpers for form handlers.
 *
 * IMPORTANT: set MAIL_TO to the address that should receive submissions.
 */
const MAIL_TO   = 'hello@canvasprintbd.com';
const MAIL_FROM = 'no-reply@canvasprintbd.com';
const SITE_NAME = 'Canvas Print';

header('Content-Type: application/json; charset=utf-8');

/** Send a JSON response and stop. */
function respond(bool $ok, string $message, array $extra = []): void
{
    http_response_code($ok ? 200 : 422);
    echo json_encode(array_merge(['ok' => $ok, 'message' => $message], $extra), JSON_UNESCAPED_UNICODE);
    exit;
}

/** Trim + collapse a posted field. */
function field(string $key): string
{
    return trim((string) ($_POST[$key] ?? ''));
}

function is_email(string $v): bool
{
    return (bool) filter_var($v, FILTER_VALIDATE_EMAIL);
}

/** Reject obvious bots via a honeypot field named "website". */
function guard_spam(): void
{
    if (trim((string) ($_POST['website'] ?? '')) !== '') {
        respond(true, 'Thanks!'); // silently accept, do nothing
    }
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(false, 'Invalid request method.');
    }
}

/**
 * Send an email, optionally with a single file attachment.
 * $rows is an associative array of label => value rendered into the body.
 */
function send_submission(string $subject, array $rows, string $replyEmail = '', string $replyName = '', ?array $file = null): bool
{
    $lines = [];
    foreach ($rows as $label => $value) {
        if ($value === '' || $value === null) continue;
        $lines[] = $label . ': ' . $value;
    }
    $body = "New submission from the " . SITE_NAME . " website\n\n" . implode("\n", $lines) . "\n";

    $fromName = SITE_NAME;
    $headers = [];
    $headers[] = 'From: ' . sprintf('%s <%s>', $fromName, MAIL_FROM);
    if ($replyEmail !== '' && is_email($replyEmail)) {
        $headers[] = 'Reply-To: ' . ($replyName !== '' ? sprintf('%s <%s>', $replyName, $replyEmail) : $replyEmail);
    }
    $headers[] = 'MIME-Version: 1.0';

    if ($file && !empty($file['tmp_name']) && is_uploaded_file($file['tmp_name'])) {
        $boundary = 'np' . bin2hex(random_bytes(8));
        $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

        $content = chunk_split(base64_encode((string) file_get_contents($file['tmp_name'])));
        $name = preg_replace('/[^A-Za-z0-9._-]/', '_', (string) $file['name']);

        $message  = "--{$boundary}\r\n";
        $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $message .= $body . "\r\n";
        $message .= "--{$boundary}\r\n";
        $message .= 'Content-Type: application/octet-stream; name="' . $name . "\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= 'Content-Disposition: attachment; filename="' . $name . "\"\r\n\r\n";
        $message .= $content . "\r\n";
        $message .= "--{$boundary}--";
    } else {
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $message = $body;
    }

    // In local dev (no MTA) mail() returns false; treat that as success so the
    // UX can be tested. Production servers with a configured MTA will deliver.
    $sent = @mail(MAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));
    return $sent || PHP_SAPI === 'cli-server';
}
