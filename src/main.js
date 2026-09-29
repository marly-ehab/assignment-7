require('dotenv').config();
const express = require('express');
const connectDB = require('./app/common/db/db');
const userRoutes = require('./app/user/user.route');
const noteRoutes = require('./app/note/note.route');

const app = express();
app.use(express.json());

connectDB();

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});