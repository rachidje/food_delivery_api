# API Food Delivery

![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png)
![TypeScript Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png)

Implémentation d'une API pour frontend, qui gère les restaurants et les utilisateurs pour une application de livraison de nourritue style UberEats

## Installation

Assurez-vous d'avoir Node.js installé. Clonez ce dépôt, puis installez les dépendances en utilisant:

```bash
npm install
```

## Endpoints
### 1. `POST /api/admin/vendor`
Crée un nouveau vendeur.

### 2. `GET /api/admin/vendor`
Récupère la liste de tous les vendeurs.

### 3. `GET /api/admin/vendor/:id`
Récupère les détails d'un vendeur spécifique.

### 4. `POST /api/vendor/login`
Permet à un vendeur de se connecter

### 5. `GET /api/vendor/profile`
Récupère les détails du vendeur connecté

### 6. `PATCH /api/vendor/profile`
Permet au vendeur de mettre à jour son profile

### 7. `PATCH /api/vendor/service`
Permet au vendeur de mettre son statut de disponibilité

## Tâches
Utilisez cette liste de tâches pour suivre le développement de votre projet. Cochez les cases au fur et à mesure que les tâches sont complétées.

* [X] Mise en place de la structure de base du projet
* [X] Configuration de l'environnement de développement
* [X] Mise en place du serveur Node.js avec Express
* [X] Configuration de TypeScript
* [X] Connexion à la base de données
* [] Implémentation des endpoints de base
* [] Ajout de la gestion des erreurs
* [] Documentation des endpoints dans le README
* [] Ajout de fonctionnalités spécifiques à la livraison de nourriture
* [] Tests unitaires
* [] Tests d'intégration
* [] Mise en production
* [] Documentation complète
* [] Version 1.0.0 - Prêt pour le déploiement