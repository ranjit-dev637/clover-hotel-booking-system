const express = require("express");
const Razorpay = require("razorpay");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// Homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Razorpay setup
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_SNvBK44fG4dklw",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "phfU42NDoVcDkePThBb1FCfp",
});

// Create order API
app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Order creation failed",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});