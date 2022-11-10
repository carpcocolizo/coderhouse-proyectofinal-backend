import ContenedorMongo from "../../contenedores/contenedormongo.js";

let instance;

class MensajeDaoMongo extends ContenedorMongo {
  constructor() {
    super("mensajes", {
      email: { type: "string", required: true },
      body: { type: "string", required: true },
      date: { type: "string", required: true },
      rol: { type: "string", required: true},
      to: { type: "string", required: false}
    });
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajeDaoMongo();
    }

    return instance;
  }
}

export default MensajeDaoMongo;
