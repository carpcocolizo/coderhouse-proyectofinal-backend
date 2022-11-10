import { Router } from "express";
import {
  addToCarrito,
  createCarrito,
  deleteCarrito,
  deleteFromCarrito,
  getCarrito,
} from "../controllers/carritoController.js";
import { checkAuthentication, checkAdmin } from "../src/utils/aux.functions.js";

const router = Router();

// Las rutas estan distintas a la consigna, asi creo que tienen mas sentido

// Esta creado el metodo "addToCarritoMultipleTimes" que permitira implementarse con un selector de cantidad

router
  .route("/:id/productos")
  .get(checkAuthentication, getCarrito)
  .post(checkAuthentication, addToCarrito);

router.post("/", checkAuthentication, createCarrito);

router.delete("/:id", checkAdmin, deleteCarrito);

router.delete("/:id/productos/:id_prod", checkAuthentication, deleteFromCarrito);

export default router
