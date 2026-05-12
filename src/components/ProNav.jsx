import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const T = {
  bg: '#000000',
  accent: '#00FF66',
  borderWhite: '4px solid #fff',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Space Grotesk', sans-serif",
};

export default function ProNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItem = (text, path, isAccent = false, isRight = false, isDownload = false) => {
    const isActive = location.pathname === path;
    const baseStyle = {
      padding: '0 clamp(1rem, 2vw, 1.5rem)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isActive ? '#fff' : T.bg,
      color: isActive ? '#000' : (isAccent ? T.accent : '#fff'),
      cursor: 'pointer',
      fontFamily: T.fontBody, fontWeight: 700, fontSize: 'clamp(1rem, 3vw, 1.2rem)', textTransform: 'uppercase',
      transition: 'background 0.2s, color 0.2s',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      borderRight: isRight ? 'none' : T.borderWhite,
      borderLeft: isRight ? T.borderWhite : 'none',
      height: '80px',
    };

    const handlers = {
      onMouseEnter: e => { e.target.style.background = isAccent ? T.accent : '#fff'; e.target.style.color = '#000'; },
      onMouseLeave: e => { e.target.style.background = isActive ? '#fff' : T.bg; e.target.style.color = isActive ? '#000' : (isAccent ? T.accent : '#fff'); },
      onClick: () => {
        setIsOpen(false);
        if (!isDownload) navigate(path);
      }
    };

    if (isDownload) {
      return <a key={text} href={path} download style={baseStyle} {...handlers}>{text}</a>;
    }
    return <div key={text} style={baseStyle} {...handlers}>{text}</div>;
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
        background: T.bg, borderBottom: T.borderWhite, height: '80px',
      }}>
        <style>{`
          .desktop-nav { display: flex; }
          .mobile-menu-btn { display: none; }
          .mobile-dropdown { display: none; }
          @media (max-width: 800px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
            .mobile-dropdown { display: flex; flex-direction: column; position: fixed; top: 80px; left: 0; right: 0; background: #000; border-bottom: 4px solid #fff; }
            .mobile-dropdown > div, .mobile-dropdown > a { border-bottom: 4px solid #fff; border-left: none !important; border-right: none !important; }
            .mobile-dropdown > div:last-child, .mobile-dropdown > a:last-child { border-bottom: none; }
          }
        `}</style>
        
        <div style={{ display: 'flex' }}>
          <div onClick={() => navigate('/')} style={{
            padding: '0 clamp(1rem, 3vw, 2rem)', borderRight: T.borderWhite, display: 'flex', alignItems: 'center',
            background: T.bg, color: T.accent, cursor: 'pointer', height: '100%',
            fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 2rem)', textTransform: 'uppercase',
            transition: 'background 0.2s, color 0.2s'
          }}
          onMouseEnter={e => { e.target.style.background = T.accent; e.target.style.color = '#000'; }}
          onMouseLeave={e => { e.target.style.background = T.bg; e.target.style.color = T.accent; }}
          >
            ← ROOT
          </div>
          
          <div className="desktop-nav">
            {navItem('HOME', '/professional')}
            {navItem('PROJECTS', '/professional/projects')}
            {navItem('RESEARCH', '/professional/research')}
            {navItem('LIBRARY', '/professional/library')}
          </div>
        </div>

        <div className="desktop-nav">
          {navItem('DOWNLOAD CV ↓', '/Hamza_Hassan_CV.docx', false, true, true)}
        </div>

        <div 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '0 1.5rem', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer', height: '100%', borderLeft: T.borderWhite
          }}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown" style={{ zIndex: 99 }}>
          {navItem('HOME', '/professional', false, true)}
          {navItem('PROJECTS', '/professional/projects', false, true)}
          {navItem('RESEARCH', '/professional/research', false, true)}
          {navItem('LIBRARY', '/professional/library', false, true)}
          {navItem('DOWNLOAD CV ↓', '/Hamza_Hassan_CV.docx', false, true, true)}
        </div>
      )}
    </>
  );
}
