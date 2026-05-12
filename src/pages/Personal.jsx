import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import tasksData from '../content/data/tasks.json';
import BrutalBox from '../components/BrutalBox';
import SectionHeading from '../components/SectionHeading';/* ─── NEOBRUTALIST TOKENS ─── */
const T = {
  bg: '#CCFF00',          // Acid yellow background
  bgSecondary: '#f4f4f0', // Stark white
  black: '#000000',
  accent1: '#FF3366',     // Neon pink
  accent2: '#0033FF',     // Hyper blue
  border: '4px solid #000',
  borderThin: '2px solid #000',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Space Grotesk', sans-serif",
  shadow: '6px 6px 0px #000',
  shadowHover: '12px 12px 0px #000',
  shadowActive: '0px 0px 0px #000',
};

/* ─── ANIMATIONS ─── */
const punchIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9, y: 50 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { type: 'spring', damping: 15, stiffness: 100, delay },
});



/* ─── NAVBAR ─── */
function Nav() {
  const navigate = useNavigate();
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
      background: T.bgSecondary, borderBottom: T.border,
      height: '80px',
      overflowX: 'auto', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none'
    }}>
      <style>{`nav::-webkit-scrollbar { display: none; }`}</style>
      <div 
        onClick={() => navigate('/')}
        style={{
          borderRight: T.border, padding: '0 clamp(1rem, 3vw, 2rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: T.accent1, color: '#fff', cursor: 'pointer',
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 2rem)', textTransform: 'uppercase'
        }}
      >
        ← SUPUS
      </div>
      <div style={{ display: 'flex' }}>
        {['Life', 'Hobbies', 'Thoughts', 'Gallery'].map((item, i) => (
          <a key={item} href={`#${item.toLowerCase()}`}
            style={{
              padding: '0 clamp(0.5rem, 2vw, 2rem)', borderLeft: i === 0 ? 'none' : T.borderThin,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.fontBody, fontWeight: 700, fontSize: '1rem', color: T.black,
              textTransform: 'uppercase', textDecoration: 'none', background: T.bgSecondary,
              transition: 'background 0.2s, color 0.2s'
            }}
            onMouseEnter={e => { e.target.style.background = T.black; e.target.style.color = T.bgSecondary; }}
            onMouseLeave={e => { e.target.style.background = T.bgSecondary; e.target.style.color = T.black; }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem)',
      background: T.bg, borderBottom: T.border,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ duration: 0.5 }}
          style={{ height: '8px', background: T.black, marginBottom: '2rem' }}
        />
        <motion.h1
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 12, delay: 0.1 }}
          style={{
            fontFamily: T.fontDisplay, fontWeight: 800,
            fontSize: 'clamp(2.5rem, 10vw, 12rem)',
            lineHeight: 1, textTransform: 'uppercase',
            letterSpacing: '-0.05em', margin: 0,
            textShadow: T.shadow
          }}
        >
          SUPUS.
        </motion.h1>
        <motion.h1
          initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          style={{
            fontFamily: T.fontDisplay, fontWeight: 800,
            fontSize: 'clamp(2rem, 8vw, 8rem)',
            lineHeight: 1, textTransform: 'uppercase',
            letterSpacing: '-0.05em', margin: 0, color: T.accent2,
            WebkitTextStroke: '3px black'
          }}
        >
          NOT DEAD YET.
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          style={{
            fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.5rem',
            maxWidth: '600px', marginTop: '3rem', border: T.border, padding: '1.5rem',
            background: T.bgSecondary, boxShadow: T.shadow
          }}
        >
          Beyond the terminal and the solder iron, I build, break, and notice things. Welcome to the raw archive.
        </motion.p>
      </div>

      <div style={{
        position: 'absolute', bottom: '4rem', right: '-5rem', zIndex: 0,
        fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '20vw',
        color: 'transparent', WebkitTextStroke: '2px rgba(0,0,0,0.2)',
        transform: 'rotate(-10deg)', pointerEvents: 'none', lineHeight: 0.8
      }}>
        VIBE<br/>CHECK
      </div>
    </section>
  );
}

/* ─── LIFE CARDS ─── */
function LifeCards() {
  return (
    <section id="life" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 4rem)', background: '#fff', borderBottom: T.border }}>
      <SectionHeading title="System Config" subtitle="My Life" color={T.black} borderBottom={T.border} />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'stretch' }}>
        
        <BrutalBox bg={T.accent1} hoverColor="#000" delay={0.1} style={{ color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontFamily: T.fontDisplay, fontSize: '3rem', margin: '0 0 1rem', textTransform: 'uppercase', WebkitTextStroke: '2px black' }}>Daily_</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', lineHeight: 1.8 }}>
            <li>→ WAKE</li>
            <li>→ CODE</li>
            <li>→ RUN</li>
            <li>→ READ</li>
            <li>→ SLEEP</li>
          </ul>
        </BrutalBox>

        <BrutalBox bg={T.accent2} hoverColor="#000" delay={0.2} style={{ color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontFamily: T.fontDisplay, fontSize: '2rem', margin: '0 0 1rem', textTransform: 'uppercase', WebkitTextStroke: '2px black' }}>Playing_</h3>
          <iframe data-testid="embed-iframe" style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/track/2uaP0Vpeiu3tMCOPkkv4iV?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </BrutalBox>

        <BrutalBox delay={0.3} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: T.fontDisplay, fontSize: '2rem', margin: '0 0 1rem', textTransform: 'uppercase' }}>Quote_</h3>
          <p style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.4, flex: 1, display: 'flex', alignItems: 'center' }}>
            "I BUILD THINGS IN THE DARK AND READ ABOUT THEM IN THE MORNING."
          </p>
        </BrutalBox>

        <BrutalBox delay={0.4} bg={T.bg} style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: T.borderThin, paddingBottom: '1rem', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: T.fontDisplay, fontSize: '2.5rem', margin: 0, textTransform: 'uppercase' }}>Active Tasks</h3>
            <span style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', background: T.black, color: T.bg, padding: '0.2rem 1rem' }}>{tasksData.length}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {tasksData.map((task, i) => (
              <div key={i} style={{ border: T.borderThin, background: '#fff', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ alignSelf: 'flex-start', background: T.accent2, color: '#fff', fontFamily: T.fontBody, fontWeight: 700, padding: '0.2rem 0.5rem', fontSize: '0.8rem', border: T.borderThin }}>{task.status}</span>
                <p style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>{task.title}</p>
              </div>
            ))}
          </div>
        </BrutalBox>
      </div>
    </section>
  );
}

