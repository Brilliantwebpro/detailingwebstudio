import React, { useState, useEffect, useRef } from 'react';

const CHATBOT_CONFIG = {
  businessName: 'Detailing Web Studio',
  tagline: 'Your AI Assistant',
  welcomeMessage: "Hi there. I'm your AI assistant for Detailing Web Studio. I can help with website inquiries, lead qualification, scheduling, and more. How can I assist you today?",
  theme: {
    primary: '#3ca8ff',
    secondary: '#7f8bff',
    background: '#0f1b30',
    surface: '#0a1525',
    text: '#eef4ff',
    muted: '#9cafcc'
  }
};

const FAQ_RESPONSES = {
  greeting: ["Hello! How can I help you today?", "Hi there! What can I help you with?", "Hey! I'm here to assist you. What would you like to know?"],

  services: [
    "We offer two pricing models to keep things affordable:\n\n" +
    "1) Setup + Monthly:\n" +
    "- Starter: $200 setup + $79/month\n" +
    "- Growth: $350 setup + $119/month\n\n" +
    "2) One-Time Fee:\n" +
    "- Single Page + Booking: $550\n" +
    "- WordPress Website: $950\n" +
    "- Custom Multi-Page Build: $1,500\n\n" +
    "Which interests you most?"
  ],

  pricing: [
    "Our pricing is structured in two simple models:\n\n" +
    "- Setup + Monthly: from $200 setup + $79/month\n" +
    "- One-Time Fee: from $550 to $1,500\n\n" +
    "Monthly plans include hosting, domain management, and maintenance support.\n\n" +
    "I'd be happy to discuss your specific requirements. Would you like to schedule a call?"
  ],

  timeline: [
    "Typical project timelines:\n\n" +
    "- Single Page + Booking: 5-7 days\n" +
    "- WordPress Website: 7-10 days\n" +
    "- Custom Multi-Page Build: 14-21 days\n\n" +
    "We work efficiently while maintaining high quality. Shall I tell you more about any specific package?"
  ],

  process: [
    "Here's our simple 4-step process:\n\n" +
    "1) **Discovery Call** - We learn about your business\n" +
    "2) **Strategy and Design** - Wireframes and designs\n" +
    "3) **Development** - Building your site\n" +
    "4) **Launch and Optimize** - Going live with support\n\n" +
    "Would you like to start the process?"
  ],

  seo: [
    "Our SEO approach includes:\n\n" +
    "- Technical SEO (indexing, metadata)\n" +
    "- Local SEO (Google Business, citations)\n" +
    "- Page structure optimization\n" +
    "- Core Web Vitals tuning\n\n" +
    "We optimize for long-term ranking stability. Want to learn more?"
  ],

  portfolio: [
    "We have several live projects you can view:\n\n" +
    "- Apex Mobile Detailing (mobile specialist)\n" +
    "- High Class Customs (luxury positioning)\n" +
    "- B-Lab Auto (coating expertise)\n" +
    "- PPF Pro (paint protection)\n\n" +
    "Would you like me to send you links to any of these?"
  ],

  contact: [
    "Great choice! You can reach us through:\n\n" +
    "- Email: Fill out our contact form\n" +
    "- WhatsApp: Click the button below\n" +
    "- Schedule: Book a call directly\n\n" +
    "Which method works best for you?"
  ],

  booking: [
    "To get started, I'll need some information:\n\n" +
    "1. Your name\n" +
    "2. Business name\n" +
    "3. Services you offer\n" +
    "4. Your goals\n\n" +
    "Shall I open the contact form for you?"
  ],

  default: [
    "That's a great question! Let me help you with that.\n\n" +
    "I can assist with:\n" +
    "- Service information and pricing\n" +
    "- Project timelines\n" +
    "- Our process\n" +
    "- Portfolio examples\n" +
    "- Scheduling a consultation\n\n" +
    "What would you like to know more about?"
  ]
};

const QUICK_ACTIONS = [
  { id: 'services', label: 'Services and Pricing', icon: 'S' },
  { id: 'portfolio', label: 'View Portfolio', icon: 'P' },
  { id: 'process', label: 'Our Process', icon: 'I' },
  { id: 'contact', label: 'Get in Touch', icon: 'C' }
];

const getResponse = (key) => {
  const responses = FAQ_RESPONSES[key] || FAQ_RESPONSES.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

const detectIntent = (message) => {
  const lower = message.toLowerCase();

  if (lower.match(/^(hi|hello|hey|hiya|howdy)/)) return 'greeting';
  if (lower.match(/service|offer|what.*do|specialty|provide/)) return 'services';
  if (lower.match(/price|cost|how much|pricing|budget|investment/)) return 'pricing';
  if (lower.match(/time|timeline|how long|when|duration/)) return 'timeline';
  if (lower.match(/process|how.*work|steps|procedure/)) return 'process';
  if (lower.match(/seo|search|google|ranking|optim/)) return 'seo';
  if (lower.match(/portfolio|work|sample|example|project|showcase/)) return 'portfolio';
  if (lower.match(/contact|reach|talk|connect|email|phone|call/)) return 'contact';
  if (lower.match(/book|schedule|start|begin|get started|appointment/)) return 'booking';

  return 'default';
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', business: '', message: '' });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 1,
          type: 'bot',
          content: CHATBOT_CONFIG.welcomeMessage,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const intent = detectIntent(input);
      const response = getResponse(intent);

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleQuickAction = (actionId) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: QUICK_ACTIONS.find((a) => a.id === actionId)?.label || actionId,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(actionId);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 600 + Math.random() * 500);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();

    const confirmationMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: `Thank you, ${leadForm.name}! We've received your inquiry for ${leadForm.business || 'your detailing business'}. Our team will reach out to ${leadForm.email} within 24-48 hours. Is there anything else I can help you with?`,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, confirmationMessage]);
    setShowLeadForm(false);
    setLeadForm({ name: '', email: '', business: '', message: '' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/message/RVXNY4AJ4YEPK1', '_blank');
  };

  if (!isOpen) {
    return (
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="chatbot-badge">AI</span>
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <div>
            <h4>{CHATBOT_CONFIG.businessName}</h4>
            <span>{CHATBOT_CONFIG.tagline}</span>
          </div>
        </div>
        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}

        {isTyping && (
          <div className="message message-bot">
            <div className="message-content typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!showLeadForm && messages.length > 2 && (
        <div className="chatbot-quick-actions">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              className="quick-action-btn"
              onClick={() => handleQuickAction(action.id)}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}

      {showLeadForm ? (
        <form className="chatbot-lead-form" onSubmit={handleLeadSubmit}>
          <input
            type="text"
            placeholder="Your Name *"
            value={leadForm.name}
            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address *"
            value={leadForm.email}
            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Business Name"
            value={leadForm.business}
            onChange={(e) => setLeadForm({ ...leadForm, business: e.target.value })}
          />
          <textarea
            placeholder="How can we help?"
            value={leadForm.message}
            onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
            rows={2}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowLeadForm(false)}
          >
            Back
          </button>
        </form>
      ) : (
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
          />
          <button className="chatbot-send" onClick={handleSend}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      )}

      <div className="chatbot-actions">
        <button className="chatbot-action-btn" onClick={() => setShowLeadForm(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <path d="M22 6l-10 7L2 6"/>
          </svg>
          Contact Us
        </button>
        <button className="chatbot-action-btn" onClick={openWhatsApp}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.644.075-.347.223-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>
    </div>
  );
}
