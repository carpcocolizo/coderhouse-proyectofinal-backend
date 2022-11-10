import ContenedorMongo from "../../contenedores/contenedormongo.js";

let instance;

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", {
      timestamp: { type: "String", required: true },
      productos: { type: "Mixed", default: [], required: true },
      email: { type: "String", required: true },
      address: { type: "String", required: true }
    });
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductoDaoMongo();
    }

    return instance;
  }
}

export default CarritoDaoMongo;
