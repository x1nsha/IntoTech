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
} = require("../controllers/product.controller");

router.route("/").get(getProductsHandler).post(postProductHandler);
router.route("/sort").get(sortProductsHandler);
router.route("/search").get(searchProductsHandler);
router
  .route("/:id")
  .get(getProductByIdHandler)
  .patch(patchProductHandler)
  .delete(deleteProductHandler);

module.exports = router;
