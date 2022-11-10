import User from "../src/models/user.model.js";
import { logger } from "../src/utils/logger.js";

const chatController = (req, res) => {
  try {
    const user = req.user;
    if (user.rol == "ADMIN") {
      res.render("chatadmin.hbs", { email: user.username, rol: user.rol });
    } else {
      res.render("chat.hbs", { email: user.username, rol: user.rol });
    }
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
  }
};

const chatEmail = async (req, res) => {
  try {
    const params = req.params;
    const userByEmail = await User.find({ username: params.email });
    const user = req.user;
    if (userByEmail.length && userByEmail[0].username == user.username) {
      const user = req.user;
      res.render("chatemail.hbs", { email: user.username, rol: user.rol });
    } else {
      res.json({ Error: "Ingrese su email correctamente" });
    }
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
  }
};

export { chatController, chatEmail };
