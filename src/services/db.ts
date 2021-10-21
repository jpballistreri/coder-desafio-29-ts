import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import * as model from "../models/ecommerce";
import Config from "../../config";

import { MensajeI, ProductoI } from "../models/ecommerce.interface";

export const connectToDB = async () => {
  try {
    console.log("CONECTANDO A MI DB");
    await mongoose.connect(
      //`mongodb://${Config.MONGO_LOCAL_IP}:${Config.MONGO_LOCAL_PORT}/${Config.MONGO_LOCAL_DBNAME}`,
      `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`
    );
    console.log("YA ESTOY CONECTADO");
    return "Connection Established";
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

interface createProduct {
  title: string;
  price: number;
  thumbnail: string;
}

interface updateProduct {
  title: string;
  price: number;
  thumbnail: string;
}

class Productos {
  constructor() {}

  async get(id?: string) {
    let output: any;
    try {
      if (id) {
        const document = await model.productos.findById(id);
        if (document) output.push(document);
      } else {
        output = await model.productos.find();
      }
      return output;
    } catch (err) {
      return output;
    }
  }

  async create(product: createProduct) {
    const newProduct = new model.productos(product);
    await newProduct.save();
    console.log("Producto agregado");
    return newProduct;
  }

  async delete(id: string) {
    await model.productos.findByIdAndDelete(id);
  }

  async update(id: string, producto: updateProduct) {
    return model.productos.findByIdAndUpdate(id, producto);
  }
}

class Mensajes {
  constructor() {}

  async get() {
    const output = await model.mensajes.find();
    return output;
  }

  async create(mensaje: MensajeI) {
    let messageToSave = new model.mensajes(mensaje);
    let savedMessage = await messageToSave.save();
    return savedMessage;
  }
}

export const DBProductos = new Productos();
export const DBMensajes = new Mensajes();

export const DBSesiones = {
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`,
    //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: `${Config.SESSION_SECRET_KEY}`,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 10000 * 60 },
};
