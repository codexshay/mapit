export interface CompanyInfo {
  name: string;
  careerUrl: string;
  category: string;
  companySlug?: string;
  companyChannelLink?: string;
  jobsSectionLink?: string;
  indiaJobsSearchLink?: string;
  searchPattern?: (role: string) => string;
}

export const TOP_50_COMPANIES: CompanyInfo[] = [
  {
    "name": "Telus Digital",
    "careerUrl": "https://www.telusdigital.com/careers",
    "category": "Digital Transformation & Services",
    "companySlug": "telus-digital",
    "companyChannelLink": "https://www.linkedin.com/company/telus-digital/",
    "jobsSectionLink": "https://www.linkedin.com/company/telus-digital/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=TELUS%20Digital&location=India"
  },
  {
    "name": "Microsoft",
    "careerUrl": "https://careers.microsoft.com",
    "category": "Big Tech",
    "companySlug": "microsoft",
    "companyChannelLink": "https://www.linkedin.com/company/microsoft/",
    "jobsSectionLink": "https://www.linkedin.com/company/microsoft/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Microsoft&location=India"
  },
  {
    "name": "Apple",
    "careerUrl": "https://jobs.apple.com",
    "category": "Big Tech",
    "companySlug": "apple",
    "companyChannelLink": "https://www.linkedin.com/company/apple/",
    "jobsSectionLink": "https://www.linkedin.com/company/apple/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Apple&location=India"
  },
  {
    "name": "Google (Alphabet)",
    "careerUrl": "https://careers.google.com",
    "category": "Big Tech",
    "companySlug": "google",
    "companyChannelLink": "https://www.linkedin.com/company/google/",
    "jobsSectionLink": "https://www.linkedin.com/company/google/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Google&location=India"
  },
  {
    "name": "Amazon",
    "careerUrl": "https://amazon.jobs",
    "category": "Big Tech",
    "companySlug": "amazon",
    "companyChannelLink": "https://www.linkedin.com/company/amazon/",
    "jobsSectionLink": "https://www.linkedin.com/company/amazon/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Amazon&location=India"
  },
  {
    "name": "Meta (Facebook)",
    "careerUrl": "https://metacareers.com",
    "category": "Big Tech",
    "companySlug": "meta",
    "companyChannelLink": "https://www.linkedin.com/company/meta/",
    "jobsSectionLink": "https://www.linkedin.com/company/meta/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Meta&location=India"
  },
  {
    "name": "IBM",
    "careerUrl": "https://ibm.com/careers",
    "category": "Big Tech",
    "companySlug": "ibm",
    "companyChannelLink": "https://www.linkedin.com/company/ibm/",
    "jobsSectionLink": "https://www.linkedin.com/company/ibm/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=IBM&location=India"
  },
  {
    "name": "Oracle",
    "careerUrl": "https://oracle.com/careers",
    "category": "SaaS & Cloud",
    "companySlug": "oracle",
    "companyChannelLink": "https://www.linkedin.com/company/oracle/",
    "jobsSectionLink": "https://www.linkedin.com/company/oracle/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Oracle&location=India"
  },
  {
    "name": "SAP",
    "careerUrl": "https://jobs.sap.com",
    "category": "SaaS & Cloud",
    "companySlug": "publicissapient",
    "companyChannelLink": "https://www.linkedin.com/company/publicissapient/",
    "jobsSectionLink": "https://www.linkedin.com/company/publicissapient/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Publicis%20Sapient&location=India"
  },
  {
    "name": "Salesforce",
    "careerUrl": "https://salesforce.com/company/careers",
    "category": "SaaS & Cloud",
    "companySlug": "salesforce",
    "companyChannelLink": "https://www.linkedin.com/company/salesforce/",
    "jobsSectionLink": "https://www.linkedin.com/company/salesforce/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Salesforce&location=India"
  },
  {
    "name": "Intel",
    "careerUrl": "https://jobs.intel.com",
    "category": "Big Tech",
    "companySlug": "intel-corporation",
    "companyChannelLink": "https://www.linkedin.com/company/intel-corporation/",
    "jobsSectionLink": "https://www.linkedin.com/company/intel-corporation/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Intel&location=India"
  },
  {
    "name": "Cisco",
    "careerUrl": "https://jobs.cisco.com",
    "category": "CyberSecurity",
    "companySlug": "cisco",
    "companyChannelLink": "https://www.linkedin.com/company/cisco/",
    "jobsSectionLink": "https://www.linkedin.com/company/cisco/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cisco&location=India"
  },
  {
    "name": "Dell Technologies",
    "careerUrl": "https://jobs.dell.com",
    "category": "Big Tech",
    "companySlug": "delltechnologies",
    "companyChannelLink": "https://www.linkedin.com/company/delltechnologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/delltechnologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Dell%20Technologies&location=India"
  },
  {
    "name": "HP Inc.",
    "careerUrl": "https://careers.hp.com",
    "category": "Big Tech",
    "companySlug": "hp",
    "companyChannelLink": "https://www.linkedin.com/company/hp/",
    "jobsSectionLink": "https://www.linkedin.com/company/hp/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HP&location=India"
  },
  {
    "name": "Hewlett Packard Enterprise (HPE)",
    "careerUrl": "https://careers.hpe.com",
    "category": "SaaS & Cloud",
    "companySlug": "hp",
    "companyChannelLink": "https://www.linkedin.com/company/hp/",
    "jobsSectionLink": "https://www.linkedin.com/company/hp/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HP&location=India"
  },
  {
    "name": "Adobe",
    "careerUrl": "https://adobe.com/careers",
    "category": "SaaS & Cloud",
    "companySlug": "adobe",
    "companyChannelLink": "https://www.linkedin.com/company/adobe/",
    "jobsSectionLink": "https://www.linkedin.com/company/adobe/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Adobe&location=India"
  },
  {
    "name": "NVIDIA",
    "careerUrl": "https://nvidia.com/en-us/about-nvidia/careers",
    "category": "Big Tech",
    "companySlug": "nvidia",
    "companyChannelLink": "https://www.linkedin.com/company/nvidia/",
    "jobsSectionLink": "https://www.linkedin.com/company/nvidia/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=NVIDIA&location=India"
  },
  {
    "name": "Qualcomm",
    "careerUrl": "https://qualcomm.com/company/careers",
    "category": "Big Tech",
    "companySlug": "qualcomm",
    "companyChannelLink": "https://www.linkedin.com/company/qualcomm/",
    "jobsSectionLink": "https://www.linkedin.com/company/qualcomm/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Qualcomm&location=India"
  },
  {
    "name": "Accenture",
    "careerUrl": "https://accenture.com/careers",
    "category": "IT Services",
    "companySlug": "accenture",
    "companyChannelLink": "https://www.linkedin.com/company/accenture/",
    "jobsSectionLink": "https://www.linkedin.com/company/accenture/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Accenture&location=India"
  },
  {
    "name": "Infosys",
    "careerUrl": "https://infosys.com/careers",
    "category": "IT Services",
    "companySlug": "infosys",
    "companyChannelLink": "https://www.linkedin.com/company/infosys/",
    "jobsSectionLink": "https://www.linkedin.com/company/infosys/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Infosys&location=India"
  },
  {
    "name": "Tata Consultancy Services (TCS)",
    "careerUrl": "https://tcs.com/careers",
    "category": "IT Services",
    "companySlug": "tata-consultancy-services",
    "companyChannelLink": "https://www.linkedin.com/company/tata-consultancy-services/",
    "jobsSectionLink": "https://www.linkedin.com/company/tata-consultancy-services/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Tata%20Consultancy%20Services&location=India"
  },
  {
    "name": "Wipro",
    "careerUrl": "https://careers.wipro.com",
    "category": "IT Services",
    "companySlug": "wipro",
    "companyChannelLink": "https://www.linkedin.com/company/wipro/",
    "jobsSectionLink": "https://www.linkedin.com/company/wipro/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Wipro&location=India"
  },
  {
    "name": "HCLTech",
    "careerUrl": "https://hcltech.com/careers",
    "category": "IT Services",
    "companySlug": "hcltech",
    "companyChannelLink": "https://www.linkedin.com/company/hcltech/",
    "jobsSectionLink": "https://www.linkedin.com/company/hcltech/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HCLTech&location=India"
  },
  {
    "name": "Cognizant",
    "careerUrl": "https://careers.cognizant.com",
    "category": "IT Services",
    "companySlug": "cognizant",
    "companyChannelLink": "https://www.linkedin.com/company/cognizant/",
    "jobsSectionLink": "https://www.linkedin.com/company/cognizant/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cognizant&location=India"
  },
  {
    "name": "Capgemini",
    "careerUrl": "https://capgemini.com/careers",
    "category": "IT Services",
    "companySlug": "capgemini",
    "companyChannelLink": "https://www.linkedin.com/company/capgemini/",
    "jobsSectionLink": "https://www.linkedin.com/company/capgemini/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Capgemini&location=India"
  },
  {
    "name": "Tech Mahindra",
    "careerUrl": "https://techmahindra.com/careers",
    "category": "IT Services",
    "companySlug": "tech-mahindra",
    "companyChannelLink": "https://www.linkedin.com/company/tech-mahindra/",
    "jobsSectionLink": "https://www.linkedin.com/company/tech-mahindra/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Tech%20Mahindra&location=India"
  },
  {
    "name": "DXC Technology",
    "careerUrl": "https://dxc.com/careers",
    "category": "IT Services",
    "companySlug": "dxctechnology",
    "companyChannelLink": "https://www.linkedin.com/company/dxctechnology/",
    "jobsSectionLink": "https://www.linkedin.com/company/dxctechnology/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=DXC%20Technology&location=India"
  },
  {
    "name": "Deloitte",
    "careerUrl": "https://deloitte.com/global/en/careers",
    "category": "IT Services",
    "companySlug": "deloitte",
    "companyChannelLink": "https://www.linkedin.com/company/deloitte/",
    "jobsSectionLink": "https://www.linkedin.com/company/deloitte/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Deloitte&location=India"
  },
  {
    "name": "PwC",
    "careerUrl": "https://pwc.com/careers",
    "category": "IT Services",
    "jobsSectionLink": "https://www.linkedin.com/company/pwc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=PwC&location=India"
  },
  {
    "name": "EY",
    "careerUrl": "https://ey.com/careers",
    "category": "IT Services",
    "companySlug": "gogreyorange",
    "companyChannelLink": "https://www.linkedin.com/company/gogreyorange/",
    "jobsSectionLink": "https://www.linkedin.com/company/gogreyorange/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=GreyOrange&location=India"
  },
  {
    "name": "KPMG",
    "careerUrl": "https://kpmg.com/careers",
    "category": "IT Services",
    "jobsSectionLink": "https://www.linkedin.com/company/kpmg/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=KPMG&location=India"
  },
  {
    "name": "ServiceNow",
    "careerUrl": "https://careers.servicenow.com",
    "category": "SaaS & Cloud",
    "companySlug": "servicenow",
    "companyChannelLink": "https://www.linkedin.com/company/servicenow/",
    "jobsSectionLink": "https://www.linkedin.com/company/servicenow/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=ServiceNow&location=India"
  },
  {
    "name": "Workday",
    "careerUrl": "https://workday.com/careers",
    "category": "SaaS & Cloud",
    "companySlug": "workday",
    "companyChannelLink": "https://www.linkedin.com/company/workday/",
    "jobsSectionLink": "https://www.linkedin.com/company/workday/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Workday&location=India"
  },
  {
    "name": "VMware (Broadcom)",
    "careerUrl": "https://careers.broadcom.com",
    "category": "SaaS & Cloud",
    "companySlug": "broadcom",
    "companyChannelLink": "https://www.linkedin.com/company/broadcom/",
    "jobsSectionLink": "https://www.linkedin.com/company/broadcom/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Broadcom&location=India"
  },
  {
    "name": "Broadcom",
    "careerUrl": "https://careers.broadcom.com",
    "category": "SaaS & Cloud",
    "companySlug": "broadcom",
    "companyChannelLink": "https://www.linkedin.com/company/broadcom/",
    "jobsSectionLink": "https://www.linkedin.com/company/broadcom/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Broadcom&location=India"
  },
  {
    "name": "Intuit",
    "careerUrl": "https://jobs.intuit.com",
    "category": "SaaS & Cloud",
    "companySlug": "intuit",
    "companyChannelLink": "https://www.linkedin.com/company/intuit/",
    "jobsSectionLink": "https://www.linkedin.com/company/intuit/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Intuit&location=India"
  },
  {
    "name": "PayPal",
    "careerUrl": "https://careers.pypl.com",
    "category": "FinTech & Consumer",
    "companySlug": "paypal",
    "companyChannelLink": "https://www.linkedin.com/company/paypal/",
    "jobsSectionLink": "https://www.linkedin.com/company/paypal/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=PayPal&location=India"
  },
  {
    "name": "Uber",
    "careerUrl": "https://uber.com/careers",
    "category": "FinTech & Consumer",
    "companySlug": "uber-com",
    "companyChannelLink": "https://www.linkedin.com/company/uber-com/",
    "jobsSectionLink": "https://www.linkedin.com/company/uber-com/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Uber&location=India"
  },
  {
    "name": "Airbnb",
    "careerUrl": "https://careers.airbnb.com",
    "category": "FinTech & Consumer",
    "jobsSectionLink": "https://www.linkedin.com/company/airbnb/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Airbnb&location=India"
  },
  {
    "name": "Netflix",
    "careerUrl": "https://jobs.netflix.com",
    "category": "FinTech & Consumer",
    "jobsSectionLink": "https://www.linkedin.com/company/netflix/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Netflix&location=India"
  },
  {
    "name": "Spotify",
    "careerUrl": "https://lifeatspotify.com",
    "category": "FinTech & Consumer",
    "jobsSectionLink": "https://www.linkedin.com/company/spotify/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Spotify&location=India"
  },
  {
    "name": "Shopify",
    "careerUrl": "https://shopify.com/careers",
    "category": "FinTech & Consumer",
    "companySlug": "shopify",
    "companyChannelLink": "https://www.linkedin.com/company/shopify/",
    "jobsSectionLink": "https://www.linkedin.com/company/shopify/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Shopify&location=India"
  },
  {
    "name": "Atlassian",
    "careerUrl": "https://atlassian.com/company/careers",
    "category": "SaaS & Cloud",
    "companySlug": "atlassian",
    "companyChannelLink": "https://www.linkedin.com/company/atlassian/",
    "jobsSectionLink": "https://www.linkedin.com/company/atlassian/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Atlassian&location=India"
  },
  {
    "name": "Zoom",
    "careerUrl": "https://careers.zoom.us",
    "category": "SaaS & Cloud",
    "companySlug": "zoom",
    "companyChannelLink": "https://www.linkedin.com/company/zoom/",
    "jobsSectionLink": "https://www.linkedin.com/company/zoom/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zoom&location=India"
  },
  {
    "name": "Snowflake",
    "careerUrl": "https://careers.snowflake.com",
    "category": "SaaS & Cloud",
    "companySlug": "snowflake-computing",
    "companyChannelLink": "https://www.linkedin.com/company/snowflake-computing/",
    "jobsSectionLink": "https://www.linkedin.com/company/snowflake-computing/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Snowflake&location=India"
  },
  {
    "name": "Palo Alto Networks",
    "careerUrl": "https://jobs.paloaltonetworks.com",
    "category": "CyberSecurity",
    "companySlug": "palo-alto-networks",
    "companyChannelLink": "https://www.linkedin.com/company/palo-alto-networks/",
    "jobsSectionLink": "https://www.linkedin.com/company/palo-alto-networks/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Palo%20Alto%20Networks&location=India"
  },
  {
    "name": "CrowdStrike",
    "careerUrl": "https://crowdstrike.com/careers",
    "category": "CyberSecurity",
    "companySlug": "crowdstrike",
    "companyChannelLink": "https://www.linkedin.com/company/crowdstrike/",
    "jobsSectionLink": "https://www.linkedin.com/company/crowdstrike/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=CrowdStrike&location=India"
  },
  {
    "name": "Samsung Electronics",
    "careerUrl": "https://samsung.com/careers",
    "category": "Big Tech",
    "jobsSectionLink": "https://www.linkedin.com/company/samsung-electronics/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Samsung%20Electronics&location=India"
  },
  {
    "name": "Sony",
    "careerUrl": "https://sony.com/en/SonyInfo/Jobs",
    "category": "Big Tech",
    "jobsSectionLink": "https://www.linkedin.com/company/sony/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Sony&location=India"
  },
  {
    "name": "Huawei",
    "careerUrl": "https://huawei.com/en/careers",
    "category": "Big Tech",
    "jobsSectionLink": "https://www.linkedin.com/company/huawei/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Huawei&location=India"
  },
  {
    "name": "LTIMindtree",
    "careerUrl": "https://ltimindtree.com/careers",
    "category": "IT Services",
    "companySlug": "ltimindtree",
    "companyChannelLink": "https://www.linkedin.com/company/ltimindtree/",
    "jobsSectionLink": "https://www.linkedin.com/company/ltimindtree/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=LTIMindtree&location=India"
  },
  {
    "name": "Mphasis",
    "careerUrl": "https://www.linkedin.com/company/mphasis/jobs/",
    "category": "IT services and consulting",
    "companySlug": "mphasis",
    "companyChannelLink": "https://www.linkedin.com/company/mphasis/",
    "jobsSectionLink": "https://www.linkedin.com/company/mphasis/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Mphasis&location=India"
  },
  {
    "name": "Coforge",
    "careerUrl": "https://www.linkedin.com/company/coforge-tech/jobs/",
    "category": "IT services and consulting",
    "companySlug": "coforge-tech",
    "companyChannelLink": "https://www.linkedin.com/company/coforge-tech/",
    "jobsSectionLink": "https://www.linkedin.com/company/coforge-tech/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Coforge&location=India"
  },
  {
    "name": "Persistent Systems",
    "careerUrl": "https://www.linkedin.com/company/persistent-systems/jobs/",
    "category": "Digital engineering and software services",
    "companySlug": "persistent-systems",
    "companyChannelLink": "https://www.linkedin.com/company/persistent-systems/",
    "jobsSectionLink": "https://www.linkedin.com/company/persistent-systems/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Persistent%20Systems&location=India"
  },
  {
    "name": "L&T Technology Services",
    "careerUrl": "https://www.linkedin.com/company/l%26t-technology-services-limited/jobs/",
    "category": "Engineering research and development services",
    "companySlug": "l%26t-technology-services-limited",
    "companyChannelLink": "https://www.linkedin.com/company/l%26t-technology-services-limited/",
    "jobsSectionLink": "https://www.linkedin.com/company/l%26t-technology-services-limited/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=L%26T%20Technology%20Services&location=India"
  },
  {
    "name": "KPIT",
    "careerUrl": "https://www.linkedin.com/company/kpit/jobs/",
    "category": "Automotive software and engineering",
    "companySlug": "kpit",
    "companyChannelLink": "https://www.linkedin.com/company/kpit/",
    "jobsSectionLink": "https://www.linkedin.com/company/kpit/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=KPIT&location=India"
  },
  {
    "name": "Birlasoft",
    "careerUrl": "https://www.linkedin.com/company/birlasoft/jobs/",
    "category": "IT services and consulting",
    "companySlug": "birlasoft",
    "companyChannelLink": "https://www.linkedin.com/company/birlasoft/",
    "jobsSectionLink": "https://www.linkedin.com/company/birlasoft/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Birlasoft&location=India"
  },
  {
    "name": "Hexaware Technologies",
    "careerUrl": "https://www.linkedin.com/company/hexaware-technologies/jobs/",
    "category": "IT services and consulting",
    "companySlug": "hexaware-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/hexaware-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/hexaware-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Hexaware%20Technologies&location=India"
  },
  {
    "name": "Sonata Software",
    "careerUrl": "https://www.linkedin.com/company/sonata-software/jobs/",
    "category": "IT services and consulting",
    "companySlug": "sonata-software",
    "companyChannelLink": "https://www.linkedin.com/company/sonata-software/",
    "jobsSectionLink": "https://www.linkedin.com/company/sonata-software/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Sonata%20Software&location=India"
  },
  {
    "name": "Happiest Minds Technologies",
    "careerUrl": "https://www.linkedin.com/company/happiest-minds-technologies/jobs/",
    "category": "Digital engineering and IT services",
    "companySlug": "happiest-minds-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/happiest-minds-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/happiest-minds-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Happiest%20Minds%20Technologies&location=India"
  },
  {
    "name": "Zensar Technologies",
    "careerUrl": "https://www.linkedin.com/company/zensar/jobs/",
    "category": "IT services and consulting",
    "companySlug": "zensar",
    "companyChannelLink": "https://www.linkedin.com/company/zensar/",
    "jobsSectionLink": "https://www.linkedin.com/company/zensar/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zensar%20Technologies&location=India"
  },
  {
    "name": "Cyient",
    "careerUrl": "https://www.linkedin.com/company/cyient/jobs/",
    "category": "Engineering and technology services",
    "companySlug": "cyient",
    "companyChannelLink": "https://www.linkedin.com/company/cyient/",
    "jobsSectionLink": "https://www.linkedin.com/company/cyient/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cyient&location=India"
  },
  {
    "name": "Tata Elxsi",
    "careerUrl": "https://www.linkedin.com/company/tata-elxsi/jobs/",
    "category": "Design and technology services",
    "companySlug": "tata-elxsi",
    "companyChannelLink": "https://www.linkedin.com/company/tata-elxsi/",
    "jobsSectionLink": "https://www.linkedin.com/company/tata-elxsi/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Tata%20Elxsi&location=India"
  },
  {
    "name": "Newgen Software",
    "careerUrl": "https://www.linkedin.com/company/newgen/jobs/",
    "category": "Enterprise software",
    "companySlug": "newgen",
    "companyChannelLink": "https://www.linkedin.com/company/newgen/",
    "jobsSectionLink": "https://www.linkedin.com/company/newgen/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Newgen%20Software&location=India"
  },
  {
    "name": "Nucleus Software",
    "careerUrl": "https://www.linkedin.com/company/nucleus-software/jobs/",
    "category": "Banking and financial software",
    "companySlug": "nucleus-software",
    "companyChannelLink": "https://www.linkedin.com/company/nucleus-software/",
    "jobsSectionLink": "https://www.linkedin.com/company/nucleus-software/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Nucleus%20Software&location=India"
  },
  {
    "name": "Sasken Technologies",
    "careerUrl": "https://www.linkedin.com/company/saskentechnologieslimited/jobs/",
    "category": "Product engineering and communications technology",
    "companySlug": "saskentechnologieslimited",
    "companyChannelLink": "https://www.linkedin.com/company/saskentechnologieslimited/",
    "jobsSectionLink": "https://www.linkedin.com/company/saskentechnologieslimited/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Sasken%20Technologies&location=India"
  },
  {
    "name": "Datamatics",
    "careerUrl": "https://www.linkedin.com/company/datamatics/jobs/",
    "category": "Digital operations and IT services",
    "companySlug": "datamatics",
    "companyChannelLink": "https://www.linkedin.com/company/datamatics/",
    "jobsSectionLink": "https://www.linkedin.com/company/datamatics/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Datamatics&location=India"
  },
  {
    "name": "R Systems",
    "careerUrl": "https://www.linkedin.com/company/r-systems/jobs/",
    "category": "Digital product engineering",
    "companySlug": "r-systems",
    "companyChannelLink": "https://www.linkedin.com/company/r-systems/",
    "jobsSectionLink": "https://www.linkedin.com/company/r-systems/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=R%20Systems&location=India"
  },
  {
    "name": "Aurionpro Solutions",
    "careerUrl": "https://www.linkedin.com/company/aurionpro-solutions/jobs/",
    "category": "Enterprise technology and fintech software",
    "companySlug": "aurionpro-solutions",
    "companyChannelLink": "https://www.linkedin.com/company/aurionpro-solutions/",
    "jobsSectionLink": "https://www.linkedin.com/company/aurionpro-solutions/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Aurionpro%20Solutions&location=India"
  },
  {
    "name": "3i Infotech",
    "careerUrl": "https://www.linkedin.com/company/3i-infotech/jobs/",
    "category": "IT services and enterprise software",
    "companySlug": "3i-infotech",
    "companyChannelLink": "https://www.linkedin.com/company/3i-infotech/",
    "jobsSectionLink": "https://www.linkedin.com/company/3i-infotech/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=3i%20Infotech&location=India"
  },
  {
    "name": "Cigniti Technologies",
    "careerUrl": "https://www.linkedin.com/company/cigniti-inc/jobs/",
    "category": "Software testing and quality engineering",
    "companySlug": "cigniti-inc",
    "companyChannelLink": "https://www.linkedin.com/company/cigniti-inc/",
    "jobsSectionLink": "https://www.linkedin.com/company/cigniti-inc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cigniti%20Technologies&location=India"
  },
  {
    "name": "UST",
    "careerUrl": "https://www.linkedin.com/company/ustglobal/jobs/",
    "category": "Digital transformation and IT services",
    "companySlug": "ustglobal",
    "companyChannelLink": "https://www.linkedin.com/company/ustglobal/",
    "jobsSectionLink": "https://www.linkedin.com/company/ustglobal/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=UST&location=India"
  },
  {
    "name": "GlobalLogic",
    "careerUrl": "https://www.linkedin.com/company/globallogic/jobs/",
    "category": "Digital product engineering",
    "companySlug": "globallogic",
    "companyChannelLink": "https://www.linkedin.com/company/globallogic/",
    "jobsSectionLink": "https://www.linkedin.com/company/globallogic/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=GlobalLogic&location=India"
  },
  {
    "name": "Nagarro",
    "careerUrl": "https://www.linkedin.com/company/nagarro/jobs/",
    "category": "Digital engineering and IT consulting",
    "companySlug": "nagarro",
    "companyChannelLink": "https://www.linkedin.com/company/nagarro/",
    "jobsSectionLink": "https://www.linkedin.com/company/nagarro/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Nagarro&location=India"
  },
  {
    "name": "Encora",
    "careerUrl": "https://www.linkedin.com/company/encorainc/jobs/",
    "category": "Digital engineering services",
    "companySlug": "encorainc",
    "companyChannelLink": "https://www.linkedin.com/company/encorainc/",
    "jobsSectionLink": "https://www.linkedin.com/company/encorainc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Encora&location=India"
  },
  {
    "name": "Virtusa",
    "careerUrl": "https://www.linkedin.com/company/virtusa/jobs/",
    "category": "Digital engineering and IT consulting",
    "companySlug": "virtusa",
    "companyChannelLink": "https://www.linkedin.com/company/virtusa/",
    "jobsSectionLink": "https://www.linkedin.com/company/virtusa/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Virtusa&location=India"
  },
  {
    "name": "Brillio",
    "careerUrl": "https://www.linkedin.com/company/brillio/jobs/",
    "category": "Digital technology consulting",
    "companySlug": "brillio",
    "companyChannelLink": "https://www.linkedin.com/company/brillio/",
    "jobsSectionLink": "https://www.linkedin.com/company/brillio/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Brillio&location=India"
  },
  {
    "name": "Xoriant",
    "careerUrl": "https://www.linkedin.com/company/xoriant/jobs/",
    "category": "Digital engineering services",
    "companySlug": "xoriant",
    "companyChannelLink": "https://www.linkedin.com/company/xoriant/",
    "jobsSectionLink": "https://www.linkedin.com/company/xoriant/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Xoriant&location=India"
  },
  {
    "name": "Infogain",
    "careerUrl": "https://www.linkedin.com/company/infogain/jobs/",
    "category": "Digital platform engineering",
    "companySlug": "infogain",
    "companyChannelLink": "https://www.linkedin.com/company/infogain/",
    "jobsSectionLink": "https://www.linkedin.com/company/infogain/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Infogain&location=India"
  },
  {
    "name": "TO THE NEW",
    "careerUrl": "https://www.linkedin.com/company/to-the-new/jobs/",
    "category": "Digital technology services",
    "companySlug": "to-the-new",
    "companyChannelLink": "https://www.linkedin.com/company/to-the-new/",
    "jobsSectionLink": "https://www.linkedin.com/company/to-the-new/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=TO%20THE%20NEW&location=India"
  },
  {
    "name": "Thoughtworks",
    "careerUrl": "https://www.linkedin.com/company/thoughtworks/jobs/",
    "category": "Software delivery and technology consulting",
    "companySlug": "thoughtworks",
    "companyChannelLink": "https://www.linkedin.com/company/thoughtworks/",
    "jobsSectionLink": "https://www.linkedin.com/company/thoughtworks/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Thoughtworks&location=India"
  },
  {
    "name": "EPAM Systems",
    "careerUrl": "https://www.linkedin.com/company/epam-systems/jobs/",
    "category": "Digital engineering and software services",
    "companySlug": "epam-systems",
    "companyChannelLink": "https://www.linkedin.com/company/epam-systems/",
    "jobsSectionLink": "https://www.linkedin.com/company/epam-systems/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=EPAM%20Systems&location=India"
  },
  {
    "name": "Kyndryl",
    "careerUrl": "https://www.linkedin.com/company/kyndryl/jobs/",
    "category": "IT infrastructure services",
    "companySlug": "kyndryl",
    "companyChannelLink": "https://www.linkedin.com/company/kyndryl/",
    "jobsSectionLink": "https://www.linkedin.com/company/kyndryl/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Kyndryl&location=India"
  },
  {
    "name": "NTT DATA",
    "careerUrl": "https://www.linkedin.com/company/nttdata/jobs/",
    "category": "IT services and consulting",
    "companySlug": "nttdata",
    "companyChannelLink": "https://www.linkedin.com/company/nttdata/",
    "jobsSectionLink": "https://www.linkedin.com/company/nttdata/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=NTT%20DATA&location=India"
  },
  {
    "name": "CGI",
    "careerUrl": "https://www.linkedin.com/company/cgi/jobs/",
    "category": "IT services and consulting",
    "companySlug": "cgi",
    "companyChannelLink": "https://www.linkedin.com/company/cgi/",
    "jobsSectionLink": "https://www.linkedin.com/company/cgi/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=CGI&location=India"
  },
  {
    "name": "Atos",
    "careerUrl": "https://www.linkedin.com/company/atos/jobs/",
    "category": "Digital transformation and managed services",
    "companySlug": "atos",
    "companyChannelLink": "https://www.linkedin.com/company/atos/",
    "jobsSectionLink": "https://www.linkedin.com/company/atos/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Atos&location=India"
  },
  {
    "name": "Eviden",
    "careerUrl": "https://www.linkedin.com/company/eviden/jobs/",
    "category": "Digital, cloud, data and cybersecurity services",
    "companySlug": "eviden",
    "companyChannelLink": "https://www.linkedin.com/company/eviden/",
    "jobsSectionLink": "https://www.linkedin.com/company/eviden/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Eviden&location=India"
  },
  {
    "name": "Sopra Steria",
    "careerUrl": "https://www.linkedin.com/company/soprasteria/jobs/",
    "category": "IT services and consulting",
    "companySlug": "soprasteria",
    "companyChannelLink": "https://www.linkedin.com/company/soprasteria/",
    "jobsSectionLink": "https://www.linkedin.com/company/soprasteria/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Sopra%20Steria&location=India"
  },
  {
    "name": "Fujitsu",
    "careerUrl": "https://www.linkedin.com/company/fujitsu/jobs/",
    "category": "Enterprise technology and IT services",
    "companySlug": "fujitsu",
    "companyChannelLink": "https://www.linkedin.com/company/fujitsu/",
    "jobsSectionLink": "https://www.linkedin.com/company/fujitsu/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Fujitsu&location=India"
  },
  {
    "name": "NEC Corporation",
    "careerUrl": "https://www.linkedin.com/company/nec/jobs/",
    "category": "Enterprise technology and communications",
    "companySlug": "nec",
    "companyChannelLink": "https://www.linkedin.com/company/nec/",
    "jobsSectionLink": "https://www.linkedin.com/company/nec/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=NEC%20Corporation&location=India"
  },
  {
    "name": "Zoho",
    "careerUrl": "https://www.linkedin.com/company/zoho/jobs/",
    "category": "Business software and SaaS",
    "companySlug": "zoho",
    "companyChannelLink": "https://www.linkedin.com/company/zoho/",
    "jobsSectionLink": "https://www.linkedin.com/company/zoho/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zoho&location=India"
  },
  {
    "name": "Freshworks",
    "careerUrl": "https://www.linkedin.com/company/freshworks-inc/jobs/",
    "category": "Customer and employee experience SaaS",
    "companySlug": "freshworks-inc",
    "companyChannelLink": "https://www.linkedin.com/company/freshworks-inc/",
    "jobsSectionLink": "https://www.linkedin.com/company/freshworks-inc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Freshworks&location=India"
  },
  {
    "name": "Chargebee",
    "careerUrl": "https://www.linkedin.com/company/chargebee/jobs/",
    "category": "Subscription management SaaS",
    "companySlug": "chargebee",
    "companyChannelLink": "https://www.linkedin.com/company/chargebee/",
    "jobsSectionLink": "https://www.linkedin.com/company/chargebee/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Chargebee&location=India"
  },
  {
    "name": "BrowserStack",
    "careerUrl": "https://www.linkedin.com/company/browserstack/jobs/",
    "category": "Developer testing platform",
    "companySlug": "browserstack",
    "companyChannelLink": "https://www.linkedin.com/company/browserstack/",
    "jobsSectionLink": "https://www.linkedin.com/company/browserstack/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=BrowserStack&location=India"
  },
  {
    "name": "Postman",
    "careerUrl": "https://www.linkedin.com/company/postman-platform/jobs/",
    "category": "API development platform",
    "companySlug": "postman-platform",
    "companyChannelLink": "https://www.linkedin.com/company/postman-platform/",
    "jobsSectionLink": "https://www.linkedin.com/company/postman-platform/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Postman&location=India"
  },
  {
    "name": "Whatfix",
    "careerUrl": "https://www.linkedin.com/company/whatfix/jobs/",
    "category": "Digital adoption SaaS",
    "companySlug": "whatfix",
    "companyChannelLink": "https://www.linkedin.com/company/whatfix/",
    "jobsSectionLink": "https://www.linkedin.com/company/whatfix/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Whatfix&location=India"
  },
  {
    "name": "Druva",
    "careerUrl": "https://www.linkedin.com/company/druva/jobs/",
    "category": "Cloud data security and backup",
    "companySlug": "druva",
    "companyChannelLink": "https://www.linkedin.com/company/druva/",
    "jobsSectionLink": "https://www.linkedin.com/company/druva/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Druva&location=India"
  },
  {
    "name": "Icertis",
    "careerUrl": "https://www.linkedin.com/company/icertis/jobs/",
    "category": "Contract intelligence SaaS",
    "companySlug": "icertis",
    "companyChannelLink": "https://www.linkedin.com/company/icertis/",
    "jobsSectionLink": "https://www.linkedin.com/company/icertis/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Icertis&location=India"
  },
  {
    "name": "Innovaccer",
    "careerUrl": "https://www.linkedin.com/company/innovaccer/jobs/",
    "category": "Healthcare data and SaaS",
    "companySlug": "innovaccer",
    "companyChannelLink": "https://www.linkedin.com/company/innovaccer/",
    "jobsSectionLink": "https://www.linkedin.com/company/innovaccer/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Innovaccer&location=India"
  },
  {
    "name": "HighRadius",
    "careerUrl": "https://www.linkedin.com/company/highradius/jobs/",
    "category": "Finance automation SaaS",
    "companySlug": "highradius",
    "companyChannelLink": "https://www.linkedin.com/company/highradius/",
    "jobsSectionLink": "https://www.linkedin.com/company/highradius/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HighRadius&location=India"
  },
  {
    "name": "Darwinbox",
    "careerUrl": "https://www.linkedin.com/company/thedarwinbox/jobs/",
    "category": "Human resources SaaS",
    "companySlug": "thedarwinbox",
    "companyChannelLink": "https://www.linkedin.com/company/thedarwinbox/",
    "jobsSectionLink": "https://www.linkedin.com/company/thedarwinbox/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Darwinbox&location=India"
  },
  {
    "name": "Uniphore",
    "careerUrl": "https://www.linkedin.com/company/uniphore/jobs/",
    "category": "Conversational AI and automation",
    "companySlug": "uniphore",
    "companyChannelLink": "https://www.linkedin.com/company/uniphore/",
    "jobsSectionLink": "https://www.linkedin.com/company/uniphore/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Uniphore&location=India"
  },
  {
    "name": "Mindtickle",
    "careerUrl": "https://www.linkedin.com/company/mindtickle/jobs/",
    "category": "Revenue enablement SaaS",
    "companySlug": "mindtickle",
    "companyChannelLink": "https://www.linkedin.com/company/mindtickle/",
    "jobsSectionLink": "https://www.linkedin.com/company/mindtickle/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Mindtickle&location=India"
  },
  {
    "name": "LeadSquared",
    "careerUrl": "https://www.linkedin.com/company/leadsquared/jobs/",
    "category": "Sales and marketing SaaS",
    "companySlug": "leadsquared",
    "companyChannelLink": "https://www.linkedin.com/company/leadsquared/",
    "jobsSectionLink": "https://www.linkedin.com/company/leadsquared/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=LeadSquared&location=India"
  },
  {
    "name": "CleverTap",
    "careerUrl": "https://www.linkedin.com/company/clevertap/jobs/",
    "category": "Customer engagement SaaS",
    "companySlug": "clevertap",
    "companyChannelLink": "https://www.linkedin.com/company/clevertap/",
    "jobsSectionLink": "https://www.linkedin.com/company/clevertap/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=CleverTap&location=India"
  },
  {
    "name": "MoEngage",
    "careerUrl": "https://www.linkedin.com/company/moengage/jobs/",
    "category": "Customer engagement SaaS",
    "companySlug": "moengage",
    "companyChannelLink": "https://www.linkedin.com/company/moengage/",
    "jobsSectionLink": "https://www.linkedin.com/company/moengage/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=MoEngage&location=India"
  },
  {
    "name": "WebEngage",
    "careerUrl": "https://www.linkedin.com/company/webengage/jobs/",
    "category": "Customer engagement SaaS",
    "companySlug": "webengage",
    "companyChannelLink": "https://www.linkedin.com/company/webengage/",
    "jobsSectionLink": "https://www.linkedin.com/company/webengage/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=WebEngage&location=India"
  },
  {
    "name": "Yellow.ai",
    "careerUrl": "https://www.linkedin.com/company/yellowdotai/jobs/",
    "category": "Conversational AI SaaS",
    "companySlug": "yellowdotai",
    "companyChannelLink": "https://www.linkedin.com/company/yellowdotai/",
    "jobsSectionLink": "https://www.linkedin.com/company/yellowdotai/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Yellow.ai&location=India"
  },
  {
    "name": "Gupshup",
    "careerUrl": "https://www.linkedin.com/company/gupshup/jobs/",
    "category": "Conversational messaging platform",
    "companySlug": "gupshup",
    "companyChannelLink": "https://www.linkedin.com/company/gupshup/",
    "jobsSectionLink": "https://www.linkedin.com/company/gupshup/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Gupshup&location=India"
  },
  {
    "name": "Amagi",
    "careerUrl": "https://www.linkedin.com/company/amagi/jobs/",
    "category": "Cloud media technology",
    "companySlug": "amagi",
    "companyChannelLink": "https://www.linkedin.com/company/amagi/",
    "jobsSectionLink": "https://www.linkedin.com/company/amagi/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Amagi&location=India"
  },
  {
    "name": "Hasura / PromptQL",
    "careerUrl": "https://www.linkedin.com/company/hasurahq/jobs/",
    "category": "Data access and developer platform",
    "companySlug": "hasurahq",
    "companyChannelLink": "https://www.linkedin.com/company/hasurahq/",
    "jobsSectionLink": "https://www.linkedin.com/company/hasurahq/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Hasura%20/%20PromptQL&location=India"
  },
  {
    "name": "Rocketlane",
    "careerUrl": "https://www.linkedin.com/company/rocketlane/jobs/",
    "category": "Customer onboarding SaaS",
    "companySlug": "rocketlane",
    "companyChannelLink": "https://www.linkedin.com/company/rocketlane/",
    "jobsSectionLink": "https://www.linkedin.com/company/rocketlane/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Rocketlane&location=India"
  },
  {
    "name": "Sprinto",
    "careerUrl": "https://www.linkedin.com/company/sprinto-com/jobs/",
    "category": "Governance, risk and compliance SaaS",
    "companySlug": "sprinto-com",
    "companyChannelLink": "https://www.linkedin.com/company/sprinto-com/",
    "jobsSectionLink": "https://www.linkedin.com/company/sprinto-com/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Sprinto&location=India"
  },
  {
    "name": "TestMu AI (formerly LambdaTest)",
    "careerUrl": "https://www.linkedin.com/company/lambdatest/jobs/",
    "category": "AI testing and developer platform",
    "companySlug": "lambdatest",
    "companyChannelLink": "https://www.linkedin.com/company/lambdatest/",
    "jobsSectionLink": "https://www.linkedin.com/company/lambdatest/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=TestMu%20AI%20%28formerly%20LambdaTest%29&location=India"
  },
  {
    "name": "Appsmith",
    "careerUrl": "https://www.linkedin.com/company/appsmith/jobs/",
    "category": "Open-source internal application platform",
    "companySlug": "appsmith",
    "companyChannelLink": "https://www.linkedin.com/company/appsmith/",
    "jobsSectionLink": "https://www.linkedin.com/company/appsmith/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Appsmith&location=India"
  },
  {
    "name": "Kissflow",
    "careerUrl": "https://www.linkedin.com/company/kissflow/jobs/",
    "category": "Low-code and workflow SaaS",
    "companySlug": "kissflow",
    "companyChannelLink": "https://www.linkedin.com/company/kissflow/",
    "jobsSectionLink": "https://www.linkedin.com/company/kissflow/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Kissflow&location=India"
  },
  {
    "name": "Facilio",
    "careerUrl": "https://www.linkedin.com/company/facilio-inc/jobs/",
    "category": "Property operations SaaS",
    "companySlug": "facilio-inc",
    "companyChannelLink": "https://www.linkedin.com/company/facilio-inc/",
    "jobsSectionLink": "https://www.linkedin.com/company/facilio-inc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Facilio&location=India"
  },
  {
    "name": "Capillary Technologies",
    "careerUrl": "https://www.linkedin.com/company/capillary-technologies/jobs/",
    "category": "Customer loyalty and engagement SaaS",
    "companySlug": "capillary-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/capillary-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/capillary-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Capillary%20Technologies&location=India"
  },
  {
    "name": "Perfios",
    "careerUrl": "https://www.linkedin.com/company/perfios/jobs/",
    "category": "Fintech data and decisioning software",
    "companySlug": "perfios",
    "companyChannelLink": "https://www.linkedin.com/company/perfios/",
    "jobsSectionLink": "https://www.linkedin.com/company/perfios/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Perfios&location=India"
  },
  {
    "name": "Tally Solutions",
    "careerUrl": "https://www.linkedin.com/company/tallysolutions/jobs/",
    "category": "Business and accounting software",
    "companySlug": "tallysolutions",
    "companyChannelLink": "https://www.linkedin.com/company/tallysolutions/",
    "jobsSectionLink": "https://www.linkedin.com/company/tallysolutions/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Tally%20Solutions&location=India"
  },
  {
    "name": "Ramco Systems",
    "careerUrl": "https://www.linkedin.com/company/ramco-systems/jobs/",
    "category": "Enterprise software",
    "companySlug": "ramco-systems",
    "companyChannelLink": "https://www.linkedin.com/company/ramco-systems/",
    "jobsSectionLink": "https://www.linkedin.com/company/ramco-systems/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Ramco%20Systems&location=India"
  },
  {
    "name": "RateGain",
    "careerUrl": "https://www.linkedin.com/company/rategain/jobs/",
    "category": "Travel and hospitality technology",
    "companySlug": "rategain",
    "companyChannelLink": "https://www.linkedin.com/company/rategain/",
    "jobsSectionLink": "https://www.linkedin.com/company/rategain/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=RateGain&location=India"
  },
  {
    "name": "InMobi",
    "careerUrl": "https://www.linkedin.com/company/inmobi/jobs/",
    "category": "Advertising technology",
    "companySlug": "inmobi",
    "companyChannelLink": "https://www.linkedin.com/company/inmobi/",
    "jobsSectionLink": "https://www.linkedin.com/company/inmobi/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=InMobi&location=India"
  },
  {
    "name": "Glance",
    "careerUrl": "https://www.linkedin.com/company/glancescreen/jobs/",
    "category": "Consumer internet and mobile content",
    "companySlug": "glancescreen",
    "companyChannelLink": "https://www.linkedin.com/company/glancescreen/",
    "jobsSectionLink": "https://www.linkedin.com/company/glancescreen/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Glance&location=India"
  },
  {
    "name": "ShareChat",
    "careerUrl": "https://www.linkedin.com/company/sharechat/jobs/",
    "category": "Social media technology",
    "companySlug": "sharechat",
    "companyChannelLink": "https://www.linkedin.com/company/sharechat/",
    "jobsSectionLink": "https://www.linkedin.com/company/sharechat/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=ShareChat&location=India"
  },
  {
    "name": "VerSe Innovation",
    "careerUrl": "https://www.linkedin.com/company/verse-innovation/jobs/",
    "category": "Consumer internet and content technology",
    "companySlug": "verse-innovation",
    "companyChannelLink": "https://www.linkedin.com/company/verse-innovation/",
    "jobsSectionLink": "https://www.linkedin.com/company/verse-innovation/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=VerSe%20Innovation&location=India"
  },
  {
    "name": "Meesho",
    "careerUrl": "https://www.linkedin.com/company/meesho/jobs/",
    "category": "E-commerce technology",
    "companySlug": "meesho",
    "companyChannelLink": "https://www.linkedin.com/company/meesho/",
    "jobsSectionLink": "https://www.linkedin.com/company/meesho/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Meesho&location=India"
  },
  {
    "name": "Flipkart",
    "careerUrl": "https://www.linkedin.com/company/flipkart/jobs/",
    "category": "E-commerce technology",
    "companySlug": "flipkart",
    "companyChannelLink": "https://www.linkedin.com/company/flipkart/",
    "jobsSectionLink": "https://www.linkedin.com/company/flipkart/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Flipkart&location=India"
  },
  {
    "name": "Swiggy",
    "careerUrl": "https://www.linkedin.com/company/swiggy-in/jobs/",
    "category": "Consumer internet and delivery technology",
    "companySlug": "swiggy-in",
    "companyChannelLink": "https://www.linkedin.com/company/swiggy-in/",
    "jobsSectionLink": "https://www.linkedin.com/company/swiggy-in/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Swiggy&location=India"
  },
  {
    "name": "Zomato",
    "careerUrl": "https://www.linkedin.com/company/zomato/jobs/",
    "category": "Consumer internet and delivery technology",
    "companySlug": "zomato",
    "companyChannelLink": "https://www.linkedin.com/company/zomato/",
    "jobsSectionLink": "https://www.linkedin.com/company/zomato/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zomato&location=India"
  },
  {
    "name": "Razorpay",
    "careerUrl": "https://www.linkedin.com/company/razorpay/jobs/",
    "category": "Fintech and payments technology",
    "companySlug": "razorpay",
    "companyChannelLink": "https://www.linkedin.com/company/razorpay/",
    "jobsSectionLink": "https://www.linkedin.com/company/razorpay/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Razorpay&location=India"
  },
  {
    "name": "PhonePe",
    "careerUrl": "https://www.linkedin.com/company/phonepe-internet/jobs/",
    "category": "Fintech and payments technology",
    "companySlug": "phonepe-internet",
    "companyChannelLink": "https://www.linkedin.com/company/phonepe-internet/",
    "jobsSectionLink": "https://www.linkedin.com/company/phonepe-internet/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=PhonePe&location=India"
  },
  {
    "name": "Paytm",
    "careerUrl": "https://www.linkedin.com/company/paytm/jobs/",
    "category": "Fintech and payments technology",
    "companySlug": "paytm",
    "companyChannelLink": "https://www.linkedin.com/company/paytm/",
    "jobsSectionLink": "https://www.linkedin.com/company/paytm/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Paytm&location=India"
  },
  {
    "name": "CRED",
    "careerUrl": "https://www.linkedin.com/company/credapp/jobs/",
    "category": "Fintech and consumer technology",
    "companySlug": "credapp",
    "companyChannelLink": "https://www.linkedin.com/company/credapp/",
    "jobsSectionLink": "https://www.linkedin.com/company/credapp/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=CRED&location=India"
  },
  {
    "name": "Pine Labs",
    "careerUrl": "https://www.linkedin.com/company/pinelabs/jobs/",
    "category": "Merchant commerce and fintech",
    "companySlug": "pinelabs",
    "companyChannelLink": "https://www.linkedin.com/company/pinelabs/",
    "jobsSectionLink": "https://www.linkedin.com/company/pinelabs/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Pine%20Labs&location=India"
  },
  {
    "name": "Groww",
    "careerUrl": "https://www.linkedin.com/company/groww.in/jobs/",
    "category": "Investment technology",
    "companySlug": "groww.in",
    "companyChannelLink": "https://www.linkedin.com/company/groww.in/",
    "jobsSectionLink": "https://www.linkedin.com/company/groww.in/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Groww&location=India"
  },
  {
    "name": "Zerodha",
    "careerUrl": "https://www.linkedin.com/company/zerodha/jobs/",
    "category": "Investment technology",
    "companySlug": "zerodha",
    "companyChannelLink": "https://www.linkedin.com/company/zerodha/",
    "jobsSectionLink": "https://www.linkedin.com/company/zerodha/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zerodha&location=India"
  },
  {
    "name": "Upstox",
    "careerUrl": "https://www.linkedin.com/company/upstox/jobs/",
    "category": "Investment technology",
    "companySlug": "upstox",
    "companyChannelLink": "https://www.linkedin.com/company/upstox/",
    "jobsSectionLink": "https://www.linkedin.com/company/upstox/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Upstox&location=India"
  },
  {
    "name": "Navi",
    "careerUrl": "https://www.linkedin.com/company/go-navi/jobs/",
    "category": "Fintech technology",
    "companySlug": "go-navi",
    "companyChannelLink": "https://www.linkedin.com/company/go-navi/",
    "jobsSectionLink": "https://www.linkedin.com/company/go-navi/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Navi&location=India"
  },
  {
    "name": "Policybazaar",
    "careerUrl": "https://www.linkedin.com/company/policybazaar/jobs/",
    "category": "Insurance technology",
    "companySlug": "policybazaar",
    "companyChannelLink": "https://www.linkedin.com/company/policybazaar/",
    "jobsSectionLink": "https://www.linkedin.com/company/policybazaar/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Policybazaar&location=India"
  },
  {
    "name": "Delhivery",
    "careerUrl": "https://www.linkedin.com/company/delhivery/jobs/",
    "category": "Logistics technology",
    "companySlug": "delhivery",
    "companyChannelLink": "https://www.linkedin.com/company/delhivery/",
    "jobsSectionLink": "https://www.linkedin.com/company/delhivery/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Delhivery&location=India"
  },
  {
    "name": "Ola",
    "careerUrl": "https://www.linkedin.com/company/olacabs-com/jobs/",
    "category": "Mobility technology",
    "companySlug": "olacabs-com",
    "companyChannelLink": "https://www.linkedin.com/company/olacabs-com/",
    "jobsSectionLink": "https://www.linkedin.com/company/olacabs-com/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Ola&location=India"
  },
  {
    "name": "OYO",
    "careerUrl": "https://www.linkedin.com/company/oyo-rooms/jobs/",
    "category": "Hospitality technology",
    "companySlug": "oyo-rooms",
    "companyChannelLink": "https://www.linkedin.com/company/oyo-rooms/",
    "jobsSectionLink": "https://www.linkedin.com/company/oyo-rooms/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=OYO&location=India"
  },
  {
    "name": "MakeMyTrip",
    "careerUrl": "https://www.linkedin.com/company/makemytrip.com/jobs/",
    "category": "Travel technology",
    "companySlug": "makemytrip.com",
    "companyChannelLink": "https://www.linkedin.com/company/makemytrip.com/",
    "jobsSectionLink": "https://www.linkedin.com/company/makemytrip.com/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=MakeMyTrip&location=India"
  },
  {
    "name": "Dream11",
    "careerUrl": "https://www.linkedin.com/company/dream11/jobs/",
    "category": "Sports technology and gaming",
    "companySlug": "dream11",
    "companyChannelLink": "https://www.linkedin.com/company/dream11/",
    "jobsSectionLink": "https://www.linkedin.com/company/dream11/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Dream11&location=India"
  },
  {
    "name": "Games24x7",
    "careerUrl": "https://www.linkedin.com/company/games24x7-private-limited/jobs/",
    "category": "Gaming technology",
    "companySlug": "games24x7-private-limited",
    "companyChannelLink": "https://www.linkedin.com/company/games24x7-private-limited/",
    "jobsSectionLink": "https://www.linkedin.com/company/games24x7-private-limited/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Games24x7&location=India"
  },
  {
    "name": "Mobile Premier League",
    "careerUrl": "https://www.linkedin.com/company/mobile-premier-league/jobs/",
    "category": "Gaming technology",
    "companySlug": "mobile-premier-league",
    "companyChannelLink": "https://www.linkedin.com/company/mobile-premier-league/",
    "jobsSectionLink": "https://www.linkedin.com/company/mobile-premier-league/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Mobile%20Premier%20League&location=India"
  },
  {
    "name": "Jio Platforms",
    "careerUrl": "https://www.linkedin.com/company/jioplatforms/jobs/",
    "category": "Digital platforms and telecommunications technology",
    "companySlug": "jioplatforms",
    "companyChannelLink": "https://www.linkedin.com/company/jioplatforms/",
    "jobsSectionLink": "https://www.linkedin.com/company/jioplatforms/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Jio%20Platforms&location=India"
  },
  {
    "name": "PayU",
    "careerUrl": "https://www.linkedin.com/company/payu/jobs/",
    "category": "Fintech and payments technology",
    "companySlug": "payu",
    "companyChannelLink": "https://www.linkedin.com/company/payu/",
    "jobsSectionLink": "https://www.linkedin.com/company/payu/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=PayU&location=India"
  },
  {
    "name": "Juspay",
    "careerUrl": "https://www.linkedin.com/company/juspay-technologies/jobs/",
    "category": "Payments technology",
    "companySlug": "juspay-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/juspay-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/juspay-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Juspay&location=India"
  },
  {
    "name": "Cashfree Payments",
    "careerUrl": "https://www.linkedin.com/company/cashfree/jobs/",
    "category": "Payments technology",
    "companySlug": "cashfree",
    "companyChannelLink": "https://www.linkedin.com/company/cashfree/",
    "jobsSectionLink": "https://www.linkedin.com/company/cashfree/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cashfree%20Payments&location=India"
  },
  {
    "name": "MobiKwik",
    "careerUrl": "https://www.linkedin.com/company/mobikwik/jobs/",
    "category": "Fintech and payments technology",
    "companySlug": "mobikwik",
    "companyChannelLink": "https://www.linkedin.com/company/mobikwik/",
    "jobsSectionLink": "https://www.linkedin.com/company/mobikwik/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=MobiKwik&location=India"
  },
  {
    "name": "BillDesk",
    "careerUrl": "https://www.linkedin.com/company/billdesk/jobs/",
    "category": "Payments technology",
    "companySlug": "billdesk",
    "companyChannelLink": "https://www.linkedin.com/company/billdesk/",
    "jobsSectionLink": "https://www.linkedin.com/company/billdesk/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=BillDesk&location=India"
  },
  {
    "name": "Red Hat",
    "careerUrl": "https://www.linkedin.com/company/red-hat/jobs/",
    "category": "Open-source enterprise software",
    "companySlug": "red-hat",
    "companyChannelLink": "https://www.linkedin.com/company/red-hat/",
    "jobsSectionLink": "https://www.linkedin.com/company/red-hat/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Red%20Hat&location=India"
  },
  {
    "name": "SUSE",
    "careerUrl": "https://www.linkedin.com/company/suse/jobs/",
    "category": "Open-source enterprise software",
    "companySlug": "suse",
    "companyChannelLink": "https://www.linkedin.com/company/suse/",
    "jobsSectionLink": "https://www.linkedin.com/company/suse/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=SUSE&location=India"
  },
  {
    "name": "Canonical",
    "careerUrl": "https://www.linkedin.com/company/canonical/jobs/",
    "category": "Open-source software and cloud",
    "companySlug": "canonical",
    "companyChannelLink": "https://www.linkedin.com/company/canonical/",
    "jobsSectionLink": "https://www.linkedin.com/company/canonical/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Canonical&location=India"
  },
  {
    "name": "HP",
    "careerUrl": "https://www.linkedin.com/company/hp/jobs/",
    "category": "Computing hardware and services",
    "companySlug": "hp",
    "companyChannelLink": "https://www.linkedin.com/company/hp/",
    "jobsSectionLink": "https://www.linkedin.com/company/hp/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HP&location=India"
  },
  {
    "name": "Lenovo",
    "careerUrl": "https://www.linkedin.com/company/lenovo/jobs/",
    "category": "Computing hardware and technology",
    "companySlug": "lenovo",
    "companyChannelLink": "https://www.linkedin.com/company/lenovo/",
    "jobsSectionLink": "https://www.linkedin.com/company/lenovo/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Lenovo&location=India"
  },
  {
    "name": "AMD",
    "careerUrl": "https://www.linkedin.com/company/amd/jobs/",
    "category": "Semiconductors and computing technology",
    "companySlug": "amd",
    "companyChannelLink": "https://www.linkedin.com/company/amd/",
    "jobsSectionLink": "https://www.linkedin.com/company/amd/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=AMD&location=India"
  },
  {
    "name": "Arm",
    "careerUrl": "https://www.linkedin.com/company/arm/jobs/",
    "category": "Semiconductor intellectual property",
    "companySlug": "arm",
    "companyChannelLink": "https://www.linkedin.com/company/arm/",
    "jobsSectionLink": "https://www.linkedin.com/company/arm/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Arm&location=India"
  },
  {
    "name": "Micron Technology",
    "careerUrl": "https://www.linkedin.com/company/micron-technology/jobs/",
    "category": "Memory and semiconductor technology",
    "companySlug": "micron-technology",
    "companyChannelLink": "https://www.linkedin.com/company/micron-technology/",
    "jobsSectionLink": "https://www.linkedin.com/company/micron-technology/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Micron%20Technology&location=India"
  },
  {
    "name": "Texas Instruments",
    "careerUrl": "https://www.linkedin.com/company/texas-instruments/jobs/",
    "category": "Semiconductors and embedded technology",
    "companySlug": "texas-instruments",
    "companyChannelLink": "https://www.linkedin.com/company/texas-instruments/",
    "jobsSectionLink": "https://www.linkedin.com/company/texas-instruments/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Texas%20Instruments&location=India"
  },
  {
    "name": "Synopsys",
    "careerUrl": "https://www.linkedin.com/company/synopsys/jobs/",
    "category": "Electronic design automation software",
    "companySlug": "synopsys",
    "companyChannelLink": "https://www.linkedin.com/company/synopsys/",
    "jobsSectionLink": "https://www.linkedin.com/company/synopsys/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Synopsys&location=India"
  },
  {
    "name": "Cadence Design Systems",
    "careerUrl": "https://www.linkedin.com/company/cadence/jobs/",
    "category": "Electronic design automation software",
    "companySlug": "cadence",
    "companyChannelLink": "https://www.linkedin.com/company/cadence/",
    "jobsSectionLink": "https://www.linkedin.com/company/cadence/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cadence%20Design%20Systems&location=India"
  },
  {
    "name": "Dassault Systèmes",
    "careerUrl": "https://www.linkedin.com/company/dassaultsystemes/jobs/",
    "category": "Engineering and design software",
    "companySlug": "dassaultsystemes",
    "companyChannelLink": "https://www.linkedin.com/company/dassaultsystemes/",
    "jobsSectionLink": "https://www.linkedin.com/company/dassaultsystemes/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Dassault%20Syst%C3%A8mes&location=India"
  },
  {
    "name": "PTC",
    "careerUrl": "https://www.linkedin.com/company/ptcinc/jobs/",
    "category": "Industrial software and IoT",
    "companySlug": "ptcinc",
    "companyChannelLink": "https://www.linkedin.com/company/ptcinc/",
    "jobsSectionLink": "https://www.linkedin.com/company/ptcinc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=PTC&location=India"
  },
  {
    "name": "Autodesk",
    "careerUrl": "https://www.linkedin.com/company/autodesk/jobs/",
    "category": "Design and engineering software",
    "companySlug": "autodesk",
    "companyChannelLink": "https://www.linkedin.com/company/autodesk/",
    "jobsSectionLink": "https://www.linkedin.com/company/autodesk/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Autodesk&location=India"
  },
  {
    "name": "MathWorks",
    "careerUrl": "https://www.linkedin.com/company/the-mathworks_2/jobs/",
    "category": "Mathematical computing software",
    "companySlug": "the-mathworks_2",
    "companyChannelLink": "https://www.linkedin.com/company/the-mathworks_2/",
    "jobsSectionLink": "https://www.linkedin.com/company/the-mathworks_2/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=MathWorks&location=India"
  },
  {
    "name": "Ansys",
    "careerUrl": "https://www.linkedin.com/company/ansys-inc/jobs/",
    "category": "Engineering simulation software",
    "companySlug": "ansys-inc",
    "companyChannelLink": "https://www.linkedin.com/company/ansys-inc/",
    "jobsSectionLink": "https://www.linkedin.com/company/ansys-inc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Ansys&location=India"
  },
  {
    "name": "Nutanix",
    "careerUrl": "https://www.linkedin.com/company/nutanix/jobs/",
    "category": "Hybrid cloud infrastructure",
    "companySlug": "nutanix",
    "companyChannelLink": "https://www.linkedin.com/company/nutanix/",
    "jobsSectionLink": "https://www.linkedin.com/company/nutanix/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Nutanix&location=India"
  },
  {
    "name": "NetApp",
    "careerUrl": "https://www.linkedin.com/company/netapp/jobs/",
    "category": "Data infrastructure and storage",
    "companySlug": "netapp",
    "companyChannelLink": "https://www.linkedin.com/company/netapp/",
    "jobsSectionLink": "https://www.linkedin.com/company/netapp/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=NetApp&location=India"
  },
  {
    "name": "Pure Storage",
    "careerUrl": "https://www.linkedin.com/company/purestorage/jobs/",
    "category": "Enterprise data storage",
    "companySlug": "purestorage",
    "companyChannelLink": "https://www.linkedin.com/company/purestorage/",
    "jobsSectionLink": "https://www.linkedin.com/company/purestorage/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Pure%20Storage&location=India"
  },
  {
    "name": "Rubrik",
    "careerUrl": "https://www.linkedin.com/company/rubrik-inc/jobs/",
    "category": "Cloud data security",
    "companySlug": "rubrik-inc",
    "companyChannelLink": "https://www.linkedin.com/company/rubrik-inc/",
    "jobsSectionLink": "https://www.linkedin.com/company/rubrik-inc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Rubrik&location=India"
  },
  {
    "name": "Cohesity",
    "careerUrl": "https://www.linkedin.com/company/cohesity/jobs/",
    "category": "Data security and management",
    "companySlug": "cohesity",
    "companyChannelLink": "https://www.linkedin.com/company/cohesity/",
    "jobsSectionLink": "https://www.linkedin.com/company/cohesity/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cohesity&location=India"
  },
  {
    "name": "Commvault",
    "careerUrl": "https://www.linkedin.com/company/commvault/jobs/",
    "category": "Data protection software",
    "companySlug": "commvault",
    "companyChannelLink": "https://www.linkedin.com/company/commvault/",
    "jobsSectionLink": "https://www.linkedin.com/company/commvault/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Commvault&location=India"
  },
  {
    "name": "Veeam Software",
    "careerUrl": "https://www.linkedin.com/company/veeam-software/jobs/",
    "category": "Backup and data resilience software",
    "companySlug": "veeam-software",
    "companyChannelLink": "https://www.linkedin.com/company/veeam-software/",
    "jobsSectionLink": "https://www.linkedin.com/company/veeam-software/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Veeam%20Software&location=India"
  },
  {
    "name": "Databricks",
    "careerUrl": "https://www.linkedin.com/company/databricks/jobs/",
    "category": "Data and AI platform",
    "companySlug": "databricks",
    "companyChannelLink": "https://www.linkedin.com/company/databricks/",
    "jobsSectionLink": "https://www.linkedin.com/company/databricks/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Databricks&location=India"
  },
  {
    "name": "MongoDB",
    "careerUrl": "https://www.linkedin.com/company/mongodbinc/jobs/",
    "category": "Developer data platform",
    "companySlug": "mongodbinc",
    "companyChannelLink": "https://www.linkedin.com/company/mongodbinc/",
    "jobsSectionLink": "https://www.linkedin.com/company/mongodbinc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=MongoDB&location=India"
  },
  {
    "name": "Elastic",
    "careerUrl": "https://www.linkedin.com/company/elastic-co/jobs/",
    "category": "Search and observability software",
    "companySlug": "elastic-co",
    "companyChannelLink": "https://www.linkedin.com/company/elastic-co/",
    "jobsSectionLink": "https://www.linkedin.com/company/elastic-co/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Elastic&location=India"
  },
  {
    "name": "Confluent",
    "careerUrl": "https://www.linkedin.com/company/confluent/jobs/",
    "category": "Data streaming platform",
    "companySlug": "confluent",
    "companyChannelLink": "https://www.linkedin.com/company/confluent/",
    "jobsSectionLink": "https://www.linkedin.com/company/confluent/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Confluent&location=India"
  },
  {
    "name": "Cloudera",
    "careerUrl": "https://www.linkedin.com/company/cloudera/jobs/",
    "category": "Data and analytics platform",
    "companySlug": "cloudera",
    "companyChannelLink": "https://www.linkedin.com/company/cloudera/",
    "jobsSectionLink": "https://www.linkedin.com/company/cloudera/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cloudera&location=India"
  },
  {
    "name": "Informatica",
    "careerUrl": "https://www.linkedin.com/company/informatica/jobs/",
    "category": "Enterprise data management",
    "companySlug": "informatica",
    "companyChannelLink": "https://www.linkedin.com/company/informatica/",
    "jobsSectionLink": "https://www.linkedin.com/company/informatica/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Informatica&location=India"
  },
  {
    "name": "Teradata",
    "careerUrl": "https://www.linkedin.com/company/teradata/jobs/",
    "category": "Cloud analytics and data platform",
    "companySlug": "teradata",
    "companyChannelLink": "https://www.linkedin.com/company/teradata/",
    "jobsSectionLink": "https://www.linkedin.com/company/teradata/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Teradata&location=India"
  },
  {
    "name": "UiPath",
    "careerUrl": "https://www.linkedin.com/company/uipath/jobs/",
    "category": "Automation software",
    "companySlug": "uipath",
    "companyChannelLink": "https://www.linkedin.com/company/uipath/",
    "jobsSectionLink": "https://www.linkedin.com/company/uipath/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=UiPath&location=India"
  },
  {
    "name": "Automation Anywhere",
    "careerUrl": "https://www.linkedin.com/company/automation-anywhere/jobs/",
    "category": "Automation software",
    "companySlug": "automation-anywhere",
    "companyChannelLink": "https://www.linkedin.com/company/automation-anywhere/",
    "jobsSectionLink": "https://www.linkedin.com/company/automation-anywhere/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Automation%20Anywhere&location=India"
  },
  {
    "name": "Pegasystems",
    "careerUrl": "https://www.linkedin.com/company/pegasystems/jobs/",
    "category": "Enterprise workflow and decisioning software",
    "companySlug": "pegasystems",
    "companyChannelLink": "https://www.linkedin.com/company/pegasystems/",
    "jobsSectionLink": "https://www.linkedin.com/company/pegasystems/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Pegasystems&location=India"
  },
  {
    "name": "Guidewire Software",
    "careerUrl": "https://www.linkedin.com/company/guidewire-software/jobs/",
    "category": "Insurance software",
    "companySlug": "guidewire-software",
    "companyChannelLink": "https://www.linkedin.com/company/guidewire-software/",
    "jobsSectionLink": "https://www.linkedin.com/company/guidewire-software/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Guidewire%20Software&location=India"
  },
  {
    "name": "Cornerstone OnDemand",
    "careerUrl": "https://www.linkedin.com/company/cornerstoneondemand/jobs/",
    "category": "Learning and talent software",
    "companySlug": "cornerstoneondemand",
    "companyChannelLink": "https://www.linkedin.com/company/cornerstoneondemand/",
    "jobsSectionLink": "https://www.linkedin.com/company/cornerstoneondemand/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cornerstone%20OnDemand&location=India"
  },
  {
    "name": "Avalara",
    "careerUrl": "https://www.linkedin.com/company/avalara/jobs/",
    "category": "Tax compliance software",
    "companySlug": "avalara",
    "companyChannelLink": "https://www.linkedin.com/company/avalara/",
    "jobsSectionLink": "https://www.linkedin.com/company/avalara/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Avalara&location=India"
  },
  {
    "name": "Alteryx",
    "careerUrl": "https://www.linkedin.com/company/alteryx/jobs/",
    "category": "Analytics automation software",
    "companySlug": "alteryx",
    "companyChannelLink": "https://www.linkedin.com/company/alteryx/",
    "jobsSectionLink": "https://www.linkedin.com/company/alteryx/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Alteryx&location=India"
  },
  {
    "name": "Twilio",
    "careerUrl": "https://www.linkedin.com/company/twilio-inc-/jobs/",
    "category": "Communications platform as a service",
    "companySlug": "twilio-inc-",
    "companyChannelLink": "https://www.linkedin.com/company/twilio-inc-/",
    "jobsSectionLink": "https://www.linkedin.com/company/twilio-inc-/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Twilio&location=India"
  },
  {
    "name": "GitHub",
    "careerUrl": "https://www.linkedin.com/company/github/jobs/",
    "category": "Developer platform",
    "companySlug": "github",
    "companyChannelLink": "https://www.linkedin.com/company/github/",
    "jobsSectionLink": "https://www.linkedin.com/company/github/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=GitHub&location=India"
  },
  {
    "name": "GitLab",
    "careerUrl": "https://www.linkedin.com/company/gitlab-com/jobs/",
    "category": "DevSecOps platform",
    "companySlug": "gitlab-com",
    "companyChannelLink": "https://www.linkedin.com/company/gitlab-com/",
    "jobsSectionLink": "https://www.linkedin.com/company/gitlab-com/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=GitLab&location=India"
  },
  {
    "name": "HashiCorp",
    "careerUrl": "https://www.linkedin.com/company/hashicorp/jobs/",
    "category": "Cloud infrastructure automation software",
    "companySlug": "hashicorp",
    "companyChannelLink": "https://www.linkedin.com/company/hashicorp/",
    "jobsSectionLink": "https://www.linkedin.com/company/hashicorp/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HashiCorp&location=India"
  },
  {
    "name": "Cloudflare",
    "careerUrl": "https://www.linkedin.com/company/cloudflare/jobs/",
    "category": "Cloud connectivity and security",
    "companySlug": "cloudflare",
    "companyChannelLink": "https://www.linkedin.com/company/cloudflare/",
    "jobsSectionLink": "https://www.linkedin.com/company/cloudflare/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Cloudflare&location=India"
  },
  {
    "name": "Akamai Technologies",
    "careerUrl": "https://www.linkedin.com/company/akamai-technologies/jobs/",
    "category": "Cloud delivery and security",
    "companySlug": "akamai-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/akamai-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/akamai-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Akamai%20Technologies&location=India"
  },
  {
    "name": "F5",
    "careerUrl": "https://www.linkedin.com/company/f5/jobs/",
    "category": "Application delivery and security",
    "companySlug": "f5",
    "companyChannelLink": "https://www.linkedin.com/company/f5/",
    "jobsSectionLink": "https://www.linkedin.com/company/f5/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=F5&location=India"
  },
  {
    "name": "Citrix",
    "careerUrl": "https://www.linkedin.com/company/citrix/jobs/",
    "category": "Digital workspace and application delivery",
    "companySlug": "citrix",
    "companyChannelLink": "https://www.linkedin.com/company/citrix/",
    "jobsSectionLink": "https://www.linkedin.com/company/citrix/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Citrix&location=India"
  },
  {
    "name": "Fortinet",
    "careerUrl": "https://www.linkedin.com/company/fortinet/jobs/",
    "category": "Cybersecurity",
    "companySlug": "fortinet",
    "companyChannelLink": "https://www.linkedin.com/company/fortinet/",
    "jobsSectionLink": "https://www.linkedin.com/company/fortinet/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Fortinet&location=India"
  },
  {
    "name": "Zscaler",
    "careerUrl": "https://www.linkedin.com/company/zscaler/jobs/",
    "category": "Cloud security",
    "companySlug": "zscaler",
    "companyChannelLink": "https://www.linkedin.com/company/zscaler/",
    "jobsSectionLink": "https://www.linkedin.com/company/zscaler/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zscaler&location=India"
  },
  {
    "name": "Check Point Software Technologies",
    "careerUrl": "https://www.linkedin.com/company/check-point-software-technologies/jobs/",
    "category": "Cybersecurity",
    "companySlug": "check-point-software-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/check-point-software-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/check-point-software-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Check%20Point%20Software%20Technologies&location=India"
  },
  {
    "name": "Sophos",
    "careerUrl": "https://www.linkedin.com/company/sophos/jobs/",
    "category": "Cybersecurity",
    "companySlug": "sophos",
    "companyChannelLink": "https://www.linkedin.com/company/sophos/",
    "jobsSectionLink": "https://www.linkedin.com/company/sophos/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Sophos&location=India"
  },
  {
    "name": "TrendAI (formerly Trend Micro)",
    "careerUrl": "https://www.linkedin.com/company/trendai-security/jobs/",
    "category": "Cybersecurity",
    "companySlug": "trendai-security",
    "companyChannelLink": "https://www.linkedin.com/company/trendai-security/",
    "jobsSectionLink": "https://www.linkedin.com/company/trendai-security/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=TrendAI%20%28formerly%20Trend%20Micro%29&location=India"
  },
  {
    "name": "McAfee",
    "careerUrl": "https://www.linkedin.com/company/mcafee/jobs/",
    "category": "Cybersecurity",
    "companySlug": "mcafee",
    "companyChannelLink": "https://www.linkedin.com/company/mcafee/",
    "jobsSectionLink": "https://www.linkedin.com/company/mcafee/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=McAfee&location=India"
  },
  {
    "name": "Gen",
    "careerUrl": "https://www.linkedin.com/company/gendigitalinc/jobs/",
    "category": "Consumer cybersecurity and privacy software",
    "companySlug": "gendigitalinc",
    "companyChannelLink": "https://www.linkedin.com/company/gendigitalinc/",
    "jobsSectionLink": "https://www.linkedin.com/company/gendigitalinc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Gen&location=India"
  },
  {
    "name": "Rapid7",
    "careerUrl": "https://www.linkedin.com/company/rapid7/jobs/",
    "category": "Cybersecurity",
    "companySlug": "rapid7",
    "companyChannelLink": "https://www.linkedin.com/company/rapid7/",
    "jobsSectionLink": "https://www.linkedin.com/company/rapid7/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Rapid7&location=India"
  },
  {
    "name": "Tenable",
    "careerUrl": "https://www.linkedin.com/company/tenableinc/jobs/",
    "category": "Exposure management and cybersecurity",
    "companySlug": "tenableinc",
    "companyChannelLink": "https://www.linkedin.com/company/tenableinc/",
    "jobsSectionLink": "https://www.linkedin.com/company/tenableinc/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Tenable&location=India"
  },
  {
    "name": "Proofpoint",
    "careerUrl": "https://www.linkedin.com/company/proofpoint/jobs/",
    "category": "Cybersecurity",
    "companySlug": "proofpoint",
    "companyChannelLink": "https://www.linkedin.com/company/proofpoint/",
    "jobsSectionLink": "https://www.linkedin.com/company/proofpoint/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Proofpoint&location=India"
  },
  {
    "name": "CyberArk",
    "careerUrl": "https://www.linkedin.com/company/cyber-ark-software/jobs/",
    "category": "Identity security",
    "companySlug": "cyber-ark-software",
    "companyChannelLink": "https://www.linkedin.com/company/cyber-ark-software/",
    "jobsSectionLink": "https://www.linkedin.com/company/cyber-ark-software/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=CyberArk&location=India"
  },
  {
    "name": "Okta",
    "careerUrl": "https://www.linkedin.com/company/okta-inc-/jobs/",
    "category": "Identity and access management",
    "companySlug": "okta-inc-",
    "companyChannelLink": "https://www.linkedin.com/company/okta-inc-/",
    "jobsSectionLink": "https://www.linkedin.com/company/okta-inc-/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Okta&location=India"
  },
  {
    "name": "Ping Identity",
    "careerUrl": "https://www.linkedin.com/company/ping-identity/jobs/",
    "category": "Identity and access management",
    "companySlug": "ping-identity",
    "companyChannelLink": "https://www.linkedin.com/company/ping-identity/",
    "jobsSectionLink": "https://www.linkedin.com/company/ping-identity/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Ping%20Identity&location=India"
  },
  {
    "name": "SailPoint",
    "careerUrl": "https://www.linkedin.com/company/sailpoint-technologies/jobs/",
    "category": "Identity security",
    "companySlug": "sailpoint-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/sailpoint-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/sailpoint-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=SailPoint&location=India"
  },
  {
    "name": "Dynatrace",
    "careerUrl": "https://www.linkedin.com/company/dynatrace/jobs/",
    "category": "Observability and application security",
    "companySlug": "dynatrace",
    "companyChannelLink": "https://www.linkedin.com/company/dynatrace/",
    "jobsSectionLink": "https://www.linkedin.com/company/dynatrace/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Dynatrace&location=India"
  },
  {
    "name": "New Relic",
    "careerUrl": "https://www.linkedin.com/company/new-relic-inc-/jobs/",
    "category": "Observability software",
    "companySlug": "new-relic-inc-",
    "companyChannelLink": "https://www.linkedin.com/company/new-relic-inc-/",
    "jobsSectionLink": "https://www.linkedin.com/company/new-relic-inc-/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=New%20Relic&location=India"
  },
  {
    "name": "Splunk",
    "careerUrl": "https://www.linkedin.com/company/splunk/jobs/",
    "category": "Security and observability software",
    "companySlug": "splunk",
    "companyChannelLink": "https://www.linkedin.com/company/splunk/",
    "jobsSectionLink": "https://www.linkedin.com/company/splunk/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Splunk&location=India"
  },
  {
    "name": "Datadog",
    "careerUrl": "https://www.linkedin.com/company/datadog/jobs/",
    "category": "Cloud monitoring and security",
    "companySlug": "datadog",
    "companyChannelLink": "https://www.linkedin.com/company/datadog/",
    "jobsSectionLink": "https://www.linkedin.com/company/datadog/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Datadog&location=India"
  },
  {
    "name": "Grafana Labs",
    "careerUrl": "https://www.linkedin.com/company/grafana-labs/jobs/",
    "category": "Observability software",
    "companySlug": "grafana-labs",
    "companyChannelLink": "https://www.linkedin.com/company/grafana-labs/",
    "jobsSectionLink": "https://www.linkedin.com/company/grafana-labs/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Grafana%20Labs&location=India"
  },
  {
    "name": "PagerDuty",
    "careerUrl": "https://www.linkedin.com/company/pagerduty/jobs/",
    "category": "Digital operations management",
    "companySlug": "pagerduty",
    "companyChannelLink": "https://www.linkedin.com/company/pagerduty/",
    "jobsSectionLink": "https://www.linkedin.com/company/pagerduty/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=PagerDuty&location=India"
  },
  {
    "name": "Progress Software",
    "careerUrl": "https://www.linkedin.com/company/progress-software/jobs/",
    "category": "Infrastructure and application software",
    "companySlug": "progress-software",
    "companyChannelLink": "https://www.linkedin.com/company/progress-software/",
    "jobsSectionLink": "https://www.linkedin.com/company/progress-software/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Progress%20Software&location=India"
  },
  {
    "name": "NICE",
    "careerUrl": "https://www.linkedin.com/company/nice-systems/jobs/",
    "category": "Customer experience and analytics software",
    "companySlug": "nice-systems",
    "companyChannelLink": "https://www.linkedin.com/company/nice-systems/",
    "jobsSectionLink": "https://www.linkedin.com/company/nice-systems/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=NICE&location=India"
  },
  {
    "name": "Five9",
    "careerUrl": "https://www.linkedin.com/company/five9/jobs/",
    "category": "Cloud contact centre software",
    "companySlug": "five9",
    "companyChannelLink": "https://www.linkedin.com/company/five9/",
    "jobsSectionLink": "https://www.linkedin.com/company/five9/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Five9&location=India"
  },
  {
    "name": "RingCentral",
    "careerUrl": "https://www.linkedin.com/company/ringcentral/jobs/",
    "category": "Cloud communications software",
    "companySlug": "ringcentral",
    "companyChannelLink": "https://www.linkedin.com/company/ringcentral/",
    "jobsSectionLink": "https://www.linkedin.com/company/ringcentral/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=RingCentral&location=India"
  },
  {
    "name": "Zendesk",
    "careerUrl": "https://www.linkedin.com/company/zendesk/jobs/",
    "category": "Customer service software",
    "companySlug": "zendesk",
    "companyChannelLink": "https://www.linkedin.com/company/zendesk/",
    "jobsSectionLink": "https://www.linkedin.com/company/zendesk/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Zendesk&location=India"
  },
  {
    "name": "HubSpot",
    "careerUrl": "https://www.linkedin.com/company/hubspot/jobs/",
    "category": "CRM and marketing software",
    "companySlug": "hubspot",
    "companyChannelLink": "https://www.linkedin.com/company/hubspot/",
    "jobsSectionLink": "https://www.linkedin.com/company/hubspot/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=HubSpot&location=India"
  },
  {
    "name": "Stripe",
    "careerUrl": "https://www.linkedin.com/company/stripe/jobs/",
    "category": "Payments technology",
    "companySlug": "stripe",
    "companyChannelLink": "https://www.linkedin.com/company/stripe/",
    "jobsSectionLink": "https://www.linkedin.com/company/stripe/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Stripe&location=India"
  },
  {
    "name": "Fiserv",
    "careerUrl": "https://www.linkedin.com/company/fiserv/jobs/",
    "category": "Financial technology",
    "companySlug": "fiserv",
    "companyChannelLink": "https://www.linkedin.com/company/fiserv/",
    "jobsSectionLink": "https://www.linkedin.com/company/fiserv/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Fiserv&location=India"
  },
  {
    "name": "FIS",
    "careerUrl": "https://www.linkedin.com/company/fis/jobs/",
    "category": "Financial technology",
    "companySlug": "fis",
    "companyChannelLink": "https://www.linkedin.com/company/fis/",
    "jobsSectionLink": "https://www.linkedin.com/company/fis/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=FIS&location=India"
  },
  {
    "name": "Temenos",
    "careerUrl": "https://www.linkedin.com/company/temenos/jobs/",
    "category": "Banking software",
    "companySlug": "temenos",
    "companyChannelLink": "https://www.linkedin.com/company/temenos/",
    "jobsSectionLink": "https://www.linkedin.com/company/temenos/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Temenos&location=India"
  },
  {
    "name": "Broadridge",
    "careerUrl": "https://www.linkedin.com/company/broadridge-financial-solutions/jobs/",
    "category": "Financial technology",
    "companySlug": "broadridge-financial-solutions",
    "companyChannelLink": "https://www.linkedin.com/company/broadridge-financial-solutions/",
    "jobsSectionLink": "https://www.linkedin.com/company/broadridge-financial-solutions/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Broadridge&location=India"
  },
  {
    "name": "Thomson Reuters",
    "careerUrl": "https://www.linkedin.com/company/thomson-reuters/jobs/",
    "category": "Information services and software",
    "companySlug": "thomson-reuters",
    "companyChannelLink": "https://www.linkedin.com/company/thomson-reuters/",
    "jobsSectionLink": "https://www.linkedin.com/company/thomson-reuters/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Thomson%20Reuters&location=India"
  },
  {
    "name": "FactSet",
    "careerUrl": "https://www.linkedin.com/company/factset/jobs/",
    "category": "Financial data and software",
    "companySlug": "factset",
    "companyChannelLink": "https://www.linkedin.com/company/factset/",
    "jobsSectionLink": "https://www.linkedin.com/company/factset/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=FactSet&location=India"
  },
  {
    "name": "Bloomberg",
    "careerUrl": "https://www.linkedin.com/company/bloomberg/jobs/",
    "category": "Financial data and technology",
    "companySlug": "bloomberg",
    "companyChannelLink": "https://www.linkedin.com/company/bloomberg/",
    "jobsSectionLink": "https://www.linkedin.com/company/bloomberg/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Bloomberg&location=India"
  },
  {
    "name": "Expedia Group",
    "careerUrl": "https://www.linkedin.com/company/expediagroup/jobs/",
    "category": "Travel technology",
    "companySlug": "expediagroup",
    "companyChannelLink": "https://www.linkedin.com/company/expediagroup/",
    "jobsSectionLink": "https://www.linkedin.com/company/expediagroup/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Expedia%20Group&location=India"
  },
  {
    "name": "Booking.com",
    "careerUrl": "https://www.linkedin.com/company/booking.com/jobs/",
    "category": "Travel technology",
    "companySlug": "booking.com",
    "companyChannelLink": "https://www.linkedin.com/company/booking.com/",
    "jobsSectionLink": "https://www.linkedin.com/company/booking.com/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Booking.com&location=India"
  },
  {
    "name": "Agoda",
    "careerUrl": "https://www.linkedin.com/company/agoda/jobs/",
    "category": "Travel technology",
    "companySlug": "agoda",
    "companyChannelLink": "https://www.linkedin.com/company/agoda/",
    "jobsSectionLink": "https://www.linkedin.com/company/agoda/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Agoda&location=India"
  },
  {
    "name": "LinkedIn",
    "careerUrl": "https://www.linkedin.com/company/linkedin/jobs/",
    "category": "Professional network and enterprise software",
    "companySlug": "linkedin",
    "companyChannelLink": "https://www.linkedin.com/company/linkedin/",
    "jobsSectionLink": "https://www.linkedin.com/company/linkedin/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=LinkedIn&location=India"
  },
  {
    "name": "eBay",
    "careerUrl": "https://www.linkedin.com/company/ebay/jobs/",
    "category": "E-commerce technology",
    "companySlug": "ebay",
    "companyChannelLink": "https://www.linkedin.com/company/ebay/",
    "jobsSectionLink": "https://www.linkedin.com/company/ebay/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=eBay&location=India"
  },
  {
    "name": "Walmart Global Tech",
    "careerUrl": "https://www.linkedin.com/company/walmartglobaltech/jobs/",
    "category": "Retail technology",
    "companySlug": "walmartglobaltech",
    "companyChannelLink": "https://www.linkedin.com/company/walmartglobaltech/",
    "jobsSectionLink": "https://www.linkedin.com/company/walmartglobaltech/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Walmart%20Global%20Tech&location=India"
  },
  {
    "name": "Target",
    "careerUrl": "https://www.linkedin.com/company/target/jobs/",
    "category": "Retail technology and global capability centre",
    "companySlug": "target",
    "companyChannelLink": "https://www.linkedin.com/company/target/",
    "jobsSectionLink": "https://www.linkedin.com/company/target/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Target&location=India"
  },
  {
    "name": "Lowe's India",
    "careerUrl": "https://www.linkedin.com/company/lowe-s-india/jobs/",
    "category": "Retail technology and global capability centre",
    "companySlug": "lowe-s-india",
    "companyChannelLink": "https://www.linkedin.com/company/lowe-s-india/",
    "jobsSectionLink": "https://www.linkedin.com/company/lowe-s-india/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Lowe%27s%20India&location=India"
  },
  {
    "name": "Tesco Bengaluru",
    "careerUrl": "https://www.linkedin.com/company/tesco-bengaluru/jobs/",
    "category": "Retail technology and global capability centre",
    "companySlug": "tesco-bengaluru",
    "companyChannelLink": "https://www.linkedin.com/company/tesco-bengaluru/",
    "jobsSectionLink": "https://www.linkedin.com/company/tesco-bengaluru/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Tesco%20Bengaluru&location=India"
  },
  {
    "name": "Bosch Global Software Technologies",
    "careerUrl": "https://www.linkedin.com/company/bosch-global-software-technologies/jobs/",
    "category": "Engineering and enterprise technology",
    "companySlug": "bosch-global-software-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/bosch-global-software-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/bosch-global-software-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Bosch%20Global%20Software%20Technologies&location=India"
  },
  {
    "name": "Siemens",
    "careerUrl": "https://www.linkedin.com/company/siemens/jobs/",
    "category": "Industrial technology and software",
    "companySlug": "siemens",
    "companyChannelLink": "https://www.linkedin.com/company/siemens/",
    "jobsSectionLink": "https://www.linkedin.com/company/siemens/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Siemens&location=India"
  },
  {
    "name": "Schneider Electric",
    "careerUrl": "https://www.linkedin.com/company/schneider-electric/jobs/",
    "category": "Energy management and industrial technology",
    "companySlug": "schneider-electric",
    "companyChannelLink": "https://www.linkedin.com/company/schneider-electric/",
    "jobsSectionLink": "https://www.linkedin.com/company/schneider-electric/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Schneider%20Electric&location=India"
  },
  {
    "name": "ABB",
    "careerUrl": "https://www.linkedin.com/company/abb/jobs/",
    "category": "Industrial automation and technology",
    "companySlug": "abb",
    "companyChannelLink": "https://www.linkedin.com/company/abb/",
    "jobsSectionLink": "https://www.linkedin.com/company/abb/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=ABB&location=India"
  },
  {
    "name": "Samsung R&D Institute India",
    "careerUrl": "https://www.linkedin.com/company/samsungrndindiabangalore/jobs/",
    "category": "Consumer technology research and development",
    "companySlug": "samsungrndindiabangalore",
    "companyChannelLink": "https://www.linkedin.com/company/samsungrndindiabangalore/",
    "jobsSectionLink": "https://www.linkedin.com/company/samsungrndindiabangalore/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Samsung%20R%26D%20Institute%20India&location=India"
  },
  {
    "name": "NXP Semiconductors",
    "careerUrl": "https://www.linkedin.com/company/nxp-semiconductors/jobs/",
    "category": "Semiconductors and embedded technology",
    "companySlug": "nxp-semiconductors",
    "companyChannelLink": "https://www.linkedin.com/company/nxp-semiconductors/",
    "jobsSectionLink": "https://www.linkedin.com/company/nxp-semiconductors/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=NXP%20Semiconductors&location=India"
  },
  {
    "name": "STMicroelectronics",
    "careerUrl": "https://www.linkedin.com/company/stmicroelectronics/jobs/",
    "category": "Semiconductors and embedded technology",
    "companySlug": "stmicroelectronics",
    "companyChannelLink": "https://www.linkedin.com/company/stmicroelectronics/",
    "jobsSectionLink": "https://www.linkedin.com/company/stmicroelectronics/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=STMicroelectronics&location=India"
  },
  {
    "name": "Infineon Technologies",
    "careerUrl": "https://www.linkedin.com/company/infineon-technologies/jobs/",
    "category": "Semiconductors and embedded technology",
    "companySlug": "infineon-technologies",
    "companyChannelLink": "https://www.linkedin.com/company/infineon-technologies/",
    "jobsSectionLink": "https://www.linkedin.com/company/infineon-technologies/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Infineon%20Technologies&location=India"
  },
  {
    "name": "Analog Devices",
    "careerUrl": "https://www.linkedin.com/company/analog-devices/jobs/",
    "category": "Semiconductors and embedded technology",
    "companySlug": "analog-devices",
    "companyChannelLink": "https://www.linkedin.com/company/analog-devices/",
    "jobsSectionLink": "https://www.linkedin.com/company/analog-devices/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Analog%20Devices&location=India"
  },
  {
    "name": "Marvell Technology",
    "careerUrl": "https://www.linkedin.com/company/marvell/jobs/",
    "category": "Semiconductors and data infrastructure",
    "companySlug": "marvell",
    "companyChannelLink": "https://www.linkedin.com/company/marvell/",
    "jobsSectionLink": "https://www.linkedin.com/company/marvell/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Marvell%20Technology&location=India"
  },
  {
    "name": "MediaTek",
    "careerUrl": "https://www.linkedin.com/company/mediatek/jobs/",
    "category": "Semiconductors and wireless technology",
    "companySlug": "mediatek",
    "companyChannelLink": "https://www.linkedin.com/company/mediatek/",
    "jobsSectionLink": "https://www.linkedin.com/company/mediatek/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=MediaTek&location=India"
  },
  {
    "name": "Western Digital",
    "careerUrl": "https://www.linkedin.com/company/western-digital/jobs/",
    "category": "Data storage technology",
    "companySlug": "western-digital",
    "companyChannelLink": "https://www.linkedin.com/company/western-digital/",
    "jobsSectionLink": "https://www.linkedin.com/company/western-digital/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Western%20Digital&location=India"
  },
  {
    "name": "Seagate Technology",
    "careerUrl": "https://www.linkedin.com/company/seagate-technology/jobs/",
    "category": "Data storage technology",
    "companySlug": "seagate-technology",
    "companyChannelLink": "https://www.linkedin.com/company/seagate-technology/",
    "jobsSectionLink": "https://www.linkedin.com/company/seagate-technology/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Seagate%20Technology&location=India"
  },
  {
    "name": "Applied Materials",
    "careerUrl": "https://www.linkedin.com/company/applied-materials/jobs/",
    "category": "Semiconductor manufacturing technology",
    "companySlug": "applied-materials",
    "companyChannelLink": "https://www.linkedin.com/company/applied-materials/",
    "jobsSectionLink": "https://www.linkedin.com/company/applied-materials/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Applied%20Materials&location=India"
  },
  {
    "name": "Lam Research",
    "careerUrl": "https://www.linkedin.com/company/lam-research/jobs/",
    "category": "Semiconductor manufacturing technology",
    "companySlug": "lam-research",
    "companyChannelLink": "https://www.linkedin.com/company/lam-research/",
    "jobsSectionLink": "https://www.linkedin.com/company/lam-research/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=Lam%20Research&location=India"
  },
  {
    "name": "KLA",
    "careerUrl": "https://www.linkedin.com/company/kla/jobs/",
    "category": "Semiconductor process control technology",
    "companySlug": "kla",
    "companyChannelLink": "https://www.linkedin.com/company/kla/",
    "jobsSectionLink": "https://www.linkedin.com/company/kla/jobs/",
    "indiaJobsSearchLink": "https://www.linkedin.com/jobs/search/?keywords=KLA&location=India"
  }
];

