import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import CartRouter from "./routes/carts.routes.js";
import ProductRouter from "./routes/product.routes.js";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./ProductManager.js";
import { Socket } from "dgram";

const port = 8080;

const app = express();

const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
const socketServer = new Server(httpServer);

const manager = new ProductManager("./products.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));
app.use("/", express.static(__dirname + "/public"));

socketServer.on("connection", (socket) => {
  console.log("New client conected");
  socket.on("addProduct", async (newProduct) => {
    await manager.addProduct(newProduct);

    const allProducts = await manager.getProducts();
    io.emit("updateProducts", allProducts);
  });

  socket.on("deleteProduct", async (productId) => {
    await manager.deleteProduct(productId);

    const allProducts = await manager.getProducts();
    io.emit("updateProducts", allProducts);
  });
});

app.get("/", async (req, res) => {
  let allProducts = await manager.getProducts();
  res.render("home", {
    title: "Express Avanced | Handlebars",
    products: allProducts,
  });
});

app.get("/realtimeproducts", async (req, res) => {
  let allProducts = await manager.getProducts();
  res.render("realTimeProducts", {
    title: "real time products",
    products: allProducts,
  });
});

app.use("/api/products", ProductRouter);
app.use("/api/products", CartRouter);

app.use("/static", express.static("${__dirname}/public"));
