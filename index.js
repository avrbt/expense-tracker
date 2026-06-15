const express = require("express");


const app = express();

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

const expenseRoutes = require("./routes/expenseRoutes");

app.use(express.json());

app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});