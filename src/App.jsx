import { useState } from 'react';
import './App.css';
import logo from '../logo.png';
import callIcon from '../call.png';
import whatsappIcon from '../whatsapp.png';
import instagramIcon from '../insta.png';
import tiktokIcon from '../tiktok.png';
import glassesImage from '../glasses.jpeg';

const services = [
  ['thumb-one', '01', 'Birthdays & celebrations', 'Curated personal events with tailored planning, coordination, and guest experience.'],
  ['thumb-two', '02', 'Corporate events', 'Brand launches, conferences, executive dinners, and unforgettable corporate moments.'],
  ['thumb-three', '03', 'Festivals & activations', 'Large-scale operations, crowd flow, branding, and live event execution.'],
];

const products = [
  { id: 'caps', category: 'apparel', method: 'VINYL', name: 'Caps', description: 'Structured caps finished with a durable cut-vinyl logo application.', spec: 'One size · Adjustable strap', qty: 10 },
  { id: 'tops', category: 'apparel', method: 'SUBLIMATION', name: 'Tops', description: 'Choose a sleeve badge or full-colour chest or back print up to A4.', spec: 'Sizes S–3XL · Polyester · Sleeve badge, chest or back', qty: 12 },
  { id: 'mugs', category: 'drinkware', method: 'SUBLIMATION', name: 'Mugs', description: 'Full-wrap, dishwasher-safe colour print for desk gifting.', spec: '330ml · White or two-tone', qty: 20 },
  { id: 'plates', category: 'drinkware', method: 'SUBLIMATION', name: 'Plates', description: 'Full-colour ceramic plate printing for a table gift or display piece.', spec: 'Ceramic · Up to 8-inch (20cm)', qty: 10 },
  { id: 'tumblers', category: 'drinkware', method: 'SUBLIMATION', name: 'Tumblers', description: 'Full-wrap colour print on stainless steel tumblers.', spec: '500ml · Several colour options', qty: 15 },
  { id: 'glass-containers', category: 'drinkware', method: 'VINYL', name: 'Glass Containers', description: 'Custom cut-vinyl decals for jars, bottles, and containers.', spec: 'Various sizes · Durable, weatherproof finish', qty: 10 },
  { id: 'water-bottles', category: 'everyday', method: 'SUBLIMATION', name: 'Water Bottles', description: 'Practical branded bottles for teams on the move.', spec: 'Aluminium · Various sizes', qty: 20 },
  { id: 'coasters', category: 'everyday', method: 'SUBLIMATION', name: 'Coasters', description: 'A useful branded desk or table gift.', spec: 'Set of 4 · Cork backed', qty: 20 },
  { id: 'mouse-pads', category: 'everyday', method: 'SUBLIMATION', name: 'Mouse Pads', description: 'A branded everyday essential for office teams.', spec: 'Standard desk size', qty: 20 },
  { id: 'keyrings', category: 'everyday', method: 'SUBLIMATION', name: 'Keyrings', description: 'Small, memorable branded gifts for guests and staff.', spec: 'Round or rectangle', qty: 30 },
  { id: 'luggage-tags', category: 'everyday', method: 'SUBLIMATION', name: 'Luggage Tags', description: 'Personalised tags for travel, teams, and events.', spec: 'PVC or aluminium', qty: 20 },
  { id: 'aprons', category: 'everyday', method: 'SUBLIMATION', name: 'Catering Aprons', description: 'Branded aprons for hospitality teams and functions.', spec: 'A4 print panel', qty: 10 },
  { id: 'tote-bags', category: 'everyday', method: 'SUBLIMATION', name: 'Tote Bags', description: 'Reusable branded carry bags for teams and guests.', spec: 'A4 print panel', qty: 25 },
  { id: 'ornaments', category: 'everyday', method: 'SUBLIMATION', name: 'Festive Ornaments', description: 'Seasonal keepsakes for year-end gifting.', spec: 'Wood · Ball, heart, or stocking', qty: 20 },
  { id: 'award-panels', category: 'everyday', method: 'SUBLIMATION', name: 'Photo & Award Panels', description: 'Personalised display pieces for recognition and celebration.', spec: 'Up to A4 size', qty: 10 },
  { id: 'mini-puzzles', category: 'everyday', method: 'SUBLIMATION', name: 'Mini Puzzles', description: 'Custom sublimation jigsaws for playful gifting.', spec: 'A5–A4', qty: 20 },
  { id: 'fridge-magnets', category: 'everyday', method: 'SUBLIMATION', name: 'Fridge Magnets', description: 'Small branded reminders that stay on display.', spec: 'Round or rectangle', qty: 30 },
  { id: 'pens', category: 'everyday', method: 'SUBLIMATION', name: 'Pens', description: 'Practical branded stationery with a premium finish.', spec: 'Metal-insert barrel', qty: 30 },
];

