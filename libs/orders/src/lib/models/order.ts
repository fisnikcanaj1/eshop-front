import { OrderItem } from "./order-item";
import { User } from "@bluebits/products"

export class Order {
    id?: string;
    name?: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number | undefined;
    totalPrice?: string;
    dateOrdered?: string;
    user?: User;
}