import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Droplets, Zap, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);
  
  const products = [
    {
      image: "/solar_panel.png",
      title: "Solar Panels",
      description: "High-efficiency solar panels to power your home with clean energy from the sun. Our premium solar panels deliver maximum energy conversion and are built to withstand all weather conditions for decades of reliable performance.",
      icon: <Sun className="h-6 w-6 text-yellow-500 mr-2" />,
      badge: { text: "Popular", color: "bg-green-500" }
    },
    {
      image: "/water_systems.png",
      title: "Rain Water Harvesting Systems",
      description: "Rainwater harvesting and greywater recycling systems for water conservation. Reduce your water footprint and utility bills with our integrated water management solutions designed for modern homes.",
      icon: <Droplets className="h-6 w-6 text-blue-500 mr-2" />
    },
    
    {
      image: "/more.png",
      title: "Many More coming soon...",
      description: "Stay tuned for new green energy solutions coming to our catalog. We're constantly innovating and expanding our product line to help you create a more sustainable home.",
      icon: <Zap className="h-6 w-6 text-yellow-500 mr-2" />,
      badge: { text: "New", color: "bg-blue-500" }
    }
  ];
  
  // Auto sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000); // Slide every 6 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);
  
  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (slideRef.current) {
      slideRef.current.style.transition = 'transform 0.8s ease-in-out';
      slideRef.current.style.transform = 'translateX(-100%)';
      
      setTimeout(() => {
        slideRef.current.style.transition = 'none';
        slideRef.current.style.transform = 'translateX(0)';
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        setIsTransitioning(false);
      }, 800);
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (slideRef.current) {
      slideRef.current.style.transition = 'none';
      slideRef.current.style.transform = 'translateX(-100%)';
      
      setTimeout(() => {
        slideRef.current.style.transition = 'transform 0.8s ';
        slideRef.current.style.transform = 'translateX(0)';
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
        setIsTransitioning(false);
      }, 50);
    }
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    if (index > currentIndex) {
      // Going forward
      setIsTransitioning(true);
      
      if (slideRef.current) {
        slideRef.current.style.transition = 'transform 0.8s ease-in-out';
        slideRef.current.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          slideRef.current.style.transition = 'none';
          slideRef.current.style.transform = 'translateX(0)';
          setCurrentIndex(index);
          setIsTransitioning(false);
        }, 800);
      }
    } else {
      // Going backward
      setIsTransitioning(true);
      
      if (slideRef.current) {
        slideRef.current.style.transition = 'none';
        slideRef.current.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          slideRef.current.style.transition = 'transform 0.8s ease-in-out';
          slideRef.current.style.transform = 'translateX(0)';
          setCurrentIndex(index);
          setIsTransitioning(false);
        }, 50);
      }
    }
  };
  
  // Get current and next product for smooth transition
  const currentProduct = products[currentIndex];
  const nextProduct = products[(currentIndex + 1) % products.length];
  
  return (
    <section className="py-20 w-full h-screen grid place-content-center bg-green-50">
      <div className="container mx-automax-w-6xl">
        
        <div className="relative w-[86vw]">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div ref={slideRef} className="relative flex">
              {/* Current Product */}
              <div className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row bg-white">
                  <div className="w-full md:w-1/2 md:h-[80vh] relative overflow-hidden">
                    <img 
                      src={currentProduct.image}
                      alt={currentProduct.title} 
                      className="w-full h-full "
                    />
                    {currentProduct.badge && (
                      <div className={`absolute top-4 right-4 ${currentProduct.badge.color} text-white text-sm font-bold px-3 py-1 rounded-lg`}>
                        {currentProduct.badge.text}
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-3">
                        {currentProduct.icon}
                      </div>
                      <h3 className="font-bold text-2xl md:text-3xl text-gray-800">{currentProduct.title}</h3>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">{currentProduct.description}</p>
                    <Link to="/products" className="text-green-700 font-medium text-lg hover:text-green-800 inline-flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Next Product (for smooth transition) */}
              <div className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row bg-white">
                  <div className="w-full md:w-1/2 h-64 md:h-96 relative overflow-hidden">
                    <img 
                      src={nextProduct.image}
                      alt={nextProduct.title} 
                      className="w-full h-full object-cover"
                    />
                    {nextProduct.badge && (
                      <div className={`absolute top-4 right-4 ${nextProduct.badge.color} text-white text-sm font-bold px-3 py-1 rounded-lg`}>
                        {nextProduct.badge.text}
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-3">
                        {nextProduct.icon}
                      </div>
                      <h3 className="font-bold text-2xl md:text-3xl text-gray-800">{nextProduct.title}</h3>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">{nextProduct.description}</p>
                    <Link to="/products" className="text-green-700 font-medium text-lg hover:text-green-800 inline-flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none z-10 disabled:opacity-50"
            aria-label="Previous product"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none z-10 disabled:opacity-50"
            aria-label="Next product"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`mx-2 w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-green-600 w-6' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </div>
    
      </div>
    </section>
  );
};

export default ProductCarousel;