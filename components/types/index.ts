export type ProductCard = {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    image: string;
    data: ProductType;

}

export type ProductType = {
    _id: string,
    name: string,
    slug: string,
    image: string,
    type: string,
    price: number,
    price_market: number,
    brand: string,
    endows: string[],
    quantity: number,
    stores: string[],
    description: string,
    createdAt: string,
    updatedAt: string
}