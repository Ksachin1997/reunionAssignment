"use strict";
module.exports = (sequelize, DataTypes) => {
    const PostLike = sequelize.define(
        "PostLike",
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
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },{
            tableName: "postLikes"
        }
    );

    PostLike.associate = function (models) {

        PostLike.belongsTo(models.User, {
            foreignKey: "userId"
        });
        PostLike.belongsTo(models.Post, {
            foreignKey: "postId"
        });
    };

    return PostLike;
};
