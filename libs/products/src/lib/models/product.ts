import { Category } from "@bluebits/products";
// import { User } from "@bluebits/products";

export interface Product {
    name?: string;
    id?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    rating?: number;
    price?: number;
    isFeatured?: boolean;
    brand?: string;
    numReviews?: any;
    category?: Category;
    // user?: User[];
    countInStock?: number;
    dateCreated?: Date;
}