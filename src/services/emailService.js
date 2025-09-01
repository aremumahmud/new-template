// Email service using Brevo API (formerly Sendinblue)
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

class EmailService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.headers = {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json'
        };
    }

    async sendEmail(emailData) {
        try {
            const response = await fetch(BREVO_API_URL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(emailData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send email: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const result = await response.json();
            console.log('Email sent successfully:', result);
            return { success: true, data: result };
        } catch (error) {
            console.error('Email sending error:', error);
            return { success: false, error: error.message };
        }
    }

    // Contact form email
    async sendContactFormEmail(formData) {
        const emailData = {
            sender: {
                name: "Journey of Care Website",
                email: "no-reply@journey-of-care.com"
            },
            to: [
                {
                    email: "Info@journey-of-care.com",
                    name: "Journey of Care Team"
                }
            ],
            replyTo: {
                email: formData.email,
                name: formData.name
            },
            subject: `New Contact Form Submission - ${formData.urgency ? formData.urgency.toUpperCase() : 'GENERAL'}`,
            htmlContent: this.generateContactFormHTML(formData),
            textContent: this.generateContactFormText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Contact form user confirmation email
    async sendContactConfirmationEmail(formData) {
        const emailData = {
            sender: {
                name: "Journey of Care",
                email: "no-reply@journey-of-care.com"
            },
            to: [
                {
                    email: formData.email,
                    name: formData.name
                }
            ],
            subject: "Thank You for Contacting Journey of Care",
            htmlContent: this.generateContactConfirmationHTML(formData),
            textContent: this.generateContactConfirmationText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Consultation/Scheduling form email
    async sendConsultationFormEmail(formData) {
        const emailData = {
            sender: {
                name: "Journey of Care Website",
                email: "no-reply@journey-of-care.com"
            },
            to: [
                {
                    email: "Info@journey-of-care.com",
                    name: "Journey of Care Team"
                }
            ],
            replyTo: {
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`
            },
            subject: `New Consultation Request - ${formData.urgency ? formData.urgency.toUpperCase() : 'SCHEDULED'}`,
            htmlContent: this.generateConsultationFormHTML(formData),
            textContent: this.generateConsultationFormText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Consultation form user confirmation email
    async sendConsultationConfirmationEmail(formData) {
        const emailData = {
            sender: {
                name: "Journey of Care",
                email: "no-reply@journey-of-care.com"
            },
            to: [
                {
                    email: formData.email,
                    name: `${formData.firstName} ${formData.lastName}`
                }
            ],
            subject: "Consultation Request Received - Journey of Care",
            htmlContent: this.generateConsultationConfirmationHTML(formData),
            textContent: this.generateConsultationConfirmationText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Referral form email
    async sendReferralFormEmail(formData) {
        const emailData = {
            sender: {
                name: "Journey of Care Website",
                email: "no-reply@journey-of-care.com"
            },
            to: [
                {
                    email: "referrals@journey-of-care.com",
                    name: "Journey of Care Referral Team"
                }
            ],
            replyTo: {
                email: formData.referrerEmail,
                name: formData.referrerName
            },
            subject: `New Referral Submission - ${formData.urgency ? formData.urgency.toUpperCase() : 'PENDING'}`,
            htmlContent: this.generateReferralFormHTML(formData),
            textContent: this.generateReferralFormText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // Referral form user confirmation email
    async sendReferralConfirmationEmail(formData) {
        const emailData = {
            sender: {
                name: "Journey of Care",
                email: "no-reply@journey-of-care.com"
            },
            to: [
                {
                    email: formData.referrerEmail,
                    name: formData.referrerName
                }
            ],
            subject: "Thank You for Your Referral - Journey of Care",
            htmlContent: this.generateReferralConfirmationHTML(formData),
            textContent: this.generateReferralConfirmationText(formData)
        };

        return await this.sendEmail(emailData);
    }

    // HTML template generators
    generateContactFormHTML(formData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .urgency-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }
        .urgent { background-color: #dc3545; color: white; }
        .soon { background-color: #fd7e14; color: white; }
        .planning { background-color: #28a745; color: white; }
        .immediate { background-color: #dc3545; color: white; animation: pulse 2s infinite; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1a1a1a; }
        .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; border-left: 4px solid #1a1a1a; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background-color: #1a1a1a; color: white; border-radius: 8px; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏥 New Contact Form Submission</h1>
        <p>Journey of Care - Contact Request</p>
    </div>
    
    <div class="content">
        <div class="urgency-badge ${formData.urgency || 'planning'}">
            ⏰ ${this.formatUrgency(formData.urgency)}
        </div>
        
        <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${formData.name || 'Not provided'}</div>
        </div>
        
        <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${formData.email}">${formData.email || 'Not provided'}</a></div>
        </div>
        
        <div class="field">
            <div class="label">📞 Phone:</div>
            <div class="value"><a href="tel:${formData.phone}">${formData.phone || 'Not provided'}</a></div>
        </div>
        
        <div class="field">
            <div class="label">🏥 Service Interested:</div>
            <div class="value">${this.formatService(formData.service) || 'Not specified'}</div>
        </div>
        
        <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value">${(formData.message || 'No message provided').replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="field">
            <div class="label">📅 Submitted:</div>
            <div class="value">${new Date().toLocaleString()}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Journey of Care | <a href="tel:8324460705" style="color: white;">(832) 446-0705</a> | Info@journey-of-care.com</p>
        <p><em>Please respond within 24 hours for urgent requests</em></p>
    </div>
</body>
</html>`;
    }

    generateConsultationFormHTML(formData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 30px; padding: 20px; background-color: white; border-radius: 8px; border-left: 4px solid #1a1a1a; }
        .section-title { color: #1a1a1a; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #e9ecef; padding-bottom: 5px; }
        .urgency-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }
        .urgent { background-color: #dc3545; color: white; }
        .soon { background-color: #fd7e14; color: white; }
        .planning { background-color: #28a745; color: white; }
        .immediate { background-color: #dc3545; color: white; animation: pulse 2s infinite; }
        .field { margin-bottom: 12px; display: flex; flex-wrap: wrap; }
        .label { font-weight: bold; color: #1a1a1a; min-width: 150px; }
        .value { flex: 1; min-width: 200px; }
        .services-list { list-style: none; padding: 0; }
        .services-list li { background-color: #e9ecef; margin: 5px 0; padding: 8px 12px; border-radius: 4px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background-color: #1a1a1a; color: white; border-radius: 8px; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>📅 New Consultation Request</h1>
        <p>Journey of Care - Care Consultation</p>
    </div>
    
    <div class="content">
        <div class="urgency-badge ${formData.urgency || 'planning'}">
            ⏰ ${this.formatUrgency(formData.urgency)}
        </div>
        
        <div class="section">
            <div class="section-title">👤 Contact Information</div>
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.firstName || ''} ${formData.lastName || ''}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${formData.email}">${formData.email || 'Not provided'}</a></div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${formData.phone}">${formData.phone || 'Not provided'}</a></div>
            </div>
            <div class="field">
                <div class="label">Relationship:</div>
                <div class="value">${this.formatRelationship(formData.relationship) || 'Not specified'}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">🏥 Care Recipient Information</div>
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.recipientName || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Age:</div>
                <div class="value">${formData.recipientAge || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Gender:</div>
                <div class="value">${formData.recipientGender || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Medical Conditions:</div>
                <div class="value">${(formData.recipientConditions || 'None specified').replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">🛡️ Service Requirements</div>
            <div class="field">
                <div class="label">Services Needed:</div>
                <div class="value">
                    ${formData.services && formData.services.length > 0 
                        ? `<ul class="services-list">${formData.services.map(service => `<li>${this.formatService(service)}</li>`).join('')}</ul>`
                        : 'No specific services selected'
                    }
                </div>
            </div>
            <div class="field">
                <div class="label">Care Level:</div>
                <div class="value">${this.formatCareLevel(formData.careLevel) || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Frequency:</div>
                <div class="value">${this.formatFrequency(formData.frequency) || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Duration:</div>
                <div class="value">${this.formatDuration(formData.duration) || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Start Date:</div>
                <div class="value">${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Preferred Time:</div>
                <div class="value">${this.formatPreferredTime(formData.preferredTime) || 'Not specified'}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">📍 Location & Additional Info</div>
            <div class="field">
                <div class="label">Address:</div>
                <div class="value">${formData.address || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">City:</div>
                <div class="value">${formData.city || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Zip Code:</div>
                <div class="value">${formData.zipCode || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Special Requests:</div>
                <div class="value">${(formData.specialRequests || 'None').replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
                <div class="label">Additional Information:</div>
                <div class="value">${(formData.additionalInfo || 'None provided').replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">📅 Submission Details</div>
            <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Journey of Care | <a href="tel:8324460705" style="color: white;">(832) 446-0705</a> | Info@journey-of-care.com</p>
        <p><em>Please schedule consultation within 24-48 hours</em></p>
    </div>
</body>
</html>`;
    }

    generateReferralFormHTML(formData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Referral Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 30px; padding: 20px; background-color: white; border-radius: 8px; border-left: 4px solid #1a1a1a; }
        .section-title { color: #1a1a1a; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #e9ecef; padding-bottom: 5px; }
        .urgency-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }
        .urgent { background-color: #dc3545; color: white; }
        .soon { background-color: #fd7e14; color: white; }
        .planning { background-color: #28a745; color: white; }
        .immediate { background-color: #dc3545; color: white; animation: pulse 2s infinite; }
        .field { margin-bottom: 12px; display: flex; flex-wrap: wrap; }
        .label { font-weight: bold; color: #1a1a1a; min-width: 150px; }
        .value { flex: 1; min-width: 200px; }
        .referral-highlight { background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 20px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background-color: #1a1a1a; color: white; border-radius: 8px; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤝 New Referral Submission</h1>
        <p>Journey of Care - Client Referral</p>
    </div>
    
    <div class="content">
        <div class="urgency-badge ${formData.urgency || 'planning'}">
            ⏰ ${this.formatUrgency(formData.urgency)}
        </div>
        
        <div class="referral-highlight">
            <strong>🎯 Referral Summary:</strong> ${formData.referrerName || 'Anonymous'} has referred ${formData.clientName || 'a potential client'} for care services.
        </div>
        
        <div class="section">
            <div class="section-title">👤 Referrer Information</div>
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.referrerName || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${formData.referrerEmail}">${formData.referrerEmail || 'Not provided'}</a></div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${formData.referrerPhone}">${formData.referrerPhone || 'Not provided'}</a></div>
            </div>
            <div class="field">
                <div class="label">Relationship to Client:</div>
                <div class="value">${this.formatRelationship(formData.referrerRelation) || 'Not specified'}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">🏥 Client Information</div>
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.clientName || 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${formData.clientPhone}">${formData.clientPhone || 'Not provided'}</a></div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.clientEmail ? `<a href="mailto:${formData.clientEmail}">${formData.clientEmail}</a>` : 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Address:</div>
                <div class="value">${formData.clientAddress || 'Not provided'}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">🛡️ Care Requirements</div>
            <div class="field">
                <div class="label">Care Needs:</div>
                <div class="value">${this.formatService(formData.careNeeds) || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Timeline:</div>
                <div class="value">${this.formatUrgency(formData.urgency) || 'Not specified'}</div>
            </div>
            <div class="field">
                <div class="label">Additional Information:</div>
                <div class="value">${(formData.additionalInfo || 'None provided').replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">📅 Submission Details</div>
            <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
            </div>
            <div class="field">
                <div class="label">Terms Agreed:</div>
                <div class="value">${formData.agreeToTerms ? '✅ Yes' : '❌ No'}</div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Journey of Care | <a href="tel:8324460705" style="color: white;">(832) 446-0705</a> | referrals@journey-of-care.com</p>
        <p><em>Please contact the referred client within 24 hours</em></p>
    </div>
</body>
</html>`;
    }

    // User confirmation HTML template generators
    generateContactConfirmationHTML(formData) {
        return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Contacting Journey of Care</title>
    <style type="text/css">
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a1a1a; padding: 40px 30px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 10px 0; font-weight: bold; }
        .header p { color: #cccccc; font-size: 16px; margin: 0; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .thank-you-section { text-align: center; margin-bottom: 30px; }
        .thank-you-icon { font-size: 48px; margin-bottom: 20px; }
        .thank-you-title { color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0 0 15px 0; }
        .thank-you-text { color: #666666; font-size: 16px; line-height: 24px; margin: 0; }
        .info-box { background-color: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 20px; margin: 30px 0; }
        .next-steps { background-color: #e3f2fd; border-radius: 8px; padding: 25px; margin: 30px 0; }
        .contact-section { background-color: #f8f9fa; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0; }
        .footer { background-color: #1a1a1a; padding: 30px; text-align: center; }
        .footer p { color: #cccccc; font-size: 14px; margin: 5px 0; }
        .footer a { color: #ffffff; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr><td>
            <div class="email-container">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="header">
                        <h1>Thank You for Reaching Out!</h1>
                        <p>Journey of Care - We've Received Your Message</p>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="content">
                        <div class="thank-you-section">
                            <div class="thank-you-icon">💙</div>
                            <h2 class="thank-you-title">We're Here to Help</h2>
                            <p class="thank-you-text">Thank you for contacting Journey of Care. Your message is important to us, and we're committed to providing you with the compassionate care and support you need.</p>
                        </div>
                        <div class="info-box">
                            <h3>📋 Your Message Details</h3>
                            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Priority Level:</strong> ${this.formatUrgency(formData.urgency)}</p>
                            <p><strong>Service Interest:</strong> ${this.formatService(formData.service) || 'General Inquiry'}</p>
                        </div>
                        <div class="next-steps">
                            <h3>🎯 What Happens Next?</h3>
                            <ol>
                                <li><strong>Review:</strong> Our team will carefully review your message and needs</li>
                                <li><strong>Response:</strong> We'll contact you within 24 hours (sooner for urgent requests)</li>
                                <li><strong>Consultation:</strong> We'll schedule a free consultation to discuss your specific needs</li>
                                <li><strong>Care Plan:</strong> Together, we'll create a personalized care plan that's right for you</li>
                            </ol>
                        </div>
                        <div class="contact-section">
                            <h3>Need Immediate Assistance?</h3>
                            <p><a href="tel:8324460705">(832) 446-0705</a><br/>Available 24/7 for emergencies</p>
                            <p><a href="mailto:Info@journey-of-care.com">Info@journey-of-care.com</a><br/>We respond to emails within 24 hours</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>Journey of Care</strong></p>
                        <p>Compassionate Home Care Services</p>
                        <p><a href="tel:8324460705">(832) 446-0705</a> | <a href="mailto:Info@journey-of-care.com">Info@journey-of-care.com</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
    }

    generateConsultationConfirmationHTML(formData) {
        return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consultation Request Received - Journey of Care</title>
    <style type="text/css">
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a1a1a; padding: 40px 30px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 10px 0; font-weight: bold; }
        .header p { color: #cccccc; font-size: 16px; margin: 0; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .thank-you-section { text-align: center; margin-bottom: 30px; }
        .thank-you-icon { font-size: 48px; margin-bottom: 20px; }
        .thank-you-title { color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0 0 15px 0; }
        .thank-you-text { color: #666666; font-size: 16px; line-height: 24px; margin: 0; }
        .consultation-summary { background-color: #e8f5e8; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0; }
        .timeline-box { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 25px; margin: 30px 0; }
        .contact-section { background-color: #e3f2fd; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0; }
        .footer { background-color: #1a1a1a; padding: 30px; text-align: center; }
        .footer p { color: #cccccc; font-size: 14px; margin: 5px 0; }
        .footer a { color: #ffffff; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr><td>
            <div class="email-container">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="header">
                        <h1>Consultation Request Received</h1>
                        <p>Journey of Care - Your Care Journey Begins</p>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="content">
                        <div class="thank-you-section">
                            <div class="thank-you-icon">🏥</div>
                            <h2 class="thank-you-title">Thank You for Trusting Us</h2>
                            <p class="thank-you-text">We've received your consultation request and are honored that you're considering Journey of Care for your loved one's needs.</p>
                        </div>
                        <div class="consultation-summary">
                            <h3>📋 Your Consultation Request</h3>
                            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Timeline:</strong> ${this.formatUrgency(formData.urgency)}</p>
                            <p><strong>Care Recipient:</strong> ${formData.recipientName || 'Not specified'}</p>
                            <p><strong>Preferred Start Date:</strong> ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}</p>
                        </div>
                        <div class="timeline-box">
                            <h3>⏰ What to Expect Next</h3>
                            <ol>
                                <li><strong>Within 4 hours:</strong> Our Care Coordinator will call you to schedule your consultation</li>
                                <li><strong>Within 24-48 hours:</strong> Free in-home consultation with our licensed team</li>
                                <li><strong>Same day:</strong> Receive your personalized care plan and pricing</li>
                                <li><strong>Care start:</strong> Begin services as soon as the next business day if needed</li>
                            </ol>
                        </div>
                        <div class="contact-section">
                            <h3>Questions Before Your Consultation?</h3>
                            <p><a href="tel:8324460705">(832) 446-0705</a><br/>Available 24/7 for urgent needs</p>
                            <p><a href="mailto:Info@journey-of-care.com">Info@journey-of-care.com</a><br/>Our Care Coordinators are standing by</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>Journey of Care</strong></p>
                        <p>Licensed • Insured • Trusted</p>
                        <p><a href="tel:8324460705">(832) 446-0705</a> | <a href="mailto:Info@journey-of-care.com">Info@journey-of-care.com</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
    }

    generateReferralConfirmationHTML(formData) {
        return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Your Referral - Journey of Care</title>
    <style type="text/css">
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a1a1a; padding: 40px 30px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 10px 0; font-weight: bold; }
        .header p { color: #cccccc; font-size: 16px; margin: 0; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .thank-you-section { text-align: center; margin-bottom: 30px; }
        .thank-you-icon { font-size: 48px; margin-bottom: 20px; }
        .thank-you-title { color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0 0 15px 0; }
        .thank-you-text { color: #666666; font-size: 16px; line-height: 24px; margin: 0; }
        .referral-highlight { background: linear-gradient(135deg, #fff3cd, #ffeaa7); border-left: 4px solid #ffc107; padding: 25px; margin: 30px 0; text-align: center; }
        .next-steps { background-color: #e3f2fd; border-radius: 8px; padding: 25px; margin: 30px 0; }
        .appreciation-section { background-color: #d4edda; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0; text-align: center; }
        .contact-section { background-color: #f8f9fa; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0; }
        .footer { background-color: #1a1a1a; padding: 30px; text-align: center; }
        .footer p { color: #cccccc; font-size: 14px; margin: 5px 0; }
        .footer a { color: #ffffff; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr><td>
            <div class="email-container">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="header">
                        <h1>Thank You for Your Referral!</h1>
                        <p>Journey of Care - Expanding Our Circle of Care</p>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="content">
                        <div class="thank-you-section">
                            <div class="thank-you-icon">🤝</div>
                            <h2 class="thank-you-title">Your Referral Matters</h2>
                            <p class="thank-you-text">Thank you for referring someone to Journey of Care. Your trust in our services means everything to us.</p>
                        </div>
                        <div class="referral-highlight">
                            <h3>🎯 Referral Received</h3>
                            <p>You've referred <strong>${formData.clientName || 'a potential client'}</strong> for care services.<br/>Our team will reach out to them within 24 hours.</p>
                        </div>
                        <div class="next-steps">
                            <h3>🎯 What Happens Next</h3>
                            <ol>
                                <li><strong>Contact:</strong> Our referral team will call ${formData.clientName || 'them'} within 24 hours</li>
                                <li><strong>Consultation:</strong> We'll schedule a free in-home assessment</li>
                                <li><strong>Care Plan:</strong> A personalized care plan will be developed</li>
                                <li><strong>Updates:</strong> We'll keep you informed of the progress (with permission)</li>
                                <li><strong>Appreciation:</strong> You'll receive a thank-you gift once services begin</li>
                            </ol>
                        </div>
                        <div class="appreciation-section">
                            <h3>🎁 Our Referral Appreciation Program</h3>
                            <p>As a token of our gratitude, you'll receive a special thank-you gift once your referral begins services with us.</p>
                            <p><strong>Thank you for being a Journey of Care advocate!</strong></p>
                        </div>
                        <div class="contact-section">
                            <h3>Questions About Your Referral?</h3>
                            <p><a href="tel:8324460705">(832) 446-0705</a><br/>Referral Team - Available 24/7</p>
                            <p><a href="mailto:referrals@journey-of-care.com">referrals@journey-of-care.com</a><br/>Dedicated referral support</p>
                        </div>
                    </td></tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr><td class="footer">
                        <p><strong>Journey of Care</strong></p>
                        <p>Building Trust, One Family at a Time</p>
                        <p><a href="tel:8324460705">(832) 446-0705</a> | <a href="mailto:referrals@journey-of-care.com">referrals@journey-of-care.com</a></p>
                    </td></tr>
                </table>
            </div>
        </td></tr>
    </table>
</body>
</html>`;
    }

    // Text content generators for fallback
    generateContactFormText(formData) {
        return `
New Contact Form Submission - Journey of Care

URGENCY: ${this.formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

CONTACT INFORMATION:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Service Interested: ${this.formatService(formData.service) || 'Not specified'}

MESSAGE:
${formData.message || 'No message provided'}

---
Journey of Care
(832) 446-0705
Info@journey-of-care.com
`;
    }

    generateConsultationFormText(formData) {
        return `
New Consultation Request - Journey of Care

URGENCY: ${this.formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

CONTACT INFORMATION:
Name: ${formData.firstName || ''} ${formData.lastName || ''}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Relationship: ${this.formatRelationship(formData.relationship) || 'Not specified'}

CARE RECIPIENT:
Name: ${formData.recipientName || 'Not provided'}
Age: ${formData.recipientAge || 'Not provided'}
Gender: ${formData.recipientGender || 'Not specified'}
Medical Conditions: ${formData.recipientConditions || 'None specified'}

SERVICE REQUIREMENTS:
Services: ${formData.services && formData.services.length > 0 ? formData.services.map(s => this.formatService(s)).join(', ') : 'None selected'}
Care Level: ${this.formatCareLevel(formData.careLevel) || 'Not specified'}
Frequency: ${this.formatFrequency(formData.frequency) || 'Not specified'}
Duration: ${this.formatDuration(formData.duration) || 'Not specified'}
Start Date: ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}
Preferred Time: ${this.formatPreferredTime(formData.preferredTime) || 'Not specified'}

LOCATION:
Address: ${formData.address || 'Not provided'}
City: ${formData.city || 'Not provided'}
Zip Code: ${formData.zipCode || 'Not provided'}

ADDITIONAL INFO:
Special Requests: ${formData.specialRequests || 'None'}
Additional Information: ${formData.additionalInfo || 'None provided'}

---
Journey of Care
(832) 446-0705
Info@journey-of-care.com
`;
    }

    generateReferralFormText(formData) {
        return `
New Referral Submission - Journey of Care

URGENCY: ${this.formatUrgency(formData.urgency)}
SUBMITTED: ${new Date().toLocaleString()}

REFERRER INFORMATION:
Name: ${formData.referrerName || 'Not provided'}
Email: ${formData.referrerEmail || 'Not provided'}
Phone: ${formData.referrerPhone || 'Not provided'}
Relationship to Client: ${this.formatRelationship(formData.referrerRelation) || 'Not specified'}

CLIENT INFORMATION:
Name: ${formData.clientName || 'Not provided'}
Phone: ${formData.clientPhone || 'Not provided'}
Email: ${formData.clientEmail || 'Not provided'}
Address: ${formData.clientAddress || 'Not provided'}

CARE REQUIREMENTS:
Care Needs: ${this.formatService(formData.careNeeds) || 'Not specified'}
Timeline: ${this.formatUrgency(formData.urgency) || 'Not specified'}

ADDITIONAL INFORMATION:
${formData.additionalInfo || 'None provided'}

Terms Agreed: ${formData.agreeToTerms ? 'Yes' : 'No'}

---
Journey of Care
(832) 446-0705
referrals@journey-of-care.com
`;
    }

    // User confirmation text content generators
    generateContactConfirmationText(formData) {
        return `
Thank You for Contacting Journey of Care

Dear ${formData.name || 'Valued Customer'},

Thank you for reaching out to Journey of Care. We've received your message and want to assure you that your inquiry is important to us.

YOUR MESSAGE DETAILS:
- Submitted: ${new Date().toLocaleString()}
- Priority Level: ${this.formatUrgency(formData.urgency)}
- Service Interest: ${this.formatService(formData.service) || 'General Inquiry'}

WHAT HAPPENS NEXT:
1. Review: Our team will carefully review your message and needs
2. Response: We'll contact you within 24 hours (sooner for urgent requests)
3. Consultation: We'll schedule a free consultation to discuss your specific needs
4. Care Plan: Together, we'll create a personalized care plan that's right for you

NEED IMMEDIATE ASSISTANCE?
Phone: (832) 446-0705 - Available 24/7 for emergencies
Email: Info@journey-of-care.com - We respond within 24 hours

Journey of Care
Compassionate Home Care Services
Conroe, TX & Surrounding Communities
`;
    }

    generateConsultationConfirmationText(formData) {
        return `
Consultation Request Received - Journey of Care

Dear ${formData.firstName || ''} ${formData.lastName || ''},

Thank you for trusting Journey of Care with your loved one's care needs. We've received your consultation request and are honored to be considered for this important responsibility.

YOUR CONSULTATION REQUEST:
- Submitted: ${new Date().toLocaleString()}
- Timeline: ${this.formatUrgency(formData.urgency)}
- Care Recipient: ${formData.recipientName || 'Not specified'}
- Preferred Start Date: ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not specified'}

WHAT TO EXPECT NEXT:
1. Within 4 hours: Our Care Coordinator will call you to schedule your consultation
2. Within 24-48 hours: Free in-home consultation with our licensed team
3. Same day: Receive your personalized care plan and pricing
4. Care start: Begin services as soon as the next business day if needed

QUESTIONS BEFORE YOUR CONSULTATION?
Phone: (832) 446-0705 - Available 24/7 for urgent needs
Email: Info@journey-of-care.com - Our Care Coordinators are standing by

Journey of Care
Licensed • Insured • Trusted
Conroe, TX & Surrounding Communities
`;
    }

    generateReferralConfirmationText(formData) {
        return `
Thank You for Your Referral - Journey of Care

Dear ${formData.referrerName || 'Valued Advocate'},

Thank you for referring someone to Journey of Care. Your trust in our services means everything to us, and we're honored to extend our compassionate care to another family through your recommendation.

REFERRAL RECEIVED:
You've referred ${formData.clientName || 'a potential client'} for care services.
Our team will reach out to them within 24 hours.

WHAT HAPPENS NEXT:
1. Contact: Our referral team will call ${formData.clientName || 'them'} within 24 hours
2. Consultation: We'll schedule a free in-home assessment
3. Care Plan: A personalized care plan will be developed
4. Updates: We'll keep you informed of the progress (with permission)
5. Appreciation: You'll receive a thank-you gift once services begin

REFERRAL APPRECIATION PROGRAM:
As a token of our gratitude, you'll receive a special thank-you gift once your referral begins services with us. But more importantly, you've helped us extend compassionate care to another family in need.

Thank you for being a Journey of Care advocate!

QUESTIONS ABOUT YOUR REFERRAL?
Phone: (832) 446-0705 - Referral Team, Available 24/7
Email: referrals@journey-of-care.com - Dedicated referral support

Journey of Care
Building Trust, One Family at a Time
Conroe, TX & Surrounding Communities
`;
    }

    // Helper methods for formatting
    formatUrgency(urgency) {
        const urgencyMap = {
            'immediate': 'IMMEDIATE (Within 24 hours)',
            'urgent': 'URGENT (Within 3 days)',
            'soon': 'SOON (Within a week)',
            'planning': 'PLANNING AHEAD'
        };
        return urgencyMap[urgency] || 'Not specified';
    }

    formatService(service) {
        const serviceMap = {
            'personal-care': 'Personal Care Services',
            'companion-care': 'Companion Care',
            'respite-care': 'Respite Care',
            'specialized-care': 'Specialized Care',
            'inclusive-care': 'Inclusive Care for All Abilities',
            'in-facility-care': 'In-Facility Care',
            'consultation': 'Free Consultation',
            'assessment': 'Care Assessment',
            'not-sure': 'Need Consultation',
            'other': 'Other'
        };
        return serviceMap[service] || service;
    }

    formatRelationship(relationship) {
        const relationshipMap = {
            'family': 'Family Member',
            'friend': 'Friend',
            'neighbor': 'Neighbor',
            'healthcare-provider': 'Healthcare Provider',
            'social-worker': 'Social Worker',
            'current-client': 'Current Client',
            'former-client': 'Former Client',
            'self': 'Self',
            'spouse': 'Spouse/Partner',
            'child': 'Adult Child',
            'parent': 'Parent',
            'sibling': 'Sibling',
            'other': 'Other'
        };
        return relationshipMap[relationship] || relationship;
    }

    formatCareLevel(level) {
        const levelMap = {
            'minimal': 'Minimal Assistance',
            'moderate': 'Moderate Care',
            'extensive': 'Extensive Care',
            'intensive': 'Intensive Care'
        };
        return levelMap[level] || level;
    }

    formatFrequency(frequency) {
        const frequencyMap = {
            'daily': 'Daily',
            'few-times-week': 'Few times per week',
            'weekly': 'Weekly',
            'bi-weekly': 'Bi-weekly',
            'monthly': 'Monthly',
            'as-needed': 'As needed'
        };
        return frequencyMap[frequency] || frequency;
    }

    formatDuration(duration) {
        const durationMap = {
            '2-4-hours': '2-4 hours',
            '4-8-hours': '4-8 hours',
            '8-12-hours': '8-12 hours',
            '12-24-hours': '12-24 hours',
            'overnight': 'Overnight',
            'live-in': 'Live-in'
        };
        return durationMap[duration] || duration;
    }

    formatPreferredTime(time) {
        const timeMap = {
            'morning': 'Morning (6 AM - 12 PM)',
            'afternoon': 'Afternoon (12 PM - 6 PM)',
            'evening': 'Evening (6 PM - 10 PM)',
            'overnight': 'Overnight (10 PM - 6 AM)',
            'flexible': 'Flexible'
        };
        return timeMap[time] || time;
    }
}

// Export a singleton instance
const emailService = new EmailService(process.env.REACT_APP_BREVO_API_KEY || '');

export default emailService;
