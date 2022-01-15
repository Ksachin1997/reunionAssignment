"use strict";
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.TEXT,
                unique: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },{
            tableName: "posts"
        }
    );

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: "userId"
        });
        Post.hasMany(models.PostComment, {
            foreignKey: "postId"
        });
        Post.hasMany(models.PostLike, {
            foreignKey: "postId"
        })
    };

    return Post;
};
