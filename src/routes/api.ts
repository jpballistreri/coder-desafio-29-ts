import express from "express";
import { DBProductos } from "../services/db";
import { isLoggedIn } from "../../middlewares/auth";
import passport from "../../middlewares/auth";
import { fork } from "child_process";
import path from "path";
import { ProductoI } from "../models/ecommerce.interface";

const router = express.Router();

router.get("/randoms", isLoggedIn, async (req, res) => {
  const scriptPath = path.resolve(__dirname, "../utils/randomNumbers");

  const resultado = fork(scriptPath);
  const msj = {
    command: "start",
    numero: req.query.cant,
  };
  resultado.send(msj);
  resultado.on("message", (sum) => {
    res.json({ resultado: sum });
  });
});
router.get("/info", isLoggedIn, async (req, res) => {
  const objInfo = {
    argumentos_de_entrada: process.argv,
    sistema_operativo: process.platform,
    version_nodejs: process.version,
    uso_memoria: process.memoryUsage(),
  };
  res.json({
    data: objInfo,
  });
});
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/productos/login-ok-fb",
    failureRedirect: "productos/error-login",
  })
);

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.redirect("/productos/error-signup");

    return res.redirect("/productos/ok-signup");
  })(req, res, next);
});

//router.use("/user", isLoggedIn, UserRouter);

router.get("/productos/", async (req, res) => {
  const items = await DBProductos.get();
  res.json({
    data: items,
  });
});

router.get("/productos/:id", async (req, res) => {
  const { id } = req.params;

  const result = await DBProductos.get(id);
  if (!result.length)
    return res.status(404).json({
      msgs: "Producto no encontrado!",
    });

  res.json({
    data: result,
  });
});

const validateLogIn = (req: any, res: any, next: any) => {
  if (req.session.loggedIn) next();
  else res.redirect("/productos/login");
};

router.post("/productos/", isLoggedIn, async (req, res) => {
  const { title, price, thumbnail } = req.body;
  //Validar datos ingresados
  if (
    !title ||
    !price ||
    !thumbnail ||
    typeof title != "string" ||
    typeof price != "number" ||
    typeof thumbnail != "string"
  ) {
    return res.status(400).json({
      msj: "Se deben ingresar Titulo(string), Precio(number) y Thumbnail(string) del producto.",
    });
  }

  const item = {
    title,
    price,
    thumbnail,
  };

  const newProduct = await DBProductos.create(item);
  //const newProduct = await DBProductos.get("productos", newId);
  res.json({
    msj: "Producto agregado.",
    data: newProduct,
  });
});

router.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const productoAEliminar = await DBProductos.get(id);
  if (!productoAEliminar.length) {
    return res.status(400).json({
      msj: "No existe el producto.",
    });
  }

  await DBProductos.delete(id);

  res.json({
    Producto_eliminado: productoAEliminar,
  });
});

router.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  if (
    !title ||
    !price ||
    !thumbnail ||
    typeof title != "string" ||
    typeof price != "number" ||
    typeof thumbnail != "string"
  ) {
    return res.status(400).json({
      msj: "Se deben ingresar Titulo(string), Precio(number) y Thumbnail(string) del producto.",
    });
  }

  const productoAActualizar = await DBProductos.get(id);
  if (!productoAActualizar.length) {
    return res.status(400).json({
      msj: "No existe el producto.",
    });
  }

  const item = {
    title,
    price,
    thumbnail,
  };

  await DBProductos.update(id, item);
  const productoActualizado = await DBProductos.get(id);
  //console.log(await productoActualizado);
  res.json({
    Producto_actualizado: productoActualizado,
  });
});

export default router;
