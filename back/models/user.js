const mongoose = require('mongoose');//importation de 
const uniqueValidator = require('mongoose-unique-validator');
//une seule connection par personne



const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//validation sécurité
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);