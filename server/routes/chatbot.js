const express = require('express');
const storage = require('../config/storage');

const router = express.Router();

// Simple AI response logic (can be enhanced with OpenAI API)
const generateAIResponse = (message, userInfo = {}) => {
  const lowerMessage = message.toLowerCase();
  
  // Greeting patterns
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(lowerMessage)) {
    const responses = [
      "Hello! Welcome to Detailing Web Studio. How can I help you today?",
      "Hi there! I'd be happy to tell you about our premium detailing website services.",
      "Hey! Great to have you here. What brings you to Detailing Web Studio today?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Pricing / Cost questions
  if (/(price|cost|how much|pricing|budget|fee|charge)/.test(lowerMessage)) {
    return "We offer three main packages: Template Build (from $1k+), Custom Build (from $2.5k+), and Full Growth Package (from $5k+). Each is tailored to different business stages. Would you like me to schedule a call to discuss which option fits your needs?";
  }
  
  // Service questions
  if (/(service|what do you|offer|do you provide|build|create|make)/.test(lowerMessage)) {
    return "We specialize in premium websites for auto detailing businesses. Our services include custom website development, advanced SEO, AI chat agents, and WhatsApp integration. We focus exclusively on premium detailing brands looking to attract high-value clients.";
  }
  
  // Timeline / How long questions
  if (/(how long|timeline|turnaround|when|how soon|days|weeks|months)/.test(lowerMessage)) {
    return "Our typical timeline ranges from 2-4 weeks depending on the package. Template builds are faster (1-2 weeks), while custom builds and full growth packages typically take 3-6 weeks. We prioritize quality and performance in every build.";
  }
  
  // Portfolio / Previous work
  if (/(portfolio|work|demo|example|show|projects|case study)/.test(lowerMessage)) {
    return "We'd love to show you our work! You can view live examples at our Demos page. We've built sites for Apex Mobile Detailing, High Class Customs, B-Lab Auto, and PPF Pro. Each showcases different specializations in the detailing industry.";
  }
  
  // Contact / Talk to someone
  if (/(contact|talk|speak|.call|reach|email|phone)/.test(lowerMessage)) {
    return "Absolutely! You can request a demo by filling out our contact form. We'll get back to you within 24-48 hours with a personalized proposal. Would you like me to provide the link?";
  }
  
  // Lead capture
  if (/(interested|yes|let|schedule|book|appointment|consultation)/.test(lowerMessage)) {
    return "That's great to hear! To get started, I'll need a few details. Could you share your name, business name, and email? Or I can provide a link to our demo request form.";
  }
  
  // Goodbye
  if (/(bye|goodbye|see you|thanks|thank you|that helps)/.test(lowerMessage)) {
    const responses = [
      "Thank you for chatting with us! Feel free to reach out anytime if you have more questions.",
      "You're welcome! We hope to hear from you soon. Have a great day!",
      "Thanks for your interest in Detailing Web Studio. Talk to you soon!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Default responses
  const defaults = [
    "That's a great question! I'd recommend speaking directly with our team for detailed information. Would you like to request a demo?",
    "I see you're interested in learning more. Our team can provide personalized guidance based on your specific needs. Want to schedule a consultation?",
    "Thanks for your interest! For detailed information about our services, I'd be happy to connect you with our team. Shall we set up a call?"
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
};

// Quick actions
const quickActions = {
  'get-pricing': "Our packages start at $1k for templates, $2.5k+ for custom builds, and $5k+ for full growth packages. Each includes different levels of customization and features.",
  'view-portfolio': "You can view our portfolio at /demos - we've built sites for Apex Mobile Detailing, High Class Customs, B-Lab Auto, and more!",
  'schedule-call': "To schedule a call, please fill out our demo request form at /contact. We'll get back to you within 24-48 hours!",
  'learn-more': "We specialize in premium websites for auto detailing businesses. Our focus is on conversion-focused design, advanced SEO, and automation systems. Would you like to know more?"
};

// Send message
router.post('/message', async (req, res) => {
  try {
    const { sessionId, message, userInfo = {} } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Save user message
    const userMessage = storage.chatMessages.insert({
      sessionId,
      role: 'user',
      content: message,
      userInfo,
      timestamp: new Date().toISOString()
    });

    // Generate AI response
    const aiResponse = generateAIResponse(message, userInfo);

    // Save AI response
    const aiMessage = storage.chatMessages.insert({
      sessionId,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      userMessage,
      response: {
        id: aiMessage._id,
        content: aiResponse,
        timestamp: aiMessage.timestamp
      },
      suggestions: ['Tell me about pricing', 'Show me your work', 'How long does it take?']
    });
  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Quick action
router.post('/quick-action', async (req, res) => {
  try {
    const { action, sessionId } = req.body;
    
    const response = quickActions[action] || "I'm not sure about that. Would you like to speak with our team directly?";
    
    // Save quick action response
    storage.chatMessages.insert({
      sessionId,
      role: 'assistant',
      content: response,
      quickAction: action,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      content: response
    });
  } catch (error) {
    console.error('Quick action error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Capture lead from chatbot
router.post('/capture-lead', async (req, res) => {
  try {
    const { sessionId, name, email, phone, message } = req.body;
    
    // Create lead from chatbot conversation
    const lead = storage.leads.insert({
      name: name || 'Chat Lead',
      email,
      phone: phone || '',
      goal: message || 'Lead captured from chatbot',
      source: 'chatbot',
      status: 'new',
      sessionId,
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Capture lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get chat history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = storage.chatMessages.find({ sessionId });
    
    res.json({ messages });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
