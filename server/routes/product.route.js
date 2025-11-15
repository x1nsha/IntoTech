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
router.route("/mine").get(authMiddleware, getMyProductsHandler);
router.route("/purge").delete(authMiddleware, requireAdmin, purgeProductsHandler);
router.route("/:id").get(getProductByIdHandler).patch(authMiddleware, patchProductHandler).delete(authMiddleware, deleteProductHandler);

module.exports = router;