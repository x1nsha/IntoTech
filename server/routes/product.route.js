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
} = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { requireAdmin } = require("../middleware/role.middleware");

router.route("/").get(getProductsHandler).post(postProductHandler);
router.route("/sort").get(sortProductsHandler);
router.route("/search").get(searchProductsHandler);

// Admin-only purge endpoint to permanently delete unwanted categories (watches/clocks)
router.route("/purge").delete(authMiddleware, requireAdmin, purgeProductsHandler);

router
  .route("/:id")
  .get(getProductByIdHandler)
  .patch(patchProductHandler)
  .delete(deleteProductHandler);

module.exports = router;
