const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('Connected to MongoDB');
    
    // Check if admin already exists using email
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists with email: admin@gmail.com');
      console.log('You can login with:');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
      process.exit();
    }

    // Check if admin exists with old email
    const oldAdmin = await User.findOne({ email: 'admin@juicebar.com' });
    if (oldAdmin) {
      console.log('Old admin user found, updating credentials...');
      oldAdmin.email = 'admin@gmail.com';
      oldAdmin.username = 'admin';
      oldAdmin.password = await bcrypt.hash('admin123', 10);
      oldAdmin.role = 'admin';
      await oldAdmin.save();
      console.log('Admin user updated successfully!');
      console.log('You can login with:');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
      process.exit();
    }

    // Create admin user with the specified credentials
    const admin = await User.create({
      name: 'Admin',
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    console.log('You can login with:');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdmin();