'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable(
                    'users',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true,
                            allowNull: false
                        },
                        name: {
                            type: Sequelize.STRING
                        },
                        email: {
                            type: Sequelize.STRING,
                            unique: true
                        },
                        password: {
                            type: Sequelize.STRING,
                            allowNull: false
                        },
                        phone: {
                            type: Sequelize.STRING
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE
                        },
                        updatedAt: {
                            allowNull: false,
                            type: Sequelize.DATE
                        }
                    }
                ).then(() => {
                  Promise.all([
                    queryInterface.addIndex('users', ['email']),
                    queryInterface.addIndex('users', ['phone']),
                    queryInterface.addIndex('users', ['name']),
                  ]);
              }).catch((e) => {
                console.log(e)
              })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
