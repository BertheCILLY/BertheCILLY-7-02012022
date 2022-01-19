const bcrypt = require("bcrypt");//importation de 
const User = require("../models/User");
const jsonWebToken = require("jsonwebtoken");

//on va hasher le mot de passe et avec hash crer par bcrypt on va enregistrer le user de la base de donnée, fonction asynchrone qui prend du temps 

exports.signup = (req, res, next) => {
//cryptage du mot de passe -compare password/database/if base return token and use delais expiration
  bcrypt
    .hash(req.body.password, 10)//dix tour
    .then((hash) => {
      const user = new User({//nouvel utilisateur
        email: req.body.email,//adress fourni dans le corps de la requète
        password: hash,//mot de passe cripté
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Nouveau utilisateur crée" })//201 pour une création de ressouce
        )
        .catch((error) => res.status(400).json({ error }));//400 pour le différencier
    })
    .catch((error) => res.status(500).json({ error }));//erreur cerver qu'on envoie dans un objet
};


//permet aux utilisateurs existants de se connecter
exports.login = (req, res, next) => {
 
//findOne pour trouver un seul utilisateur pour qui l'adress mail correspond
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "pas d'utilisateur trouvé" });
      }
      bcrypt// la fonction compare récupère le mot de passe qui a été envoyé en clair par le front
        .compare(req.body.password, user.password)//si utilisateur trouvé on compare
        .then((valid) => {
          if (!valid) {//booléane si compraraison bon ou pas 
            return res
              .status(401)//si utilisateur non trouvé
              .json({ error: "Le mot de passe n'est pas valide" });
          }
          res.status(200).json({
            //encodage du UserId pour la création de nouveau objet(objet et UserId sont liés)
            userId: user._id,//fonction 'sign'de jsonwebtoken qui comprends les données qu'on veux ancoder
            token: jsonWebToken.sign(//3 arguments
              { userId: user._id },
             process.env.RANDOM_TOKEN_SECRET,
              { expiresIn: "24h" }
              //cryptage du mot de passe -compare password/database/if base return token and use delais expiration
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));//si problème MongoDB
    })
    .catch((error) => res.status(500).json({ error }));
};
