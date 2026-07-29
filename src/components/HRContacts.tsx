import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Phone, Star, MapPin, Globe, Building, Search, Users, 
  Accessibility, Layers, RefreshCw, Database, ExternalLink, ArrowRight, Check, Zap,
  Compass, Map, Filter, RotateCcw, Clock, AlertCircle, PlusCircle, ChevronDown, ChevronUp
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

// Existing IN and PH Database
const INDIA_PH_DATABASE: Record<string, Record<string, HRContact[]>> = {
  IN: {
    "West Delhi": [
      { rank: 1, companyName: "Career Innovators", rating: 4.6, reviews: 519, phone: "+91 95828 96540", category: "Employment center", wheelchairAccessible: false, website: "" },
      { rank: 2, companyName: "Epic Consultancy", rating: 4.9, reviews: 473, phone: "+91 99712 59325", category: "BPO placement agency", wheelchairAccessible: false, website: "" },
      { rank: 3, companyName: "Success Stories", rating: 4.9, reviews: 335, phone: "+91 98737 06391", category: "BPO placement agency", wheelchairAccessible: false, website: "" },
      { rank: 4, companyName: "Imaginators Consultancy", rating: 4.1, reviews: 365, category: "Consultant", wheelchairAccessible: false, website: "" },
      { rank: 5, companyName: "Smart Steps HR Services", rating: 4.0, reviews: 369, phone: "+91 88262 14244", category: "Consultant", wheelchairAccessible: false, website: "" },
      { rank: 6, companyName: "Ishmeet Consultant Pvt Ltd", rating: 4.4, reviews: 285, phone: "+91 99991 89574", category: "Employment agency", wheelchairAccessible: false, website: "" },
      { rank: 7, companyName: "Gourav Enterprises", rating: 4.6, reviews: 155, phone: "+91 99534 99992", category: "HR consulting", wheelchairAccessible: false, website: "" },
      { rank: 8, companyName: "Unlock Talent Solutions", rating: 5.0, reviews: 125, category: "Corporate office", wheelchairAccessible: false, website: "" },
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
      { rank: 19, companyName: "360 HR Services", rating: 4.7, reviews: 20, category: "Corporate office", wheelchairAccessible: false, website: "" },
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
      { rank: 6, companyName: "Global Staff Connections", rating: 4.6, reviews: 15, category: "Employment agency", wheelchairAccessible: false, website: "http://globalstaffconnections.com/" }
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
      { rank: 10, companyName: "Latte Search", rating: 4.9, reviews: 15, category: "Recruiter", wheelchairAccessible: true, website: "http://www.latte.ph/" },
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
      { rank: 11, companyName: "Workscale Resources Inc", rating: 4.8, reviews: 8, category: "Corporate office", wheelchairAccessible: true, website: "http://www.workscale.ph/" },
      { rank: 12, companyName: "Clear Leadership Consulting", rating: 4.7, reviews: 6, category: "Consultant", wheelchairAccessible: false, website: "https://clearleadershipcoach.com/" }
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
      { rank: 5, companyName: "Lead Resources Management Corp.", rating: 4.6, reviews: 42, category: "Employment agency", wheelchairAccessible: false, website: "http://lead.com.ph/" },
      { rank: 6, companyName: "Done Remotely", rating: 5.0, reviews: 4, category: "BPO company", wheelchairAccessible: false, website: "https://www.doneremotely.com/" },
      { rank: 7, companyName: "Century High HR Incorporated", rating: 4.6, reviews: 8, phone: "+63 992 398 7952", category: "Recruiter", wheelchairAccessible: false, website: "http://www.facebook.com/HRCenturyHigh" },
      { rank: 8, companyName: "PHR-Philippine Human Resource Worldwide", rating: 4.1, reviews: 51, phone: "+63 2 8518 8448", category: "Human resource consulting", wheelchairAccessible: true, website: "http://www.phrwe.com/" },
      { rank: 9, companyName: "Happy World HR and Recruitment", rating: 4.3, reviews: 15, category: "Recruiter", wheelchairAccessible: false, website: "" },
      { rank: 10, companyName: "AristoSourcing", rating: 4.8, reviews: 25, category: "BPO company", wheelchairAccessible: true, website: "https://aristosourcing.com/" },
      { rank: 11, companyName: "KFL Manpower Agency", rating: 4.5, reviews: 14, category: "Employment agency", wheelchairAccessible: false, website: "http://www.kflmanpoweragency.com/" },
      { rank: 12, companyName: "Skills Innovative People Services", rating: 4.6, reviews: 9, category: "Human resource consulting", wheelchairAccessible: false, website: "" },
      { rank: 13, companyName: "HURIS Inc. (HR Innovations)", rating: 4.7, reviews: 20, phone: "+63 2 8871 1234", category: "Human resource consulting", wheelchairAccessible: true, website: "http://www.huris.com.ph/" },
      { rank: 14, companyName: "Newfold Digital Philippines", rating: 4.4, reviews: 30, category: "Corporate office", wheelchairAccessible: true, website: "http://newfold.com/" }
    ]
  }
};

