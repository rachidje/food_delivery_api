import { RestaurantPayload } from "./Restaurant.dto";
import { CustomerPayload } from "./Customer.dto";

export type AuthPayload = RestaurantPayload | CustomerPayload //| AdminPayload | UserPayload