import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  Phone, Star, MapPin, Globe, Building, Search, Users, 
  Accessibility, Layers, RefreshCw, Database, ExternalLink, ArrowRight, Check, Zap,
  Compass, Map, Filter, RotateCcw, Clock, AlertCircle, PlusCircle, ChevronDown, ChevronUp, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface HRContact {
  rank: number;
  companyName: string;
  rating: number;
  reviews: number;
  phone?: string;
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
  // NA REGION
  {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    region: 'NA',
    cities: [
      {
            "cityName": "New York",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 20
      },
      {
            "cityName": "Dallas",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 15
      },
      {
            "cityName": "Boston",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 14
      },
      {
            "cityName": "Los Angeles",
            "stateName": "California",
            "hasData": true,
            "totalListings": 11
      },
      {
            "cityName": "Portland",
            "stateName": "Oregon",
            "hasData": true,
            "totalListings": 11
      },
      {
            "cityName": "San Francisco",
            "stateName": "California",
            "hasData": true,
            "totalListings": 11
      },
      {
            "cityName": "Irving",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 9
      },
      {
            "cityName": "Oklahoma City",
            "stateName": "Oklahoma",
            "hasData": true,
            "totalListings": 9
      },
      {
            "cityName": "Seattle",
            "stateName": "Washington",
            "hasData": true,
            "totalListings": 6
      },
      {
            "cityName": "San Jose",
            "stateName": "CA",
            "hasData": true,
            "totalListings": 5
      },
      {
            "cityName": "Austin",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Buffalo",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Other US Hubs",
            "stateName": "United States",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Providence",
            "stateName": "Rhode Island",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Woburn",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Arlington",
            "stateName": "Virginia",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Atlanta",
            "stateName": "Georgia",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Braintree",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Brooklyn",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Chicago",
            "stateName": "Illinois",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Grand Rapids",
            "stateName": "Michigan",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Honolulu",
            "stateName": "Hawaii",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Houston",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Pasadena",
            "stateName": "California",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Williamsville",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Addison",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Albany",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Albuquerque",
            "stateName": "New Mexico",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Anchorage",
            "stateName": "Alaska",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Bellevue",
            "stateName": "Washington",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Cambridge",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Charlotte",
            "stateName": "North Carolina",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Coppell",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Fairfield",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Farmington",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Irvine",
            "stateName": "California",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Liberty Township",
            "stateName": "Ohio",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Livonia",
            "stateName": "Michigan",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Marlborough",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Miami",
            "stateName": "Florida",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Middletown",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Midwest City",
            "stateName": "Oklahoma",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Nashville",
            "stateName": "Tennessee",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Norton",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Norwalk",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Philadelphia",
            "stateName": "Pennsylvania",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Piscataway",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Plano",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Rochester",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Rocky Hill",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Salem",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Sherman Oaks",
            "stateName": "California",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Stamford",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Woodland Hills",
            "stateName": "California",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Allentown",
            "stateName": "Pennsylvania",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Alpharetta",
            "stateName": "Georgia",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Amarillo",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Ashburn",
            "stateName": "Virginia",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Avon",
            "stateName": "Ohio",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Bedford",
            "stateName": "New Hampshire",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Billings",
            "stateName": "Montana",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Bloomfield",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Bloomfield Hills",
            "stateName": "Michigan",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Boynton Beach",
            "stateName": "Florida",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Broadview Heights",
            "stateName": "Ohio",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Burbank",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Carrollton",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Cartersville",
            "stateName": "Georgia",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Castleton-On-Hudson",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Cheektowaga",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Chelmsford",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Chicopee",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Cincinnati",
            "stateName": "Ohio",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Clifton Park",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Columbus",
            "stateName": "Ohio",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Commerce Township",
            "stateName": "Michigan",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Conshohocken",
            "stateName": "Pennsylvania",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Covina",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Culver City",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Destin",
            "stateName": "Florida",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Downers Grove",
            "stateName": "Illinois",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "East Providence",
            "stateName": "Rhode Island",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "El Segundo",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Exeter",
            "stateName": "New Hampshire",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Falls Church",
            "stateName": "Virginia",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Falmouth",
            "stateName": "Maine",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Farmington Hills",
            "stateName": "Michigan",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Forest Hill",
            "stateName": "Maryland",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Fort Worth",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Fresno",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Friendswood",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Frisco",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Glastonbury",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Grapevine",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Greenwich",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Hamden",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Hialeah",
            "stateName": "Florida",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Hoboken",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Iselin",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Jersey City",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "King of Prussia",
            "stateName": "Pennsylvania",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Kirkland",
            "stateName": "Washington",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Latham",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Leominster",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Lincoln",
            "stateName": "RI",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Livingston Manor",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Lynnfield",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Manchester",
            "stateName": "New Hampshire",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Marina Del Rey",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Maynard",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Milford",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Monsey",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Montgomery",
            "stateName": "Alabama",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Naperville",
            "stateName": "Illinois",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Nashua",
            "stateName": "New Hampshire",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Needham",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Needham Heights",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "New Bedford",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Newington",
            "stateName": "New Hampshire",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "North Charleston",
            "stateName": "South Carolina",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Northampton",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Northbrook",
            "stateName": "Illinois",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Norwell",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Norwood",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Orange",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Overland Park",
            "stateName": "Kansas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Parsippany",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Pittsburgh",
            "stateName": "Pennsylvania",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Plainville",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Plantation",
            "stateName": "Florida",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Playa Vista",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Portsmouth",
            "stateName": "New Hampshire",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Poughkeepsie",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Princeton",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Reston",
            "stateName": "Virginia",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Richardson",
            "stateName": "Texas",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "San Rafael",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Santa Fe",
            "stateName": "New Mexico",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Santa Monica",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Saratoga Springs",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Seal Beach",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Shelton",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Sheridan",
            "stateName": "Wyoming",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Smyrna",
            "stateName": "Georgia",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "South Pasadena",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "South Plainfield",
            "stateName": "New Jersey",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Spring Valley",
            "stateName": "New York",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Tigard",
            "stateName": "Oregon",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Trevose",
            "stateName": "Pennsylvania",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Troy",
            "stateName": "Michigan",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Valley Village",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Wakefield",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Wallingford",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "West Hartford",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Whittier",
            "stateName": "California",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Windsor",
            "stateName": "Connecticut",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Worcester",
            "stateName": "Massachusetts",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Yarmouth",
            "stateName": "Maine",
            "hasData": true,
            "totalListings": 1
      }
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

  // APJ REGION
  {
    countryCode: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    region: 'APJ',
    cities: [
      {
            "cityName": "Bhopal",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 20
      },
      {
            "cityName": "Indore",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 20
      },
      {
            "cityName": "Bengaluru",
            "stateName": "Karnataka",
            "hasData": true,
            "totalListings": 12
      },
      {
            "cityName": "Leh",
            "stateName": "India",
            "hasData": true,
            "totalListings": 11
      },
      {
            "cityName": "Jabalpur",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 10
      },
      {
            "cityName": "Mumbai",
            "stateName": "Maharashtra",
            "hasData": true,
            "totalListings": 10
      },
      {
            "cityName": "Hyderabad",
            "stateName": "Telangana",
            "hasData": true,
            "totalListings": 8
      },
      {
            "cityName": "Delhi / NCR",
            "stateName": "Delhi",
            "hasData": true,
            "totalListings": 7
      },
      {
            "cityName": "Noida / Greater Noida",
            "stateName": "Uttar Pradesh",
            "hasData": true,
            "totalListings": 6
      },
      {
            "cityName": "Pune",
            "stateName": "Maharashtra",
            "hasData": true,
            "totalListings": 6
      },
      {
            "cityName": "Ahmedabad",
            "stateName": "Gujarat",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Chandigarh / Mohali",
            "stateName": "Chandigarh",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Gurugram",
            "stateName": "Haryana",
            "hasData": true,
            "totalListings": 4
      },
      {
            "cityName": "Jaipur",
            "stateName": "Rajasthan",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Jhansi",
            "stateName": "Uttar Pradesh",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Kota",
            "stateName": "Rajasthan",
            "hasData": true,
            "totalListings": 3
      },
      {
            "cityName": "Goa",
            "stateName": "Goa",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Parel",
            "stateName": "Himachal Pradesh",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Raipur",
            "stateName": "Chhattisgarh",
            "hasData": true,
            "totalListings": 2
      },
      {
            "cityName": "Ambala Cantt",
            "stateName": "Haryana",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Bhubaneswar",
            "stateName": "Odisha",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Billawar",
            "stateName": "Jammu and Kashmir",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Chamba",
            "stateName": "Himachal Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Chhindwara",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Coimbatore",
            "stateName": "Tamil Nadu",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Dewas",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Doda",
            "stateName": "Jammu and Kashmir",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Garra",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Greater Chennai",
            "stateName": "Tamil Nadu",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Haridwar",
            "stateName": "Uttarakhand",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Kanpur",
            "stateName": "Uttar Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Kozhikode",
            "stateName": "Kerala",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Lucknow",
            "stateName": "Uttar Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Makroniya",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Meerut",
            "stateName": "Uttar Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Nagpur",
            "stateName": "Maharashtra",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Nagve",
            "stateName": "Goa",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Nashik",
            "stateName": "Maharashtra",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Other India Hubs",
            "stateName": "India",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Pahalgam",
            "stateName": "Jammu and Kashmir",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Palika Bazar Magneto mall Road",
            "stateName": "Chhattisgarh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Perinthalmanna",
            "stateName": "Kerala",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Pilern",
            "stateName": "Goa",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Prayagraj",
            "stateName": "Uttar Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Rusalli Khamkheda",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Surat",
            "stateName": "Gujarat",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Tiruchirappalli",
            "stateName": "Tamil Nadu",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Udaipur",
            "stateName": "Rajasthan",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Ujjain",
            "stateName": "Madhya Pradesh",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Vadodara",
            "stateName": "Gujarat",
            "hasData": true,
            "totalListings": 1
      },
      {
            "cityName": "Vijayawada",
            "stateName": "Andhra Pradesh",
            "hasData": true,
            "totalListings": 1
      }
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

// Raw Directory Database merging US + IN + PH
export const RAW_DIRECTORY_DATABASE: Record<string, Record<string, HRContact[]>> = {
  PH: {
    "Cebu City": [
        {
            "rank": 1,
            "companyName": "Logix BPO",
            "rating": 4.9,
            "reviews": 262,
            "phone": "+44 115 654 7288",
            "category": "Recruiter",
            "wheelchairAccessible": false,
            "website": "https://logixbpo.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb_cebu"
        },
        
        
        {
            "rank": 4,
            "companyName": "HireBiz",
            "rating": 4.9,
            "reviews": 34,
            "phone": "+63 906 370 8914",
            "category": "Corporate office",
            "wheelchairAccessible": false,
            "website": "http://www.hirebiz.com/"
        },
        {
            "rank": 5,
            "companyName": "Click It Virtual Services",
            "rating": 4.9,
            "reviews": 16,
            "phone": "+63 929 880 8143",
            "category": "Human resource consulting",
            "wheelchairAccessible": false,
            "website": "https://clickitvirtual.com/"
        },
        {
            "rank": 6,
            "companyName": "Global Staff Connections",
            "rating": 4.6,
            "reviews": 15,
            "category": "Employment agency",
            "wheelchairAccessible": false,
            "website": "http://globalstaffconnections.com/"
        }
    ],
    "Makati City": [
        {
            "rank": 1,
            "companyName": "Stark Asia Solutions",
            "rating": 5.0,
            "reviews": 766,
            "phone": "+63 917 180 8612",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.stark.com.ph/"
        },
        {
            "rank": 2,
            "companyName": "Curran Daly + Associates",
            "rating": 5.0,
            "reviews": 326,
            "phone": "+63 2 8863 6835",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.currandaly.com/"
        },
        {
            "rank": 3,
            "companyName": "Manila Recruitment - Executive Search",
            "rating": 4.8,
            "reviews": 616,
            "phone": "+63 917 166 2768",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://www.manilarecruitment.com/"
        },
        {
            "rank": 4,
            "companyName": "Robert Walters Recruitment Philippines",
            "rating": 4.8,
            "reviews": 205,
            "phone": "+63 2 8816 4972",
            "category": "Employment center",
            "wheelchairAccessible": false,
            "website": "https://www.robertwalters.com.ph/"
        },
        {
            "rank": 5,
            "companyName": "Remote Staff",
            "rating": 4.9,
            "reviews": 114,
            "phone": "+63 2 8846 4249",
            "category": "Corporate office",
            "wheelchairAccessible": true,
            "website": "https://www.remotestaff.ph/"
        },
        {
            "rank": 6,
            "companyName": "Bossjob Philippines",
            "rating": 4.8,
            "reviews": 160,
            "phone": "+63 2 8511 5709",
            "category": "Recruiter",
            "wheelchairAccessible": false,
            "website": "https://bossjob.ph/"
        },
        {
            "rank": 7,
            "companyName": "Permhunt",
            "rating": 5.0,
            "reviews": 50,
            "phone": "+63 961 759 4405",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://permhunt.com/"
        },
        {
            "rank": 8,
            "companyName": "MCVO Talent Outsourcing Services",
            "rating": 4.9,
            "reviews": 44,
            "phone": "(312) 460-2470",
            "category": "Executive search firm",
            "wheelchairAccessible": true,
            "website": "https://www.mcvotalent.com/"
        },
        {
            "rank": 9,
            "companyName": "Transitions Executive Search",
            "rating": 5.0,
            "reviews": 27,
            "phone": "+63 2 8887 5720",
            "category": "Executive search firm",
            "wheelchairAccessible": true,
            "website": "https://www.transitionsinc.net/"
        },
        {
            "rank": 10,
            "companyName": "Latte Search",
            "rating": 4.9,
            "reviews": 15,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.latte.ph/"
        },
        {
            "rank": 11,
            "companyName": "Elite HeadHunting Incorporated",
            "rating": 4.7,
            "reviews": 12,
            "phone": "+63 2 8845 1234",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://eliteheadhunting.net/"
        },
        {
            "rank": 12,
            "companyName": "Techsearch International Corp",
            "rating": 4.6,
            "reviews": 8,
            "phone": "+63 2 8893 2345",
            "category": "Executive search firm",
            "wheelchairAccessible": false,
            "website": "https://www.techsearchinternational.com/"
        }
    ],
    "Quezon City": [
        {
            "rank": 1,
            "companyName": "Ignite Careers",
            "rating": 4.9,
            "reviews": 2977,
            "phone": "+63 2 8234 5712",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://ignitecareers.ph/"
        },
        {
            "rank": 2,
            "companyName": "Global Headstart Specialist",
            "rating": 4.9,
            "reviews": 1353,
            "phone": "+63 2 8298 4313",
            "category": "Business to business service",
            "wheelchairAccessible": true,
            "website": "http://www.globalheadstart.com/"
        },
        {
            "rank": 3,
            "companyName": "J-K Network Services",
            "rating": 4.9,
            "reviews": 1003,
            "phone": "+63 2 8245 2829",
            "category": "Human resource consulting",
            "wheelchairAccessible": false,
            "website": "http://www.jkmanpower.jp-network-e.com/"
        },
        {
            "rank": 4,
            "companyName": "RecruitGo Philippines",
            "rating": 5.0,
            "reviews": 97,
            "phone": "+63 921 976 2870",
            "category": "Software company",
            "wheelchairAccessible": true,
            "website": "https://recruitgo.com/"
        },
        
        {
            "rank": 6,
            "companyName": "Rensol Recruitment and Consulting",
            "rating": 4.5,
            "reviews": 216,
            "phone": "+63 2 8931 0968",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.rensol.com/"
        },
        {
            "rank": 7,
            "companyName": "1st Dynamic Personnel Resources",
            "rating": 4.5,
            "reviews": 187,
            "phone": "+63 2 7798 4048",
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "website": "http://1stdynamicpersonnel.com/"
        },
        {
            "rank": 8,
            "companyName": "Armasourcing",
            "rating": 5.0,
            "reviews": 16,
            "phone": "+63 995 436 8153",
            "category": "Talent agency",
            "wheelchairAccessible": true,
            "website": "https://armasourcing.com/"
        },
        {
            "rank": 9,
            "companyName": "N&M Staffing Services",
            "rating": 5.0,
            "reviews": 14,
            "phone": "+63 976 503 0714",
            "category": "Consultant",
            "wheelchairAccessible": false,
            "website": "http://nmstaffing.com.ph/"
        },
        {
            "rank": 10,
            "companyName": "Wealthlink Incorporated Agency",
            "rating": 4.5,
            "reviews": 12,
            "phone": "+63 2 8922 4321",
            "category": "Employment agency",
            "wheelchairAccessible": false,
            "website": "https://wealthlink.com.ph/"
        },
        {
            "rank": 11,
            "companyName": "Workscale Resources Inc",
            "rating": 4.8,
            "reviews": 8,
            "category": "Corporate office",
            "wheelchairAccessible": true,
            "website": "http://www.workscale.ph/"
        },
        {
            "rank": 12,
            "companyName": "Clear Leadership Consulting",
            "rating": 4.7,
            "reviews": 6,
            "category": "Consultant",
            "wheelchairAccessible": false,
            "website": "https://clearleadershipcoach.com/"
        }
    ],
    "Davao City": [
        
        {
            "rank": 2,
            "companyName": "Global Staff Network",
            "rating": 5.0,
            "reviews": 2,
            "phone": "+61 7 3177 7774",
            "category": "Employment agency",
            "wheelchairAccessible": false,
            "website": "https://globalstaffnetwork.com/"
        },
        {
            "rank": 3,
            "companyName": "FJ80 HR Consultancy Co.",
            "rating": 5.0,
            "reviews": 1,
            "phone": "+63 995 480 8062",
            "category": "Human resource consulting",
            "wheelchairAccessible": false,
            "website": "https://fj80hrconsultancy.com/"
        },
        {
            "rank": 4,
            "companyName": "Human Resource Management Office",
            "rating": 5.0,
            "reviews": 1,
            "phone": "+63 82 227 7772",
            "category": "Government office",
            "wheelchairAccessible": true,
            "website": "https://www.davaocity.gov.ph/"
        },
        {
            "rank": 5,
            "companyName": "Online Hiring Corp.",
            "rating": 4.8,
            "reviews": 4,
            "phone": "+63 82 295 1770",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.onlinehiringcorporation.com/"
        },
        {
            "rank": 6,
            "companyName": "HMO International Recruitment",
            "rating": 4.6,
            "reviews": 22,
            "phone": "+63 82 221 4321",
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "website": "https://hmoihr.com/"
        }
    ],
    "Manila": [
        {
            "rank": 1,
            "companyName": "Monroe Consulting Group Philippines",
            "rating": 4.9,
            "reviews": 2258,
            "phone": "+63 2 7002 1292",
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://www.monroeconsulting.com/philippines"
        },
        {
            "rank": 2,
            "companyName": "FMW Human Resources International",
            "rating": 4.6,
            "reviews": 162,
            "phone": "+63 2 8280 9471",
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "website": "https://fmwhumanresources.com/"
        },
        {
            "rank": 3,
            "companyName": "YWA Human Resource Corporation",
            "rating": 4.4,
            "reviews": 259,
            "phone": "+63 2 8524 7777",
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "website": "http://www.ywacorp.com/"
        },
        {
            "rank": 4,
            "companyName": "2018 Crowne Human Resources Inc",
            "rating": 4.9,
            "reviews": 19,
            "phone": "+63 939 515 1646",
            "category": "Human resource consulting",
            "wheelchairAccessible": false,
            "website": "https://www.2018crownehumanresourcesinc.com/"
        },
        {
            "rank": 5,
            "companyName": "Lead Resources Management Corp.",
            "rating": 4.6,
            "reviews": 42,
            "category": "Employment agency",
            "wheelchairAccessible": false,
            "website": "http://lead.com.ph/"
        },
        
        {
            "rank": 7,
            "companyName": "Century High HR Incorporated",
            "rating": 4.6,
            "reviews": 8,
            "phone": "+63 992 398 7952",
            "category": "Recruiter",
            "wheelchairAccessible": false,
            "website": "http://www.facebook.com/HRCenturyHigh"
        },
        {
            "rank": 8,
            "companyName": "PHR-Philippine Human Resource Worldwide",
            "rating": 4.1,
            "reviews": 51,
            "phone": "+63 2 8518 8448",
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "website": "http://www.phrwe.com/"
        },
        {
            "rank": 9,
            "companyName": "Happy World HR and Recruitment",
            "rating": 4.3,
            "reviews": 15,
            "category": "Recruiter",
            "wheelchairAccessible": false,
            "website": ""
        },
        
        {
            "rank": 11,
            "companyName": "KFL Manpower Agency",
            "rating": 4.5,
            "reviews": 14,
            "category": "Employment agency",
            "wheelchairAccessible": false,
            "website": "http://www.kflmanpoweragency.com/"
        },
        {
            "rank": 12,
            "companyName": "Skills Innovative People Services",
            "rating": 4.6,
            "reviews": 9,
            "category": "Human resource consulting",
            "wheelchairAccessible": false,
            "website": ""
        },
        {
            "rank": 13,
            "companyName": "HURIS Inc. (HR Innovations)",
            "rating": 4.7,
            "reviews": 20,
            "phone": "+63 2 8871 1234",
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "website": "http://www.huris.com.ph/"
        },
        {
            "rank": 14,
            "companyName": "Newfold Digital Philippines",
            "rating": 4.4,
            "reviews": 30,
            "category": "Corporate office",
            "wheelchairAccessible": true,
            "website": "http://newfold.com/"
        }
    ]
},
  US: {
    "New York": [
        {
            "rank": 1,
            "companyName": "Hale International Recruitment",
            "rating": 5.0,
            "reviews": 218,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(917) 810-4957",
            "website": "http://www.haleinternational.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hale%20International%20Recruitment&query_place_id=ChIJl4GDZhVZwokRsjdjQieAAuU"
        },
        {
            "rank": 2,
            "companyName": "Averity",
            "rating": 5.0,
            "reviews": 111,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(646) 828-6028",
            "website": "http://www.averityteam.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Averity&query_place_id=ChIJjxZ92gBZwokRkth99jtm3ts"
        },
        {
            "rank": 3,
            "companyName": "80Twenty",
            "rating": 5.0,
            "reviews": 74,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(212) 575-0007",
            "website": "http://www.80twenty.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=80Twenty&query_place_id=ChIJLUnqBbBYwokRsU9pAd6FeTE"
        },
        {
            "rank": 4,
            "companyName": "RedStream Technology",
            "rating": 5.0,
            "reviews": 74,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(646) 688-5640",
            "website": "http://redstreamtechnology.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=RedStream%20Technology&query_place_id=ChIJ7Zy72R30wokRBFr4dgsltV0"
        },
        {
            "rank": 5,
            "companyName": "The Quest Organization",
            "rating": 5.0,
            "reviews": 66,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(212) 971-0033",
            "website": "http://www.questorg.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Quest%20Organization&query_place_id=ChIJhZJ3Yq5ZwokRZikL_qgp2uQ"
        },
        {
            "rank": 6,
            "companyName": "Delrecruiters",
            "rating": 5.0,
            "reviews": 53,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(201) 503-1060",
            "website": "http://delrecruiters.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Delrecruiters&query_place_id=ChIJoxV2461ZwokRe1GDFBwZBC8"
        },
        {
            "rank": 7,
            "companyName": "ACCUR Recruiting Services & Executive Search",
            "rating": 5.0,
            "reviews": 50,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(646) 979-1179",
            "website": "https://accurservices.com/offices/new-york-city-executive-recruiters/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ACCUR%20Recruiting%20Services%20%26%20Executive%20Search&query_place_id=ChIJpzIwwPpYwokRnLRxXYwLxzA"
        },
        {
            "rank": 8,
            "companyName": "AC Lion International",
            "rating": 5.0,
            "reviews": 34,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(212) 268-7300",
            "website": "https://www.aclion.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AC%20Lion%20International&query_place_id=ChIJtVWJyq1ZwokRQWOHion5p7s"
        },
        {
            "rank": 9,
            "companyName": "Bernard Nickels & Associates",
            "rating": 4.9,
            "reviews": 304,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(212) 477-8306",
            "website": "http://www.bnastaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Bernard%20Nickels%20%26%20Associates&query_place_id=ChIJpUJWZqhZwokRlLMRSiLYbak"
        },
        {
            "rank": 10,
            "companyName": "Julia Valler Event Staffing",
            "rating": 4.9,
            "reviews": 229,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(212) 845-9908",
            "website": "https://juliavaller.com/event-staffing-agency?utm_source=gbp",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Julia%20Valler%20Event%20Staffing&query_place_id=ChIJzQRpJf5YwokRcox6r3RPVXQ"
        },
        {
            "rank": 11,
            "companyName": "Alldus International",
            "rating": 4.9,
            "reviews": 190,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://alldus.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Alldus%20International&query_place_id=ChIJ8193nQhbwokRE-3CS4I28B4"
        },
        {
            "rank": 12,
            "companyName": "ingenium",
            "rating": 4.9,
            "reviews": 159,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(917) 370-7969",
            "website": "http://www.ingenium.agency/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ingenium&query_place_id=ChIJeTYtmQFZwokRYUPFzNgWWfo"
        },
        {
            "rank": 13,
            "companyName": "Harnham Inc. - New York",
            "rating": 4.9,
            "reviews": 97,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(212) 796-6070",
            "website": "http://www.harnham.com/us/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Harnham%20Inc.%20-%20New%20York&query_place_id=ChIJX73o9P9YwokRPa9Sy5ny2Jw"
        },
        {
            "rank": 14,
            "companyName": "Motion Recruitment",
            "rating": 4.9,
            "reviews": 84,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(212) 697-5800",
            "website": "https://motionrecruitment.com/about/locations/new-york-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=new-york",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJO4kMMP5YwokRi-vBHWXtE3M"
        },
        {
            "rank": 15,
            "companyName": "KAS Placement Sales and Marketing Recruiters",
            "rating": 4.9,
            "reviews": 78,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(212) 348-7670",
            "website": "http://www.kasplacement.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=KAS%20Placement%20Sales%20and%20Marketing%20Recruiters&query_place_id=ChIJJ639qbtYwokRbmeKbkcQC3w"
        },
        {
            "rank": 16,
            "companyName": "Rad Hires",
            "rating": 4.9,
            "reviews": 68,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(347) 474-9826",
            "website": "https://radhires.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Rad%20Hires&query_place_id=ChIJ2dtI5ItZwokR3_tQuNEJiTU"
        },
        {
            "rank": 17,
            "companyName": "STAFFED INC.",
            "rating": 4.9,
            "reviews": 55,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(917) 678-8994",
            "website": "http://www.staffedinc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=STAFFED%20INC.&query_place_id=ChIJ0WgiiXFZwokRrtkYDE9-Ls4"
        },
        {
            "rank": 18,
            "companyName": "Syndicatebleu",
            "rating": 4.9,
            "reviews": 48,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(212) 471-9177",
            "website": "https://careergroupcompanies.com/syndicatebleu/?utm_source=google&utm_medium=organic&utm_campaign=gmb_website",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Syndicatebleu&query_place_id=ChIJx9QMFP9YwokRXb0zR1BHe48"
        },
        {
            "rank": 19,
            "companyName": "ResultsResourcing",
            "rating": 4.9,
            "reviews": 34,
            "category": "Business to business service",
            "wheelchairAccessible": true,
            "phone": "(212) 709-8063",
            "website": "https://www.resultsresourcing.net/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ResultsResourcing&query_place_id=ChIJ87-XAhdawokR3kAy3QRJh50"
        },
        {
            "rank": 20,
            "companyName": "The Chef Agency",
            "rating": 4.8,
            "reviews": 383,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(646) 632-4688",
            "website": "https://thechefagency.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Chef%20Agency&query_place_id=ChIJx00SHgFZwokRwYRA_tycBLI"
        }
    ],
    "Dallas": [
        {
            "rank": 1,
            "companyName": "Proven Recruiting",
            "rating": 5.0,
            "reviews": 126,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "website": "http://www.provenrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Proven%20Recruiting&query_place_id=ChIJ2-Vvd8uZToYRKqCuWn2qQA0"
        },
        {
            "rank": 2,
            "companyName": "Paradigm Search Group",
            "rating": 5.0,
            "reviews": 27,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(972) 696-9051",
            "website": "https://www.paradigmsearchgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Paradigm%20Search%20Group&query_place_id=ChIJw3H5Y1pFUmUR9gOgF7He-jg"
        },
        {
            "rank": 3,
            "companyName": "Sphere Rocket Virtual Assistants",
            "rating": 4.8,
            "reviews": 994,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(615) 823-4103",
            "website": "https://www.sphererocketva.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sphere%20Rocket%20Virtual%20Assistants&query_place_id=ChIJ02lzeehnZIgRPQtQdtYYMNs"
        },
        {
            "rank": 4,
            "companyName": "Pursuit Sales",
            "rating": 4.8,
            "reviews": 140,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://pursuitsalessolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Pursuit%20Sales&query_place_id=ChIJk8Has8KYToYRCtxgxGXKwd0"
        },
        {
            "rank": 5,
            "companyName": "Building Team Solutions of Dallas, Inc",
            "rating": 4.8,
            "reviews": 75,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(877) 830-7313",
            "website": "https://btsjobs.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Building%20Team%20Solutions%20of%20Dallas%2C%20Inc&query_place_id=ChIJx_zymrEjTIYRpvGLTFH94PQ"
        },
        {
            "rank": 6,
            "companyName": "Reliable Staffing",
            "rating": 4.8,
            "reviews": 33,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(214) 741-9675",
            "website": "https://reliablestaffing.com/dallas/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Reliable%20Staffing&query_place_id=ChIJ38bLnPejToYRnHWfqeNyrkg"
        },
        {
            "rank": 7,
            "companyName": "PMG Executive Search & Recruiting",
            "rating": 4.8,
            "reviews": 21,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(602) 726-4189",
            "website": "https://www.pmgsearch.com/dallas",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=PMG%20Executive%20Search%20%26%20Recruiting&query_place_id=ChIJR0FwrNwgTIYR7q_sFFVecmw"
        },
        {
            "rank": 8,
            "companyName": "PrideStaff",
            "rating": 4.7,
            "reviews": 405,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 661-1616",
            "website": "https://www.staffingindallas.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=PrideStaff&query_place_id=ChIJT-z5rzEhTIYRRhjO2o_U-_s"
        },
        {
            "rank": 9,
            "companyName": "Motion Recruitment",
            "rating": 4.7,
            "reviews": 66,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(469) 458-9486",
            "website": "https://motionrecruitment.com/about/locations/dallas-fort-worth-it-staffing-recruiting?utm_source?utm_source=google-business&utm_medium=organic&utm_campaign=dallas",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJ8Xnt3D6ZToYRD3v_xYAOoiE"
        },
        {
            "rank": 10,
            "companyName": "Aston Carter",
            "rating": 4.5,
            "reviews": 97,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 414-2510",
            "website": "https://www.astoncarter.com/en/locations/north-america/united-states/texas/addison?ecid=ls_ac_bizlist_091222_seo7123513",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aston%20Carter&query_place_id=ChIJRdsIv9UYTIYRqtfYWy6n5Vc"
        },
        {
            "rank": 11,
            "companyName": "Choice Specialists",
            "rating": 4.5,
            "reviews": 45,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(214) 823-5057",
            "website": "https://choicespecialists.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Choice%20Specialists&query_place_id=ChIJZxDQ4eefToYRQDTNrBePqTg"
        },
        {
            "rank": 12,
            "companyName": "Frontline Source Group",
            "rating": 4.5,
            "reviews": 36,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 744-5627",
            "website": "https://www.frontlinesourcegroup.com/dallas.html",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Frontline%20Source%20Group&query_place_id=ChIJ-_vhLSafToYRcXJimK45eI0"
        },
        {
            "rank": 13,
            "companyName": "Baxter Clewis Cybersecurity",
            "rating": 4.3,
            "reviews": 238,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(469) 547-5652",
            "website": "http://www.baxterclewis.com/training",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Baxter%20Clewis%20Cybersecurity&query_place_id=ChIJIxvUz7iZToYR4Koa_-8ty8c"
        },
        {
            "rank": 14,
            "companyName": "Beacon Hill - BHSG",
            "rating": 4.1,
            "reviews": 80,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 452-0050",
            "website": "https://bhsg.com/locations/dallas",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Beacon%20Hill%20-%20BHSG&query_place_id=ChIJzW9fLS4hTIYRyVJomQtc-Bg"
        },
        {
            "rank": 15,
            "companyName": "Questpro Consultants",
            "rating": 4.1,
            "reviews": 36,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(972) 960-1305",
            "website": "https://www.questpro.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Questpro%20Consultants&query_place_id=ChIJz-9GC9cjTIYRrNx-2xkZnk4"
        }
    ],
    "Boston": [
        {
            "rank": 1,
            "companyName": "Origin Staffing",
            "rating": 5.0,
            "reviews": 87,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 812-8077",
            "website": "https://originstaff.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Origin%20Staffing&query_place_id=ChIJgVonbiVx44kRuFuuTeUU_IY"
        },
        {
            "rank": 2,
            "companyName": "Michael Page",
            "rating": 4.9,
            "reviews": 563,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 428-3680",
            "website": "https://www.michaelpage.com/?utm_source=GMB&utm_medium=organic",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Michael%20Page&query_place_id=ChIJgw7qeIFw44kRHxCjD3DGuKE"
        },
        {
            "rank": 3,
            "companyName": "Percy",
            "rating": 4.9,
            "reviews": 166,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(339) 970-8172",
            "website": "http://callpercy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Percy&query_place_id=ChIJq6paJYJw44kR7-U1Vtz8_Qc"
        },
        {
            "rank": 4,
            "companyName": "JOHNLEONARD",
            "rating": 4.9,
            "reviews": 137,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 423-6800",
            "website": "http://www.johnleonard.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=JOHNLEONARD&query_place_id=ChIJXcQ5xYNw44kRxXa6LltusRM"
        },
        {
            "rank": 5,
            "companyName": "AVID Technical Resources",
            "rating": 4.9,
            "reviews": 66,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 951-1880",
            "website": "http://www.avidtr.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AVID%20Technical%20Resources&query_place_id=ChIJTYeHlINw44kRU20fEjB0ImA"
        },
        {
            "rank": 6,
            "companyName": "Ultimate Staffing Services",
            "rating": 4.8,
            "reviews": 52,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 330-1210",
            "website": "https://www.ultimatestaffing.com/locations/view/boston/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ultimate%20Staffing%20Services&query_place_id=ChIJ5T5qT4Rw44kRNcjEYVKz_LA"
        },
        {
            "rank": 7,
            "companyName": "HireMinds",
            "rating": 4.8,
            "reviews": 43,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 252-0606",
            "website": "https://www.hireminds.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HireMinds&query_place_id=ChIJfWIqCKVw44kRyQuFecS5czo"
        },
        {
            "rank": 8,
            "companyName": "Motion Recruitment",
            "rating": 4.7,
            "reviews": 274,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 266-6200",
            "website": "https://motionrecruitment.com/about/locations/boston-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=boston",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJkySvggx644kRN168o65U-YU"
        },
        {
            "rank": 9,
            "companyName": "Mondo",
            "rating": 4.6,
            "reviews": 74,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 380-7936",
            "website": "https://www.mondo.com/hire-tech-consultants-marketing-talent/?utm_campaign=%5BMONDO%5D%20Google%20Maps&utm_source=Organic%20G%20Maps&utm_medium=Boston",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mondo&query_place_id=ChIJN9ZPZY5w44kRy2FXq-V4WJo"
        },
        {
            "rank": 10,
            "companyName": "Insight Global",
            "rating": 4.5,
            "reviews": 95,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/massachusetts/staffing-agency-boston-ma/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJjdbpmiye44kRWVoL-yQqQgI"
        },
        {
            "rank": 11,
            "companyName": "Atrium Staffing",
            "rating": 4.4,
            "reviews": 52,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 447-2000",
            "website": "https://www.atriumstaff.com/location-boston-ma/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Atrium%20Staffing&query_place_id=ChIJq0sXjwt644kRlh_IP9Hdw9w"
        },
        {
            "rank": 12,
            "companyName": "LVI Associates",
            "rating": 4.4,
            "reviews": 34,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 322-0144",
            "website": "https://www.lviassociates.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=LVI%20Associates&query_place_id=ChIJMYXreGVx44kRwKk35a1cs_s"
        },
        {
            "rank": 13,
            "companyName": "Daley And Associates, LLC",
            "rating": 4.2,
            "reviews": 40,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 832-2040",
            "website": "http://www.daleyaa.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Daley%20And%20Associates%2C%20LLC&query_place_id=ChIJZ84yBIJw44kRiOqB_oTTWYs"
        },
        {
            "rank": 14,
            "companyName": "Atlantic Group - Recruiting Agency",
            "rating": 4.2,
            "reviews": 39,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 544-9940",
            "website": "http://atlanticrecruiters.com/job-location/boston-ma/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Atlantic%20Group%20-%20Recruiting%20Agency&query_place_id=ChIJb2h9NoFw44kR1DG3refw804"
        }
    ],
    "Los Angeles": [
        {
            "rank": 1,
            "companyName": "80Twenty",
            "rating": 5.0,
            "reviews": 48,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(213) 246-2011",
            "website": "http://www.80twenty.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=80Twenty&query_place_id=ChIJOfpYXiC_woARQnqxJ4dFpCw"
        },
        {
            "rank": 2,
            "companyName": "Motion Recruitment",
            "rating": 4.9,
            "reviews": 450,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(310) 996-0200",
            "website": "https://motionrecruitment.com/about/locations/los-angeles-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=los-angeles",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJmRkOF2O7woAR5L9w1yxmJeg"
        },
        {
            "rank": 3,
            "companyName": "Michael Page",
            "rating": 4.9,
            "reviews": 356,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(323) 404-9500",
            "website": "https://www.michaelpage.com/?utm_source=GMB&utm_medium=organic",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Michael%20Page&query_place_id=ChIJ-UnO9GG2w4kRM5cXw4CNg9M"
        },
        {
            "rank": 4,
            "companyName": "Ultimate Staffing Services",
            "rating": 4.8,
            "reviews": 88,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(310) 201-0062",
            "website": "https://www.ultimatestaffing.com/locations/view/century-city/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ultimate%20Staffing%20Services&query_place_id=ChIJz1wiSou7woARMOli_vIDJus"
        },
        {
            "rank": 5,
            "companyName": "Julia Valler Event Staffing",
            "rating": 4.8,
            "reviews": 49,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(213) 306-4608",
            "website": "https://juliavaller.com/la/event-staffing-los-angeles?utm_source=gbp",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Julia%20Valler%20Event%20Staffing&query_place_id=ChIJIfiYTzbHwoARnOfTnVxT7Nc"
        },
        {
            "rank": 6,
            "companyName": "Vaco",
            "rating": 4.7,
            "reviews": 102,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(310) 693-0490",
            "website": "https://www.vaco.com/about/locations/los-angeles/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Vaco&query_place_id=ChIJcYnvpbKwwoARFFs07CO4obo"
        },
        
        {
            "rank": 8,
            "companyName": "Career Group",
            "rating": 4.6,
            "reviews": 186,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(310) 277-8188",
            "website": "https://careergroupcompanies.com/career-group/?utm_source=google&utm_medium=organic&utm_campaign=gmb_website",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Career%20Group&query_place_id=ChIJz1wiSou7woARAHElUeJZaIk"
        },
        {
            "rank": 9,
            "companyName": "Selby Jennings - Financial Services Recruiters & Headhunters",
            "rating": 4.6,
            "reviews": 51,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(310) 773-0242",
            "website": "https://www.selbyjennings.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Selby%20Jennings%20-%20Financial%20Services%20Recruiters%20%26%20Headhunters&query_place_id=ChIJWxrB7pexwoARubxZCUxP6LY"
        },
        {
            "rank": 10,
            "companyName": "GoLive! Staffing",
            "rating": 4.3,
            "reviews": 132,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(323) 965-7582",
            "website": "http://culinarystaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=GoLive!%20Staffing&query_place_id=ChIJy9NcJdW-woAR2Q8QKEbUqOU"
        },
        {
            "rank": 11,
            "companyName": "Mondo",
            "rating": 4.3,
            "reviews": 30,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(310) 526-2410",
            "website": "https://www.mondo.com/hire-tech-consultants-marketing-talent/?utm_campaign=%5BMONDO%5D%20Google%20Maps&utm_source=Organic%20G%20Maps&utm_medium=LA",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mondo&query_place_id=ChIJBwfBnL62woAR_Iwkp-EZjwo"
        }
    ],
    "Portland": [
        {
            "rank": 1,
            "companyName": "IGNW",
            "rating": 5.0,
            "reviews": 134,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(503) 598-3928",
            "website": "http://www.ignw.io/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=IGNW&query_place_id=ChIJA9N6gjJzlVQRlqeApNpcngs"
        },
        {
            "rank": 2,
            "companyName": "Talent Groups",
            "rating": 5.0,
            "reviews": 128,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(866) 856-8477",
            "website": "http://www.talentgroups.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Talent%20Groups&query_place_id=ChIJSfBYBQcKlVQRruw1dVOcsyY"
        },
        {
            "rank": 3,
            "companyName": "Specialized Recruiting Group",
            "rating": 5.0,
            "reviews": 65,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(971) 399-7767",
            "website": "https://www.srgpros.com/us-oregon-portland-downtown",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Specialized%20Recruiting%20Group&query_place_id=ChIJJUzWRZYLlVQRSkWmfIv8f6U"
        },
        {
            "rank": 4,
            "companyName": "Mulberry Talent Partners Recruiting & Staffing",
            "rating": 5.0,
            "reviews": 49,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(503) 208-2749",
            "website": "https://mulberrytalent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mulberry%20Talent%20Partners%20Recruiting%20%26%20Staffing&query_place_id=ChIJaS-A1UoJlVQRgeRlcATflJ4"
        },
        {
            "rank": 5,
            "companyName": "Ledgent Technology",
            "rating": 5.0,
            "reviews": 45,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(503) 444-3194",
            "website": "https://www.ledgenttech.com/locations/view/portland/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ledgent%20Technology&query_place_id=ChIJe5iazwILlVQRgBer48E6pn8"
        },
        {
            "rank": 6,
            "companyName": "ProFocus Technology",
            "rating": 4.9,
            "reviews": 267,
            "category": "Business management consultant",
            "wheelchairAccessible": true,
            "phone": "(503) 236-2000",
            "website": "http://profocustechnology.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ProFocus%20Technology&query_place_id=ChIJIRmwak4JlVQR-pmFBZ-WWzY"
        },
        {
            "rank": 7,
            "companyName": "NauWork",
            "rating": 4.9,
            "reviews": 67,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(503) 388-9585",
            "website": "https://nauwork.com/contact/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=NauWork&query_place_id=ChIJhf51nfgJlVQRqkiGaGQhvps"
        },
        {
            "rank": 8,
            "companyName": "Scion Staffing",
            "rating": 4.8,
            "reviews": 51,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(503) 345-0103",
            "website": "https://www.scionstaffingportland.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Scion%20Staffing&query_place_id=ChIJ7wDoKgQKlVQRPBD0-wyVaE4"
        },
        {
            "rank": 9,
            "companyName": "Express Employment Professionals",
            "rating": 4.7,
            "reviews": 914,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(503) 254-1200",
            "website": "https://www.expresspros.com/us-oregon-portland-east",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJMXPwAbehlVQRr9xgRPwdGHk"
        },
        {
            "rank": 10,
            "companyName": "VanderHouwen",
            "rating": 4.3,
            "reviews": 82,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(503) 299-6811",
            "website": "http://www.vanderhouwen.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=VanderHouwen&query_place_id=ChIJ0WaHGPsKlVQRp2Q0P95_9Ps"
        },
        {
            "rank": 11,
            "companyName": "Insight Global",
            "rating": 4.1,
            "reviews": 91,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/oregon/staffing-agency-portland-or/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJywi7tQYKlVQR8Orjsc8GVqQ"
        }
    ],
    "San Francisco": [
        {
            "rank": 1,
            "companyName": "80Twenty",
            "rating": 5.0,
            "reviews": 293,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 870-1614",
            "website": "http://www.80twenty.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=80Twenty&query_place_id=ChIJF9_nVn2AhYARydbmaW5wiVs"
        },
        {
            "rank": 2,
            "companyName": "The Search Experience",
            "rating": 5.0,
            "reviews": 47,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 570-1390",
            "website": "http://www.tsetalent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Search%20Experience&query_place_id=ChIJAVmoYbqBhYAR1qIpPhVMphA"
        },
        {
            "rank": 3,
            "companyName": "Harnham Inc. - San Francisco",
            "rating": 4.9,
            "reviews": 97,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 614-4999",
            "website": "https://www.harnham.com/contact-us-san-francisco/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Harnham%20Inc.%20-%20San%20Francisco&query_place_id=ChIJWXgpr4uAhYARBNw2KYcZnUw"
        },
        {
            "rank": 4,
            "companyName": "INSPYR Solutions",
            "rating": 4.9,
            "reviews": 60,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(415) 593-8800",
            "website": "https://www.inspyrsolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=INSPYR%20Solutions&query_place_id=ChIJA3rbyWSAhYARy3s4pJVKRDc"
        },
        {
            "rank": 5,
            "companyName": "Method Recruiting",
            "rating": 4.9,
            "reviews": 39,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 510-2645",
            "website": "http://www.methodrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Method%20Recruiting&query_place_id=ChIJVxFIVoiAhYARXop_mqn0VbE"
        },
        {
            "rank": 6,
            "companyName": "Motion Recruitment",
            "rating": 4.6,
            "reviews": 104,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 904-8000",
            "website": "https://motionrecruitment.com/about/locations/san-francisco-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=san-francisco",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJ0zD-nWKAhYARN59b-xIZgSE"
        },
        {
            "rank": 7,
            "companyName": "Maven Recruiting Group",
            "rating": 4.6,
            "reviews": 83,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 375-9953",
            "website": "http://www.mavenrec.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Maven%20Recruiting%20Group&query_place_id=ChIJFyPNFWKAhYARxkGpT9x9LPs"
        },
        {
            "rank": 8,
            "companyName": "Mondo",
            "rating": 4.5,
            "reviews": 22,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(415) 800-1352",
            "website": "https://www.mondo.com/hire-tech-consultants-marketing-talent/?utm_campaign=%5BMONDO%5D%20Google%20Maps&utm_source=Organic%20G%20Maps&utm_medium=San%20Francisco",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mondo&query_place_id=ChIJ_xPlMWWAhYAReNap5V8R25M"
        },
        {
            "rank": 9,
            "companyName": "Scion Staffing",
            "rating": 4.4,
            "reviews": 34,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(415) 392-7500",
            "website": "https://www.scionstaffingsanfrancisco.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Scion%20Staffing&query_place_id=ChIJN0hm3oiAhYARDza8__3JhsM"
        },
        {
            "rank": 10,
            "companyName": "Insight Global",
            "rating": 4.3,
            "reviews": 35,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/california/staffing-agency-san-francisco-ca/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJeVXDo0H3MhUR3_X-jhB_VvQ"
        },
        {
            "rank": 11,
            "companyName": "Rocket Recruiting",
            "rating": 4.2,
            "reviews": 23,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(415) 895-2862",
            "website": "http://www.getrocket.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Rocket%20Recruiting&query_place_id=ChIJdVFMcYaBhYARArQEiLj1m3U"
        }
    ],
    "Irving": [
        {
            "rank": 1,
            "companyName": "Stride Staffing",
            "rating": 4.9,
            "reviews": 1216,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 377-9505",
            "website": "http://www.stridestaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Stride%20Staffing&query_place_id=ChIJ7zwJ2KKgToYR-mIUDs_UZME"
        },
        {
            "rank": 2,
            "companyName": "CareerStaff Unlimited",
            "rating": 4.9,
            "reviews": 227,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 812-3200",
            "website": "https://www.careerstaff.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CareerStaff%20Unlimited&query_place_id=ChIJLWY5eS695BQRmztACYRtvWo"
        },
        {
            "rank": 3,
            "companyName": "LINK Staffing",
            "rating": 4.8,
            "reviews": 248,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 256-4104",
            "website": "https://linkstaffing.com/locations/irving-dallas/?utm_source=gbp&utm_medium=organic&utm_campaign=irving-dfw",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=LINK%20Staffing&query_place_id=ChIJM24nBzOCToYRG9eEap-VsrM"
        },
        {
            "rank": 4,
            "companyName": "Integrity Staffing Solutions",
            "rating": 4.7,
            "reviews": 714,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(469) 947-7700",
            "website": "http://integritystaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Integrity%20Staffing%20Solutions&query_place_id=ChIJIZwZ66kpTIYRNwEvFdmcgB0"
        },
        {
            "rank": 5,
            "companyName": "Apple Staffing Inc",
            "rating": 4.7,
            "reviews": 377,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 259-5566",
            "website": "http://www.applestaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Apple%20Staffing%20Inc&query_place_id=ChIJW18AcqCDToYRMsEPvGqZdBY"
        },
        {
            "rank": 6,
            "companyName": "ConsultADD Inc.",
            "rating": 4.7,
            "reviews": 73,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(888) 958-5233",
            "website": "http://www.consultadd.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ConsultADD%20Inc.&query_place_id=ChIJtxk1rZ2BToYREb3FSWKYPC4"
        },
        {
            "rank": 7,
            "companyName": "Randstad - Manufacturing & Logistics",
            "rating": 4.6,
            "reviews": 799,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 745-7002",
            "website": "https://www.randstadusa.com/local/tx/irving/3601-regent-boulevard?utm_source=google&utm_medium=organic&utm_campaign=gmb&utm_content=irving",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Randstad%20-%20Manufacturing%20%26%20Logistics&query_place_id=ChIJQereWvAoTIYRnM985EDFBiU"
        },
        {
            "rank": 8,
            "companyName": "Express Employment Professionals",
            "rating": 4.6,
            "reviews": 396,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 258-4981",
            "website": "https://www.expresspros.com/us-texas-irving-south",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJJVKh1hWCToYR5IUamIQdamk"
        },
        {
            "rank": 9,
            "companyName": "TradeSTAR, Inc.",
            "rating": 4.5,
            "reviews": 48,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(469) 930-7515",
            "website": "http://www.tradestarinc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=TradeSTAR%2C%20Inc.&query_place_id=ChIJ48aRsS2HToYRodz1bvGqMdU"
        }
    ],
    "Oklahoma City": [
        {
            "rank": 1,
            "companyName": "Action Group Staffing - OKC",
            "rating": 4.9,
            "reviews": 621,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 656-0744",
            "website": "https://www.actiongrp.net/?utm_source=gmblisting&utm_medium=organic&utm_campaign=okc",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Action%20Group%20Staffing%20-%20OKC&query_place_id=ChIJzbCXdXQTsocRTeCPECzoIw4"
        },
        
        {
            "rank": 3,
            "companyName": "Superior Staffing Inc.",
            "rating": 4.5,
            "reviews": 722,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 632-2222",
            "website": "http://www.superiorstaffinginc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Superior%20Staffing%20Inc.&query_place_id=ChIJp4GjTbQWsocRaibrc_ZW3Tg"
        },
        {
            "rank": 4,
            "companyName": "American StaffCorp of OKC, LLC",
            "rating": 4.5,
            "reviews": 218,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 516-9675",
            "website": "https://americanstaffcorp.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=American%20StaffCorp%20of%20OKC%2C%20LLC&query_place_id=ChIJmTJowSQXsocRUwBFZs27c_A"
        },
        {
            "rank": 5,
            "companyName": "Fuse3 Solutions",
            "rating": 4.5,
            "reviews": 116,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 455-2633",
            "website": "https://fuse3solutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Fuse3%20Solutions&query_place_id=ChIJxYoyzu49socRvNdiWZdG4TE"
        },
        {
            "rank": 6,
            "companyName": "Accel Financial Staffing",
            "rating": 4.5,
            "reviews": 24,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 232-3100",
            "website": "https://accelfinancial.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Accel%20Financial%20Staffing&query_place_id=ChIJZeF8bTAXsocRsFBhTtnJbEY"
        },
        {
            "rank": 7,
            "companyName": "Insight Global",
            "rating": 4.5,
            "reviews": 22,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/oklahoma/staffing-agency-oklahoma-city-ok/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJJ3PgX5wXsocR7OQra48KWik"
        },
        {
            "rank": 8,
            "companyName": "Archon Resources",
            "rating": 4.4,
            "reviews": 27,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(405) 778-8050",
            "website": "http://www.archonresources.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Archon%20Resources&query_place_id=ChIJE1cG5n4bsocR0-qCsIVL3tU"
        },
        {
            "rank": 9,
            "companyName": "Ascend Staffing",
            "rating": 4.1,
            "reviews": 82,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 495-4200",
            "website": "https://www.ascendstaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ascend%20Staffing&query_place_id=ChIJ1V3Ln5YRsocRuhJCkoK_EtU"
        }
    ],
    "Seattle": [
        {
            "rank": 1,
            "companyName": "Orin Rice - Sales Recruiting",
            "rating": 5.0,
            "reviews": 105,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(206) 588-5683",
            "website": "http://www.orinrice.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Orin%20Rice%20-%20Sales%20Recruiting&query_place_id=ChIJi-7BMn4WkFQR7mLrgRbXTQ0"
        },
        {
            "rank": 2,
            "companyName": "The Talent Mine",
            "rating": 5.0,
            "reviews": 27,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(206) 940-2906",
            "website": "http://www.thetalentmine.jobs/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Talent%20Mine&query_place_id=ChIJ55Pu2J9rkFQRploxmrp7QEA"
        },
        {
            "rank": 3,
            "companyName": "Seattle Corporate Search",
            "rating": 4.9,
            "reviews": 429,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(206) 814-9939",
            "website": "http://www.seattlecorporatesearch.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Seattle%20Corporate%20Search&query_place_id=ChIJXb4plj4VkFQRkay-m7eHTkk"
        },
        {
            "rank": 4,
            "companyName": "Emerald Search Partners",
            "rating": 4.9,
            "reviews": 76,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(206) 299-0847",
            "website": "http://www.emeraldsearch.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Emerald%20Search%20Partners&query_place_id=ChIJwT6NJ7FqkFQR3iguCX9BriM"
        },
        {
            "rank": 5,
            "companyName": "Scion Staffing",
            "rating": 4.9,
            "reviews": 39,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(206) 686-1798",
            "website": "https://www.scionstaffingseattle.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Scion%20Staffing&query_place_id=ChIJb-26WYJdkFQRx5JmtNvQECY"
        },
        {
            "rank": 6,
            "companyName": "Insight Global",
            "rating": 4.0,
            "reviews": 87,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/washington/staffing-agency-seattle-wa/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJbQGBGYlskFQRMBgeznU1jk4"
        }
    ],
    "San Jose": [
        {
            "rank": 1,
            "companyName": "Pinpoint Talent",
            "rating": 4.9,
            "reviews": 26,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(408) 400-4714",
            "website": "http://pinpointtalent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Pinpoint%20Talent&query_place_id=ChIJQR_U0ZHKj4ARNaotU70Ns5U"
        },
        {
            "rank": 2,
            "companyName": "Certified Employment Group",
            "rating": 4.8,
            "reviews": 91,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(408) 626-7127",
            "website": "http://www.certifiedemployment.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Certified%20Employment%20Group&query_place_id=ChIJ3z2IAek0joARUX3Pk54llb8"
        },
        {
            "rank": 3,
            "companyName": "Motion Recruitment",
            "rating": 4.8,
            "reviews": 80,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(408) 418-1520",
            "website": "https://motionrecruitment.com/about/locations/silicon-valley-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=san-jose",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJbxSbpqTMj4ARg_mrz9oPC7s"
        },
        {
            "rank": 4,
            "companyName": "Power Personnel",
            "rating": 4.5,
            "reviews": 79,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(408) 283-9144",
            "website": "https://jobs.powerpersonnel.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Power%20Personnel&query_place_id=ChIJQzcCF6PMj4AR_36EJFrCHEM"
        },
        {
            "rank": 5,
            "companyName": "Ultimate Staffing Services",
            "rating": 4.5,
            "reviews": 36,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(408) 436-3031",
            "website": "http://www.ultimatestaffing.com/about-us/locations/san-jose/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ultimate%20Staffing%20Services&query_place_id=ChIJq6qqqp7Lj4ARyvlRSNQuQoU"
        }
    ],
    "Austin": [
        {
            "rank": 1,
            "companyName": "Quota Crushers Agency - Sales Recruitment Agency Texas",
            "rating": 5.0,
            "reviews": 45,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(888) 257-8114",
            "website": "https://www.quotacrushersagency.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Quota%20Crushers%20Agency%20-%20Sales%20Recruitment%20Agency%20Texas&query_place_id=ChIJh5q0-wS1RIYR23TnRH8pSLw"
        },
        {
            "rank": 2,
            "companyName": "recruitAbility",
            "rating": 4.9,
            "reviews": 113,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(512) 744-9073",
            "website": "http://www.therecruitability.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=recruitAbility&query_place_id=ChIJ-eKgeTzKRIYRwydMqG84-ho"
        },
        {
            "rank": 3,
            "companyName": "The HT Group",
            "rating": 4.5,
            "reviews": 296,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(512) 533-9700",
            "website": "https://www.thehtgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20HT%20Group&query_place_id=ChIJY-1roJ3LRIYRWPy9juLZo7I"
        },
        {
            "rank": 4,
            "companyName": "Insight Global",
            "rating": 4.0,
            "reviews": 96,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/texas/staffing-agency-austin-tx/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJV7WhOQi1RIYRP020A-Gg24E"
        }
    ],
    "Buffalo": [
        {
            "rank": 1,
            "companyName": "Lighthouse Technology Services",
            "rating": 5.0,
            "reviews": 202,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(716) 634-0509",
            "website": "https://www.lhtservices.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Lighthouse%20Technology%20Services&query_place_id=ChIJLXBtyDFy04kRofyVrAb1-8U"
        },
        {
            "rank": 2,
            "companyName": "StaffBuffalo LLC",
            "rating": 4.7,
            "reviews": 75,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(716) 262-9153",
            "website": "http://www.staffbuffalo.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=StaffBuffalo%20LLC&query_place_id=ChIJd5fR1FJt04kR_2Gu5zq4RQo"
        },
        {
            "rank": 3,
            "companyName": "Imagine Staffing Technology",
            "rating": 4.4,
            "reviews": 277,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(716) 218-7819",
            "website": "http://www.imaginestaffing.net/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Imagine%20Staffing%20Technology&query_place_id=ChIJr_dc7VkS04kRQ31zelxjB0E"
        },
        {
            "rank": 4,
            "companyName": "Selective Staffing Solutions",
            "rating": 4.4,
            "reviews": 100,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(716) 634-3300",
            "website": "http://www.ssswny.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Selective%20Staffing%20Solutions&query_place_id=ChIJOSYaUI1004kRAa5HCIjfuLs"
        }
    ],
    "Other US Hubs": [
        {
            "rank": 1,
            "companyName": "DJP Right Fit Recruiting, LLC",
            "rating": 5.0,
            "reviews": 52,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(508) 884-6798",
            "website": "https://rightfitrecruitingservices.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DJP%20Right%20Fit%20Recruiting%2C%20LLC&query_place_id=ChIJax38qVa7CKIRIsPeEGoEBv0"
        },
        {
            "rank": 2,
            "companyName": "The Staff Pad",
            "rating": 4.9,
            "reviews": 60,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(469) 476-0552",
            "website": "http://www.thestaffpad.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Staff%20Pad&query_place_id=ChIJc33ucBAjTIYRpZ0xt6TEVYU"
        },
        {
            "rank": 3,
            "companyName": "PharmaLogics Recruiting",
            "rating": 4.8,
            "reviews": 148,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(781) 848-5500",
            "website": "http://www.pharmalogicsrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=PharmaLogics%20Recruiting&query_place_id=ChIJVRHvPUF944kRgbbYN24DGUE"
        },
        {
            "rank": 4,
            "companyName": "Talent Sourcing Direct",
            "rating": 4.3,
            "reviews": 22,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(818) 401-0666",
            "website": "https://talentsourcingdirectinc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Talent%20Sourcing%20Direct&query_place_id=ChIJWdPr7yFIm6kRXqqEEEztNtw"
        }
    ],
    "Providence": [
        {
            "rank": 1,
            "companyName": "City Personnel",
            "rating": 4.7,
            "reviews": 569,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(401) 331-2311",
            "website": "http://www.citypersonnel.net/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=City%20Personnel&query_place_id=ChIJQ_n2GFhE5IkRnOsiD9bZbi4"
        },
        {
            "rank": 2,
            "companyName": "GreenKiss Staffing Solutions, Inc.",
            "rating": 4.6,
            "reviews": 116,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(508) 567-6575",
            "website": "http://www.gkstaff.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=GreenKiss%20Staffing%20Solutions%2C%20Inc.&query_place_id=ChIJ8-kKfF_35IkRM51DdFN519s"
        },
        {
            "rank": 3,
            "companyName": "The Greysmith Companies",
            "rating": 4.5,
            "reviews": 181,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(401) 272-7200",
            "website": "http://www.greysmith.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Greysmith%20Companies&query_place_id=ChIJz9f6WP1E5IkRaE0HPTKTyt0"
        },
        {
            "rank": 4,
            "companyName": "Aerotek - By Appointment Only",
            "rating": 4.3,
            "reviews": 162,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(401) 228-1270",
            "website": "https://www.aerotek.com/en/locations/united-states/rhode-island/providence?ecid=ls_aero_bizlist_091222_seo7123162",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aerotek%20-%20By%20Appointment%20Only&query_place_id=ChIJLXPADxRF5IkRcaLkNhnIYwY"
        }
    ],
    "Woburn": [
        {
            "rank": 1,
            "companyName": "Unique System Skills LLC | IT Servicing and Solution Provider Company | Massachusetts",
            "rating": 4.9,
            "reviews": 32,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(844) 887-9239",
            "website": "https://www.systemskills.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Unique%20System%20Skills%20LLC%20%7C%20IT%20Servicing%20and%20Solution%20Provider%20Company%20%7C%20Massachusetts&query_place_id=ChIJwb_KXEB144kRT5n0hrzURKU"
        },
        {
            "rank": 2,
            "companyName": "SRG Talent Recruitment Massachusetts",
            "rating": 4.9,
            "reviews": 26,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(877) 966-5347",
            "website": "https://www.srgtalent.com/us/?utm_campaign=google_my_business&utm_source=google_my_business&utm_medium=organic",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SRG%20Talent%20Recruitment%20Massachusetts&query_place_id=ChIJ8bjyf5J144kR6P-igLvyJzo"
        },
        {
            "rank": 3,
            "companyName": "Aerotek",
            "rating": 4.5,
            "reviews": 196,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(781) 938-3038",
            "website": "https://www.aerotek.com/en/locations/united-states/massachusetts/woburn?ecid=ls_aero_bizlist_091222_seo7123214",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aerotek&query_place_id=ChIJZccesI5044kRt-QECmAMc74"
        },
        {
            "rank": 4,
            "companyName": "BlackTree Technical Group, Inc.",
            "rating": 4.1,
            "reviews": 29,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(781) 932-3333",
            "website": "http://www.blacktreetech.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=BlackTree%20Technical%20Group%2C%20Inc.&query_place_id=ChIJj290IRR144kRqGKsqdw6YoA"
        }
    ],
    "Arlington": [
        {
            "rank": 1,
            "companyName": "Motion Recruitment",
            "rating": 4.9,
            "reviews": 928,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(703) 682-4000",
            "website": "https://motionrecruitment.com/about/locations/washington-dc-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=washington-dc",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJy0Y_kzq0t4kR3d30VhowuuA"
        },
        {
            "rank": 2,
            "companyName": "Stride Staffing",
            "rating": 4.8,
            "reviews": 1653,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(682) 323-5111",
            "website": "http://www.stridestaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Stride%20Staffing&query_place_id=ChIJEzoTGguHToYRHzIi4sgGMV8"
        },
        {
            "rank": 3,
            "companyName": "Mondo",
            "rating": 4.7,
            "reviews": 130,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(202) 800-8291",
            "website": "https://www.mondo.com/hire-tech-consultants-marketing-talent/?utm_campaign=%5BMONDO%5D%20Google%20Maps&utm_source=Organic%20G%20Maps&utm_medium=DC",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mondo&query_place_id=ChIJUy9HhIa2t4kRNTKTaKSztt8"
        }
    ],
    "Atlanta": [
        {
            "rank": 1,
            "companyName": "AquantUs, LLC",
            "rating": 5.0,
            "reviews": 227,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(404) 920-2300",
            "website": "https://www.aquantusllc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AquantUs%2C%20LLC&query_place_id=ChIJo0AngUQE9YgRhSCBtTtL2mc"
        },
        {
            "rank": 2,
            "companyName": "Advanced Tech Placement (ATP)",
            "rating": 5.0,
            "reviews": 83,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(404) 410-1419",
            "website": "http://advancedtechplacement.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Advanced%20Tech%20Placement%20(ATP)&query_place_id=ChIJk5s4wmxntokRHmmmgC7K6Hs"
        },
        {
            "rank": 3,
            "companyName": "Insight Global",
            "rating": 4.2,
            "reviews": 279,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/georgia/staffing-agency-atlanta-ga/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJly-Z2UAJ9YgRz31OwFkGld0"
        }
    ],
    "Braintree": [
        {
            "rank": 1,
            "companyName": "Aston Carter",
            "rating": 5.0,
            "reviews": 91,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(781) 356-6996",
            "website": "https://www.astoncarter.com/en/locations/north-america/united-states/massachusetts/braintree?ecid=ls_ac_bizlist_091222_seo7123614",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aston%20Carter&query_place_id=ChIJ2cowZxh944kR0tAf6XE6kFE"
        },
        {
            "rank": 2,
            "companyName": "Sci.bio Recruiting",
            "rating": 5.0,
            "reviews": 21,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 500-6690",
            "website": "http://www.sci.bio/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sci.bio%20Recruiting&query_place_id=ChIJh7isRnhh44kRrM7Tjf3HoeM"
        },
        {
            "rank": 3,
            "companyName": "Aerotek",
            "rating": 4.8,
            "reviews": 224,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(781) 356-6928",
            "website": "https://www.aerotek.com/en/locations/united-states/massachusetts/quincy?ecid=ls_aero_bizlist_091222_seo7123163",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aerotek&query_place_id=ChIJkdtW8xh944kRhX4VDxfncvU"
        }
    ],
    "Brooklyn": [
        {
            "rank": 1,
            "companyName": "Persone NYC",
            "rating": 5.0,
            "reviews": 440,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(929) 219-3023",
            "website": "http://www.personenyc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Persone%20NYC&query_place_id=ChIJ2RhsvJlZwokRUlfZRMmwzkk"
        },
        {
            "rank": 2,
            "companyName": "Candidately",
            "rating": 5.0,
            "reviews": 27,
            "category": "Software company",
            "wheelchairAccessible": true,
            "website": "https://hubs.li/Q03hnTnD0",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Candidately&query_place_id=ChIJEYwAuaxZwokRkKfzislDprM"
        },
        {
            "rank": 3,
            "companyName": "DevsData LLC - IT Recruitment Agency (Poland, Europe, LatAm), IT staffing, IT recruiters",
            "rating": 4.8,
            "reviews": 21,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(917) 300-1752",
            "website": "https://devsdata.com/recruitment",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DevsData%20LLC%20-%20IT%20Recruitment%20Agency%20(Poland%2C%20Europe%2C%20LatAm)%2C%20IT%20staffing%2C%20IT%20recruiters&query_place_id=ChIJA56Q7jBZwokRcBE5HNakX-U"
        }
    ],
    "Chicago": [
        {
            "rank": 1,
            "companyName": "Sales Recruiters Chicago, Inc.",
            "rating": 5.0,
            "reviews": 42,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(312) 332-8292",
            "website": "https://www.salesrecruiterschicago.com/?utm_source=gbp&utm_medium=local&utm_campaign=listing",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sales%20Recruiters%20Chicago%2C%20Inc.&query_place_id=ChIJT5lBu7ssDogRy_beey6gXA0"
        },
        {
            "rank": 2,
            "companyName": "Sharp Staff Inc",
            "rating": 4.9,
            "reviews": 471,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(773) 309-8781",
            "website": "http://www.sharp-staff.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sharp%20Staff%20Inc&query_place_id=ChIJZXI-98HMD4gRCltOTPXQGO0"
        },
        {
            "rank": 3,
            "companyName": "Hirewell",
            "rating": 4.2,
            "reviews": 75,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(312) 496-7955",
            "website": "http://www.hirewell.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hirewell&query_place_id=ChIJn3sgib4sDogRO0BKFtWTpbo"
        }
    ],
    "Grand Rapids": [
        {
            "rank": 1,
            "companyName": "Harrison Gray Search",
            "rating": 5.0,
            "reviews": 168,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(616) 288-2520",
            "website": "http://www.harrisongraysearch.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Harrison%20Gray%20Search&query_place_id=ChIJ4a8BXvmtGYgR_9ivT8Oauno"
        },
        {
            "rank": 2,
            "companyName": "Axios Professional Recruitment",
            "rating": 4.7,
            "reviews": 120,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(616) 900-9550",
            "website": "https://axiosrecruitment.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Axios%20Professional%20Recruitment&query_place_id=ChIJc1RX4CqsGYgRJq0Az2aBI2M"
        },
        {
            "rank": 3,
            "companyName": "iMPact Business Group",
            "rating": 4.6,
            "reviews": 79,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(616) 254-8586",
            "website": "https://www.impactbusinessgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=iMPact%20Business%20Group&query_place_id=ChIJTd4XtcVUGIgRLs659tESteE"
        }
    ],
    "Honolulu": [
        {
            "rank": 1,
            "companyName": "ALTRES Staffing",
            "rating": 4.8,
            "reviews": 379,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(808) 591-4940",
            "website": "https://www.altres.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ALTRES%20Staffing&query_place_id=ChIJYa7TmuNtAHwRfb1pt_721Hs"
        },
        {
            "rank": 2,
            "companyName": "Express Employment Professionals",
            "rating": 4.6,
            "reviews": 84,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(808) 525-5225",
            "website": "https://www.expresspros.com/us-hawaii-honolulu",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJ_zEdyWhuAHwRV9P86lXn59w"
        },
        {
            "rank": 3,
            "companyName": "Source it (Staffing, Payroll & HR)",
            "rating": 4.6,
            "reviews": 59,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(808) 591-5656",
            "website": "https://sourceithawaii.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Source%20it%20(Staffing%2C%20Payroll%20%26%20HR)&query_place_id=ChIJ44rrouJtAHwRuH23z1ptCr4"
        }
    ],
    "Houston": [
        {
            "rank": 1,
            "companyName": "The Reisner Group",
            "rating": 5.0,
            "reviews": 200,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(832) 437-2366",
            "website": "http://www.thereisnergroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Reisner%20Group&query_place_id=ChIJ4ecUqbDpQIYRdyGTgqBh7-Y"
        },
        {
            "rank": 2,
            "companyName": "Decide Consulting",
            "rating": 4.7,
            "reviews": 26,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(281) 596-0123",
            "website": "https://decideconsulting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Decide%20Consulting&query_place_id=ChIJhz7a_1LbQIYR4ZHQbLDxWWc"
        },
        {
            "rank": 3,
            "companyName": "Core Group Resources",
            "rating": 4.6,
            "reviews": 67,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(281) 347-4700",
            "website": "http://www.coregroupresources.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Core%20Group%20Resources&query_place_id=ChIJB1leq90mQYYROFZPWD9dclQ"
        }
    ],
    "Pasadena": [
        {
            "rank": 1,
            "companyName": "Shirley Parsons",
            "rating": 5.0,
            "reviews": 40,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(323) 300-6655",
            "website": "http://www.shirleyparsons.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Shirley%20Parsons&query_place_id=ChIJGfvVXiC_woARs_cTN1Og7lg"
        },
        {
            "rank": 2,
            "companyName": "Ultimate Staffing Services",
            "rating": 4.8,
            "reviews": 173,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(626) 449-9898",
            "website": "https://www.ultimatestaffing.com/locations/view/pasadena/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ultimate%20Staffing%20Services&query_place_id=ChIJa4uB4lzDwoARk6h1A3Vy5bE"
        },
        {
            "rank": 3,
            "companyName": "AppleOne Employment Services - Pasadena",
            "rating": 4.5,
            "reviews": 100,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(626) 796-0395",
            "website": "http://www.appleone.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AppleOne%20Employment%20Services%20-%20Pasadena&query_place_id=ChIJO_2ddGbDwoARYQstBEawpeo"
        }
    ],
    "Williamsville": [
        {
            "rank": 1,
            "companyName": "iWorld Professionals",
            "rating": 4.9,
            "reviews": 60,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(585) 381-4409",
            "website": "https://iworldprofessionals.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=iWorld%20Professionals&query_place_id=ChIJvUS_Ohgz0YkRwqpQj8lWuTg"
        },
        {
            "rank": 2,
            "companyName": "StraussGroup, Inc",
            "rating": 4.6,
            "reviews": 63,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(716) 631-3200",
            "website": "http://www.straussgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=StraussGroup%2C%20Inc&query_place_id=ChIJLQatvKd104kRHw1Qmz0-GnM"
        },
        {
            "rank": 3,
            "companyName": "APX Staffing",
            "rating": 4.4,
            "reviews": 45,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(716) 635-0290",
            "website": "https://apxexecutivestaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=APX%20Staffing&query_place_id=ChIJUxwONnBz04kRf8Vrwwr690M"
        }
    ],
    "Addison": [
        {
            "rank": 1,
            "companyName": "Medical Advantage Recruiters",
            "rating": 5.0,
            "reviews": 25,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(817) 491-5260",
            "website": "https://www.medicaladvantage.net/contact-2/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Medical%20Advantage%20Recruiters&query_place_id=ChIJ8brAfjghTIYRHIda3SLmu4s"
        },
        {
            "rank": 2,
            "companyName": "ASAP Personnel - Dallas",
            "rating": 4.6,
            "reviews": 296,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 432-6667",
            "website": "http://asapdo.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ASAP%20Personnel%20-%20Dallas&query_place_id=ChIJtVNVFvwjTIYRIPgPR5kS9fc"
        }
    ],
    "Albany": [
        {
            "rank": 1,
            "companyName": "Walrath Recruiting, Inc.",
            "rating": 4.9,
            "reviews": 235,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(518) 275-4816",
            "website": "http://walrathrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Walrath%20Recruiting%2C%20Inc.&query_place_id=ChIJaQUSGJAM3okR_KHdouXnQlg"
        },
        {
            "rank": 2,
            "companyName": "Alaant Workforce Solutions",
            "rating": 4.4,
            "reviews": 50,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(518) 689-3140",
            "website": "http://www.alaant.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Alaant%20Workforce%20Solutions&query_place_id=ChIJpa1ZS4kM3okRaKQ7CwNmWwM"
        }
    ],
    "Albuquerque": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.6,
            "reviews": 483,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(505) 508-2162",
            "website": "https://www.expresspros.com/us-new-mexico-albuquerque-west",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJSa10U2RxIocRcTPCcYK9Zk4"
        },
        {
            "rank": 2,
            "companyName": "Sabio Systems - Employment Agency & Recruiters",
            "rating": 4.3,
            "reviews": 148,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(505) 792-8604",
            "website": "http://www.sabiosystems.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sabio%20Systems%20-%20Employment%20Agency%20%26%20Recruiters&query_place_id=ChIJtQQDkud0IocRF-9C4ik8VRc"
        }
    ],
    "Anchorage": [
        {
            "rank": 1,
            "companyName": "Opti Staffing Group",
            "rating": 4.4,
            "reviews": 238,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(907) 677-9675",
            "website": "http://www.optistaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Opti%20Staffing%20Group&query_place_id=ChIJKew3IsmXyFYRuvjz8h8eCYw"
        },
        {
            "rank": 2,
            "companyName": "Personnel Plus Employment Agency Inc.",
            "rating": 4.0,
            "reviews": 34,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(907) 563-7587",
            "website": "https://www.perplus.com/?utm_source=omg-listings&utm_medium=webclick",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Personnel%20Plus%20Employment%20Agency%20Inc.&query_place_id=ChIJpfSPDMOXyFYRkP11pRkI-70"
        }
    ],
    "Bellevue": [
        {
            "rank": 1,
            "companyName": "Fuel Talent",
            "rating": 4.7,
            "reviews": 61,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(206) 465-2000",
            "website": "http://fueltalent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Fuel%20Talent&query_place_id=ChIJ7ZVMZLRqkFQRbmM8E5UK03k"
        },
        {
            "rank": 2,
            "companyName": "AIM Consulting",
            "rating": 4.1,
            "reviews": 38,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "(206) 624-5333",
            "website": "https://aimconsulting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AIM%20Consulting&query_place_id=ChIJ6-f1ovVskFQRkiI3vgJX0YE"
        }
    ],
    "Cambridge": [
        {
            "rank": 1,
            "companyName": "Lock Search Group",
            "rating": 5.0,
            "reviews": 31,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://www.locksearchgroup.com/offices/boston/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Lock%20Search%20Group&query_place_id=ChIJr6e3IqBx44kRVmvCr9QvNB4"
        },
        {
            "rank": 2,
            "companyName": "DANA Associates, Inc.",
            "rating": 4.9,
            "reviews": 29,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(617) 661-0779",
            "website": "https://www.danaassociates.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DANA%20Associates%2C%20Inc.&query_place_id=ChIJhzTD8nN344kRJwj3du3i9FU"
        }
    ],
    "Charlotte": [
        {
            "rank": 1,
            "companyName": "Search Solution Group",
            "rating": 4.8,
            "reviews": 266,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(704) 332-8702",
            "website": "https://www.searchsolutiongroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Search%20Solution%20Group&query_place_id=ChIJI2COdfwfVIgRbd54Nf7vNMs"
        },
        {
            "rank": 2,
            "companyName": "AccruePartners",
            "rating": 4.4,
            "reviews": 246,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(704) 632-9955",
            "website": "http://accruepartners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AccruePartners&query_place_id=ChIJBeYL3HCfVogRCJrQemFRCQ8"
        }
    ],
    "Coppell": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.6,
            "reviews": 116,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 304-1175",
            "website": "https://www.expresspros.com/us-texas-coppell",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJKyRLQyYhTIYRE_yXV8d2UKg"
        },
        {
            "rank": 2,
            "companyName": "AppleOne Employment Services",
            "rating": 4.3,
            "reviews": 44,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 392-0951",
            "website": "http://www.appleone.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AppleOne%20Employment%20Services&query_place_id=ChIJ5-uq8yUhTIYRwFjd15C7FgE"
        }
    ],
    "Fairfield": [
        {
            "rank": 1,
            "companyName": "Hamilton Connections",
            "rating": 4.8,
            "reviews": 108,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(203) 333-3200",
            "website": "https://www.hamiltonconnection.com/contact-jobs-staffing-agency/fairfield-ct/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hamilton%20Connections&query_place_id=ChIJn2EEGdIP6IkR7uxB9tSlHIw"
        },
        {
            "rank": 2,
            "companyName": "HonorVet Technologies",
            "rating": 4.2,
            "reviews": 163,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(973) 552-4242",
            "website": "http://www.honorvettech.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HonorVet%20Technologies&query_place_id=ChIJdWW7jNcAw4kRjnZFWuMbQBk"
        }
    ],
    "Farmington": [
        {
            "rank": 1,
            "companyName": "Aerotek",
            "rating": 4.6,
            "reviews": 165,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 269-2344",
            "website": "https://www.aerotek.com/en/locations/united-states/connecticut/farmington?ecid=ls_aero_bizlist_091222_seo7123070",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aerotek&query_place_id=ChIJ0Q3h0-Ct54kR0kCecEnWAws"
        },
        {
            "rank": 2,
            "companyName": "Aston Carter",
            "rating": 4.2,
            "reviews": 42,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 269-2400",
            "website": "https://www.astoncarter.com/en/locations/north-america/united-states/connecticut/farmington?ecid=ls_ac_bizlist_091222_seo7123555",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aston%20Carter&query_place_id=ChIJ9xRP4d2t54kRWQug0Q-YnSI"
        }
    ],
    "Irvine": [
        {
            "rank": 1,
            "companyName": "Aclipse",
            "rating": 4.6,
            "reviews": 55,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(949) 880-0840",
            "website": "https://www.aclipse.net/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aclipse&query_place_id=ChIJJ5dZi6vd3IARq15Kjcb0JFY"
        },
        {
            "rank": 2,
            "companyName": "KORE1",
            "rating": 4.1,
            "reviews": 51,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(949) 706-6990",
            "website": "http://www.kore1.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=KORE1&query_place_id=ChIJHx8aP4jg3IARn40SzN9Er5k"
        }
    ],
    "Liberty Township": [
        {
            "rank": 1,
            "companyName": "i4 Search Group Healthcare Recruiting | Permanent Placement",
            "rating": 5.0,
            "reviews": 318,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(513) 860-0600",
            "website": "http://www.i4searchgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=i4%20Search%20Group%20Healthcare%20Recruiting%20%7C%20Permanent%20Placement&query_place_id=ChIJOSN1rCdbQIgROa769hhamZs"
        },
        {
            "rank": 2,
            "companyName": "Superior Talent Source",
            "rating": 5.0,
            "reviews": 173,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(919) 739-4339",
            "website": "http://www.superiortalentsource.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Superior%20Talent%20Source&query_place_id=ChIJCTC6fgzIMAMRwn3gL8_s1d4"
        }
    ],
    "Livonia": [
        {
            "rank": 1,
            "companyName": "The Specialized Recruiting Group",
            "rating": 5.0,
            "reviews": 25,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(734) 728-9800",
            "website": "https://www.srgpros.com/us-michigan-farmington-hills-westland",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Specialized%20Recruiting%20Group&query_place_id=ChIJe6VWFxizJIgRB17665dnpxM"
        },
        {
            "rank": 2,
            "companyName": "Qualigence International",
            "rating": 4.3,
            "reviews": 24,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(734) 432-6300",
            "website": "https://www.qualigence.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Qualigence%20International&query_place_id=ChIJQyGgLuayJIgRwzHzUOLvlbg"
        }
    ],
    "Marlborough": [
        {
            "rank": 1,
            "companyName": "The Davis Companies",
            "rating": 4.8,
            "reviews": 59,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(800) 482-9494",
            "website": "http://www.daviscos.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Davis%20Companies&query_place_id=ChIJoRrIx5v044kRQC2lOcJ6QLk"
        },
        {
            "rank": 2,
            "companyName": "Ardent Staffing Solutions - Staffing Agency Massachusetts",
            "rating": 4.7,
            "reviews": 47,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(508) 530-7212",
            "website": "http://www.ardent-staffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ardent%20Staffing%20Solutions%20-%20Staffing%20Agency%20Massachusetts&query_place_id=ChIJi4ekz7r144kRDRIp_ifBISk"
        }
    ],
    "Miami": [
        {
            "rank": 1,
            "companyName": "InterEx Group",
            "rating": 4.5,
            "reviews": 54,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(786) 206-9290",
            "website": "http://www.interex-group.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=InterEx%20Group&query_place_id=ChIJa0YCara32YgRJHFjMW2JmJg"
        },
        {
            "rank": 2,
            "companyName": "Hire With Jarvis",
            "rating": 4.1,
            "reviews": 27,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(646) 585-1212",
            "website": "http://www.hirewithjarvis.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hire%20With%20Jarvis&query_place_id=ChIJ7XA5w0ux2YgRPuSl2HINnsA"
        }
    ],
    "Middletown": [
        {
            "rank": 1,
            "companyName": "A. R. Mazzotta Employment Specialists",
            "rating": 4.8,
            "reviews": 226,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 347-1626",
            "website": "http://www.armazzotta.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=A.%20R.%20Mazzotta%20Employment%20Specialists&query_place_id=ChIJT54XnFxK5okRziy3Fh-Ltsc"
        },
        {
            "rank": 2,
            "companyName": "Here's Help Staffing & Recruiting",
            "rating": 4.5,
            "reviews": 53,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(845) 344-3434",
            "website": "http://www.hereshelp.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Here's%20Help%20Staffing%20%26%20Recruiting&query_place_id=ChIJ2QKvE3ktw4kR6Jnhz3idKDI"
        }
    ],
    "Midwest City": [
        {
            "rank": 1,
            "companyName": "HireGo",
            "rating": 4.8,
            "reviews": 736,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(405) 609-1995",
            "website": "https://gohirego.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HireGo&query_place_id=ChIJ3Y3fwmo8socRTfqhftpP8-o"
        },
        ],
    "Nashville": [
        {
            "rank": 1,
            "companyName": "Wood Personnel Services",
            "rating": 4.7,
            "reviews": 37,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(615) 399-0006",
            "website": "https://www.woodpersonnel.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Wood%20Personnel%20Services&query_place_id=ChIJS19lxNNuZIgRRzl-UnHSEMA"
        },
        {
            "rank": 2,
            "companyName": "Insight Global",
            "rating": 4.3,
            "reviews": 91,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/tennessee/staffing-agency-nashville-tn/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJu9ePezd7ZIgR2J5ApYHNDlM"
        }
    ],
    "Norton": [
        {
            "rank": 1,
            "companyName": "Paramount Placement",
            "rating": 4.7,
            "reviews": 3191,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(774) 707-0685",
            "website": "http://www.paramount-placement.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Paramount%20Placement&query_place_id=ChIJ0X1c3HaK5IkR4bTEyWXwQCE"
        },
        {
            "rank": 2,
            "companyName": "The Alpha Group",
            "rating": 4.4,
            "reviews": 72,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(508) 285-8500",
            "website": "http://www.thealphagroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Alpha%20Group&query_place_id=ChIJkyutfHKK5IkREZTHd1vOc-w"
        }
    ],
    "Norwalk": [
        {
            "rank": 1,
            "companyName": "Excel Partners",
            "rating": 4.7,
            "reviews": 98,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(203) 978-6200",
            "website": "http://www.excel-partners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Excel%20Partners&query_place_id=ChIJqZ-B-uuhwokR-fG2IK_wVaM"
        },
        {
            "rank": 2,
            "companyName": "RightClick",
            "rating": 4.6,
            "reviews": 104,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(203) 588-9500",
            "website": "https://therightclick.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=RightClick&query_place_id=ChIJo_qLczWgwokRlFjdxahbIkM"
        }
    ],
    "Philadelphia": [
        {
            "rank": 1,
            "companyName": "Motion Recruitment",
            "rating": 4.8,
            "reviews": 472,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(267) 765-6100",
            "website": "https://motionrecruitment.com/about/locations/philadelphia-it-staffing-recruiting?utm_source=google-business&utm_medium=organic&utm_campaign=philadelphia",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Motion%20Recruitment&query_place_id=ChIJU9rtMDDGxokRhkALJ54LT2Q"
        },
        {
            "rank": 2,
            "companyName": "Insight Global",
            "rating": 4.7,
            "reviews": 198,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/pennsylvania/staffing-agency-philadelphia-pa/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJwcVl3US-xokReI4Nrzrk08k"
        }
    ],
    "Piscataway": [
        {
            "rank": 1,
            "companyName": "Hire IT People, Inc",
            "rating": 4.4,
            "reviews": 37,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(800) 693-8939",
            "website": "https://www.hireitpeople.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hire%20IT%20People%2C%20Inc&query_place_id=ChIJlaVVRc3Pw4kRytE34_rN6ww"
        },
        {
            "rank": 2,
            "companyName": "Aequor",
            "rating": 4.0,
            "reviews": 126,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(734) 354-8000",
            "website": "https://www.aequor.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aequor&query_place_id=ChIJfVP9S2DHw4kR1UmxZQzl_hw"
        }
    ],
    "Plano": [
        {
            "rank": 1,
            "companyName": "Vaco",
            "rating": 4.6,
            "reviews": 41,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 778-6161",
            "website": "https://www.vaco.com/about/locations/dallas/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Vaco&query_place_id=ChIJbct-XfwjTIYRp22ezdisTM0"
        },
        {
            "rank": 2,
            "companyName": "Catapult Solutions Group",
            "rating": 4.5,
            "reviews": 49,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(855) 460-7414",
            "website": "http://www.catapultsg.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Catapult%20Solutions%20Group&query_place_id=ChIJeSnfJpwjTIYR7a7tJ2Xq_5k"
        }
    ],
    "Rochester": [
        {
            "rank": 1,
            "companyName": "New York Technology Partners",
            "rating": 5.0,
            "reviews": 38,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(585) 300-4720",
            "website": "http://www.nytp.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=New%20York%20Technology%20Partners&query_place_id=ChIJCXLUu3xL0YkR2xPL6c6UY4s"
        },
        {
            "rank": 2,
            "companyName": "FTS, Inc.",
            "rating": 4.6,
            "reviews": 76,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(585) 348-7336",
            "website": "https://ftsco.com/?utm_source=gmb&utm_medium=organic&utm_campaign=GMB_listing",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=FTS%2C%20Inc.&query_place_id=ChIJm-PSqfiw1okRpRkh75dDzPQ"
        }
    ],
    "Rocky Hill": [
        
        {
            "rank": 2,
            "companyName": "BestLogic Staffing",
            "rating": 4.9,
            "reviews": 39,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(866) 585-8055",
            "website": "http://www.bestlogicstaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=BestLogic%20Staffing&query_place_id=ChIJsUwSXPlS5okR7hhMxyHgekM"
        }
    ],
    "Salem": [
        {
            "rank": 1,
            "companyName": "Jack Mena Recruit Inc.",
            "rating": 4.9,
            "reviews": 52,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(339) 300-9011",
            "website": "http://www.jackmenarecruit.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Jack%20Mena%20Recruit%20Inc.&query_place_id=ChIJGQr6TVkT44kRg_TibkyhuHg"
        },
        {
            "rank": 2,
            "companyName": "Techneeds, LLC",
            "rating": 4.1,
            "reviews": 39,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(603) 898-3000",
            "website": "http://www.techneeds.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Techneeds%2C%20LLC&query_place_id=ChIJnzu75M6r44kRc5cwmqw1qKs"
        }
    ],
    "Sherman Oaks": [
        {
            "rank": 1,
            "companyName": "Premier Executive Recruiting",
            "rating": 4.8,
            "reviews": 23,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(818) 874-3852",
            "website": "http://premierexecutiverecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Premier%20Executive%20Recruiting&query_place_id=ChIJVVVVypSXwoARoEq05-g0L8A"
        },
        {
            "rank": 2,
            "companyName": "DeVore Recruiting - Healthcare Recruiter Los Angeles",
            "rating": 4.5,
            "reviews": 68,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(818) 783-6981",
            "website": "https://devorerecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DeVore%20Recruiting%20-%20Healthcare%20Recruiter%20Los%20Angeles&query_place_id=ChIJF7pNADGWwoARWM4PXWhXbt8"
        }
    ],
    "Stamford": [
        {
            "rank": 1,
            "companyName": "Medsource Consultants",
            "rating": 5.0,
            "reviews": 105,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(800) 575-2880",
            "website": "http://www.medsourceconsultants.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Medsource%20Consultants&query_place_id=ChIJVwjNieahwokRj-hHxuaIzwk"
        },
        {
            "rank": 2,
            "companyName": "Benchmark IT - Technology Talent and Tech Recruiting",
            "rating": 4.8,
            "reviews": 186,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(203) 304-5500",
            "website": "https://bmarkits.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Benchmark%20IT%20-%20Technology%20Talent%20and%20Tech%20Recruiting&query_place_id=ChIJqZ-B-uuhwokR5fUH6kzDT2E"
        }
    ],
    "Woodland Hills": [
        
        {
            "rank": 2,
            "companyName": "HIRECLOUT",
            "rating": 4.9,
            "reviews": 150,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(818) 882-2000",
            "website": "http://www.hireclout.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HIRECLOUT&query_place_id=ChIJ94SRfSGcwoARZPsMxV85bbI"
        }
    ],
    "Allentown": [
        {
            "rank": 1,
            "companyName": "The Denzel Group",
            "rating": 4.6,
            "reviews": 63,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(610) 366-1700",
            "website": "https://www.thedenzelgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Denzel%20Group&query_place_id=ChIJn1_dCn4xxIkRo2KWYKfF--8"
        }
    ],
    "Alpharetta": [
        {
            "rank": 1,
            "companyName": "IIT Workforce LLC",
            "rating": 4.8,
            "reviews": 156,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(408) 715-7889",
            "website": "https://www.iitworkforce.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=IIT%20Workforce%20LLC&query_place_id=ChIJcbYgBGV19YgRiBuZcWWWSnA"
        }
    ],
    "Amarillo": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.7,
            "reviews": 256,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(806) 467-2562",
            "website": "https://www.expresspros.com/us-texas-amarillo",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJE7OITEhQAYcRSNAY3HLRBas"
        }
    ],
    "Ashburn": [
        {
            "rank": 1,
            "companyName": "HireDNA - SaaS Sales Recruiters",
            "rating": 5.0,
            "reviews": 30,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(703) 840-5492",
            "website": "http://www.hiredna.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HireDNA%20-%20SaaS%20Sales%20Recruiters&query_place_id=ChIJkw4iHo87tokRibgidExGjts"
        }
    ],
    "Avon": [
        {
            "rank": 1,
            "companyName": "Hunter Recruiting",
            "rating": 4.4,
            "reviews": 111,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(888) 344-2943",
            "website": "https://www.hirecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hunter%20Recruiting&query_place_id=ChIJK8rQ_puaMIgR-Tk_6_8_-_k"
        }
    ],
    "Bedford": [
        {
            "rank": 1,
            "companyName": "SnapDragon Associates",
            "rating": 4.9,
            "reviews": 555,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(603) 621-9037",
            "website": "https://www.snapdragonassociates.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SnapDragon%20Associates&query_place_id=ChIJ9RXDWG5M4okR2mCf_9DaQ4E"
        }
    ],
    "Billings": [
        {
            "rank": 1,
            "companyName": "Employment Source",
            "rating": 4.7,
            "reviews": 99,
            "category": "Payroll service",
            "wheelchairAccessible": true,
            "phone": "(406) 256-3653",
            "website": "https://www.employment-source.biz/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Employment%20Source&query_place_id=ChIJByF_jDFjSFMRarehvelS6F0"
        }
    ],
    "Bloomfield": [
        {
            "rank": 1,
            "companyName": "Grayling Associates Inc",
            "rating": 4.3,
            "reviews": 34,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(860) 286-7076",
            "website": "http://www.graylingassociates.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Grayling%20Associates%20Inc&query_place_id=ChIJIaygROaq54kRA-sfzeSIIw4"
        }
    ],
    "Bloomfield Hills": [
        {
            "rank": 1,
            "companyName": "Blue Chip Talent",
            "rating": 4.7,
            "reviews": 307,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(866) 449-0403",
            "website": "http://www.bctalent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Blue%20Chip%20Talent&query_place_id=ChIJD41qQUK_JIgR3cjF9MyHdQU"
        }
    ],
    "Boynton Beach": [
        {
            "rank": 1,
            "companyName": "Frederick Fox",
            "rating": 4.5,
            "reviews": 79,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(602) 316-3743",
            "website": "http://www.frederickfox.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Frederick%20Fox&query_place_id=ChIJZXBhiA9zK4cRyFp6rk2tbkM"
        }
    ],
    "Broadview Heights": [
        {
            "rank": 1,
            "companyName": "Emerald Resource Group",
            "rating": 4.6,
            "reviews": 85,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(440) 627-6904",
            "website": "http://www.emeraldresourcegroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Emerald%20Resource%20Group&query_place_id=ChIJdftgMQrnMIgRmOv6g1JqHBI"
        }
    ],
    "Burbank": [
        {
            "rank": 1,
            "companyName": "Global Service Resources (GSR) - Medical Staffing & Recruiting",
            "rating": 4.9,
            "reviews": 613,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(800) 679-7658",
            "website": "http://www.globalserviceresources.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Global%20Service%20Resources%20(GSR)%20-%20Medical%20Staffing%20%26%20Recruiting&query_place_id=ChIJg_KWUPu_woAR7cgxvUtnMPc"
        }
    ],
    "Carrollton": [
        {
            "rank": 1,
            "companyName": "BridgeWork Partners, LLC",
            "rating": 4.9,
            "reviews": 165,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 920-9910",
            "website": "https://bridgeworkpartners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=BridgeWork%20Partners%2C%20LLC&query_place_id=ChIJM_fKRCchTIYRxmcC2fmHVrU"
        }
    ],
    "Cartersville": [
        {
            "rank": 1,
            "companyName": "Qualified Staffing",
            "rating": 4.7,
            "reviews": 260,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(770) 383-9908",
            "website": "https://www.q-staffing.com/locations/cartersville-ga/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Qualified%20Staffing&query_place_id=ChIJywnAbL1P9YgR3tMZb4YjUKI"
        }
    ],
    "Castleton-On-Hudson": [
        {
            "rank": 1,
            "companyName": "redShift Recruiting | Staffing Agency & Employment Agency",
            "rating": 4.8,
            "reviews": 203,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(518) 621-1990",
            "website": "https://www.redshiftrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=redShift%20Recruiting%20%7C%20Staffing%20Agency%20%26%20Employment%20Agency&query_place_id=ChIJc-t0TRvj3YkRpInesDX_mx8"
        }
    ],
    "Cheektowaga": [
        {
            "rank": 1,
            "companyName": "Aerotek",
            "rating": 4.7,
            "reviews": 332,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(716) 428-5016",
            "website": "https://www.aerotek.com/en/locations/united-states/new-york/buffalo?ecid=ls_aero_bizlist_091222_seo7123042",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aerotek&query_place_id=ChIJcTnIk2Rx04kRNroRsCrjLJI"
        }
    ],
    "Chelmsford": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.4,
            "reviews": 33,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(978) 256-1101",
            "website": "https://www.expresspros.com/us-massachusetts-lowell-nashua",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJwfJbf6-j44kRFL1WH3otEbk"
        }
    ],
    "Chicopee": [
        {
            "rank": 1,
            "companyName": "The MH Group",
            "rating": 4.7,
            "reviews": 31,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(413) 788-0751",
            "website": "http://www.themhgrp.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20MH%20Group&query_place_id=ChIJY_gIt6Do5okRDBzKcQsQWoo"
        }
    ],
    "Cincinnati": [
        {
            "rank": 1,
            "companyName": "Triple E Partners",
            "rating": 4.9,
            "reviews": 80,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(513) 685-0950",
            "website": "http://www.tripleepartners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Triple%20E%20Partners&query_place_id=ChIJm5mmsI2tQYgRX0KAEBTVmzs"
        }
    ],
    "Clifton Park": [
        {
            "rank": 1,
            "companyName": "VANTA Partners, Inc: Executive Recruiting Agency (A&F, Sales&Marketing, IT, Tech, Ops, etc)",
            "rating": 5.0,
            "reviews": 38,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(410) 382-3648",
            "website": "http://www.vantapartners.io/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=VANTA%20Partners%2C%20Inc%3A%20Executive%20Recruiting%20Agency%20(A%26F%2C%20Sales%26Marketing%2C%20IT%2C%20Tech%2C%20Ops%2C%20etc)&query_place_id=ChIJaUpVgIUP3okRkjJixSIXw2Y"
        }
    ],
    "Columbus": [
        {
            "rank": 1,
            "companyName": "Resource Employment Solutions - Columbus",
            "rating": 4.5,
            "reviews": 98,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(614) 721-8535",
            "website": "https://www.resourceemployment.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Resource%20Employment%20Solutions%20-%20Columbus&query_place_id=ChIJwzPXkjiQOIgRTpCY8ItK5rw"
        }
    ],
    "Commerce Township": [
        {
            "rank": 1,
            "companyName": "Hire Road",
            "rating": 4.4,
            "reviews": 45,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(248) 767-5013",
            "website": "http://hire-road.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hire%20Road&query_place_id=ChIJBVKDesCvJIgRTCRow9kmOqk"
        }
    ],
    "Conshohocken": [
        {
            "rank": 1,
            "companyName": "Liberty Personnel Services, Inc.",
            "rating": 4.8,
            "reviews": 318,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(610) 941-6300",
            "website": "http://www.libertyjobs.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Liberty%20Personnel%20Services%2C%20Inc.&query_place_id=ChIJr-dI2By-xokRq3HpG9aiom4"
        }
    ],
    "Covina": [
        {
            "rank": 1,
            "companyName": "The Specialized Recruiting Group",
            "rating": 5.0,
            "reviews": 27,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(626) 598-7979",
            "website": "https://www.srgpros.com/us-california-covina",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Specialized%20Recruiting%20Group&query_place_id=ChIJ4WeCEhcpw4AR4tx7E24O6ik"
        }
    ],
    "Culver City": [
        {
            "rank": 1,
            "companyName": "SuperbTech Inc",
            "rating": 4.6,
            "reviews": 35,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(310) 645-1199",
            "website": "https://www.superbtechinc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SuperbTech%20Inc&query_place_id=ChIJNWWxx1m3woARvs9-SANAc8c"
        }
    ],
    "Destin": [
        {
            "rank": 1,
            "companyName": "Scalesource",
            "rating": 4.9,
            "reviews": 66,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(646) 814-5993",
            "website": "https://scalesource.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Scalesource&query_place_id=ChIJBVFBifZDkYgRaLrJPMtnm4A"
        }
    ],
    "Downers Grove": [
        {
            "rank": 1,
            "companyName": "Lucas James Talent Partners",
            "rating": 4.9,
            "reviews": 278,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(630) 761-5150",
            "website": "https://lucasjamestalent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Lucas%20James%20Talent%20Partners&query_place_id=ChIJVVWBPH9TDogRk6eMBb0ITkk"
        }
    ],
    "East Providence": [
        {
            "rank": 1,
            "companyName": "The Hire",
            "rating": 5.0,
            "reviews": 66,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(888) 382-4473",
            "website": "http://www.thehire.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Hire&query_place_id=ChIJ7boSuvpc5IkR07FMXuDEU6A"
        }
    ],
    "El Segundo": [
        {
            "rank": 1,
            "companyName": "Prosum",
            "rating": 4.5,
            "reviews": 35,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(310) 426-0600",
            "website": "https://www.prosum.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Prosum&query_place_id=ChIJV-sY2wS0woARvbTC77DiNAM"
        }
    ],
    "Exeter": [
        {
            "rank": 1,
            "companyName": "Goodwin Recruiting",
            "rating": 4.6,
            "reviews": 305,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(603) 223-0303",
            "website": "https://www.goodwinrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Goodwin%20Recruiting&query_place_id=ChIJnzLpoY1q4okRZdPLPYI03eE"
        }
    ],
    "Falls Church": [
        {
            "rank": 1,
            "companyName": "DMVTEK - IT Consulting & Training",
            "rating": 5.0,
            "reviews": 23,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(202) 780-0900",
            "website": "https://www.dmvtek.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DMVTEK%20-%20IT%20Consulting%20%26%20Training&query_place_id=ChIJq6qasX-0t4kRsCJTwpT7aPY"
        }
    ],
    "Falmouth": [
        {
            "rank": 1,
            "companyName": "KMA Human Resources Consulting",
            "rating": 4.9,
            "reviews": 48,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(207) 781-6460",
            "website": "http://www.kmahr.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=KMA%20Human%20Resources%20Consulting&query_place_id=ChIJFU7q3liDskwR1182hCfOKGE"
        }
    ],
    "Farmington Hills": [
        {
            "rank": 1,
            "companyName": "The Clark Agency Recruiters",
            "rating": 5.0,
            "reviews": 21,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(248) 974-5292",
            "website": "https://theclarkagency-us.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Clark%20Agency%20Recruiters&query_place_id=ChIJtXphek67JIgR2hu74Y08p-4"
        }
    ],
    "Forest Hill": [
        {
            "rank": 1,
            "companyName": "Cornerstone Recruiting",
            "rating": 4.8,
            "reviews": 192,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(877) 731-5788",
            "website": "http://www.csrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Cornerstone%20Recruiting&query_place_id=ChIJpQczXcndx4kR5UftliXiab4"
        }
    ],
    "Fort Worth": [
        {
            "rank": 1,
            "companyName": "Alleare Consulting",
            "rating": 5.0,
            "reviews": 30,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 559-4616",
            "website": "http://www.alleareconsulting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Alleare%20Consulting&query_place_id=ChIJvTNod82eToYRt0pr8dfYLsg"
        }
    ],
    "Fresno": [
        {
            "rank": 1,
            "companyName": "Stardom Employment Consultants",
            "rating": 4.8,
            "reviews": 96,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(559) 218-5819",
            "website": "https://stardomconsult.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Stardom%20Employment%20Consultants&query_place_id=ChIJtcDnP0twQGsRWvAUTwd40JU"
        }
    ],
    "Friendswood": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.8,
            "reviews": 630,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(281) 648-4200",
            "website": "https://www.expresspros.com/us-texas-houston-bay-area",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJIaGhQdaaQIYR_ceG3b8SG_A"
        }
    ],
    "Frisco": [
        {
            "rank": 1,
            "companyName": "W3Global",
            "rating": 4.7,
            "reviews": 1018,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 393-4471",
            "website": "https://www.w3global.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=W3Global&query_place_id=ChIJFeMkpU8pTIYR4i0SZVRZRZA"
        }
    ],
    "Glastonbury": [
        {
            "rank": 1,
            "companyName": "Employment Solutions Glastonbury",
            "rating": 4.5,
            "reviews": 47,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 659-3500",
            "website": "http://www.targettemps.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Employment%20Solutions%20Glastonbury&query_place_id=ChIJxafRhYVR5okR3WeluRzn0Jo"
        }
    ],
    "Grapevine": [
        {
            "rank": 1,
            "companyName": "Flex Tech, LLC",
            "rating": 4.3,
            "reviews": 66,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(972) 623-3539",
            "website": "https://flextechnow.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Flex%20Tech%2C%20LLC&query_place_id=ChIJLzW8pReHToYRp-Xk8UBf0kc"
        }
    ],
    "Greenwich": [
        {
            "rank": 1,
            "companyName": "Crimmins Private Estate Placement",
            "rating": 5.0,
            "reviews": 28,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(203) 561-0565",
            "website": "http://www.crimminsstaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Crimmins%20Private%20Estate%20Placement&query_place_id=ChIJ6dRCZcGYwokR3uAaO2cURH4"
        }
    ],
    "Hamden": [
        {
            "rank": 1,
            "companyName": "Hamilton Connections",
            "rating": 4.1,
            "reviews": 31,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(203) 287-2870",
            "website": "https://www.hamiltonconnection.com/contact-jobs-staffing-agency/hamden-ct/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hamilton%20Connections&query_place_id=ChIJ2SYtE6TQ54kR2eyyQ752TLk"
        }
    ],
    "Hialeah": [
        {
            "rank": 1,
            "companyName": "National Search Group, Inc - (WoodJobs.com / MetalRecruiters.com / PlasticStaffing.com / HealthStaffingGroup.com)",
            "rating": 4.9,
            "reviews": 371,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(954) 379-2400",
            "website": "https://nationalsearchgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=National%20Search%20Group%2C%20Inc%20-%20(WoodJobs.com%20%2F%20MetalRecruiters.com%20%2F%20PlasticStaffing.com%20%2F%20HealthStaffingGroup.com)&query_place_id=ChIJE84eAXms2YgRtvEu1uEWBa0"
        }
    ],
    "Hoboken": [
        {
            "rank": 1,
            "companyName": "Cityscape Recruitment USA",
            "rating": 5.0,
            "reviews": 25,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(201) 455-6008",
            "website": "https://www.cityscaperecruitment.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Cityscape%20Recruitment%20USA&query_place_id=ChIJH12DyBZXwokRl8BPssRujig"
        }
    ],
    "Iselin": [
        {
            "rank": 1,
            "companyName": "ApTask",
            "rating": 4.5,
            "reviews": 283,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(732) 355-8000",
            "website": "http://www.aptask.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ApTask&query_place_id=ChIJ_bctU2e2w4kRqsWLz_xMjKQ"
        }
    ],
    "Jersey City": [
        {
            "rank": 1,
            "companyName": "Inoltra Consulting",
            "rating": 5.0,
            "reviews": 62,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(754) 206-5466",
            "website": "http://www.inoltra.co/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Inoltra%20Consulting&query_place_id=ChIJ24D9FxWt2YgRooJmspJTBlM"
        }
    ],
    "King of Prussia": [
        {
            "rank": 1,
            "companyName": "Insight Global",
            "rating": 4.4,
            "reviews": 35,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(855) 485-8732",
            "website": "https://insightglobal.com/locations/pennsylvania/staffing-agency-king-of-prussia-pa/?utm_source=gmb&utm_medium=Yext",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Insight%20Global&query_place_id=ChIJPeJnfyuVxokRwSM2V-7Q9Aw"
        }
    ],
    "Kirkland": [
        {
            "rank": 1,
            "companyName": "NW Recruiting Partners",
            "rating": 5.0,
            "reviews": 105,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(206) 343-8732",
            "website": "https://www.nwrecruitingpartners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=NW%20Recruiting%20Partners&query_place_id=ChIJ__-_z3gSkFQRI9YEtUgkDXw"
        }
    ],
    "Latham": [
        {
            "rank": 1,
            "companyName": "Aerotek",
            "rating": 4.7,
            "reviews": 243,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(518) 218-5862",
            "website": "https://www.aerotek.com/en/locations/united-states/new-york/albany?ecid=ls_aero_bizlist_091222_seo7123106",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Aerotek&query_place_id=ChIJCQe4QkAN3okRzmfQxJfChUw"
        }
    ],
    "Leominster": [
        {
            "rank": 1,
            "companyName": "Franklin Professional Associates",
            "rating": 4.8,
            "reviews": 159,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(978) 534-2422",
            "website": "http://franklinprofessionals.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Franklin%20Professional%20Associates&query_place_id=ChIJoRXBMl7v44kRMhH_T-jvd_U"
        }
    ],
    "Lincoln": [
        {
            "rank": 1,
            "companyName": "Workforce Ready Solutions, LLC",
            "rating": 5.0,
            "reviews": 55,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(401) 526-9090",
            "website": "https://www.wfrsllc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Workforce%20Ready%20Solutions%2C%20LLC&query_place_id=ChIJw67KcJpD5IkRC0b4Y_q6ItI"
        }
    ],
    "Livingston Manor": [
        {
            "rank": 1,
            "companyName": "Upstream Search",
            "rating": 5.0,
            "reviews": 37,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(845) 439-1053",
            "website": "http://www.upstreamsearch.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Upstream%20Search&query_place_id=ChIJDy3j1Muj3IkRMmkvnBIQ83c"
        }
    ],
    "Lynnfield": [
        {
            "rank": 1,
            "companyName": "TRIAD Engineering Corp.",
            "rating": 5.0,
            "reviews": 44,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(781) 273-1880",
            "website": "https://www.triad-eng.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=TRIAD%20Engineering%20Corp.&query_place_id=ChIJZSOdxk6e44kRSOpsXXUl5es"
        }
    ],
    "Manchester": [
        {
            "rank": 1,
            "companyName": "CoreMedical Group",
            "rating": 4.9,
            "reviews": 353,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(800) 995-2673",
            "website": "http://www.coremedicalgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CoreMedical%20Group&query_place_id=ChIJlWgmw4Gs44kRjJtj-sPYHxg"
        }
    ],
    "Marina Del Rey": [
        {
            "rank": 1,
            "companyName": "Fabric Staffing",
            "rating": 4.9,
            "reviews": 36,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.fabricstaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Fabric%20Staffing&query_place_id=ChIJUWgYCIa6woARrav_YYZwDbY"
        }
    ],
    "Maynard": [
        {
            "rank": 1,
            "companyName": "The Panther Group",
            "rating": 4.6,
            "reviews": 178,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(781) 373-6020",
            "website": "http://www.thepanthergrp.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Panther%20Group&query_place_id=ChIJU-amhcKR44kRIgwj3SzDZEI"
        }
    ],
    "Milford": [
        {
            "rank": 1,
            "companyName": "MedStaff Nationwide",
            "rating": 5.0,
            "reviews": 24,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(866) 590-5627",
            "website": "http://www.medstaffnationwide.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=MedStaff%20Nationwide&query_place_id=ChIJacOit6ZZwokRdFtIaag_qiY"
        }
    ],
    "Monsey": [
        {
            "rank": 1,
            "companyName": "Blackbird Recruiting",
            "rating": 5.0,
            "reviews": 232,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(845) 316-5600",
            "website": "http://blackbirdrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Blackbird%20Recruiting&query_place_id=ChIJr8P0TLPnwokRlzi9P5cB_oI"
        }
    ],
    "Montgomery": [
        {
            "rank": 1,
            "companyName": "Marcel McElroy's Job Connection (Top Talent Recruiter)",
            "rating": 4.8,
            "reviews": 27,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(334) 215-3570",
            "website": "http://www.toptalentrecruiter.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Marcel%20McElroy's%20Job%20Connection%20(Top%20Talent%20Recruiter)&query_place_id=ChIJSQlN03SBjogRpfNqen17Gzg"
        }
    ],
    "Naperville": [
        {
            "rank": 1,
            "companyName": "180 Engineering",
            "rating": 4.9,
            "reviews": 124,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(877) 977-0377",
            "website": "https://180engineering.com/?utm_source=google&utm_medium=gbp",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=180%20Engineering&query_place_id=ChIJD79fOvpWDogR4shp05w5sEw"
        }
    ],
    "Nashua": [
        {
            "rank": 1,
            "companyName": "Unique System Skill",
            "rating": 4.8,
            "reviews": 67,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(844) 887-9239",
            "website": "https://www.systemskills.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Unique%20System%20Skill&query_place_id=ChIJF7lamMK544kRUw2nHGOmxas"
        }
    ],
    "Needham": [
        {
            "rank": 1,
            "companyName": "Preferred Staffing & Recruiting, Inc.",
            "rating": 4.8,
            "reviews": 58,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(617) 723-1919",
            "website": "http://www.psandr.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Preferred%20Staffing%20%26%20Recruiting%2C%20Inc.&query_place_id=ChIJgTkLXxiC44kR3uOB4MoU4io"
        }
    ],
    "Needham Heights": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.8,
            "reviews": 119,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(781) 446-6970",
            "website": "https://www.expresspros.com/us-massachusetts-waltham-framingham",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJk5IDNMKD44kRIY6dY4ty3As"
        }
    ],
    "New Bedford": [
        {
            "rank": 1,
            "companyName": "Associated Career Network, LLC",
            "rating": 4.5,
            "reviews": 31,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(508) 990-1118",
            "website": "http://www.acnemploy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Associated%20Career%20Network%2C%20LLC&query_place_id=ChIJLd1p4Lrj5IkRCO-LQhXBJRk"
        }
    ],
    "Newington": [
        {
            "rank": 1,
            "companyName": "Triple Crown Consulting",
            "rating": 4.6,
            "reviews": 39,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(512) 331-8880",
            "website": "http://tripleco.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Triple%20Crown%20Consulting&query_place_id=ChIJyU-YB1SV4okRzdAIjhcaADY"
        }
    ],
    "North Charleston": [
        {
            "rank": 1,
            "companyName": "True Scout Partners",
            "rating": 4.8,
            "reviews": 25,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(877) 506-7050",
            "website": "https://truescoutpartners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=True%20Scout%20Partners&query_place_id=ChIJyQpwoYZz_ogR9NmJNpk1nvY"
        }
    ],
    "Northampton": [
        {
            "rank": 1,
            "companyName": "FIT Staffing",
            "rating": 4.9,
            "reviews": 77,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(413) 800-4087",
            "website": "https://www.fitstaffingsolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=FIT%20Staffing&query_place_id=ChIJK_dqm2vm5okRe77GQ3t_BlA"
        }
    ],
    "Northbrook": [
        {
            "rank": 1,
            "companyName": "Fingerhut Recruiting",
            "rating": 5.0,
            "reviews": 34,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(773) 318-6904",
            "website": "http://www.fingerhutrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Fingerhut%20Recruiting&query_place_id=ChIJcXDnfPDSD4gR2YpzxczlQRE"
        }
    ],
    "Norwell": [
        {
            "rank": 1,
            "companyName": "The Computer Merchant, Ltd.",
            "rating": 4.5,
            "reviews": 39,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(800) 617-6172",
            "website": "http://www.itstaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Computer%20Merchant%2C%20Ltd.&query_place_id=ChIJsR44Nzye5IkRZPRVLTXHEhM"
        }
    ],
    "Norwood": [
        {
            "rank": 1,
            "companyName": "King & Bishop",
            "rating": 5.0,
            "reviews": 42,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(781) 890-8824",
            "website": "https://www.kingbishop.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=King%20%26%20Bishop&query_place_id=ChIJCciZE4V_5IkRfSPeSWOa17k"
        }
    ],
    "Orange": [
        {
            "rank": 1,
            "companyName": "Lingo Staffing, Inc",
            "rating": 4.9,
            "reviews": 67,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(475) 241-6520",
            "website": "https://lingostaffing.com/staffing-agency-connecticut/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Lingo%20Staffing%2C%20Inc&query_place_id=ChIJMwneO0J36IkRHnKTm94dN9c"
        }
    ],
    "Overland Park": [
        {
            "rank": 1,
            "companyName": "nexus IT group",
            "rating": 4.6,
            "reviews": 38,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(913) 815-1750",
            "website": "https://nexusitgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=nexus%20IT%20group&query_place_id=ChIJRQX2r3PswIcRsD6xZZ3LPKY"
        }
    ],
    "Parsippany": [
        {
            "rank": 1,
            "companyName": "Systemart",
            "rating": 4.3,
            "reviews": 48,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(973) 917-4848",
            "website": "https://www.systemart.com/?utm_source=google&utm_medium=GMB&utm_campaign=google_my_business_profile",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Systemart&query_place_id=ChIJub2EahAIw4kRyFF9tLcTgj4"
        }
    ],
    "Pittsburgh": [
        {
            "rank": 1,
            "companyName": "Cogent Infotech",
            "rating": 4.2,
            "reviews": 274,
            "category": "Consultant",
            "wheelchairAccessible": true,
            "phone": "(412) 835-2700",
            "website": "http://www.cogentinfo.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Cogent%20Infotech&query_place_id=ChIJNfQ56DtWNIgRU1wweJX_PAs"
        }
    ],
    "Plainville": [
        {
            "rank": 1,
            "companyName": "Randstad",
            "rating": 4.0,
            "reviews": 175,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 793-2959",
            "website": "https://www.randstadusa.com/local/ct/plainville/440-new-britain-avenue?utm_source=google&utm_medium=organic&utm_campaign=gmb&utm_content=plainville",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Randstad&query_place_id=ChIJ6VDTdQ-x54kRMTb20Y9vPgU"
        }
    ],
    "Plantation": [
        {
            "rank": 1,
            "companyName": "EmpHire Staffing & HR Solutions",
            "rating": 4.6,
            "reviews": 258,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(954) 424-3173",
            "website": "http://www.emphire.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=EmpHire%20Staffing%20%26%20HR%20Solutions&query_place_id=ChIJZbCGmzAG2YgReKR_nJhF2GY"
        }
    ],
    "Playa Vista": [
        {
            "rank": 1,
            "companyName": "CyberCoders",
            "rating": 4.3,
            "reviews": 50,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "website": "https://www.cybercoders.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CyberCoders&query_place_id=ChIJXyVLDaWwwoARrnjKP5msvAA"
        }
    ],
    "Portsmouth": [
        {
            "rank": 1,
            "companyName": "Global Technical Talent, Inc",
            "rating": 4.3,
            "reviews": 133,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "(603) 433-9911",
            "website": "https://gttit.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Global%20Technical%20Talent%2C%20Inc&query_place_id=ChIJBazeb3-_4okRHesV25StzXA"
        }
    ],
    "Poughkeepsie": [
        {
            "rank": 1,
            "companyName": "Ethan Allen Workforce Solutions",
            "rating": 4.2,
            "reviews": 185,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(845) 471-9667",
            "website": "http://www.eaworkforce.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ethan%20Allen%20Workforce%20Solutions&query_place_id=ChIJXS36rnE-3YkR-ICTSakZHRY"
        }
    ],
    "Princeton": [
        {
            "rank": 1,
            "companyName": "SGS Consulting",
            "rating": 4.7,
            "reviews": 1342,
            "category": "Corporate office",
            "wheelchairAccessible": true,
            "phone": "(609) 919-1133",
            "website": "https://www.sgsconsulting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SGS%20Consulting&query_place_id=ChIJC4QeOrDnw4kRS599TP6VbvY"
        }
    ],
    "Reston": [
        {
            "rank": 1,
            "companyName": "Quantum Search Partners",
            "rating": 5.0,
            "reviews": 49,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.quantumsearchpartners.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Quantum%20Search%20Partners&query_place_id=ChIJZU8Q1jFJtokR8kivcxTo8Do"
        }
    ],
    "Richardson": [
        {
            "rank": 1,
            "companyName": "Verstela",
            "rating": 4.9,
            "reviews": 181,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(214) 286-5999",
            "website": "https://www.verstela.com/locations/richardson-tx/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Verstela&query_place_id=ChIJ2YzlQFIfTIYR-eRLgmcvd1U"
        }
    ],
    "San Rafael": [
        {
            "rank": 1,
            "companyName": "Perfect Timing Personnel Services, Inc.",
            "rating": 5.0,
            "reviews": 46,
            "category": "Temp agency",
            "wheelchairAccessible": true,
            "phone": "(415) 461-6450",
            "website": "http://www.perfecttiming.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Perfect%20Timing%20Personnel%20Services%2C%20Inc.&query_place_id=ChIJiVEXVUKahYARBfQIIZ1YFZ8"
        }
    ],
    "Santa Fe": [
        {
            "rank": 1,
            "companyName": "The Hire Firm",
            "rating": 4.6,
            "reviews": 59,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(505) 983-7775",
            "website": "https://thehirefirm.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Hire%20Firm&query_place_id=ChIJkVS9vX9QGIcRsIzu_U3sYdw"
        }
    ],
    "Santa Monica": [
        {
            "rank": 1,
            "companyName": "AMI Network",
            "rating": 4.9,
            "reviews": 75,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(877) 659-0504",
            "website": "http://www.aminetwork.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AMI%20Network&query_place_id=ChIJazSbKEW7woAR3B-hMiozWq4"
        }
    ],
    "Saratoga Springs": [
        {
            "rank": 1,
            "companyName": "Integrated Staffing",
            "rating": 4.5,
            "reviews": 56,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(833) 799-1464",
            "website": "https://integratedstaffingcorp.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Integrated%20Staffing&query_place_id=ChIJm1MlBjE43okRaGWW6uoVR5U"
        }
    ],
    "Seal Beach": [
        {
            "rank": 1,
            "companyName": "The Structures Company, LLC",
            "rating": 4.7,
            "reviews": 171,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(714) 823-3000",
            "website": "http://www.thestructurescompany.com/contact-us/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Structures%20Company%2C%20LLC&query_place_id=ChIJGSt0-pcv3YARh5hiC526YZg"
        }
    ],
    "Shelton": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.5,
            "reviews": 44,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(203) 929-5627",
            "website": "https://www.expresspros.com/us-connecticut-shelton",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJkcY_bBYL6IkRY16KS0rjHtI"
        }
    ],
    "Sheridan": [
        {
            "rank": 1,
            "companyName": "Cirrus Group Consulting",
            "rating": 5.0,
            "reviews": 50,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(301) 367-5475",
            "website": "http://www.cirrusgroupconsulting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Cirrus%20Group%20Consulting&query_place_id=ChIJN5qDaoLx3IAR5GAMUvaqFkw"
        }
    ],
    "Smyrna": [
        {
            "rank": 1,
            "companyName": "Apollo Technical",
            "rating": 4.5,
            "reviews": 30,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(404) 474-4571",
            "website": "https://www.apollotechnical.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Apollo%20Technical&query_place_id=ChIJ4-kqn38J9YgRaRXFd_yTxg4"
        }
    ],
    "South Pasadena": [
        {
            "rank": 1,
            "companyName": "Express Employment Professionals",
            "rating": 4.8,
            "reviews": 442,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(626) 844-3562",
            "website": "https://www.expresspros.com/us-california-south-pasadena",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Express%20Employment%20Professionals&query_place_id=ChIJB_Xsho7EwoAROjc4bKevfZM"
        }
    ],
    "South Plainfield": [
        {
            "rank": 1,
            "companyName": "Clifyx",
            "rating": 4.2,
            "reviews": 22,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "(908) 279-1195",
            "website": "http://www.clifyx.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Clifyx&query_place_id=ChIJM-TxShe4w4kRkVkLMYTckcg"
        }
    ],
    "Spring Valley": [
        {
            "rank": 1,
            "companyName": "Swift Staffing Group",
            "rating": 4.9,
            "reviews": 1159,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(732) 800-7633",
            "website": "https://swiftstaffinggroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Swift%20Staffing%20Group&query_place_id=ChIJ36Z7EMLhwokR3qCJ1fa18Os"
        }
    ],
    "Tigard": [
        {
            "rank": 1,
            "companyName": "SalesFirst Recruiting",
            "rating": 5.0,
            "reviews": 400,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(503) 200-5200",
            "website": "https://www.salesfirstrecruiting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SalesFirst%20Recruiting&query_place_id=ChIJGzQhFPsMlVQR0xwxhglT-V4"
        }
    ],
    "Trevose": [
        {
            "rank": 1,
            "companyName": "NewConfig LLC",
            "rating": 4.9,
            "reviews": 85,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(800) 901-6526",
            "website": "https://newconfig.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=NewConfig%20LLC&query_place_id=ChIJf3_F18GzxokR-Y_4C3dJ34U"
        }
    ],
    "Troy": [
        {
            "rank": 1,
            "companyName": "The Headhunters, LLC",
            "rating": 5.0,
            "reviews": 42,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(248) 343-6027",
            "website": "https://www.theheadhunters-us.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Headhunters%2C%20LLC&query_place_id=ChIJz8b7zSq3JIgRkmVuBhMBiD8"
        }
    ],
    "Valley Village": [
        {
            "rank": 1,
            "companyName": "Outstaff Your Team",
            "rating": 5.0,
            "reviews": 30,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "(855) 669-9161",
            "website": "https://outstaffyourteam.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Outstaff%20Your%20Team&query_place_id=ChIJDwLPM3mXwoARzrZhFJZuQBk"
        }
    ],
    "Wakefield": [
        {
            "rank": 1,
            "companyName": "Treeline Inc.",
            "rating": 4.9,
            "reviews": 226,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(781) 327-8910",
            "website": "https://www.treelineinc.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Treeline%20Inc.&query_place_id=ChIJLxj-BK4M44kRfO7TKR4xmzE"
        }
    ],
    "Wallingford": [
        {
            "rank": 1,
            "companyName": "A. R. Mazzotta Employment Specialists - moved to 160 Broad St, Middletown, CT",
            "rating": 4.6,
            "reviews": 39,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 347-1626",
            "website": "http://www.armazzotta.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=A.%20R.%20Mazzotta%20Employment%20Specialists%20-%20moved%20to%20160%20Broad%20St%2C%20Middletown%2C%20CT&query_place_id=ChIJ0Z4fqqvO54kRAHwkLjQzcp0"
        }
    ],
    "West Hartford": [
        {
            "rank": 1,
            "companyName": "SNI Companies",
            "rating": 4.6,
            "reviews": 50,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 561-1952",
            "website": "http://www.snicompanies.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SNI%20Companies&query_place_id=ChIJEzIxRBCt54kREO6omvar8hI"
        }
    ],
    "Whittier": [
        {
            "rank": 1,
            "companyName": "CloudPersonnel",
            "rating": 4.8,
            "reviews": 202,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(951) 346-4899",
            "website": "http://cloudpersonnel.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CloudPersonnel&query_place_id=ChIJZYzdLjqz3IARM4Nms4pCwus"
        }
    ],
    "Windsor": [
        {
            "rank": 1,
            "companyName": "J. Morrissey & Company",
            "rating": 4.7,
            "reviews": 66,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 925-6000",
            "website": "http://www.jmorrissey.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=J.%20Morrissey%20%26%20Company&query_place_id=ChIJd1D1tGb_5okRUs38hDmdrr0"
        }
    ],
    "Worcester": [
        {
            "rank": 1,
            "companyName": "Partnership Employment",
            "rating": 4.4,
            "reviews": 73,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(508) 770-1777",
            "website": "https://partnershipemployment.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Partnership%20Employment&query_place_id=ChIJLYpb1GEG5IkRnocyiQZBWPs"
        }
    ],
    "Yarmouth": [
        {
            "rank": 1,
            "companyName": "Trueline Talent",
            "rating": 4.8,
            "reviews": 26,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(207) 503-2075",
            "website": "http://www.wearetrueline.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Trueline%20Talent&query_place_id=ChIJ387G9BScskwRevaKt0aMkqA"
        }
    ]
},
  IN: {
    "Bhopal": [
        {
            "rank": 1,
            "companyName": "JBR CONSULTANT",
            "rating": 4.9,
            "reviews": 754,
            "category": "Website designer",
            "wheelchairAccessible": true,
            "phone": "+91 72476 66888",
            "website": "https://jbrconsultant.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=JBR%20CONSULTANT&query_place_id=ChIJI7nvUP5ofDkRz9bxYVVpObs"
        },
        {
            "rank": 2,
            "companyName": "MaMITs",
            "rating": 4.9,
            "reviews": 183,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 86027 41312",
            "website": "https://www.mamits.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=MaMITs&query_place_id=ChIJV6-zTwFCfDkRgDTxfjz68zw"
        },
        {
            "rank": 3,
            "companyName": "ValueX Digital Private Limited - VXD",
            "rating": 4.9,
            "reviews": 179,
            "category": "Marketing agency",
            "wheelchairAccessible": true,
            "phone": "+91 83570 77888",
            "website": "http://www.valuexdigital.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ValueX%20Digital%20Private%20Limited%20-%20VXD&query_place_id=ChIJbanHsgBDfDkRx1x2U0hFPAw"
        },
        {
            "rank": 4,
            "companyName": "Job Update India | Training & Placement Services",
            "rating": 4.9,
            "reviews": 147,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99935 22430",
            "website": "https://jobupdateindia.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Job%20Update%20India%20%7C%20Training%20%26%20Placement%20Services&query_place_id=ChIJMXJJWn-0hGkRczGMVtl5hcE"
        },
        {
            "rank": 5,
            "companyName": "Catalyst for your Career(MMTIJOBS)",
            "rating": 4.9,
            "reviews": 132,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 99938 26661",
            "website": "https://www.mmtijobs.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Catalyst%20for%20your%20Career(MMTIJOBS)&query_place_id=ChIJ_coVDYFDfDkRWtQbZi7_RP4"
        },
        {
            "rank": 6,
            "companyName": "webOdoctor Inc",
            "rating": 4.9,
            "reviews": 109,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 70009 26009",
            "website": "http://webodoctor.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=webOdoctor%20Inc&query_place_id=ChIJ14T4B09CfDkRU9UrGGSwsUY"
        },
        {
            "rank": 7,
            "companyName": "ClimbX Global",
            "rating": 4.9,
            "reviews": 57,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 79870 77914",
            "website": "https://www.climbxglobal.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ClimbX%20Global&query_place_id=ChIJhXp6x71DfDkRuBjwZqQWc7M"
        },
        {
            "rank": 8,
            "companyName": "Talent Leads HR Solutions Pvt Ltd",
            "rating": 4.8,
            "reviews": 236,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 88273 92101",
            "website": "http://www.talentleads.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Talent%20Leads%20HR%20Solutions%20Pvt%20Ltd&query_place_id=ChIJ_SpLnOJpfDkRXMADHBLKq5U"
        },
        {
            "rank": 9,
            "companyName": "CMSIL-INDIA",
            "rating": 4.8,
            "reviews": 120,
            "category": "Certification agency",
            "wheelchairAccessible": true,
            "phone": "+91 79098 21294",
            "website": "http://www.cmsil.org/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CMSIL-INDIA&query_place_id=ChIJOxOvciBpfDkRbQH_zQkL6mQ"
        },
        {
            "rank": 10,
            "companyName": "HL TECH INDIA PRIVATE LIMITED",
            "rating": 4.8,
            "reviews": 101,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 94305 52744",
            "website": "http://www.hltechindia.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HL%20TECH%20INDIA%20PRIVATE%20LIMITED&query_place_id=ChIJn4vnDgBDfDkRLzpcz_T7eRE"
        },
        {
            "rank": 11,
            "companyName": "GenNext India Private Limited - Executive Search| Recruitment| Temp Staffing| Training| Payroll| RPO| Campus Recruitment| C2H",
            "rating": 4.7,
            "reviews": 305,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 755 406 4647",
            "website": "http://www.gennext.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=GenNext%20India%20Private%20Limited%20-%20Executive%20Search%7C%20Recruitment%7C%20Temp%20Staffing%7C%20Training%7C%20Payroll%7C%20RPO%7C%20Campus%20Recruitment%7C%20C2H&query_place_id=ChIJbXhgN7BDfDkRbzTEbnDcpA8"
        },
        {
            "rank": 12,
            "companyName": "\ud835\uddd8\ud835\uddf1\ud835\ude02 \ud835\uddea\ud835\uddf6\ud835\uddff\ud835\uddf2 \ud835\udde2\ud835\ude03\ud835\uddf2\ud835\uddff\ud835\ude00\ud835\uddf2\ud835\uddee\ud835\ude00 \ud835\uddd6\ud835\uddfc\ud835\uddfb\ud835\ude00\ud835\ude02\ud835\uddf9\ud835\ude01\ud835\uddee\ud835\uddfb\ud835\ude01 \ud835\udde3\ud835\ude03\ud835\ude01. \ud835\udddf\ud835\ude01\ud835\uddf1.",
            "rating": 4.7,
            "reviews": 215,
            "category": "Educational consultant",
            "wheelchairAccessible": true,
            "phone": "+91 93008 12637",
            "website": "http://www.edu-wire.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=%F0%9D%97%98%F0%9D%97%B1%F0%9D%98%82%20%F0%9D%97%AA%F0%9D%97%B6%F0%9D%97%BF%F0%9D%97%B2%20%F0%9D%97%A2%F0%9D%98%83%F0%9D%97%B2%F0%9D%97%BF%F0%9D%98%80%F0%9D%97%B2%F0%9D%97%AE%F0%9D%98%80%20%F0%9D%97%96%F0%9D%97%BC%F0%9D%97%BB%F0%9D%98%80%F0%9D%98%82%F0%9D%97%B9%F0%9D%98%81%F0%9D%97%AE%F0%9D%97%BB%F0%9D%98%81%20%F0%9D%97%A3%F0%9D%98%83%F0%9D%98%81.%20%F0%9D%97%9F%F0%9D%98%81%F0%9D%97%B1.&query_place_id=ChIJh5lj46FDfDkRnAiGjaNt4yg"
        },
        {
            "rank": 13,
            "companyName": "NewRise Technosys Pvt. Ltd.",
            "rating": 4.7,
            "reviews": 80,
            "category": "Website designer",
            "wheelchairAccessible": true,
            "phone": "+91 99810 47124",
            "website": "http://nrt.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=NewRise%20Technosys%20Pvt.%20Ltd.&query_place_id=ChIJvaBHBFRCfDkRkCJiK-G2dHc"
        },
        {
            "rank": 14,
            "companyName": "Act T Connect || IT Software Company in Bhopal",
            "rating": 4.7,
            "reviews": 67,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 93291 43659",
            "website": "https://www.acttconnect.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Act%20T%20Connect%20%7C%7C%20IT%20Software%20Company%20in%20Bhopal&query_place_id=ChIJr1cs5RE3fDkRR9Hnq2Dnk_w"
        },
        {
            "rank": 15,
            "companyName": "Techhelper Technologies",
            "rating": 4.7,
            "reviews": 49,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 72230 61806",
            "website": "https://techhelper.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Techhelper%20Technologies&query_place_id=ChIJM095rs5pfDkRlJ9NNCJ8OGA"
        },
        {
            "rank": 16,
            "companyName": "Corporate Steps - SAP ERP & HR Training | IT & Non-IT Recruitment | Placement | Campus | Job Agency | Domestic Hiring",
            "rating": 4.6,
            "reviews": 173,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 76948 05585",
            "website": "http://corporatesteps.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Corporate%20Steps%20-%20SAP%20ERP%20%26%20HR%20Training%20%7C%20IT%20%26%20Non-IT%20Recruitment%20%7C%20Placement%20%7C%20Campus%20%7C%20Job%20Agency%20%7C%20Domestic%20Hiring&query_place_id=ChIJkRNJe11CfDkRgk87ug9uOo8"
        },
        {
            "rank": 17,
            "companyName": "Selection Point",
            "rating": 4.6,
            "reviews": 125,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 755 404 5354",
            "website": "http://www.selectionpoint.org/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Selection%20Point&query_place_id=ChIJ_b1HvWdCfDkRhfRDPsLvWoY"
        },
        {
            "rank": 18,
            "companyName": "Skills And Placement Services",
            "rating": 4.6,
            "reviews": 58,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 95893 73987",
            "website": "https://sapsindia.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Skills%20And%20Placement%20Services&query_place_id=ChIJp4rB5r9nfDkRN1LKSJCrdrI"
        },
        {
            "rank": 19,
            "companyName": "Madhya Pradesh Agency For Promotion Of Information Technology",
            "rating": 4.6,
            "reviews": 23,
            "category": "Government office",
            "wheelchairAccessible": true,
            "phone": "+91 755 251 8300",
            "website": "http://www.mapit.gov.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Madhya%20Pradesh%20Agency%20For%20Promotion%20Of%20Information%20Technology&query_place_id=ChIJuWT42GJCfDkREyY5rrcaNlY"
        },
        {
            "rank": 20,
            "companyName": "Ekluvya Consultancy Services",
            "rating": 4.5,
            "reviews": 768,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 755 492 9910",
            "website": "http://ekluvyaconsultancy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ekluvya%20Consultancy%20Services&query_place_id=ChIJwywkwAhCfDkRd9FL7Yc8V7M"
        }
    ],
    "Indore": [
        {
            "rank": 1,
            "companyName": "Starway Consultancy Services Private Limited",
            "rating": 5.0,
            "reviews": 468,
            "category": "Business management consultant",
            "wheelchairAccessible": true,
            "phone": "+91 91112 66621",
            "website": "http://starwayconsultancy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Starway%20Consultancy%20Services%20Private%20Limited&query_place_id=ChIJE3_PL1L9YjkRGpHop-CgTx8"
        },
        {
            "rank": 2,
            "companyName": "Recooty",
            "rating": 5.0,
            "reviews": 152,
            "category": "Software company",
            "wheelchairAccessible": true,
            "website": "https://recooty.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Recooty&query_place_id=ChIJibYSa2ezgTkRPWHlFwKEHmE"
        },
        {
            "rank": 3,
            "companyName": "Bright Computers & IT Networking services, penta scaning, OTDR Testing, fiber Splic, Rack dressing, Rack installation",
            "rating": 5.0,
            "reviews": 25,
            "category": "Business networking company",
            "wheelchairAccessible": true,
            "phone": "+91 97136 61444",
            "website": "http://www.brightcns.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Bright%20Computers%20%26%20IT%20Networking%20services%2C%20penta%20scaning%2C%20OTDR%20Testing%2C%20fiber%20Splic%2C%20Rack%20dressing%2C%20Rack%20installation&query_place_id=ChIJO3tI39HjYjkRZ4fLXsxJqiM"
        },
        {
            "rank": 4,
            "companyName": "Hiring Point",
            "rating": 4.9,
            "reviews": 126,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 95840 41111",
            "website": "http://www.hiringpoint.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hiring%20Point&query_place_id=ChIJSd6gIz_jYjkRQVeYjNqnOlw"
        },
        {
            "rank": 5,
            "companyName": "Professional Adda",
            "rating": 4.9,
            "reviews": 75,
            "category": "Software training institute",
            "wheelchairAccessible": true,
            "phone": "+91 96447 04844",
            "website": "http://professionaladda.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Professional%20Adda&query_place_id=ChIJBXy17-H9YjkR7HiZs-7shJ4"
        },
        {
            "rank": 6,
            "companyName": "Infidea Consultancy (Connecting Job Seekers With Opportunities)",
            "rating": 4.8,
            "reviews": 1157,
            "category": "Consultant",
            "wheelchairAccessible": true,
            "phone": "+91 78288 58327",
            "website": "https://www.infideaconsultancy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Infidea%20Consultancy%20(Connecting%20Job%20Seekers%20With%20Opportunities)&query_place_id=ChIJ-Tb2CbT9YjkR5wo7Av7UmNw"
        },
        {
            "rank": 7,
            "companyName": "IMS India Manpower Solutions Private Limited",
            "rating": 4.8,
            "reviews": 704,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 75666 61690",
            "website": "http://www.indiamanpowersolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=IMS%20India%20Manpower%20Solutions%20Private%20Limited&query_place_id=ChIJlYP8zEwdYzkRYdtWZrjA5-A"
        },
        {
            "rank": 8,
            "companyName": "Vishal Consultants",
            "rating": 4.8,
            "reviews": 344,
            "category": "Business management consultant",
            "wheelchairAccessible": true,
            "phone": "+91 94254 78421",
            "website": "http://www.vishalconsultants.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Vishal%20Consultants&query_place_id=ChIJV4y4ukD9YjkRfyAuqmf1DGc"
        },
        {
            "rank": 9,
            "companyName": "Bwise Solutions Private Limited",
            "rating": 4.8,
            "reviews": 150,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://www.bwisesolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Bwise%20Solutions%20Private%20Limited&query_place_id=ChIJKQLUsoT9YjkRUir9YYdqxes"
        },
        {
            "rank": 10,
            "companyName": "Talent Forge Academy \u2013 Practical & Placement-Based Digital Marketing Course in Indore",
            "rating": 4.8,
            "reviews": 100,
            "category": "Training center",
            "wheelchairAccessible": true,
            "phone": "+91 92447 99062",
            "website": "http://talentforgeacademy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Talent%20Forge%20Academy%20%E2%80%93%20Practical%20%26%20Placement-Based%20Digital%20Marketing%20Course%20in%20Indore&query_place_id=ChIJ1dTmvsQDYzkRMK56jQElVw8"
        },
        {
            "rank": 11,
            "companyName": "SBJ Jobs & Training",
            "rating": 4.8,
            "reviews": 88,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 89894 60960",
            "website": "http://www.sbjjobs.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SBJ%20Jobs%20%26%20Training&query_place_id=ChIJPxrk1z79YjkRnjElUlx3Iss"
        },
        {
            "rank": 12,
            "companyName": "Human Power Services | Staffing & Job Placement Services in Indore",
            "rating": 4.8,
            "reviews": 68,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 731 499 1346",
            "website": "https://humanpowerservices.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Human%20Power%20Services%20%7C%20Staffing%20%26%20Job%20Placement%20Services%20in%20Indore&query_place_id=ChIJpQ21eFEdYzkR3z4I55b8mb4"
        },
        
        {
            "rank": 14,
            "companyName": "Sourcebae",
            "rating": 4.8,
            "reviews": 41,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99811 92339",
            "website": "https://sourcebae.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sourcebae&query_place_id=ChIJq6qqfqkCYzkRGe5vaHX30kc"
        },
        {
            "rank": 15,
            "companyName": "Kaapro Management Solutions Pvt. Ltd.",
            "rating": 4.7,
            "reviews": 550,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 90980 66669",
            "website": "http://www.kaapro.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Kaapro%20Management%20Solutions%20Pvt.%20Ltd.&query_place_id=ChIJSctUGRX9YjkRGEMErhzI8SQ"
        },
        {
            "rank": 16,
            "companyName": "Young Decade IT Software Solution",
            "rating": 4.7,
            "reviews": 510,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 79876 11372",
            "website": "http://www.youngdecade.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Young%20Decade%20IT%20Software%20Solution&query_place_id=ChIJk9ubXxH9YjkRUHbnZo_pPnY"
        },
        {
            "rank": 17,
            "companyName": "ANG Placement & Staffing Solutions PVT LTD",
            "rating": 4.7,
            "reviews": 168,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 70004 76894",
            "website": "http://www.angplacement.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ANG%20Placement%20%26%20Staffing%20Solutions%20PVT%20LTD&query_place_id=ChIJ9wZ0ZGT9YjkRaMZWlJFHC1w"
        },
        {
            "rank": 18,
            "companyName": "Fast Manpower Solution",
            "rating": 4.7,
            "reviews": 130,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "website": "https://www.facebook.com/FastManpowerSolution/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Fast%20Manpower%20Solution&query_place_id=ChIJtT5J5pP9YjkRyOBI-zZ2WMA"
        },
        {
            "rank": 19,
            "companyName": "Blacksof",
            "rating": 4.7,
            "reviews": 108,
            "category": "Design agency",
            "wheelchairAccessible": true,
            "phone": "+91 93299 32527",
            "website": "http://blacksof.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Blacksof&query_place_id=ChIJSzyg-OgDYzkRLzl7X-bs1PI"
        },
        {
            "rank": 20,
            "companyName": "SG Gurukul - Best Digital Marketing Courses institute In Indore",
            "rating": 4.7,
            "reviews": 99,
            "category": "Training center",
            "wheelchairAccessible": true,
            "phone": "+91 95891 74959",
            "website": "http://www.sggurukul.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SG%20Gurukul%20-%20Best%20Digital%20Marketing%20Courses%20institute%20In%20Indore&query_place_id=ChIJb0-D54r9YjkR7njlXLQaDaI"
        }
    ],
    "Bengaluru": [
        {
            "rank": 1,
            "companyName": "CareerXperts Technologies Private Limited",
            "rating": 4.8,
            "reviews": 688,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "https://careerxperts.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CareerXperts%20Technologies%20Private%20Limited&query_place_id=ChIJTe6VSBgXrjsRbL4tey8eOds"
        },
        {
            "rank": 2,
            "companyName": "JobShop | Best BPO/KPO Job Consultancy Bangalore",
            "rating": 4.6,
            "reviews": 3899,
            "category": "Employment consultant",
            "wheelchairAccessible": true,
            "phone": "+91 99640 80000",
            "website": "https://jobshop.ai/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=JobShop%20%7C%20Best%20BPO%2FKPO%20Job%20Consultancy%20Bangalore&query_place_id=ChIJj7wDAvEWrjsR4ObaNsAH0VM"
        },
        {
            "rank": 3,
            "companyName": "PagarBook",
            "rating": 4.6,
            "reviews": 2490,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 80953 32013",
            "website": "http://pagarbook.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=PagarBook&query_place_id=ChIJfQlloFsUrjsRWM9sOsWmLQE"
        },
        {
            "rank": 4,
            "companyName": "Expora Database Consulting Services Private Limited",
            "rating": 4.6,
            "reviews": 88,
            "category": "Corporate office",
            "wheelchairAccessible": true,
            "phone": "+91 80 2323 2761",
            "website": "http://www.edcs.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Expora%20Database%20Consulting%20Services%20Private%20Limited&query_place_id=ChIJoRks4Zw9rjsRkzuq9N-6a4g"
        },
        {
            "rank": 5,
            "companyName": "PGC Digital - Banashankari",
            "rating": 4.6,
            "reviews": 29,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99000 85366",
            "website": "https://pgcdigital.ai/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=PGC%20Digital%20-%20Banashankari&query_place_id=ChIJtRWZ1E0_rjsR80_V_qMRlEg"
        },
        {
            "rank": 6,
            "companyName": "Epsilon",
            "rating": 4.4,
            "reviews": 1272,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 80675 14000",
            "website": "https://www.epsilon.com/apac",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Epsilon&query_place_id=ChIJB5mV4XAXrjsRqLgZ2RHqjTY"
        },
        {
            "rank": 7,
            "companyName": "Coders Brain Technology Pvt Ltd",
            "rating": 4.4,
            "reviews": 105,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99716 01676",
            "website": "http://www.codersbrain.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Coders%20Brain%20Technology%20Pvt%20Ltd&query_place_id=ChIJvaqq6pcUrjsRq6J9xLKl2fE"
        },
        {
            "rank": 8,
            "companyName": "RJS",
            "rating": 4.3,
            "reviews": 143,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 74060 08555",
            "website": "http://rjstechno.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=RJS&query_place_id=ChIJQULLKgIVrjsRVec8tQaeegU"
        },
        {
            "rank": 9,
            "companyName": "INCRUITER | INTERVIEW AS A SERVICE | AI INTERVIEWER",
            "rating": 4.3,
            "reviews": 137,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 80 4718 7100",
            "website": "https://incruiter.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=INCRUITER%20%7C%20INTERVIEW%20AS%20A%20SERVICE%20%7C%20AI%20INTERVIEWER&query_place_id=ChIJG3LKRxcTrjsRHRGV9_VbwK4"
        },
        {
            "rank": 10,
            "companyName": "TeamPlus Staffing Solution Pvt Ltd",
            "rating": 4.3,
            "reviews": 73,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 95525 43904",
            "website": "https://www.teamplusindia.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=TeamPlus%20Staffing%20Solution%20Pvt%20Ltd&query_place_id=ChIJnfOnrTAVrjsRaJIN0YM5NQc"
        },
        {
            "rank": 11,
            "companyName": "Bangalore Software Services Private Limited",
            "rating": 4.1,
            "reviews": 43,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 80 4006 8114",
            "website": "http://www.bangalorestrategic.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Bangalore%20Software%20Services%20Private%20Limited&query_place_id=ChIJzyXEUDEWrjsRmLKPhqwHZv4"
        },
        {
            "rank": 12,
            "companyName": "Arissa International Private Limited",
            "rating": 4.1,
            "reviews": 31,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 99457 85367",
            "website": "https://arissainternational.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Arissa%20International%20Private%20Limited&query_place_id=ChIJF1Rln1sVrjsRBgJjP0qcq4I"
        }
    ],
    "Leh": [
        
        
        
        
        
        
        
        
        
        
        ],
    "Jabalpur": [
        {
            "rank": 1,
            "companyName": "JP Techno Park - IT Services in Jabalpur.",
            "rating": 5.0,
            "reviews": 44,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 78284 50748",
            "website": "https://jptechnopark.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=JP%20Techno%20Park%20-%20IT%20Services%20in%20Jabalpur.&query_place_id=ChIJOYOuHwCygTkRf7YIPoigsok"
        },
        {
            "rank": 2,
            "companyName": "Optus Edtech [CAT, CMAT,XAT, C++ ,JAVA ,PYTHON, DSA, FSD]",
            "rating": 4.9,
            "reviews": 181,
            "category": "Coaching center",
            "wheelchairAccessible": true,
            "phone": "+91 99268 65740",
            "website": "http://www.optusedu.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Optus%20Edtech%20%5BCAT%2C%20CMAT%2CXAT%2C%20C%2B%2B%20%2CJAVA%20%2CPYTHON%2C%20DSA%2C%20FSD%5D&query_place_id=ChIJabCIlNSxgTkRQU-jQldPMtA"
        },
        {
            "rank": 3,
            "companyName": "Yashsoft Solution \u2013 Website & Mobile App Development in Jabalpur, Madhya Pradesh",
            "rating": 4.9,
            "reviews": 138,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 88188 55762",
            "website": "https://yashsoftsolution.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Yashsoft%20Solution%20%E2%80%93%20Website%20%26%20Mobile%20App%20Development%20in%20Jabalpur%2C%20Madhya%20Pradesh&query_place_id=ChIJlXHObwCtgTkRQejFqr7XpdA"
        },
        {
            "rank": 4,
            "companyName": "DOAGuru InfoSystems - Best Digital Marketing company In Jabalpur | Best Software Company In Jabalpur",
            "rating": 4.9,
            "reviews": 77,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 74409 92424",
            "website": "https://doaguru.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DOAGuru%20InfoSystems%20-%20Best%20Digital%20Marketing%20company%20In%20Jabalpur%20%7C%20Best%20Software%20Company%20In%20Jabalpur&query_place_id=ChIJT-5eGRaxgTkRxyMc7_psGWI"
        },
        {
            "rank": 5,
            "companyName": "AEGIS I-NET\u00a9 IT Trainings | NETWORK SECURITY | CCNA |SERVER | ETHICAL HACKING | HARDWARE NETWORKING | CLOUD-AWS| DEVOPS",
            "rating": 4.8,
            "reviews": 558,
            "category": "Educational consultant",
            "wheelchairAccessible": true,
            "phone": "+91 99771 49888",
            "website": "http://www.aegisinet.org/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AEGIS%20I-NET%C2%A9%20IT%20Trainings%20%7C%20NETWORK%20SECURITY%20%7C%20CCNA%20%7CSERVER%20%7C%20ETHICAL%20HACKING%20%7C%20HARDWARE%20NETWORKING%20%7C%20CLOUD-AWS%7C%20DEVOPS&query_place_id=ChIJBxKuAOSvgTkRwQKBrNlgv3g"
        },
        {
            "rank": 6,
            "companyName": "Pageup Software Services Pvt. Ltd.",
            "rating": 4.7,
            "reviews": 93,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 79094 61009",
            "website": "https://www.pageupsoft.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Pageup%20Software%20Services%20Pvt.%20Ltd.&query_place_id=ChIJpSSq9-SxgTkRBpQ6aeIwO1k"
        },
        {
            "rank": 7,
            "companyName": "Cognic Systems Pvt. Ltd.",
            "rating": 4.6,
            "reviews": 32,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 76126 21204",
            "website": "https://www.cognicsys.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Cognic%20Systems%20Pvt.%20Ltd.&query_place_id=ChIJXSzltHOugTkRZeRA7aZOo7M"
        },
        {
            "rank": 8,
            "companyName": "Salvus App Solutions",
            "rating": 4.6,
            "reviews": 31,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 97130 99668",
            "website": "http://salvusappsolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Salvus%20App%20Solutions&query_place_id=ChIJXcFAAMyxgTkRZwCCGa2Al8c"
        },
        {
            "rank": 9,
            "companyName": "Rozgaarwala.com",
            "rating": 4.5,
            "reviews": 46,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 92018 34289",
            "website": "http://www.rozgaarwala.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Rozgaarwala.com&query_place_id=ChIJRyYzdN6vgTkRaOPiSQCWBdQ"
        },
        ],
    "Mumbai": [
        {
            "rank": 1,
            "companyName": "Topgear consultants pvt ltd",
            "rating": 4.9,
            "reviews": 1966,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 80974 44270",
            "website": "https://topgearconsultants.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Topgear%20consultants%20pvt%20ltd&query_place_id=ChIJxVCTLGS45zsR0EmXPskG_Go"
        },
        {
            "rank": 2,
            "companyName": "Brainhunter \u2013 Recruitment & Job Consultant",
            "rating": 4.9,
            "reviews": 38,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 81044 49302",
            "website": "https://brainhunter.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Brainhunter%20%E2%80%93%20Recruitment%20%26%20Job%20Consultant&query_place_id=ChIJb2_uL1ex5zsRvBz5sUSAh7I"
        },
        {
            "rank": 3,
            "companyName": "Hire Glocal",
            "rating": 4.8,
            "reviews": 1117,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 99301 00033",
            "website": "http://www.hireglocal.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hire%20Glocal&query_place_id=ChIJPyRQ5Ty35zsRBO9SCg8XnwY"
        },
        {
            "rank": 4,
            "companyName": "SGM Placement And Personnel Services",
            "rating": 4.8,
            "reviews": 79,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 22 6791 2236",
            "website": "https://www.sgmplacements.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SGM%20Placement%20And%20Personnel%20Services&query_place_id=ChIJfa8h3UvB5zsRM-D2S-18DvQ"
        },
        {
            "rank": 5,
            "companyName": "Talent Corner H.R. Services Private Limited",
            "rating": 4.7,
            "reviews": 1820,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 22 4297 5100",
            "website": "http://talentcorner.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Talent%20Corner%20H.R.%20Services%20Private%20Limited&query_place_id=ChIJO5A8NMzH5zsRdsC2whxYyls"
        },
        {
            "rank": 6,
            "companyName": "2Soft Solutions Pvt Ltd - HR Consulting. IT Recruitment. Staffing Solutions",
            "rating": 4.7,
            "reviews": 172,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 96195 67966",
            "website": "http://www.2softsolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=2Soft%20Solutions%20Pvt%20Ltd%20-%20HR%20Consulting.%20IT%20Recruitment.%20Staffing%20Solutions&query_place_id=ChIJUUlQ7MzJ5zsR-SpZ6bBBkwI"
        },
        {
            "rank": 7,
            "companyName": "Mayvent Management (Pvt.) Limited",
            "rating": 4.7,
            "reviews": 47,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 85912 49215",
            "website": "http://www.mayvent.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mayvent%20Management%20(Pvt.)%20Limited&query_place_id=ChIJX6RK6rOx5zsRwq_nrOSuV8s"
        },
        {
            "rank": 8,
            "companyName": "Roots Recruitment Services.",
            "rating": 4.4,
            "reviews": 470,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 22 2444 4345",
            "website": "http://rootsrecruitment.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Roots%20Recruitment%20Services.&query_place_id=ChIJbXpYhTLJ5zsR2Q_tUgOsC2U"
        },
        {
            "rank": 9,
            "companyName": "Vira International Placements PVT LTD",
            "rating": 4.3,
            "reviews": 4271,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 22 4056 7777",
            "website": "http://www.virainternational.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Vira%20International%20Placements%20PVT%20LTD&query_place_id=ChIJfdroey3J5zsRNor5rvxR95s"
        },
        {
            "rank": 10,
            "companyName": "Procreator: Global UI UX Design Agency",
            "rating": 4.1,
            "reviews": 48,
            "category": "Design agency",
            "wheelchairAccessible": true,
            "phone": "+91 89299 96900",
            "website": "https://procreator.design/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Procreator%3A%20Global%20UI%20UX%20Design%20Agency&query_place_id=ChIJhywSxDzI5zsRtgHHRO3a3vw"
        }
    ],
    "Hyderabad": [
        {
            "rank": 1,
            "companyName": "Afto Technologies Private Limited",
            "rating": 5.0,
            "reviews": 37,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 98480 00244",
            "website": "http://www.aftotech.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Afto%20Technologies%20Private%20Limited&query_place_id=ChIJB_9LeaOQyzsRz0TVWLSsCes"
        },
        {
            "rank": 2,
            "companyName": "AIVOLV - AI Powered Digital Marketing",
            "rating": 5.0,
            "reviews": 27,
            "category": "Internet marketing service",
            "wheelchairAccessible": true,
            "phone": "+91 90324 29995",
            "website": "https://www.aivolv.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=AIVOLV%20-%20AI%20Powered%20Digital%20Marketing&query_place_id=ChIJlwL9t0-PyzsRmiFBTY6hZzg"
        },
        {
            "rank": 3,
            "companyName": "Hungry Bird Consulting Services Pvt Ltd (Best Job Consultant & Manpower Organization in Hyderabad)",
            "rating": 4.7,
            "reviews": 364,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 40 4851 2456",
            "website": "https://hungrybird.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hungry%20Bird%20Consulting%20Services%20Pvt%20Ltd%20(Best%20Job%20Consultant%20%26%20Manpower%20Organization%20in%20Hyderabad)&query_place_id=ChIJCYC3ZN6YyzsRwRctLVys8Cw"
        },
        {
            "rank": 4,
            "companyName": "Jobskey Consultancy",
            "rating": 4.7,
            "reviews": 54,
            "category": "Consultant",
            "wheelchairAccessible": true,
            "phone": "+91 99898 69330",
            "website": "https://jobskey-consultancy.grexa.site/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Jobskey%20Consultancy&query_place_id=ChIJ1RO6sHiXyzsR8CySrqs6nB8"
        },
        {
            "rank": 5,
            "companyName": "3G HR Services ( Best Job Consultant in Hyderabad)",
            "rating": 4.6,
            "reviews": 595,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 40 4121 9999",
            "website": "https://www.3ghrservices.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=3G%20HR%20Services%20(%20Best%20Job%20Consultant%20in%20Hyderabad)&query_place_id=ChIJaQBPKiSayzsRkos8W-6BOAM"
        },
        {
            "rank": 6,
            "companyName": "SCORELABS INC",
            "rating": 4.6,
            "reviews": 28,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 70136 17191",
            "website": "https://www.scorelabsinc.com/index.html",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SCORELABS%20INC&query_place_id=ChIJj0_5yeaRyzsRtCJ5SLCbWuE"
        },
        {
            "rank": 7,
            "companyName": "Stryde Consulting Services",
            "rating": 4.3,
            "reviews": 510,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 40 4032 5000",
            "website": "http://www.strydeconsulting.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Stryde%20Consulting%20Services&query_place_id=ChIJB_sWdsyQyzsRjw0Gwz13ywU"
        },
        {
            "rank": 8,
            "companyName": "Staffing Aggregator Platform Find 10x more qualified candidates for jobs in just 1 day! | Hirextra",
            "rating": 4.2,
            "reviews": 36,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 40 3575 2983",
            "website": "https://www.hirextra.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Staffing%20Aggregator%20Platform%20Find%2010x%20more%20qualified%20candidates%20for%20jobs%20in%20just%201%20day!%20%7C%20Hirextra&query_place_id=ChIJNRG7IJGNyzsRur8vi6f4NpE"
        }
    ],
    "Delhi / NCR": [
        {
            "rank": 1,
            "companyName": "FUTURE LINKS",
            "rating": 4.9,
            "reviews": 274,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 11 4750 3907",
            "website": "http://future-links.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=FUTURE%20LINKS&query_place_id=ChIJrbkraVcBDTkRnKMbTxpmyIM"
        },
        {
            "rank": 2,
            "companyName": "The Hiring Company",
            "rating": 4.9,
            "reviews": 115,
            "category": "Consultant",
            "wheelchairAccessible": true,
            "website": "https://thehiringcompany.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Hiring%20Company&query_place_id=ChIJZWnTLPEFDTkRKSTmJFCqnEo"
        },
        {
            "rank": 3,
            "companyName": "ASAP Staffing Solutions",
            "rating": 4.8,
            "reviews": 257,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 96548 92449",
            "website": "https://www.asapstaffingsolution.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ASAP%20Staffing%20Solutions&query_place_id=ChIJL-QxFRviDDkRjIXio7nC2X8"
        },
        {
            "rank": 4,
            "companyName": "Digigen Technology Pvt. Ltd.",
            "rating": 4.8,
            "reviews": 118,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 70489 15951",
            "website": "https://www.thedigigen.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Digigen%20Technology%20Pvt.%20Ltd.&query_place_id=ChIJVVVVBc8EDTkRx3ClPWHE8QM"
        },
        {
            "rank": 5,
            "companyName": "Infinity Exists | Recruitment agency in Delhi | Financial & Management recruiters | Job consultancy for Executive Search",
            "rating": 4.8,
            "reviews": 91,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 98735 54734",
            "website": "https://www.infinityexists.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Infinity%20Exists%20%7C%20Recruitment%20agency%20in%20Delhi%20%7C%20Financial%20%26%20Management%20recruiters%20%7C%20Job%20consultancy%20for%20Executive%20Search&query_place_id=ChIJ__-_ayIDDTkRziw2yODCqpI"
        },
        {
            "rank": 6,
            "companyName": "Savanna HR Recruitment agency",
            "rating": 4.7,
            "reviews": 99,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 84473 90935",
            "website": "http://savannahr.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Savanna%20HR%20Recruitment%20agency&query_place_id=ChIJAQAAAAcZDTkRVQcs9-AA4SI"
        },
        {
            "rank": 7,
            "companyName": "Expert Staffing Solutions",
            "rating": 4.6,
            "reviews": 726,
            "category": "BPO placement agency",
            "wheelchairAccessible": true,
            "website": "https://expertstaffingsolutions.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Expert%20Staffing%20Solutions&query_place_id=ChIJMZmgGR7iDDkReWVHHXkxx2A"
        }
    ],
    "Noida / Greater Noida": [
        {
            "rank": 1,
            "companyName": "Careerthon Services",
            "rating": 4.8,
            "reviews": 89,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 99996 53010",
            "website": "https://careerthon.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Careerthon%20Services&query_place_id=ChIJA-dUREnkDDkR5eG7u8F5Icc"
        },
        {
            "rank": 2,
            "companyName": "SAM Manpower & Career Services LLP",
            "rating": 4.6,
            "reviews": 42,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "website": "http://samcareer.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SAM%20Manpower%20%26%20Career%20Services%20LLP&query_place_id=ChIJ0zF69fnvDDkRZc6P8b3KSo8"
        },
        {
            "rank": 3,
            "companyName": "Hirekey Consultancy",
            "rating": 4.5,
            "reviews": 260,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99101 58052",
            "website": "https://hirekey.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hirekey%20Consultancy&query_place_id=ChIJy7R6ZHXvDDkRMapZFwXdfSk"
        },
        {
            "rank": 4,
            "companyName": "MNR Solutions Private Limited",
            "rating": 4.5,
            "reviews": 130,
            "category": "Executive search firm",
            "wheelchairAccessible": true,
            "phone": "+91 85273 91758",
            "website": "https://mnrsolutions.in/contact/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=MNR%20Solutions%20Private%20Limited&query_place_id=ChIJ_blqAlnkDDkRm9N8Sybbnlc"
        },
        {
            "rank": 5,
            "companyName": "Ascent IQ \u2013 Recruitment & Staffing Agency Noida | Delhi NCR",
            "rating": 4.4,
            "reviews": 21,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 85955 81268",
            "website": "http://ascentiqglobal.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ascent%20IQ%20%E2%80%93%20Recruitment%20%26%20Staffing%20Agency%20Noida%20%7C%20Delhi%20NCR&query_place_id=ChIJ_RM-45blDDkR569fNX5tCMo"
        },
        {
            "rank": 6,
            "companyName": "Core Minds Tech Solutions",
            "rating": 4.2,
            "reviews": 5884,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 98701 49204",
            "website": "https://www.coremindstechsolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Core%20Minds%20Tech%20Solutions&query_place_id=ChIJG2JzqQzrDDkR5go4K60mLs0"
        }
    ],
    "Pune": [
        {
            "rank": 1,
            "companyName": "SSquareIT",
            "rating": 4.9,
            "reviews": 220,
            "category": "Software training institute",
            "wheelchairAccessible": true,
            "phone": "+91 70201 03785",
            "website": "http://www.ssquareit.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SSquareIT&query_place_id=ChIJN8kuNSuVwjsRBm5T2PuWJow"
        },
        {
            "rank": 2,
            "companyName": "Shavish HR & Digital Marketing Pvt Ltd- Hadapsar Pune",
            "rating": 4.9,
            "reviews": 170,
            "category": "Employment consultant",
            "wheelchairAccessible": true,
            "phone": "+91 99229 29350",
            "website": "http://shavishgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Shavish%20HR%20%26%20Digital%20Marketing%20Pvt%20Ltd-%20Hadapsar%20Pune&query_place_id=ChIJuwC5TO_BwjsRCfVzbc0CVZA"
        },
        {
            "rank": 3,
            "companyName": "Abilitybase Solutions",
            "rating": 4.9,
            "reviews": 58,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 91588 85834",
            "website": "http://abilitybase.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Abilitybase%20Solutions&query_place_id=ChIJFdcrZybBwjsRWRYtjG085ek"
        },
        {
            "rank": 4,
            "companyName": "YourCorporateLife",
            "rating": 4.8,
            "reviews": 124,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 72767 82449",
            "website": "http://yourcorporatelife.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=YourCorporateLife&query_place_id=ChIJ__8P5rfpwjsRdGMc5ZCayRE"
        },
        {
            "rank": 5,
            "companyName": "Pragmatic Career Solutions",
            "rating": 4.6,
            "reviews": 1269,
            "category": "Employment center",
            "wheelchairAccessible": true,
            "phone": "+91 85549 55784",
            "website": "https://www.pragmaticcareersolutions.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Pragmatic%20Career%20Solutions&query_place_id=ChIJp9eKNfDBwjsRqGLVvXP8po4"
        },
        {
            "rank": 6,
            "companyName": "HR Services",
            "rating": 4.5,
            "reviews": 494,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "website": "https://www.sevenmentor.com/hr-services.php",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HR%20Services&query_place_id=ChIJTQo1WH3AwjsRkJ2rbZ1i2Zs"
        }
    ],
    "Ahmedabad": [
        {
            "rank": 1,
            "companyName": "Smart Lion Private Limited",
            "rating": 4.8,
            "reviews": 293,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 77780 09177",
            "website": "http://www.smartlionjobs.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Smart%20Lion%20Private%20Limited&query_place_id=ChIJ3dBtXPOEXjkR_-vFGYsI7f0"
        },
        {
            "rank": 2,
            "companyName": "Huptech HR Solutions",
            "rating": 4.8,
            "reviews": 117,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99796 98407",
            "website": "https://huptechhrsolutions.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Huptech%20HR%20Solutions&query_place_id=ChIJu1fConWbXjkR0LwqYY7OoZY"
        },
        {
            "rank": 3,
            "companyName": "Harry International Private Limited",
            "rating": 4.7,
            "reviews": 302,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99044 83835",
            "website": "http://www.harryinternational.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Harry%20International%20Private%20Limited&query_place_id=ChIJ-wM1yPOEXjkRsgD_HragRcE"
        },
        {
            "rank": 4,
            "companyName": "Mantrras2Success HR Solutions LLP",
            "rating": 4.7,
            "reviews": 254,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 93139 26687",
            "website": "http://mantras2success.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Mantrras2Success%20HR%20Solutions%20LLP&query_place_id=ChIJ5Xetc4aFXjkR3yOVHpnpib4"
        }
    ],
    "Chandigarh / Mohali": [
        {
            "rank": 1,
            "companyName": "SR Recruiters- Best & Premium Placement , Job Consultant, Recruitment ,Employment Services in Chandigarh,India",
            "rating": 4.9,
            "reviews": 395,
            "category": "Employment consultant",
            "wheelchairAccessible": true,
            "phone": "+91 91151 65576",
            "website": "http://srrecruiters.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=SR%20Recruiters-%20Best%20%26%20Premium%20Placement%20%2C%20Job%20Consultant%2C%20Recruitment%20%2CEmployment%20Services%20in%20Chandigarh%2CIndia&query_place_id=ChIJZf3vz0_zDzkRzks14eyk2-o"
        },
        {
            "rank": 2,
            "companyName": "Simmy Placements - Placement Agency",
            "rating": 4.8,
            "reviews": 219,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 98556 90962",
            "website": "https://plenoemprego.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Simmy%20Placements%20-%20Placement%20Agency&query_place_id=ChIJweuhXDjtDzkR1Xy7jam35WI"
        },
        {
            "rank": 3,
            "companyName": "Job Suraksha - A premium Job Portal",
            "rating": 4.8,
            "reviews": 141,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 172 480 3707",
            "website": "http://www.jobsuraksha.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Job%20Suraksha%20-%20A%20premium%20Job%20Portal&query_place_id=ChIJgSH4P_buDzkR0xSZUmeLvSw"
        },
        {
            "rank": 4,
            "companyName": "Arch Recruiters",
            "rating": 4.6,
            "reviews": 71,
            "category": "Employment consultant",
            "wheelchairAccessible": true,
            "phone": "+91 98889 23477",
            "website": "http://archrecruiters.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Arch%20Recruiters&query_place_id=ChIJVVVVFfbuDzkRnEl7PfH21b0"
        }
    ],
    "Gurugram": [
        {
            "rank": 1,
            "companyName": "A.P. CORPORATE RECRUITMENT SERVICES PVT. LTD. | Best Recruitment Agency for Employers in Gurgaon | Serving Delhi & Noida",
            "rating": 5.0,
            "reviews": 29,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 96675 01792",
            "website": "http://www.apcorporate.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=A.P.%20CORPORATE%20RECRUITMENT%20SERVICES%20PVT.%20LTD.%20%7C%20Best%20Recruitment%20Agency%20for%20Employers%20in%20Gurgaon%20%7C%20Serving%20Delhi%20%26%20Noida&query_place_id=ChIJlT_DWaMZDTkR-CsELG7Gwfs"
        },
        {
            "rank": 2,
            "companyName": "MSK Security And Facilities Management Pvt Ltd",
            "rating": 4.9,
            "reviews": 349,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 99990 15830",
            "website": "https://msk-security.grexa.site/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=MSK%20Security%20And%20Facilities%20Management%20Pvt%20Ltd&query_place_id=ChIJResx7S09DTkRz0jcURgEwjI"
        },
        {
            "rank": 3,
            "companyName": "Changeleaders Consulting Private Limited",
            "rating": 4.8,
            "reviews": 89,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "website": "http://changeleaders.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Changeleaders%20Consulting%20Private%20Limited&query_place_id=ChIJHaV8axMZDTkRgs5djQABSNc"
        },
        {
            "rank": 4,
            "companyName": "TRS Staffing Solutions",
            "rating": 4.7,
            "reviews": 563,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 124 468 4040",
            "website": "http://www.trsstaffing.com/locations/india",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=TRS%20Staffing%20Solutions&query_place_id=ChIJKdr7_ysZDTkRnxbOnLFV0rw"
        }
    ],
    "Jaipur": [
        {
            "rank": 1,
            "companyName": "Virtue Training And Placement Services",
            "rating": 4.6,
            "reviews": 933,
            "category": "Employment consultant",
            "wheelchairAccessible": true,
            "phone": "+91 90010 00040",
            "website": "http://www.virtueplacement.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Virtue%20Training%20And%20Placement%20Services&query_place_id=ChIJOfpdr3O0bTkRSBkXHs4laT4"
        },
        {
            "rank": 2,
            "companyName": "Tallento.ai",
            "rating": 4.4,
            "reviews": 526,
            "category": "Employment center",
            "wheelchairAccessible": true,
            "phone": "+91 97289 87999",
            "website": "https://tallento.ai/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Tallento.ai&query_place_id=ChIJO5N9u1_uDzkRLsVpfb4NRQ0"
        },
        {
            "rank": 3,
            "companyName": "Axcess Consultancy Services",
            "rating": 4.2,
            "reviews": 191,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 94140 68069",
            "website": "http://axcesscareers.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Axcess%20Consultancy%20Services&query_place_id=ChIJt0CCxfCzbTkRVs0AWkABPtE"
        }
    ],
    "Jhansi": [
        {
            "rank": 1,
            "companyName": "OceanX Agency (website App and Mobile App development)",
            "rating": 5.0,
            "reviews": 40,
            "category": "Website designer",
            "wheelchairAccessible": true,
            "phone": "+91 94559 27459",
            "website": "https://www.oceanx.agency/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=OceanX%20Agency%20(website%20App%20and%20Mobile%20App%20development)&query_place_id=ChIJxzuQiCt3dzkRa4JcFny_zbc"
        },
        {
            "rank": 2,
            "companyName": "Incipit Consultancy Services",
            "rating": 4.9,
            "reviews": 28,
            "category": "Corporate office",
            "wheelchairAccessible": true,
            "phone": "+91 92194 54349",
            "website": "https://www.incipit.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Incipit%20Consultancy%20Services&query_place_id=ChIJg48tAtV3dzkRaTT8Gt5-Dxs"
        },
        {
            "rank": 3,
            "companyName": "Binplus Technologies Private Limited",
            "rating": 4.8,
            "reviews": 115,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 80097 65441",
            "website": "https://www.binplus.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Binplus%20Technologies%20Private%20Limited&query_place_id=ChIJm8i0fx53dzkRD65R6kAv4j0"
        }
    ],
    "Kota": [
        {
            "rank": 1,
            "companyName": "Vivacious Techno Management Hub Pvt. Ltd. JOBS IN KOTA , KOTA JOB PLACEMENT",
            "rating": 4.8,
            "reviews": 297,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 98878 85185",
            "website": "http://www.vivacioustech.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Vivacious%20Techno%20Management%20Hub%20Pvt.%20Ltd.%20JOBS%20IN%20KOTA%20%2C%20KOTA%20JOB%20PLACEMENT&query_place_id=ChIJAdXqqtiEbzkRsZP84Ntpmtw"
        },
        {
            "rank": 2,
            "companyName": "First Attempt Kota",
            "rating": 4.6,
            "reviews": 91,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 93520 67932",
            "website": "https://firstattemptgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=First%20Attempt%20Kota&query_place_id=ChIJGV9wvTSbbzkRRZkJK7jjgQs"
        },
        {
            "rank": 3,
            "companyName": "Samyak Computer Classes, Gumanpura Kota",
            "rating": 4.5,
            "reviews": 176,
            "category": "Software training institute",
            "wheelchairAccessible": true,
            "phone": "+91 97722 71081",
            "website": "https://www.samyakinfotech.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Samyak%20Computer%20Classes%2C%20Gumanpura%20Kota&query_place_id=ChIJT28YjsSbbzkRC5ZPeKc7BXQ"
        }
    ],
    "Goa": [
        {
            "rank": 1,
            "companyName": "91HR",
            "rating": 4.8,
            "reviews": 106,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 88061 21926",
            "website": "https://91hr.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=91HR&query_place_id=ChIJr7Ot_I-zvzsRUMf5oCkL264"
        },
        {
            "rank": 2,
            "companyName": "CodeMax IT Solutions Pvt Ltd",
            "rating": 4.4,
            "reviews": 70,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 832 297 6020",
            "website": "http://cdmx.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CodeMax%20IT%20Solutions%20Pvt%20Ltd&query_place_id=ChIJ83gBNOazvzsRKsZNFgXa7B4"
        }
    ],
    "Parel": [
        
        ],
    "Raipur": [
        {
            "rank": 1,
            "companyName": "Sapital Recruitments",
            "rating": 4.8,
            "reviews": 220,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 78800 51817",
            "website": "https://sapitalrecruitments.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sapital%20Recruitments&query_place_id=ChIJNyhBq2ruk48RMGZ04C1sFnk"
        },
        {
            "rank": 2,
            "companyName": "ASAP Job Placement Consultancy",
            "rating": 4.7,
            "reviews": 2009,
            "category": "Consultant",
            "wheelchairAccessible": true,
            "phone": "+91 89625 28896",
            "website": "http://asaprecruitment.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ASAP%20Job%20Placement%20Consultancy&query_place_id=ChIJVUV6623eKDoR3-DpmC3Pt2A"
        }
    ],
    "Ambala Cantt": [
        {
            "rank": 1,
            "companyName": "Surya Jobs Placement Services",
            "rating": 4.7,
            "reviews": 525,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 85698 85905",
            "website": "https://suryajobs.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Surya%20Jobs%20Placement%20Services&query_place_id=ChIJregNsBS3DzkRnjM-BA8RyKM"
        }
    ],
    "Bhubaneswar": [
        {
            "rank": 1,
            "companyName": "Rightfit Resources OPC Pvt. Ltd.",
            "rating": 4.6,
            "reviews": 355,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 96545 53467",
            "website": "http://www.rightfitresources.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Rightfit%20Resources%20OPC%20Pvt.%20Ltd.&query_place_id=ChIJxyNqwR4LGToRlPVZpFP6M9Y"
        }
    ],
    "Billawar": [
        ],
    "Chamba": [
        {
            "rank": 1,
            "companyName": "TopRanko",
            "rating": 5.0,
            "reviews": 60,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 90150 22758",
            "website": "https://www.topranko.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=TopRanko&query_place_id=ChIJ0zgeulzrHDkR3JyreCvptDM"
        }
    ],
    "Chhindwara": [
        {
            "rank": 1,
            "companyName": "MP Rojgar Manpower and Job Placement Services",
            "rating": 4.9,
            "reviews": 64,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 72475 16834",
            "website": "https://sites.google.com/view/mp-rojgar-placement-agency/home",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=MP%20Rojgar%20Manpower%20and%20Job%20Placement%20Services&query_place_id=ChIJ6Si4rhhn1TsRkMYP5o2iZEM"
        }
    ],
    "Coimbatore": [
        {
            "rank": 1,
            "companyName": "Infolexus Solutions",
            "rating": 4.9,
            "reviews": 132,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 90439 19570",
            "website": "https://infolexus.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Infolexus%20Solutions&query_place_id=ChIJQ0pYA-tZqDsRWjhPLbT-vjI"
        }
    ],
    "Dewas": [
        {
            "rank": 1,
            "companyName": "Projection (Training & Placement Company)",
            "rating": 4.7,
            "reviews": 635,
            "category": "Software training institute",
            "wheelchairAccessible": true,
            "phone": "+91 96175 69993",
            "website": "https://www.projectiononline.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Projection%20(Training%20%26%20Placement%20Company)&query_place_id=ChIJIV2ER5sXYzkR_R0NMVJDSDw"
        }
    ],
    "Doda": [
        {
            "rank": 1,
            "companyName": "Yazu Digitals Pvt Ltd \u2014 Best Website Designing Company in Jammu and Kashmir",
            "rating": 4.9,
            "reviews": 43,
            "category": "Website designer",
            "wheelchairAccessible": true,
            "phone": "+91 70064 61754",
            "website": "https://yazudigitals.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Yazu%20Digitals%20Pvt%20Ltd%20%E2%80%94%20Best%20Website%20Designing%20Company%20in%20Jammu%20and%20Kashmir&query_place_id=ChIJKzOjZfWlHTkRk5n59ngx8cg"
        }
    ],
    "Garra": [
        {
            "rank": 1,
            "companyName": "JobSahi- Satpuda Group",
            "rating": 4.8,
            "reviews": 51,
            "category": "Employment center",
            "wheelchairAccessible": true,
            "phone": "+91 62626 04111",
            "website": "https://jobsahi.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=JobSahi-%20Satpuda%20Group&query_place_id=ChIJQW9vYN1ZKjoR7qCSKw2HM0k"
        }
    ],
    "Greater Chennai": [
        {
            "rank": 1,
            "companyName": "CLIQHR Recruitment Services",
            "rating": 4.8,
            "reviews": 38,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 80569 69674",
            "website": "https://www.cliqhr.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=CLIQHR%20Recruitment%20Services&query_place_id=ChIJOa9GtS9nUjoRHB-n1HYeWzw"
        }
    ],
    "Haridwar": [
        {
            "rank": 1,
            "companyName": "S4S Group placement and Manpower services",
            "rating": 4.5,
            "reviews": 245,
            "category": "Consultant",
            "wheelchairAccessible": true,
            "website": "http://www.s4sgroup.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=S4S%20Group%20placement%20and%20Manpower%20services&query_place_id=ChIJL1CKxANJCTkRN-pBIsB0cM8"
        }
    ],
    "Kanpur": [
        {
            "rank": 1,
            "companyName": "IT Resource Hunter Pvt Ltd",
            "rating": 4.1,
            "reviews": 27,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "website": "https://itresourcehunter.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=IT%20Resource%20Hunter%20Pvt%20Ltd&query_place_id=ChIJX13M3OBHnDkRkJXACbVF44k"
        }
    ],
    "Kozhikode": [
        {
            "rank": 1,
            "companyName": "HR Training and SAP HCM in Calicut - IIA HR Academy : Job-Oriented HR Courses for the UAE, other Gulf regions, and India",
            "rating": 4.9,
            "reviews": 42,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 81388 18138",
            "website": "https://hrjobtraining.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=HR%20Training%20and%20SAP%20HCM%20in%20Calicut%20-%20IIA%20HR%20Academy%20%3A%20Job-Oriented%20HR%20Courses%20for%20the%20UAE%2C%20other%20Gulf%20regions%2C%20and%20India&query_place_id=ChIJpXmfvclepjsRzSJimDyrHDc"
        }
    ],
    "Lucknow": [
        {
            "rank": 1,
            "companyName": "Genius Consultant Ltd.",
            "rating": 4.6,
            "reviews": 48,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 522 232 3966",
            "website": "http://www.geniusconsultant.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Genius%20Consultant%20Ltd.&query_place_id=ChIJ1RpYo2X9mzkRN6xxoMUbrXk"
        }
    ],
    "Makroniya": [
        {
            "rank": 1,
            "companyName": "IT Jobs Factory",
            "rating": 4.9,
            "reviews": 23,
            "category": "Employment center",
            "wheelchairAccessible": true,
            "phone": "+91 75823 60093",
            "website": "https://www.itjobsfactory.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=IT%20Jobs%20Factory&query_place_id=ChIJKUvuVvDReDkR0DWxzwC88Rk"
        }
    ],
    "Meerut": [
        {
            "rank": 1,
            "companyName": "Recruiter's job placement agency",
            "rating": 4.9,
            "reviews": 753,
            "category": "Employment consultant",
            "wheelchairAccessible": true,
            "phone": "+91 95201 40625",
            "website": "https://www.facebook.com/share/1C1yQAaPX2/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Recruiter's%20job%20placement%20agency&query_place_id=ChIJ0cgfmh9vDDkR5ifZmu9BbNg"
        }
    ],
    "Nagpur": [
        {
            "rank": 1,
            "companyName": "Sath Outsourcing Services Pvt. Ltd. (Jobsclass)",
            "rating": 4.7,
            "reviews": 652,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 95522 83569",
            "website": "http://www.jobsclass.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Sath%20Outsourcing%20Services%20Pvt.%20Ltd.%20(Jobsclass)&query_place_id=ChIJdcxXzIe_1DsRFBRKv9qsPdo"
        }
    ],
    "Nagve": [
        {
            "rank": 1,
            "companyName": "Creative Capsule",
            "rating": 4.3,
            "reviews": 100,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 91371 77162",
            "website": "http://www.creativecapsule.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Creative%20Capsule&query_place_id=ChIJ2Ybmm7KwvzsRU0OntPeibe4"
        }
    ],
    "Nashik": [
        {
            "rank": 1,
            "companyName": "ResolenT Management Services & Training Center",
            "rating": 4.9,
            "reviews": 182,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 77220 05639",
            "website": "https://resolent.co.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=ResolenT%20Management%20Services%20%26%20Training%20Center&query_place_id=ChIJAz_JFRPr3TsRuJG1Hqcznw8"
        }
    ],
    "Other India Hubs": [
        {
            "rank": 1,
            "companyName": "FREQUENT AMBITION SERVICES",
            "rating": 4.8,
            "reviews": 50,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 88392 60224",
            "website": "https://www.facebook.com/ambcareer",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=FREQUENT%20AMBITION%20SERVICES&query_place_id=ChIJizTOnHVDfDkR-U6tR3DjTEo"
        }
    ],
    "Pahalgam": [
        ],
    "Palika Bazar Magneto mall Road": [
        {
            "rank": 1,
            "companyName": "The Laxmi Job Consultancy",
            "rating": 4.6,
            "reviews": 264,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 91795 16482",
            "website": "http://laxmijobconsultancy.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=The%20Laxmi%20Job%20Consultancy&query_place_id=ChIJHexykGsLKDoRIQL8dIY4M9g"
        }
    ],
    "Perinthalmanna": [
        {
            "rank": 1,
            "companyName": "Simpatico HR consultancy",
            "rating": 4.7,
            "reviews": 29,
            "category": "Human resource consulting",
            "wheelchairAccessible": true,
            "phone": "+91 95448 42260",
            "website": "https://simpaticohr.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Simpatico%20HR%20consultancy&query_place_id=ChIJASPJtq7NpzsRqho7_hJcCys"
        }
    ],
    "Pilern": [
        {
            "rank": 1,
            "companyName": "Kilowott",
            "rating": 4.1,
            "reviews": 54,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 91452 46464",
            "website": "https://www.kilowott.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Kilowott&query_place_id=ChIJD2H50RnBvzsRq-v95kJi_v0"
        }
    ],
    "Prayagraj": [
        {
            "rank": 1,
            "companyName": "VP Recruitment Services",
            "rating": 4.9,
            "reviews": 453,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 63070 34678",
            "website": "http://www.vprecruitmentservices.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=VP%20Recruitment%20Services&query_place_id=ChIJVZMTR7E1hTkRyy05dmfJnxw"
        }
    ],
    "Rusalli Khamkheda": [
        {
            "rank": 1,
            "companyName": "DITS Company India Private Limited",
            "rating": 4.8,
            "reviews": 33,
            "category": "Computer support and services",
            "wheelchairAccessible": true,
            "phone": "+91 97544 06105",
            "website": "http://www.ditscompany.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=DITS%20Company%20India%20Private%20Limited&query_place_id=ChIJ8QDfgT_3ezkROKgy6BEMLsE"
        }
    ],
    "Surat": [
        {
            "rank": 1,
            "companyName": "Cincos Placement Services | Top Recruitment Consultant in Surat | Placement Services In Surat | Job Consultancy In Surat",
            "rating": 4.8,
            "reviews": 316,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 72260 04473",
            "website": "http://www.cincosplacement.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Cincos%20Placement%20Services%20%7C%20Top%20Recruitment%20Consultant%20in%20Surat%20%7C%20Placement%20Services%20In%20Surat%20%7C%20Job%20Consultancy%20In%20Surat&query_place_id=ChIJ36bPvbBP4DsRpj8EWa8FwEE"
        }
    ],
    "Tiruchirappalli": [
        {
            "rank": 1,
            "companyName": "Entrust |Job Guarantee | CCNA | IT Hardware | Ethical Hacking | AWS | Azure | MCSA",
            "rating": 4.5,
            "reviews": 474,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "+91 94455 50437",
            "website": "http://www.entrusttechnoservices.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Entrust%20%7CJob%20Guarantee%20%7C%20CCNA%20%7C%20IT%20Hardware%20%7C%20Ethical%20Hacking%20%7C%20AWS%20%7C%20Azure%20%7C%20MCSA&query_place_id=ChIJg16tp6P1qjsR4HrtjFJ27WI"
        }
    ],
    "Udaipur": [
        {
            "rank": 1,
            "companyName": "WebSenor Private Limited",
            "rating": 4.8,
            "reviews": 423,
            "category": "Software company",
            "wheelchairAccessible": true,
            "phone": "+91 99508 34560",
            "website": "https://www.websenor.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=WebSenor%20Private%20Limited&query_place_id=ChIJD3O09HblZzkRmHKRBUwzm84"
        }
    ],
    "Ujjain": [
        {
            "rank": 1,
            "companyName": "Samyak Computer Classes - Ujjain",
            "rating": 4.9,
            "reviews": 60,
            "category": "Training center",
            "wheelchairAccessible": true,
            "phone": "+91 74138 84777",
            "website": "https://www.samyakinfotech.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Samyak%20Computer%20Classes%20-%20Ujjain&query_place_id=ChIJ_Xqouoh1YzkRgatoNzp9IFE"
        }
    ],
    "Vadodara": [
        {
            "rank": 1,
            "companyName": "Ascendion Engineering Private Limited",
            "rating": 4.3,
            "reviews": 260,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "+91 265 230 2618",
            "website": "http://www.ascendion.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Ascendion%20Engineering%20Private%20Limited&query_place_id=ChIJUQ4uo2vGXzkRcHZLy8sRILo"
        }
    ],
    "Vijayawada": [
        {
            "rank": 1,
            "companyName": "Interview Training And Job Placements Office",
            "rating": 4.7,
            "reviews": 120,
            "category": "Employment center",
            "wheelchairAccessible": true,
            "phone": "+91 73961 11747",
            "website": "http://www.placementsinstitute.in/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Interview%20Training%20And%20Job%20Placements%20Office&query_place_id=ChIJb4ngS6z6NToRk9W1r_t468o"
        }
    ]
}
};

