import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Phone, Star, MapPin, Globe, Building, Search, Users, 
  Accessibility, Layers, RefreshCw, Database, ExternalLink, ArrowRight, Check, Zap,
  Compass, Map, Filter, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface HRContact {
  rank: number;
  companyName: string;
  rating: number;
  reviews: number;
  phone: string;
  category: string;
  wheelchairAccessible: boolean;
  mapsLink?: string;
  website?: string;
}

export interface CityData {
  cityName: string;
  stateName?: string;
  totalListings: number;
  contacts: HRContact[];
}

export interface CountryData {
  countryName: string;
  countryCode: string;
  flag: string;
  states: {
    stateName: string;
    cities: CityData[];
  }[];
}

// Map Node Pin for Interactive World Map SVG
interface MapPinNode {
  id: string;
  cityName: string;
  stateName: string;
  countryCode: string;
  x: number; // SVG X percentage coordinate (0-100)
  y: number; // SVG Y percentage coordinate (0-100)
}

const MAP_PIN_NODES: MapPinNode[] = [
  { id: 'delhi-ncr', cityName: 'West Delhi', stateName: 'Delhi NCR', countryCode: 'IN', x: 68, y: 44 },
  { id: 'mumbai', cityName: 'Mumbai', stateName: 'Maharashtra', countryCode: 'IN', x: 67, y: 49 },
  { id: 'bengaluru', cityName: 'Bengaluru', stateName: 'Karnataka', countryCode: 'IN', x: 68.5, y: 53 },
  { id: 'hyderabad', cityName: 'Hyderabad', stateName: 'Telangana', countryCode: 'IN', x: 69.5, y: 51 },
  { id: 'cebu', cityName: 'Cebu City', stateName: 'Central Visayas', countryCode: 'PH', x: 84, y: 52 },
  { id: 'makati', cityName: 'Makati City', stateName: 'Metro Manila', countryCode: 'PH', x: 83.2, y: 49 },
  { id: 'quezon', cityName: 'Quezon City', stateName: 'Metro Manila', countryCode: 'PH', x: 83.5, y: 48.5 },
  { id: 'manila', cityName: 'Manila', stateName: 'Metro Manila', countryCode: 'PH', x: 83.3, y: 49.2 },
  { id: 'davao', cityName: 'Davao City', stateName: 'Davao Region', countryCode: 'PH', x: 84.5, y: 54 },
  { id: 'london', cityName: 'London', stateName: 'Greater London', countryCode: 'GB', x: 47, y: 26 },
  { id: 'sf', cityName: 'San Francisco', stateName: 'California', countryCode: 'US', x: 18, y: 35 },
  { id: 'singapore', cityName: 'Singapore', stateName: 'Central Singapore', countryCode: 'SG', x: 77.5, y: 56 },
  { id: 'dubai', cityName: 'Dubai', stateName: 'Dubai', countryCode: 'AE', x: 61.5, y: 45 }
];

