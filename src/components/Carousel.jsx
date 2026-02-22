import { useState, useRef, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Carousel.css';

const Carousel = ({ title, items, renderItem, loading = false }) => {
  const [ref, visible] = useReveal();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [visible, items]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="carousel-section" id={title.toLowerCase()} ref={ref}>
      <h2 className={`section-title carousel-title ${visible ? 'reveal-visible' : ''}`}>{title}</h2>
      <div className={`carousel-container ${visible ? 'reveal-visible' : ''}`}>
        {loading ? (
          <div className="carousel-loading">Loading...</div>
        ) : (
          <>
            <button 
              className={`carousel-btn carousel-btn-left ${!canScrollLeft ? 'hidden' : ''}`}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              ‹
            </button>
            
            <div className="carousel-track" ref={scrollRef} onScroll={checkScroll}>
              {items.map((item, index) => (
                <div key={item.id || index} className="carousel-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  {renderItem(item, index)}
                </div>
              ))}
            </div>
            
            <button 
              className={`carousel-btn carousel-btn-right ${!canScrollRight ? 'hidden' : ''}`}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Carousel;
