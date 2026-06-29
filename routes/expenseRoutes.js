const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getExpenseStats
} = require("../controllers/expenseController");


router.get("/stats", authMiddleware, getExpenseStats);
router.get("/", authMiddleware, getExpenses);
router.post("/", authMiddleware, addExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;