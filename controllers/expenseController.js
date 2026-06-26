const prisma = require("../config/prisma");

const getExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
    where: {
        userId: req.user.id
    }
});

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const addExpense = async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        if (!title || amount == null || !category) {
            return res.status(400).json({
                message: "Title, amount and category are required"
            });
        }

        const expense = await prisma.expense.create({
    data: {
        title,
        amount: Number(amount),
        category,
        userId: req.user.id
    }
});

        res.status(201).json({
            message: "Expense added successfully",
            data: expense
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid ID parameter"
            });
        }

        const expense = await prisma.expense.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const { title, amount, category } = req.body;

        const updatedExpense = await prisma.expense.update({
            where: {
                id
            },
            data: {
                title,
                amount: Number(amount),
                category
            }
        });

        res.status(200).json({
            message: "Expense updated successfully",
            data: updatedExpense
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid ID parameter"
            });
        }

        const expense = await prisma.expense.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await prisma.expense.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
};