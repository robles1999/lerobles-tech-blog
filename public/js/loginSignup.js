const signupForm = async (e) => {
  e.preventDefault();

  const signupUserName = document.querySelector("#user-signup").value.trim();
  const signupEmail = document.querySelector("#email-signup").value.trim();
  const signupPassword = document
    .querySelector("#password-signup")
    .value.trim();

  if (signupUserName && signupEmail && signupPassword) {
    console.log(
      `User: ${signupUserName}\nEmail: ${signupEmail}\nPassword: ${signupPassword}`
    );

    // The "Content-Type": "application/json" header tells the server that
    // the request payload is a JSON string and it should be parsed accordingly.
    const response = await fetch("api/user", {
      body: JSON.stringify({ signupUserName, signupEmail, signupPassword }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
  }
};

// ! Just added ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
const loginFormHandler = async (event) => {
  event.preventDefault();

  //collect values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};
// ! ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️

const signUpFormBtn = document.querySelector("#signup-form");
signUpFormBtn.addEventListener("submit", signupForm);

const loginFormBtn = document.querySelector("#login-form");
loginFormBtn.addEventListener("submit", loginFormHandler);