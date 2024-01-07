export interface CreateOfferInputs {
    offerType: string;
    restaurants: [any];
    title: string;
    description: string;
    minValue: number;
    offerAmount: number;
    startValidity: Date;
    endValidity: Date;
    promocode: string;
    promoType: string;
    postalcode: string;
    isActive: boolean;
}