const featured = [
  ['Custom Caps', 'Vinyl branding'], ['Mugs', 'Sublimation print'], ['Tumblers', 'Corporate gifting'], ['Tote Bags', 'Event merchandise'], ['Water Bottles', 'Branding'],
];

function ProductCard({ product, selected, toggleProduct, changeQuantity }) {
  const item = selected[product.id] || { checked: false, qty: product.qty };

  return <article className={`catalog-card ${item.checked ? 'selected-active' : ''}`} data-category={product.category}>
    <span className="card-method">{product.method}</span>
    <label className="select-container"><input type="checkbox" checked={item.checked} onChange={() => toggleProduct(product.id)} /><span className="custom-checkmark" /></label>
    <h4>{product.name}</h4><p>{product.description}</p><p className="product-spec">{product.spec}</p>
    <div className="quantity-input-wrapper"><label htmlFor={`${product.id}-quantity`}>Qty:</label><input id={`${product.id}-quantity`} type="number" className="item-qty-input" min="1" value={item.qty} disabled={!item.checked} onChange={(event) => changeQuantity(product.id, event.target.value)} /></div>
  </article>;
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleProduct = (id) => setSelected((current) => ({
    ...current,
    [id]: { checked: !current[id]?.checked, qty: current[id]?.qty || products.find((product) => product.id === id).qty },
  }));

  const changeQuantity = (id, value) => setSelected((current) => ({
    ...current,
    [id]: { ...current[id], qty: Math.max(1, Number.parseInt(value, 10) || 1) },
  }));

  const manifest = products.filter((product) => selected[product.id]?.checked)
    .map((product) => `${product.name}: ${selected[product.id].qty}`).join(', ');

  return <>
    <div className="custom-cursor" aria-hidden="true" />
    <header className={`navbar ${navOpen ? 'nav-active' : ''}`}>
      <a className="logo-container" href="#hero" aria-label="FunClub home"><img src={logo} alt="FunClub Logo" className="brand-logo" /><span className="logo-text">Fun<span>Club</span></span></a>
      <div className="header-contact-nodes" aria-label="Social and contact links">
        <a className="contact-icon-link" href="tel:+27732642726" aria-label="Call us" title="Call us"><img src={callIcon} alt="" /></a>
        <a className="contact-icon-link" href="https://wa.me/27732642726" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><img src={whatsappIcon} alt="" /></a>
        <a className="contact-icon-link" href="https://www.instagram.com/_fun_club321/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><img src={instagramIcon} alt="" /></a>
        <a className="contact-icon-link" href="https://www.tiktok.com/@YOUR_USERNAME" target="_blank" rel="noreferrer" aria-label="TikTok" title="TikTok"><img src={tiktokIcon} alt="" /></a>
      </div>
      <button className="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded={navOpen} onClick={() => setNavOpen((open) => !open)}><span className="hamburger" /></button>
    </header>

    <nav className={`nav-overlay ${navOpen ? 'open' : ''}`} aria-label="Main navigation"><ul className="nav-links">
      {[['hero', 'Home'], ['services', 'Services'], ['merch', 'Branding'], ['contact', 'Contact']].map(([id, label]) => <li key={id}><a className="nav-link-item" href={`#${id}`} onClick={() => setNavOpen(false)}>{label}</a></li>)}
    </ul><div className="nav-footer"><p>funclub.co.za</p><p>Johannesburg, South Africa</p></div></nav>

    <main>
      <section id="hero" className="hero-section"><div className="section-container hero-layout"><div className="hero-copy">
        <p className="eyebrow">Events • branding • gifting</p>
        <h1 className="hero-title"><span className="hero-line"><span className="fun-letter">F</span>lawless Planning.</span><span className="hero-line"><span className="fun-letter">U</span>nforgettable Branding.</span><span className="hero-line"><span className="fun-letter">N</span>eat execution.</span></h1>
        <p className="hero-text">We are passionate about creating the event of your dreams, quality branded merchandise, and personalised gifting for every occasion. Our team ensures every detail is intentional and memorable for your every need. Anytime. Anywhere.</p>
        <div className="hero-actions"><a href="#services" className="cta-button">Explore services</a><a href="#contact" className="cta-button secondary">Request quote</a></div>
      </div><div className="hero-visual" aria-label="Event photography collage"><div className="photo-grid"><div className="photo-card card-one" /><div className="photo-card card-two" /><div className="photo-card card-three" /><div className="photo-card card-four" /></div></div></div></section>

      <section id="services" className="services-section"><div className="section-container"><p className="section-subtitle">What we do</p><h2 className="section-title">Event services</h2><div className="services-shell"><div className="service-list">{services.map(([thumb, number, title, description]) => <article className="service-card" key={title}><div className={`service-thumb ${thumb}`} /><div className="service-copy"><div className="service-num">{number}</div><h3>{title}</h3><p>{description}</p></div></article>)}</div><aside className="service-spotlight"><div className="spotlight-image" /><div className="spotlight-copy"><p className="mini-label">Signature approach</p><h3>Designed for atmosphere.</h3><p>We build experiences that feel intentional, premium, and layered with detail from planning to execution.</p></div></aside></div></div></section>

      <section className="featured-carousel"><div className="section-container"><div className="carousel-header"><p className="section-subtitle">Featured</p><h2 className="section-title">Popular Print Pieces</h2></div><div className="carousel-container"><button className="carousel-btn" type="button" aria-label="Previous products">❮</button><div className="carousel-track">{featured.map(([title, description]) => <article className="featured-item" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div><button className="carousel-btn" type="button" aria-label="Next products">❯</button></div></div></section>

      <section id="merch" className="merch-section"><div className="section-container"><p className="section-subtitle">Fun Club customization</p><h2 className="section-title">Sublimation &amp; vinyl printing</h2><p className="catalog-lead">Sublimation &amp; vinyl printing on caps, tops, mugs, tumblers, plates and glass for your team and your event.</p><p className="merch-intro-text">Fun Club prints and personalises apparel and gifts for corporate year-end functions — from staff uniforms to desk gifts your team will actually keep. We keep it simple and reliable: every item below is finished with full-colour sublimation or a durable cut-vinyl application, and every order is quoted to your quantity and artwork.</p><div className="process-grid"><article><span>01</span><h3>Choose</h3><p>Pick products and quantities from this catalogue.</p></article><article><span>02</span><h3>Send artwork</h3><p>Share your logo — AI, PDF, EPS or high-res PNG.</p></article><article><span>03</span><h3>Print &amp; deliver</h3><p>We print, quality-check and deliver to your office or venue.</p></article></div><div className="catalog-header"><div><p className="mini-label">EST 2022</p><h3>Product catalogue</h3></div><div className="catalog-filters">{['all', 'apparel', 'drinkware', 'everyday'].map((category) => <button key={category} type="button" data-cat={category} className={`catalog-filter-btn ${filter === category ? 'active' : ''}`} onClick={() => setFilter(category)}>{category === 'all' ? 'All items' : category}</button>)}</div></div><div className="catalog-group"><h3>Branded Apparel <span>02 items</span></h3><div className="catalog-grid">{products.filter((product) => (filter === 'all' || filter === 'apparel') && product.category === 'apparel').map((product) => <ProductCard key={product.id} product={product} selected={selected} toggleProduct={toggleProduct} changeQuantity={changeQuantity} />)}</div></div><div className="catalog-group"><h3>Drinkware &amp; Tableware <span>04 items</span></h3><div className="catalog-grid">{products.filter((product) => (filter === 'all' || filter === 'drinkware') && product.category === 'drinkware').map((product) => <ProductCard key={product.id} product={product} selected={selected} toggleProduct={toggleProduct} changeQuantity={changeQuantity} />)}</div></div><div className="catalog-group"><h3>Everyday &amp; Gifting <span>12 items</span></h3><div className="catalog-grid">{products.filter((product) => (filter === 'all' || filter === 'everyday') && product.category === 'everyday').map((product) => <ProductCard key={product.id} product={product} selected={selected} toggleProduct={toggleProduct} changeQuantity={changeQuantity} />)}</div></div><aside className="seasonal-note">❖ Booking for December? Year-end is our busiest season. As a general rule, place corporate orders at least 4–6 weeks before your function date to guarantee delivery — get in touch early to lock in your slot.</aside><div className="catalog-contact"><p className="section-subtitle">Let&apos;s brand your year-end function</p><p>Pricing is quoted per order, based on quantity, branding method and turnaround — get in touch for a tailored quote.</p><p><a href="mailto:funclubalberton@gmail.com">Email funclubalberton@gmail.com</a> <a href="tel:+27730867148">Phone 073 086 7148</a> <span>Alberton, Gauteng</span></p></div></div></section>

      <section className="merch-gallery-section"><div className="section-container"><p className="section-subtitle">Glass sublimation</p><h2 className="section-title">Branded drinkware, made to keep.</h2><div className="merch-gallery"><figure><img src={glassesImage} alt="Custom glass sublimation example" /><figcaption>Glass sublimation</figcaption></figure></div></div></section>

      <section id="contact" className="contact-section"><div className="section-container"><p className="section-subtitle">Get in touch</p><h2 className="section-title">Request a quote</h2><form id="mainContactForm" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><textarea id="message" placeholder="Tell us what you need..." defaultValue={manifest} /><button type="submit">{submitted ? 'Request received' : 'Send request'}</button></form></div></section>
    </main>
    <footer className="site-footer"><div className="footer-content"><p>funclub | Events & Custom Branding</p><p>funclub.co.za</p><p>Johannesburg, South Africa</p></div></footer>
  </>;
}

export default App;
