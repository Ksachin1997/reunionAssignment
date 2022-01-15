'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable(
                    'userConnections',
                    {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true,
                            autoIncrement: true,
                            allowNull: false
                        },
                        sourceId: {
                          type: Sequelize.INTEGER,
                          allowNull: false
                        },
                        targetId: {
                          type: Sequelize.INTEGER,
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
                    queryInterface.addIndex('userConnections', ['sourceId']),
                    queryInterface.addIndex('userConnections', ['targetId'])
                  ]);
                }).catch((e) => {
                  console.log(e)
                })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('userConnections');
    }
};
