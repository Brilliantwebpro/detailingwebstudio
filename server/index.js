const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const storage = require('./config/storage');
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');
const contactRoutes = require('./routes/contact');
const chatbotRoutes = require('./routes/chatbot');
const adminRoutes = require('./routes/admin');

const app = express();

const normalizeEmail = (value = '') => String(value).toLowerCase().trim();

const ensureEnvAdminUser = () => {
  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn('Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing in .env');
    return;
  }

  const users = storage.users.find();
  const existing = users.find((u) => normalizeEmail(u.email) === adminEmail);

  if (!existing) {
    storage.users.insert({
      email: adminEmail,
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true
    });
    console.log(`Admin user created from .env: ${adminEmail}`);
    return;
  }

  storage.users.update(existing._id, {
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
    isActive: true
  });
  console.log(`Admin user synced from .env: ${adminEmail}`);
};

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const emailConfigured =
    !!process.env.SMTP_HOST &&
    !!process.env.SMTP_USER &&
    !!process.env.SMTP_PASS &&
    !String(process.env.SMTP_USER).includes('your-') &&
    !String(process.env.SMTP_PASS).includes('your-');

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    storage: 'json-file',
    emailConfigured,
    message: 'Backend running with JSON file storage'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

ensureEnvAdminUser();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Using JSON file storage (no MongoDB required)');
});

module.exports = app;