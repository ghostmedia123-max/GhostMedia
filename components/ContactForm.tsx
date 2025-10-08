'use client';

import { useState, FormEvent } from 'react';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Honeypot field
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState('');

  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // Parent now controls opacity, so we start visible within the parent
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // Basic client-side validation
    if (!name || !email || !message) {
      setStatus('error');
      setResponseMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          honeypot, // Send the honeypot field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server-side validation errors or other issues
        throw new Error(data.message || 'Something went wrong.');
      }

      // Success
      setStatus('success');
      setResponseMessage(data.message || 'Thank you for your message!');
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setHoneypot('');

    } catch (error: any) {
      setStatus('error');
      setResponseMessage(error.message || 'Failed to send message. Please try again later.');
    }
  };

  return (
    <motion.form // This will inherit variants from the parent in page.tsx
      variants={containerVariants}
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto"
    >
      {/* Honeypot field: visually hidden but accessible to screen readers, but should be empty */}
      <div className="absolute w-0 h-0 overflow-hidden">
        <label htmlFor="honeypot">Do not fill this out</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <motion.div
        variants={itemVariants}
        className="p-2 rounded-lg"
        layout
        animate={{ scale: focusedField === 'name' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-transparent border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white" onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="p-2 rounded-lg"
        layout
        animate={{ scale: focusedField === 'email' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-transparent border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white" onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="p-2 rounded-lg"
        layout
        animate={{ scale: focusedField === 'subject' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject (Optional)</label>
        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 block w-full bg-transparent border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white" onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="p-2 rounded-lg"
        layout
        animate={{ scale: focusedField === 'message' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="mt-1 block w-full bg-transparent border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white" onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}></textarea>
      </motion.div>

      <motion.div variants={itemVariants}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-transform hover:scale-105"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </motion.div>

      {status === 'success' && (
        <p className="text-green-400 text-center">{responseMessage}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-center">{responseMessage}</p>
      )}
    </motion.form>
  );
}; 

export default ContactForm
