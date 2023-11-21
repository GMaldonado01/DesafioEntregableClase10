import fs from "fs";
import ProductManager from "./ProductManager.js";

const productALL = new ProductManager();

class CartManager {
  static currentId = 0;

  constructor(path) {
    this.path = path;
  }

  async addCarts(newCarts) {
    const carts = await this.getCarts();

    ProductManager.currentId++;
    const newCartsWithId = {
      id: CartManager.currentId,
      ...newCart,
    };

    const newCart = [...carts, newCartsWithId];

    await fs.promises.writeFile(this.path, JSON.stringify(newCarts));
  }

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(this.path);
      return JSON.parse(carts);
    } catch (error) {
      return [];
    }
  }

  async getCartById() {
    const getCartById = await this.getCartById();
    const cart = products.find((item) => item.id === id);
    if (cart === undefined) {
      console.log(`El carrito con id ${id} no existe.`);
    }
    return cart;
  }

  addProductInCart = async (cartId, productiD) => {
    const CartId = await this.getCartById(cartId);
    const cart = cart.find((item) => item.id === id);
    if (cart === undefined) {
      console.log(`El carrito con id ${id} no existe.`);
      const productsById = await productALL.getProductById(productiD);
      const product = product.find((item) => item.id === id);
      if (product === undefined) {
        console.log(`El producto con id ${id} no existe.`);
        let cartsALL = await this.getCarts();
        let cartFilter = cartsALL.filter((cart) => cart.id != cartId);

        if (CartId.products.some((prod) => prod.id === productsById)) {
          let moreProductInCart = CartId.products.find(
            (prod) => prod.id === productsById
          );
          moreProductInCart.cantidad++;
          let cartsConcat = [productInCart, ...cartFilter];
          await this.addCarts(cartsConcat);
          return "Producto sumado al cart";
        }
        CartId.product.push({ id: productsById.id, cantidad: 1 });

        let productFilter = cartsALL.filter((prod) => prod.id != productiD);
        let cartsConcat = [productInCart, ...productFilter];

        await this.addCarts(cartsConcat);
        return "Producto agregado al cart";
      }
    }
  };
}
export default CartManager;