/* ─── HOBBIES ─── */
function Hobbies() {
  const hobbiesList = ['Film Photography', 'Long Distance Running', 'Synthesizers', 'Mechanical Keyboards', 'Philosophy', 'Espresso'];
  return (
    <section id="hobbies" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 4rem)', background: T.accent2, borderBottom: T.border }}>
      <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '5rem', color: '#fff', textTransform: 'uppercase', margin: '0 0 3rem', WebkitTextStroke: '2px black' }}>
        Off Screen
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {hobbiesList.map((hobby, i) => (
          <BrutalBox key={i} bg={T.bgSecondary} delay={i * 0.1} style={{ padding: '1rem 2rem' }}>
            <span style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase' }}>{hobby}</span>
          </BrutalBox>
        ))}
      </div>
    </section>
  );
}

/* ─── THOUGHTS ─── */
function Thoughts() {
  return (
    <section id="thoughts" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 4rem)', background: T.bgSecondary, borderBottom: T.border }}>
      <SectionHeading title="Brain Dumps" subtitle="Thoughts" color={T.black} borderBottom={T.border} />
      
      <BrutalBox bg="#fff" style={{ padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', border: `4px dashed ${T.black}` }}>
        <h3 style={{ fontFamily: T.fontDisplay, fontSize: '3rem', textTransform: 'uppercase', margin: '0 0 2rem' }}>First thought incoming...</h3>
        <Link to="/personal/thoughts" style={{
          display: 'inline-block', fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem',
          color: T.bgSecondary, background: T.black, padding: '1rem 3rem', textDecoration: 'none',
          border: T.border, boxShadow: '6px 6px 0px #FF3366', textTransform: 'uppercase',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }} onMouseEnter={e => { e.target.style.transform = 'translate(-4px,-4px)'; e.target.style.boxShadow = '10px 10px 0px #FF3366'; }}
           onMouseLeave={e => { e.target.style.transform = 'translate(0,0)'; e.target.style.boxShadow = '6px 6px 0px #FF3366'; }}>
          Read All Logs
        </Link>
      </BrutalBox>
    </section>
  );
}

/* ─── GALLERY ─── */
function GalleryPreview() {
  const navigate = useNavigate();
  return (
    <section id="gallery" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 4rem)', background: T.accent1, borderBottom: T.border }}>
      <SectionHeading title="Visuals" subtitle="Gallery" color={T.black} borderBottom={T.border} />
      
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginBottom: '4rem'
      }}>
        {[1, 2, 3, 4].map(i => (
          <BrutalBox key={i} bg={T.bgSecondary} style={{ aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => navigate('/personal/gallery')}>
            <span style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '4rem', color: T.black }}>{i}</span>
          </BrutalBox>
        ))}
      </div>
      
      <button onClick={() => navigate('/personal/gallery')} style={{
        fontFamily: T.fontBody, fontWeight: 700, fontSize: 'clamp(1.2rem, 4vw, 2rem)', width: '100%',
        color: T.black, background: T.bg, padding: 'clamp(1rem, 3vw, 2rem)', border: T.border,
        textTransform: 'uppercase', cursor: 'pointer', boxShadow: T.shadow,
        transition: 'transform 0.2s'
      }} onMouseEnter={e => e.target.style.transform = 'translate(-4px,-4px)'} onMouseLeave={e => e.target.style.transform = 'none'}>
        ENTER FULL GALLERY →
      </button>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 4rem)', background: T.black, color: T.bgSecondary, textAlign: 'center' }}>
      <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(4rem, 10vw, 8rem)', margin: '0 0 2rem', letterSpacing: '-0.05em' }}>
        END OF PAGE.
      </h1>
      <p style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', margin: 0, color: T.bg }}>
        GO BUILD SOMETHING.
      </p>
    </footer>
  );
}

export default function Personal() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ background: T.bgSecondary, color: T.black, minHeight: '100vh', overflowX: 'hidden' }}
    >
      <Helmet>
        <title>Personal | SUPUS</title>
        <meta name="description" content="Thoughts, hobbies, and the raw archive." />
      </Helmet>
      <Nav />
      <Hero />
      <LifeCards />
      <Hobbies />
      <Thoughts />
      <GalleryPreview />
      <Footer />
    </motion.div>
  );
}
