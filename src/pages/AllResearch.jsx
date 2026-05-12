import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProNav from '../components/ProNav';
import researchData from '../content/data/research.json';

const T = {
  bg: '#000000',
  bgSecondary: '#f4f4f0',
  black: '#000000',
  accent: '#00FF66',
  borderWhite: '4px solid #fff',
  borderBlack: '4px solid #000',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Space Grotesk', sans-serif",
  shadowWhite: '6px 6px 0px #fff',
  shadowAccent: '6px 6px 0px #00FF66',
  shadowHover: '12px 12px 0px #00FF66',
};

const punchIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { type: 'spring', damping: 20, stiffness: 100, delay },
});

export default function AllResearch() {
  const navigate = useNavigate();

  const ProBox = ({ children, bg = T.bgSecondary, style, delay = 0, hoverColor, onClick }) => (
    <motion.div
      {...punchIn(delay)}
      onClick={onClick}
      style={{
        background: bg,
        border: bg === T.bgSecondary || bg === T.accent ? T.borderBlack : T.borderWhite,
        boxShadow: bg === T.bgSecondary || bg === T.accent ? T.shadowAccent : T.shadowWhite,
        padding: '2.5rem',
        color: bg === T.bgSecondary || bg === T.accent ? T.black : '#fff',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-4px, -4px)';
        e.currentTarget.style.boxShadow = T.shadowHover;
        if (hoverColor) e.currentTarget.style.background = hoverColor;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
        e.currentTarget.style.boxShadow = bg === T.bgSecondary || bg === T.accent ? T.shadowAccent : T.shadowWhite;
        if (hoverColor) e.currentTarget.style.background = bg;
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <div style={{ background: T.bg, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <ProNav />

      <div style={{ padding: '160px 4rem 4rem', background: T.accent, borderBottom: T.borderBlack }}>
        <h1 style={{
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(5rem, 15vw, 10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.05em', margin: 0,
          color: T.black, textShadow: T.shadowWhite
        }}>
          ALL PAPERS
        </h1>
      </div>

      <div style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        {researchData.length === 0 ? (
          <ProBox bg={T.bg} style={{ padding: '4rem', textAlign: 'center', border: `4px dashed #fff` }}>
            <h3 style={{ fontFamily: T.fontDisplay, fontSize: '2.5rem', textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff' }}>NO PUBLISHED PAPERS.</h3>
            <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.2rem', color: '#aaa', margin: 0 }}>Currently computing. Check back later.</p>
          </ProBox>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {researchData.map((res, i) => (
              <ProBox key={i} delay={0.1*i} bg={T.bgSecondary} onClick={() => res.link ? window.open(res.link, '_blank') : null}>
                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase', margin: '0 0 1rem' }}>{res.title}</h3>
                <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>{res.description}</p>
              </ProBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
