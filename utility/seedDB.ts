// Exemple de données dans un tableau
const restaurants = [
    {
        "name": "Le Petit Bistro",
        "ownerName": "Isabelle Dupont",
        "foodTypes": ["French", "Seafood"],
        "postalcode": "75001",
        "address": "10 Rue de la Roquette",
        "phone": "01 45 67 89 10",
        "email": "lepetitbistro@gmail.com",
        "password": "qwerty"
    },
    {
        "name": "La Brasserie Parisienne",
        "ownerName": "Pierre Martin",
        "foodTypes": ["French", "Brasserie"],
        "postalcode": "75002",
        "address": "30 Rue Montorgueil",
        "phone": "01 55 66 77 88",
        "email": "brasserieparisienne@gmail.com",
        "password": "qwerty"
    },
    {
        "name": "Chez Amélie",
        "ownerName": "Jacques Laurent",
        "foodTypes": ["Italian", "Mediterranean"],
        "postalcode": "75005",
        "address": "15 Rue Mouffetard",
        "phone": "01 34 56 78 90",
        "email": "chezamelie@gmail.com",
        "password": "qwerty"
    },
    {
        "name": "Sushi Fusion",
        "ownerName": "Yuki Tanaka",
        "foodTypes": ["Japanese", "Sushi"],
        "postalcode": "75010",
        "address": "5 Rue du Faubourg Saint-Denis",
        "phone": "01 23 45 67 89",
        "email": "sushifusion@gmail.com",
        "password": "qwerty"
    },
    {
        "name": "Le Gourmet Parisien",
        "ownerName": "Sophie Leclerc",
        "foodTypes": ["French", "Gourmet"],
        "postalcode": "75016",
        "address": "50 Avenue Victor Hugo",
        "phone": "01 12 34 56 78",
        "email": "gourmetparisien@gmail.com",
        "password": "qwerty"
    },
    {
        "name": "Burger World",
        "ownerName": "Mark Johnson",
        "foodTypes": ["American", "Burgers"],
        "postalcode": "75010",
        "address": "20 Rue de la République",
        "phone": "01 98 76 54 32",
        "email": "burgerworld@gmail.com",
        "password": "qwerty"
    },
    {
        "name": "Pasta Paradise",
        "ownerName": "Maria Rossi",
        "foodTypes": ["Italian", "Pasta"],
        "postalcode": "75010",
        "address": "15 Avenue de la Liberté",
        "phone": "01 76 54 32 10",
        "email": "pastaparadise@gmail.com",
        "password": "qwerty"
    }
];

import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../config/db';
import bcrypt from 'bcrypt';


export const generateSalt = async () : Promise<string> => {
    return await bcrypt.genSalt()
}

export const hashPassword = async (password: string, salt: string) : Promise<string> => {
    return await bcrypt.hash(password, salt)
}

async function insertRestaurantsIntoDatabase(restaurants: any[]) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log('Connected to the database');

        const database = client.db('food_delivery');

        const collection = database.collection('restaurants');

        for (const restaurant of restaurants) {
            const salt = await generateSalt();
            const hashedPassword = await hashPassword(restaurant.password, salt);

            // Créer un nouvel objet restaurant avec le mot de passe haché et le sel
            const restaurantWithHashedPassword = {
                ...restaurant,
                salt: salt,
                password: hashedPassword,
                rating: 0, 
                serviceAvailable: false, 
                coverImages: [], 
                foods: []
            };

            // Insérer le restaurant dans la collection
            const result = await collection.insertOne(restaurantWithHashedPassword);
            console.log(`Restaurant "${restaurant.name}" inserted into the database`);
        }
    } finally {
        await client.close();
    }
}

// Appeler la fonction pour insérer les restaurants dans la base de données
insertRestaurantsIntoDatabase(restaurants);
