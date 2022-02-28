//Importation Express
const express = require('express');
//Importation mongoose (BDD)
const mongoose = require('mongoose');
//Importation body-parser (Module pour accèder au corps de la requête)
const bodyParser = require('body-parser');
//Importation path (Module chemin de l'image)
const path = require('path');
//Importation cors (Module autorisation partage de ressource)
const cors = require('cors');

//Importation des routes
const reqSauce = require('./routes/Sauce');
const reqUser = require('./routes/User');

//Stockage Express dans une variable const
const app = express();

//Accès à la BDD MongoDB
mongoose.connect('mongodb+srv://<USER>:<PASSWORD>@cluster0.seayg.mongodb.net/Data0?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Autorisation partage de ressource
app.use(cors());

//Accès au corps de la requête
app.use(bodyParser.json());

//Accès à la route correspondante
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', reqSauce);
app.use('/api/auth', reqUser);

module.exports = app;
