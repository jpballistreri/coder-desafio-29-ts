export interface MensajeI {
  author: {
    email: { type: String; required: true; max: 50 };
    nombre: { type: String; required: true; max: 50 };
    apellido: { type: String; required: true; max: 50 };
    alias: { type: String; required: true; max: 50 };
    edad: { type: Number; required: true };
    avatar: { type: String; required: true; max: 50 };
  };
  text: { type: String; required: true; max: 1000 };
  timestamp: { type: String };
}

export interface ProductoI {
  title: { type: string; required: false };
  price: { type: number; required: false };
  thumbnail: { type: string; required: false };
}
