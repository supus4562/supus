import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const mdFiles = import.meta.glob('../../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: rawContent };
  const fm = match[1];
  const body = match[2];
  const attributes = {};
  fm.split('\n').forEach(line => {
    const splitIndex = line.indexOf(':');
    if (splitIndex > -1) {
      const k = line.slice(0, splitIndex).trim();
      const v = line.slice(splitIndex + 1).replace(/^["']|["']$/g, '').trim();
      attributes[k] = v;
    }
  });
  return { attributes, body };
}

/* ─── NEOBRUTALIST TOKENS ─── */
import { personalTheme as T } from '../theme';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const fileKey = Object.keys(mdFiles).find(path => path.includes(`${slug}.md`));
  if (!fileKey) {
    return (
      <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2.5rem, 8vw, 4rem)', wordBreak: 'break-word', lineHeight: 1.1, color: T.black }}>404 - POST NOT FOUND</h1>
      </div>
    );
  }

  const rawContent = mdFiles[fileKey];
  const { attributes, body } = parseFrontmatter(rawContent);

  return (
    <div style={{ background: T.bgSecondary, color: T.black, minHeight: '100vh' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
        background: T.accent1, borderBottom: T.border, height: '80px'
      }}>
        <div 
          onClick={() => navigate('/personal/thoughts')}
          style={{
            borderRight: T.border, padding: '0 2rem', display: 'flex', alignItems: 'center',
            background: T.black, color: T.accent1, cursor: 'pointer',
            fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2rem)', wordBreak: 'break-word', lineHeight: 1.1, textTransform: 'uppercase'
          }}
        >
          ← ALL THOUGHTS
        </div>
      </nav>

      <article style={{ padding: '160px 4rem 8rem', maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ borderBottom: T.border, paddingBottom: '2rem', marginBottom: '4rem' }}>
          <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 6rem)', margin: '0 0 1rem', textTransform: 'uppercase', lineHeight: 0.9 }}>
            {attributes.title || slug}
          </h1>
          {attributes.date && (
            <span style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: '1.2rem', background: T.black, color: T.bgSecondary, padding: '0.5rem 1rem' }}>
              {attributes.date}
            </span>
          )}
        </header>

        <div className="blog-content" style={{ fontFamily: T.fontBody, fontSize: '1.4rem', lineHeight: 1.8 }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ border: '4px solid #000', borderRadius: 0, padding: '1.5rem', background: '#000', margin: '2rem 0', boxShadow: '6px 6px 0px #FF3366' }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} style={{ background: '#000', color: '#CCFF00', padding: '0.2rem 0.5rem', fontWeight: 700 }} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {body}
          </ReactMarkdown>
        </div>

        <style>{`
          .blog-content h1, .blog-content h2, .blog-content h3 {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            margin-top: 3rem;
            margin-bottom: 1rem;
            line-height: 1.1;
          }
          .blog-content h1 { font-size: 3rem; }
          .blog-content h2 { font-size: 2.5rem; }
          .blog-content p { margin-bottom: 1.5rem; }
          .blog-content blockquote {
            border-left: 8px solid #000;
            margin: 2rem 0;
            padding: 1rem 2rem;
            background: #fff;
            box-shadow: 6px 6px 0px #000;
            font-weight: 700;
          }
          .blog-content code {
            background: #000;
            color: #CCFF00;
            padding: 0.2rem 0.5rem;
            font-weight: 700;
          }
          .blog-content pre {
            background: #000;
            color: #CCFF00;
            padding: 2rem;
            box-shadow: 6px 6px 0px #FF3366;
            overflow-x: auto;
            margin: 2rem 0;
            border: 4px solid #000;
          }
          .blog-content pre code {
            padding: 0;
          }
        `}</style>
      </article>
    </div>
  );
}
