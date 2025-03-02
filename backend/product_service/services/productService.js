import AppError from "../../user_service/errors/appError.js";
import {
  getAllProductsRepo,
  getProductByCategoryRepo,
  getProductByQueryRepo,
  addProductRepo,
} from "../repos/productRepo.js";

export async function getAllProductsService() {
  try {
    const products = await getAllProductsRepo();
    return products;
  } catch (error) {
    console.error("Error is getAllProductsService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function getProductByCategoryService(category) {
  try {
    const product = await getProductByCategoryRepo(category);
    return product;
  } catch (error) {
    console.error("Error is getProductByCategoryService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function getProductByQueryService(query) {
  try {
    const product = await getProductByQueryRepo(query);
    return product;
  } catch (error) {
    console.error("Error is getProductByQueryService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function addProductService(
  name,
  description,
  price,
  category,
  imageUrl,
  stock
) {
  try {
    const newProduct = await addProductRepo(
      name,
      description,
      price,
      category,
      imageUrl,
      stock
    );
    return newProduct;
  } catch (error) {
    console.error("Error is addProductService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
