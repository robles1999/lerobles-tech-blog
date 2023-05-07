const router = require("express").Router();
const { User } = require("../../models");

// new user created and written to db
router.post("/", async (req, res) => {
  console.log("REQUEST BODY ===============================\n", req.body);
  try {
    const userData = await User.create({
      name: req.body.signupUserName,
      email: req.body.signupEmail,
      password: req.body.signupPassword,
    });
    console.log("USER DATA ================================\n", userData);
    
    if (userData) {
      console.log("New user added!");
      // ⚠️⚠️⚠️⚠️ will not redirect to the login page ⚠️⚠️⚠️⚠️⚠️
      // document.location.replace("/login");
      // document.location.href = "/";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
