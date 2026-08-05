import importedCatalog from '../data/generated/catalog-normalized.json';
import importedPortals from '../data/generated/portals.json';

export interface StudyPortalLink {
  portal: string;
  url: string;
  badgeFormat?: string;
}

const W3SCHOOLS_TOPIC_MAP: Record<string, string> = {
  "html": "https://www.w3schools.com/html/",
  "html introduction": "https://www.w3schools.com/html/html_intro.asp",
  "intro to html & css": "https://www.w3schools.com/html/html_intro.asp",
  "css": "https://www.w3schools.com/css/",
  "responsive web design": "https://www.w3schools.com/css/css_rwd_intro.asp",
  "rwd": "https://www.w3schools.com/css/css_rwd_intro.asp",
  "bootstrap": "https://www.w3schools.com/bootstrap5/",
  "bootstrap 5": "https://www.w3schools.com/bootstrap5/",
  "bootstrap 4": "https://www.w3schools.com/bootstrap4/",
  "bootstrap 3": "https://www.w3schools.com/bootstrap/",
  "how to bootstrap": "https://www.w3schools.com/bootstrap5/",
  "w3.css": "https://www.w3schools.com/w3css/",
  "w3css": "https://www.w3schools.com/w3css/",
  "sass": "https://www.w3schools.com/sass/",
  "colors": "https://www.w3schools.com/colors/",
  "icons": "https://www.w3schools.com/icons/",
  "svg": "https://www.w3schools.com/graphics/svg_intro.asp",
  "canvas": "https://www.w3schools.com/graphics/canvas_intro.asp",
  "graphics": "https://www.w3schools.com/graphics/",
  "accessibility": "https://www.w3schools.com/accessibility/",
  "how to": "https://www.w3schools.com/howto/",
  "javascript": "https://www.w3schools.com/js/",
  "js": "https://www.w3schools.com/js/",
  "typescript": "https://www.w3schools.com/typescript/",
  "python": "https://www.w3schools.com/python/",
  "java": "https://www.w3schools.com/java/",
  "c": "https://www.w3schools.com/c/",
  "c++": "https://www.w3schools.com/cpp/",
  "cpp": "https://www.w3schools.com/cpp/",
  "c#": "https://www.w3schools.com/cs/",
  "csharp": "https://www.w3schools.com/cs/",
  "cs": "https://www.w3schools.com/cs/",
  "php": "https://www.w3schools.com/php/",
  "go": "https://www.w3schools.com/go/",
  "golang": "https://www.w3schools.com/go/",
  "kotlin": "https://www.w3schools.com/kotlin/",
  "swift": "https://www.w3schools.com/swift/",
  "rust": "https://www.w3schools.com/rust/",
  "r": "https://www.w3schools.com/r/",
  "bash": "https://www.w3schools.com/bash/",
  "shell": "https://www.w3schools.com/bash/",
  "asp": "https://www.w3schools.com/asp/",
  "react": "https://www.w3schools.com/react/",
  "reactjs": "https://www.w3schools.com/react/",
  "angular": "https://www.w3schools.com/angular/",
  "angularjs": "https://www.w3schools.com/angular/",
  "vue": "https://www.w3schools.com/vue/",
  "vuejs": "https://www.w3schools.com/vue/",
  "jquery": "https://www.w3schools.com/jquery/",
  "ajax": "https://www.w3schools.com/js/js_ajax_intro.asp",
  "json": "https://www.w3schools.com/js/js_json_intro.asp",
  "appml": "https://www.w3schools.com/appml/",
  "w3.js": "https://www.w3schools.com/w3js/",
  "nodejs": "https://www.w3schools.com/nodejs/",
  "node.js": "https://www.w3schools.com/nodejs/",
  "node": "https://www.w3schools.com/nodejs/",
  "django": "https://www.w3schools.com/django/",
  "sql": "https://www.w3schools.com/sql/",
  "mysql": "https://www.w3schools.com/mysql/",
  "postgresql": "https://www.w3schools.com/postgresql/",
  "postgres": "https://www.w3schools.com/postgresql/",
  "mongodb": "https://www.w3schools.com/mongodb/",
  "mongo": "https://www.w3schools.com/mongodb/",
  "data science": "https://www.w3schools.com/datascience/",
  "numpy": "https://www.w3schools.com/python/numpy/",
  "pandas": "https://www.w3schools.com/python/pandas/",
  "scipy": "https://www.w3schools.com/python/scipy/",
  "matplotlib": "https://www.w3schools.com/python/matplotlib_intro.asp",
  "statistics": "https://www.w3schools.com/statistics/",
  "machine learning": "https://www.w3schools.com/python/python_ml_getting_started.asp",
  "ml": "https://www.w3schools.com/python/python_ml_getting_started.asp",
  "artificial intelligence": "https://www.w3schools.com/ai/",
  "ai": "https://www.w3schools.com/ai/",
  "generative ai": "https://www.w3schools.com/gen_ai/",
  "gen ai": "https://www.w3schools.com/gen_ai/",
  "chatgpt": "https://www.w3schools.com/gen_ai/chatgpt-3-5/",
  "google bard": "https://www.w3schools.com/gen_ai/google_bard/",
  "gemini": "https://www.w3schools.com/gen_ai/google_bard/",
  "data structures & algorithms": "https://www.w3schools.com/dsa/",
  "data structures and algorithms": "https://www.w3schools.com/dsa/",
  "dsa": "https://www.w3schools.com/dsa/",
  "data structures": "https://www.w3schools.com/dsa/",
  "algorithms": "https://www.w3schools.com/dsa/",
  "aws": "https://www.w3schools.com/aws/",
  "git": "https://www.w3schools.com/git/",
  "github": "https://www.w3schools.com/git/",
  "cyber security": "https://www.w3schools.com/cybersecurity/",
  "cybersecurity": "https://www.w3schools.com/cybersecurity/",
  "excel": "https://www.w3schools.com/excel/",
  "google sheets": "https://www.w3schools.com/googlesheets/",
  "sheets": "https://www.w3schools.com/googlesheets/",
  "xml": "https://www.w3schools.com/xml/",
  "utf-8 & character sets": "https://www.w3schools.com/charsets/",
  "raspberry pi": "https://www.w3schools.com/raspberrypi/",
  "programming basics": "https://www.w3schools.com/programming/",
  "intro to programming": "https://www.w3schools.com/programming/"
};

