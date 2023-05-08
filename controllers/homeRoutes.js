const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) =>
{
  if (req.session.logged_in) {
    res.redirect("/"); //! need to change to dashboard
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) =>
{
  //! Just added
  if (req.session.logged_in) {
    res.redirect("/"); //! need to change to dashboard
    return;
  }
  res.render("signup");
});

module.exports = router;
