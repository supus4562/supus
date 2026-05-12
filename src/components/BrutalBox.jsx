import { motion } from 'framer-motion';

const punchIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { type: 'spring', damping: 20, stiffness: 100, delay },
});

export default function BrutalBox({ children, bg = '#f4f4f0', color = '#000', border, shadow, shadowHover, style, delay = 0, hoverColor, hoverTextColor, onClick }) {
  return (
    <motion.div
      {...punchIn(delay)}
      onClick={onClick}
      style={{
        background: bg,
        color: color,
        border: border || '4px solid #000',
        boxShadow: shadow || '6px 6px 0px #000',
        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'inherit',
        ...style
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-4px, -4px)';
        e.currentTarget.style.boxShadow = shadowHover || '12px 12px 0px #000';
        if (hoverColor) e.currentTarget.style.background = hoverColor;
        if (hoverTextColor) e.currentTarget.style.color = hoverTextColor;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
        e.currentTarget.style.boxShadow = shadow || '6px 6px 0px #000';
        if (hoverColor) e.currentTarget.style.background = bg;
        if (hoverTextColor) e.currentTarget.style.color = color;
      }}
      whileTap={onClick ? { transform: 'translate(4px, 4px)', boxShadow: '0px 0px 0px #000' } : {}}
    >
      {children}
    </motion.div>
  );
}
