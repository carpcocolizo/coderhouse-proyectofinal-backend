import dotenv from "dotenv";
import config from "../config/config.js";
dotenv.config();

let ProductoDao;
let CarritoDao;
let MensajeDao;

switch (config.database) {
  case "mongodb":
    const { default: ProductoDaoMongo } = await import(
      "./productos/productosDaosMongo.js"
    );
    const { default: CarritoDaoMongo } = await import(
      "./carritos/carritoDaosMongo.js"
    );

    const { default: MensajeDaoMongo } = await import(
      "./mensajes/mensajesDaosMongo.js"
    );

    ProductoDao = ProductoDaoMongo;
    CarritoDao = CarritoDaoMongo;
    MensajeDao = MensajeDaoMongo

    break;
}

export default { ProductoDao, CarritoDao, MensajeDao };