const router = require("express").Router();
const { User, Post,  } = require("../../models");

//! :::::::: NEW USER :::::::::::::
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id; //session userid = user's id
      req.session.logged_in = true; //user is logged in

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err); //status 400 = bad request
  }
});

//! ::::::::: LOGIN :::::::::
router.post("/login", async (req, res) => {
  console.log("in login ++++++++++++++++++++++++++++");
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const user = userData.get({ plain: true });
    console.log("++++++++++++++++++++++++++++", user);

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    console.log("+++++++VALID PW++++++++++", validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
