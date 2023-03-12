const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const router = require("express").Router();

function sendEmail(userEmail, body) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Studio 51 Clothing Co. - Order Placed Successfully",
      html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Studio 51 Clothing Co. - ORDER SUMMARY</title>

</head>

<body>
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:1.5">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Studio 51 Clothing
          Co.</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Studio 51 Clothing Co.</p>
      <p>Order Summary:</p>
      <div style="display: flex;
  justify-content: space-between">
        <div style="flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 5px;
  width: 100%;">
          <h1 style="font-weight: 400; text-align: center;">ORDER SUMMARY</h1>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <div style="width: 50%;">
            <div style="margin: 10px 0px;
  display: flex; 
  justify-content: flex-start;">
              <span style = "width: 100%;">Subtotal</span>
            </div>
            <div style="margin: 10px 0px;
  display: flex;
  justify-content: flex-start;">
              <span style = "width: 100%;">Estimated Shipping</span>
            </div>
            <div style="margin: 10px 0px;
  display: flex;
  justify-content: flex-start;">
              <span style = "width: 100%;">Shipping Discount</span>
            </div>
            <div style="margin: 10px 0px;
  display: flex;
  justify-content:flex-start; font-weight: 500;
  font-size: 24px">
              <span style = "width: 100%;">Total</span>
            </div>
            <div style="margin: 10px 0px;
  display: flex;
  justify-content:flex-start;>
              <span style = "width: 100%;">Delivery Address: </span>
            </div>
            </div>
            <div style="width: 50%;">
            <div style="margin: 10px 0px;
              display: flex; 
              justify-content: flex-end;">
              <span style = "width: 100%;">$ ${body.amount}</span>
            </div>
            <div style="margin: 10px 0px;
              display: flex; 
              justify-content: flex-end;">
              <span style = "width: 100%;">
                $ 5.9
              </span>
            </div>
            <div style="margin: 10px 0px;
              display: flex;
              justify-content: flex-end;">
              <span style = "width: 100%;">
                $ 5.9
              </span>
            </div>
            <div style="margin: 10px 0px;
              display: flex;
              justify-content: flex-end; font-weight: 500;
              font-size: 24px">
              <span style = "width: 100%;">$ ${body.amount}</span>
            </div>
            <div style="margin: 10px 0px;
              display: flex;
              justify-content: flex-end;>
              <span style = "width: 100%;">${body.address}</span>
            </div>
            </div>
          </div>
        </div>
      </div>
      <p style="font-size:0.9em;">Regards,<br />Studio 51 Clothing Co.</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Studio 51 Clothing Co.</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>

</body>

</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    const user = await User.findById(req.body.userId);
    const userEmail = user.email;
    sendEmail(userEmail, req.body);
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been Deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
