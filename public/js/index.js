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

// ! :::::::::::::::: LOG IN ::::::::::::::::::::::::
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
      document.location.replace("/");
      console.log("Logged In!");
    } else {
      console.log(
        `+++++++++++++++Email:${email}\nPassword: ${password}++++++++++++++++`
      );
      alert("Please check your email and password and try again.");
    }
  }
};

const userLogout = async (e) => {
  console.log(
    "In logout function.++++++++++++++++++++++++++++++++++++++++++++\n++++++++++++++++++++++++++++++++++++++++++"
  );
  const response = await fetch("/api/user/logout", {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("User has been logged out.");
    document.location.replace("/");
  }
};

const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// ::::: RENDER CREATE NEW POST PAGE :::::
const createPost = (event) => {
  event.preventDefault();
  document.location.replace("/create-post");
};

// ::::: REDIRECT TO THE DASHBOARD TO ADD A NEW POST :::::
const newHomePost = () => document.location.replace("/dashboard");

// ::::: CREATE A NEW POST :::::
const newPost = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#new-post-title").value.trim();
  const content = document.querySelector("#new-post-content").value.trim();

  const response = await fetch("/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

// ::::: CREATE A NEW COMMENT :::::
const newComment = async (event) => {
  event.preventDefault();
  const postId = event.target.dataset.post_id;
  const comment_content = document
    .querySelector("#new-comment-content")
    .value.trim();

  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({
      comment_content,
      post_id: postId,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/blog/${postId}`);
  } else {
    alert(response.statusText);
  }
};

// ::::: DELETE A POST :::::
const deletePost = async (event) => {
  event.preventDefault();

  console.log("++++++++++++++++++++++++ ID:", id);
  const id = event.target.dataset.post_id;
  const response = await fetch(`/api/blog/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Post successfully deleted.");
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

const logoutBtn = document.querySelector("#logout");
if (logoutBtn) logoutBtn.addEventListener("click", logout);

const createPostLink = document.querySelector("#create-post");
if (createPostLink) createPostLink.addEventListener("click", createPost);

const signUpFormBtn = document.querySelector("#sign-up-btn");
if (signUpFormBtn) signUpFormBtn.addEventListener("click", signupForm);

const loginFormBtn = document.querySelector("#login-btn");
if (loginFormBtn) loginFormBtn.addEventListener("click", loginFormHandler);

const newHomePostBtn = document.querySelector("#new-post-btn");
if (newHomePostBtn) newHomePostBtn.addEventListener("click", newHomePost);

const newPostSubBtn = document.querySelector("#new-post-sub-btn");
if (newPostSubBtn) newPostSubBtn.addEventListener("click", newPost);

const newCommentSubBtn = document.querySelector("#new-comment-sub-btn");
if (newCommentSubBtn) newCommentSubBtn.addEventListener("click", newComment);

const trashCanBtn = document.querySelector("#trash-can");
if (trashCanBtn) trashCanBtn.addEventListener("click", deletePost);
