import React from 'react';
import { Link } from 'react-router-dom';
import apexShot from '../assets/images/screencapture-apexmobiledetailing-netlify-app-2026-02-28-10_49_11.png';
import highClassShot from '../assets/images/screencapture-high-class-customs-netlify-app-2026-02-28-10_48_35.png';
import blabShot from '../assets/images/screencapture-b-labauto-netlify-app-2026-02-28-10_47_37.png';

export default function DemosPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container reveal">
          <h1>Live Website Showcase</h1>
          <p>Explore live websites built for premium detailing businesses, each designed around clarity, trust, and stronger conversion pathways.</p>
        </div>
      </section>

      <section className="section"><div className="container">
        <h2 className="section-title reveal">Filter By Niche</h2>
        <div className="filter-row reveal">
          <button className="filter-btn active" data-filter="all" type="button">All</button>
          <button className="filter-btn" data-filter="luxury" type="button">Luxury</button>
          <button className="filter-btn" data-filter="mobile" type="button">Mobile</button>
          <button className="filter-btn" data-filter="coating" type="button">Coating</button>
          <button className="filter-btn" data-filter="ppf" type="button">PPF</button>
        </div>
      </div></section>

      <section className="section">
        <div className="container split-visual-section reveal">
          <div>
            <h2 className="section-title">Premium 3D Preview Wall</h2>
            <p>Project visuals are presented in a layered composition to create a stronger editorial feel and premium brand impression.</p>
            <p>Use this section for visual trust, then open each live site below for deeper review.</p>
          </div>
          <div className="split-visual-stack" aria-label="3D screenshot wall">
            <figure className="visual-layer layer-1">
              <img loading="lazy" src={apexShot} alt="Apex Mobile screenshot wall" />
            </figure>
            <figure className="visual-layer layer-2">
              <img loading="lazy" src={highClassShot} alt="High Class screenshot wall" />
            </figure>
            <figure className="visual-layer layer-3">
              <img loading="lazy" src={blabShot} alt="B-Lab screenshot wall" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section"><div className="container"><div className="showcase-grid">
        <article className="showcase-card demo-card reveal" data-demo-item data-type="mobile">
          <div className="showcase-head"><h3>Apex Mobile Detailing</h3><span className="showcase-tag">Mobile</span></div>
          <p>Mobile-detailing build focused on rapid quote flow, service-area clarity, and trust-first messaging.</p>
          <div className="project-mockup">
            <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://apexmobiledetailing.netlify.app/" alt="Apex preview" /></div>
          </div>
          <p className="project-url">apexmobiledetailing.netlify.app</p>
          <div className="cta-row"><a className="btn btn-primary" href="https://apexmobiledetailing.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
        </article>
        <article className="showcase-card demo-card reveal" data-demo-item data-type="luxury">
          <div className="showcase-head"><h3>High Class Customs</h3><span className="showcase-tag">Luxury</span></div>
          <p>Luxury detailing presentation built to reinforce premium positioning and perceived service value.</p>
          <div className="project-mockup">
            <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://high-class-customs.netlify.app/" alt="High Class preview" /></div>
          </div>
          <p className="project-url">high-class-customs.netlify.app</p>
          <div className="cta-row"><a className="btn btn-primary" href="https://high-class-customs.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
        </article>
        <article className="showcase-card demo-card reveal" data-demo-item data-type="coating">
          <div className="showcase-head"><h3>B-Lab Auto</h3><span className="showcase-tag">Coating</span></div>
          <p>Coating-led architecture with educational content and booking structure tuned for qualified inquiries.</p>
          <div className="project-mockup">
            <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://b-labauto.netlify.app/" alt="B-Lab preview" /></div>
          </div>
          <p className="project-url">b-labauto.netlify.app</p>
          <div className="cta-row"><a className="btn btn-primary" href="https://b-labauto.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
        </article>
        <article className="showcase-card demo-card reveal" data-demo-item data-type="ppf">
          <div className="showcase-head"><h3>PPF Pro</h3><span className="showcase-tag">PPF</span></div>
          <p>Technical PPF offer framing with a clear conversion path from awareness to consultation request.</p>
          <div className="project-mockup">
            <div className="device-desktop"><div className="browser-top"><span></span><span></span><span></span></div><img loading="lazy" src="https://image.thum.io/get/width/1400/noanimate/https://ppfpro.netlify.app/" alt="PPF preview" /></div>
          </div>
          <p className="project-url">ppfpro.netlify.app</p>
          <div className="cta-row"><a className="btn btn-primary" href="https://ppfpro.netlify.app/" target="_blank" rel="noopener">View Live Site</a></div>
        </article>
      </div></div></section>

      <section className="section"><div className="container cta-panel reveal"><h2 className="section-title">Want Your Own Showcase-Ready Site?</h2><Link className="btn btn-primary" to="/contact">Request Your Custom Demo</Link></div></section>

    </main>
  );
}
