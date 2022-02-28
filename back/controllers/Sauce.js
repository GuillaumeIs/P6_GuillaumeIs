const Sauce = require('../models/Sauce');
const fs = require('fs');

//Affichage des produits sur la page d'accueil
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

//Permet de poster un produit
exports.postAddSauce = (req, res, next) => {
  const sauceArticle = JSON.parse(req.body.sauce);
  delete sauceArticle._id;
  const sauce = new Sauce({
    ...sauceArticle,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: sauceArticle.userId,
    likes: 0,
    dislikes: 0,
  });

  sauce.save()
  .then(() => res.status(201).json({ message: 'Sauce sauvegardé' }))
  .catch((error) => res.status(400).json({ error }));
};

//Affichage du produit sélectionné
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//Permet de modifier un produit
exports.putModifSauce = (req, res, next) => {
  const sauceArticle = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceArticle, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce actualisé' }))
    .catch((error) => res.status(400).json({ error }));
};

//Permet de supprimer un produit
exports.deleteSauce = (req, res, next) => {

  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {

  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
    .catch((error) => res.status(400).json({ error: error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Ajout d'un like ou dislike d'un produit
exports.postLike = (req, res, next) => {
  if (req.body.like === 1) {

  Sauce.updateOne({ _id: req.params.id }, {
    $inc: { likes: req.body.like++ },
    $push: { usersLiked: req.body.userId },
  })
  .then(() => res.status(200).json({ message: 'Like ajouté' }))
  .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {

  Sauce.updateOne({ _id: req.params.id }, {
    $inc: { dislikes: req.body.like++ * -1 },
    $push: { usersDisliked: req.body.userId },
  })
  .then(() =>
  res.status(200).json({ message: 'Dislike ajouté' }))
  .catch((error) => res.status(400).json({ error }));
  }
};
