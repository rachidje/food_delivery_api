export interface CreateRestaurantInput{
    name: string,
    ownerName: string,
    foodTypes: [string],
    postalcode: string,
    address: string,
    phone: string,
    email: string,
    password: string
}

export interface EditRestaurantInput {
    name: string;
    address: string;
    phone: string;
    foodTypes: [string];
}


export interface LoginRestaurantInput {
    email: string;
    password: string;
}

export interface RestaurantPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
}