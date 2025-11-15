const express = require("express");
const router = express.Router();

const {
  getProductsHandler,
  postProductHandler,
  patchProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  sortProductsHandler,
  searchProductsHandler,
  purgeProductsHandler,
  getMyProductsHandler,
} = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { requireAdmin } = require("../middleware/role.middleware");

router.route("/").get(getProductsHandler).post(authMiddleware, postProductHandler);
router.route("/sort").get(sortProductsHandler);
router.route("/search").get(searchProductsHandler);

// My products
router.route("/mine").get(authMiddleware, getMyProductsHandler);

// Admin-only purge endpoint to permanently delete unwanted categories (watches/clocks)
router.route("/purge").delete(authMiddleware, requireAdmin, purgeProductsHandler);

router
  .route("/:id")
  .get(getProductByIdHandler)
  .patch(authMiddleware, patchProductHandler)
  .delete(authMiddleware, deleteProductHandler);

module.exports = router;
