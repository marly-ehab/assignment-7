const User = require('./user.model');

async function findByEmail(email) {
    return User.findOne({ email });
}

async function findById(id) {
    return User.findById(id);
}

async function create(userData) {
    const user = new User(userData);
    return user.save();
}

async function updateById(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
}

async function deleteById(id) {
    return User.findByIdAndDelete(id);
}

module.exports = {
    findByEmail,
    findById,
    create,
    updateById,
    deleteById,
};