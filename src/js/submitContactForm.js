function setUpContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector('input[type="submit"]');
  const formAlert = document.getElementById("contact-form-alert");

  const handleFormError = () => {
    formAlert.textContent =
      "There was an error submitting your request. If you continue to experience issues, email us directly at booking@chaosisanaesthetic.com";
    formAlert.classList.replace("alert-success", "alert-danger");
    formAlert.hidden = false;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    formData.append("access_key", "1443a16d-d000-4037-a5d2-7e951ccaa6c0");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const originalText = submitBtn.textContent;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      const data = await response.json();

      if (response.ok) {
        formAlert.textContent =
          "Your contact inquiry has been submitted successfully. We will review your request and get back to you soon!";
        formAlert.hidden = false;
        form.reset();
      } else {
        handleFormError();
      }
    } catch (error) {
      handleFormError();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

setUpContactForm();
