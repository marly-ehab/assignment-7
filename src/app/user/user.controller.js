const userService = require('./user.service');

async function signup(req, res) {
    try {
        const { name, email, password, phone, age } = req.body;
        const result = await userService.signup({ name, email, password, phone, age });
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await userService.login({ email, password });
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// The logged-in user's id is read from the query string, e.g. /users?userId=...
async function updateUser(req, res) {
    try {
        const { userId } = req.query;
        const result = await userService.updateUser(userId, req.body);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { userId } = req.query;
        const result = await userService.deleteUser(userId);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getUser(req, res) {
    try {
        const { userId } = req.query;
        const result = await userService.getUserById(userId);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getUser,
};