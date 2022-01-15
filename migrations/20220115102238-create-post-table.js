'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable(
                    'posts',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true,
                            allowNull: false
                        },
                        userId: {
                          type: Sequelize.INTEGER,
                          references: {
                              model: 'users',
                              key: 'id'
                          },
                          allowNull: false
                        },
                        title: {
                            type: Sequelize.STRING
                        },
                        description: {
                            type: Sequelize.TEXT,
                            unique: true
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
                    queryInterface.addIndex('posts', ['userId'])
                  ]);
              }).catch((e) => {
                console.log(e)
              })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('posts');
    }
};
