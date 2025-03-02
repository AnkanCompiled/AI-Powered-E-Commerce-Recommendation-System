import {
  getAllProductsService,
  getProductByCategoryService,
  getProductByQueryService,
  addProductService,
} from "../services/productService.js";
import { roleCheckService } from "../services/roleService.js";

export async function getAllProductsController(req, res, next) {
  try {
    await roleCheckService(req.user.id, ["admin"]);
    const products = await getAllProductsService(req.user.id);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductByCategoryController(req, res, next) {
  try {
    const category = req.params.category;
    const product = await getProductByCategoryService(category);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function getProductByQueryController(req, res, next) {
  try {
    const query = req.params.query;
    const product = await getProductByQueryService(query);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function addProductController(req, res, next) {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const newProduct = await addProductService(
      name,
      description,
      price,
      category,
      imageUrl,
      stock
    );
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
}
