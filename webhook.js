const localtunnel = require('localtunnel');

localtunnel(5000, { subdomain: 'hf4o87ohg4' }, (err, tunnel) => {
  console.log('Localtunnel running');
});