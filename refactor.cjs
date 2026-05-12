const fs = require('fs');
const path = require('path');

const proFiles = [
  'src/pages/AllProjects.jsx',
  'src/pages/AllResearch.jsx',
  'src/pages/Library.jsx'
];

const personalFiles = [
  'src/pages/Gallery.jsx',
  'src/pages/Thoughts.jsx',
  'src/pages/BlogPost.jsx'
];

function processFile(filePath, isPro) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace const T = { ... }; with import
  const tRegex = /const T = \{[\s\S]*?\};\n/;
  const importStatement = isPro 
    ? "import { proTheme as T } from '../theme';\n"
    : "import { personalTheme as T } from '../theme';\n";
  
  if (tRegex.test(content)) {
    content = content.replace(tRegex, importStatement);
  } else {
    console.log('T not found in', filePath);
  }

  // Replace grid layouts
  content = content.replace(/minmax\(400px,/g, 'minmax(min(100%, 400px),');
  content = content.replace(/minmax\(300px,/g, 'minmax(min(100%, 300px),');

  // Replace hardcoded font sizes
  content = content.replace(/fontSize: '2rem'/g, "fontSize: 'clamp(1.5rem, 5vw, 2rem)', wordBreak: 'break-word', lineHeight: 1.1");
  content = content.replace(/fontSize: '2.5rem'/g, "fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', wordBreak: 'break-word', lineHeight: 1.1");
  content = content.replace(/fontSize: '3rem'/g, "fontSize: 'clamp(2rem, 8vw, 3rem)', wordBreak: 'break-word', lineHeight: 1.1");
  content = content.replace(/fontSize: '4rem'/g, "fontSize: 'clamp(2.5rem, 8vw, 4rem)', wordBreak: 'break-word', lineHeight: 1.1");

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Processed', filePath);
}

proFiles.forEach(f => processFile(f, true));
personalFiles.forEach(f => processFile(f, false));

// Fix Personal.jsx and Professional.jsx T tokens
['src/pages/Personal.jsx', 'src/pages/Professional.jsx'].forEach(f => {
    const fullPath = path.join(__dirname, f);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');
    const tRegex = /const T = \{[\s\S]*?\};\n/;
    const importStatement = f.includes('Professional') 
      ? "import { proTheme as T } from '../theme';\n"
      : "import { personalTheme as T } from '../theme';\n";
    if (tRegex.test(content)) {
      content = content.replace(tRegex, importStatement);
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Processed T in', f);
});

// Fix Professional.jsx hoverColor
let proPath = path.join(__dirname, 'src/pages/Professional.jsx');
let proContent = fs.readFileSync(proPath, 'utf8');
proContent = proContent.replace(/hoverColor="#fff" delay=/g, 'hoverColor="#fff" hoverTextColor="#000" delay=');
fs.writeFileSync(proPath, proContent, 'utf8');
console.log('Fixed Professional.jsx hoverTextColor');

