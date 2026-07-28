export interface CompanyInfo {
  rank: number;
  name: string;
  careerUrl: string;
  category: 'Big Tech' | 'IT Services' | 'SaaS & Cloud' | 'CyberSecurity' | 'FinTech & Consumer';
  searchPattern?: (role: string) => string;
}

export const TOP_50_COMPANIES: CompanyInfo[] = [
  { rank: 1, name: "Microsoft", careerUrl: "https://careers.microsoft.com", category: "Big Tech" },
  { rank: 2, name: "Apple", careerUrl: "https://jobs.apple.com", category: "Big Tech" },
  { rank: 3, name: "Google (Alphabet)", careerUrl: "https://careers.google.com", category: "Big Tech" },
  { rank: 4, name: "Amazon", careerUrl: "https://amazon.jobs", category: "Big Tech" },
  { rank: 5, name: "Meta (Facebook)", careerUrl: "https://metacareers.com", category: "Big Tech" },
  { rank: 6, name: "IBM", careerUrl: "https://ibm.com/careers", category: "Big Tech" },
  { rank: 7, name: "Oracle", careerUrl: "https://oracle.com/careers", category: "SaaS & Cloud" },
  { rank: 8, name: "SAP", careerUrl: "https://jobs.sap.com", category: "SaaS & Cloud" },
  { rank: 9, name: "Salesforce", careerUrl: "https://salesforce.com/company/careers", category: "SaaS & Cloud" },
  { rank: 10, name: "Intel", careerUrl: "https://jobs.intel.com", category: "Big Tech" },
  { rank: 11, name: "Cisco", careerUrl: "https://jobs.cisco.com", category: "CyberSecurity" },
  { rank: 12, name: "Dell Technologies", careerUrl: "https://jobs.dell.com", category: "Big Tech" },
  { rank: 13, name: "HP Inc.", careerUrl: "https://careers.hp.com", category: "Big Tech" },
  { rank: 14, name: "Hewlett Packard Enterprise (HPE)", careerUrl: "https://careers.hpe.com", category: "SaaS & Cloud" },
  { rank: 15, name: "Adobe", careerUrl: "https://adobe.com/careers", category: "SaaS & Cloud" },
  { rank: 16, name: "NVIDIA", careerUrl: "https://nvidia.com/en-us/about-nvidia/careers", category: "Big Tech" },
  { rank: 17, name: "Qualcomm", careerUrl: "https://qualcomm.com/company/careers", category: "Big Tech" },
  { rank: 18, name: "Accenture", careerUrl: "https://accenture.com/careers", category: "IT Services" },
  { rank: 19, name: "Infosys", careerUrl: "https://infosys.com/careers", category: "IT Services" },
  { rank: 20, name: "Tata Consultancy Services (TCS)", careerUrl: "https://tcs.com/careers", category: "IT Services" },
  { rank: 21, name: "Wipro", careerUrl: "https://careers.wipro.com", category: "IT Services" },
  { rank: 22, name: "HCLTech", careerUrl: "https://hcltech.com/careers", category: "IT Services" },
  { rank: 23, name: "Cognizant", careerUrl: "https://careers.cognizant.com", category: "IT Services" },
  { rank: 24, name: "Capgemini", careerUrl: "https://capgemini.com/careers", category: "IT Services" },
  { rank: 25, name: "Tech Mahindra", careerUrl: "https://techmahindra.com/careers", category: "IT Services" },
  { rank: 26, name: "DXC Technology", careerUrl: "https://dxc.com/careers", category: "IT Services" },
  { rank: 27, name: "Deloitte (Tech/Consulting)", careerUrl: "https://deloitte.com/global/en/careers", category: "IT Services" },
  { rank: 28, name: "PwC (Tech/Consulting)", careerUrl: "https://pwc.com/careers", category: "IT Services" },
  { rank: 29, name: "EY (Tech/Consulting)", careerUrl: "https://ey.com/careers", category: "IT Services" },
  { rank: 30, name: "KPMG (Tech/Consulting)", careerUrl: "https://kpmg.com/careers", category: "IT Services" },
  { rank: 31, name: "ServiceNow", careerUrl: "https://careers.servicenow.com", category: "SaaS & Cloud" },
  { rank: 32, name: "Workday", careerUrl: "https://workday.com/careers", category: "SaaS & Cloud" },
  { rank: 33, name: "VMware (Broadcom)", careerUrl: "https://careers.broadcom.com", category: "SaaS & Cloud" },
  { rank: 34, name: "Broadcom", careerUrl: "https://careers.broadcom.com", category: "SaaS & Cloud" },
  { rank: 35, name: "Intuit", careerUrl: "https://jobs.intuit.com", category: "SaaS & Cloud" },
  { rank: 36, name: "PayPal", careerUrl: "https://careers.pypl.com", category: "FinTech & Consumer" },
  { rank: 37, name: "Uber", careerUrl: "https://uber.com/careers", category: "FinTech & Consumer" },
  { rank: 38, name: "Airbnb", careerUrl: "https://careers.airbnb.com", category: "FinTech & Consumer" },
  { rank: 39, name: "Netflix", careerUrl: "https://jobs.netflix.com", category: "FinTech & Consumer" },
  { rank: 40, name: "Spotify", careerUrl: "https://lifeatspotify.com", category: "FinTech & Consumer" },
  { rank: 41, name: "Shopify", careerUrl: "https://shopify.com/careers", category: "FinTech & Consumer" },
  { rank: 42, name: "Atlassian", careerUrl: "https://atlassian.com/company/careers", category: "SaaS & Cloud" },
  { rank: 43, name: "Zoom", careerUrl: "https://careers.zoom.us", category: "SaaS & Cloud" },
  { rank: 44, name: "Snowflake", careerUrl: "https://careers.snowflake.com", category: "SaaS & Cloud" },
  { rank: 45, name: "Palo Alto Networks", careerUrl: "https://jobs.paloaltonetworks.com", category: "CyberSecurity" },
  { rank: 46, name: "CrowdStrike", careerUrl: "https://crowdstrike.com/careers", category: "CyberSecurity" },
  { rank: 47, name: "Samsung Electronics", careerUrl: "https://samsung.com/careers", category: "Big Tech" },
  { rank: 48, name: "Sony (Tech division)", careerUrl: "https://sony.com/en/SonyInfo/Jobs", category: "Big Tech" },
  { rank: 49, name: "Huawei", careerUrl: "https://huawei.com/en/careers", category: "Big Tech" },
  { rank: 50, name: "LTIMindtree", careerUrl: "https://ltimindtree.com/careers", category: "IT Services" }
];

