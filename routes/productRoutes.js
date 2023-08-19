const express = require("express");
const { getAllproducts, getAdminProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReviews } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get( getAllproducts);

router.route("/admin/products").get(isAuthenticatedUser , authorizeRoles("admin") , getAdminProducts);

router.route("/admin/product/new").post(  isAuthenticatedUser ,authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id").put(  isAuthenticatedUser ,authorizeRoles("admin"),  updateProduct)
.delete(  isAuthenticatedUser ,authorizeRoles("admin"), deleteProduct); 

router.route("/product/:id").get(getProductDetails);


router.route("/review").put(isAuthenticatedUser , createProductReview);

router.route("/reviews").get(getAllReviews).delete(isAuthenticatedUser , deleteReviews)


module.exports=router;