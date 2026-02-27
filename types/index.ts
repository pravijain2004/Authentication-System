export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  image: string;
  age: number;
  address: {
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  token: string;
  image: string;
  firstName: string;
  lastName: string;
}