interface HRContactsProps {
  theme: string;
  isLight?: boolean;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function HRContacts({
  theme,
  isLight: isLightProp,
  searchQuery: externalSearchQuery,
  setSearchQuery: setExternalSearchQuery
}: HRContactsProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('APJ');
  const [isRegionsOpen, setIsRegionsOpen] = useState<boolean>(true);

  // Mouse Drag-to-Scroll Handlers for Regions Slider
  const regionsSliderRef = useRef<HTMLDivElement>(null);
  const isRegionsMouseDown = useRef<boolean>(false);
  const regionsStartX = useRef<number>(0);
  const regionsScrollLeft = useRef<number>(0);

  const handleRegionsMouseDown = (e: React.MouseEvent) => {
    if (!regionsSliderRef.current) return;
    isRegionsMouseDown.current = true;
    regionsStartX.current = e.pageX - regionsSliderRef.current.offsetLeft;
    regionsScrollLeft.current = regionsSliderRef.current.scrollLeft;
  };

  const handleRegionsMouseLeave = () => {
    isRegionsMouseDown.current = false;
  };

  const handleRegionsMouseUp = () => {
    isRegionsMouseDown.current = false;
  };

  const handleRegionsMouseMove = (e: React.MouseEvent) => {
    if (!isRegionsMouseDown.current || !regionsSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - regionsSliderRef.current.offsetLeft;
    const walk = (x - regionsStartX.current) * 2;
    regionsSliderRef.current.scrollLeft = regionsScrollLeft.current - walk;
  };

  const handleRegionsWheel = (e: React.WheelEvent) => {
    if (regionsSliderRef.current) {
      regionsSliderRef.current.scrollLeft += e.deltaY;
    }
  };
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('IN');
  const [selectedCityName, setSelectedCityName] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || '');

  // Synchronize external search query changes
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);

