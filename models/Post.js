const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    //post title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //post description (mini project let "project" description to have NULL case, implies can make posts with empty descriptions)
    post_content: {
      type: DataTypes.STRING,
    },
    //user id foreign key
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timsestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