// Raw Directory Database (Stored for on-demand lazy retrieval)
export const RAW_DIRECTORY_DATABASE: Record<string, Record<string, HRContact[]>> = {
  IN: {
    "West Delhi": [
      { rank: 1, companyName: "Career Innovators", rating: 4.6, reviews: 519, phone: "+91 95828 96540", category: "Employment center", wheelchairAccessible: false, website: "" },
      { rank: 2, companyName: "Epic Consultancy", rating: 4.9, reviews: 473, phone: "+91 99712 59325", category: "BPO placement agency", wheelchairAccessible: false, website: "" },
      { rank: 3, companyName: "Success Stories", rating: 4.9, reviews: 335, phone: "+91 98737 06391", category: "BPO placement agency", wheelchairAccessible: false, website: "" },
      { rank: 4, companyName: "Imaginators Consultancy", rating: 4.1, reviews: 365, phone: "N/A", category: "Consultant", wheelchairAccessible: false, website: "" },
      { rank: 5, companyName: "Smart Steps HR Services", rating: 4.0, reviews: 369, phone: "+91 88262 14244", category: "Consultant", wheelchairAccessible: false, website: "" },
      { rank: 6, companyName: "Ishmeet Consultant Pvt Ltd", rating: 4.4, reviews: 285, phone: "+91 99991 89574", category: "Employment agency", wheelchairAccessible: false, website: "" },
      { rank: 7, companyName: "Gourav Enterprises", rating: 4.6, reviews: 155, phone: "+91 99534 99992", category: "HR consulting", wheelchairAccessible: false, website: "" },
      { rank: 8, companyName: "Unlock Talent Solutions", rating: 5.0, reviews: 125, phone: "N/A", category: "Corporate office", wheelchairAccessible: false, website: "" },
      { rank: 9, companyName: "PlacementIndia.com", rating: 3.3, reviews: 350, phone: "+91 89291 75342", category: "Employment center", wheelchairAccessible: false, website: "" },
      { rank: 10, companyName: "DKM Online", rating: 4.1, reviews: 175, phone: "+91 11 4259 7777", category: "HR consulting", wheelchairAccessible: false, website: "" },
      { rank: 11, companyName: "HRVision Consultants", rating: 3.6, reviews: 130, phone: "+91 98999 13337", category: "Employment consultant", wheelchairAccessible: false, website: "" },
      { rank: 12, companyName: "Career Stone Consultant", rating: 5.0, reviews: 48, phone: "+91 98180 38494", category: "HR consulting", wheelchairAccessible: false, website: "" },
      { rank: 13, companyName: "Galaxy Consultants", rating: 4.8, reviews: 1616, phone: "+91 97177 91646", category: "Employment agency", wheelchairAccessible: false, website: "" },
      { rank: 14, companyName: "Human Resource India", rating: 4.9, reviews: 445, phone: "+91 85952 92907", category: "Employment consultant", wheelchairAccessible: false, website: "" },
      { rank: 15, companyName: "Origin Recruiters", rating: 4.8, reviews: 481, phone: "+91 98105 69750", category: "BPO placement agency", wheelchairAccessible: false, website: "" },
      { rank: 16, companyName: "The Hunt Ends", rating: 4.5, reviews: 33, phone: "+91 98115 10181", category: "HR consulting", wheelchairAccessible: false, website: "" },
      { rank: 17, companyName: "Joe HR Services", rating: 5.0, reviews: 20, phone: "+91 93546 80457", category: "Employment consultant", wheelchairAccessible: false, website: "" },
      { rank: 18, companyName: "Alturas HR Consultants", rating: 4.9, reviews: 237, phone: "+91 72100 17603", category: "HR consulting", wheelchairAccessible: false, website: "" },
      { rank: 19, companyName: "360 HR Services", rating: 4.7, reviews: 20, phone: "N/A", category: "Corporate office", wheelchairAccessible: false, website: "" },
      { rank: 20, companyName: "STEADY CAREER", rating: 4.5, reviews: 454, phone: "+91 95601 46870", category: "BPO placement agency", wheelchairAccessible: false, website: "" }
    ],
    "Mumbai": [
      { rank: 1, companyName: "ABC Consultants Mumbai", rating: 4.8, reviews: 620, phone: "+91 22 6662 3000", category: "Executive Search", wheelchairAccessible: true, website: "https://www.abcconsultants.in/" },
      { rank: 2, companyName: "TeamLease Services", rating: 4.5, reviews: 890, phone: "+91 22 6124 3000", category: "Staffing Agency", wheelchairAccessible: true, website: "https://www.teamlease.com/" }
    ],
    "Bengaluru": [
      { rank: 1, companyName: "Adecco India Bengaluru", rating: 4.7, reviews: 940, phone: "+91 80 3989 7000", category: "Recruitment Firm", wheelchairAccessible: true, website: "https://www.adecco.co.in/" },
      { rank: 2, companyName: "Randstad India Tech Hub", rating: 4.8, reviews: 1120, phone: "+91 80 6625 3000", category: "HR Solutions", wheelchairAccessible: true, website: "https://www.randstad.in/" }
    ]
  },
  PH: {
    "Cebu City": [
      { rank: 1, companyName: "Logix BPO", rating: 4.9, reviews: 262, phone: "+44 115 654 7288", category: "Recruiter", wheelchairAccessible: false, website: "https://logixbpo.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb_cebu" },
      { rank: 2, companyName: "C&G Immigration & Business Services - Cebu", rating: 5.0, reviews: 58, phone: "+63 956 174 7552", category: "Visa consulting service", wheelchairAccessible: false, website: "https://cgconsulting.ph/" },
      { rank: 3, companyName: "ContactPoint360 Philippines", rating: 4.8, reviews: 107, phone: "+63 917 717 1051", category: "BPO company", wheelchairAccessible: true, website: "https://cp360.talentmatch.h2r.ai/" },
      { rank: 4, companyName: "HireBiz", rating: 4.9, reviews: 34, phone: "+63 906 370 8914", category: "Corporate office", wheelchairAccessible: false, website: "http://www.hirebiz.com/" },
      { rank: 5, companyName: "Click It Virtual Services", rating: 4.9, reviews: 16, phone: "+63 929 880 8143", category: "Human resource consulting", wheelchairAccessible: false, website: "https://clickitvirtual.com/" },
      { rank: 6, companyName: "Global Staff Connections", rating: 4.6, reviews: 15, phone: "N/A", category: "Employment agency", wheelchairAccessible: false, website: "http://globalstaffconnections.com/" }
    ],
    "Makati City": [
      { rank: 1, companyName: "Stark Asia Solutions", rating: 5.0, reviews: 766, phone: "+63 917 180 8612", category: "Recruiter", wheelchairAccessible: true, website: "http://www.stark.com.ph/" },
      { rank: 2, companyName: "Curran Daly + Associates", rating: 5.0, reviews: 326, phone: "+63 2 8863 6835", category: "Recruiter", wheelchairAccessible: true, website: "http://www.currandaly.com/" },
      { rank: 3, companyName: "Manila Recruitment - Executive Search", rating: 4.8, reviews: 616, phone: "+63 917 166 2768", category: "Recruiter", wheelchairAccessible: true, website: "https://www.manilarecruitment.com/" },
      { rank: 4, companyName: "Robert Walters Recruitment Philippines", rating: 4.8, reviews: 205, phone: "+63 2 8816 4972", category: "Employment center", wheelchairAccessible: false, website: "https://www.robertwalters.com.ph/" },
      { rank: 5, companyName: "Remote Staff", rating: 4.9, reviews: 114, phone: "+63 2 8846 4249", category: "Corporate office", wheelchairAccessible: true, website: "https://www.remotestaff.ph/" },
      { rank: 6, companyName: "Bossjob Philippines", rating: 4.8, reviews: 160, phone: "+63 2 8511 5709", category: "Recruiter", wheelchairAccessible: false, website: "https://bossjob.ph/" },
      { rank: 7, companyName: "Permhunt", rating: 5.0, reviews: 50, phone: "+63 961 759 4405", category: "Recruiter", wheelchairAccessible: true, website: "https://permhunt.com/" },
      { rank: 8, companyName: "MCVO Talent Outsourcing Services", rating: 4.9, reviews: 44, phone: "(312) 460-2470", category: "Executive search firm", wheelchairAccessible: true, website: "https://www.mcvotalent.com/" },
      { rank: 9, companyName: "Transitions Executive Search", rating: 5.0, reviews: 27, phone: "+63 2 8887 5720", category: "Executive search firm", wheelchairAccessible: true, website: "https://www.transitionsinc.net/" },
      { rank: 10, companyName: "Latte Search", rating: 4.9, reviews: 15, phone: "N/A", category: "Recruiter", wheelchairAccessible: true, website: "http://www.latte.ph/" },
      { rank: 11, companyName: "Elite HeadHunting Incorporated", rating: 4.7, reviews: 12, phone: "+63 2 8845 1234", category: "Recruiter", wheelchairAccessible: true, website: "http://eliteheadhunting.net/" },
      { rank: 12, companyName: "Techsearch International Corp", rating: 4.6, reviews: 8, phone: "+63 2 8893 2345", category: "Executive search firm", wheelchairAccessible: false, website: "https://www.techsearchinternational.com/" }
    ],
    "Quezon City": [
      { rank: 1, companyName: "Ignite Careers", rating: 4.9, reviews: 2977, phone: "+63 2 8234 5712", category: "Recruiter", wheelchairAccessible: true, website: "https://ignitecareers.ph/" },
      { rank: 2, companyName: "Global Headstart Specialist", rating: 4.9, reviews: 1353, phone: "+63 2 8298 4313", category: "Business to business service", wheelchairAccessible: true, website: "http://www.globalheadstart.com/" },
      { rank: 3, companyName: "J-K Network Services", rating: 4.9, reviews: 1003, phone: "+63 2 8245 2829", category: "Human resource consulting", wheelchairAccessible: false, website: "http://www.jkmanpower.jp-network-e.com/" },
      { rank: 4, companyName: "RecruitGo Philippines", rating: 5.0, reviews: 97, phone: "+63 921 976 2870", category: "Software company", wheelchairAccessible: true, website: "https://recruitgo.com/" },
      { rank: 5, companyName: "VXI Panorama Recruitment Center", rating: 4.4, reviews: 371, phone: "+63 917 777 5555", category: "BPO company", wheelchairAccessible: true, website: "http://www.vxi-family.com/" },
      { rank: 6, companyName: "Rensol Recruitment and Consulting", rating: 4.5, reviews: 216, phone: "+63 2 8931 0968", category: "Recruiter", wheelchairAccessible: true, website: "http://www.rensol.com/" },
      { rank: 7, companyName: "1st Dynamic Personnel Resources", rating: 4.5, reviews: 187, phone: "+63 2 7798 4048", category: "Employment agency", wheelchairAccessible: true, website: "http://1stdynamicpersonnel.com/" },
      { rank: 8, companyName: "Armasourcing", rating: 5.0, reviews: 16, phone: "+63 995 436 8153", category: "Talent agency", wheelchairAccessible: true, website: "https://armasourcing.com/" },
      { rank: 9, companyName: "N&M Staffing Services", rating: 5.0, reviews: 14, phone: "+63 976 503 0714", category: "Consultant", wheelchairAccessible: false, website: "http://nmstaffing.com.ph/" },
      { rank: 10, companyName: "Wealthlink Incorporated Agency", rating: 4.5, reviews: 12, phone: "+63 2 8922 4321", category: "Employment agency", wheelchairAccessible: false, website: "https://wealthlink.com.ph/" },
      { rank: 11, companyName: "Workscale Resources Inc", rating: 4.8, reviews: 8, phone: "N/A", category: "Corporate office", wheelchairAccessible: true, website: "http://www.workscale.ph/" },
      { rank: 12, companyName: "Clear Leadership Consulting", rating: 4.7, reviews: 6, phone: "N/A", category: "Consultant", wheelchairAccessible: false, website: "https://clearleadershipcoach.com/" }
    ],
    "Davao City": [
      { rank: 1, companyName: "Full Potential Solutions Davao", rating: 4.4, reviews: 49, phone: "(833) 470-0377", category: "BPO company", wheelchairAccessible: true, website: "http://www.fpsinc.com/" },
      { rank: 2, companyName: "Global Staff Network", rating: 5.0, reviews: 2, phone: "+61 7 3177 7774", category: "Employment agency", wheelchairAccessible: false, website: "https://globalstaffnetwork.com/" },
      { rank: 3, companyName: "FJ80 HR Consultancy Co.", rating: 5.0, reviews: 1, phone: "+63 995 480 8062", category: "Human resource consulting", wheelchairAccessible: false, website: "https://fj80hrconsultancy.com/" },
      { rank: 4, companyName: "Human Resource Management Office", rating: 5.0, reviews: 1, phone: "+63 82 227 7772", category: "Government office", wheelchairAccessible: true, website: "https://www.davaocity.gov.ph/" },
      { rank: 5, companyName: "Online Hiring Corp.", rating: 4.8, reviews: 4, phone: "+63 82 295 1770", category: "Recruiter", wheelchairAccessible: true, website: "http://www.onlinehiringcorporation.com/" },
      { rank: 6, companyName: "HMO International Recruitment", rating: 4.6, reviews: 22, phone: "+63 82 221 4321", category: "Employment agency", wheelchairAccessible: true, website: "https://hmoihr.com/" }
    ],
    "Manila": [
      { rank: 1, companyName: "Monroe Consulting Group Philippines", rating: 4.9, reviews: 2258, phone: "+63 2 7002 1292", category: "Recruiter", wheelchairAccessible: true, website: "https://www.monroeconsulting.com/philippines" },
      { rank: 2, companyName: "FMW Human Resources International", rating: 4.6, reviews: 162, phone: "+63 2 8280 9471", category: "Human resource consulting", wheelchairAccessible: true, website: "https://fmwhumanresources.com/" },
      { rank: 3, companyName: "YWA Human Resource Corporation", rating: 4.4, reviews: 259, phone: "+63 2 8524 7777", category: "Employment agency", wheelchairAccessible: true, website: "http://www.ywacorp.com/" },
      { rank: 4, companyName: "2018 Crowne Human Resources Inc", rating: 4.9, reviews: 19, phone: "+63 939 515 1646", category: "Human resource consulting", wheelchairAccessible: false, website: "https://www.2018crownehumanresourcesinc.com/" },
      { rank: 5, companyName: "Lead Resources Management Corp.", rating: 4.6, reviews: 42, phone: "N/A", category: "Employment agency", wheelchairAccessible: false, website: "http://lead.com.ph/" },
      { rank: 6, companyName: "Done Remotely", rating: 5.0, reviews: 4, phone: "N/A", category: "BPO company", wheelchairAccessible: false, website: "https://www.doneremotely.com/" },
      { rank: 7, companyName: "Century High HR Incorporated", rating: 4.6, reviews: 8, phone: "+63 992 398 7952", category: "Recruiter", wheelchairAccessible: false, website: "http://www.facebook.com/HRCenturyHigh" },
      { rank: 8, companyName: "PHR-Philippine Human Resource Worldwide", rating: 4.1, reviews: 51, phone: "+63 2 8518 8448", category: "Human resource consulting", wheelchairAccessible: true, website: "http://www.phrwe.com/" },
      { rank: 9, companyName: "Happy World HR and Recruitment", rating: 4.3, reviews: 15, phone: "N/A", category: "Recruiter", wheelchairAccessible: false, website: "" },
      { rank: 10, companyName: "AristoSourcing", rating: 4.8, reviews: 25, phone: "N/A", category: "BPO company", wheelchairAccessible: true, website: "https://aristosourcing.com/" },
      { rank: 11, companyName: "KFL Manpower Agency", rating: 4.5, reviews: 14, phone: "N/A", category: "Employment agency", wheelchairAccessible: false, website: "http://www.kflmanpoweragency.com/" },
      { rank: 12, companyName: "Skills Innovative People Services", rating: 4.6, reviews: 9, phone: "N/A", category: "Human resource consulting", wheelchairAccessible: false, website: "" },
      { rank: 13, companyName: "HURIS Inc. (HR Innovations)", rating: 4.7, reviews: 20, phone: "+63 2 8871 1234", category: "Human resource consulting", wheelchairAccessible: true, website: "http://www.huris.com.ph/" },
      { rank: 14, companyName: "Newfold Digital Philippines", rating: 4.4, reviews: 30, phone: "N/A", category: "Corporate office", wheelchairAccessible: true, website: "http://newfold.com/" }
    ]
  },
  US: {
    "San Francisco": [
      { rank: 1, companyName: "Korn Ferry Executive Search SF", rating: 4.8, reviews: 450, phone: "+1 415 956 1834", category: "Executive Search", wheelchairAccessible: true, website: "https://www.kornferry.com/" },
      { rank: 2, companyName: "Heidrick & Struggles SF", rating: 4.9, reviews: 320, phone: "+1 415 981 2854", category: "Executive Search", wheelchairAccessible: true, website: "https://www.heidrick.com/" }
    ]
  },
  GB: {
    "London": [
      { rank: 1, companyName: "Michael Page London HQ", rating: 4.7, reviews: 880, phone: "+44 20 7269 2000", category: "Recruitment Firm", wheelchairAccessible: true, website: "https://www.michaelpage.co.uk/" },
      { rank: 2, companyName: "Hays Specialist Recruitment London", rating: 4.6, reviews: 950, phone: "+44 20 7259 8700", category: "Employment Agency", wheelchairAccessible: true, website: "https://www.hays.co.uk/" }
    ]
  },
  SG: {
    "Singapore": [
      { rank: 1, companyName: "Robert Walters Singapore", rating: 4.8, reviews: 530, phone: "+65 6228 0200", category: "Recruiter", wheelchairAccessible: true, website: "https://www.robertwalters.com.sg/" },
      { rank: 2, companyName: "Hudson Singapore Tech", rating: 4.7, reviews: 410, phone: "+65 6339 0333", category: "HR Consulting", wheelchairAccessible: true, website: "https://www.hudson.sg/" }
    ]
  },
  AE: {
    "Dubai": [
      { rank: 1, companyName: "Adecco Middle East Dubai", rating: 4.8, reviews: 670, phone: "+971 4 368 0210", category: "Staffing Agency", wheelchairAccessible: true, website: "https://www.adeccome.com/" },
      { rank: 2, companyName: "Cooper Fitch Dubai", rating: 4.9, reviews: 520, phone: "+971 4 352 2506", category: "Recruitment & HR Advisory", wheelchairAccessible: true, website: "https://cooperfitch.ae/" }
    ]
  }
};

