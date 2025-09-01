import './Contact.css'
import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: "📧",
            title: "Email Us",
            details: "info@journeyofcare.com",
            subtext: "We'll respond within 24 hours"
        },
        {
            icon: "📞",
            title: "Call Us",
            details: "(281) 555-0123",
            subtext: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
        },
        {
            icon: "📍",
            title: "Visit Us",
            details: "123 Main Street, Houston, TX 77001",
            subtext: "Schedule an appointment"
        }
    ];

    return (
        <section className="contact-section">
            <div className="contact-container">
                <div className="contact-header" data-aos="fade-up">
                    <div className="contact-badge">Contact Us</div>
                    <h2 className="contact-title">Get in Touch</h2>
                    <p className="contact-subtitle">
                        Ready to learn more about our services? Contact us today for a free consultation.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info" data-aos="fade-right" data-aos-delay="200">
                        <h3 className="info-title">Contact Information</h3>
                        <div className="contact-items">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="contact-item">
                                    <div className="contact-icon">{item.icon}</div>
                                    <div className="contact-details">
                                        <h4 className="contact-item-title">{item.title}</h4>
                                        <p className="contact-item-details">{item.details}</p>
                                        <p className="contact-item-subtext">{item.subtext}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contact-form-wrapper" data-aos="fade-left" data-aos-delay="300">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="service">Service of Interest</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a service</option>
                                    <option value="personal-care">Personal Care Services</option>
                                    <option value="companion-care">Companion Care</option>
                                    <option value="respite-care">Respite Care</option>
                                    <option value="specialized-care">Specialized Care</option>
                                    <option value="end-of-life">End-of-Life Care</option>
                                    <option value="consultation">Free Consultation</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    placeholder="Tell us about your care needs..."
                                ></textarea>
                            </div>

                            <button type="submit" className="contact-submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
