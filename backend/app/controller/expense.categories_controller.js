const db = require('../models');
const Categories = db.categories;

// Find all categories
exports.findAll = (req, res) => {
    Categories.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
}

// Update a categories
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const id = req.params.id;

    Categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Categories with id=${id}!`
                });
            } else res.send({ message: "Categories was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Categories with id=" + id
            });
        });
};
// Delete a categories
exports.delete = (req, res) => {
    const id = req.params.id;

    Categories.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Categories with id=${id}`
                });
            } else {
                res.send({
                    message: "Categories was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Categories with id=" + id
            });
        });
}

// Add a category
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content is empty!" })
        return;
    }

    const { title, description } = req.body;
    const category = new Categories({
        title: title,
        description: description
    })

    category
        .save(category)
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
