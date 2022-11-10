import LocalPass from "passport-local";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createUserCarrito } from "../../controllers/carritoController.js";
import { sendEmail } from "../utils/nodemailer.js";
import { logger } from "../utils/logger.js";
const LocalStrategy = LocalPass.Strategy;

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return done(null, null);
      }
      const carrito = await createUserCarrito(username, req.body.address)

      const newUser = {
        username,
        password: hashPassword(password),
        firstname: req.body.firstname,
        address: req.body.address,
        age: req.body.age,
        telephonenumber: req.body.telephonenumber,
        carrito,
      };

      const createdUser = await User.create(newUser);

      sendEmail("Nuevo registro", JSON.stringify(newUser))

      done(null, createdUser);
    } catch (err) {
      logger.log("error", "Error registrando usuario" + err);
      done("Error en registro", null);
    }
  }
);

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user || !isValidPassword(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (err) {
    logger.log("error", "Error login" +  err);
    done("Error login", null);
  }
});

export { registerStrategy, loginStrategy };
