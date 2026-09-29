const userRepository = require('./user.repository');

async function signup({ name, email, password, phone, age }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return { status: 400, body: { message: 'Email already exists.' } };
    }

    await userRepository.create({ name, email, password, phone, age });
    return { status: 201, body: { message: 'User added successfully.' } };
}

async function login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        return { status: 401, body: { message: 'Invalid email or password' } };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return { status: 401, body: { message: 'Invalid email or password' } };
    }

    return {
        status: 200,
        body: { message: 'Login successful', userId: user._id },
    };
}

async function updateUser(userId, updateData) {
    // Password can never be updated through this endpoint.
    delete updateData.password;

    const user = await userRepository.findById(userId);
    if (!user) {
        return { status: 404, body: { message: 'User not found' } };
    }

    if (updateData.email && updateData.email !== user.email) {
        const emailOwner = await userRepository.findByEmail(updateData.email);
        if (emailOwner) {
            return { status: 400, body: { message: 'Email already exists.' } };
        }
    }

    await userRepository.updateById(userId, updateData);
    return { status: 200, body: { message: 'User updated' } };
}

async function deleteUser(userId) {
    const deleted = await userRepository.deleteById(userId);
    if (!deleted) {
        return { status: 404, body: { message: 'User not found' } };
    }
    return { status: 200, body: { message: 'User deleted' } };
}

async function getUserById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
        return { status: 404, body: { message: 'User not found' } };
    }
    return { status: 200, body: user };
}

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getUserById,
};