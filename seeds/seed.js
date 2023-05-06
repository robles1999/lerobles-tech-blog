const sequelize = require("../config/connection");
const { User, Post } = require("../models");
const userData = require("./userData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log(User.bulkCreate);

      const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

    for (const post of postData)
    {
      await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    console.log("Seeding successful!");
    process.exit(0);
  } catch (err) {
    console.log("Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();
