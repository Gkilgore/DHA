
<?php
// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'Dylan@dhacontracting.com';

if (file_exists($php_email_form = 'php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  die('Invalid request method.');
}

// Basic required field validation and sanitization
$name = trim($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$organization = trim($_POST['organization'] ?? '');
$project_type = trim($_POST['project_type'] ?? '');
$message = trim($_POST['message'] ?? '');

$allowed_project_types = array(
  'Scoreboard',
  'Videoboard',
  'Stadium Lights',
  'Msg Center',
  'Repair/Service',
  'Scoreboard Rentals',
  'New Structure',
  'Other Installation'
);

if ($name === '' || $organization === '' || $project_type === '' || $message === '') {
  http_response_code(422);
  die('All fields are required.');
}

if (!$email) {
  http_response_code(422);
  die('Please provide a valid email address.');
}

if (!in_array($project_type, $allowed_project_types, true)) {
  http_response_code(422);
  die('Invalid project type provided.');
}

if (strlen($message) < 10) {
  http_response_code(422);
  die('Message is too short.');
}

$contact->to = $receiving_email_address;
$contact->from_name = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$contact->from_email = $email;
$contact->subject = 'DHA Website Contact ' . filter_var($organization, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */ 

$contact->add_message($name, 'From');
$contact->add_message($email, 'Email');
$contact->add_message($organization, 'Organization / Company Name');
$contact->add_message($project_type, 'Project Type');
$contact->add_message($message, 'Message', 10);

// Honeypot for basic bot detection
$contact->honeypot = trim($_POST['website'] ?? '');

// Google reCAPTCHA v3 (configure via environment variable)
$recaptcha_secret_key = getenv('RECAPTCHA_SECRET_KEY');
if ($recaptcha_secret_key) {
  $contact->recaptcha_secret_key = $recaptcha_secret_key;
}

// Consistent CC/BCC handling
$default_cc = array('kilgore@dhacontracting.com');
$env_cc = getenv('CONTACT_FORM_CC');
$env_bcc = getenv('CONTACT_FORM_BCC');

$prepare_recipients = static function ($recipients) {
  $emails = array();

  foreach ((array) $recipients as $recipient) {
    $recipient = trim($recipient);
    if ($recipient === '') {
      continue;
    }

    $validated = filter_var($recipient, FILTER_VALIDATE_EMAIL);
    if ($validated) {
      $emails[] = $validated;
    }
  }

  return array_values(array_unique($emails));
};

$contact->cc = $prepare_recipients(array_merge($default_cc, $env_cc ? explode(',', $env_cc) : array()));
$contact->bcc = $prepare_recipients($env_bcc ? explode(',', $env_bcc) : array());

echo $contact->send();

?>

