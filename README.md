# API Food Delivery

[![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://github.com/votre_utilisateur/votre_projet/releases/tag/v1.0.0)
[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D%2021.2.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript Version](https://img.shields.io/badge/typescript-%5E5.3.2-blue.svg)](https://www.typescriptlang.org/)

Implémentation d'une API pour frontend, qui gère les restaurants et les utilisateurs pour une application de livraison de nourritue style UberEats

## Installation

Assurez-vous d'avoir Node.js installé. Clonez ce dépôt, puis installez les dépendances en utilisant:

```bash
npm install
```

## Endpoints
### 1. `POST /api/v1/admin/restaurant`
Ajouter un nouveau restaurant.

Exemple de body
```
{
    "name": "Toto Ratatouille",
    "ownerName": "Jane Doe",
    "foodTypes": ["Pizza", "Pates"],
    "postalcode": "123",
    "address": "25 rue de la paix",
    "phone": "01 23 45 67 89",
    "email": "toto@gmail.com",
    "password": "qwerty"
}
```

### 2. `GET /api/v1/admin/restaurant`
Récupère la liste de tous les restaurants.

### 3. `GET /api/v1/admin/restaurant/:id`
Récupère les détails d'un restaurant spécifique.

### 4. `POST /api/v1/restaurant/login`
Permet à un restaurant de se connecter

Exemple de body:
```
{
    "email":"john@gmail.com",
    "password": "qwerty"
}
```

### 5. `GET /api/v1/restaurant/profile`
Récupère les détails du restaurant connecté

### 6. `PATCH /api/v1/restaurant/profile`
Permet au restaurant connecté de mettre à jour son profile

Exemple de body:
```
{
    "name" : "Big Ratatouille", 
    "address": "36 rue de la paix", 
    "phone": "09 87 65 43 21", 
    "foodTypes": ["Tacos", "Burgers"]
}
```

### 7. `PATCH /api/v1/restaurant/service`
Permet au restaurant de mettre à jour son statut de disponibilité

## Tâches

* [X] Mise en place de la structure de base du projet
* [X] Configuration de l'environnement de développement
* [X] Mise en place du serveur Node.js avec Express
* [X] Configuration de TypeScript
* [X] Connexion à la base de données
* [X] Implémentation des endpoints de base
* [ ] Ajout de la gestion des erreurs
* [ ] Documentation des endpoints dans le README
* [ ] Ajout de fonctionnalités spécifiques à la livraison de nourriture
* [ ] Tests unitaires
* [ ] Tests d'intégration
* [ ] Mise en production
* [ ] Documentation complète
* [ ] Version 1.0.0 - Prêt pour le déploiement