export function getCompanyCareerSearchUrl(company: CompanyInfo, roleTitle: string): string {
  if (!roleTitle || !roleTitle.trim()) return company.careerUrl;
  const encodedRole = encodeURIComponent(roleTitle.trim());
  const domain = company.careerUrl.toLowerCase();

  if (domain.includes('google')) return `https://careers.google.com/jobs/results/?q=${encodedRole}`;
  if (domain.includes('amazon')) return `https://amazon.jobs/en/search?base_query=${encodedRole}`;
  if (domain.includes('microsoft')) return `https://careers.microsoft.com/us/en/search-results?keywords=${encodedRole}`;
  if (domain.includes('metacareers') || domain.includes('meta')) return `https://metacareers.com/jobs?q=${encodedRole}`;
  if (domain.includes('apple')) return `https://jobs.apple.com/en-us/search?search=${encodedRole}`;
  if (domain.includes('nvidia')) return `https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=${encodedRole}`;
  if (domain.includes('ibm')) return `https://www.ibm.com/careers/us-en/search/?q=${encodedRole}`;
  if (domain.includes('adobe')) return `https://adobe.wd5.myworkdayjobs.com/external_experienced?q=${encodedRole}`;

  return `${company.careerUrl}?q=${encodedRole}`;
}

export function getLinkedInSearchUrl(companyName: string, roleTitle: string, type: 'referral' | 'recruiter' = 'referral'): string {
  const cleanComp = companyName.replace(/\(.*\)/, '').trim();
  const cleanRole = roleTitle.trim() || 'Software Engineer';

  let query = '';
  if (type === 'recruiter') {
    query = `"${cleanComp}" recruiter ${cleanRole}`;
  } else {
    query = `"${cleanComp}" ${cleanRole}`;
  }

  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`;
}