/**
 * Resolves a direct, specific course/tutorial deep link for any given skill on a specific Study Portal.
 * Prevents redirecting to generic homepage domains or misaligned topic URLs.
 */
export function getPortalCourseDirectUrl(
  portalNameOrSlug: string = '',
  skillOrToolName: string = '',
  existingUrl?: string
): string {
  // If an exact, verified URL from the portal JSON exists, use it directly!
  if (existingUrl && existingUrl.trim() && existingUrl.startsWith('http')) {
    return existingUrl.trim();
  }

  const cleanSkillName = (skillOrToolName || '').trim();
  if (!cleanSkillName) {
    return 'https://www.coursera.org/';
  }

  const p = (portalNameOrSlug || '').toLowerCase().trim();
  const key = cleanSkillName.toLowerCase().trim();
  const q = encodeURIComponent(cleanSkillName);

  // 1. W3SCHOOLS SPECIFIC TOPIC MAPPING & STATIC TUTORIAL PAGES
  if (p.includes('w3schools')) {
    if (W3SCHOOLS_TOPIC_MAP[key]) {
      return W3SCHOOLS_TOPIC_MAP[key];
    }
    for (const [tName, tUrl] of Object.entries(W3SCHOOLS_TOPIC_MAP)) {
      if (key === tName || key.includes(tName) || tName.includes(key)) {
        return tUrl;
      }
    }
    const slug = cleanSkillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://www.w3schools.com/${slug}/`;
  }

  // If existingUrl is already a direct static course/tutorial page specific to this item, keep it
  if (existingUrl && (
    existingUrl.includes('/courses/') || 
    existingUrl.includes('/learn/') ||
    existingUrl.includes('/tutorial/') ||
    existingUrl.includes('/pathway/') ||
    existingUrl.includes('/module/')
  ) && !existingUrl.endsWith('/catalog') && !existingUrl.endsWith('/browse')) {
    return existingUrl;
  }

  // 2. MICROSOFT LEARN
  if (p.includes('microsoft') || p.includes('ms-learn') || p.includes('azure')) {
    return `https://learn.microsoft.com/en-us/search/?terms=${q}`;
  }

  // 3. AWS SKILL BUILDER
  if (p.includes('aws') || p.includes('amazon')) {
    return `https://explore.skillbuilder.aws/learn/search?type=COURSE&query=${q}`;
  }

  // 4. GOOGLE CLOUD SKILLS BOOST / GOOGLE CLOUD
  if (p.includes('skills boost') || p.includes('cloudskillsboost') || (p.includes('google') && p.includes('cloud'))) {
    return `https://www.cloudskillsboost.google/catalog?keywords=${q}`;
  }

  // 5. GOOGLE DEVELOPERS LEARN
  if (p.includes('google developers') || p.includes('developers.google')) {
    return `https://developers.google.com/learn/search?q=${q}`;
  }

  // 6. GROW WITH GOOGLE
  if (p.includes('grow with google')) {
    return `https://grow.google/search/?q=${q}`;
  }

  // 7. GOOGLE TECH DEV GUIDE
  if (p.includes('tech dev guide') || p.includes('techdevguide')) {
    return `https://techdevguide.withgoogle.com/resources/?q=${q}`;
  }

  // 8. CISCO SKILLS FOR ALL / NETACAD
  if (p.includes('cisco') || p.includes('netacad') || p.includes('skills for all')) {
    return `https://skillsforall.com/search?query=${q}`;
  }

  // 9. GEEKSFORGEEKS
  if (p.includes('geeksforgeeks') || p.includes('gfg')) {
    return `https://www.geeksforgeeks.org/search/?q=${q}`;
  }

  // 10. FUTURESKILLS PRIME
  if (p.includes('futureskills') || p.includes('future skills')) {
    return `https://www.futureskillsprime.in/iDH/fsp/Catalog?terms=${q}`;
  }

  // 11. SWAYAM / NPTEL
  if (p.includes('swayam') || p.includes('nptel')) {
    return `https://swayam.gov.in/explorer?searchText=${q}`;
  }

  // 12. COURSERA
  if (p.includes('coursera')) {
    return `https://www.coursera.org/search?query=${q}`;
  }

  // 13. EDX
  if (p.includes('edx')) {
    return `https://www.edx.org/search?q=${q}`;
  }

  // 14. UDEMY
  if (p.includes('udemy')) {
    return `https://www.udemy.com/courses/search/?q=${q}`;
  }

  // 15. FREECODECAMP
  if (p.includes('freecodecamp')) {
    return `https://www.freecodecamp.org/news/search/?query=${q}`;
  }

  // 16. LINUX FOUNDATION
  if (p.includes('linux')) {
    return `https://training.linuxfoundation.org/?s=${q}`;
  }

  // 17. SERVICENOW
  if (p.includes('servicenow')) {
    return `https://nowlearning.servicenow.com/lxp/en/pages/search?q=${q}`;
  }

  // 18. LINKEDIN LEARNING
  if (p.includes('linkedin')) {
    return `https://www.linkedin.com/learning/search?keywords=${q}`;
  }

  // 19. IBM SKILLSBUILD
  if (p.includes('ibm') || p.includes('skillsbuild')) {
    return `https://skillsbuild.org/learning-catalog?query=${q}`;
  }

  // 20. INFOSYS SPRINGBOARD
  if (p.includes('infosys') || p.includes('springboard')) {
    return `https://infyspringboard.onwingspan.com/web/en/web?query=${q}`;
  }

  // 21. FEDVTE / CISA
  if (p.includes('fedvte') || p.includes('cisa') || p.includes('niccs')) {
    return `https://niccs.cisa.gov/training/catalog?query=${q}`;
  }

  // 22. GREEN SOFTWARE FOUNDATION
  if (p.includes('green software')) {
    return `https://learn.greensoftware.foundation/search?q=${q}`;
  }

  // 23. PLURALSIGHT
  if (p.includes('pluralsight')) {
    return `https://www.pluralsight.com/search?q=${q}`;
  }

  // 24. CODECADEMY
  if (p.includes('codecademy')) {
    return `https://www.codecademy.com/search?query=${q}`;
  }

  // 25. KHAN ACADEMY
  if (p.includes('khan')) {
    return `https://www.khanacademy.org/search?page_search_query=${q}`;
  }

  // 26. DATACAMP
  if (p.includes('datacamp')) {
    return `https://www.datacamp.com/search?q=${q}`;
  }

  // 27. MIT OPENCOURSEWARE
  if (p.includes('mit') || p.includes('opencourseware')) {
    return `https://ocw.mit.edu/search/?q=${q}`;
  }

  // 28. HARVARD ONLINE
  if (p.includes('harvard')) {
    return `https://pll.harvard.edu/catalog?keywords=${q}`;
  }

  // 29. STANFORD ONLINE
  if (p.includes('stanford')) {
    return `https://online.stanford.edu/search/catalog?keywords=${q}`;
  }

  // 30. BAELDUNG
  if (p.includes('baeldung')) {
    return `https://www.baeldung.com/?s=${q}`;
  }

  // 31. LEETCODE
  if (p.includes('leetcode')) {
    return `https://leetcode.com/problemset/all/?search=${q}`;
  }

  // 32. HACKERRANK
  if (p.includes('hackerrank')) {
    return `https://www.hackerrank.com/domains/${encodeURIComponent(cleanSkillName.toLowerCase().replace(/\s+/g, '-'))}`;
  }

  // 33. ROADMAP.SH
  if (p.includes('roadmap')) {
    return `https://roadmap.sh/${encodeURIComponent(cleanSkillName.toLowerCase().replace(/\s+/g, '-'))}`;
  }

  // 34. MDN
  if (p.includes('mdn') || p.includes('mozilla')) {
    return `https://developer.mozilla.org/en-US/search?q=${q}`;
  }

  // Default Coursera Course Deep Search for any other general portal
  return `https://www.coursera.org/search?query=${q}`;
}

