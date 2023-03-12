const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(200).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { products: req.body.products },
      { new: true }
    );
    return res.status(200).json(updatedCart);
    // if (updatedCart.products.some(prod => JSON.stringify(prod) === JSON.stringify(req.body) )) {
    //   return res.status(200).json(updatedCart);
    // } else {
    //   const updatedCart2 = await Cart.findByIdAndUpdate(
    //     req.params.id,
    //     { $push: { products: req.body } },
    //     { upsert: true, new: true }
    //   );
    //   return res.status(200).json(updatedCart2);
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been Deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(foundCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Carts = await Cart.find();
    res.status(200).json(Carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
