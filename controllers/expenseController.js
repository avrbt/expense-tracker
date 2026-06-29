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

        const expense = await prisma.expense.findUnique({
            where: {
                id
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        if (expense.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this expense"
            });
        }

        const { title, amount, category } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (amount !== undefined) {
            const parsedAmount = Number(amount);
            if (isNaN(parsedAmount)) {
                return res.status(400).json({
                    message: "Amount must be a number"
                });
            }
            updateData.amount = parsedAmount;
        }
        if (category !== undefined) updateData.category = category;

        const updatedExpense = await prisma.expense.update({
            where: {
                id
            },
            data: updateData
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

        const expense = await prisma.expense.findUnique({
            where: {
                id
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        if (expense.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this expense"
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

const getExpenseStats = async (req, res) => {
    try {
        const stats = await prisma.expense.aggregate({
            where: {
                userId: req.user.id
            },
            _count: {
                id: true
            },
            _sum: {
                amount: true
            },
            _avg: {
                amount: true
            },
            _max: {
                amount: true
            },
            _min: {
                amount: true
            }
        });

        res.status(200).json({
            totalTransactions: stats._count.id || 0,
            totalSpent: stats._sum.amount || 0,
            averageExpense: stats._avg.amount || 0,
            highestExpense: stats._max.amount || 0,
            lowestExpense: stats._min.amount || 0
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
    deleteExpense,
    getExpenseStats
};