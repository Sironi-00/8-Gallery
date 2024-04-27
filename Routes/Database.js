const mariadb = require("mariadb");

const envVar = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const Pool = mariadb.createPool({
    ...envVar,
    connectionLimit: 5,
    bigIntAsNumber: true,
});

module.exports = Pool;