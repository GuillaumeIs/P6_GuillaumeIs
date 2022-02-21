// sauceSchema : Création du schéma de données du produit (Sauce) //

const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
  userId: String,
  name: String,
  manufacturer: String,
  description: String,
  mainPepper: String,
  imageUrl: String,
  heat: { type: Number, min: 1, max: 10 },
  likes: Number,
  dislikes: Number,
  userLiked: [String],
  userDisliked: [String]
});

module.exports = mongoose.model('Sauce', sauceSchema);
