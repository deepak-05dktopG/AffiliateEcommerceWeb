const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  }
};

// const connectAdminDB = async () => {
//   try {
//     const conn = await mongoose.createConnection(process.env.ADMIN_MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`Admin DB Connected: ${conn.name}`);
//     return conn;
//   } catch (error) {
//     console.error('❌ Error connecting to admin DB:', error.message);
//   }
// };


// const connectDB =  mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.error('❌ DB Error:', err.message));

module.exports = connectDB;
// module.exports = connectAdminDB;
