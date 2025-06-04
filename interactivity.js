document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const messageBox = document.createElement("div");
    messageBox.id = "formMessage";
    messageBox.style.marginTop = "15px";
    contactForm.appendChild(messageBox);

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        messageBox.innerHTML = `<div class="alert alert-success">Thank you, <strong>${name}</strong>! Your message has been sent. Here's your lucky number: <strong>${randomNumber}</strong>.</div>`;
        contactForm.reset();
      } else {
        messageBox.innerHTML = `<div class="alert alert-danger">Please fill in all fields before sending.</div>`;
      }
    });
  }

  const categoryButtons = document.querySelectorAll('.category-btn');
  const searchInput = document.getElementById('searchInput');
  const form = document.getElementById('jobSearchForm');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.textContent.trim();
      alert(`You selected category: ${category}`);
      if (searchInput) {
        searchInput.value = category;
      }
    });
  });

  if (form && searchInput) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        alert(`Searching for: ${query}`);
      } else {
        alert('Please enter a job title or category.');
      }
    });
  }
});
