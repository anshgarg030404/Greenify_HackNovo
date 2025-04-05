import { motion, useTransform, useScroll } from 'framer-motion';
import { SlideNavigation } from './SlideNavigation';
import { ScrollButton } from './ScrollButton';

interface HeroSectionProps {
  slides: any[];
  currentSlide: number;
  goToSlide: (index: number) => void;
  scrollToNextSection: () => void;
}

export const HeroSection = ({
  slides,
  currentSlide,
  goToSlide,
  scrollToNextSection,
}: HeroSectionProps) => {
  const { scrollYProgress } = useScroll();
  
  // Enhanced scroll transformations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.div
      className="relative h-screen w-full snap-start min-h-[600px]"
      style={{ 
        opacity: heroOpacity,
        scale: heroScale,
        transformOrigin: 'center'
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute h-full w-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
              transition: { 
                duration: 0.8, 
                ease: [0.645, 0.045, 0.355, 1.0] // Custom cubic-bezier for smoother easing
              }
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover brightness-90"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60">
              <div className="flex h-full items-center justify-center px-4">
                <div className="text-center text-white max-w-3xl">
                  <motion.h1
                    className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      transition: { 
                        duration: 0.8, 
                        ease: "easeOut",
                        delay: 0.2 
                      }
                    }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl lg:text-2xl font-light"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      transition: { 
                        duration: 0.8, 
                        ease: "easeOut",
                        delay: 0.4 
                      }
                    }}
                  >
                    {slide.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide Navigation - Positioned at bottom center */}
      <div className="absolute bottom-16 left-0 right-0">
        <SlideNavigation 
          slides={slides} 
          currentSlide={currentSlide} 
          goToSlide={goToSlide}
        />
      </div>

      {/* Scroll Button - Enhanced positioning */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <ScrollButton 
          onClick={scrollToNextSection}
        />
      </div>
    </motion.div>
  );
};