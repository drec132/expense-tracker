const db = require('../models');
const Expenses = db.expenses;

// Find all Expenses
exports.findAll = (req, res) => {
    Expenses.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
}

// Update a expenses
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const id = req.params.id;

    Expenses.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Expenses with id=${id}!`
                });
            } else res.send({ message: "Expenses was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Expenses with id=" + id
            });
        });
};

// Delete a expenses
exports.delete = (req, res) => {
    const id = req.params.id;

    Expenses.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Expenses with id=${id}`
                });
            } else {
                res.send({
                    message: "Expenses was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Expenses with id=" + id
            });
        });
}

// Add a expenses
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content is empty!" })
        return;
    }

    const { title, category, date, value } = req.body;
    const expenses = new Expenses({
        title: title,
        category: category,
        date: date,
        value: value
    })

    expenses
        .save(expenses)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}