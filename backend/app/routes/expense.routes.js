module.exports = app => {
    const users = require("../controller/expense.users_controller.js");
    const expenses = require("../controller/expense.expenses_controller.js");
    const categories = require("../controller/expense.categories_controller.js");

    var router = require("express").Router();

    router.post("/login", users.login);

    router.route("/expenses")
        .get(expenses.findAll)
        .post(expenses.create)

    router.route("/expenses/:id")
        .put(expenses.update)
        .delete(expenses.delete);

    router.route("/categories")
        .get(categories.findAll)
        .post(categories.create);

    router.route("/categories/:id")
        .put(categories.update)
        .delete(categories.delete);



    app.use('/api', router);
};