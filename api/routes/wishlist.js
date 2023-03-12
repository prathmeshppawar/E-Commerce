const Wishlist = require("../models/Wishlist");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (error) {
    res.status(200).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { products: req.body.products },
      { new: true }
    );
    return res.status(200).json(updatedWishlist);
    // if (updatedWishlist.products.some(prod => JSON.stringify(prod) === JSON.stringify(req.body) )) {
    //   return res.status(200).json(updatedWishlist);
    // } else {
    //   const updatedWishlist2 = await Wishlist.findByIdAndUpdate(
    //     req.params.id,
    //     { $push: { products: req.body } },
    //     { upsert: true, new: true }
    //   );
    //   return res.status(200).json(updatedWishlist2);
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json("Wishlist has been Deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER Wishlist
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const foundWishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(foundWishlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
