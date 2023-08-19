const Cart = require('../database/models/cartModel');
const catchAsyncError = require("../middlewares/catchAsyncError");
const errorHandler = require('../utils/errorHandler');

//add to cart
exports.addToCart = catchAsyncError( async (req, res) => {
  
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Check if the item is already in the cart
    const existingCart = await Cart.findOne({
      user: userId,
    });

    if (existingCart) {
      // Update quantity if the item already exists
    const prod =  existingCart && existingCart.products.find(p=>p.id.toString() === productId);
    if(prod){
        existingCart.products.forEach(p=>{
            if(p.id.toString() === productId){
                p.quantity=quantity;
            }
    
        })
    }

    else{
        prod = {
            id:productId,
            quantity:quantity
        }
        existingCart.products.push(prod);
    }

    await existingCart.save();


    } else {
      // Create a new cart item if it doesn't exist
      let prod = {
        id:productId,
        quantity:quantity
      }
      await Cart.create({
        user: userId,
        products:prod
      });
    }

    res.status(201).json({ message: 'Item added to cart' });
});


//delete cart 
exports.removeCartItem =catchAsyncError( async (req, res) => {
 
      const cartId = req.params.cartId;
  
      const cartItem = await Cart.findById(cartId);
      if (!cartItem) {
        return next(new errorHandler("No Cart Found",404));
      }
  
      await cartItem.remove();
  
      res.status(200).json({ message: 'Cart item removed' });

  });

//get all carts --ADMIN
exports.getAllCart = catchAsyncError(async(req,res,next)=>{
    const carts = await Cart.find();
    const count = await  Cart.countDocuments();

    res.status(200).json({
        success:true,
        count:count,
        carts
    });
})