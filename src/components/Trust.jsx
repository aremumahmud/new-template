import './Trust.css'

function Trust() {
    const trustPoints = [
        {
            id: 1,
            title: "Trustworthy and Compassionate Caregivers",
            description: "Certified caregivers who provide reliable, heartfelt support with steady hands and open hearts.",
            icon: "◯"
        },
        {
            id: 2,
            title: "Customized Care Plans",
            description: "Personalized care plans tailored to each individual's unique needs and preferences.",
            icon: "□"
        },
        {
            id: 3,
            title: "24/7 Availability for Emergencies",
            description: "Round-the-clock availability to ensure peace of mind and support when you need it most.",
            icon: "◐"
        },
        {
            id: 4,
            title: "Serving with Dedication",
            description: "Committed to improving quality of life with care, professionalism, and dedication.",
            icon: "◆"
        }
    ];

    return (
        <section className="trust-section">
            <div className="trust-container">
                <div className="trust-header" data-aos="fade-up">
                    <h2 className="trust-title">Why Families Trust Us</h2>
                </div>

                <div className="trust-grid">
                    {trustPoints.map((point, index) => (
                        <div 
                            key={point.id} 
                            className="trust-item" 
                            data-aos="fade-up" 
                            data-aos-delay={`${(index + 1) * 150}`}
                        >
                            <div className="trust-icon">
                                {point.icon}
                            </div>
                            <h3 className="trust-item-title">{point.title}</h3>
                            <p className="trust-item-description">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Trust
