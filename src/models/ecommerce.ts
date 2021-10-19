import Mongoose from "mongoose";
import { MensajeI, ProductoI } from "./ecommerce.interface";

const mensajesCollection = "mensajes";
const productosCollection = "productos";

const mensajesSchema = new Mongoose.Schema<MensajeI>({
  author: {
    email: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    alias: { type: String, required: true, max: 50 },
    edad: { type: Number, required: true },
    avatar: { type: String, required: true, max: 50 },
  },
  text: { type: String, required: true, max: 1000 },
  timestamp: { type: String },
});

const productosSchema = new Mongoose.Schema({
  title: { type: String, required: false },
  price: { type: String, required: false },
  thumbnail: { type: String, required: false },
});

export const mensajes = Mongoose.model(mensajesCollection, mensajesSchema);
export const productos = Mongoose.model(productosCollection, productosSchema);