export function getCompanyCareerSearchUrl(company: CompanyInfo, roleTitle: string): string {
  if (company.jobsSectionLink) {
    if (!roleTitle || !roleTitle.trim()) return company.jobsSectionLink;
    if (company.indiaJobsSearchLink) {
      const cleanRole = roleTitle.trim();
      return company.indiaJobsSearchLink + '&keywords=' + encodeURIComponent(company.name + ' ' + cleanRole);
    }
    return company.jobsSectionLink;
  }
  if (!roleTitle || !roleTitle.trim()) return company.careerUrl;
  const encodedRole = encodeURIComponent(roleTitle.trim());
  const domain = company.careerUrl.toLowerCase();

  if (domain.includes('google')) return 'https://careers.google.com/jobs/results/?q=' + encodedRole;
  if (domain.includes('amazon')) return 'https://amazon.jobs/en/search?base_query=' + encodedRole;
  if (domain.includes('microsoft')) return 'https://careers.microsoft.com/us/en/search-results?keywords=' + encodedRole;
  if (domain.includes('metacareers') || domain.includes('meta')) return 'https://metacareers.com/jobs?q=' + encodedRole;
  if (domain.includes('apple')) return 'https://jobs.apple.com/en-us/search?search=' + encodedRole;
  if (domain.includes('nvidia')) return 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=' + encodedRole;
  if (domain.includes('ibm')) return 'https://www.ibm.com/careers/us-en/search/?q=' + encodedRole;
  if (domain.includes('adobe')) return 'https://adobe.wd5.myworkdayjobs.com/external_experienced?q=' + encodedRole;

  return company.careerUrl + '?q=' + encodedRole;
}

export function getLinkedInSearchUrl(companyName: string, roleTitle: string, type: 'referral' | 'recruiter' = 'referral'): string {
  const cleanComp = companyName.replace(/\(.*\)/, '').trim();
  const cleanRole = roleTitle.trim() || '';

  let query = '';
  if (type === 'recruiter') {
    query = cleanRole ? ('"' + cleanComp + '" recruiter ' + cleanRole) : ('"' + cleanComp + '" recruiter');
  } else {
    query = cleanRole ? ('"' + cleanComp + '" ' + cleanRole) : ('"' + cleanComp + '" employee');
  }

  return 'https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent(query);
}
