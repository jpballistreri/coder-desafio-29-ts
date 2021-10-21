import express from "express";
import path from "path";
import { DBSesiones } from "./db";
import session from "express-session";
import * as http from "http";
//import cookieParser from "cookie-parser";
//import passport from "../../middlewares/auth";

/** INICIALIZACION API con EXPRESS */
const app = express();
const publicPath = path.resolve(__dirname, "../../public");
app.use(express.static(publicPath));

app.set("view engine", "pug");
const viewsPath = path.resolve(__dirname, "../../views/");
app.set("views", viewsPath);

const myServer = new http.Server(app);
myServer.on("error", (err) => {
  console.log("ERROR ATAJADO", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(DBSesiones));

app.get("/", (req, res) => {
  console.log("Resolving / endpoint");
  res.json({
    pid: process.pid,
    msg: "HOLA JUAN CARL!OS",
  });
});

export default app;
