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
    const success = await fetch("api/user", {
      body: JSON.stringify({ signupUserName, signupEmail, signupPassword }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
  }
};

const signUpFormBtn = document.querySelector("#signup-form");
signUpFormBtn.addEventListener("submit", signupForm);
