const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
const { addToCart, removeCartItem, getAllCart } = require('../controllers/cartController');

router.route("/addToCart").post(addToCart);

router.route("/delete/:cartId").delete(removeCartItem);

router.route("/allCart").get(isAuthenticatedUser , authorizeRoles("admin"),getAllCart);

module.exports = router;