import importedCatalog from '../data/generated/catalog-normalized.json';
import importedPortals from '../data/generated/portals.json';

export interface StudyPortalLink {
  portal: string;
  url: string;
  badgeFormat?: string;
}

/**
 * Resolves a direct, specific course/tutorial deep link for any given skill on a specific Study Portal.
 * Prevents redirecting to generic homepage domains.
 */
export function getPortalCourseDirectUrl(
  portalNameOrSlug: string = '',
  skillOrToolName: string = '',
  existingUrl?: string
): string {
  const cleanSkillName = (skillOrToolName || '').trim();
  if (!cleanSkillName) {
    return existingUrl || 'https://www.coursera.org/';
  }

  // If existingUrl is already a deep-link with search/course path, keep it
  if (existingUrl && (
    existingUrl.includes('/search') || 
    existingUrl.includes('/courses/') || 
    existingUrl.includes('/learn/') || 
    existingUrl.includes('/catalog?') ||
    existingUrl.includes('/training?') ||
    existingUrl.includes('?q=') ||
    existingUrl.includes('?query=') ||
    existingUrl.includes('?terms=') ||
    existingUrl.includes('?keywords=') ||
    existingUrl.includes('?searchText=') ||
    existingUrl.includes('?s=')
  )) {
    return existingUrl;
  }

  const p = (portalNameOrSlug || '').toLowerCase().trim();
  const q = encodeURIComponent(cleanSkillName);

  if (p.includes('microsoft') || p.includes('ms-learn') || p.includes('azure')) {
    return `https://learn.microsoft.com/en-us/search/?terms=${q}`;
  }
  if (p.includes('aws') || p.includes('amazon')) {
    return `https://explore.skillbuilder.aws/learn/search?type=COURSE&query=${q}`;
  }
  if (p.includes('google') || p.includes('gcp') || p.includes('cloudskillsboost')) {
    return `https://www.cloudskillsboost.google/catalog?keywords=${q}`;
  }
  if (p.includes('cisco') || p.includes('netacad') || p.includes('skillsforall')) {
    return `https://skillsforall.com/search?query=${q}`;
  }
  if (p.includes('w3schools')) {
    const slug = cleanSkillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://www.w3schools.com/${slug}/`;
  }
  if (p.includes('geeksforgeeks') || p.includes('gfg')) {
    return `https://www.geeksforgeeks.org/search/?q=${q}`;
  }
  if (p.includes('linux')) {
    return `https://training.linuxfoundation.org/?s=${q}`;
  }
  if (p.includes('servicenow')) {
    return `https://nowlearning.servicenow.com/lxp/en/pages/search?q=${q}`;
  }
  if (p.includes('swayam') || p.includes('nptel')) {
    return `https://swayam.gov.in/explorer?searchText=${q}`;
  }
  if (p.includes('edx')) {
    return `https://www.edx.org/search?q=${q}`;
  }
  if (p.includes('udemy')) {
    return `https://www.udemy.com/courses/search/?q=${q}`;
  }
  if (p.includes('freecodecamp')) {
    return `https://www.freecodecamp.org/news/search/?query=${q}`;
  }
  if (p.includes('baeldung')) {
    return `https://www.baeldung.com/?s=${q}`;
  }
  if (p.includes('cloud academy') || p.includes('cloudacademy')) {
    return `https://cloudacademy.com/search/?q=${q}`;
  }
  if (p.includes('mit') || p.includes('opencourseware')) {
    return `https://ocw.mit.edu/search/?q=${q}`;
  }
  if (p.includes('stanford')) {
    return `https://online.stanford.edu/search/catalog?keywords=${q}`;
  }
  if (p.includes('harvard')) {
    return `https://pll.harvard.edu/catalog?keywords=${q}`;
  }
  if (p.includes('pluralsight')) {
    return `https://www.pluralsight.com/search?q=${q}`;
  }
  if (p.includes('codecademy')) {
    return `https://www.codecademy.com/search?query=${q}`;
  }
  if (p.includes('khan')) {
    return `https://www.khanacademy.org/search?page_search_query=${q}`;
  }
  if (p.includes('datacamp')) {
    return `https://www.datacamp.com/search?q=${q}`;
  }
  if (p.includes('leetcode')) {
    return `https://leetcode.com/problemset/all/?search=${q}`;
  }
  if (p.includes('hackerrank')) {
    return `https://www.hackerrank.com/domains/${encodeURIComponent(cleanSkillName.toLowerCase().replace(/\s+/g, '-'))}`;
  }
  if (p.includes('red hat') || p.includes('redhat')) {
    return `https://www.redhat.com/en/services/training/search?q=${q}`;
  }
  if (p.includes('roadmap')) {
    return `https://roadmap.sh/${encodeURIComponent(cleanSkillName.toLowerCase().replace(/\s+/g, '-'))}`;
  }
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
