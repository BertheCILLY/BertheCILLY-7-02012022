const express = require('express');
const helmet = require("helmet");
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
//const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();


app.use(helmet());
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

//connexion DB
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
});
sequelize.authenticate()
    .then(() => {
        console.log(' connexion réussie !')
    })
    .catch((error) => {
        console.error('impossible de se connecter à la base de donnée:', error);
    });


app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;