const express = require('express');// on aura express avec une commande require


require("dotenv").config();
const helmet = require('helmet');


const cors = require('cors');

//accés chemin images
const path = require("path");

// Lancement de express
const app = express();

// Déclaration des routes

const userRoutes = require('./routes/user');

// Connexions à mysql


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost.8080',
  user     : 'BertheCILLY',
  password : 'linux'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('erreur de connection' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
/*However, a connection can also be implicitly established by invoking a query:

var mysql      = require('mysql');
var connection = mysql.createConnection(...);
 
connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
});*/

// intercepte tous les requetes qui ont un json 
app.use(express.json()); 

app.use(cors())
// Headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();  
}); 


// Lancement helmet
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' })); //Pour interdire d'inclure cette page dans une iframe

// Lancement des routes

//path accés chemin fichier image
app.use("/images", express.static(path.join(__dirname, "images")));



//routes router user.js liée a l authentification
app.use('/api/auth', userRoutes);

module.exports = app;