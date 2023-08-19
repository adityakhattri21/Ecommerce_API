const Order = require("../database/models/orderModel");
const Product = require("../database/models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

//Create  New Order
exports.newOrder = catchAsyncErrors(async (req,res,next)=>{

const {shippingInfo, 
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice } = req.body;
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user:req.user._id
            })

    res.status(201).json({
        success:true,
        order
    })

});

//get Single Order 
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
const order = await Order.findById(req.params.id).populate("user","name email");
if(!order){
    return next(new ErrorHandler("No Order with this ID",404));
}
res.status(200).json({
    success:true,
    order
});
});

//get User Order 
exports.myOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders
    });
});

//Get All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find().populate('user', 'name');

    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders,
        totalAmount:totalAmount
    })
});

//Update Order Status --Admin
exports.updateStatus = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No Order with this ID",404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Product already Delivered",400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      }
    

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now().toString();
    }
    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock=product.stock-quantity;

    await product.save({validateBeforeSave:false});
}

//delete Orders --Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No Order with this ID",404))
    }

    await order.deleteOne();

    res.status(200).json({
        success:true
    })
});