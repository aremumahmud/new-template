import './Contact.css'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import emailService from '../services/emailService'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        urgency: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send admin notification email
            const adminResult = await emailService.sendContactFormEmail(formData);
            
            if (adminResult.success) {
                console.log('Contact form submitted successfully:', formData);
                
                // Send user confirmation email (only if user provided email)
                if (formData.email) {
                    try {
                        await emailService.sendContactConfirmationEmail(formData);
                        console.log('Contact confirmation email sent to user');
                    } catch (confirmationError) {
                        console.warn('Failed to send confirmation email to user:', confirmationError);
                        // Don't fail the whole process if confirmation email fails
                    }
                }
                
                setShowSuccessMessage(true);
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    urgency: '',
                    message: ''
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to send contact form:', adminResult.error);
                alert('Sorry, there was an error sending your message. Please try again or call us directly at (832) 446-0705.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again or call us directly at (832) 446-0705.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: "📞",
            title: "Call Us",
            details: "(832) 446-0705",
            subtext: "Available 24/7 for emergencies",
            link: "tel:8324460705"
        },
        {
            icon: "📧",
            title: "Email Us",
            details: "Info@journey-of-care.com",
            subtext: "We respond within 24 hours",
            link: "mailto:Info@journey-of-care.com"
        },
        {
            icon: "📍",
            title: "Service Area",
            details: "Conroe, TX & Surrounding Communities",
            subtext: "Serving the greater Houston area",
            link: null
        },
        {
            icon: "🕐",
            title: "Business Hours",
            details: "Mon-Fri: 8AM-6PM",
            subtext: "Weekend consultations available",
            link: null
        }
    ];

    const serviceOptions = [
        { value: "personal-care", label: "Personal Care Services" },
        { value: "companion-care", label: "Companion Care" },
        { value: "respite-care", label: "Respite Care" },
        { value: "specialized-care", label: "Specialized Care" },
        { value: "inclusive-care", label: "Inclusive Care" },
        { value: "in-facility-care", label: "In-Facility Care" },
        { value: "consultation", label: "Free Consultation" },
        { value: "other", label: "Other" }
    ];

    const urgencyOptions = [
        { value: "immediate", label: "Immediate (Within 24 hours)" },
        { value: "urgent", label: "Urgent (Within 3 days)" },
        { value: "soon", label: "Soon (Within a week)" },
        { value: "planning", label: "Planning ahead" }
    ];

    return (
        <div className="contact-page">
            <Header />
            
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-container">
                    <div className="contact-hero-content">
                        <div className="contact-hero-text" data-aos="fade-up">
                            <div className="contact-badge">Contact Us</div>
                            <h1 className="contact-hero-title">
                                Let's Start Your<br />
                                <span className="highlight">Journey of Care</span>
                            </h1>
                            <p className="contact-hero-description">
                                Ready to provide the best care for your loved one? Contact us today for a 
                                free consultation. We're here to answer your questions and help you find 
                                the perfect care solution.
                            </p>
                            <div className="contact-stats" data-aos="fade-up" data-aos-delay="200">
                                <div className="stat">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Support Available</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Free</span>
                                    <span className="stat-label">Initial Consultation</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Same Day</span>
                                    <span className="stat-label">Response Time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="contact-main-section">
                <div className="contact-main-container">
                    <div className="contact-main-content">
                        {/* Contact Information */}
                        <div className="contact-info-section" data-aos="fade-right">
                            <div className="contact-info-header">
                                <h2 className="info-section-title">Get in Touch</h2>
                                <p className="info-section-subtitle">
                                    We're here to help you navigate your care options. Reach out to us 
                                    through any of these channels.
                                </p>
                            </div>
                            
                            <div className="contact-info-grid1">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="contact-info-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <div className="contact-card-icon">{item.icon}</div>
                                        <div className="contact-card-content">
                                            <h3 className="contact-card-title">{item.title}</h3>
                                            {item.link ? (
                                                <a href={item.link} className="contact-card-link">
                                                    {item.details}
                                                </a>
                                            ) : (
                                                <p className="contact-card-details">{item.details}</p>
                                            )}
                                            <p className="contact-card-subtext">{item.subtext}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="emergency-notice" data-aos="fade-up" data-aos-delay="400">
                                <div className="emergency-icon">🚨</div>
                                <div className="emergency-content">
                                    <h4 className="emergency-title">Emergency Situations</h4>
                                    <p className="emergency-text">
                                        For immediate care needs or emergencies, please call us directly at 
                                        <a href="tel:8324460705" className="emergency-phone"> (832) 446-0705</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-section" data-aos="fade-left" data-aos-delay="300">
                            <div className="contact-form-header">
                                <h2 className="form-section-title">Send Us a Message</h2>
                                <p className="form-section-subtitle">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            {showSuccessMessage && (
                                <div className="success-message" data-aos="fade-in">
                                    <div className="success-icon">✅</div>
                                    <div className="success-content">
                                        <h4>Message Sent Successfully!</h4>
                                        <p>Thank you for reaching out. We'll contact you within 24 hours.</p>
                                    </div>
                                </div>
                            )}

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="urgency">Timeline *</label>
                                        <select
                                            id="urgency"
                                            name="urgency"
                                            value={formData.urgency}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select timeline</option>
                                            {urgencyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">Service of Interest</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select a service (optional)</option>
                                        {serviceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        placeholder="Tell us about your care needs, questions, or any specific requirements..."
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                                </button>

                                <p className="form-privacy-note">
                                    By submitting this form, you agree to our privacy policy. We will never 
                                    share your personal information with third parties.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            <Footer />
        </div>
    )
}

export default Contact
