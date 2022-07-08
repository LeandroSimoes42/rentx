
interface Accessories{
    id: string;
    type: string;
    name: string
}

export interface Photos{
    id: string;
    photo: string;
}

export interface Cars{
    id: string;
    brand: string;
    name: string;
    about: string;
    period: string;
    price: number;
    fuel_type: string;
    thumbnail: string;
    accessories: Accessories[];
    photos: Photos[]
}