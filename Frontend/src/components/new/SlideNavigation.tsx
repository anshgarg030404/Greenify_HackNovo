// SlideNavigation.tsx
import { motion, useTransform } from 'framer-motion';
import { useScroll } from 'framer-motion';

interface SlideNavigationProps {
  slides: any[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export const SlideNavigation = ({ slides, currentSlide, goToSlide }: SlideNavigationProps) => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="absolute left-8 top-1/2 flex -translate-y-1/2 flex-col gap-3"
      style={{
        opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
      }}
    >
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-10 w-10 rounded-full border-2 border-white text-sm font-medium transition-all duration-300 ${
            index === currentSlide
              ? 'scale-110 bg-white text-gray-900'
              : 'bg-black/30 text-white hover:bg-white/30 backdrop-blur-sm'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </motion.div>
  );
};