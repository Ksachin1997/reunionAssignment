"use strict";
module.exports = (sequelize, DataTypes) => {
    const PostComment = sequelize.define(
        "PostComment",
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
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            comment: {
                type: DataTypes.TEXT
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
            tableName: "postComments"
        }
    );

    PostComment.associate = function (models) {

        PostComment.belongsTo(models.User, {
            foreignKey: "userId"
        });
        PostComment.belongsTo(models.Post, {
            foreignKey: "postId"
        });
    };

    return PostComment;
};
