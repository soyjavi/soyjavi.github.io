document.querySelectorAll("form.waitlist").forEach((form) => {
  const status = form.querySelector(".status");
  form.addEventListener("submit", () => {
    status.textContent = form.dataset.opened;
  });
});
