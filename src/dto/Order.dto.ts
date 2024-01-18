
export class CartItem {
    _id: string;
    unit: number;
}

export class OrderInputs {
    transactionId: string;
    amount: string;
    items: [CartItem]
}