// Raw Directory Database merging US + IN + PH
export const RAW_DIRECTORY_DATABASE: Record<string, Record<string, HRContact[]>> = {
  ...INDIA_PH_DATABASE,
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
            "rank": 7,
            "companyName": "Bedford Staffing",
            "rating": 4.7,
            "reviews": 36,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(323) 297-3022",
            "website": "http://bedfordstaffing.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Bedford%20Staffing&query_place_id=ChIJ43rKIFK5woARpKixKY3Nw90"
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
            "rank": 2,
            "companyName": "U.S. Air Force & Space Force Recruiting",
            "rating": 4.9,
            "reviews": 83,
            "category": "Military recruiting office",
            "wheelchairAccessible": true,
            "phone": "(405) 481-1412",
            "website": "https://www.airforce.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=U.S.%20Air%20Force%20%26%20Space%20Force%20Recruiting&query_place_id=ChIJ75HWHmc8socR_WICv0paJdo"
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
        {
            "rank": 2,
            "companyName": "US Army Recruiting Office Midwest City",
            "rating": 4.8,
            "reviews": 23,
            "category": "Military recruiting office",
            "wheelchairAccessible": true,
            "phone": "(928) 998-8739",
            "website": "https://www.goarmy.com/info.html?iom=BXMK",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=US%20Army%20Recruiting%20Office%20Midwest%20City&query_place_id=ChIJ6fwJsLA9socR8mi7T-9em-M"
        }
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
            "rank": 1,
            "companyName": "PrideStaff",
            "rating": 4.9,
            "reviews": 1022,
            "category": "Employment agency",
            "wheelchairAccessible": true,
            "phone": "(860) 773-0059",
            "website": "https://www.pridestaff.com/hartfordmetrosoutheast/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=PrideStaff&query_place_id=ChIJiW95ibhN5okRpUQ-y_Zueys"
        },
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
            "rank": 1,
            "companyName": "Hospitality Confidential",
            "rating": 5.0,
            "reviews": 176,
            "category": "Recruiter",
            "wheelchairAccessible": true,
            "phone": "(323) 327-3523",
            "website": "http://www.hospitalityconfidential.com/",
            "mapsLink": "https://www.google.com/maps/search/?api=1&query=Hospitality%20Confidential&query_place_id=ChIJCSl42_gelGgR9UKloP9ES7A"
        },
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
}
};

interface HRContactsProps {
  theme: string;
}

export default function HRContacts({ theme }: HRContactsProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('NA');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [selectedCityName, setSelectedCityName] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // ACCORDION DROPDOWN STATE: Track open/closed status per city key
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
    setSelectedRegion('NA');
    setSelectedCountryCode('US');
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
              Verified IT &amp; Tech recruitment agency directory. Explore top-ranked agencies (ranked by ratings and review count &gt; 20), direct website portals, and interactive accordion dropdown city streams.
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
              { id: 'NA', label: 'NA (North America / US)', icon: '🌎' },
              { id: 'APJ', label: 'APJ (Asia Pacific & India)', icon: '🌏' },
              { id: 'EMEA', label: 'EMEA (Europe, Mid-East, Africa)', icon: '🌍' },
              { id: 'LATAM', label: 'LATAM (Latin America)', icon: '🌐' },
              { id: 'ALL', label: 'All Regions', icon: '🌐' },
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
                className="w-full bg-black border border-zinc-700 pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-white font-mono"
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
                className="w-full p-4 flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer select-none border-b border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cityConfig.flag}</span>
                  <div className="text-left font-mono">
                    <h2 className="text-base font-black uppercase text-white tracking-wide flex items-center gap-2">
                      <span>{cityConfig.cityName}</span>
                      <span className="text-xs text-zinc-400 font-normal">({cityConfig.stateName}, {cityConfig.countryName})</span>
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
                  <div className="p-1 border border-zinc-700 bg-black text-white rounded-none">
                    {isDropdownOpen ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </button>

              {/* COLLAPSIBLE ACCORDION BODY */}
              <AnimatePresence initial={false}>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 overflow-hidden"
                  >
                    {/* RENDER VERIFIED DATA CARDS */}
                    {cityConfig.hasData && matchedContacts.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                        {matchedContacts.map((contact) => (
                          <article
                            key={`${contact.rank}-${contact.companyName}`}
                            className="bg-black border-2 border-zinc-800 hover:border-zinc-500 transition-all p-5 text-left flex flex-col justify-between relative group hover:shadow-[4px_4px_0px_0px_#ffffff]"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-3 mb-3 font-mono">
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-black uppercase">
                                  RANK #{contact.rank}
                                </span>
                                <span className="text-[10px] text-zinc-400 uppercase border border-zinc-800 px-2 py-0.5 bg-zinc-900 truncate max-w-[160px]">
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
                              
                              {/* PHONE NUMBER RULE: Omit completely if missing or empty */}
                              {contact.phone && (
                                <div className="flex items-center justify-between text-zinc-300">
                                  <span className="text-zinc-500 uppercase text-[10px]">Phone</span>
                                  <a href={`tel:${contact.phone}`} className="hover:text-white font-bold flex items-center gap-1">
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
                                  className="w-full mt-2 py-2 px-3 border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white font-bold flex items-center justify-between uppercase transition cursor-pointer text-xs"
                                >
                                  <span>Visit Portal / Website</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              ) : contact.mapsLink ? (
                                <a
                                  href={contact.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full mt-2 py-2 px-3 border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white font-bold flex items-center justify-between uppercase transition cursor-pointer text-xs"
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
                                  className="w-full py-1.5 px-3 border border-zinc-800 bg-black hover:border-zinc-500 text-zinc-400 hover:text-white font-bold flex items-center justify-between uppercase transition cursor-pointer text-[10px]"
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
                      <div className="border border-dashed border-zinc-800 bg-black p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
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
