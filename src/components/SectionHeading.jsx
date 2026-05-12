export default function SectionHeading({ title, subtitle, color = '#000', borderBottom = '4px solid #000' }) {
  return (
    <div style={{ 
      marginBottom: 'clamp(2rem, 5vw, 4rem)', 
      borderBottom, 
      paddingBottom: '1rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-end', 
      flexWrap: 'wrap', 
      gap: '1rem' 
    }}>
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: 'clamp(1.8rem, 8vw, 6rem)',
        textTransform: 'uppercase', margin: 0,
        lineHeight: 0.9, letterSpacing: '-0.05em',
        color,
        wordBreak: 'break-word'
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontWeight: 700, 
          fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
          margin: 0, 
          textTransform: 'uppercase', 
          color 
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
