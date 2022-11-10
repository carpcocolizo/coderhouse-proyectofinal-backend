import express from "express";
import path from "path";
import rutas from "./routes/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import { logger } from "./src/utils/logger.js";
import { Server } from "socket.io";
import configSocket from "./src/utils/websockets.js";
import config from "./src/config/config.js";
import cors from "cors";

const app = express();
const port = config.port || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };


const expressServer = app.listen(port, () => {
  logger.log("info", `El servidor se inicio en el puerto ${port}`);
});

const io = new Server(expressServer);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: path.join(__dirname, "./src/views/layout"),
    partialsDir: path.join(__dirname, "./src/views/partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTIONSTRING,
      mongoOptions,
    }),
    secret: config.secretCookie,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "./public")));

// La configuracion de sockets esta dada en un archivo dedicado a esto:

io.on("connection", async (socket) => {
  logger.log("info", `Se conecto un usuario: ${socket.id}`);
  configSocket(socket, io);
});

app.use("/", rutas);

app.use("/userdata", (req, res) => {
  res.json(req.user)
})


app.use("*", function (req, res) {
  res.json({
    error: -2,
    descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
  });
});