// Summary Metadata for Country -> State -> City Cascading Slicer
const CASCADING_COUNTRY_METADATA: CountryData[] = [
  {
    countryName: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    states: [
      {
        stateName: "Delhi NCR",
        cities: [
          { cityName: "West Delhi", totalListings: 20, contacts: [] }
        ]
      },
      {
        stateName: "Maharashtra",
        cities: [
          { cityName: "Mumbai", totalListings: 2, contacts: [] }
        ]
      },
      {
        stateName: "Karnataka",
        cities: [
          { cityName: "Bengaluru", totalListings: 2, contacts: [] }
        ]
      }
    ]
  },
  {
    countryName: "Philippines",
    countryCode: "PH",
    flag: "🇵🇭",
    states: [
      {
        stateName: "Metro Manila",
        cities: [
          { cityName: "Makati City", totalListings: 12, contacts: [] },
          { cityName: "Quezon City", totalListings: 12, contacts: [] },
          { cityName: "Manila", totalListings: 14, contacts: [] }
        ]
      },
      {
        stateName: "Central Visayas",
        cities: [
          { cityName: "Cebu City", totalListings: 6, contacts: [] }
        ]
      },
      {
        stateName: "Davao Region",
        cities: [
          { cityName: "Davao City", totalListings: 6, contacts: [] }
        ]
      }
    ]
  },
  {
    countryName: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    states: [
      {
        stateName: "California",
        cities: [
          { cityName: "San Francisco", totalListings: 2, contacts: [] }
        ]
      }
    ]
  },
  {
    countryName: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    states: [
      {
        stateName: "Greater London",
        cities: [
          { cityName: "London", totalListings: 2, contacts: [] }
        ]
      }
    ]
  },
  {
    countryName: "Singapore",
    countryCode: "SG",
    flag: "🇸🇬",
    states: [
      {
        stateName: "Central Singapore",
        cities: [
          { cityName: "Singapore", totalListings: 2, contacts: [] }
        ]
      }
    ]
  },
  {
    countryName: "United Arab Emirates",
    countryCode: "AE",
    flag: "🇦🇪",
    states: [
      {
        stateName: "Dubai",
        cities: [
          { cityName: "Dubai", totalListings: 2, contacts: [] }
        ]
      }
    ]
  }
];

