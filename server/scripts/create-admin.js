const storage = require('../config/storage');

// Create admin user
const adminUser = storage.users.insert({
  email: 'admin@detailingwebstudio.com',
  password: 'admin123', // Change this!
  name: 'Admin User',
  role: 'admin',
  isActive: true,
  createdAt: new Date().toISOString()
});

console.log('Admin user created successfully!');
console.log('Email: admin@detailingwebstudio.com');
console.log('Password: admin123');
console.log('\n⚠️  IMPORTANT: Change the password after first login!');
