import React, { useState } from 'react';
import { 
  Phone, Star, MapPin, Sparkles, Globe, Building, Search, Users, 
  CheckCircle, Eye, Info, Accessibility, ChevronDown, ChevronUp, Map, ExternalLink
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

const ALL_HR_DATA: CountryData[] = [
  {
    countryName: "India",
    countryCode: "IN",
    cities: [
      {
        cityName: "West Delhi",
        totalListings: 20,
        contacts: [
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
      }
    ]
  },
  {
    countryName: "Philippines",
    countryCode: "PH",
    cities: [
      {
        cityName: "Cebu City",
        totalListings: 7,
        contacts: [
          { rank: 1, companyName: "Logix BPO", rating: 4.9, reviews: 262, phone: "+44 115 654 7288", category: "Recruiter", wheelchairAccessible: false, website: "https://logixbpo.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb_cebu" },
          { rank: 2, companyName: "C&G Immigration & Business Services - Cebu", rating: 5.0, reviews: 58, phone: "+63 956 174 7552", category: "Visa consulting service", wheelchairAccessible: false, website: "https://cgconsulting.ph/" },
          { rank: 3, companyName: "ContactPoint360 Philippines", rating: 4.8, reviews: 107, phone: "+63 917 717 1051", category: "BPO company", wheelchairAccessible: true, website: "https://cp360.talentmatch.h2r.ai/" },
          { rank: 4, companyName: "HireBiz", rating: 4.9, reviews: 34, phone: "+63 906 370 8914", category: "Corporate office", wheelchairAccessible: false, website: "http://www.hirebiz.com/" },
          { rank: 5, companyName: "Click It Virtual Services", rating: 4.9, reviews: 16, phone: "+63 929 880 8143", category: "Human resource consulting", wheelchairAccessible: false, website: "https://clickitvirtual.com/" },
          { rank: 6, companyName: "Global Staff Connections", rating: 4.6, reviews: 15, phone: "N/A", category: "Employment agency", wheelchairAccessible: false, website: "http://globalstaffconnections.com/" }
        ]
      },
      {
        cityName: "Makati City",
        totalListings: 12,
        contacts: [
          { rank: 1, companyName: "Stark Asia Solutions", rating: 5.0, reviews: 766, phone: "+63 917 180 8612", category: "Recruiter", wheelchairAccessible: true, website: "http://www.stark.com.ph/" },
          { rank: 2, companyName: "Curran Daly + Associates", rating: 5.0, reviews: 326, phone: "+63 2 8863 6835", category: "Recruiter", wheelchairAccessible: true, website: "http://www.currandaly.com/" },
          { rank: 3, companyName: "Manila Recruitment - Recruitment Agency Executive Search", rating: 4.8, reviews: 616, phone: "+63 917 166 2768", category: "Recruiter", wheelchairAccessible: true, website: "https://www.manilarecruitment.com/" },
          { rank: 4, companyName: "Robert Walters Recruitment Agency Philippines", rating: 4.8, reviews: 205, phone: "+63 2 8816 4972", category: "Employment center", wheelchairAccessible: false, website: "https://www.robertwalters.com.ph/" },
          { rank: 5, companyName: "Remote Staff", rating: 4.9, reviews: 114, phone: "+63 2 8846 4249", category: "Corporate office", wheelchairAccessible: true, website: "https://www.remotestaff.ph/" },
          { rank: 6, companyName: "Bossjob Philippines", rating: 4.8, reviews: 160, phone: "+63 2 8511 5709", category: "Recruiter", wheelchairAccessible: false, website: "https://bossjob.ph/" },
          { rank: 7, companyName: "Permhunt", rating: 5.0, reviews: 50, phone: "+63 961 759 4405", category: "Recruiter", wheelchairAccessible: true, website: "https://permhunt.com/" },
          { rank: 8, companyName: "MCVO Talent Outsourcing Services", rating: 4.9, reviews: 44, phone: "(312) 460-2470", category: "Executive search firm", wheelchairAccessible: true, website: "https://www.mcvotalent.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb" },
          { rank: 9, companyName: "Transitions executive search + hr business solutions", rating: 5.0, reviews: 27, phone: "+63 2 8887 5720", category: "Executive search firm", wheelchairAccessible: true, website: "https://www.transitionsinc.net/" },
          { rank: 10, companyName: "Latte Search - Recruitment & Headhunter Agency", rating: 4.9, reviews: 15, phone: "N/A", category: "Recruiter", wheelchairAccessible: true, website: "http://www.latte.ph/" },
          { rank: 11, companyName: "Elite HeadHunting Incorporated", rating: 4.7, reviews: 12, phone: "+63 2 8845 1234", category: "Recruiter", wheelchairAccessible: true, website: "http://eliteheadhunting.net/" },
          { rank: 12, companyName: "Techsearch International Corp", rating: 4.6, reviews: 8, phone: "+63 2 8893 2345", category: "Executive search firm", wheelchairAccessible: false, website: "https://www.techsearchinternational.com/" }
        ]
      },
      {
        cityName: "Quezon City",
        totalListings: 12,
        contacts: [
          { rank: 1, companyName: "Ignite Careers", rating: 4.9, reviews: 2977, phone: "+63 2 8234 5712", category: "Recruiter", wheelchairAccessible: true, website: "https://ignitecareers.ph/" },
          { rank: 2, companyName: "Global Headstart Specialist, Inc.", rating: 4.9, reviews: 1353, phone: "+63 2 8298 4313", category: "Business to business service", wheelchairAccessible: true, website: "http://www.globalheadstart.com/" },
          { rank: 3, companyName: "J-K Network Services", rating: 4.9, reviews: 1003, phone: "+63 2 8245 2829", category: "Human resource consulting", wheelchairAccessible: false, website: "http://www.jkmanpower.jp-network-e.com/" },
          { rank: 4, companyName: "RecruitGo Philippines", rating: 5.0, reviews: 97, phone: "+63 921 976 2870", category: "Software company", wheelchairAccessible: true, website: "https://recruitgo.com/" },
          { rank: 5, companyName: "VXI Panorama Recruitment Center", rating: 4.4, reviews: 371, phone: "+63 917 777 5555", category: "BPO company", wheelchairAccessible: true, website: "http://www.vxi-family.com/" },
          { rank: 6, companyName: "Rensol Recruitment and Consulting, Inc.", rating: 4.5, reviews: 216, phone: "+63 2 8931 0968", category: "Recruiter", wheelchairAccessible: true, website: "http://www.rensol.com/" },
          { rank: 7, companyName: "1st Dynamic Personnel Resources Inc", rating: 4.5, reviews: 187, phone: "+63 2 7798 4048", category: "Employment agency", wheelchairAccessible: true, website: "http://1stdynamicpersonnel.com/" },
          { rank: 8, companyName: "Armasourcing", rating: 5.0, reviews: 16, phone: "+63 995 436 8153", category: "Talent agency", wheelchairAccessible: true, website: "https://armasourcing.com/" },
          { rank: 9, companyName: "N&M Staffing Services", rating: 5.0, reviews: 14, phone: "+63 976 503 0714", category: "Consultant", wheelchairAccessible: false, website: "http://nmstaffing.com.ph/" },
          { rank: 10, companyName: "Wealthlink Incorporated Manpower Agency", rating: 4.5, reviews: 12, phone: "+63 2 8922 4321", category: "Employment agency", wheelchairAccessible: false, website: "https://wealthlink.com.ph/" },
          { rank: 11, companyName: "Workscale Resources Inc", rating: 4.8, reviews: 8, phone: "N/A", category: "Corporate office", wheelchairAccessible: true, website: "http://www.workscale.ph/" },
          { rank: 12, companyName: "Clear Leadership Consulting", rating: 4.7, reviews: 6, phone: "N/A", category: "Consultant", wheelchairAccessible: false, website: "https://clearleadershipcoach.com/" }
        ]
      },
      {
        cityName: "Davao City",
        totalListings: 6,
        contacts: [
          { rank: 1, companyName: "Full Potential Solutions Davao", rating: 4.4, reviews: 49, phone: "(833) 470-0377", category: "BPO company", wheelchairAccessible: true, website: "http://www.fpsinc.com/" },
          { rank: 2, companyName: "Global Staff Network", rating: 5.0, reviews: 2, phone: "+61 7 3177 7774", category: "Employment agency", wheelchairAccessible: false, website: "https://globalstaffnetwork.com/" },
          { rank: 3, companyName: "FJ80 HR Consultancy Co.", rating: 5.0, reviews: 1, phone: "+63 995 480 8062", category: "Human resource consulting", wheelchairAccessible: false, website: "https://fj80hrconsultancy.com/" },
          { rank: 4, companyName: "Human Resource Management Office", rating: 5.0, reviews: 1, phone: "+63 82 227 7772", category: "Government office", wheelchairAccessible: true, website: "https://www.davaocity.gov.ph/departments/human-resource-management-office/" },
          { rank: 5, companyName: "Online Hiring Corp.", rating: 4.8, reviews: 4, phone: "+63 82 295 1770", category: "Recruiter", wheelchairAccessible: true, website: "http://www.onlinehiringcorporation.com/" },
          { rank: 6, companyName: "HMO International Recruitment Inc - Davao", rating: 4.6, reviews: 22, phone: "+63 82 221 4321", category: "Employment agency", wheelchairAccessible: true, website: "https://hmoihr.com/" }
        ]
      },
      {
        cityName: "Manila",
        totalListings: 14,
        contacts: [
          { rank: 1, companyName: "Monroe Consulting Group Philippines - Recruitment Agency", rating: 4.9, reviews: 2258, phone: "+63 2 7002 1292", category: "Recruiter", wheelchairAccessible: true, website: "https://www.monroeconsulting.com/philippines" },
          { rank: 2, companyName: "FMW Human Resources International Corporation", rating: 4.6, reviews: 162, phone: "+63 2 8280 9471", category: "Human resource consulting", wheelchairAccessible: true, website: "https://fmwhumanresources.com/" },
          { rank: 3, companyName: "YWA Human Resource Corporation", rating: 4.4, reviews: 259, phone: "+63 2 8524 7777", category: "Employment agency", wheelchairAccessible: true, website: "http://www.ywacorp.com/" },
          { rank: 4, companyName: "2018 Crowne Human Resources Inc", rating: 4.9, reviews: 19, phone: "+63 939 515 1646", category: "Human resource consulting", wheelchairAccessible: false, website: "https://www.2018crownehumanresourcesinc.com/" },
          { rank: 5, companyName: "Lead Resorces Management Corp.", rating: 4.6, reviews: 42, phone: "N/A", category: "Employment agency", wheelchairAccessible: false, website: "http://lead.com.ph/" },
          { rank: 6, companyName: "Done Remotely", rating: 5.0, reviews: 4, phone: "N/A", category: "BPO company", wheelchairAccessible: false, website: "https://www.doneremotely.com/" },
          { rank: 7, companyName: "Century High HR Incorporated - Cancelled", rating: 4.6, reviews: 8, phone: "+63 992 398 7952", category: "Recruiter", wheelchairAccessible: false, website: "http://www.facebook.com/HRCenturyHigh" },
          { rank: 8, companyName: "PHR-Philippine Human Resource Worldwide Employment", rating: 4.1, reviews: 51, phone: "+63 2 8518 8448", category: "Human resource consulting", wheelchairAccessible: true, website: "http://www.phrwe.com/" },
          { rank: 9, companyName: "Happy World Human Resource and Recruitment", rating: 4.3, reviews: 15, phone: "N/A", category: "Recruiter", wheelchairAccessible: false, website: "http://happyworldrecruitmentagency.blogspot.com/" },
          { rank: 10, companyName: "AristoSourcing", rating: 4.8, reviews: 25, phone: "N/A", category: "BPO company", wheelchairAccessible: true, website: "https://aristosourcing.com/" },
          { rank: 11, companyName: "KFL Manpower Agency", rating: 4.5, reviews: 14, phone: "N/A", category: "Employment agency", wheelchairAccessible: false, website: "http://www.kflmanpoweragency.com/" },
          { rank: 12, companyName: "Skills Innovative People Services, Inc.", rating: 4.6, reviews: 9, phone: "N/A", category: "Human resource consulting", wheelchairAccessible: false, website: "https://skillsinnovativepeopleservice.business.site/" },
          { rank: 13, companyName: "HURIS Inc. (Human Resource Innovations and Solutions)", rating: 4.7, reviews: 20, phone: "+63 2 8871 1234", category: "Human resource consulting", wheelchairAccessible: true, website: "http://www.huris.com.ph/" },
          { rank: 14, companyName: "Newfold Digital Philippines (formerly DreamHost)", rating: 4.4, reviews: 30, phone: "N/A", category: "Corporate office", wheelchairAccessible: true, website: "http://newfold.com/" }
        ]
      }
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

  const isLight = theme === 'light';

  // Helper to get first two words of a company name
  const getShortName = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + '...';
    }
    return name;
  };

  // Sort helper to rank based on weighted index: reviews & rating
  const getWeightedScore = (contact: HRContact) => {
    return contact.rating * 20 + Math.log10(contact.reviews || 1) * 10;
  };

  const handleCardClick = (cityName: string, contact: HRContact) => {
    setActiveContact({ cityName, contact });
  };

  const currentCountryData = ALL_HR_DATA.find(c => c.countryCode === selectedCountry);
  const countryCities = currentCountryData ? currentCountryData.cities : [];

  const filteredData = countryCities.map(city => {
    const matchedContacts = city.contacts.filter(c => 
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.cityName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...city,
      contacts: matchedContacts
    };
  }).filter(city => city.contacts.length > 0 && (!selectedCity || city.cityName === selectedCity));

  return (
    <div className={`p-1 sm:p-4 space-y-6 md:space-y-8 ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
      
      {/* Header Panel */}
      <div className={`p-6 border-2 relative overflow-hidden transition-all duration-300 ${
        isLight
          ? 'bg-white border-gray-200 shadow-[4px_4px_0px_0px_#cbd5e1]'
          : 'bg-[#070b13] border-[#121c38] shadow-[4px_4px_0px_0px_#121c38]'
      }`}>
        <div className="absolute top-0 left-0 w-2 h-full bg-[#ef4444]" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pl-2">
            <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight uppercase">
              Directories
            </h2>
            
            {/* Country Selector Tabs */}
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedCountry('IN');
                  setSelectedCity(null);
                }}
                className={`px-3 py-1.5 border-2 font-mono text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${
                  selectedCountry === 'IN'
                    ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                    : isLight 
                      ? 'border-gray-200 text-gray-500 hover:text-slate-800 bg-white' 
                      : 'border-slate-800 text-gray-400 hover:text-white bg-transparent'
                }`}
              >
                🇮🇳 India (Delhi)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCountry('PH');
                  setSelectedCity(null);
                }}
                className={`px-3 py-1.5 border-2 font-mono text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${
                  selectedCountry === 'PH'
                    ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                    : isLight 
                      ? 'border-gray-200 text-gray-500 hover:text-slate-800 bg-white' 
                      : 'border-slate-800 text-gray-400 hover:text-white bg-transparent'
                }`}
              >
                🇵🇭 Philippines
              </button>
            </div>
          </div>
          
          {/* Deck Action Trigger */}
          <button 
            type="button"
            onClick={() => setDealDeck(!dealDeck)}
            title={dealDeck ? "Merge Piles" : "Cascade Piles"}
            className={`p-3 border-2 font-mono font-bold text-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              dealDeck 
                ? 'border-[#ef4444] text-[#ef4444] bg-[#ef4444]/10 hover:bg-transparent shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                : 'border-[#10b981] text-[#10b981] hover:bg-[#10b981]/15 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            }`}
          >
            🃏
          </button>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-4 border-t border-slate-800/40 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <div className="relative font-mono">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-xs">
              <Search className="w-4 h-4 text-[#10b981]" />
            </span>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs font-mono p-2.5 pl-9 rounded-none border focus:outline-none focus:border-[#10b981] ${
                isLight ? 'bg-slate-50 border-gray-300 text-slate-900' : 'bg-[#05070c] border-[#1e2e54] text-white'
              }`}
            />
          </div>

          <div className="flex items-center justify-end text-xs font-mono text-gray-400 gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#10b981] inline-block" />
              <span>Perfect 5.0 Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-cyan-500 inline-block" />
              <span>Wheelchair Accessible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Solitaire Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredData.map((city, cityIdx) => {
          const numCols = Math.ceil(city.contacts.length / 5);
          return (
            <div 
              key={city.cityName}
              className={`flex flex-col min-h-[350px] transition-all duration-500 ${
                dealDeck ? 'space-y-2' : ''
              } ${city.contacts.length > 10 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* City Pile Header */}
              <div className={`p-3 border-2 font-mono select-none flex items-center justify-between mb-2 relative ${
                isLight 
                  ? 'bg-slate-100 border-gray-300 text-slate-800' 
                  : 'bg-[#090e1a] border-[#1e2e54]/80 text-white'
              }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-yellow-500" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-tight truncate max-w-[200px]" title={city.cityName}>
                    {city.cityName}
                  </h3>
                </div>
                <span className="text-xs bg-slate-950/40 p-1 px-1.5 text-yellow-400 font-bold border border-slate-800">
                  #{cityIdx + 1}
                </span>
              </div>

              {/* Solitaire Pile Stack - Rendered as dynamic vertical columns next to each other inside the city container */}
              <div 
                className={`grid gap-4 relative flex-1 ${dealDeck ? 'block space-y-2' : 'h-[250px] min-h-[250px] mb-6'}`}
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
                            whileHover={dealDeck ? { scale: 1.02 } : { y: -8, transition: { duration: 0.15 } }}
                          >
                            <div className={`border-2 p-3 text-left transition-all duration-200 relative rounded-xs ${
                              isSelected 
                                ? 'border-[#ef4444] bg-[#ef4444]/10' 
                                : contact.rating === 5.0
                                  ? isLight ? 'border-emerald-300 bg-emerald-50' : 'border-emerald-800 bg-[#051a13]'
                                  : isLight ? 'border-gray-200 bg-white hover:border-slate-400' : 'border-[#1e2e54] bg-[#0c101b] hover:border-slate-700'
                            } ${
                              !dealDeck ? 'shadow-md hover:shadow-xl' : 'shadow-xs'
                            }`}>
                              
                              {/* Solitaire card top trim */}
                              <div className="flex items-center justify-between gap-1 border-b border-slate-700/10 pb-1 mb-1">
                                <span className="text-[10px] font-sans font-black uppercase text-[#10b981] truncate max-w-[80%]">
                                  {getShortName(contact.companyName)}
                                </span>
                                
                                {/* Rating block */}
                                <div className="flex items-center gap-0.5 text-yellow-500 text-[10px] font-mono shrink-0">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  <span className="font-bold">{contact.rating.toFixed(1)}</span>
                                </div>
                              </div>

                              {/* Firm details: full name is displayed inside body */}
                              <h4 className={`font-sans font-bold text-[10px] uppercase tracking-tight leading-tight transition-colors ${
                                isLight ? 'text-slate-800' : 'text-slate-200'
                              } group-hover:text-[#10b981] line-clamp-2 min-h-[28px]`} title={contact.companyName}>
                                {contact.companyName}
                              </h4>

                              {/* Card details - folded/collapsed if stacked tightly, revealed on hover or expanded */}
                              <div className={`mt-1.5 pt-1 border-t border-slate-700/5 flex items-center justify-end text-[8px] font-mono text-gray-500 ${
                                !dealDeck && !isFrontCard ? 'hidden group-hover:flex' : 'flex'
                              }`}>
                                <span className="text-right shrink-0">{contact.reviews} reviews</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Active Business Card Overlay Panel */}
      <AnimatePresence>
        {activeContact && (
          <div 
            className="fixed inset-0 bg-[#020408]/80 backdrop-blur-xs z-[9999] flex items-center justify-center p-4"
            onClick={() => setActiveContact(null)}
          >
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ perspective: 1000 }}
              className={`w-full max-w-md border-2 p-6 relative overflow-hidden text-left font-sans ${
                isLight ? 'bg-white border-slate-300' : 'bg-[#0b1120] border-[#ef4444]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card top gradient ribbon */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-[#10b981]" />
              
              {/* Header block */}
              <div className="flex items-center justify-end mb-4 mt-2">
                <button
                  onClick={() => setActiveContact(null)}
                  className={`p-1.5 transition bg-transparent border-0 cursor-pointer text-sm font-bold ${
                    isLight ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ✕
                </button>
              </div>

              {/* Company main details */}
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-black uppercase tracking-tight leading-tight ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}>
                    {activeContact.contact.companyName}
                  </h3>
                </div>

                {/* Rating score grid info with light white theme base background */}
                <div className="grid grid-cols-2 gap-3 bg-white border border-gray-200 p-3 font-mono text-center shadow-xs rounded-xs">
                  <div>
                    <span className="text-[8px] text-gray-500 block font-bold uppercase">TOTAL RATING</span>
                    <span className="text-yellow-600 font-bold text-xs flex items-center justify-center gap-0.5 mt-0.5">
                      <Star className="w-3 h-3 fill-current" /> {activeContact.contact.rating.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-500 block font-bold uppercase">REVIEW COUNT</span>
                    <span className="text-slate-800 font-bold text-xs block mt-0.5">
                      {activeContact.contact.reviews}
                    </span>
                  </div>
                </div>

                {/* Contact information details */}
                <div className="space-y-3 text-xs font-mono pt-2">
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] text-slate-500 block">SERVICE CATEGORY</span>
                      <span className={`${isLight ? 'text-slate-700' : 'text-slate-300'} font-semibold`}>{activeContact.contact.category}</span>
                    </div>
                  </div>

                  {activeContact.contact.wheelchairAccessible && (
                    <div className="flex items-center gap-3 pl-7">
                      <Accessibility className="w-4 h-4 text-cyan-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-cyan-600 font-semibold uppercase">Wheelchair Accessible Entrance</span>
                      </div>
                    </div>
                  )}

                  <div className={`flex items-start gap-3 border-t border-gray-100 pt-3 ${activeContact.contact.phone === 'N/A' ? 'opacity-30' : ''}`}>
                    <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] text-slate-500 block">TELEPHONE REGISTRY</span>
                      {activeContact.contact.phone !== 'N/A' && (
                        <span className={`${isLight ? 'text-slate-700' : 'text-slate-300'} font-semibold`}>{activeContact.contact.phone}</span>
                      )}
                    </div>
                  </div>

                  {activeContact.contact.website && (
                    <div className="flex items-start gap-3 border-t border-gray-100 pt-3">
                      <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[8px] text-slate-500 block">WEBSITE</span>
                        <a 
                          href={activeContact.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline font-semibold break-all"
                        >
                          {activeContact.contact.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Receiver button, Location pin, and Website link (with Call icon faded if telephone is not available) */}
                <div className="pt-4 border-t border-gray-200/40 flex items-center justify-center gap-4">
                  {activeContact.contact.phone !== 'N/A' ? (
                    <a
                      href={`tel:${activeContact.contact.phone}`}
                      title={`Call ${activeContact.contact.phone}`}
                      className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 hover:text-emerald-500 rounded-full transition-all duration-200 border border-emerald-500/30 inline-flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  ) : (
                    <div
                      title="No registered telephone available"
                      className="p-3 bg-gray-500/5 text-gray-400 border border-gray-500/10 rounded-full inline-flex items-center justify-center opacity-40 cursor-not-allowed"
                    >
                      <Phone className="w-5 h-5" />
                    </div>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeContact.contact.companyName + " " + activeContact.cityName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Locate on Google Maps"
                    className="p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 hover:text-blue-500 rounded-full transition-all duration-200 border border-blue-500/30 inline-flex items-center justify-center"
                  >
                    <MapPin className="w-5 h-5" />
                  </a>

                  {activeContact.contact.website && (
                    <a
                      href={activeContact.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Website"
                      className="p-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 hover:text-yellow-500 rounded-full transition-all duration-200 border border-yellow-500/30 inline-flex items-center justify-center"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Note: More countries coming soon */}
      <div className={`p-4 border border-dashed rounded-none text-center relative ${
        isLight ? 'bg-slate-50 border-gray-300' : 'bg-[#040810] border-[#1e2e54]/50'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2 text-left">
            <Globe className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <span className="text-[11px] font-bold text-slate-200 block uppercase tracking-wider">Expanding Directory Matrix</span>
              <span className="text-[9px] text-gray-500">More cities and countries are currently being crawled by the Ant agent.</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest bg-yellow-500/10 px-2.5 py-1 border border-yellow-500/20">
            More countries coming soon
          </span>
        </div>
      </div>

    </div>
  );
}
