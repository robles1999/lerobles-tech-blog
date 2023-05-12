const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//User hasMany Post
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE", //if User is deleted, post will be deleted as well (as opposed to saying "User No Longer Exists" or smth)
});

//Post belongsTo User
Post.belongsTo(User, {
  foreignKey: "user_id", // post will have a have a user_id column
});

//User hasMany Comment
User.hasMany(Comment, {
  foreignKey: "user_id", // comments will have a user_id
  onDelete: "", //Probably Cascade?
});

//Comment belongsTo User
Comment.belongsTo(User, {
  foreignKey: "user_id", // comment will have a user_id column
});

//Post hasMany Comment
Post.hasMany(Comment, {
  foreignKey: "post_id", // comment will have a post_id column
  onDelete: "", //Probably Cascade?
});

//Comment belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: "post_id", // comment will have a post_id column
});

module.exports = { User, Post, Comment };
