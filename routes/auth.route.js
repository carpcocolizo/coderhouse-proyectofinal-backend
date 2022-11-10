import { Router } from "express";
import passport from "passport";
import User from "../src/models/user.model.js";
import { registerStrategy, loginStrategy } from "../src/auth/passport.js";
import { submitOrder } from "../controllers/userController.js";
import { checkAuthentication } from "../src/utils/aux.functions.js";
import {
  failLogin,
  failSingup,
  logout,
  redirectMain,
  renderLogin,
  renderRegister,
} from "../controllers/authController.js";

const router = Router();

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

router.get("/", checkAuthentication, redirectMain);

router.get("/login", renderLogin);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  redirectMain
);

router.post("/submitorder", checkAuthentication, submitOrder);

router.get("/register", renderRegister);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  renderLogin
);

router.get("/faillogin", failLogin);

router.get("/failsignup", failSingup);

router.get("/logout", checkAuthentication, logout);

export default router;
