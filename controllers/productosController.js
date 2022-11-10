import daos from "../src/daos/index.js";
import { logger } from "../src/utils/logger.js";

const listaDeProductos = daos.ProductoDao.getInstance();

const getProducts = async (req, res) => {
  try {
    return await listaDeProductos.getAll();
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const getProductsResponse = async (req, res) => {
  try {
    const response = await listaDeProductos.getAll();
    res.json(response);
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resultado = await listaDeProductos.getById(id);
    if (!resultado) {
      res.json("{ error: producto no encontrado }");
      return;
    }
    res.json(resultado);
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const resultado = await listaDeProductos.getByCategory(categoria);
    if (!resultado) {
      res.json("{ error: categoria no encontrada }");
      return;
    }
    res.json(resultado);
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const postProducts = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, foto, precio, stock } = req.body;
    await listaDeProductos.insert({
      nombre,
      descripcion,
      categoria,
      foto,
      precio,
      stock,
    });
    res
      .status(201)
      .json({ nombre, descripcion, categoria, foto, precio, stock });
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const putProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, descripcion, categoria, foto, precio, stock } = req.body;
    await listaDeProductos.update(id, {
      nombre,
      descripcion,
      categoria,
      foto,
      precio,
      stock,
    });
    res
      .status(202)
      .json({ nombre, descripcion, categoria, foto, precio, stock });
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    await listaDeProductos.deleteById(id);
    res.sendStatus(202);
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

export {
  getProducts,
  getProductsById,
  getProductsByCategory,
  postProducts,
  putProducts,
  deleteProducts,
  getProductsResponse,
};
export default listaDeProductos;