interface HRContactsProps {
  theme: string;
}

export default function HRContacts({ theme }: HRContactsProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('all');
  const [selectedStateName, setSelectedStateName] = useState<string>('all');
  const [selectedCityName, setSelectedCityName] = useState<string>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContact, setActiveContact] = useState<{ cityName: string; contact: HRContact } | null>(null);

  // Lazy Fetching state storage
  const [fetchedData, setFetchedData] = useState<Record<string, HRContact[]>>({});
  const [loadingCities, setLoadingCities] = useState<Record<string, boolean>>({});

  const isLight = theme === 'light';

  // Cascading States list based on selected Country
  const availableStates = useMemo(() => {
    if (selectedCountryCode === 'all') {
      const set = new Set<string>();
      CASCADING_COUNTRY_METADATA.forEach(c => c.states.forEach(s => set.add(s.stateName)));
      return Array.from(set).sort();
    }
    const country = CASCADING_COUNTRY_METADATA.find(c => c.countryCode === selectedCountryCode);
    return country ? country.states.map(s => s.stateName) : [];
  }, [selectedCountryCode]);

  // Cascading Cities list based on selected Country & State
  const availableCities = useMemo(() => {
    let pool = CASCADING_COUNTRY_METADATA;
    if (selectedCountryCode !== 'all') {
      pool = pool.filter(c => c.countryCode === selectedCountryCode);
    }
    const cityList: { cityName: string; stateName: string; countryCode: string }[] = [];
    pool.forEach(c => {
      c.states.forEach(s => {
        if (selectedStateName === 'all' || s.stateName === selectedStateName) {
          s.cities.forEach(ci => {
            cityList.push({ cityName: ci.cityName, stateName: s.stateName, countryCode: c.countryCode });
          });
        }
      });
    });
    return cityList;
  }, [selectedCountryCode, selectedStateName]);

  // Handlers for Slicers
  const handleCountryChange = (cCode: string) => {
    setSelectedCountryCode(cCode);
    setSelectedStateName('all');
    setSelectedCityName('all');
  };

  const handleStateChange = (sName: string) => {
    setSelectedStateName(sName);
    setSelectedCityName('all');
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCityName(cityName);
  };

  // Map pin click handler (syncs Country -> State -> City slicers)
  const handleMapPinClick = (pin: MapPinNode) => {
    setSelectedCountryCode(pin.countryCode);
    setSelectedStateName(pin.stateName);
    setSelectedCityName(pin.cityName);
  };

  // Reset Slicers to All
  const handleResetSlicers = () => {
    setSelectedCountryCode('all');
    setSelectedStateName('all');
    setSelectedCityName('all');
    setSearchQuery('');
  };

  // Fetch City on demand
  const fetchCityOnDemand = useCallback(async (countryCode: string, cityName: string) => {
    const key = `${countryCode}_${cityName}`;
    if (fetchedData[key] || loadingCities[key]) return;

    setLoadingCities((prev) => ({ ...prev, [key]: true }));
    await Promise.resolve();

    const contacts = RAW_DIRECTORY_DATABASE[countryCode]?.[cityName] || [];
    setFetchedData((prev) => ({ ...prev, [key]: contacts }));
    setLoadingCities((prev) => ({ ...prev, [key]: false }));
  }, [fetchedData, loadingCities]);

  // Auto fetch visible cities
  useEffect(() => {
    availableCities.forEach(item => {
      fetchCityOnDemand(item.countryCode, item.cityName);
    });
  }, [availableCities, fetchCityOnDemand]);

  // Combined Directory Results matching Slicer & Search
  const filteredDirectoryResults = useMemo(() => {
    const results: { countryCode: string; cityName: string; contacts: HRContact[] }[] = [];

    availableCities.forEach(item => {
      if (selectedCityName !== 'all' && item.cityName !== selectedCityName) return;

      const key = `${item.countryCode}_${item.cityName}`;
      const contacts = fetchedData[key] || RAW_DIRECTORY_DATABASE[item.countryCode]?.[item.cityName] || [];

      const q = searchQuery.toLowerCase().trim();
      const matched = contacts.filter(c => 
        q === '' ||
        c.companyName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        item.cityName.toLowerCase().includes(q)
      );

      if (matched.length > 0) {
        results.push({
          countryCode: item.countryCode,
          cityName: item.cityName,
          contacts: matched
        });
      }
    });

    return results;
  }, [availableCities, selectedCityName, fetchedData, searchQuery]);

  const totalMatchingContacts = useMemo(() => {
    return filteredDirectoryResults.reduce((sum, res) => sum + res.contacts.length, 0);
  }, [filteredDirectoryResults]);

  return (
    <div className={`p-2 sm:p-6 space-y-6 font-mono select-none ${
      isLight ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      
      {/* Top Header Banner with Beta Tag */}
      <header className="border-2 border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-2 uppercase">
                <Database className="w-8 h-8 text-white" />
                HR Directories
              </h1>
              <span className="bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-xs tracking-wide shrink-0 font-mono">
                beta
              </span>
            </div>
            <p className="text-zinc-400 text-sm md:text-base max-w-3xl font-sans">
              Interactive global recruiter &amp; staffing agency directory. Explore placement hubs, executive search firms, and BPO HR centers using the live world map and location slicer.
            </p>
          </div>

          {/* Quick Stats Counter */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-white font-bold">
              LOCATIONS: {MAP_PIN_NODES.length} HUBS
            </span>
            <span className="px-3 py-1 bg-white text-black font-bold uppercase">
              MATCHES: {totalMatchingContacts} CONTACTS
            </span>
          </div>
        </div>

        {/* CASCADING LOCATION SLICER CORNER PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-zinc-900/90 p-4 border border-zinc-800">
          
          {/* Country Slicer */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3 h-3 text-white" />
              1. Select Country Slicer
            </label>
            <select
              value={selectedCountryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full bg-black border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono uppercase"
            >
              <option value="all">🌐 All Countries (Global View)</option>
              {CASCADING_COUNTRY_METADATA.map(c => (
                <option key={c.countryCode} value={c.countryCode}>
                  {c.flag} {c.countryName}
                </option>
              ))}
            </select>
          </div>

          {/* State / Region Slicer */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Map className="w-3 h-3 text-white" />
              2. Select State / Region Slicer
            </label>
            <select
              value={selectedStateName}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full bg-black border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono uppercase"
            >
              <option value="all">All States &amp; Regions ({availableStates.length})</option>
              {availableStates.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* City / District Slicer */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-white" />
              3. Select City / District Slicer
            </label>
            <select
              value={selectedCityName}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full bg-black border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono uppercase"
            >
              <option value="all">All Cities &amp; Hubs ({availableCities.length})</option>
              {availableCities.map(ci => (
                <option key={`${ci.countryCode}_${ci.cityName}`} value={ci.cityName}>
                  {ci.cityName} ({ci.stateName})
                </option>
              ))}
            </select>
          </div>

          {/* Reset & Search Slicer Button */}
          <div className="md:col-span-3 flex items-end gap-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-zinc-700 pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-mono"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-400" />
            </div>

            <button
              type="button"
              onClick={handleResetSlicers}
              title="Reset Slicers"
              className="p-2 border border-zinc-700 bg-black hover:bg-white hover:text-black text-white transition cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* INTERACTIVE SVG WORLD & REGIONAL MAP SECTION */}
      <section className="border-2 border-zinc-800 bg-zinc-950 p-4 md:p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-white animate-spin-slow" />
            <h2 className="text-sm font-black uppercase text-white tracking-wider font-mono">
              Interactive World HR Location Map &amp; Geolocation Nodes
            </h2>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">
            Click any location pin on the map to automatically filter the HR directory
          </span>
        </div>

        {/* Vector Map Container */}
        <div className="relative w-full h-72 md:h-96 bg-black border border-zinc-800 overflow-hidden group">
          
          {/* Stylized SVG Map Background Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="world-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#52525b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#world-grid)" />
            
            {/* World Continent Outlines Simplified Vectors */}
            {/* North America */}
            <path d="M 50 80 Q 80 50 150 70 Q 220 80 200 150 Q 150 200 80 160 Z" fill="#27272a" opacity="0.4" />
            {/* South America */}
            <path d="M 180 180 Q 220 200 240 280 Q 200 340 170 280 Z" fill="#27272a" opacity="0.4" />
            {/* Europe */}
            <path d="M 380 70 Q 450 60 480 110 Q 420 140 380 110 Z" fill="#27272a" opacity="0.4" />
            {/* Africa */}
            <path d="M 380 130 Q 460 140 470 230 Q 420 280 370 200 Z" fill="#27272a" opacity="0.4" />
            {/* Asia / India */}
            <path d="M 500 80 Q 650 70 700 150 Q 620 200 520 160 Z" fill="#27272a" opacity="0.4" />
            {/* Australia / Oceania */}
            <path d="M 680 220 Q 760 210 780 280 Q 720 300 670 260 Z" fill="#27272a" opacity="0.4" />
          </svg>

          {/* Interactive Map Pins */}
          {MAP_PIN_NODES.map((pin) => {
            const isCountryMatch = selectedCountryCode === 'all' || selectedCountryCode === pin.countryCode;
            const isStateMatch = selectedStateName === 'all' || selectedStateName === pin.stateName;
            const isCityMatch = selectedCityName === 'all' || selectedCityName === pin.cityName;
            
            const isActive = isCountryMatch && isStateMatch && isCityMatch;

            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => handleMapPinClick(pin)}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                title={`Click to filter: ${pin.cityName}, ${pin.stateName} (${pin.countryCode})`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group z-20 ${
                  isActive ? 'scale-125 z-30' : 'opacity-70 hover:opacity-100 hover:scale-110'
                }`}
              >
                {/* Pulse Ring when Active */}
                {isActive && (
                  <span className="absolute -inset-2 bg-yellow-400/40 rounded-full animate-ping pointer-events-none" />
                )}

                <div className={`flex items-center gap-1 px-2 py-1 border text-[10px] font-mono font-bold shadow-md transition-all ${
                  isActive
                    ? 'bg-white text-black border-white shadow-[2px_2px_0px_0px_#ffffff]'
                    : 'bg-black text-zinc-300 border-zinc-700 hover:border-white hover:text-white'
                }`}>
                  <MapPin className={`w-3 h-3 ${isActive ? 'text-black fill-black' : 'text-zinc-400'}`} />
                  <span>{pin.cityName}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* HR DIRECTORY CONTACT CARDS LIST */}
      <main className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              Filtered HR Agencies &amp; Placement Services
            </h2>
          </div>

          <span className="text-xs font-mono text-zinc-400">
            Showing <strong className="text-white">{totalMatchingContacts}</strong> contacts in selected locations
          </span>
        </div>

        {filteredDirectoryResults.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950 border-2 border-zinc-800 p-8">
            <Building className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-200 mb-2 uppercase">No matching HR contacts found</h3>
            <p className="text-zinc-400 text-xs max-w-md mx-auto font-sans mb-4">
              No agencies match your active location slicer or search keyword. Try selecting "All Countries" or resetting the slicer.
            </p>
            <button
              onClick={handleResetSlicers}
              className="px-4 py-2 bg-white text-black border border-white text-xs font-bold uppercase hover:bg-zinc-200 transition cursor-pointer"
            >
              Reset Location Slicers
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredDirectoryResults.map(cityGroup => (
              <section key={`${cityGroup.countryCode}_${cityGroup.cityName}`} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <h3 className="text-sm font-black uppercase text-white font-mono">
                    {cityGroup.cityName} Directory ({cityGroup.contacts.length} Agencies)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cityGroup.contacts.map((contact) => (
                    <article
                      key={`${contact.rank}-${contact.companyName}`}
                      className="bg-zinc-950 border-2 border-zinc-800 hover:border-zinc-500 transition-all p-5 text-left flex flex-col justify-between relative group hover:shadow-[4px_4px_0px_0px_#ffffff]"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-3 mb-3">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white text-black uppercase">
                            RANK #{contact.rank}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase border border-zinc-800 px-2 py-0.5 bg-zinc-900">
                            {contact.category}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white leading-snug font-sans mb-2">
                          {contact.companyName}
                        </h4>

                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-4">
                          <div className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{contact.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{contact.reviews} Reviews</span>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-zinc-800 pt-3 text-xs font-mono">
                        <div className="flex items-center justify-between text-zinc-300">
                          <span className="text-zinc-500 uppercase text-[10px]">Phone</span>
                          <a href={`tel:${contact.phone}`} className="hover:text-white font-bold flex items-center gap-1">
                            <Phone className="w-3 h-3 text-zinc-400" />
                            <span>{contact.phone}</span>
                          </a>
                        </div>

                        {contact.website ? (
                          <a
                            href={contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full mt-2 py-2 px-3 border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white font-bold flex items-center justify-between uppercase transition cursor-pointer text-xs"
                          >
                            <span>Visit Portal / Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <div className="w-full mt-2 py-2 px-3 border border-zinc-800 bg-black text-zinc-600 font-bold text-center uppercase text-[10px]">
                            Direct Phone Contact Only
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
