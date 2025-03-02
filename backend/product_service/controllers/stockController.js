import {
  stockUpdateService,
  checkStockService,
} from "../services/stockService.js";

export async function stockUpdateController(req, res, next) {
  try {
    const { operation, amount } = req.body;
    const { id } = req.params;
    const product = await stockUpdateService(id, operation, amount);
    res
      .status(200)
      .json({ message: "Stock updated successfully", product: product });
  } catch (error) {
    next(error);
  }
}

export async function checkStockController(req, res, next) {
  try {
    const { id } = req.params;
    const stock = await checkStockService(id);
    res
      .status(200)
      .json({ message: "Stock fetched successfully", stock: stock });
  } catch (error) {
    next(error);
  }
}
