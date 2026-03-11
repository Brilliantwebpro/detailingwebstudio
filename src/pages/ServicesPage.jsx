import React from 'react';
import { Link } from 'react-router-dom';
import apexShot from '../assets/images/screencapture-apexmobiledetailing-netlify-app-2026-02-28-10_49_11.png';
import highClassShot from '../assets/images/screencapture-high-class-customs-netlify-app-2026-02-28-10_48_35.png';
import blabShot from '../assets/images/screencapture-b-labauto-netlify-app-2026-02-28-10_47_37.png';

export default function ServicesPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container hero-glow">
          <span className="kicker"><span className="kicker-dot"></span>Service Systems For Premium Operators</span>
          <h1>Growth Infrastructure Built For High-Ticket Detailing Brands</h1>
          <p>We build websites and growth systems designed to increase lead quality, strengthen local authority, and convert premium detailing buyers more consistently.</p>
        </div>
      </section>

      <section className="section" id="service-packages">
        <div className="container">
          <h2 className="section-title reveal">Service Packages</h2>
          <p className="section-intro reveal">Choose the right package for your stage. Setup + monthly and one-time payment options are available where listed.</p>
          <div className="grid-3">
            <article className="card price-card reveal">
              <h3>Package 1 - Launch Page</h3>
              <p className="price">$300 setup</p>
              <ul className="package-list">
                <li>1 professionally designed landing page</li>
                <li>Mobile responsive design</li>
                <li>Service highlights section</li>
                <li>Integrated booking system</li>
                <li>Admin dashboard for managing appointments</li>
                <li>Contact and lead capture forms</li>
                <li>Google Maps integration</li>
                <li>Basic SEO setup</li>
                <li>Social media links</li>
                <li>Fast loading speed</li>
              </ul>
            </article>
            <article className="card price-card reveal">
              <h3>Package 2 - Starter Website</h3>
              <p className="price">$500 setup</p>
              <p className="price-sub">$99/month</p>
              <p className="price-sub">or $1,500 one-time</p>
              <ul className="package-list">
                <li>Up to 6 website pages</li>
                <li>Custom branding integration (logo, colors, images)</li>
                <li>Service pages structure</li>
                <li>Online booking system</li>
                <li>Admin dashboard for managing appointments</li>
                <li>Photo gallery section</li>
                <li>Mobile optimization</li>
                <li>Basic local SEO structure</li>
                <li>Google Business integration</li>
                <li>Speed optimization</li>
                <li>Website hosting</li>
                <li>Minor content edits</li>
              </ul>
            </article>
            <article className="card price-card featured reveal">
              <span className="price-badge">Most Popular</span>
              <h3>Package 3 - Growth Website</h3>
              <p className="price">$1,500 setup</p>
              <p className="price-sub">$149/month</p>
              <p className="price-sub">or $3,500 one-time</p>
              <ul className="package-list">
                <li>Up to 10 website pages</li>
                <li>Fully custom website design</li>
                <li>Conversion-focused layout</li>
                <li>Advanced booking system</li>
                <li>Admin dashboard for managing appointments</li>
                <li>Before and after gallery module</li>
                <li>Testimonials section</li>
                <li>Service pricing sections</li>
                <li>Local SEO structure</li>
                <li>Google Maps integration</li>
                <li>WhatsApp contact integration</li>
                <li>Speed and performance optimization</li>
                <li>Website hosting</li>
                <li>Security monitoring</li>
                <li>Website updates</li>
                <li>Backups</li>
                <li>Minor content edits</li>
              </ul>
            </article>
            <article className="card price-card reveal">
              <h3>Package 4 - Premium Website</h3>
              <p className="price">$3,000 setup</p>
              <p className="price-sub">$299/month</p>
              <p className="price-sub">or $7,000 one-time</p>
              <ul className="package-list">
                <li>Up to 20 pages</li>
                <li>Premium custom UI design</li>
                <li>Advanced booking system with service options</li>
                <li>Admin dashboard for booking and client management</li>
                <li>Before and after showcase gallery</li>
                <li>Testimonials and review sections</li>
                <li>High-converting service landing pages</li>
                <li>Advanced SEO structure</li>
                <li>Performance optimization</li>
                <li>Analytics integration</li>
                <li>Priority support</li>
                <li>Website hosting</li>
                <li>Security monitoring</li>
                <li>Website updates</li>
                <li>Backups</li>
              </ul>
            </article>
            <article className="card price-card reveal">
              <h3>Package 5 - SEO Boost Plan</h3>
              <p className="price">$400 setup</p>
              <p className="price-sub">$129/month</p>
              <ul className="package-list">
                <li>Local SEO setup and optimization</li>
                <li>Google Business profile enhancement</li>
                <li>Service and location page SEO improvements</li>
                <li>Technical SEO cleanup and indexing checks</li>
                <li>Schema markup implementation</li>
                <li>Monthly ranking and visibility reporting</li>
                <li>Content update recommendations</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Why Choose Our Web Development</h2>
          <div className="benefits-grid reveal">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>90+ PageSpeed scores with optimized images, code splitting, and modern build tools for instant loading.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>SEO Optimized</h3>
              <p>Service + location architecture, proper schema markup, and content hierarchy that ranks for local searches.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3>Mobile First</h3>
              <p>Designed primarily for mobile users with touch-friendly interfaces and responsive layouts that work everywhere.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Secure and Stable</h3>
              <p>Enterprise-grade security with SSL, secure forms, and protection against common vulnerabilities.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>Conversion Focused</h3>
              <p>Strategic CTAs, lead capture forms, and user flows designed to convert visitors into qualified leads.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <h3>Custom Built</h3>
              <p>Every site is uniquely crafted for your brand - no generic templates or cookie-cutter solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section"><div className="container grid-2">
        <div className="reveal"><h2 className="section-title">Custom Website Development</h2>
        <p>Custom architecture built around your offer mix, ideal buyer profile, and booking process so the website supports revenue goals, not just aesthetics.</p>
        <p>From ceramic coating specialists to mobile detailing services, we create sites that communicate your unique value proposition and justify premium pricing.</p></div>
        <div className="reveal" data-parallax="0.03">
          <figure className="image-tilt-card tilt-right">
            <img loading="lazy" src={highClassShot} alt="High Class Customs project screenshot" />
          </figure>
        </div>
      </div></section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Our Development Process</h2>
          <div className="process-steps reveal">
            <div className="process-step">
              <div className="process-number">1</div>
              <h3>Strategy Call</h3>
              <p>We learn about your business, goals, target market, and competitive positioning to inform every design decision.</p>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <h3>Wireframing</h3>
              <p>Before any design work, we map out the user journey and information architecture for maximum conversion.</p>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <h3>Visual Design</h3>
              <p>Custom designs that reflect your brand personality while optimizing for trust and conversion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section"><div className="container">
        <h2 className="section-title reveal">Advanced SEO Breakdown</h2>
        <div className="grid-2">
          <details className="card reveal" open><summary><strong>Technical SEO</strong></summary><p>Indexing controls, metadata discipline, canonical setup, and crawl structure aligned to long-term ranking stability.</p></details>
          <details className="card reveal"><summary><strong>Local SEO</strong></summary><p>Service + location relevance mapping to improve visibility for high-intent local searches in competitive markets.</p></details>
          <details className="card reveal"><summary><strong>Page Structure</strong></summary><p>Buyer-stage content hierarchy that answers key trust questions and moves visitors toward consultation or booking.</p></details>
          <details className="card reveal"><summary><strong>Core Web Vitals</strong></summary><p>Performance tuning across mobile and desktop to improve user experience and support stronger search performance.</p></details>
        </div>
      </div></section>

      <section className="section"><div className="container grid-2">
        <div className="card reveal"><h2>AI Chat Agent</h2><p>24/7 first-response support for lead qualification, objection handling, and clean routing into your booking process.</p></div>
        <div className="card reveal"><h3>WhatsApp Integration</h3><p>Low-friction conversation entry points that improve response speed and help capture intent before prospects drop off.</p><a className="btn btn-primary" href="https://wa.me/message/RVXNY4AJ4YEPK1" target="_blank" rel="noopener">Open WhatsApp Flow</a></div>
      </div></section>

      <section className="section"><div className="container section-image-row reveal">
        <div>
          <figure className="image-tilt-card tilt-left">
            <img loading="lazy" src={apexShot} alt="Apex Mobile project screenshot" />
          </figure>
        </div>
        <div>
          <figure className="image-tilt-card tilt-right">
            <img loading="lazy" src={blabShot} alt="B-Lab Auto project screenshot" />
          </figure>
        </div>
      </div></section>

      <section className="section"><div className="container cta-panel reveal">
        <h2 className="section-title">Need The Right Stack For Your Stage?</h2>
        <p>Tell us your revenue band and service focus. We will recommend the best build path.</p>
        <Link className="btn btn-primary" to="/contact">Request Your Demo </Link>
      </div></section>

      <a className="btn whatsapp-float" href="https://wa.me/message/RVXNY4AJ4YEPK1" target="_blank" rel="noopener">WhatsApp</a>
    </main>
  );
}
