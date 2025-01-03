export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    createdAt: Date;
}

export interface Order {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
}