// ScrollButton.tsx
import { motion, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useScroll } from 'framer-motion';

interface ScrollButtonProps {
  onClick: () => void;
}

export const ScrollButton = ({ onClick }: ScrollButtonProps) => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.button
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
      animate={{
        y: [0, 15, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
      }}
    >
      <ArrowDown size={32} className="animate-pulse" />
    </motion.button>
  );
};