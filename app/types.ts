export interface Game {
  id: number;
  titulo: string;
  genero: 'accion' | 'rpg' | 'aventura';
  precio: number;
  imagen: string;
  descripcion: string;
  calificacion: string;
}

export interface CartItem extends Game {
  cantidad: number;
}