  // ACCORDION DROPDOWN STATE: Track open/closed status per city key (Default: Minimized / Collapsed)
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});

  const isLight = theme === 'light';

  // Toggle Accordion Dropdown for a city (Default: Minimized / Collapsed)
  const toggleCityDropdown = (cityKey: string) => {
    setOpenCities(prev => ({
      ...prev,
      [cityKey]: !prev[cityKey]
    }));
  };

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
    if (reg === 'NA') {
      setSelectedCountryCode('US');
    } else if (reg === 'APJ') {
      setSelectedCountryCode('IN');
    } else {
      setSelectedCountryCode('ALL');
    }
    setSelectedCityName('ALL');
  };

  // Handle Country Selection
  const handleCountryClick = (cCode: string) => {
    setSelectedCountryCode(cCode);
    setSelectedCityName('ALL');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegion('APJ');
    setSelectedCountryCode('IN');
    setSelectedCityName('ALL');
    setSearchQuery('');
  };

  return (
    <div className={`p-2 sm:p-6 space-y-6 font-mono select-none ${
      isLight ? 'bg-slate-100 text-slate-900' : 'bg-black text-white'
    }`}>
      
      {/* Top Header Banner with Beta Tag */}
      <header className={`border-2 p-5 md:p-8 transition-all ${isLight ? "bg-white border-slate-200 text-slate-900 shadow-sm" : "bg-zinc-950 border-zinc-800 text-white shadow-2xl"}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2 uppercase ${isLight ? "text-slate-900" : "text-white"}`}>
                <Database className="w-8 h-8 text-white" />
                HR Directories
              </h1>
              <span className="bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-xs tracking-wide shrink-0 font-mono">
                beta
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className={`px-3 py-1.5 border text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 ${isLight ? "border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900" : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white"}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* 1. PRIMARY REGION SELECTOR (Collapsible Right-Slide Bar) */}
        <div className="space-y-4 font-mono">
          <div className="flex items-center gap-2 overflow-hidden">
            {/* ">" Icon Button replacing standard region tabs */}
            <button
              type="button"
              onClick={() => setIsRegionsOpen(!isRegionsOpen)}
              className={`px-3 py-1.5 font-black text-xs uppercase border transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 ${
                isRegionsOpen
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-[2px_2px_0px_0px_#ffffff]'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 shadow-xs'
              }`}
              title={isRegionsOpen ? "Collapse HR region tracks" : "Expand HR region tracks"}
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isRegionsOpen ? 'rotate-90 md:rotate-0' : ''}`} />
              <span className="text-[10px] font-extrabold">REGIONS</span>
            </button>

            {/* Right sliding light-theme container holding all HR region options */}
            <AnimatePresence>
              {isRegionsOpen && (
                <motion.div
                  ref={regionsSliderRef}
                  onMouseDown={handleRegionsMouseDown}
                  onMouseLeave={handleRegionsMouseLeave}
                  onMouseUp={handleRegionsMouseUp}
                  onMouseMove={handleRegionsMouseMove}
                  onWheel={handleRegionsWheel}
                  initial={{ opacity: 0, x: -30, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -30, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-x-auto scrollbar-none flex items-center gap-1.5 p-1 bg-white border-2 border-emerald-400/80 shadow-md rounded-xs shrink-0 whitespace-nowrap cursor-grab active:cursor-grabbing max-w-[calc(100vw-120px)] md:max-w-[calc(100vw-420px)]"
                >
                  {[
                    { id: 'APJ', label: 'APJ (Asia Pacific & India)', icon: '🌏' },
                    { id: 'NA', label: 'NA (North America / US)', icon: '🌎' },
                    { id: 'EMEA', label: 'EMEA (Europe, Mid-East, Africa)', icon: '🌍' },
                    { id: 'LATAM', label: 'LATAM (Latin America)', icon: '🌐' },
                    { id: 'ALL', label: 'All Regions', icon: '🌐' },
                  ].map(reg => {
                    const isSelected = selectedRegion === reg.id;
                    return (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => handleRegionClick(reg.id)}
                        className={`px-2.5 py-1 text-[9.5px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 rounded-xs shrink-0 ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                            : 'bg-white text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950 border border-emerald-200/70'
                        }`}
                      >
                        <span className="text-[10px]">{reg.icon}</span>
                        <span>{reg.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. SUB-CATEGORY COUNTRY PILLS */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-2">Sub-Category Country:</span>
            <button
              type="button"
              onClick={() => handleCountryClick('ALL')}
              className={`px-3 py-1 text-xs font-bold uppercase border transition-all cursor-pointer ${
                selectedCountryCode === 'ALL'
                  ? (isLight ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-white text-black border-white')
                  : (isLight ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white')
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
                    ? (isLight ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-white text-black border-white shadow-[2px_2px_0px_0px_#ffffff]')
                    : (isLight ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100' : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white')
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
                className={`w-full border px-3 py-1.5 text-xs font-mono uppercase focus:outline-none ${isLight ? "bg-white border-slate-300 text-slate-900 focus:border-slate-800" : "bg-black border-zinc-700 text-white focus:border-white"}`}
              >
                <option value="ALL">All Cities / Districts ({availableCities.length})</option>
                {availableCities.map(ci => (
                  <option key={`${ci.countryCode}_${ci.cityName}`} value={ci.cityName}>
                    {ci.flag} {ci.cityName} ({ci.stateName}) {ci.hasData ? `✓ (${ci.totalListings || 'Live'} Agencies)` : '⏳ Scheduled'}
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
                className={`w-full border pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none ${isLight ? "bg-white border-slate-300 text-slate-900 focus:border-slate-800 placeholder-slate-400" : "bg-black border-zinc-700 text-white focus:border-white"}`}
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-400" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN DIRECTORY STREAM & ACCORDION DROPDOWN CITY BARS */}
      <main className="space-y-4">
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

          const cityKey = `${cityConfig.countryCode}_${cityConfig.cityName}`;
          const isDropdownOpen = q !== '' ? true : Boolean(openCities[cityKey]); // Default: Minimized/Collapsed; Auto-expand on search or click

          return (
            <section key={cityKey} className="border-2 border-zinc-800 bg-zinc-950 overflow-hidden">
              
              {/* ACCORDION DROPDOWN CITY BAR HEADER */}
              <button
                type="button"
                onClick={() => toggleCityDropdown(cityKey)}
                className={`w-full p-4 flex items-center justify-between transition cursor-pointer select-none border-2 mb-2 ${
                  isLight 
                    ? 'bg-white border-slate-200 hover:bg-slate-50/80 text-slate-900 shadow-sm hover:border-slate-400' 
                    : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-white shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cityConfig.flag}</span>
                  <div className="text-left font-mono">
                    <h2 className={`text-base font-black uppercase tracking-wide flex items-center gap-2 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      <span>{cityConfig.cityName}</span>
                      <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>({cityConfig.stateName}, {cityConfig.countryName})</span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {cityConfig.hasData ? (
                    <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-500 text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span>{matchedContacts.length} AGENCIES RANKED</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>SCHEDULED EXPANSION</span>
                    </span>
                  )}

                  {/* Dropdown Chevron Arrow Indicator */}
                  <div className={`p-1 border rounded-none ${
                    isLight ? 'border-slate-300 bg-slate-100 text-slate-900' : 'border-zinc-700 bg-black text-white'
                  }`}>
                    {isDropdownOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* COLLAPSIBLE ACCORDION BODY */}
              <AnimatePresence initial={false}>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 md:p-5 overflow-hidden border-x-2 border-b-2 mb-4 ${isLight ? "bg-slate-50/90 border-slate-200" : "bg-zinc-950/90 border-zinc-800"}`}
                  >
                    {/* RENDER VERIFIED DATA CARDS */}
                    {cityConfig.hasData && matchedContacts.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                        {matchedContacts.map((contact) => (
                          <article
                            key={`${contact.rank}-${contact.companyName}`}
                            className={`border-2 transition-all p-5 text-left flex flex-col justify-between relative group ${
                              isLight 
                                ? 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-slate-400 hover:shadow-md' 
                                : 'bg-black border-zinc-800 text-white hover:border-zinc-500 hover:shadow-[4px_4px_0px_0px_#ffffff]'
                            }`}
                          >
                            <div>
                              <div className={`flex items-start justify-between gap-2 border-b pb-3 mb-3 font-mono ${isLight ? "border-slate-200" : "border-zinc-800"}`}>
                                <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${isLight ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
                                  RANK #{contact.rank}
                                </span>
                                <span className={`text-[10px] uppercase border px-2 py-0.5 truncate max-w-[160px] ${isLight ? "border-slate-300 bg-slate-100 text-slate-700" : "border-zinc-800 bg-zinc-900 text-zinc-400"}`}>
                                  {contact.category}
                                </span>
                              </div>

                              <h4 className={`text-lg font-bold leading-snug font-sans mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                                {contact.companyName}
                              </h4>

                              <div className={`flex items-center gap-3 text-xs font-mono mb-4 ${isLight ? "text-slate-600" : "text-zinc-400"}`}>
                                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                  <span>{contact.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{contact.reviews} Reviews</span>
                              </div>
                            </div>

                            <div className="space-y-2 border-t border-zinc-800 pt-3 text-xs font-mono">
                              
                              {/* PHONE NUMBER RULE: Omit completely if missing or empty */}
                              {contact.phone && (
                                <div className={`flex items-center justify-between ${isLight ? "text-slate-700" : "text-zinc-300"}`}>
                                  <span className={`uppercase text-[10px] ${isLight ? "text-slate-500" : "text-zinc-500"}`}>Phone</span>
                                  <a href={`tel:${contact.phone}`} className={`font-bold flex items-center gap-1 ${isLight ? "text-slate-900 hover:text-slate-700" : "text-zinc-200 hover:text-white"}`}>
                                    <Phone className="w-3 h-3 text-zinc-400" />
                                    <span>{contact.phone}</span>
                                  </a>
                                </div>
                              )}

                              {/* WEBSITE PORTAL LINK */}
                              {contact.website ? (
                                <a
                                  href={contact.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full mt-2 py-2 px-3 border font-bold flex items-center justify-between uppercase transition cursor-pointer text-xs ${isLight ? "border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900" : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white"}`}
                                >
                                  <span>Visit Portal / Website</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              ) : contact.mapsLink ? (
                                <a
                                  href={contact.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full mt-2 py-2 px-3 border font-bold flex items-center justify-between uppercase transition cursor-pointer text-xs ${isLight ? "border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900" : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white"}`}
                                >
                                  <span>View Google Maps Listing</span>
                                  <MapPin className="w-3.5 h-3.5" />
                                </a>
                              ) : null}

                              {/* GOOGLE MAPS LINK BUTTON */}
                              {contact.website && contact.mapsLink && (
                                <a
                                  href={contact.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full py-1.5 px-3 border font-bold flex items-center justify-between uppercase transition cursor-pointer text-[10px] ${isLight ? "border-slate-300 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700" : "border-zinc-800 bg-black hover:border-zinc-500 text-zinc-400 hover:text-white"}`}
                                >
                                  <span>Google Maps Location</span>
                                  <MapPin className="w-3 h-3 text-zinc-400" />
                                </a>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {/* RENDER PLACEHOLDER FOR MISSING DATA / UPCOMING COUNTRY & STATE DATA */}
                    {!cityConfig.hasData && (
                      <div className={`border border-dashed p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono ${isLight ? "border-slate-300 bg-white text-slate-900" : "border-zinc-800 bg-black text-white"}`}>
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
                          <span className="px-3 py-1.5 border border-zinc-800 bg-zinc-950 text-zinc-400 text-xs font-bold uppercase">
                            Status: Upcoming Batch
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </main>
    </div>
  );
}
