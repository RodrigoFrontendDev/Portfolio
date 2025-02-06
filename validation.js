function validate () {
    var form = document.form;

    if (form.name.value==0) {
        alert ("The name field is empty");
        form.name.value= "";
        form.name.focus();
        return false;
    }

    if (form.email.value==0) {
        alert ("The email field is empty");
        form.email.value= "";
        form.email.focus();
        return false;
    }

    if (form.phone.value==0) {
        alert ("The phonenumber field is empty");
        form.phone.value= "";
        form.phone.focus();
        return false;
    }

    if (form.message.value==0) {
        alert ("The message field is empty");
        form.message.value= "";
        form.message.focus();
        return false;
    }

    alert ("Data sent successfully");
    form.submit();
};