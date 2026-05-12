import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* ─── Brutalist Elements ─── */
const Marquee = ({ text, color }) => (
  <div style={{
    position: 'absolute',
    top: '20%',
    left: 0,
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transform: 'rotate(-2deg)',
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.1
  }}>
    <motion.div
      animate={{ x: [0, -1000] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      style={{
        display: 'inline-block',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: '15vw',
        color: color,
        textTransform: 'uppercase',
        lineHeight: 1
      }}
    >
      {text}&nbsp;{text}&nbsp;{text}&nbsp;
    </motion.div>
  </div>
);

export default function Landing() {
  const [loadingPhase, setLoadingPhase] = useState('loading'); // 'loading' | 'ready'
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPhase('ready');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sideStyle = (which) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    height: '100%',
    flex: hovered === null ? 1 : hovered === which ? 1.7 : 0.3,
    transition: 'flex 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    borderRight: which === 'pro' ? '4px solid #000' : 'none'
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
      }}>
      <style>{`
        .landing-container { flex-direction: row; }
        .landing-text-pro { text-align: left; }
        .landing-text-personal { text-align: right; }
        @media (max-width: 768px) {
          .landing-container { flex-direction: column !important; }
          .landing-text-pro { text-align: center !important; }
          .landing-text-personal { text-align: center !important; }
          .side-pro { border-right: none !important; border-bottom: 4px solid #000 !important; }
        }
      `}</style>
      <Helmet>
        <title>SUPUS | HOME</title>
        <meta name="description" content="Select your path: Professional or Personal." />
      </Helmet>
      <AnimatePresence>
        {loadingPhase === 'loading' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#CCFF00', // Acid yellow
              color: '#000',
            }}
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.5 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '12vw',
                textTransform: 'uppercase',
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '-0.05em'
              }}
            >
              SUPUS
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '300px' }}
              transition={{ duration: 1.5, ease: 'linear' }}
              style={{
                height: '8px',
                background: '#000',
                marginTop: '2rem',
                border: '2px solid #000'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loadingPhase === 'ready' ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
        className="landing-container"
      >
        {/* ── PROFESSIONAL (Left) ── */}
        <motion.div
          className="side-pro"
        style={{ ...sideStyle('pro'), background: '#f4f4f0' }} // Stark white
          onMouseEnter={() => setHovered('pro')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/professional')}
        >
          <Marquee text="SYSTEMS HARDWARE MATH " color="#000" />
          
          <motion.div
            className="landing-text-pro"
            style={{ 
              position: 'relative', zIndex: 10, width: '100%', padding: '0 clamp(1rem, 5vw, 4rem)',
              transform: hovered === 'pro' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.5rem, 8vw, 8rem)',
              lineHeight: 1, color: '#000',
              textTransform: 'uppercase', letterSpacing: '-0.04em',
              margin: 0,
            }}>
              PRO
            </h1>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.5rem, 8vw, 8rem)',
              lineHeight: 1, color: '#000',
              textTransform: 'uppercase', letterSpacing: '-0.04em',
              margin: 0,
            }}>
              FESSIONAL
            </h1>

            <motion.button
              style={{
                marginTop: '3rem',
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem',
                color: '#f4f4f0', background: '#000',
                padding: '1rem 2rem', border: '3px solid #000',
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: hovered === 'pro' ? '8px 8px 0px #CCFF00' : '4px 4px 0px #CCFF00',
                transform: hovered === 'pro' ? 'translate(-4px, -4px)' : 'translate(0, 0)',
                transition: 'all 0.2s ease',
              }}
            >
              ENTER →
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── PERSONAL (Right) ── */}
        <motion.div
          style={{ ...sideStyle('personal'), background: '#CCFF00', borderRight: 'none' }} // Acid yellow
          onMouseEnter={() => setHovered('personal')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/personal')}
        >
          <Marquee text="THOUGHTS PHOTOS CHAOS " color="#000" />

          <motion.div
            className="landing-text-personal"
            style={{ 
              position: 'relative', zIndex: 10, width: '100%', padding: '0 clamp(1rem, 5vw, 4rem)',
              transform: hovered === 'personal' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.5rem, 8vw, 8rem)',
              lineHeight: 1, color: '#000',
              textTransform: 'uppercase', letterSpacing: '-0.04em',
              margin: 0,
            }}>
              PER
            </h1>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.5rem, 8vw, 8rem)',
              lineHeight: 1, color: '#000',
              textTransform: 'uppercase', letterSpacing: '-0.04em',
              margin: 0,
            }}>
              SONAL
            </h1>

            <motion.button
              style={{
                marginTop: '3rem',
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem',
                color: '#CCFF00', background: '#000',
                padding: '1rem 2rem', border: '3px solid #000',
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: hovered === 'personal' ? '-8px 8px 0px #FF3366' : '-4px 4px 0px #FF3366',
                transform: hovered === 'personal' ? 'translate(4px, -4px)' : 'translate(0, 0)',
                transition: 'all 0.2s ease',
              }}
            >
              ← ENTER
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
