import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Phone, Star, MapPin, Globe, Building, Search, Users, 
  Accessibility, Layers, RefreshCw, Database, ExternalLink, ArrowRight, Check, Zap,
  Compass, Map, Filter, RotateCcw, Clock, AlertCircle, PlusCircle
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

export interface CityConfig {
  cityName: string;
  stateName: string;
  hasData: boolean;
  totalListings?: number;
}

export interface CountryConfig {
  countryCode: string;
  countryName: string;
  flag: string;
  region: 'APJ' | 'EMEA' | 'NA' | 'LATAM';
  cities: CityConfig[];
}

// Region-Specific Hierarchical Configuration Matrix
export const HIERARCHICAL_REGIONS: CountryConfig[] = [
  // APJ REGION
  {
    countryCode: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    region: 'APJ',
    cities: [
      { cityName: 'West Delhi', stateName: 'Delhi NCR', hasData: true, totalListings: 20 },
      { cityName: 'Bengaluru', stateName: 'Karnataka', hasData: false },
      { cityName: 'Mumbai', stateName: 'Maharashtra', hasData: false },
      { cityName: 'Hyderabad', stateName: 'Telangana', hasData: false },
      { cityName: 'Pune', stateName: 'Maharashtra', hasData: false },
      { cityName: 'Chennai', stateName: 'Tamil Nadu', hasData: false }
    ]
  },
  {
    countryCode: 'PH',
    countryName: 'Philippines',
    flag: '🇵🇭',
    region: 'APJ',
    cities: [
      { cityName: 'Manila', stateName: 'Metro Manila', hasData: true, totalListings: 14 },
      { cityName: 'Makati City', stateName: 'Metro Manila', hasData: true, totalListings: 12 },
      { cityName: 'Quezon City', stateName: 'Metro Manila', hasData: true, totalListings: 12 },
      { cityName: 'Cebu City', stateName: 'Central Visayas', hasData: true, totalListings: 6 },
      { cityName: 'Davao City', stateName: 'Davao Region', hasData: true, totalListings: 6 }
    ]
  },
  {
    countryCode: 'SG',
    countryName: 'Singapore',
    flag: '🇸🇬',
    region: 'APJ',
    cities: [
      { cityName: 'Central Singapore', stateName: 'Central', hasData: false }
    ]
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    flag: '🇦🇺',
    region: 'APJ',
    cities: [
      { cityName: 'Sydney', stateName: 'New South Wales', hasData: false },
      { cityName: 'Melbourne', stateName: 'Victoria', hasData: false }
    ]
  },
  {
    countryCode: 'JP',
    countryName: 'Japan',
    flag: '🇯🇵',
    region: 'APJ',
    cities: [
      { cityName: 'Tokyo', stateName: 'Kanto', hasData: false }
    ]
  },

  // EMEA REGION
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    region: 'EMEA',
    cities: [
      { cityName: 'London', stateName: 'Greater London', hasData: false },
      { cityName: 'Manchester', stateName: 'Greater Manchester', hasData: false }
    ]
  },
  {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'EMEA',
    cities: [
      { cityName: 'Dubai', stateName: 'Emirate of Dubai', hasData: false },
      { cityName: 'Abu Dhabi', stateName: 'Emirate of Abu Dhabi', hasData: false }
    ]
  },
  {
    countryCode: 'DE',
    countryName: 'Germany',
    flag: '🇩🇪',
    region: 'EMEA',
    cities: [
      { cityName: 'Berlin', stateName: 'Berlin', hasData: false },
      { cityName: 'Munich', stateName: 'Bavaria', hasData: false }
    ]
  },

  // NA REGION
  {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    region: 'NA',
    cities: [
      { cityName: 'San Francisco', stateName: 'California', hasData: false },
      { cityName: 'New York City', stateName: 'New York', hasData: false },
      { cityName: 'Austin', stateName: 'Texas', hasData: false }
    ]
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    region: 'NA',
    cities: [
      { cityName: 'Toronto', stateName: 'Ontario', hasData: false },
      { cityName: 'Vancouver', stateName: 'British Columbia', hasData: false }
    ]
  },

  // LATAM REGION
  {
    countryCode: 'BR',
    countryName: 'Brazil',
    flag: '🇧🇷',
    region: 'LATAM',
    cities: [
      { cityName: 'São Paulo', stateName: 'São Paulo State', hasData: false }
    ]
  },
  {
    countryCode: 'MX',
    countryName: 'Mexico',
    flag: '🇲🇽',
    region: 'LATAM',
    cities: [
      { cityName: 'Mexico City', stateName: 'Federal District', hasData: false }
    ]
  }
];

// Raw Directory Database for Verified Cities
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
  }
};

interface HRContactsProps {
  theme: string;
}

