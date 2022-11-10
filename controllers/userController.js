import {
  emptyCarrito,
  getCarritoNoResponse,
} from "../controllers/carritoController.js";
import { sendEmail } from "../src/utils/nodemailer.js";
import { logger } from "../src/utils/logger.js";
import Order from "../src/models/orders.model.js";

const submitOrder = async (req, res) => {
  try {
    const user = req.user;
    const carrito = await getCarritoNoResponse(user.carrito);
    if (carrito.length == 0) {
      res.json({ FAILED: "EL CARRITO ESTA VACIO" });
    } else {
      await createNewOrder(user, carrito)
      const asunto = `Nuevo pedido de ${user.firstname}, ${user.username}`;
      sendEmail(asunto, JSON.stringify(carrito));
      await emptyCarrito(user.carrito);
      res.json({ SUCCESS: "PEDIDO REALIZADO CON EXITO" });
    }
  } catch (error) {
    logger.log("error", "Hubo un error:" + error)
  }
};

const createNewOrder = async (user, carrito) => {
  const totalOrders = await Order.find({}, { __v: 0 }).lean()

  // Aca lo que hago es ordenar por cantidad los productos que tienen la misma "id" en el carrito, podria hacerlo con cualquier otra propiedad
  // Creo que es la forma mas correcta de agruparlos

  const order = carrito.reduce((acc, aux) => {
    const { _id } = aux
    if (acc[_id]) ++acc[_id]
    else acc[_id] = 1;
    return acc;
  }, {});

  const newOrder = {
    products: order,
    order: totalOrders.length + 1 || 0,
    timestamp: Date.now(),
    email: user.username,
    address: user.address
  }
  await Order.create(newOrder)
}

export { submitOrder }