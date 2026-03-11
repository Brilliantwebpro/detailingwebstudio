import React from 'react';
import { Link } from 'react-router-dom';
import apexShot from '../assets/images/screencapture-apexmobiledetailing-netlify-app-2026-02-28-10_49_11.png';
import highClassShot from '../assets/images/screencapture-high-class-customs-netlify-app-2026-02-28-10_48_35.png';
import blabShot from '../assets/images/screencapture-b-labauto-netlify-app-2026-02-28-10_47_37.png';

export default function HomePage() {
  return (
    <main>
      <section className="hero section hero-glow">
        <div className="container hero-grid">
          <div className="reveal">
            <span className="kicker"><span className="kicker-dot"></span>Built for premium detailers only</span>
            <h1>We Build High-End Detailing Websites That Attract High-Value Clients</h1>
            <p>Detailing Web Studio is a boutique agency focused exclusively on premium auto detailing businesses. We create luxury-grade digital experiences for ceramic coating, paint correction, and elite detailing studios that need better clients, stronger authority, and predictable lead flow.</p>
            <p>Our approach combines conversion architecture, advanced SEO, and automation systems so your website does more than look good - it drives real business results.</p>
            <div className="cta-row">
              <Link className="btn btn-primary" to="/contact">Request a Demo</Link>
              <Link className="btn btn-secondary" to="/demos">View Our Work</Link>
            </div>
          </div>
          <aside className="hero-panel reveal" data-parallax="0.04" aria-label="Performance metrics">
            <h3>High-Performance Build Stack</h3>
            <p>Every build is engineered around visibility, trust, and conversion performance.</p>
            <div className="metric-grid">
              <div className="metric"><strong>90+</strong><span>PageSpeed Score</span></div>
              <div className="metric"><strong>SEO-first</strong><span>Service + location architecture</span></div>
              <div className="metric"><strong>Lead flow</strong><span>Qualified form and chat capture</span></div>
              <div className="metric"><strong>Schema</strong><span>Rich-result technical implementation</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="authority-strip">
        <div className="container strip-grid">
          <div className="strip-item"><strong>Built exclusively for detailers</strong><p>No generic agency strategy.</p></div>
          <div className="strip-item"><strong>Conversion-focused builds</strong><p>CTA placement and offer framing.</p></div>
          <div className="strip-item"><strong>SEO optimized</strong><p>Local clusters and indexing foundations.</p></div>
          <div className="strip-item"><strong>Performance optimized</strong><p>Lean code and Core Web Vitals minded delivery.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="container split-visual-section reveal">
          <div>
            <span className="kicker"><span className="kicker-dot"></span>Recent Project Snapshots</span>
            <h2 className="section-title">Premium Detailing Websites, Presented With Depth</h2>
            <p>We combine refined layout design with strong visual storytelling so every project reinforces brand quality before a visitor reads a single line of copy.</p>
            <p>The goal is simple: create immediate trust, premium perception, and clearer pathways to inquiry that convert browsers into booked clients.</p>
            <div className="cta-row">
              <Link className="btn btn-primary" to="/demos">See Full Showcase</Link>
            </div>
          </div>
          <div className="split-visual-stack" aria-label="3D project screenshots">
            <figure className="visual-layer layer-1">
              <img loading="lazy" src={apexShot} alt="Apex Mobile Detailing full-page screenshot" />
            </figure>
            <figure className="visual-layer layer-2">
              <img loading="lazy" src={highClassShot} alt="High Class Customs full-page screenshot" />
            </figure>
            <figure className="visual-layer layer-3">
              <img loading="lazy" src={blabShot} alt="B-Lab Auto full-page screenshot" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="featured-demos">
        <div className="container">
          <h2 className="section-title reveal">Featured Live Website Builds</h2>
          <p className="section-intro reveal">Explore active projects built for distinct detailing niches, each structured to attract better-fit clients and support higher-value bookings with conversion-optimized pathways.</p>
          <div className="showcase-grid">
            <article className="showcase-card demo-card reveal">
              <div className="showcase-head"><h3>Apex Mobile Detailing</h3><span className="showcase-tag">Mobile</span></div>
              <p>Mobile-detailing focused build with rapid quote and location-based trust flow designed for on-the-go service customers.</p>
              <div className="project-mockup">
                <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://apexmobiledetailing.netlify.app/" alt="Apex preview" /></div>
              </div>
              <p className="project-url">apexmobiledetailing.netlify.app</p>
              <div className="cta-row"><a className="btn btn-secondary" href="https://apexmobiledetailing.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
            </article>
            <article className="showcase-card demo-card reveal">
              <div className="showcase-head"><h3>High Class Customs</h3><span className="showcase-tag">Luxury</span></div>
              <p>Luxury detailing presentation designed for premium positioning and authority that commands higher price points.</p>
              <div className="project-mockup">
                <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://high-class-customs.netlify.app/" alt="High Class preview" /></div>
              </div>
              <p className="project-url">high-class-customs.netlify.app</p>
              <div className="cta-row"><a className="btn btn-secondary" href="https://high-class-customs.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
            </article>
            <article className="showcase-card demo-card reveal">
              <div className="showcase-head"><h3>B-Lab Auto</h3><span className="showcase-tag">Coating</span></div>
              <p>Coating-led trust architecture and booking structure built for qualified inquiries and premium service positioning.</p>
              <div className="project-mockup">
                <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://b-labauto.netlify.app/" alt="B-Lab preview" /></div>
              </div>
              <p className="project-url">b-labauto.netlify.app</p>
              <div className="cta-row"><a className="btn btn-secondary" href="https://b-labauto.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
            </article>
            <article className="showcase-card demo-card reveal">
              <div className="showcase-head"><h3>PPF Pro</h3><span className="showcase-tag">PPF</span></div>
              <p>Technical PPF offer framing with a clear high-intent conversion journey from awareness to consultation.</p>
              <div className="project-mockup">
                <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://ppfpro.netlify.app/" alt="PPF preview" /></div>
              </div>
              <p className="project-url">ppfpro.netlify.app</p>
              <div className="cta-row"><a className="btn btn-secondary" href="https://ppfpro.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <h2 className="section-title reveal">Investment Options</h2>
          <p className="section-intro reveal">Popular packages are shown below. View the Services page for the complete pricing lineup and package details.</p>
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
          </div>
          <div className="cta-row reveal">
            <Link className="btn btn-secondary" to="/services">View Full Pricing</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel reveal glow-accent">
            <h2 className="section-title">Request Your Demo Site</h2>
            <p>Tell us your market, service mix, and goals. We'll prepare a custom demo tailored to your specific business needs.</p>
            <form className="form" action="#" method="post">
              <label htmlFor="home-email">Business Email</label>
              <input id="home-email" type="email" name="email" required />
              <button className="btn btn-primary" type="submit">Request a Demo</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
