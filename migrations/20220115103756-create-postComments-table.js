'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable(
                    'postComments',
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
                        postId: {
                          type: Sequelize.INTEGER,
                          references: {
                              model: 'posts',
                              key: 'id'
                          },
                          allowNull: false
                        },
                        comment: {
                          type: Sequelize.TEXT
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
                      queryInterface.addIndex('postComments', ['userId']),
                      queryInterface.addIndex('postComments', ['postId'])
                    ]);
                }).catch((e) => {
                  console.log(e)
                })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('postComments');
    }
};
