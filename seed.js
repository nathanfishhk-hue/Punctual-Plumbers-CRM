const fs = require('fs');
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
localStorage.setItem('pp_users', JSON.stringify(db.users));
localStorage.setItem('pp_customers', JSON.stringify(db.customers));
localStorage.setItem('pp_materials', JSON.stringify(db.materials));
localStorage.setItem('pp_jobs', JSON.stringify(db.jobs));
console.log('Database seeded to localStorage');