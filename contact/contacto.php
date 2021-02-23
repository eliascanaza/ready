<?php
/**
 * @version 1.0
 */

require("class.phpmailer.php");
require("class.smtp.php");

// Valores enviados desde el formulario
if ( !isset($_POST["nombre"]) || !isset($_POST["email"]) || !isset($_POST["mensaje"]) ) {
    die ("Es necesario completar todos los datos del formulario");
}
$nombre = $_POST["nombre"];
$motivo = $_POST["motivo"];
$email = $_POST["email"];
$mensaje = $_POST["mensaje"];

// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "c2051149.ferozo.com";  // Dominio alternativo brindado en el email de alta 
$smtpUsuario = "no-reply@c2051149.ferozo.com";  // Mi cuenta de correo
$smtpClave = "lOfryfNDGK";  // Mi contraseña

// Email donde se enviaran los datos cargados en el formulario de contacto
//$emailDestino = "info@milay.pe";
$emailDestino = "em.canaza@gmail.com";

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 465; 
$mail->SMTPSecure = 'ssl';
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";


// VALORES A MODIFICAR //
$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->From = $email; // Email desde donde envío el correo.
$mail->FromName = $nombre;
$mail->AddAddress($emailDestino); // Esta es la dirección a donde enviamos los datos del formulario

$mail->Subject = "Tudyni.com - Formulario de contacto"; // Este es el titulo del email.
$mensaje = "<br/>Motivo: $motivo<br/><br/>".$mensaje;
$mensajeHtml = nl2br($mensaje);
$mail->Body = "{$mensajeHtml} <br /><br />Formulario de contacto desde TUDYNI.COM<br />"; // Texto del email en formato HTML
$mail->AltBody = "{$mensaje} \n\n Tudyni.com - Formulario de contacto"; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    echo json_encode(array('success' => 1));
} else {
    echo json_encode(array('success' => 0));
}
