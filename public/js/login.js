const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const email = document.querySelector("#email-login").value;
  const password = document.querySelector("#password-login").value;

  console.log(email, password);
});
