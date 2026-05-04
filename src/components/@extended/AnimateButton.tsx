import { ReactNode } from 'react';

// third-party
import { motion, useCycle } from 'framer-motion';

// Definimos los tipos para las props
type AnimationType = 'slide' | 'scale' | 'rotate';
type AnimationDirection = 'up' | 'down' | 'left' | 'right';

interface ScaleProps {
  hover: number;
  tap: number;
}

interface AnimateButtonProps {
  children: ReactNode;
  type?: AnimationType;
  direction?: AnimationDirection;
  offset?: number;
  scale?: number | ScaleProps;
}

export default function AnimateButton({
  children,
  type = 'scale',
  direction = 'right',
  offset = 10,
  scale = { hover: 1.05, tap: 0.954 }
}: AnimateButtonProps) {
  let offset1: number;
  let offset2: number;

  switch (direction) {
    case 'up':
    case 'left':
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  switch (type) {
    case 'rotate':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 2,
            repeatDelay: 0
          }}
        >
          {children}
        </motion.div>
      );
    case 'slide':
      if (direction === 'up' || direction === 'down') {
        return (
          <motion.div 
            animate={{ y: y !== undefined ? y : 0 }} 
            onHoverEnd={() => cycleY()} 
            onHoverStart={() => cycleY()}
          >
            {children}
          </motion.div>
        );
      }
      return (
        <motion.div 
          animate={{ x: x !== undefined ? x : 0 }} 
          onHoverEnd={() => cycleX()} 
          onHoverStart={() => cycleX()}
        >
          {children}
        </motion.div>
      );

    case 'scale':
    default: {
      // Normalizamos scale para que TypeScript sepa siempre qué propiedades usar
      const scaleValues: ScaleProps = typeof scale === 'number' 
        ? { hover: scale, tap: scale } 
        : scale;

      return (
        <motion.div 
          whileHover={{ scale: scaleValues.hover }} 
          whileTap={{ scale: scaleValues.tap }}
        >
          {children}
        </motion.div>
      );
    }
  }
}