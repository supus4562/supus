import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ─── NEOBRUTALIST TOKENS ─── */
const T = {
  bg: '#CCFF00',
  bgSecondary: '#f4f4f0',
  black: '#000000',
  accent1: '#FF3366',
  accent2: '#0033FF',
  border: '4px solid #000',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Space Grotesk', sans-serif",
  shadow: '6px 6px 0px #000',
  shadowHover: '12px 12px 0px #000',
};

const BrutalBox = ({ children, bg = T.bgSecondary, style, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', damping: 15, delay }}
    style={{
      background: bg, border: T.border, boxShadow: T.shadow,
      color: T.black, transition: 'all 0.2s ease', cursor: 'pointer', ...style
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translate(-4px, -4px)';
      e.currentTarget.style.boxShadow = T.shadowHover;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translate(0px, 0px)';
      e.currentTarget.style.boxShadow = T.shadow;
    }}
  >
    {children}
  </motion.div>
);

const imageFiles = import.meta.glob('../../content/gallery/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' });
const images = Object.values(imageFiles);

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: T.bgSecondary, color: T.black, minHeight: '100vh' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
        background: T.bgSecondary, borderBottom: T.border, height: '80px'
      }}>
        <div 
          onClick={() => navigate('/personal')}
          style={{
            borderRight: T.border, padding: '0 2rem', display: 'flex', alignItems: 'center',
            background: T.accent2, color: '#fff', cursor: 'pointer',
            fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase'
          }}
        >
          ← BACK
        </div>
        <div style={{
          padding: '0 2rem', display: 'flex', alignItems: 'center',
          fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase'
        }}>
          FULL GALLERY
        </div>
      </nav>

      <div style={{ padding: '160px 4rem 4rem', background: T.accent1, borderBottom: T.border }}>
        <h1 style={{
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(5rem, 15vw, 10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.05em', margin: 0,
          color: '#fff', WebkitTextStroke: '3px black', textShadow: T.shadow
        }}>
          RAW VISUALS
        </h1>
      </div>

      <div style={{ padding: '6rem 4rem' }}>
        {images.length === 0 ? (
          <div style={{ fontFamily: T.fontDisplay, fontSize: '3rem', textAlign: 'center', border: T.border, padding: '4rem', background: '#fff' }}>
            NO IMAGES YET. DROP PICTURES IN /src/content/gallery
          </div>
        ) : (
          <div style={{
            columnCount: 'auto', columnWidth: '350px', columnGap: '3rem',
          }}>
            {images.map((url, i) => (
              <BrutalBox key={i} delay={0.1 + (i % 5) * 0.1} style={{
                marginBottom: '3rem', breakInside: 'avoid', padding: 0, overflow: 'hidden', display: 'flex'
              }}>
                <img src={url} alt={`Gallery item ${i}`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
              </BrutalBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
