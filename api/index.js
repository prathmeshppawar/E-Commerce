const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const wishlistRoute = require("./routes/wishlist")
const cartRoute = require("./routes/cart")
const cors = require("cors")
const app = express();


dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/wishlists", wishlistRoute)
app.use("/api/carts", cartRoute)

app.listen(process.env.PORT || 4000, () => {
  console.log("Backend Server is Running!");
});
