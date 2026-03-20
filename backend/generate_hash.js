import bcrypt from 'bcrypt';
const password = process.argv[2] || 'Yossuel.crm26';
const hash = await bcrypt.hash(password, 10);
import fs from 'fs';
fs.writeFileSync('hash.txt', hash.trim());
console.log('done');
