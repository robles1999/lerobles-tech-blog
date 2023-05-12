const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
        //comment id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //having comment description not allow null, since it does not have title field
        comment_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //date created
        comment_dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        //user id foreign key
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        //post id foreign key
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;