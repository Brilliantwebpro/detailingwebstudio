const express = require('express');
const { body, validationResult } = require('express-validator');
const storage = require('../config/storage');
const { sendContactNotification } = require('../utils/email');

const router = express.Router();

// Public: Submit contact form
router.post('/', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, message, business_name } = req.body;

    // Store in leads collection
    const lead = storage.leads.insert({
      name,
      businessName: business_name || '',
      email,
      phone: phone || '',
      goal: message,
      source: 'contact-page',
      status: 'new',
      createdAt: new Date().toISOString()
    });

    // Send notification
    try {
      await sendContactNotification(lead);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: Get contact page config (business info)
router.get('/config', async (req, res) => {
  try {
    res.json({
      business: {
        name: 'Detailing Web Studio',
        email: 'hello@detailingwebstudio.com',
        phone: '+1 (555) 123-4567',
        address: '123 Web Dev Street, Digital City, DC 12345',
        hours: 'Mon-Fri: 9AM - 6PM'
      },
      social: {
        instagram: '@detailingwebstudio',
        facebook: 'detailingwebstudio',
        linkedin: 'detailing-web-studio'
      }
    });
  } catch (error) {
    console.error('Get config error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
