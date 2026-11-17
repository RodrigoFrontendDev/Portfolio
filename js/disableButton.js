function disableSubmitButton(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-btn");
    submitButton.disabled = true;
    document.getElementById("form").submit();
}