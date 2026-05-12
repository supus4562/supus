import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      height: '100vh', width: '100vw', background: '#000', color: '#00FF66',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', monospace", overflow: 'hidden', textAlign: 'center'
    }}>
      <motion.h1 
        animate={{ x: [-10, 10, -5, 5, 0], opacity: [1, 0.8, 1, 0.4, 1] }} 
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
        style={{ fontSize: 'clamp(8rem, 20vw, 15rem)', margin: 0, lineHeight: 0.8, textShadow: '10px 10px 0px #FF3366' }}
      >
        404
      </motion.h1>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '2rem 0', WebkitTextStroke: '1px #fff' }}>
        SYSTEM ERROR / SECTOR NOT FOUND
      </h2>
      <button 
        onClick={() => navigate('/')}
        style={{
          marginTop: '2rem', padding: '1rem 3rem', background: '#00FF66', color: '#000',
          border: '4px solid #fff', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer',
          textTransform: 'uppercase', boxShadow: '6px 6px 0px #fff', transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.target.style.transform = 'translate(-4px, -4px)'; e.target.style.boxShadow = '10px 10px 0px #fff'; }}
        onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '6px 6px 0px #fff'; }}
      >
        REBOOT / RETURN ROOT
      </button>
    </div>
  )
}
