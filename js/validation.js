function validate() {
    var form = document.forms["form"];

    if (form["name"].value.trim() === "") {
        alert("The name field is empty / El campo nombre está vacío");
        form["name"].value = "";
        form["name"].focus();
        return false;
    }

    if (form["email"].value.trim() === "") {
        alert("The email field is empty / El campo correo electrónico está vacío");
        form["email"].value = "";
        form["email"].focus();
        return false;
    }

    if (form["subject"].value.trim() === "") {
        alert("The subject field is empty / El campo asunto está vacío");
        form["subject"].value = "";
        form["subject"].focus();
        return false;
    }

    if (form["message"].value.trim() === "") {
        alert("The message field is empty / El campo mensaje está vacío");
        form["message"].value = "";
        form["message"].focus();
        return false;
    }

    alert("Data sent successfully / Datos enviados con éxito");
    return true;
};