import Product from "../models/productModel.js";

export async function getAllProductsRepo() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error("Error is getAllProductsRepo:", error);
    throw error;
  }
}

export async function getProductByCategoryRepo(category) {
  try {
    const products = await Product.find({ category: category });
    return products;
  } catch (error) {
    console.error("Error is getProductByCategoryRepo:", error);
    throw error;
  }
}
export async function getProductByQueryRepo(query) {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });
    return products;
  } catch (error) {
    console.error("Error in getProductByQueryRepo:", error);
    throw error;
  }
}

export async function addProductRepo(
  name,
  description,
  price,
  category,
  imageUrl,
  stock
) {
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
    });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error("Error is addProductRepo:", error);
    throw error;
  }
}
