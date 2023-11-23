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
### 1. `POST /api/v1/admin/vendor`
Crée un nouveau vendeur.

### 2. `GET /api/v1/admin/vendor`
Récupère la liste de tous les vendeurs.

### 3. `GET /api/v1/admin/vendor/:id`
Récupère les détails d'un vendeur spécifique.

### 4. `POST /api/v1/vendor/login`
Permet à un vendeur de se connecter

### 5. `GET /api/v1/vendor/profile`
Récupère les détails du vendeur connecté

### 6. `PATCH /api/v1/vendor/profile`
Permet au vendeur connecté de mettre à jour son profile

### 7. `PATCH /api/v1/vendor/service`
Permet au vendeur de mettre à jour son statut de disponibilité

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