import React from 'react';
import { Link } from 'react-router-dom';
import apexShot from '../assets/images/screencapture-apexmobiledetailing-netlify-app-2026-02-28-10_49_11.png';
import highClassShot from '../assets/images/screencapture-high-class-customs-netlify-app-2026-02-28-10_48_35.png';

export default function AboutPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container hero-glow">
          <span className="kicker"><span className="kicker-dot"></span>Built For One Market: Premium Detailers</span>
          <h1>Built For One Market: Premium Detailers</h1>
          <p>We are not a generalist web agency. We focus exclusively on detailing businesses that compete on quality, craftsmanship, and premium service value.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section"><div className="container grid-2">
        <article className="card reveal">
          <h2>Mission</h2>
          <p>Build conversion-grade digital systems that match the quality of your work and support long-term business growth through stronger positioning and better-fit lead flow. We help premium detailers attract clients who value craftsmanship over price.</p>
          <p>Every website we build is engineered to position your brand as the obvious choice in your market—drawing in high-value customers who appreciate the difference between generic and genuinely premium service.</p>
        </article>
        <div className="reveal"><figure className="image-tilt-card tilt-right"><img loading="lazy" src={highClassShot} alt="High Class Customs screenshot" /></figure></div>
      </div></section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Our Core Values</h2>
          <div className="values-grid reveal">
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3>Excellence Over Scale</h3>
              <p>We deliberately limit our client roster to maintain exceptional quality. Every project receives focused attention from strategy through launch and beyond.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3>Long-Term Partnership</h3>
              <p>We build relationships, not transactions. Our success is measured by your growth over years, not just initial launch metrics.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Results-Driven Approach</h3>
              <p>Every design decision ties back to business outcomes. We optimize for lead quality, conversion rates, and revenue growth—not just aesthetics.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Industry Specialization</h3>
              <p>Deep expertise in auto detailing means we understand your customers, your sales process, and what drives decisions in your specific market.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section"><div className="container grid-2">
        <div className="reveal"><figure className="image-tilt-card tilt-left"><img loading="lazy" src={apexShot} alt="Apex Mobile screenshot" /></figure></div>
        <article className="card reveal">
          <h2>Why Detailers Choose Us</h2>
          <p>High-ticket detailing buyers do not convert from generic messaging. They need service clarity, visible expertise, and trust signals that justify premium pricing.</p>
          <p>We understand that your website is often the first interaction potential clients have with your brand. That first impression must communicate quality, professionalism, and the exceptional value you deliver.</p>
          <p>Unlike generalist agencies, we speak your language. We understand ceramic coating specifications, paint correction grades, PPF technology, and the detailing industry sales cycle.</p>
        </article>
      </div></section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Our Methodology</h2>
          <div className="process-steps reveal">
            <div className="process-step">
              <div className="process-number">1</div>
              <h3>Discovery & Strategy</h3>
              <p>We dive deep into your business, analyzing your market position, ideal customer profile, competitive landscape, and revenue goals to build a strategic foundation.</p>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <h3>Conversion-Focused UX</h3>
              <p>Every page, section, and element is designed to guide visitors toward consultation requests. We optimize the user journey from first impression to conversion.</p>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <h3>Performance Development</h3>
              <p>Built with modern technologies for lightning-fast load times, perfect Core Web Vitals, and seamless user experience across all devices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <article className="card reveal">
              <h2>SEO Architecture</h2>
              <p>Technical SEO implementation designed for local ranking success. Service + location pages, proper schema markup, and content structure that search engines reward.</p>
            </article>
            <article className="card reveal">
              <h2>Ongoing Refinement</h2>
              <p>Post-launch optimization based on real performance data. We continuously test, iterate, and improve to maximize your lead flow over time.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-panel reveal">
          <h2 className="section-title">Work With A Growth-Focused Detailing Partner</h2>
          <p>If your goal is stronger local authority and better lead quality, we can map the right website system for your current stage.</p>
          <Link className="btn btn-primary" to="/contact">Request Demo </Link>
        </div>
      </section>
    </main>
  );
}
