const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.error('❌ DB Error:', err.message));
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categories'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
