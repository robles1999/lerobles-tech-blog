const router = require("express").Router();
const { Post, User } = require("../../models");

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try
  {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          }
        ],
      });

  
      const post = postData.get({ plain: true });
      res.render('post', {
        post
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
module.exports = router;
