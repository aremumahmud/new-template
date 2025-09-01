import './Services.css'
import personalCareImg from '../assets/p1.jpg'
import companionCareImg from '../assets/p2.jpg'
import respiteCareImg from '../assets/p3.jpg'
import facilityImg from '../assets/test1.jpg'
import specializedImg from '../assets/test2.jpg'
import endOfLifeImg from '../assets/pic.jpg'
import verified from '../assets/verified-check-svgrepo-com.svg'

function Services() {
    const services = [
        {
            id: 1,
            title: "Personal Care Services",
            image: personalCareImg,
            description: "Dignified assistance for daily living activities. We assist with bathing, dressing, grooming, mobility transfers, toileting, incontinence care, and medication reminders.",
            stats: { clients: "500+", satisfaction: "98%" },
            verified: true
        },
        {
            id: 2,
            title: "Companion Care",
            image: companionCareImg,
            description: "Building connections and combating loneliness. Friendly conversations, meal preparation, light housekeeping, errands, and recreational activities.",
            stats: { clients: "400+", satisfaction: "96%" },
            verified: true
        },
        {
            id: 3,
            title: "Respite Care",
            image: respiteCareImg,
            description: "Support for family caregivers when they need it most. Flexible scheduling, reliable caregivers, and peace of mind while you rest and recharge.",
            stats: { clients: "200+", satisfaction: "99%" },
            verified: true
        },
        {
            id: 4,
            title: "In-Facility Care",
            image: facilityImg,
            description: "Supplemental care for residents in assisted living or skilled nursing facilities. One-on-one companionship, advocacy, and personalized attention.",
            stats: { clients: "150+", satisfaction: "97%" },
            verified: true
        },
        {
            id: 5,
            title: "Specialized Care",
            image: specializedImg,
            description: "Expert support for chronic and cognitive conditions including Alzheimer's, dementia, Parkinson's disease, and post-surgery recovery care.",
            stats: { clients: "300+", satisfaction: "95%" },
            verified: true
        },
        {
            id: 6,
            title: "End-of-Life Care",
            image: endOfLifeImg,
            description: "Comfort and compassion during life's final journey. Pain management, emotional support, and assistance with daily needs for peace and dignity.",
            stats: { clients: "100+", satisfaction: "100%" },
            verified: true
        }
    ];

    return (
        <section className="services-section">
            <div className="services-container">
                <div className="services-header" data-aos="fade-up">
                    <div className="services-badge">Our Services</div>
                    <h2 className="services-title">
                        Comprehensive Care <span className="title-highlight">Solutions</span>
                    </h2>
                    <p className="services-subtitle">
                        Professional home care services designed to meet your unique needs with compassion and expertise.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div 
                            key={service.id} 
                            className="service-card" 
                            data-aos="fade-up" 
                            data-aos-delay={`${(index + 1) * 100}`}
                        >
                            <img className="service-img" src={service.image} alt={service.title} />
                            
                            <div className="service-content">
                                <div className="service-info">
                                    <div className="service-name">
                                        <h3>{service.title}</h3>
                                        {service.verified && (
                                            // <div className="verified-badge">✓</div>
                                            <img className='verified-badge' src={verified} alt="" />
                                        )}
                                    </div>
                                    <p className="service-desc">{service.description}</p>
                                </div>
                                
                                <div className="service-cta">
                                    {/* <div className="service-stats">
                                        <div className="stat-item">
                                            <i className="stat-icon">👥</i>
                                            <span>{service.stats.clients}</span>
                                        </div>
                                        <div className="stat-item">
                                            <i className="stat-icon">⭐</i>
                                            <span>{service.stats.satisfaction}</span>
                                        </div>
                                    </div> */}
                                    
                                    <div className="service-btn">
                                        <span>Learn More</span>
                                        <i className="btn-icon">→</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="services-cta-section" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="cta-title">Schedule Your Free In-Home Care Assessment Today!</h3>
                    <p className="cta-description">
                        Discover how we can help your loved one live independently and comfortably at home.
                    </p>
                    <button className="cta-button">
                        Schedule a Free Assessment
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Services
