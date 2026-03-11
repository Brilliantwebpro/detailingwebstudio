const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const storage = require('../config/storage');
const { sendLeadNotification, sendConfirmationEmail } = require('../utils/email');

const router = express.Router();

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Public: Submit demo request
router.post('/demo', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('business_name').optional({ values: 'falsy' }).trim(),
  body('services_offered').trim().notEmpty().withMessage('Services offered is required'),
  body('goal').trim().notEmpty().withMessage('Primary goal is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const details = errors.array();
      return res.status(400).json({
        error: details[0]?.msg || 'Validation failed',
        errors: details
      });
    }

    const {
      name,
      business_name,
      website,
      monthly_revenue,
      services_offered,
      preferred_package,
      goal,
      budget,
      phone,
      email,
      schedule_call
    } = req.body;

    const lead = storage.leads.insert({
      name,
      businessName: business_name || '',
      email,
      phone: phone || '',
      website: website || '',
      services: services_offered || '',
      preferredPackage: preferred_package || '',
      goal: goal || '',
      budget: budget || '',
      revenue: monthly_revenue || '',
      source: 'demo-request',
      status: 'new',
      scheduleCall: schedule_call === 'yes',
      notes: []
    });

    // Send notifications
    try {
      await sendLeadNotification(lead);
      await sendConfirmationEmail(lead);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Demo request submitted successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Demo request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: Submit contact form
router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const details = errors.array();
      return res.status(400).json({
        error: details[0]?.msg || 'Validation failed',
        errors: details
      });
    }

    const { name, email, phone, message, business_name } = req.body;

    const lead = storage.leads.insert({
      name,
      businessName: business_name || '',
      email,
      phone: phone || '',
      goal: message,
      source: 'contact-form',
      status: 'new'
    });

    try {
      await sendLeadNotification(lead);
      await sendConfirmationEmail(lead);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Get all leads
router.get('/', auth, async (req, res) => {
  try {
    const { status, source, page = 1, limit = 20 } = req.query;
    
    let leads = storage.leads.find();
    
    if (status) {
      leads = leads.filter(l => l.status === status);
    }
    if (source) {
      leads = leads.filter(l => l.source === source);
    }

    // Sort by createdAt descending
    leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedLeads = leads.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      leads: paginatedLeads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: leads.length,
        pages: Math.ceil(leads.length / limit)
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Get single lead
router.get('/:id', auth, async (req, res) => {
  try {
    const lead = storage.leads.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Update lead status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const lead = storage.leads.update(req.params.id, { status });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Add note to lead
router.post('/:id/notes', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const lead = storage.leads.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const note = {
      text,
      addedBy: req.userId,
      createdAt: new Date().toISOString()
    };

    const notes = lead.notes || [];
    notes.push(note);

    const updatedLead = storage.leads.update(req.params.id, { notes });

    res.json(updatedLead);
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Delete lead
router.delete('/:id', auth, async (req, res) => {
  try {
    const success = storage.leads.delete(req.params.id);
    
    if (!success) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Get lead statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const leads = storage.leads.find();
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const contacted = leads.filter(l => l.status === 'contacted').length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const won = leads.filter(l => l.status === 'won').length;
    const lost = leads.filter(l => l.status === 'lost').length;

    // This month's leads
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const thisMonth = leads.filter(l => new Date(l.createdAt) >= startOfMonth).length;

    res.json({
      total,
      new: newLeads,
      contacted,
      qualified,
      won,
      lost,
      thisMonth
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
