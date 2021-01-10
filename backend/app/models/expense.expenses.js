module.exports = mongoose => {
    const Expenses = mongoose.model(
        "expenses",
        mongoose.Schema(
            {
                title: String,
                category: String,
                date: Date,
                value: Number
            }
        )
    );

    return Expenses;
};