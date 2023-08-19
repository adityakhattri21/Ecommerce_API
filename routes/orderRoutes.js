const express = require("express");
const router = express.Router();
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");
const { newOrder, myOrder, getSingleOrder, getAllOrders, updateStatus, deleteOrder } = require("../controllers/orderController");


router.route("/order/new").post(isAuthenticatedUser , newOrder)

router.route("/order/me").get(isAuthenticatedUser,myOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/admin/orders").get(isAuthenticatedUser , authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser , authorizeRoles("admin"),updateStatus)
.delete(isAuthenticatedUser , authorizeRoles("admin"),deleteOrder);



module.exports = router;