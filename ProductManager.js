import fs from "fs";

class ProductManager {
  static currentId = 0;

  constructor(path) {
    this.path = path;
  }

  async addProduct(newProduct) {
    const products = await this.getProducts();

    ProductManager.currentId++;
    const newProductWithId = {
      id: ProductManager.currentId,
      ...newProduct,
    };

    const newProducts = [...products, newProductWithId];

    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.path);
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((item) => item.id === id);
    if (product === undefined) {
      console.log(`El producto con id ${id} no existe.`);
    }
    return product;
  }

  async updateProduct(id, newData) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...newData,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`Producto con id ${id} actualizado.`);
    } else {
      console.log(`No se encontró ningún producto con el id ${id}.`);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter((item) => item.id !== id);

    if (products.length === filteredProducts.length) {
      console.log(`Producto con id ${id} no existe.`);
      return;
    }

    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
    console.log(`Producto con id ${id} eliminado.`);
  }
}
const manager1 = new ProductManager("./products.json");

const newProduct = {
  title: "New Product",
  description: "Description product",
  price: 100,
  thumbnail: "path/a/image.jpg",
  code: "ABC123",
  stock: 10,
};
const newProduct2 = {
  title: "New Product 2",
  description: "Description product",
  price: 100,
  thumbnail: "path/a/image.jpg",
  code: "ABC234",
  stock: 3,
};
const newProduct3 = {
  title: "New Product 3",
  description: "Description product",
  price: 100,
  thumbnail: "path/a/image.jpg",
  code: "ABC345",
  stock: 7,
};
const newProduct4 = {
  title: "New Product 4",
  description: "Description product",
  price: 100,
  thumbnail: "path/a/image.jpg",
  code: "ABC456",
  stock: 6,
};

export default ProductManager;
// await manager1.addProduct(newProduct);
// await manager1.addProduct(newProduct2);
// await manager1.addProduct(newProduct3);
// await manager1.addProduct(newProduct4);
// const products = await manager1.getProducts();
// console.log("products: ", products);

// const product1 = await manager1.getProductById(1);
// console.log("product1: ", product1);
// const product3 = await manager1.getProductById(3);
// console.log("product3: ", product3);

// await manager1.updateProduct(1, {
//   title: "New Product Updated",
// });

// const updatedProduct1 = await manager1.getProductById(1);
// console.log("updatedProduct1: ", updatedProduct1);

// await manager1.deleteProduct(3);
// await manager1.deleteProduct(1);
// const products2 = await manager1.getProducts();
// console.log("products2: ", products2);
