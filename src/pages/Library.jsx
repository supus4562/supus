import { motion } from 'framer-motion';
import ProNav from '../components/ProNav';
import libraryData from '../content/data/library.json';

import { proTheme as T } from '../theme';

const punchIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { type: 'spring', damping: 20, stiffness: 100, delay },
});

const ProBox = ({ children, bg = T.bgSecondary, style, delay = 0 }) => (
  <motion.div
    {...punchIn(delay)}
    style={{
      background: bg,
      border: bg === T.bgSecondary || bg === T.accent ? T.borderBlack : T.borderWhite,
      boxShadow: bg === T.bgSecondary || bg === T.accent ? T.shadowAccent : T.shadowWhite,
      padding: '2.5rem',
      color: bg === T.bgSecondary || bg === T.accent ? T.black : '#fff',
      transition: 'all 0.2s ease',
      ...style
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translate(-4px, -4px)';
      e.currentTarget.style.boxShadow = T.shadowHover;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translate(0px, 0px)';
      e.currentTarget.style.boxShadow = bg === T.bgSecondary || bg === T.accent ? T.shadowAccent : T.shadowWhite;
    }}
  >
    {children}
  </motion.div>
);

export default function Library() {
  const books = libraryData.filter(item => item.type === 'book');
  const courses = libraryData.filter(item => item.type === 'course');

  // Group courses by semester
  const semestersMap = {};
  courses.forEach(c => {
    if (!semestersMap[c.semester]) semestersMap[c.semester] = [];
    semestersMap[c.semester].push(c);
  });
  const semesters = Object.keys(semestersMap);

  return (
    <div style={{ background: T.bg, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <ProNav />

      <div style={{ padding: '160px 4rem 4rem', background: T.accent, borderBottom: T.borderBlack }}>
        <h1 style={{
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(5rem, 15vw, 10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.05em', margin: 0,
          color: T.black, textShadow: T.shadowWhite
        }}>
          LIBRARY
        </h1>
        <p style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', margin: '1rem 0 0', color: T.black }}>
          CURRICULUM / TEXTBOOKS / TECHNICAL READINGS
        </p>
      </div>

      <div style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        
        {/* SEMESTER COURSES */}
        <section>
          <div style={{ marginBottom: '4rem', borderBottom: T.borderWhite, paddingBottom: '1rem' }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(2.5rem, 8vw, 4rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase', margin: 0, lineHeight: 0.9 }}>
              UNIVERSITY COURSEWORK
            </h2>
          </div>
          
          {semesters.length === 0 ? (
            <ProBox bg={T.bg} style={{ padding: '4rem', textAlign: 'center', border: `4px dashed #fff` }}>
              <h3 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff' }}>NO COURSES LOGGED.</h3>
            </ProBox>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {semesters.map((sem, i) => (
                <div key={sem}>
                  <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', wordBreak: 'break-word', lineHeight: 1.1, color: T.accent, margin: '0 0 2rem', textTransform: 'uppercase' }}>
                    {sem}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {semestersMap[sem].map((course, j) => (
                      <ProBox key={j} delay={j * 0.1} bg={T.bgSecondary}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                          <h4 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', margin: '0 0 1rem', color: '#000' }}>{course.title}</h4>
                          {course.grade && (
                            <span style={{ fontFamily: T.fontBody, fontWeight: 700, background: T.black, color: '#fff', padding: '0.3rem 0.8rem', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                              {course.grade}
                            </span>
                          )}
                        </div>
                      </ProBox>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* TECHNICAL BOOKS */}
        <section>
          <div style={{ marginBottom: '4rem', borderBottom: T.borderWhite, paddingBottom: '1rem' }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(2.5rem, 8vw, 4rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase', margin: 0, lineHeight: 0.9 }}>
              TECHNICAL BOOKS & TEXTS
            </h2>
          </div>
          
          {books.length === 0 ? (
            <ProBox bg={T.bg} style={{ padding: '4rem', textAlign: 'center', border: `4px dashed #fff` }}>
              <h3 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff' }}>NO BOOKS LOGGED.</h3>
            </ProBox>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {books.map((book, i) => (
                <ProBox key={i} delay={i * 0.1} bg={T.black} style={{ border: T.borderWhite }}>
                  <h4 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', margin: '0 0 1rem', color: '#fff' }}>{book.title}</h4>
                  <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.2rem', color: T.accent, margin: 0 }}>BY {book.author}</p>
                </ProBox>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
