import React, { useState, useEffect, useCallback } from 'react';
import { 
  Phone, Star, MapPin, Globe, Building, Search, Users, 
  Accessibility, Layers, RefreshCw, Database, ExternalLink, ArrowRight, Check, Zap
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
  totalListings: number;
  contacts: HRContact[];
}

export interface CountryData {
  countryName: string;
  countryCode: 'IN' | 'PH';
  cities: CityData[];
}

// Raw Directory Database (Stored for on-demand lazy retrieval)
const RAW_DIRECTORY_DATABASE: Record<string, Record<string, HRContact[]>> = {
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

// Summary metadata of available cities and listing counts for light initial payload
const CITY_METADATA: CountryData[] = [
  {
    countryName: "India",
    countryCode: "IN",
    cities: [
      { cityName: "West Delhi", totalListings: 20, contacts: [] }
    ]
  },
  {
    countryName: "Philippines",
    countryCode: "PH",
    cities: [
      { cityName: "Cebu City", totalListings: 6, contacts: [] },
      { cityName: "Makati City", totalListings: 12, contacts: [] },
      { cityName: "Quezon City", totalListings: 12, contacts: [] },
      { cityName: "Davao City", totalListings: 6, contacts: [] },
      { cityName: "Manila", totalListings: 14, contacts: [] }
    ]
  }
];

interface HRContactsProps {
  theme: string;
}

export default function HRContacts({ theme }: HRContactsProps) {
  const [selectedCountry, setSelectedCountry] = useState<'IN' | 'PH'>('IN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeContact, setActiveContact] = useState<{ cityName: string; contact: HRContact } | null>(null);
  const [dealDeck, setDealDeck] = useState(false);

  // Lazy Fetching state storage
  const [fetchedData, setFetchedData] = useState<Record<string, HRContact[]>>({});
  const [loadingCities, setLoadingCities] = useState<Record<string, boolean>>({});

  const isLight = theme === 'light';

  // Fast on-demand async fetching logic (zero lag, instant microtask payload)
  const fetchCityOnDemand = useCallback(async (countryCode: 'IN' | 'PH', cityName: string) => {
    const key = `${countryCode}_${cityName}`;
    if (fetchedData[key] || loadingCities[key]) return;

    setLoadingCities((prev) => ({ ...prev, [key]: true }));

    // Instant async resolution (microtask tick)
    await Promise.resolve();

    const contacts = RAW_DIRECTORY_DATABASE[countryCode]?.[cityName] || [];
    setFetchedData((prev) => ({ ...prev, [key]: contacts }));
    setLoadingCities((prev) => ({ ...prev, [key]: false }));
  }, [fetchedData, loadingCities]);

  // Auto-fetch active view cities or search results instantly
  useEffect(() => {
    const countryData = CITY_METADATA.find(c => c.countryCode === selectedCountry);
    if (!countryData) return;

    // If searching or if city selected, fetch all relevant cities immediately
    countryData.cities.forEach((city) => {
      const key = `${selectedCountry}_${city.cityName}`;
      if (!fetchedData[key] && !loadingCities[key]) {
        // Fetch first city automatically or if user searched
        if (searchQuery.trim() !== '' || !selectedCity || selectedCity === city.cityName) {
          fetchCityOnDemand(selectedCountry, city.cityName);
        }
      }
    });
  }, [selectedCountry, searchQuery, selectedCity, fetchCityOnDemand, fetchedData, loadingCities]);

  // Helper to fetch all cities for current country in one quick trigger
  const fetchAllForCurrentCountry = () => {
    const countryData = CITY_METADATA.find(c => c.countryCode === selectedCountry);
    if (!countryData) return;
    countryData.cities.forEach((city) => {
      fetchCityOnDemand(selectedCountry, city.cityName);
    });
  };

  // Helper for short name
  const getShortName = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + '...';
    }
    return name;
  };

  const handleCardClick = (cityName: string, contact: HRContact) => {
    setActiveContact({ cityName, contact });
  };

  const currentCountryMetadata = CITY_METADATA.find(c => c.countryCode === selectedCountry);
  const countryCities = currentCountryMetadata ? currentCountryMetadata.cities : [];

  // Filter logic combining lazy fetched contacts
  const filteredData = countryCities.map(city => {
    const key = `${selectedCountry}_${city.cityName}`;
    const contacts = fetchedData[key] || [];
    const isFetched = Boolean(fetchedData[key]);
    const isLoading = Boolean(loadingCities[key]);

    const matchedContacts = contacts.filter(c => 
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.cityName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      ...city,
      contacts: matchedContacts,
      isFetched,
      isLoading
    };
  }).filter(city => (!selectedCity || city.cityName === selectedCity) && (!searchQuery.trim() || city.contacts.length > 0));

  return (
    <div className={`p-1 sm:p-4 space-y-6 md:space-y-8 font-mono select-none ${
      isLight ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      
      {/* Header Panel - Strict Black & White */}
      <div className={`p-6 border-2 relative overflow-hidden transition-all duration-200 ${
        isLight
          ? 'bg-white border-black shadow-[4px_4px_0px_0px_#000000]'
          : 'bg-[#0a0a0a] border-zinc-700 shadow-[4px_4px_0px_0px_#ffffff]'
      }`}>
        <div className={`absolute top-0 left-0 w-2 h-full ${isLight ? 'bg-black' : 'bg-white'}`} />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-current" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase font-mono">
                HR DIRECTORIES
              </h2>
            </div>
            
            {/* Country Selector Tabs - Black & White */}
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedCountry('IN');
                  setSelectedCity(null);
                }}
                className={`px-3 py-1.5 border-2 text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${
                  selectedCountry === 'IN'
                    ? isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                    : isLight 
                      ? 'border-zinc-300 text-zinc-600 hover:border-black hover:text-black bg-white' 
                      : 'border-zinc-800 text-zinc-400 hover:border-white hover:text-white bg-black'
                }`}
              >
                India (Delhi)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCountry('PH');
                  setSelectedCity(null);
                }}
                className={`px-3 py-1.5 border-2 text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${
                  selectedCountry === 'PH'
                    ? isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                    : isLight 
                      ? 'border-zinc-300 text-zinc-600 hover:border-black hover:text-black bg-white' 
                      : 'border-zinc-800 text-zinc-400 hover:border-white hover:text-white bg-black'
                }`}
              >
                Philippines
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Fast Lazy Fetch All Action */}
            <button
              type="button"
              onClick={fetchAllForCurrentCountry}
              className={`px-3 py-2 border-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                isLight 
                  ? 'border-black bg-zinc-100 hover:bg-black hover:text-white' 
                  : 'border-zinc-600 bg-zinc-900 hover:bg-white hover:text-black'
              }`}
              title="Instantly fetch all city records on demand"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fetch All Data</span>
            </button>

            {/* Deck Action Trigger */}
            <button 
              type="button"
              onClick={() => setDealDeck(!dealDeck)}
              title={dealDeck ? "Grid Layout" : "Stacked Stack"}
              className={`p-2 border-2 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                dealDeck 
                  ? isLight ? 'border-black bg-black text-white' : 'border-white bg-white text-black'
                  : isLight ? 'border-zinc-400 text-black hover:border-black' : 'border-zinc-700 text-white hover:border-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{dealDeck ? "Unstack" : "Stack"}</span>
            </button>
          </div>
        </div>

        {/* Filter & Lazy Info Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-500/20 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <div className="relative font-mono">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 text-xs">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="SEARCH CONTACT, CATEGORY OR CITY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs font-mono p-2.5 pl-9 rounded-none border-2 focus:outline-none uppercase ${
                isLight 
                  ? 'bg-zinc-50 border-black text-black focus:bg-white' 
                  : 'bg-black border-zinc-700 text-white focus:border-white'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-end text-[11px] font-mono text-zinc-400 gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 border inline-block ${isLight ? 'bg-black border-black' : 'bg-white border-white'}`} />
              <span>5.0 Perfect Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-current inline-block" />
              <span>Wheelchair Accessible</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <RefreshCw className="w-3 h-3" />
              <span>Lazy On-Demand Fetching Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredData.map((city, cityIdx) => {
          const numCols = Math.max(1, Math.ceil((city.contacts.length || 1) / 5));
          const key = `${selectedCountry}_${city.cityName}`;

          return (
            <div 
              key={city.cityName}
              className={`flex flex-col min-h-[320px] border-2 p-3 transition-all duration-300 ${
                isLight ? 'border-black bg-white' : 'border-zinc-800 bg-[#080808]'
              } ${city.contacts.length > 10 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* City Header */}
              <div className={`p-2.5 border-2 font-mono flex items-center justify-between mb-3 ${
                isLight 
                  ? 'bg-zinc-100 border-black text-black' 
                  : 'bg-zinc-900 border-zinc-700 text-white'
              }`}>
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <h3 className="font-bold text-xs uppercase tracking-tight truncate" title={city.cityName}>
                    {city.cityName}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 border font-bold uppercase">
                    {city.isFetched ? `${city.contacts.length} LISTINGS` : `${city.totalListings} READY`}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 border border-current font-bold">
                    #{cityIdx + 1}
                  </span>
                </div>
              </div>

              {/* Lazy Fetch Prompt if not fetched yet */}
              {!city.isFetched ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-zinc-700 my-2">
                  <Database className="w-8 h-8 text-zinc-500 mb-2 animate-pulse" />
                  <p className="text-xs text-zinc-400 uppercase font-bold mb-3">
                    {city.totalListings} Contacts On Standby
                  </p>
                  <button
                    onClick={() => fetchCityOnDemand(selectedCountry, city.cityName)}
                    disabled={city.isLoading}
                    className={`px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 transition-all ${
                      isLight 
                        ? 'border-black bg-black text-white hover:bg-zinc-800' 
                        : 'border-white bg-white text-black hover:bg-zinc-200'
                    }`}
                  >
                    {city.isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Fetching Directory...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Fetch {city.cityName} Data</span>
                      </>
                    )}
                  </button>
                </div>
              ) : city.contacts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6 text-center text-xs text-zinc-500 border border-dashed border-zinc-800">
                  NO MATCHING CONTACTS FOUND
                </div>
              ) : (
                /* Solitaire / Grid View Stack */
                <div 
                  className={`grid gap-4 relative flex-1 ${dealDeck ? 'block space-y-2' : 'h-[250px] min-h-[250px] mb-4'}`}
                  style={dealDeck ? {} : { gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: numCols }).map((_, colIdx) => {
                    const startIdx = colIdx * 5;
                    const colContacts = city.contacts.slice(startIdx, startIdx + 5);
                    const reversedContacts = dealDeck ? colContacts : [...colContacts].reverse();

                    return (
                      <div key={colIdx} className={`${dealDeck ? 'space-y-2' : 'relative h-full'}`}>
                        {reversedContacts.map((contact, index) => {
                          const overlapOffset = dealDeck ? 0 : index * 32;
                          const isFrontCard = dealDeck ? true : index === (colContacts.length - 1);
                          const isSelected = activeContact?.contact.companyName === contact.companyName;

                          return (
                            <motion.div
                              key={contact.companyName}
                              onClick={() => handleCardClick(city.cityName, contact)}
                              className={`${dealDeck ? 'relative' : 'absolute w-full'} transition-all cursor-pointer group`}
                              style={dealDeck ? {} : {
                                top: `${overlapOffset}px`,
                                zIndex: index + 5
                              }}
                              whileHover={dealDeck ? { scale: 1.01 } : { y: -6, transition: { duration: 0.12 } }}
                            >
                              <div className={`border-2 p-2.5 text-left transition-all duration-150 relative ${
                                isSelected 
                                  ? isLight ? 'border-black bg-black text-white' : 'border-white bg-white text-black' 
                                  : contact.rating === 5.0
                                    ? isLight ? 'border-black bg-zinc-100' : 'border-zinc-500 bg-zinc-900'
                                    : isLight ? 'border-zinc-300 bg-white hover:border-black' : 'border-zinc-800 bg-[#121212] hover:border-zinc-500'
                              }`}>
                                
                                {/* Card top header */}
                                <div className="flex items-center justify-between gap-1 border-b border-current/20 pb-1 mb-1">
                                  <span className="text-[10px] font-bold uppercase truncate max-w-[80%]">
                                    {getShortName(contact.companyName)}
                                  </span>
                                  
                                  <div className="flex items-center gap-0.5 text-[10px] font-bold shrink-0">
                                    <Star className="w-2.5 h-2.5 fill-current" />
                                    <span>{contact.rating.toFixed(1)}</span>
                                  </div>
                                </div>

                                {/* Company Full Name */}
                                <h4 className="font-bold text-[10px] uppercase tracking-tight leading-tight line-clamp-2 min-h-[26px]">
                                  {contact.companyName}
                                </h4>

                                {/* Card bottom meta */}
                                <div className={`mt-1 pt-1 border-t border-current/10 flex items-center justify-between text-[8px] uppercase tracking-wider ${
                                  !dealDeck && !isFrontCard ? 'hidden group-hover:flex' : 'flex'
                                }`}>
                                  <span className="opacity-75">{contact.category}</span>
                                  <span className="font-bold">{contact.reviews} REV</span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded Active Business Card Overlay - Monochrome Modal */}
      <AnimatePresence>
        {activeContact && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 font-mono"
            onClick={() => setActiveContact(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-md border-2 p-6 relative overflow-hidden text-left ${
                isLight ? 'bg-white border-black text-black' : 'bg-black border-white text-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between border-b-2 border-current pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">COMPANY DOSSIER</span>
                </div>
                <button
                  onClick={() => setActiveContact(null)}
                  className="p-1 border border-current text-xs font-bold hover:bg-current hover:text-black dark:hover:text-black cursor-pointer transition"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Company Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-bold opacity-60 block">LOCATION: {activeContact.cityName}</span>
                  <h3 className="text-lg font-black uppercase tracking-tight leading-tight mt-0.5">
                    {activeContact.contact.companyName}
                  </h3>
                </div>

                {/* Score Grid */}
                <div className={`grid grid-cols-2 gap-3 border-2 p-3 text-center ${
                  isLight ? 'border-black bg-zinc-50' : 'border-zinc-700 bg-zinc-900'
                }`}>
                  <div>
                    <span className="text-[8px] opacity-70 block font-bold uppercase">RATING SCORE</span>
                    <span className="font-bold text-xs flex items-center justify-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-current" /> {activeContact.contact.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] opacity-70 block font-bold uppercase">REVIEWS COUNT</span>
                    <span className="font-bold text-xs block mt-0.5">
                      {activeContact.contact.reviews} REVIEWS
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2.5 text-xs pt-1">
                  <div className="flex items-start gap-2.5">
                    <Building className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] opacity-60 block uppercase">CATEGORY</span>
                      <span className="font-bold uppercase">{activeContact.contact.category}</span>
                    </div>
                  </div>

                  {activeContact.contact.wheelchairAccessible && (
                    <div className="flex items-center gap-2.5">
                      <Accessibility className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-bold uppercase border border-current px-2 py-0.5">
                        Wheelchair Accessible
                      </span>
                    </div>
                  )}

                  <div className={`flex items-start gap-2.5 border-t border-current/20 pt-2.5 ${activeContact.contact.phone === 'N/A' ? 'opacity-40' : ''}`}>
                    <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] opacity-60 block uppercase">TELEPHONE</span>
                      <span className="font-bold">{activeContact.contact.phone}</span>
                    </div>
                  </div>

                  {activeContact.contact.website && (
                    <div className="flex items-start gap-2.5 border-t border-current/20 pt-2.5">
                      <Globe className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[8px] opacity-60 block uppercase">WEBSITE</span>
                        <a 
                          href={activeContact.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold underline break-all hover:opacity-75"
                        >
                          {activeContact.contact.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t-2 border-current flex items-center justify-center gap-3">
                  {activeContact.contact.phone !== 'N/A' ? (
                    <a
                      href={`tel:${activeContact.contact.phone}`}
                      title={`Call ${activeContact.contact.phone}`}
                      className={`px-4 py-2 border-2 font-bold text-xs uppercase flex items-center gap-2 transition cursor-pointer ${
                        isLight ? 'border-black bg-black text-white hover:bg-zinc-800' : 'border-white bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                  ) : (
                    <div className="px-4 py-2 border border-current/30 text-xs uppercase font-bold opacity-40 cursor-not-allowed flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>No Phone</span>
                    </div>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeContact.contact.companyName + " " + activeContact.cityName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Locate on Maps"
                    className="px-4 py-2 border-2 border-current text-xs uppercase font-bold flex items-center gap-2 hover:bg-current hover:text-black dark:hover:text-black transition cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Maps</span>
                  </a>

                  {activeContact.contact.website && (
                    <a
                      href={activeContact.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Site"
                      className="px-4 py-2 border-2 border-current text-xs uppercase font-bold flex items-center gap-2 hover:bg-current hover:text-black dark:hover:text-black transition cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Site</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Expanding Matrix Note - B&W */}
      <div className={`p-4 border-2 border-dashed text-center font-mono ${
        isLight ? 'bg-zinc-50 border-black' : 'bg-zinc-950 border-zinc-700'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-left">
            <Globe className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-bold uppercase block">DIRECTORY NETWORK ONLINE</span>
              <span className="text-[10px] opacity-70">On-demand lazy fetching active. More cities & global regions available.</span>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase px-2.5 py-1 border border-current">
            EXPANDING INDEX
          </span>
        </div>
      </div>

    </div>
  );
}
