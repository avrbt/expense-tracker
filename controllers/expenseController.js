const expenses = []

const getExpenses =(req,res) => {
    res.json(expenses);
}

const addExpense = (req, res) => {
    const { title, amount } = req.body;

    if (!title || amount == null) {
        return res.status(400).json({
            message: "Title and amount are required"
        });
    }

    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be positive"
        });
    }

    const expense = {
        id: Date.now(),
        title,
        amount
    };

    expenses.push(expense);

    res.status(201).json({
        message: "Expense added successfully",
        data: expense
    });
};

const deleteExpense = (req, res) => {

    const id = Number(req.params.id);

    const filteredExpenses = expenses.filter((expense) => {
        return expense.id !== id;
    });

    expenses.length = 0;

    expenses.push(...filteredExpenses);

    res.json({
        message: "Expense deleted successfully"
    });

};

const updateExpense = (req,res)=>{
    const id = Number(req.params.id);
    const expense = expenses.find(expense=>expense.id===id);

    if(!expense){
        return res.status(404).json({
            message:"Expense not found"
        });
    }

    expense.title = req.body.title;
    expense.amount = req.body.amount;

    res.json({
        message: "Expense updated successfully",
        data: expense
    });
}

module.exports = {
    getExpenses,
    addExpense,
    deleteExpense,
    updateExpense
};
