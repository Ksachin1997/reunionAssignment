'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable(
                    'postLikes',
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
                    queryInterface.addIndex('postLikes', ['userId']),
                    queryInterface.addIndex('postLikes', ['postId'])
                  ]);
              }).catch((e) => {
                console.log(e)
              })
          },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('postLikes');
    }
};
