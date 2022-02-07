require('dotenv').config();

const Sequelize = require('sequelize');

// Create a connection object
// const sequelize = new Sequelize(
//   // Database name
//   'ecommerce_db',
//   // User
//   'root',
//   // Password
//   'password',
//   {
//     // Database location
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });



module.exports = sequelize;
