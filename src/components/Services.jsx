import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Services.css';

const services = [
  {
    name: 'Music Production',
    img: '/placeholders/assets/musicproduction.jpg',
    details: 'Professional music production & Composition for all genres. Studio recording, mixing, mastering, songwriting, background music, sound effects and more.'
  },
  {
    name: 'Video Production',
    img: '/placeholders/assets/videoproduction.jpg',
    details: 'High-quality video shoots, editing, and post-production for music videos, events, and commercials.'
  },
  {
    name: 'Studio Setup',
    img: '/placeholders/assets/studiosetup.jpg',
    details: 'Complete studio design & setup including softwares, plugins and VSTs installation for music production.'
  },
  {
    name: 'YouTube Services',
    img: '/placeholders/assets/youtubeservices.jpg',
    details: 'YouTube channel management, Content creation & promotion, reels and shorts, live telecasts etc.'
  },
  {
    name: 'Distribution',
    img: '/placeholders/assets/distribution.jpg',
    details: 'Digital distribution of music & video contents to platforms like Spotify, Apple Music, YouTube, Instagram and more.'
  },
  {
    name: 'Organising Events',
    img: '/placeholders/assets/liveshow.jpg',
    details: 'Organizing and managing live music events, artists for concerts, and gigs.'
  },
  {
    name: 'Social media management',
    img: '/placeholders/assets/socialmedia.jpg',
    details: 'Social media management, content creation, and promotion for artists and brands.'
  },
  {
    name: 'Live Events Coverage',
    img: '/placeholders/assets/liveevent.jpg',
    details: 'Live Events Recording, Streaming, Editing, distribution, management.'
  },
  {
    name: 'Equipment Rental',
    img: '/placeholders/assets/rent.jpg',
    details: 'Rental services for professional audio and video equipment like Cameras, Microphones, Lighting, music instruments etc. for events, shoots, and productions.'
  }
];

const ServiceBox = ({ name, img, details }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`service-box${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      tabIndex={0}
      aria-label={`Show details for ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped(f => !f);
        }
      }}
    >
      <div className="service-box-inner">
        <div className="service-box-front">
          <img src={img} alt={name} className="service-img" />
          <div className="service-overlay">
            {!flipped && <>
              <div className="service-name">{name}</div>
              <div className="service-know">click to know more</div>
            </>}
            {flipped && (
              <div className="service-details service-details-centered">
                {details}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [ref, visible] = useReveal();
  
  return (
    <section className="services-container" id="services" ref={ref}>
      <h2 className={`services-heading section-heading ${visible ? 'reveal-visible' : ''}`}>Our Services</h2>
      <div className={`services-grid ${visible ? 'reveal-visible' : ''}`}>
        {services.map((service, idx) => (
          <ServiceBox key={idx} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
