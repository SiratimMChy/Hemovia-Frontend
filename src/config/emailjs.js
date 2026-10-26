// Email settings for sending contact form messages
// Uses environment variables to keep secret keys safe

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'
};

// Check if email keys are set up
export const isEmailJSConfigured = () => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
  return (
    SERVICE_ID && SERVICE_ID !== 'your_service_id' &&
    TEMPLATE_ID && TEMPLATE_ID !== 'your_template_id' &&
    PUBLIC_KEY && PUBLIC_KEY !== 'your_public_key'
  );
};

// Check if email is ready to send messages
export const getConfigStatus = () => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
  return {
    serviceId: SERVICE_ID !== 'your_service_id' ? '✅ Configured' : '❌ Not configured',
    templateId: TEMPLATE_ID !== 'your_template_id' ? '✅ Configured' : '❌ Not configured',
    publicKey: PUBLIC_KEY !== 'your_public_key' ? '✅ Configured' : '❌ Not configured',
    isReady: isEmailJSConfigured()
  };
};

// Variables available in the email template:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{message}} - Message content
// {{to_name}} - Recipient name (Hemovia Support Team)
// {{reply_to}} - Reply-to email address

// Example email message format:
/*
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from the Hemovia Blood Donation website.
Reply directly to this email to respond to {{from_name}}.
*/