/**
 * Returns verified Study Portals for any given skill, tool, certification, or job role name,
 * with direct course/tutorial deep links.
 */
export function getOfferedStudyPortals(
  itemName: string, 
  categoryOrDomain: string = ''
): StudyPortalLink[] {
  if (!itemName) {
    return [{ portal: 'Coursera Learning Hub', url: 'https://www.coursera.org/' }];
  }

  const lowerItem = itemName.toLowerCase().trim();
  const lowerCat = categoryOrDomain.toLowerCase().trim();
  const portalsMap = new Map<string, StudyPortalLink>();

  // 1. Exact or partial match in normalized catalog JSON
  const catalogMatches = importedCatalog.filter((rec: any) => 
    rec && (
      rec.skillOrTool.toLowerCase().includes(lowerItem) ||
      lowerItem.includes(rec.skillOrTool.toLowerCase()) ||
      rec.topic.toLowerCase().includes(lowerItem) ||
      rec.domain.toLowerCase().includes(lowerItem)
    )
  );

  catalogMatches.slice(0, 4).forEach((rec: any) => {
    if (rec.portal && !portalsMap.has(rec.portal)) {
      portalsMap.set(rec.portal, {
        portal: rec.portal,
        url: getPortalCourseDirectUrl(rec.portal, itemName, rec.officialUrl),
        badgeFormat: rec.learningFormat ? rec.learningFormat.split(',')[0] : undefined
      });
    }
  });

  // 2. Keyword & Brand Domain Smart Deep-Link Fallbacks
  if (
    lowerItem.includes('azure') || 
    lowerItem.includes('microsoft') || 
    lowerItem.includes('active directory') || 
    lowerItem.includes('intune') || 
    lowerItem.includes('sccm') || 
    lowerItem.includes('windows') || 
    lowerItem.includes('m365') || 
    lowerItem.includes('powershell') || 
    lowerItem.includes('gpo') || 
    lowerItem.includes('entra') ||
    lowerItem.includes('c#') ||
    lowerItem.includes('.net')
  ) {
    portalsMap.set('Microsoft Learn', {
      portal: 'Microsoft Learn',
      url: getPortalCourseDirectUrl('Microsoft Learn', itemName)
    });
  }

  if (
    lowerItem.includes('aws') || 
    lowerItem.includes('amazon') || 
    lowerItem.includes('ec2') || 
    lowerItem.includes('s3') || 
    lowerItem.includes('lambda') || 
    lowerItem.includes('cloudwatch')
  ) {
    portalsMap.set('AWS Skill Builder', {
      portal: 'AWS Skill Builder',
      url: getPortalCourseDirectUrl('AWS Skill Builder', itemName)
    });
  }

  if (
    lowerItem.includes('google') || 
    lowerItem.includes('gcp') || 
    lowerItem.includes('bigquery') || 
    lowerItem.includes('kubernetes') || 
    lowerItem.includes('vertex') || 
    lowerItem.includes('android') || 
    lowerItem.includes('flutter') || 
    lowerItem.includes('firebase')
  ) {
    portalsMap.set('Google Cloud Skills Boost', {
      portal: 'Google Cloud Skills Boost',
      url: getPortalCourseDirectUrl('Google Cloud Skills Boost', itemName)
    });
  }

  if (
    lowerItem.includes('cisco') || 
    lowerItem.includes('ccna') || 
    lowerItem.includes('network') || 
    lowerItem.includes('router') || 
    lowerItem.includes('switch') || 
    lowerItem.includes('ospf') || 
    lowerItem.includes('bgp') ||
    lowerItem.includes('firewall')
  ) {
    portalsMap.set('Cisco Skills for All', {
      portal: 'Cisco Skills for All',
      url: getPortalCourseDirectUrl('Cisco Skills for All', itemName)
    });
  }

  if (
    lowerItem.includes('linux') || 
    lowerItem.includes('red hat') || 
    lowerItem.includes('bash') || 
    lowerItem.includes('docker') || 
    lowerItem.includes('devops') || 
    lowerItem.includes('ansible') || 
    lowerItem.includes('cka') || 
    lowerCat.includes('devops') || 
    lowerCat.includes('cloud')
  ) {
    portalsMap.set('Linux Foundation Learn', {
      portal: 'Linux Foundation Learn',
      url: getPortalCourseDirectUrl('Linux Foundation Learn', itemName)
    });
  }

  if (
    lowerItem.includes('python') || 
    lowerItem.includes('sql') || 
    lowerItem.includes('html') || 
    lowerItem.includes('css') || 
    lowerItem.includes('javascript') || 
    lowerItem.includes('web') || 
    lowerItem.includes('frontend') || 
    lowerItem.includes('c++') || 
    lowerItem.includes('java')
  ) {
    portalsMap.set('W3Schools', {
      portal: 'W3Schools',
      url: getPortalCourseDirectUrl('W3Schools', itemName)
    });
    portalsMap.set('GeeksforGeeks', {
      portal: 'GeeksforGeeks',
      url: getPortalCourseDirectUrl('GeeksforGeeks', itemName)
    });
  }

  if (
    lowerItem.includes('servicenow') || 
    lowerItem.includes('itsm') || 
    lowerItem.includes('helpdesk') || 
    lowerItem.includes('ticket')
  ) {
    portalsMap.set('ServiceNow Learning', {
      portal: 'ServiceNow Learning',
      url: getPortalCourseDirectUrl('ServiceNow Learning', itemName)
    });
  }

  if (
    lowerItem.includes('nptel') || 
    lowerItem.includes('nielit') || 
    lowerItem.includes('swayam') || 
    lowerCat.includes('government')
  ) {
    portalsMap.set('Swayam NPTEL', {
      portal: 'Swayam NPTEL',
      url: getPortalCourseDirectUrl('Swayam NPTEL', itemName)
    });
  }

  // Ensure every item has at least 2 study portals available
  if (portalsMap.size < 2) {
    portalsMap.set('Coursera Tech Hub', {
      portal: 'Coursera Learning Hub',
      url: getPortalCourseDirectUrl('Coursera', itemName)
    });
    portalsMap.set('GeeksforGeeks', {
      portal: 'GeeksforGeeks',
      url: getPortalCourseDirectUrl('GeeksforGeeks', itemName)
    });
  }

  return Array.from(portalsMap.values()).slice(0, 4);
}
