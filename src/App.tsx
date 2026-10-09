import React, { useState } from 'react'
import './App.css'
import {
  WOODLAND_SERVICES,
  WOODLAND_PROJECTS,
  WOODLAND_STATS,
  GALLERY_IMAGES,
  REVIEWS
} from './data/woodlandData'

export function App() {
  // Service accordion state (defaults to open on 01 Architecture)
  const [openServiceId, setOpenServiceId] = useState<string | null>('s1')

  // Review carousel state
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const toggleService = (id: string) => {
    setOpenServiceId((prev) => (prev === id ? null : id))
  }

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length)
  }

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSubmitted(true)
    setTimeout(() => setNewsletterSubmitted(false), 4000)
  }

  return (
    <div className="woodland-app">
      {/* 1. Header & Navigation */}
      <header className="woodland-header">
        <div className="woodland-container woodland-nav">
          <a href="#" className="brand-wrapper">
            <span className="brand-name">WOODLAND</span>
            <span className="brand-tagline">Spaces like home since 2010</span>
          </a>

          <nav>
            <ul className="nav-menu">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#gallery" className="nav-link">Gallery</a></li>
              <li><a href="#reviews" className="nav-link">Reviews</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>
          </nav>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '18px 24px',
              background: '#ffffff',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#gallery" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
            <a href="#reviews" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="woodland-container">
          <div className="hero-backdrop-title">
            WOODLAND
          </div>
          <div className="hero-image-container">
            <img
              src="/hero-villa.jpg"
              alt="Woodland Architecture Luxury Modern Villa"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="about-section">
        <div className="woodland-container split-layout">
          <h2 className="section-headline">ABOUT</h2>
          <div className="about-columns">
            <p className="about-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
            </p>
            <p className="about-p">
              Ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="services-section">
        <div className="woodland-container split-layout">
          <h2 className="section-headline">SERVICES</h2>

          <div className="services-list">
            {WOODLAND_SERVICES.map((service) => {
              const isOpen = openServiceId === service.id
              return (
                <div key={service.id} className="service-item">
                  <div
                    className="service-header-row"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="service-num-title">
                      <span className="service-num">{service.number}</span>
                      <h3 className="service-title">{service.title}</h3>
                    </div>
                    <span className="service-toggle-icon">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="service-details">
                      <div className="service-text-pane">
                        <p className="service-desc-p">{service.description}</p>
                        <ul className="service-bullets-list">
                          {service.bullets.map((bullet, idx) => (
                            <li key={idx} className="service-bullet-item">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="service-img-pane">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="service-img"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Projects Section */}
      <section id="projects" className="projects-section">
        <div className="woodland-container split-layout">
          <h2 className="section-headline">PROJECTS</h2>

          <div className="projects-stack">
            {WOODLAND_PROJECTS.map((project) => (
              <div key={project.id} className="project-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image"
                />

                <div
                  className={`project-floating-card ${
                    project.cardPosition === 'right' ? 'pos-right' : 'pos-left'
                  }`}
                >
                  <h3 className="project-item-title">{project.title}</h3>
                  <div className="project-meta-line">
                    {project.location} • {project.type} • {project.year}
                  </div>
                  <p className="project-desc-text">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. By The Numbers Section */}
      <section className="numbers-section">
        <div className="woodland-container">
          <div className="numbers-label">BY THE NUMBERS</div>
          <div className="numbers-grid">
            {WOODLAND_STATS.map((stat, idx) => (
              <div key={idx} className="number-stat">
                <div className="number-value">{stat.value}</div>
                <div className="number-sub">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. As Featured In Section */}
      <section className="featured-in-section">
        <div className="woodland-container">
          <div className="featured-label">AS FEATURED IN</div>
          <div className="brands-container">
            <div className="brand-logo-item brand-hgtv">
              HGTV
            </div>
            <div className="brand-logo-item brand-exp">
              exp
              <span>REALTY</span>
            </div>
            <div className="brand-logo-item brand-fortune">
              FORTUNE
              <span>MAGAZINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="woodland-container">
          <div className="gallery-backdrop-title">
            GALLERY
          </div>

          <div className="gallery-grid-collage">
            {GALLERY_IMAGES.map((item) => (
              <div
                key={item.id}
                className={`gallery-item ${item.className}`}
              >
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Reviews Section (Dark) */}
      <section id="reviews" className="reviews-section">
        <div className="woodland-container">
          <div className="reviews-kicker">HEAR OUR CLIENT</div>
          <h2 className="reviews-headline">REVIEWS</h2>

          <div className="review-quote-box">
            <p className="review-quote-text">
              {REVIEWS[currentReviewIndex].quote}
            </p>
          </div>

          <div className="reviews-nav-controls">
            <button
              className="review-nav-arrow-btn"
              onClick={handlePrevReview}
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              className="review-nav-arrow-btn"
              onClick={handleNextReview}
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* 10. Partner With Us / Contact Section */}
      <section id="contact" className="partner-section">
        <div className="woodland-container partner-grid">
          <div className="partner-info-col">
            <h2 className="partner-headline">PARTNER WITH US</h2>
            <p className="partner-subtext">
              If you're someone who's looking to bring a space to life, share a few details to help me reach out to you so we can discuss how to bring your vision to life.
            </p>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-field-wrapper">
                <label className="form-label-title">Your full name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="contact-input"
                />
              </div>

              <div className="form-field-wrapper">
                <label className="form-label-title">Your email address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="contact-input"
                />
              </div>

              <div className="form-field-wrapper">
                <label className="form-label-title">A little bit about your project</label>
                <textarea
                  className="contact-input contact-textarea"
                  placeholder="Example Text"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                {formSubmitted ? 'MESSAGE SENT ✓' : 'SUBMIT'}
              </button>
            </form>
          </div>

          <div className="partner-media-col">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85"
              alt="Woodland Architecture Facade"
              className="partner-media-img"
            />
          </div>
        </div>
      </section>

      {/* 11. Footer Section */}
      <footer className="woodland-footer">
        <div className="woodland-container">
          <div className="footer-columns-grid">
            <div>
              <h4 className="footer-col-header">Quick Links</h4>
              <div className="footer-links-col">
                <a href="#about" className="footer-link-item">About</a>
                <a href="#services" className="footer-link-item">Services</a>
                <a href="#projects" className="footer-link-item">Projects</a>
                <a href="#gallery" className="footer-link-item">Gallery</a>
                <a href="#reviews" className="footer-link-item">Reviews</a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-header">Resources</h4>
              <div className="footer-links-col">
                <a href="#style-guide" className="footer-link-item">Style guide</a>
                <a href="#licenses" className="footer-link-item">Licenses</a>
                <a href="#changelog" className="footer-link-item">Changelog</a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-header">Contact</h4>
              <div className="footer-links-col">
                <a href="mailto:hi@woodland.com" className="footer-link-item">hi@woodland.com</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-link-item">Twitter</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link-item">LinkedIn</a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-header">Newsletter</h4>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <label style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                  Your email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  {newsletterSubmitted ? 'SUBSCRIBED ✓' : 'SUBMIT'}
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
            <a href="#cookies" className="footer-legal-link">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
