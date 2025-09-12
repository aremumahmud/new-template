// Vercel serverless function for sending emails via Brevo SMTP
import nodemailer from 'nodemailer';

const BREVO_SMTP_HOST = 'smtp-relay.brevo.com';
const BREVO_SMTP_PORT = 587;
const BREVO_SMTP_USER = process.env.VITE_BREVO_SMTP_USER;
const BREVO_SMTP_PASS = process.env.VITE_BREVO_SMTP_PASS;

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check if SMTP credentials are configured
    if (!BREVO_SMTP_USER || !BREVO_SMTP_PASS) {
        return res.status(500).json({ 
            error: 'SMTP credentials not configured',
            message: 'Please set VITE_BREVO_SMTP_USER and VITE_BREVO_SMTP_PASS environment variables'
        });
    }

    try {
        const { sender, to, subject, htmlContent, textContent, replyTo } = req.body;

        // Validate required fields
        if (!sender || !to || !subject || (!htmlContent && !textContent)) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['sender', 'to', 'subject', 'htmlContent or textContent']
            });
        }

        // Create SMTP transporter
        const transporter = nodemailer.createTransporter({
            host: BREVO_SMTP_HOST,
            port: BREVO_SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: BREVO_SMTP_USER,
                pass: BREVO_SMTP_PASS
            }
        });

        // Prepare email options
        const mailOptions = {
            from: `${sender.name} <${sender.email}>`,
            to: Array.isArray(to) ? to.map(recipient => `${recipient.name} <${recipient.email}>`).join(', ') : `${to.name} <${to.email}>`,
            subject: subject,
            html: htmlContent,
            text: textContent,
            replyTo: replyTo ? `${replyTo.name} <${replyTo.email}>` : undefined
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.messageId);

        return res.status(200).json({
            success: true,
            messageId: info.messageId,
            message: 'Email sent successfully via SMTP'
        });

    } catch (error) {
        console.error('SMTP Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to send email via SMTP'
        });
    }
}
