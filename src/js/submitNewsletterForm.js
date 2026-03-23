function setUpNewsletterSignup() {
  const form = document.getElementById("newsletter-signup-form");
  const submitBtn = form.querySelector('input[type="submit"]');
  const formAlert = document.getElementById("newsletter-signup-form-alert");

  const handleFormError = () => {
    formAlert.textContent =
      "There was an error submitting your request. If you continue to experience issues, email us directly at booking@chaosisanaesthetic.com";
    formAlert.classList.replace("alert-success", "alert-danger");
    formAlert.hidden = false;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const formData = new FormData(form);
    formData.append("access_key", "08c2a120-79ef-4da2-8dae-6e5d5bb8f977");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

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
          "You've been signed up to our newsletter successfully.";
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

setUpNewsletterSignup();
