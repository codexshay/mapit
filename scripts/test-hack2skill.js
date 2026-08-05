import https from 'https';

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function test() {
  console.log('Testing Hack2Skill API endpoints...');
  
  const endpoints = [
    'https://hack2skill.com/api/v1/events',
    'https://hack2skill.com/api/events',
    'https://vision.hack2skill.com/api/v1/events',
    'https://devpost.com/api/hackathons',
    'https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons'
  ];

  for (const url of endpoints) {
    const res = await checkUrl(url);
    console.log(`URL: ${url} -> Status: ${res.status || res.error}, Length: ${res.body ? res.body.length : 0}`);
    if (res.body && res.body.length < 500) {
      console.log('Body:', res.body);
    }
  }
}

test();
