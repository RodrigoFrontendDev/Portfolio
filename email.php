<?php
// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Variables
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    // Validación básica
    $errores = [];
    if (empty($name) || strlen($name) < 3) {
        $errores[] = "El nombre debe tener al menos 3 caracteres.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El formato del correo electrónico no es válido.";
    }
    if (empty($subject) || strlen($subject) < 5) {
        $errores[] = "El asunto debe tener al menos 5 caracteres.";
    }
    if (empty($message) || strlen($message) < 10) {
        $errores[] = "El mensaje debe tener al menos 10 caracteres.";
    }

    // Si no hay errores, enviar el correo
    if (empty($errores)) {
        $to = "rodrigofrontenddev@gmail.com";
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Enviar mensaje
        if (mail($to, $subject, $message, $headers)) {
            header('Location: index.html'); // Redirigir solo si el correo se envió correctamente
            exit; // Asegúrate de salir después de la redirección
        } else {
            echo "Error al enviar el mensaje. Intenta nuevamente.";
        }
    } else {
        // Mostrar errores
        foreach ($errores as $error) {
            echo $error . "<br>";
        }
    }
} else {
    echo "Método de solicitud no válido.";
}
?>