// Replace this placeholder with the public access key generated in your Web3Forms dashboard.
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-btn");

const isSpanish = document.documentElement.lang.toLowerCase().startsWith("es");
const messages = isSpanish
  ? {
      configuring: "El formulario todavía necesita la clave de Web3Forms. También podés escribirme por correo.",
      sending: "Enviando tu mensaje…",
      success: "¡Mensaje enviado! Gracias por contactarme.",
      error: "No se pudo enviar el mensaje. Probá nuevamente o escribime por correo.",
      button: "Enviar mensaje",
      sendingButton: "Enviando…",
    }
  : {
      configuring: "The form still needs a Web3Forms access key. You can also reach me by email.",
      sending: "Sending your message…",
      success: "Message sent. Thanks for reaching out!",
      error: "Your message could not be sent. Please try again or email me directly.",
      button: "Send message",
      sendingButton: "Sending…",
    };

if (contactForm && formStatus && submitButton) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      formStatus.textContent = messages.configuring;
      formStatus.className = "form-status is-error";
      return;
    }

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    payload.access_key = WEB3FORMS_ACCESS_KEY;
    payload.from_name = "Rodrigo Nickler | Portfolio";
    payload.subject = `Portfolio contact: ${String(payload.subject || "").trim()}`;

    formStatus.textContent = messages.sending;
    formStatus.className = "form-status";
    submitButton.disabled = true;
    submitButton.textContent = messages.sendingButton;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error("Web3Forms submission failed");
      }

      contactForm.reset();
      formStatus.textContent = messages.success;
      formStatus.className = "form-status is-success";
    } catch {
      formStatus.textContent = messages.error;
      formStatus.className = "form-status is-error";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = isSpanish
        ? 'Enviar mensaje <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>'
        : 'Send message <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    }
  });
}
