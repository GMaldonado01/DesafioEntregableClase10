import { Router } from "express";
import ProductManager from "../ProductManager.js";

const manager = new ProductManager("./products.json");
const ProductRouter = Router();

ProductRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

ProductRouter.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  if (!pid) {
    return res.send("El producto no existe");
  }
  const allProducts = await product.getProducts();
  const productsById = allProducts.find((product) => product.id === pid);
  res.send(productsById);
});

ProductRouter.post("/", async (req, res) => {
  let productAdd = req.body;
  res.send(await manager.addProduct(productAdd));
});

ProductRouter.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  let updateProduct = req.body;
  res.send(await manager.deleteProduct(id));
});

ProductRouter.delete("/:pid", async (req, res) => {
  let id = req.params.pid;
  res.send(await product.deleteProducts(pid));
});

export default ProductRouter;
