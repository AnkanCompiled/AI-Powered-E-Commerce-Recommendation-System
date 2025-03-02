import Product from "../models/productModel.js";

export async function stockUpdateRepo(productId, operation, amount) {
  try {
    const updateQuery =
      operation === "add"
        ? { $inc: { stock: amount } }
        : { $inc: { stock: -amount } };

    const product = await Product.findByIdAndUpdate(productId, updateQuery, {
      new: true,
      runValidators: true,
    });
    return product;
  } catch (error) {
    console.error("Error in stockUpdateRepo:", error);
    throw error;
  }
}

export async function checkStockRepo(productId) {
  try {
    const product = await Product.findById(productId);
    return product.stock;
  } catch (error) {
    console.error("Error in stockUpdateRepo:", error);
    throw error;
  }
}
