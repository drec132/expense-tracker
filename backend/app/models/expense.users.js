module.exports = mongoose => {
    const Users = mongoose.model(
        "users",
        mongoose.Schema(
            {
                name: String,
                email: String,
                currency: String,
                password: String
            },
        )
    );

    return Users;
};