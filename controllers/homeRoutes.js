const router = require("express").Router();
const { Post, User } = require("../models");

// router.get("/", (req, res) => {
//   res.render("homepage");
// });

// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    //get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    
    //serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    //pass serialized data and session flag into template
    res.render("homepage", {
      posts
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/dashboard");
  //   return;
  // }

  res.render("login");
});

module.exports = router;
