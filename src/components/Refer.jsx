import './Refer.css'
import referImage from '../assets/test2.jpg'
import { Link } from 'react-router-dom'

function Refer() {
    const referralReasons = [
        {
            id: 1,
            title: "Trusted Quality Care",
            description: "Our caregivers are thoroughly vetted, certified, and supervised to provide exceptional care."
        },
        {
            id: 2,
            title: "Compassionate Approach", 
            description: "We treat each client with dignity, respect, and genuine care, focusing on their unique needs."
        },
        {
            id: 3,
            title: "Referral Appreciation",
            description: "We value your trust and confidence in our services. Ask about our referral appreciation program."
        }
    ];

    return (
        <section className="refer-section">
            <div className="refer-container">
                <div className="refer-content">
                    <div className="refer-text">
                        <div className="refer-badge" data-aos="fade-up" data-aos-delay="100">
                            Refer With Confidence
                        </div>
                        
                        <h2 className="refer-title" data-aos="fade-up" data-aos-delay="200">
                            Share the Gift of <span className="title-highlight">Compassionate Care</span>
                        </h2>
                        
                        <div className="refer-description" data-aos="fade-up" data-aos-delay="300">
                            <p>
                                Know someone who could benefit from our services? Your referral helps us extend our compassionate care to more families in need.
                            </p>
                        </div>

                        <div className="refer-reasons" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="reasons-title">Why Refer to Journey of Care?</h3>
                            <div className="reasons-list">
                                {referralReasons.map((reason, index) => (
                                    <div key={reason.id} className="reason-item" data-aos="fade-up" data-aos-delay={`${500 + (index * 100)}`}>
                                        <div className="reason-icon">✓</div>
                                        <div className="reason-content">
                                            <h4 className="reason-title">{reason.title}</h4>
                                            <p className="reason-description">{reason.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="refer-cta" data-aos="fade-up" data-aos-delay="800">
                            <Link to="/refer-us" className="refer-button">
                                Refer Someone Today
                            </Link>
                        </div>
                    </div>
                    
                    <div className="refer-image" data-aos="fade-left" data-aos-delay="300">
                        <img src={referImage} alt="Caregiver helping senior" />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <div className="overlay-text">
                                    <span className="overlay-main">Making a difference</span>
                                    <span className="overlay-sub">in someone's life</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Refer
