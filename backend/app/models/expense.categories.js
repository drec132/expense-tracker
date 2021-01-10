module.exports = mongoose => {
    const Categories = mongoose.model(
        "categories",
        mongoose.Schema(
            {
                title: String,
                description: String
            }
        )
    );

    return Categories;
};