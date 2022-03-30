const express = require('express');
const Product = require('./models/product');
const app = express();
const mongoose = require('mongoose');

// Connection à la data base

mongoose.connect('mongodb+srv://Ibanez:Ibanez@cluster0.fpqz2.mongodb.net/MarketProducts?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Convertion des réponses en JSON

app.use(express.json());

// CORS


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Route Get pour retourner tous les produits

app.get('/api/products', (req, res, next) => {

  Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }));
});

// Route GET pour retourner un seul produit

app.get('/api/products/:id', (req, res, next) => {

  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
})

// Route POST Créer un nouveau produit

app.post('/api/products', (req, res, next) => {

  const product = new Product({

    ...req.body
  });

  product.save()

    .then(product => res.json({ product }))
    .catch(error => res.status(400).json({ error }));
});

// Route PUT modifications produit

app.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!' }))
    .catch(error => res.status(400).json({ error }));
});

// Route DELETE suppression du produit

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;
