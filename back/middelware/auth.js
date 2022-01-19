const jsonWebToken = require("jsonwebtoken");
// besoin de notre package Json.token permet de vérifier la validité d'un token 

//erreurs d'identifications: protéger mes routes

module.exports = (req, res, next) => {
    try {//il y a plusieurs éléments qui peuvent poser problème
        const token = req.headers.authorization.split(' ')[1];//recup token du headers =>table =>deuxieme el
         const decodedToken = jsonWebToken.verify(token,process.env.RANDOM_TOKEN_SECRET);//verif token/key
        const userId = decodedToken.userId;//recup userId dans le token
        //&&comparer le UserId qu'il y a en clair dans le req avec le userId qu'il y a dans le token
        if (req.body.userId && req.body.userId !== userId) {//!== est différent
            throw 'User ID non valable';//throw pour renvoyer à catch 
        } else {
            next();//passer au middelware suivant
        }     


        
  } catch {
    res.status(401).json({// pour un problème d'authentification
      error: new Error('requête non authentifiée')
    });
    }
};
