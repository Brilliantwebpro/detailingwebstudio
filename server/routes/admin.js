const express = require('express');
const jwt = require('jsonwebtoken');
const storage = require('../config/storage');

const router = express.Router();

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
    
    // Check if admin
    const user = storage.users.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const leads = storage.leads.find();
    const users = storage.users.find();
    const messages = storage.chatMessages.find();
    
    // Lead stats
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const contacted = leads.filter(l => l.status === 'contacted').length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const won = leads.filter(l => l.status === 'won').length;
    const lost = leads.filter(l => l.status === 'lost').length;
    
    // This week's leads
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const thisWeek = leads.filter(l => new Date(l.createdAt) >= weekAgo).length;
    
    // Recent leads
    const recentLeads = leads
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
    
    res.json({
      stats: {
        totalLeads,
        newLeads,
        contacted,
        qualified,
        won,
        lost,
        thisWeek,
        totalUsers: users.length,
        totalMessages: messages.length
      },
      recentLeads,
      activity: {
        leadsThisWeek: thisWeek,
        avgResponseTime: '< 24 hours'
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', auth, async (req, res) => {
  try {
    const users = storage.users.find();
    
    // Remove passwords from response
    const safeUsers = users.map(u => ({
      id: u._id,
      email: u.email,
      name: u.name,
      role: u.role,
      isActive: u.isActive,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin
    }));
    
    res.json({ users: safeUsers });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create user (admin only)
router.post('/users', auth, async (req, res) => {
  try {
    const { email, password, name, role = 'user' } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }
    
    // Check if email exists
    const existing = storage.users.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const user = storage.users.insert({
      email,
      password, // In production, hash this!
      name,
      role,
      isActive: true
    });
    
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', auth, async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.params.id === req.user._id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    
    const success = storage.users.delete(req.params.id);
    
    if (!success) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password (own account)
router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    const user = storage.users.findById(req.user._id);
    if (!user || user.password !== currentPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    storage.users.update(req.user._id, { password: newPassword });
    
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset any user's password (admin only)
router.post('/users/:id/reset-password', auth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    const user = storage.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    storage.users.update(req.params.id, { password: newPassword });
    
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle user active status (admin only)
router.post('/users/:id/toggle-status', auth, async (req, res) => {
  try {
    const user = storage.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (req.params.id === req.user._id) {
      return res.status(400).json({ error: 'Cannot toggle your own status' });
    }
    
    storage.users.update(req.params.id, { isActive: !user.isActive });
    
    res.json({ success: true, message: `User ${user.isActive ? 'deactivated' : 'activated'}` });
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user role (admin only)
router.post('/users/:id/update-role', auth, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['admin', 'user', 'viewer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    
    const user = storage.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    storage.users.update(req.params.id, { role });
    
    res.json({ success: true, message: 'Role updated successfully' });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export leads as CSV
router.get('/export/leads', auth, async (req, res) => {
  try {
    const leads = storage.leads.find();
    
    // Create CSV
    const headers = ['ID', 'Name', 'Business', 'Email', 'Phone', 'Services', 'Goal', 'Budget', 'Status', 'Source', 'Created'];
    const rows = leads.map(l => [
      l._id,
      l.name || '',
      l.businessName || '',
      l.email || '',
      l.phone || '',
      l.services || '',
      l.goal || '',
      l.budget || '',
      l.status || 'new',
      l.source || '',
      l.createdAt || ''
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
