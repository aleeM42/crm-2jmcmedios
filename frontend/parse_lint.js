const fs = require('fs');
const log = fs.readFileSync('lint_json.log', 'utf16le');
if (log.trim().startsWith('[')) {
  const data = JSON.parse(log.trim());
  data.forEach(f => {
    f.messages.forEach(m => {
      console.log(`${f.filePath}:${m.line} - ${m.message}`);
    });
  });
}
