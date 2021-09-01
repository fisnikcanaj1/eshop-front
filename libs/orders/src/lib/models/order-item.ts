import { Product } from "@bluebits/products";

export class OrderItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}