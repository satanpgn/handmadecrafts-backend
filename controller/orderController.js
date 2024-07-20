const { json } = require("express");
const cloudinary = require("cloudinary");
const Orders = require("../model/orderModel");
 
// order created
const createOrder = async (req, res) => {
  console.log(req.body);
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const newOrder = new Orders({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
    await newOrder.save();
    res.json({
      success: true,
      message: "Order Successfull",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
 
 
const { ObjectId } = require("mongoose").Types;
 
const getOrders = async (req, res) => {
  const id = req.params.id.trim(); // Trim the value to remove whitespaces or newline characters
 
  console.log(id);
  try {
    const orders = await Orders.find({ userId: new ObjectId(id) }).populate(
      "productId"
    );
    console.log(id, orders);
    res.json({
      success: true,
      message: "Order fetched successfully",
      order: orders,
    });
  } catch (error) {
    res.send(error);
  }
};
// exporting
module.exports = {
  createOrder,
  getOrders,
};
 

// const { json } = require("express");
// const cloudinary = require("cloudinary");
// const Orders = require("../model/orderModel");
// const { ObjectId } = require("mongoose").Types;

// // Create an order
// const createOrder = async (req, res) => {
//   console.log(req.body);
//   const { userId, productId, quantity, fullName, email, contactNumber, address } = req.body;

//   if (!userId || !productId || !quantity || !fullName || !email || !contactNumber || !address) {
//     return res.json({
//       success: false,
//       message: "All fields are required",
//     });
//   }

//   try {
//     const newOrder = new Orders({
//       userId,
//       productId,
//       quantity,
//       fullName,
//       email,
//       contactNumber,
//       address,
//     });
//     await newOrder.save();
//     res.json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // Get orders by user ID
// const getOrders = async (req, res) => {
//   const id = req.params.id.trim();

//   if (!ObjectId.isValid(id)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid user ID",
//     });
//   }

//   try {
//     const orders = await Orders.find({ userId: new ObjectId(id) }).populate("productId");
//     res.json({
//       success: true,
//       message: "Orders fetched successfully",
//       orders,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// module.exports = {
//   createOrder,
//   getOrders,
// };
