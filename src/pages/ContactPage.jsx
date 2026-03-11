import React from 'react';
import blabShot from '../assets/images/screencapture-b-labauto-netlify-app-2026-02-28-10_47_37.png';
export default function ContactPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container reveal">
          <h1>Request Your Demo Site</h1>
          <p>This form is for serious detailing business owners focused on stronger positioning, better-fit leads, and improved conversion performance.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card reveal">
            <h2>Demo Request Form</h2>
            <p>Share your current stage, services, and goals so we can prepare a tailored demo direction aligned to your market.</p>

            <form className="multi-step-form" data-multi-form noValidate>
              <input className="hidden" type="text" name="company_site" autoComplete="off" tabIndex="-1" />
              <input className="hidden" type="hidden" name="follow_up_trigger" value="demo_request_sequence_v1" />

              <div className="steps" aria-hidden="true"><div className="step active"></div><div className="step"></div><div className="step"></div></div>

              <section className="step-panel active" data-step-panel>
                <label htmlFor="name">Name</label><input id="name" name="name" required />
                <label htmlFor="business">Business Name</label><input id="business" name="business_name" required />
                <label htmlFor="website">Website (if existing)</label><input id="website" name="website" type="url" placeholder="https://" />
                <label htmlFor="revenue">Monthly Revenue Range</label>
                <select id="revenue" name="monthly_revenue" required>
                  <option value="">Select range</option><option>$0 - $10k</option><option>$10k - $30k</option><option>$30k - $70k</option><option>$70k+</option>
                </select>
                <button className="btn btn-primary" type="button" data-next>Next</button>
              </section>

              <section className="step-panel" data-step-panel>
                <label htmlFor="services">Services Offered</label><input id="services" name="services_offered" required placeholder="Ceramic coating, correction, interior, PPF, etc." />
                <label htmlFor="package">Preferred Package</label>
                <select id="package" name="preferred_package" required>
                  <option value="">Select package</option>
                  <option>Package 1 - Launch Page ($300 setup)</option>
                  <option>Package 2 - Starter Website ($500 setup + $99/month OR $1,500 one-time)</option>
                  <option>Package 3 - Growth Website ($1,500 setup + $149/month OR $3,500 one-time)</option>
                  <option>Package 4 - Premium Website ($3,000 setup + $299/month OR $7,000 one-time)</option>
                  <option>Package 5 - SEO Boost Plan ($400 setup + $129/month)</option>
                </select>
                <label htmlFor="goal">Primary Goal</label><textarea id="goal" name="goal" rows="4" required placeholder="Increase qualified consultations"></textarea>
                <label htmlFor="budget">Budget Range</label>
                <select id="budget" name="budget" required>
                  <option value="">Select budget</option><option>Under $500</option><option>$500 - $1k</option><option>$1k - $2k</option><option>$2k+</option><option>Prefer monthly model</option>
                </select>
                <div className="cta-row"><button className="btn btn-secondary" type="button" data-prev>Back</button><button className="btn btn-primary" type="button" data-next>Next</button></div>
              </section>

              <section className="step-panel" data-step-panel>
                <label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" required />
                <label htmlFor="email">Email</label><input id="email" name="email" type="email" required />
                <label><input type="checkbox" name="schedule_call" value="yes" /> Send me a scheduling link after submission</label>
                <div className="cta-row"><button className="btn btn-secondary" type="button" data-prev>Back</button><button className="btn btn-primary" type="submit">Submit Request</button></div>
              </section>

              <p data-form-result aria-live="polite"></p>
            </form>
          </div>

          <aside className="card reveal" data-parallax="0.03">
            <h3>What Happens Next</h3>
            <p><strong>Step 1:</strong> Qualification review and fit check.</p>
            <p><strong>Step 2:</strong> Demo direction with conversion recommendations.</p>
            <p><strong>Step 3:</strong> Scheduling invitation and roadmap call.</p>
            <p>Typical response window is 24-48 business hours.</p>
            <figure className="image-tilt-card tilt-right" style={{ marginTop: '10px' }}>
              <img loading="lazy" src={blabShot} alt="Project sample screenshot" />
            </figure>
            <a className="btn btn-secondary" href="https://calendly.com/detailingwebstudio360/30min" target="_blank" rel="noopener">Open Scheduling</a>
          </aside>
        </div>
      </section>
    </main>
  );
}
