const signupForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#user-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    console.log(`User: ${username}\nEmail: ${email}\nPassword: ${password}`);

    // The "Content-Type": "application/json" header tells the server that
    // the request payload is a JSON string and it should be parsed accordingly.
    const response = await fetch("/api/user", {
      body: JSON.stringify({ username, email, password }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // ::::: If user created re-route to the home page :::::
    if (response.ok) {
      const { message } = await response.json();
      console.log(message);
      document.location.replace("/dashboard");
    } else {
      alert(
        "Please check your user name and password.\nIf you are a new user, please Sign Up."
      );
    }
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  //collect values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log("email:", email, "password:", password);

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const signUpFormBtn = document.querySelector("#sign-up-btn");
if (signUpFormBtn) signUpFormBtn.addEventListener("click", signupForm);

const loginFormBtn = document.querySelector("#login-btn");
if (loginFormBtn) loginFormBtn.addEventListener("click", loginFormHandler);
