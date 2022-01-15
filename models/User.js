"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING
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
            tableName: "users"
        }
    );

    User.associate = function (models) {
        User.hasMany(models.Post, {
            foreignKey: "userId"
        });
        User.hasMany(models.PostComment, {
            foreignKey: "userId"
        });
        User.hasMany(models.PostLike, {
            foreignKey: "userId"
        })
    };

    return User;
};
