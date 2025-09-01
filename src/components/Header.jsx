import './Header.css'
import logo from '../assets/logo.svg'
import GooeyBtn from './gooeybtn'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  const services = [
    { name: 'Inclusive Care for All Abilities', href: '/services/inclusive-care' },
    { name: 'Personal Care Services', href: '/services/personal-care' },
    { name: 'Companion Care', href: '/services/companion-care' },
    { name: 'Respite Care', href: '/services/respite-care' },
    { name: 'In-Facility Care', href: '/services/in-facility-care' },
    { name: 'Specialized Care', href: '/services/specialized-care' }
  ];

  return (
    <header className="header" data-aos="fade-down">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" data-aos="fade-right" data-aos-delay="100">
          <img src={logo} alt="Journey of Care" />
        </Link>

        {/* Navigation */}
        <nav className="nav" data-aos="fade-down" data-aos-delay="200">
          <ul className="nav-list">
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link to="/services" className="nav-link dropdown-toggle">
                Services
                <span className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
              </Link>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {services.map((service, index) => (
                  <Link key={index} to={service.href} className="dropdown-item">
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            <li><Link to="/careers" className="nav-link">Careers</Link></li>
            <li><a href="/blogs" className="nav-link">Blog</a></li>
            <li><Link to="/refer-us" className="nav-link">Refer Us</Link></li>
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="cta-buttons" data-aos="fade-left" data-aos-delay="300">
          <Link to="/contact">
            <GooeyBtn text="Contact" variant="white" extendby={84} />
          </Link>
          <Link to="/scheduling">
            <GooeyBtn text="Schedule Care" variant="black" extendby={120} direction="left" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
