import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProNav from '../components/ProNav';
import projectsData from '../content/data/projects.json';
import researchData from '../content/data/research.json';
import techSpecsData from '../content/data/techSpecs.json';
import BrutalBox from '../components/BrutalBox';
import SectionHeading from '../components/SectionHeading';/* ─── PROFESSIONAL NEOBRUTALIST TOKENS ─── */
const T = {
  bg: '#000000',          // Deep black background
  bgSecondary: '#f4f4f0', // Stark white
  black: '#000000',
  accent: '#00FF66',      // Acid Green for a professional but tech/brutalist edge
  borderWhite: '4px solid #fff',
  borderBlack: '4px solid #000',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Space Grotesk', sans-serif",
  shadowWhite: '6px 6px 0px #fff',
  shadowAccent: '6px 6px 0px #00FF66',
  shadowHover: '12px 12px 0px #00FF66',
};

/* ─── ANIMATIONS ─── */
const punchIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { type: 'spring', damping: 20, stiffness: 100, delay },
});

export default function Professional() {
  const navigate = useNavigate();

  /* ─── COMPONENTS ─── */
  const ProBox = ({ children, bg = T.bgSecondary, style, delay = 0, hoverColor, onClick }) => {
    const isLight = bg === T.bgSecondary || bg === T.accent;
    return (
      <BrutalBox 
        bg={bg} 
        color={isLight ? T.black : '#fff'}
        border={isLight ? T.borderBlack : T.borderWhite}
        shadow={isLight ? T.shadowAccent : T.shadowWhite}
        shadowHover={T.shadowHover}
        style={style} delay={delay} hoverColor={hoverColor} onClick={onClick}
      >
        {children}
      </BrutalBox>
    );
  };

  const ProSectionHeading = ({ title, dark = false }) => (
    <SectionHeading 
      title={title} 
      color={dark ? T.black : '#fff'} 
      borderBottom={dark ? T.borderBlack : T.borderWhite} 
    />
  );

  /* ─── HERO ─── */
  function Hero() {
    return (
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: 'clamp(6rem, 20vw, 160px) clamp(1rem, 5vw, 2rem) clamp(2rem, 5vw, 4rem)',
        background: T.bgSecondary, borderBottom: T.borderBlack,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: '150px' }} transition={{ duration: 0.5 }}
            style={{ height: '8px', background: T.accent, border: T.borderBlack, marginBottom: '2rem' }}
          />
          
          <h3 style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 1.2rem)', color: T.black, margin: '0 0 1rem', textTransform: 'uppercase' }}>
            Computer Scientist / Theoretical CS @ LUMS
          </h3>

          <motion.h1
            initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 15, delay: 0.1 }}
            style={{
              fontFamily: T.fontDisplay, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 8vw, 8rem)',
              lineHeight: 1.1, textTransform: 'uppercase',
              letterSpacing: '-0.02em', margin: 0, color: T.black,
              textShadow: T.shadowAccent
            }}
          >
            HAMZA
          </motion.h1>
          <motion.h1
            initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            style={{
              fontFamily: T.fontDisplay, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 8vw, 8rem)',
              lineHeight: 1.1, textTransform: 'uppercase',
              letterSpacing: '-0.02em', margin: '0.2em 0 0', color: T.bgSecondary,
              WebkitTextStroke: '4px black'
            }}
          >
            HASSAN
          </motion.h1>
        </div>
        
        {/* Background Graphic */}
        <div style={{
          position: 'absolute', top: '10%', right: '-5%', zIndex: 0,
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '30vw',
          color: 'transparent', WebkitTextStroke: '2px rgba(0,0,0,0.05)',
          pointerEvents: 'none', lineHeight: 0.8
        }}>
          SYS<br/>TEM
        </div>
      </section>
    );
  }

  function ExperienceAndEdu() {
    const experiences = [
      { role: 'Algorithm Designer', company: 'NERC @ NUST', time: 'Mar 2026 – Present', detail: 'Led robot mechanism design and control architecture. Fine-tuned PID algorithms.' },
      { role: 'Founder', company: 'Ascendia Academy', time: 'Mar 2026 – Present', detail: 'Founded EdTech platform. Managed operations, full-stack systems, and tutoring.' }
    ];

    return (
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem)', background: T.bg, borderBottom: T.borderWhite }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
          
          <div>
            <ProSectionHeading title="Experience" dark={false} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experiences.map((exp, i) => (
                <ProBox key={i} delay={0.1 + i*0.1} bg={T.bgSecondary} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', textTransform: 'uppercase', margin: 0, wordBreak: 'break-word', lineHeight: 1.1 }}>{exp.role}</h3>
                    <span style={{ fontFamily: T.fontBody, fontWeight: 700, background: T.black, color: T.accent, padding: '0.3rem 0.8rem', fontSize: '1rem', whiteSpace: 'nowrap' }}>{exp.time}</span>
                  </div>
                  <h4 style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', color: '#555', margin: 0 }}>@ {exp.company}</h4>
                  <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>{exp.detail}</p>
                </ProBox>
              ))}
            </div>
          </div>

          <div>
            <ProSectionHeading title="Education" dark={false} />
            <ProBox delay={0.3} bg={T.accent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.8rem, 6vw, 3rem)', textTransform: 'uppercase', margin: 0, WebkitTextStroke: '1px black', color: '#fff', wordBreak: 'break-word', lineHeight: 1.1 }}>LUMS</h3>
              <h4 style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', margin: 0, color: '#000', wordBreak: 'break-word' }}>BS Theoretical Computer Science</h4>
              <span style={{ fontFamily: T.fontBody, fontWeight: 700, background: T.black, color: '#fff', padding: '0.3rem 0.8rem', fontSize: '1rem', alignSelf: 'flex-start' }}>Expected May 2029</span>
              <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.1rem', margin: '1rem 0 0', color: '#000' }}>
                Advanced coursework in Proof-based Mathematics, Linear Algebra (Honours), and Data Structures.
              </p>
            </ProBox>
          </div>

        </div>
      </section>
    );
  }

  /* ─── SKILLS ─── */
  function Skills() {
    const skillCategoriesMap = techSpecsData.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    const skillCategories = Object.keys(skillCategoriesMap).map(cat => ({
      name: cat,
      items: skillCategoriesMap[cat]
    }));

    return (
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem)', background: T.bgSecondary, borderBottom: T.borderBlack }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <ProSectionHeading title="Technical Specs" dark={true} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            {skillCategories.map((cat, i) => (
              <ProBox key={i} delay={i * 0.1} bg={T.black} style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', lineHeight: 1.1, color: T.accent, textTransform: 'uppercase', margin: '0 0 1.5rem', borderBottom: T.borderWhite, paddingBottom: '0.5rem', wordBreak: 'break-word' }}>
                  {cat.name}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {cat.items.map((skill, j) => (
                    <span key={j} style={{ 
                      fontFamily: T.fontBody, fontWeight: 700, fontSize: '1rem', color: T.black, 
                      background: T.bgSecondary, padding: '0.4rem 0.8rem', textTransform: 'uppercase' 
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </ProBox>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ─── PROJECTS & RESEARCH (EMPTY STATES OR LIMITED VIEW) ─── */
  function EmptyStates() {
    const limitedProjects = projectsData.slice(0, 3);
    const limitedResearch = researchData.slice(0, 3);

    return (
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem)', background: T.bg, borderBottom: T.borderWhite }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
          
          <div>
            <ProSectionHeading title="Projects" dark={false} />
            {limitedProjects.length === 0 ? (
              <ProBox bg={T.bg} style={{ padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', border: `4px dashed #fff` }}>
                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff', wordBreak: 'break-word', lineHeight: 1.1 }}>
                  NO FEATURED REPOS YET.
                </h3>
                <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.2rem', color: '#aaa', margin: 0 }}>
                  Repositories are currently private or under heavy construction. GitHub sync pending.
                </p>
              </ProBox>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {limitedProjects.map((proj, i) => (
                  <ProBox key={i} delay={0.1*i} bg={T.bgSecondary} onClick={() => proj.link ? window.open(proj.link, '_blank') : null}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: T.borderBlack, paddingBottom: '1rem', marginBottom: '1rem' }}>
                      <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2rem)', textTransform: 'uppercase', margin: 0, wordBreak: 'break-word', lineHeight: 1.1 }}>{proj.title}</h3>
                      {proj.date && <span style={{ fontFamily: T.fontBody, fontWeight: 700, background: T.black, color: '#fff', padding: '0.3rem 0.8rem', fontSize: '1rem' }}>{proj.date}</span>}
                    </div>
                    <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>{proj.description}</p>
                  </ProBox>
                ))}
                {projectsData.length > 3 && (
                  <div onClick={() => navigate('/professional/projects')} style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase', padding: '1rem 0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start', borderBottom: `2px solid #fff` }}>
                    VIEW ALL REPOS →
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <ProSectionHeading title="Research" dark={false} />
            {limitedResearch.length === 0 ? (
              <ProBox bg={T.bg} style={{ padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', border: `4px dashed #fff` }}>
                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff', wordBreak: 'break-word', lineHeight: 1.1 }}>
                  NO PUBLISHED PAPERS.
                </h3>
                <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.2rem', color: '#aaa', margin: 0 }}>
                  Currently computing. Check back later for academic publications.
                </p>
              </ProBox>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {limitedResearch.map((res, i) => (
                  <ProBox key={i} delay={0.1*i} bg={T.accent} onClick={() => res.link ? window.open(res.link, '_blank') : null}>
                    <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase', margin: '0 0 1rem', color: '#000' }}>{res.title}</h3>
                    <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.1rem', margin: 0, color: '#000' }}>{res.description}</p>
                  </ProBox>
                ))}
                {researchData.length > 3 && (
                  <div onClick={() => navigate('/professional/research')} style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase', padding: '1rem 0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start', borderBottom: `2px solid #fff` }}>
                    VIEW ALL PAPERS →
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </section>
    );
  }

  /* ─── NETWORK & FOOTER ─── */
  function NetworkAndFooter() {
    return (
      <footer style={{ background: T.accent, borderTop: T.borderBlack }}>
        <div style={{ padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem)', maxWidth: '1400px', margin: '0 auto' }}>
          <ProSectionHeading title="Network" dark={true} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
            <a href="https://linkedin.com/in/supus" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <ProBox bg={T.black} hoverColor="#fff" delay={0.1} style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase' }}>LinkedIn</span>
                <span style={{ fontSize: '2rem' }}>↗</span>
              </ProBox>
            </a>
            <a href="https://github.com/supus4562" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <ProBox bg={T.bgSecondary} hoverColor="#fff" delay={0.2} style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase' }}>GitHub</span>
                <span style={{ fontSize: '2rem' }}>↗</span>
              </ProBox>
            </a>
            <a href="mailto:hamza3140000@gmail.com" style={{ textDecoration: 'none' }}>
              <ProBox bg={T.black} hoverColor="#fff" delay={0.3} style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase' }}>Email</span>
                <span style={{ fontSize: '2rem' }}>↗</span>
              </ProBox>
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 6rem)', margin: 0, textTransform: 'uppercase', color: T.black, lineHeight: 0.9 }}>
              HAMZA<br/>HASSAN
            </h1>
            <p style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', margin: 0, color: T.black, textTransform: 'uppercase' }}>
              SYSTEMS / HARDWARE / MATH
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ background: T.bg, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <Helmet>
        <title>Professional | SUPUS</title>
        <meta name="description" content="Systems, Hardware, Math. The professional portfolio." />
        <meta name="keywords" content="Hamza Hassan, Supus, Software Engineer, LUMS, Systems Programmer, Full Stack, Neo-Brutalism" />
      </Helmet>
      <ProNav />
      <Hero />
      <ExperienceAndEdu />
      <Skills />
      <EmptyStates />
      <NetworkAndFooter />
    </motion.div>
  );
}
