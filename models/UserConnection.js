"use strict";
module.exports = (sequelize, DataTypes) => {
    const UserConnection = sequelize.define(
        "UserConnection",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            targetId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sourceId: {
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
            tableName: "userConnections"
        }
    );

    return UserConnection;
};
