import { useNavigate, useLocation } from 'react-router-dom';

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

  const navItem = (text, path, isAccent = false, isRight = false, isDownload = false) => {
    const isActive = location.pathname === path;
    const baseStyle = {
      padding: '0 clamp(0.5rem, 2vw, 1.5rem)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isActive ? '#fff' : T.bg,
      color: isActive ? '#000' : (isAccent ? T.accent : '#fff'),
      cursor: 'pointer',
      fontFamily: T.fontBody, fontWeight: 700, fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', textTransform: 'uppercase',
      transition: 'background 0.2s, color 0.2s',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      borderRight: isRight ? 'none' : T.borderWhite,
      borderLeft: isRight ? T.borderWhite : 'none',
    };

    const handlers = {
      onMouseEnter: e => { e.target.style.background = isAccent ? T.accent : '#fff'; e.target.style.color = '#000'; },
      onMouseLeave: e => { e.target.style.background = isActive ? '#fff' : T.bg; e.target.style.color = isActive ? '#000' : (isAccent ? T.accent : '#fff'); }
    };

    if (isDownload) {
      return <a key={text} href={path} download style={baseStyle} {...handlers}>{text}</a>;
    }
    return <div key={text} onClick={() => navigate(path)} style={baseStyle} {...handlers}>{text}</div>;
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
      background: T.bg, borderBottom: T.borderWhite, height: '80px',
      overflowX: 'auto', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none'
    }}>
      <style>{`nav::-webkit-scrollbar { display: none; }`}</style>
      <div style={{ display: 'flex' }}>
        <div onClick={() => navigate('/')} style={{
          padding: '0 clamp(1rem, 3vw, 2rem)', borderRight: T.borderWhite, display: 'flex', alignItems: 'center',
          background: T.bg, color: T.accent, cursor: 'pointer',
          fontFamily: T.fontDisplay, fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 2rem)', textTransform: 'uppercase',
          transition: 'background 0.2s, color 0.2s'
        }}
        onMouseEnter={e => { e.target.style.background = T.accent; e.target.style.color = '#000'; }}
        onMouseLeave={e => { e.target.style.background = T.bg; e.target.style.color = T.accent; }}
        >
          ← ROOT
        </div>
        {navItem('HOME', '/professional')}
        {navItem('PROJECTS', '/professional/projects')}
        {navItem('RESEARCH', '/professional/research')}
        {navItem('LIBRARY', '/professional/library')}
      </div>
      <div style={{ display: 'flex' }}>
        {navItem('DOWNLOAD CV ↓', '/Hamza_Hassan_CV.docx', false, true, true)}
      </div>
    </nav>
  );
}
