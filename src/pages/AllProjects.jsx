import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProNav from '../components/ProNav';
import projectsData from '../content/data/projects.json';

import { proTheme as T } from '../theme';

const punchIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { type: 'spring', damping: 20, stiffness: 100, delay },
});

export default function AllProjects() {
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

      <div style={{ padding: '160px 4rem 4rem', background: T.bgSecondary, borderBottom: T.borderBlack }}>
        <h1 style={{
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(5rem, 15vw, 10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.05em', margin: 0,
          color: T.black, textShadow: T.shadowAccent
        }}>
          ALL REPOS
        </h1>
      </div>

      <div style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        {projectsData.length === 0 ? (
          <ProBox bg={T.bg} style={{ padding: '4rem', textAlign: 'center', border: `4px dashed #fff` }}>
            <h3 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff' }}>NO FEATURED REPOS YET.</h3>
            <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.2rem', color: '#aaa', margin: 0 }}>Repositories are currently private or under heavy construction.</p>
          </ProBox>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '3rem' }}>
            {projectsData.map((proj, i) => (
              <ProBox key={i} delay={0.1*i} bg={T.bgSecondary} onClick={() => proj.link ? window.open(proj.link, '_blank') : null}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: T.borderBlack, paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase', margin: 0 }}>{proj.title}</h3>
                  {proj.date && <span style={{ fontFamily: T.fontBody, fontWeight: 700, background: T.black, color: '#fff', padding: '0.3rem 0.8rem', fontSize: '1rem' }}>{proj.date}</span>}
                </div>
                <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>{proj.description}</p>
              </ProBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
