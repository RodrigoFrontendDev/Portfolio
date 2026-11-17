<?php

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$errores = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    $errores = [];
    if (empty($name) || strlen($name) < 2) {
        $errores[] = "The name must be at least 2 characters. / El nombre debe tener al menos 2 caracteres.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "The email format is not valid. / El formato del correo electrónico no es válido.";
    }
    if (empty($subject) || strlen($subject) < 5) {
        $errores[] = "The subject must be at least 5 characters. / El asunto debe tener al menos 5 caracteres.";
    }
    if (empty($message) || strlen($message) < 10) {
        $errores[] = "The message must be at least 10 characters. / El mensaje debe tener al menos 10 caracteres.";
    }

    if (empty($errores)) {
        $mail = new PHPMailer(true);
        try {
            // Configuración del servidor SMTP de Gmail
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
            $mail->Port = $_ENV['SMTP_PORT'];
            $mail->CharSet = 'UTF-8';

            // Remitente y destinatario
            $mail->setFrom($_ENV['SMTP_USERNAME'], $subject);
            $mail->addAddress('rodrigofrontenddev@gmail.com');
            $mail->addReplyTo($email, $name);

            // Contenido del correo
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body    = "Nombre: $name\n Asunto: $subject\n Email: $email\n\nMensaje:\n$message";

            $mail->send();

            // Redirigir a una página de agradecimiento para evitar el reenvío del formulario
            header('Location: index.html');
            exit;

            
            echo "<script>
                alert('Mensaje enviado exitosamente.');
                window.location.href = 'index.html#contact';
            </script>";
            exit;
        } catch (Exception $e) {
            error_log("Error al enviar el mensaje: {$mail->ErrorInfo}");
            echo "<script>
                alert('Error al enviar el mensaje. Intenta nuevamente. Detalles del error: {$mail->ErrorInfo}');
                window.location.href = 'index.html#contact';
            </script>";
            exit;
        }
    } else {
        echo "<script>
            alert('".implode("\\n", $errores)."');
            window.location.href = 'index.html#contact';
        </script>";
        exit;
    }
}