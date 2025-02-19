require('dotenv').config();
const mongoose = require('./mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware pour parser le JSON et les URL encodées
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importation des routes centralisées
const routes = require('./routes');

// Route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Centralisation des routes sous /api
app.use('/api', routes);

// Lancement du serveur avec correction du console.log()
app.listen(port, () => {
    console.log(`🚀 Example app listening on http://localhost:${port}`);
});
