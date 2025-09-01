import './FAQ.css'
import { useState } from 'react'

function FAQ() {
    const [openItem, setOpenItem] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "What services does Journey of Care provide?",
            answer: "We offer comprehensive home care services including Personal Care Services, Companion Care, Respite Care, In-Facility Care, Specialized Care for conditions like Alzheimer's and dementia, and End-of-Life Care. All services are provided by certified, background-checked caregivers."
        },
        {
            id: 2,
            question: "What areas do you serve?",
            answer: "We proudly serve North Houston, Conroe, The Woodlands, Spring, and surrounding areas. Our goal is to bring compassionate care directly to your doorstep throughout these communities."
        },
        {
            id: 3,
            question: "Are your caregivers licensed and insured?",
            answer: "Yes, all our caregivers are certified, thoroughly background-checked, and bonded. Journey of Care is fully licensed and insured to provide peace of mind for you and your family."
        },
        {
            id: 4,
            question: "How do you create personalized care plans?",
            answer: "We start with a comprehensive assessment of your loved one's needs, preferences, and health conditions. Our team then develops a customized care plan that addresses specific requirements while maintaining dignity and independence."
        },
        {
            id: 5,
            question: "Do you provide 24/7 care?",
            answer: "We offer flexible scheduling including 24/7 care options when needed. Our business hours are Monday-Friday 8:00 AM – 5:00 PM, with on-call availability on weekends and 24/7 emergency support when required."
        },
        {
            id: 6,
            question: "How much do your services cost?",
            answer: "Care costs vary based on the level of service needed, frequency of visits, and specific care requirements. We offer a free in-home consultation to assess needs and provide transparent pricing. Contact us to discuss your specific situation."
        },
        {
            id: 7,
            question: "Can I meet the caregiver before services begin?",
            answer: "Absolutely! We believe in the importance of compatibility and trust. We'll arrange for you to meet potential caregivers before services begin to ensure the best possible match for your family's needs."
        },
        {
            id: 8,
            question: "What if I'm not satisfied with the caregiver?",
            answer: "Your satisfaction is our priority. If you're not completely satisfied with your caregiver, we'll work with you to address concerns and, if necessary, provide a replacement caregiver at no additional cost."
        }
    ];

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <div className="faq-header" data-aos="fade-up">
                    <div className="faq-badge">FAQ</div>
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <p className="faq-subtitle">
                        Find answers to common questions about our home care services and how we can help your family.
                    </p>
                </div>

                <div className="faq-list" data-aos="fade-up" data-aos-delay="200">
                    {faqs.map((faq, index) => (
                        <div 
                            key={faq.id} 
                            className={`faq-item ${openItem === faq.id ? 'open' : ''}`}
                            // data-aos="fade-up" 
                            // data-aos-delay={`${300 + (index * 50)}`}
                        >
                            <button 
                                className="faq-question"
                                onClick={() => toggleItem(faq.id)}
                                aria-expanded={openItem === faq.id}
                            >
                                <span className="question-text">{faq.question}</span>
                                <span className="faq-icon">
                                    {openItem === faq.id ? '−' : '+'}
                                </span>
                            </button>
                            <div className="faq-answer">
                                <div className="answer-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-footer" data-aos="fade-up" data-aos-delay="800">
                    <div className="faq-cta">
                        <h3>Still have questions?</h3>
                        <p>Our team is here to help. Contact us for a free consultation.</p>
                        <button className="faq-contact-btn">
                            Contact Us Today
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
