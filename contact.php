
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

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = 'DHA Website Contact ' . $_POST['organization'];

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */ 

$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['organization'], 'Organization / Company Name');
$contact->add_message($_POST['project_type'], 'Project Type');
$contact->add_message($_POST['message'], 'Message', 10);


$contact->cc = array('kiglore3@gmail.com', 'kilgore@dhacontracting.com');

echo $contact->send() ;
$contact->cc = 'Kilgore@dhacontracting.com';

?>

