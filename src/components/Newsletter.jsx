import './Newsletter.css'
import { useState } from 'react'

function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Newsletter subscription:', email);
            setIsSubmitted(true);
            setEmail('');
            
            // Reset success message after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">
                <div className="newsletter-content" data-aos="fade-up">
                    <div className="newsletter-text">
                        <div className="newsletter-badge">Stay Connected</div>
                        <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
                        <p className="newsletter-subtitle">
                            Stay updated with the latest care tips, health information, and news from Journey of Care Home Care Services.
                        </p>
                    </div>

                    <div className="newsletter-form-section" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="form-title">Join Our Newsletter</h3>
                        <p className="form-subtitle">
                            Get valuable care tips, health insights, and updates delivered to your inbox.
                        </p>

                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="newsletter-input"
                                />
                                <button type="submit" className="newsletter-btn">
                                    Subscribe
                                </button>
                            </div>
                        </form>

                        {isSubmitted && (
                            <div className="success-message" data-aos="fade-in">
                                ✓ Thank you for subscribing! Check your email for confirmation.
                            </div>
                        )}

                        <p className="privacy-text">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
