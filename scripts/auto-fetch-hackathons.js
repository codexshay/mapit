import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFilePath = path.join(__dirname, '..', 'src', 'data', 'generated', 'auto_hackathons.json');

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function fetchJson(url, options = {}) {
  return new Promise((resolve) => {
    const parsedUrl = new URL(url);
    const reqOpts = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        ...(options.headers || {})
      }
    };

    const req = https.request(reqOpts, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function determineCategory(title, desc, org) {
  const t = (title + ' ' + desc + ' ' + org).toLowerCase();
  if (t.includes('quiz')) return 'Quiz';
  if (t.includes('fest') || t.includes('symposium') || t.includes('cultural')) return 'College Fest';
  if (t.includes('scholarship') || t.includes('grant') || t.includes('fellowship')) return 'Scholarship';
  if (t.includes('workshop') || t.includes('masterclass')) return 'Workshop';
  if (t.includes('conference') || t.includes('summit') || t.includes('forum')) return 'Conference';
  if (t.includes('hiring') || t.includes('placement') || t.includes('recruitment')) return 'Hiring Challenge';
  if (t.includes('bootcamp') || t.includes('cohort')) return 'Bootcamp';
  if (t.includes('cfp') || t.includes('call for paper') || t.includes('speaker')) return 'CFP';
  if (t.includes('training') || t.includes('course')) return 'Training';
  return 'Hackathon';
}

async function run() {
  console.log('🤖 MapIT Multi-Source Auto-Ingestion Bot starting...');
  const newEvents = [];

  // Source 1: Devpost Public API (Global Software Hackathons & AI Sprints)
  try {
    console.log('📡 Fetching Devpost Global Hackathons...');
    const devpostData = await fetchJson('https://devpost.com/api/hackathons');
    if (devpostData && Array.isArray(devpostData.hackathons)) {
      devpostData.hackathons.forEach(h => {
        if (!h.title || !h.url) return;
        const id = slugify(`devpost-${h.title}`);
        
        let mode = 'Online';
        let loc = 'Online Submission';
        if (h.displayed_location && h.displayed_location.location) {
          loc = h.displayed_location.location;
          if (!loc.toLowerCase().includes('online')) {
            mode = 'In-person';
          }
        }

        const category = determineCategory(h.title, h.description || '', h.organization_name || '');

        newEvents.push({
          id,
          title: h.title.trim(),
          organizer: h.organization_name || 'Devpost Ecosystem',
          region: loc.toLowerCase().includes('india') ? 'India' : 'Global',
          prizes: h.prize_amount || 'Prizes & Global Recognition Pool',
          themes: Array.isArray(h.themes) && h.themes.length > 0 ? h.themes.map(t => t.name || String(t)) : ['Software Engineering', 'AI/ML', 'Cloud'],
          difficulty: 'All Developer Levels',
          daysLeft: h.time_left_to_submission ? Math.max(1, parseInt(h.time_left_to_submission, 10) || 7) : 14,
          url: h.url.trim(),
          type: mode,
          location: loc,
          description: h.description || `${h.title} is an active developer hackathon hosted on Devpost. Build innovative projects, collaborate globally, and win cash prizes & certificates.`,
          targetAudience: 'Developers, Designers, Data Scientists, and Tech Enthusiasts',
          careerBenefit: 'Direct portfolio feature, global project visibility, and networking with sponsor hiring teams.',
          category,
          scheduleStatus: 'Active',
          autoIngested: true,
          fetchedAt: new Date().toISOString().split('T')[0]
        });
      });
    }
  } catch (err) {
    console.error('Devpost Error:', err.message);
  }

  // Source 2: Unstop Public API (Hack2Skill, Govt Challenges, Campus Fests, Quizzes & Hiring)
  try {
    console.log('📡 Fetching Unstop / Hack2Skill / Govt & Campus Opportunities...');
    const unstopData = await fetchJson('https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons');
    if (unstopData && unstopData.data && Array.isArray(unstopData.data.data)) {
      unstopData.data.data.forEach(item => {
        if (!item.title) return;
        const id = slugify(`unstop-${item.title}`);
        
        const orgName = item.organisation?.name || item.company_name || 'Tech Ecosystem';
        const itemUrl = item.seo_url ? `https://unstop.com/${item.seo_url}` : 'https://unstop.com/hackathons';
        const category = determineCategory(item.title, item.summary || '', orgName);

        newEvents.push({
          id,
          title: item.title.trim(),
          organizer: orgName,
          region: 'India',
          prizes: item.prizes || 'Certificates, Badges & Cash Rewards',
          themes: Array.isArray(item.filters) ? item.filters.map(f => f.name || String(f)) : ['Technology', 'Software Engineering'],
          difficulty: 'Open to All',
          daysLeft: item.days_left ? Math.max(1, parseInt(item.days_left, 10) || 5) : 10,
          url: itemUrl,
          type: item.region === 'online' ? 'Online' : 'In-person',
          location: item.city || item.region || 'India / Online',
          description: item.summary || `${item.title} organized by ${orgName}. Participate in live problem statements, gain hands-on experience, and accelerate your career credentials.`,
          targetAudience: 'Engineering Students, Fresh Graduates, Developers & Innovation Teams',
          careerBenefit: 'Industry recognition, direct skill validation badges, and recruitment pathways.',
          category,
          scheduleStatus: 'Active',
          autoIngested: true,
          fetchedAt: new Date().toISOString().split('T')[0]
        });
      });
    }
  } catch (err) {
    console.error('Unstop Error:', err.message);
  }

  // Source 3: HackerRank Contests Public Endpoint (Study Portals & Coding Contests)
  try {
    console.log('📡 Fetching HackerRank Public Contests...');
    const hrData = await fetchJson('https://www.hackerrank.com/rest/contests/upcoming');
    if (hrData && Array.isArray(hrData.models)) {
      hrData.models.forEach(c => {
        if (!c.name) return;
        const id = slugify(`hackerrank-${c.name}`);
        const itemUrl = c.slug ? `https://www.hackerrank.com/contests/${c.slug}` : 'https://www.hackerrank.com/contests';

        newEvents.push({
          id,
          title: c.name.trim(),
          organizer: 'HackerRank Community',
          region: 'Global',
          prizes: 'HackerRank Badges & Global Leaderboard Ranking',
          themes: ['Algorithms', 'Data Structures', 'Competitive Programming'],
          difficulty: 'Intermediate / Advanced',
          daysLeft: 5,
          url: itemUrl,
          type: 'Online',
          location: 'HackerRank Web Platform',
          description: `${c.name} hosted on HackerRank. Solve algorithmic challenges, optimize code performance, and benchmark your ranking globally.`,
          targetAudience: 'Competitive Programmers, CS Students, and Software Engineers',
          careerBenefit: 'Showcase verified problem-solving speed and algorithmic proficiency to top tech recruiters.',
          category: 'Challenge',
          scheduleStatus: 'Active',
          autoIngested: true,
          fetchedAt: new Date().toISOString().split('T')[0]
        });
      });
    }
  } catch (err) {
    console.error('HackerRank Error:', err.message);
  }

  // Source 4: Challenge.gov Government Innovation API (Govt & Public Policy Challenges)
  try {
    console.log('📡 Fetching Challenge.gov Government Open API...');
    const govtData = await fetchJson('https://api.challenge.gov/api/v1/challenges');
    if (govtData && Array.isArray(govtData.challenges)) {
      govtData.challenges.slice(0, 10).forEach(g => {
        if (!g.title) return;
        const id = slugify(`govt-${g.title}`);
        const itemUrl = g.custom_url || `https://www.challenge.gov/challenge/${g.id}/`;

        newEvents.push({
          id,
          title: g.title.trim(),
          organizer: g.agency_name || 'Government Innovation Initiative',
          region: 'Global',
          prizes: g.total_prize_offered ? `$${g.total_prize_offered} Cash Awards Pool` : 'Public Innovation Grants & Federal Recognition',
          themes: ['Government Tech', 'Public Safety', 'AI & Data Science', 'Clean Energy'],
          difficulty: 'All Levels',
          daysLeft: 20,
          url: itemUrl,
          type: 'Online',
          location: 'Government Submission Portal',
          description: g.tagline || `${g.title} - Official government initiative inviting developers, researchers, and startups to build innovative technology solutions for public impact.`,
          targetAudience: 'Innovators, Developers, Academic Researchers, and Startups',
          careerBenefit: 'Direct federal agency recognition, public sector grants, and high-impact portfolio credentials.',
          category: 'Hackathon',
          scheduleStatus: 'Active',
          autoIngested: true,
          fetchedAt: new Date().toISOString().split('T')[0]
        });
      });
    }
  } catch (err) {
    console.error('Govt API Error:', err.message);
  }

  // Deduplicate and Merge
  const eventsMap = new Map();
  newEvents.forEach(item => {
    if (!eventsMap.has(item.id)) {
      eventsMap.set(item.id, item);
    }
  });

  const mergedList = Array.from(eventsMap.values());

  // Ensure output directory exists
  const dir = path.dirname(outputFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(mergedList, null, 2), 'utf8');
  console.log(`✅ Multi-Source Ingestion Complete! Saved ${mergedList.length} live auto-ingested events to auto_hackathons.json`);
}

run();
