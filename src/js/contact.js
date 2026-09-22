// Contact form handler with validation and feedback

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    // Simulate sending
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width:18px;height:18px;display:inline-block;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Transmitting Inquiry...
      `;
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert-success';
        alertBox.innerHTML = `
          <strong>Inquiry Successfully Sent!</strong><br>
          Thank you for contacting MTS Offshore. Our commercial & operations team will review your project requirements and respond within 24 hours.
        `;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          alertBox.style.display = 'none';
        }, 8000);
      }
    }, 1200);
  });
});
