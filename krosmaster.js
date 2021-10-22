const Sequelize = require('sequelize');
const database = require('./db');
 
const Krosmaster = database.define('krosmaster', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER
    },
    figurine: {
        type: Sequelize.STRING,
        allowNull: false
    },
    init: {
        type: Sequelize.INTEGER
    },
    mp: {
        type: Sequelize.INTEGER
    },
    hp: {
        type: Sequelize.INTEGER
    },
    ap: {
        type: Sequelize.INTEGER
    },
})
 
module.exports = Krosmaster;