export default function HRContacts({ theme }: HRContactsProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('ALL');
  const [selectedCityName, setSelectedCityName] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const isLight = theme === 'light';

  // Available Countries based on active Region Filter
  const availableCountries = useMemo(() => {
    if (selectedRegion === 'ALL') return HIERARCHICAL_REGIONS;
    return HIERARCHICAL_REGIONS.filter(c => c.region === selectedRegion);
  }, [selectedRegion]);

  // Available Cities based on selected Country
  const availableCities = useMemo(() => {
    if (selectedCountryCode === 'ALL') {
      return availableCountries.flatMap(c => c.cities.map(ci => ({ ...ci, countryCode: c.countryCode, countryName: c.countryName, flag: c.flag })));
    }
    const country = HIERARCHICAL_REGIONS.find(c => c.countryCode === selectedCountryCode);
    if (!country) return [];
    return country.cities.map(ci => ({ ...ci, countryCode: country.countryCode, countryName: country.countryName, flag: country.flag }));
  }, [selectedCountryCode, availableCountries]);

  // Handle Region Selection
  const handleRegionClick = (reg: string) => {
    setSelectedRegion(reg);
    setSelectedCountryCode('ALL');
    setSelectedCityName('ALL');
  };

  // Handle Country Selection
  const handleCountryClick = (cCode: string) => {
    setSelectedCountryCode(cCode);
    setSelectedCityName('ALL');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegion('ALL');
    setSelectedCountryCode('ALL');
    setSelectedCityName('ALL');
    setSearchQuery('');
  };

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
              Region-specific directory of verified HR consultancies, staffing agencies, and placement centers. Browse by macro-region (APJ, EMEA, NA, LATAM) and country tracks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="px-3 py-1.5 border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* 1. PRIMARY REGION SELECTOR BUTTONS */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-2">Region Track:</span>
            {[
              { id: 'ALL', label: 'All Regions', icon: '🌐' },
              { id: 'APJ', label: 'APJ (Asia Pacific & Japan)', icon: '🌏' },
              { id: 'EMEA', label: 'EMEA (Europe, Mid-East, Africa)', icon: '🌍' },
              { id: 'NA', label: 'NA (North America)', icon: '🌎' },
              { id: 'LATAM', label: 'LATAM (Latin America)', icon: '🌐' },
            ].map(reg => (
              <button
                key={reg.id}
                type="button"
                onClick={() => handleRegionClick(reg.id)}
                className={`px-3.5 py-2 text-xs font-bold uppercase border transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedRegion === reg.id
                    ? 'bg-white text-black border-white shadow-[2px_2px_0px_0px_#ffffff]'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white'
                }`}
              >
                <span>{reg.icon}</span>
                <span>{reg.label}</span>
              </button>
            ))}
          </div>

          {/* 2. SUB-CATEGORY COUNTRY PILLS */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-2">Sub-Category Country:</span>
            <button
              type="button"
              onClick={() => handleCountryClick('ALL')}
              className={`px-3 py-1 text-xs font-bold uppercase border transition-all cursor-pointer ${
                selectedCountryCode === 'ALL'
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              All Countries ({availableCountries.length})
            </button>

            {availableCountries.map(c => (
              <button
                key={c.countryCode}
                type="button"
                onClick={() => handleCountryClick(c.countryCode)}
                className={`px-3 py-1 text-xs font-bold uppercase border transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCountryCode === c.countryCode
                    ? 'bg-white text-black border-white shadow-[2px_2px_0px_0px_#ffffff]'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.countryName}</span>
              </button>
            ))}
          </div>

          {/* 3. CITY & SEARCH SUB-FILTER ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-6 flex items-center gap-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase shrink-0">City / District:</label>
              <select
                value={selectedCityName}
                onChange={(e) => setSelectedCityName(e.target.value)}
                className="w-full bg-black border border-zinc-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white font-mono uppercase"
              >
                <option value="ALL">All Cities / Districts ({availableCities.length})</option>
                {availableCities.map(ci => (
                  <option key={`${ci.countryCode}_${ci.cityName}`} value={ci.cityName}>
                    {ci.flag} {ci.cityName} ({ci.stateName}) {ci.hasData ? '✓ Live Data' : '⏳ Scheduled'}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-6 relative">
              <input
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-zinc-700 pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-white font-mono"
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-400" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN DIRECTORY STREAM & PLACEHOLDERS */}
      <main className="space-y-8">
        {availableCities.map(cityConfig => {
          if (selectedCityName !== 'ALL' && cityConfig.cityName !== selectedCityName) return null;

          const contacts = RAW_DIRECTORY_DATABASE[cityConfig.countryCode]?.[cityConfig.cityName] || [];
          
          const q = searchQuery.toLowerCase().trim();
          const matchedContacts = contacts.filter(c => 
            q === '' ||
            c.companyName.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q) ||
            cityConfig.cityName.toLowerCase().includes(q)
          );

          if (q !== '' && matchedContacts.length === 0) return null;

          return (
            <section key={`${cityConfig.countryCode}_${cityConfig.cityName}`} className="space-y-4">
              
              {/* City Header Strip */}
              <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cityConfig.flag}</span>
                  <h2 className="text-base font-black uppercase text-white font-mono flex items-center gap-2">
                    <span>{cityConfig.cityName}</span>
                    <span className="text-xs text-zinc-500 font-normal">({cityConfig.stateName}, {cityConfig.countryName})</span>
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  {cityConfig.hasData ? (
                    <span className="px-2.5 py-0.5 bg-emerald-950 border border-emerald-500 text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      VERIFIED ({matchedContacts.length} AGENCIES)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      SCHEDULED EXPANSION
                    </span>
                  )}
                </div>
              </div>

              {/* RENDER VERIFIED DATA CARDS */}
              {cityConfig.hasData && matchedContacts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedContacts.map((contact) => (
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
              )}

              {/* RENDER PLACEHOLDER FOR MISSING DATA / UPCOMING COUNTRY & STATE DATA */}
              {!cityConfig.hasData && (
                <div className="border-2 border-dashed border-zinc-800 bg-zinc-950 p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-300 font-bold uppercase text-xs">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{cityConfig.flag} {cityConfig.cityName}, {cityConfig.countryName} HR Directory Data Scheduled</span>
                    </div>
                    <p className="text-zinc-400 text-xs font-sans max-w-2xl">
                      Verified staffing agency &amp; consultancy contacts for <strong>{cityConfig.cityName} ({cityConfig.countryName})</strong> are currently in the data extraction queue for our next batch update.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1.5 border border-zinc-800 bg-black text-zinc-400 text-xs font-bold uppercase">
                      Status: Upcoming Batch
                    </span>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
