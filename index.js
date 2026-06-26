require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});