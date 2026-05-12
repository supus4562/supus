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

const BrutalBox = ({ children, bg = T.bgSecondary, style, delay = 0, onClick }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: 'spring', damping: 15, delay }}
    onClick={onClick}
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

const mdFiles = import.meta.glob('../../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: rawContent };
  const fm = match[1];
  const attributes = {};
  fm.split('\n').forEach(line => {
    const splitIndex = line.indexOf(':');
    if (splitIndex > -1) {
      const k = line.slice(0, splitIndex).trim();
      const v = line.slice(splitIndex + 1).replace(/^["']|["']$/g, '').trim();
      attributes[k] = v;
    }
  });
  return { attributes };
}

export default function ThoughtsPage() {
  const navigate = useNavigate();

  const blogs = Object.keys(mdFiles).map(path => {
    const slug = path.split('/').pop().replace('.md', '');
    const { attributes } = parseFrontmatter(mdFiles[path]);
    return {
      id: slug,
      title: attributes.title || slug,
      date: attributes.date || '',
      excerpt: attributes.excerpt || ''
    };
  });

  return (
    <div style={{ background: T.bg, color: T.black, minHeight: '100vh' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
        background: T.bgSecondary, borderBottom: T.border, height: '80px'
      }}>
        <div 
          onClick={() => navigate('/personal')}
          style={{
            borderRight: T.border, padding: '0 2rem', display: 'flex', alignItems: 'center',
            background: T.black, color: T.bg, cursor: 'pointer',
            fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase'
          }}
        >
          ← BACK
        </div>
        <div style={{
          padding: '0 2rem', display: 'flex', alignItems: 'center',
          fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase'
        }}>
          BRAIN DUMPS
        </div>
      </nav>

      <div style={{ padding: '160px 4rem 4rem', background: T.accent2, borderBottom: T.border }}>
        <h1 style={{
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(5rem, 15vw, 10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.05em', margin: 0,
          color: T.bg, WebkitTextStroke: '3px black', textShadow: T.shadow
        }}>
          THOUGHTS
        </h1>
      </div>

      <div style={{ padding: '6rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        {blogs.length === 0 ? (
          <div style={{ fontFamily: T.fontDisplay, fontSize: '3rem', textAlign: 'center', border: T.border, padding: '4rem', background: '#fff' }}>
            NO POSTS YET. DROP .MD FILES IN /src/content/blogs
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {blogs.map((blog, i) => (
              <BrutalBox key={blog.id} delay={0.1 + i * 0.1} bg={i % 2 === 0 ? '#fff' : T.accent1} onClick={() => navigate(`/personal/thoughts/${blog.id}`)} style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: T.border, paddingBottom: '1rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '4rem', margin: 0, textTransform: 'uppercase', color: i % 2 !== 0 ? '#fff' : '#000', WebkitTextStroke: i % 2 !== 0 ? '2px black' : 'none' }}>
                    {blog.title}
                  </h2>
                  {blog.date && (
                    <span style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', background: T.black, color: '#fff', padding: '0.5rem 1rem' }}>
                      {blog.date}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: '1.8rem', margin: 0, color: i % 2 !== 0 ? '#000' : '#000' }}>
                  {blog.excerpt}
                </p>
              </BrutalBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
