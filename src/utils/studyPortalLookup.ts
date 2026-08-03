import importedCatalog from '../data/generated/catalog-normalized.json';
import importedPortals from '../data/generated/portals.json';

export interface StudyPortalLink {
  portal: string;
  url: string;
  badgeFormat?: string;
}

const DEFAULT_PORTALS: Record<string, StudyPortalLink> = {
  microsoft: { portal: "Microsoft Learn", url: "https://learn.microsoft.com/" },
  aws: { portal: "AWS Skill Builder", url: "https://aws.amazon.com/training/" },
  google: { portal: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/" },
  cisco: { portal: "Cisco Skills for All", url: "https://skillsforall.com/" },
  w3schools: { portal: "W3Schools", url: "https://www.w3schools.com/" },
  geeksforgeeks: { portal: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
  linux: { portal: "Linux Foundation Learn", url: "https://training.linuxfoundation.org/" },
  servicenow: { portal: "ServiceNow Learning", url: "https://nowlearning.servicenow.com/" },
  swayam: { portal: "Swayam NPTEL", url: "https://swayam.gov.in/" },
  coursera: { portal: "Coursera Tech Hub", url: "https://www.coursera.org/" }
};

/**
 * Returns verified Study Portals for any given skill, tool, certification, or job role name.
 */
export function getOfferedStudyPortals(
  itemName: string, 
  categoryOrDomain: string = ''
): StudyPortalLink[] {
  if (!itemName) return [DEFAULT_PORTALS.coursera];

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
    if (rec.portal && rec.officialUrl && !portalsMap.has(rec.portal)) {
      portalsMap.set(rec.portal, {
        portal: rec.portal,
        url: rec.officialUrl,
        badgeFormat: rec.learningFormat ? rec.learningFormat.split(',')[0] : undefined
      });
    }
  });

  // 2. Keyword & Brand Domain Smart Fallbacks
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
    portalsMap.set('Microsoft Learn', DEFAULT_PORTALS.microsoft);
  }

  if (
    lowerItem.includes('aws') || 
    lowerItem.includes('amazon') || 
    lowerItem.includes('ec2') || 
    lowerItem.includes('s3') || 
    lowerItem.includes('lambda') || 
    lowerItem.includes('cloudwatch')
  ) {
    portalsMap.set('AWS Skill Builder', DEFAULT_PORTALS.aws);
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
    portalsMap.set('Google Cloud Skills Boost', DEFAULT_PORTALS.google);
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
    portalsMap.set('Cisco Skills for All', DEFAULT_PORTALS.cisco);
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
    portalsMap.set('Linux Foundation Learn', DEFAULT_PORTALS.linux);
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
    portalsMap.set('W3Schools', DEFAULT_PORTALS.w3schools);
    portalsMap.set('GeeksforGeeks', DEFAULT_PORTALS.geeksforgeeks);
  }

  if (
    lowerItem.includes('servicenow') || 
    lowerItem.includes('itsm') || 
    lowerItem.includes('helpdesk') || 
    lowerItem.includes('ticket')
  ) {
    portalsMap.set('ServiceNow Learning', DEFAULT_PORTALS.servicenow);
  }

  if (
    lowerItem.includes('nptel') || 
    lowerItem.includes('nielit') || 
    lowerItem.includes('swayam') || 
    lowerCat.includes('government')
  ) {
    portalsMap.set('Swayam NPTEL', DEFAULT_PORTALS.swayam);
  }

  // Ensure every item has at least 2 study portals available
  if (portalsMap.size < 2) {
    portalsMap.set('Coursera Tech Hub', {
      portal: 'Coursera Learning Hub',
      url: `https://www.coursera.org/search?query=${encodeURIComponent(itemName)}`
    });
    portalsMap.set('GeeksforGeeks', DEFAULT_PORTALS.geeksforgeeks);
  }

  return Array.from(portalsMap.values()).slice(0, 4);
}
