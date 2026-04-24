export type Genre = 'accion' | 'rpg' | 'aventura';

export interface Game {
  id: number;
  titulo: string;
  genero: Genre;
  precio: number;
  imagen: string;
  descripcion: string;
  calificacion: number;
}

export interface CartItem extends Game {
  cantidad: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface OrderItem {
  titulo: string;
  precio: number;
  cantidad: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

export interface PaymentInfo {
  cardNumber: string;
  amount: number;
  items: OrderItem[];
}
