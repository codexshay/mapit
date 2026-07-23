import React, { useState, useEffect } from 'react';
import { 
  Youtube, Search, HelpCircle, Award, CheckCircle2, ExternalLink, 
  BookOpen, Compass, ShieldAlert, Zap, Terminal, ThumbsUp, ChevronRight,
  RefreshCw, Sliders, Globe, Sparkles, Cpu, Book, Check
} from 'lucide-react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import { motion, AnimatePresence } from 'motion/react';
import { CORNER_TIPS } from '../data/librariesData';
import { CHANNELS_POOL } from '../data/youtubeDatabase';

export interface SubCategory {
  skillArea: string;
  teachers: { name: string; url: string }[];
  whyTrust: string;
  suggestedStudy: string;
}

export interface TeacherCategory {
  id: string;
  name: string;
  emoji: string;
  subcategories: SubCategory[];
}

interface YoutubeTeachersProps {
  theme?: string;
  bookmarks?: any[];
  toggleBookmark?: (item: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  selectedCategoryId?: string;
  setSelectedCategoryId?: (id: string) => void;
  highlightedCategoryIds?: string[];
  adviceIndex?: number;
  hideInternalSearch?: boolean;
}

export const TEACHERS_DIRECTORY: TeacherCategory[] = [
    {
      id: 'green-computing',
      name: 'Green Computing & Sustainable IT',
      emoji: '🌱',
      subcategories: [
        {
          skillArea: 'Carbon-Efficient Code & Architecture',
          teachers: [
            { name: 'Green Software Foundation', url: 'https://www.youtube.com/@GreenSoftwareFoundation' },
            { name: 'Climate Tech VC', url: 'https://www.youtube.com/@ClimateTechVC' },
            { name: 'Microsoft Sustainability', url: 'https://www.youtube.com/@Microsoft' }
          ],
          whyTrust: 'Official authority led by GSF, offering consensus-driven patterns for carbon-aware development, spatial/temporal shifting, and resource-minimization guides.',
          suggestedStudy: 'Enroll in the Green Software Practitioner syllabus videos, review Kepler energy metrics sessions, and watch Scaphandre telemetry integrations.'
        },
        {
          skillArea: 'Sustainable Cloud & Hardware Telemetry',
          teachers: [
            { name: 'AWS Events Sustainability', url: 'https://www.youtube.com/@amazonwebservices' },
            { name: 'Google Cloud ESG & Sustainability', url: 'https://www.youtube.com/@GoogleCloudTech' },
            { name: 'CNCF Environmental Sustainability', url: 'https://www.youtube.com/@CNCF' }
          ],
          whyTrust: 'Major hyper-scalers sharing physical data center PUE improvements, virtualized scaling practices, and carbon calculators.',
          suggestedStudy: 'Learn to track Scope 3 carbon offsets, allocate CPU/GPU budgets using Kepler, and optimize container density ratios.'
        }
      ]
    },
    {
      id: 'foundations',
      name: 'Universal IT Foundations',
      emoji: '🖥️',
      subcategories: [
        {
          skillArea: 'Windows, M365, Azure basics',
          teachers: [
            { name: 'Microsoft Learn', url: 'https://www.youtube.com/@MicrosoftLearn' },
            { name: 'Microsoft Azure', url: 'https://www.youtube.com/@MicrosoftAzure' },
            { name: 'Microsoft 365', url: 'https://www.youtube.com/@Microsoft365' }
          ],
          whyTrust: 'Official, role-aligned modules, product demos, certification-friendly.',
          suggestedStudy: 'Start with Microsoft Learn playlists, then labs in Microsoft Learn sandbox. Use for Windows support, M365, Azure, Power Platform.'
        },
        {
          skillArea: 'Networking fundamentals',
          teachers: [
            { name: "Jeremy's IT Lab", url: 'https://www.youtube.com/@JeremysITLab' },
            { name: 'David Bombal Tech', url: 'https://www.youtube.com/@DavidBombal' },
            { name: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck' }
          ],
          whyTrust: 'Very strong learner response on CCNA/networking topics; practical labs and repeated concepts.',
          suggestedStudy: 'Use Jeremy for structured CCNA-style path, David for Packet Tracer/practical, NetworkChuck for motivation + Linux/network basics.'
        },
        {
          skillArea: 'Linux and command line',
          teachers: [
            { name: 'Learn Linux TV', url: 'https://www.youtube.com/@LearnLinuxTV' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
            { name: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck' }
          ],
          whyTrust: 'Structured sysadmin explanations plus long-form crash courses.',
          suggestedStudy: 'Learn commands, users/groups, file permissions, SSH, services, logs, cron, basic Bash.'
        },
        {
          skillArea: 'General IT, security and cloud explainers',
          teachers: [
            { name: 'IBM Technology', url: 'https://www.youtube.com/@IBMTechnology' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
            { name: 'Simplilearn', url: 'https://www.youtube.com/@SimplilearnOfficial' }
          ],
          whyTrust: 'Broad coverage, simple diagrams, good for revision and awareness.',
          suggestedStudy: 'Use for first-pass understanding before vendor documentation or hands-on labs.'
        }
      ]
    },
    {
      id: 'support',
      name: 'IT Support & Desktop Helpdesk',
      emoji: '🛠️',
      subcategories: [
        {
          skillArea: 'Windows troubleshooting, endpoints',
          teachers: [
            { name: 'Microsoft Helps', url: 'https://www.youtube.com/@Microsoft' },
            { name: 'Microsoft Learn', url: 'https://www.youtube.com/@MicrosoftLearn' },
            { name: 'MDM Tech Space', url: 'https://www.youtube.com/@mdmtechspace' }
          ],
          whyTrust: 'Official plus specialist endpoint-management tutorials.',
          suggestedStudy: 'Windows profiles, Event Viewer, drivers, Intune, SCCM/ConfigMgr, troubleshooting workflow.'
        },
        {
          skillArea: 'Service desk tools and ITSM basics',
          teachers: [
            { name: 'ServiceNow Community', url: 'https://www.youtube.com/@ServiceNowCommunity' },
            { name: 'Atlassian', url: 'https://www.youtube.com/@Atlassian' },
            { name: 'Zendesk', url: 'https://www.youtube.com/@Zendesk' }
          ],
          whyTrust: 'Vendor channels; useful for real UI and process demonstrations.',
          suggestedStudy: 'Incidents, requests, SLA, knowledge base, escalation, Jira Service Management/Zendesk workflows.'
        },
        {
          skillArea: 'Hardware support and diagnostics',
          teachers: [
            { name: 'Dell Technologies', url: 'https://www.youtube.com/@Dell' },
            { name: 'HP Support', url: 'https://www.youtube.com/@HPSupport' },
            { name: 'Lenovo Support', url: 'https://www.youtube.com/@Lenovo' }
          ],
          whyTrust: 'Official vendor support channels and product troubleshooting.',
          suggestedStudy: 'BIOS/UEFI, drivers, diagnostics, warranty-support workflow, firmware updates.'
        }
      ]
    },
    {
      id: 'sysadmin',
      name: 'SysAdmin & Infrastructure',
      emoji: '🖥️',
      subcategories: [
        {
          skillArea: 'Windows Server, AD, GPO',
          teachers: [
            { name: 'Microsoft Learn', url: 'https://www.youtube.com/@MicrosoftLearn' },
            { name: "John Savill's Technical Training", url: 'https://www.youtube.com/@NTFAQGuy' },
            { name: 'Server Academy', url: 'https://www.youtube.com/@ServerAcademy' }
          ],
          whyTrust: 'Strong structure for Microsoft infrastructure; John Savill is highly trusted for Azure/Windows architecture.',
          suggestedStudy: 'Active Directory, DNS/DHCP, Group Policy, Windows Server, identity, hybrid admin.'
        },
        {
          skillArea: 'Linux sysadmin',
          teachers: [
            { name: 'Learn Linux TV', url: 'https://www.youtube.com/@LearnLinuxTV' },
            { name: 'tutoriaLinux', url: 'https://www.youtube.com/@tutoriaLinux' },
            { name: 'The Linux Foundation', url: 'https://www.youtube.com/@LinuxFoundation' }
          ],
          whyTrust: 'Clear sysadmin orientation and official open-source ecosystem context.',
          suggestedStudy: 'Packages, services, logs, users, filesystems, SSH, Bash, server hardening.'
        },
        {
          skillArea: 'Virtualization, backup, monitoring',
          teachers: [
            { name: 'VMware', url: 'https://www.youtube.com/@VMware' },
            { name: 'Veeam', url: 'https://www.youtube.com/@Veeam' },
            { name: 'Zabbix', url: 'https://www.youtube.com/@Zabbix' }
          ],
          whyTrust: 'Official/product-focused training, good for tool-specific job readiness.',
          suggestedStudy: 'vSphere concepts, backups, monitoring dashboards, alerting, recovery basics.'
        }
      ]
    },
    {
      id: 'networking',
      name: 'Networking & NOC Collaboration',
      emoji: '📡',
      subcategories: [
        {
          skillArea: 'CCNA and routing/switching',
          teachers: [
            { name: "Jeremy's IT Lab", url: 'https://www.youtube.com/@JeremysITLab' },
            { name: 'David Bombal Tech', url: 'https://www.youtube.com/@DavidBombal' },
            { name: 'Keith Barker', url: 'https://www.youtube.com/@KeithBarker' }
          ],
          whyTrust: 'Excellent structured courses, labs, and practical networking scenarios.',
          suggestedStudy: 'OSI/TCP-IP, subnetting, VLANs, routing, ACLs, NAT, Packet Tracer, troubleshooting.'
        },
        {
          skillArea: 'Packet analysis and NOC monitoring',
          teachers: [
            { name: 'Chris Greer', url: 'https://www.youtube.com/@ChrisGreer' },
            { name: 'Wireshark', url: 'https://www.youtube.com/@Wireshark' },
            { name: 'SolarWinds', url: 'https://www.youtube.com/@SolarWinds' }
          ],
          whyTrust: 'Strong for packets and monitoring workflows.',
          suggestedStudy: 'Wireshark filters, latency, DNS/TCP troubleshooting, dashboards, alert triage.'
        },
        {
          skillArea: 'Firewalls, SD-WAN, security crossover',
          teachers: [
            { name: 'Fortinet', url: 'https://www.youtube.com/@Fortinet' },
            { name: 'Palo Alto Networks LIVEcommunity', url: 'https://www.youtube.com/@paloaltonetworks' },
            { name: 'Cisco', url: 'https://www.youtube.com/@Cisco' }
          ],
          whyTrust: 'Official vendor learning channels for enterprise networking/security tools.',
          suggestedStudy: 'Firewall rules, VPN, logs, policies, high-level architecture and operations.'
        }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Computing Infrastructure',
      emoji: '☁️',
      subcategories: [
        {
          skillArea: 'AWS',
          teachers: [
            { name: 'Amazon Web Services', url: 'https://www.youtube.com/@amazonwebservices' },
            { name: 'AWS Developers', url: 'https://www.youtube.com/@AWSDevelopers' },
            { name: 'Stephane Maarek', url: 'https://www.youtube.com/@StephaneMaarek' },
            { name: 'ExamPro', url: 'https://www.youtube.com/@ExamPro' }
          ],
          whyTrust: 'Official AWS + certification-focused instructors with strong learner trust.',
          suggestedStudy: 'Cloud Practitioner, Solutions Architect basics, IAM, EC2, S3, VPC, CloudWatch, billing.'
        },
        {
          skillArea: 'Microsoft Azure',
          teachers: [
            { name: 'Microsoft Azure', url: 'https://www.youtube.com/@MicrosoftAzure' },
            { name: "John Savill's Technical Training", url: 'https://www.youtube.com/@NTFAQGuy' },
            { name: 'Adam Marczak - Azure for Everyone', url: 'https://www.youtube.com/@AdamMarczakAzure' }
          ],
          whyTrust: 'Official channel plus highly structured independent Azure teachers.',
          suggestedStudy: 'AZ-900, AZ-104, identity, compute, networking, storage, monitoring, governance.'
        },
        {
          skillArea: 'Google Cloud',
          teachers: [
            { name: 'Google Cloud Tech', url: 'https://www.youtube.com/@googlecloudtech' },
            { name: 'Google Cloud', url: 'https://www.youtube.com/@googlecloud' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Official Google engineering demos and long-form course options.',
          suggestedStudy: 'IAM, Compute Engine, Cloud Run, GKE basics, BigQuery, architecture concepts.'
        },
        {
          skillArea: 'Oracle Cloud and multi-cloud',
          teachers: [
            { name: 'Oracle Cloud Infrastructure', url: 'https://www.youtube.com/@OracleLearning' },
            { name: 'Oracle Learning', url: 'https://www.youtube.com/@OracleLearning' }
          ],
          whyTrust: 'Official Oracle learning and cloud updates.',
          suggestedStudy: 'OCI foundations, compute/networking/storage, identity, databases, certification prep.'
        }
      ]
    },
    {
      id: 'security',
      name: 'Cybersecurity, SOC & IAM',
      emoji: '🛡️',
      subcategories: [
        {
          skillArea: 'Security+ and cybersecurity foundations',
          teachers: [
            { name: 'Professor Messer', url: 'https://www.youtube.com/@professormesser' },
            { name: 'IBM Technology', url: 'https://www.youtube.com/@IBMTechnology' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Professor Messer is one of the strongest structured free resources for CompTIA-style prep.',
          suggestedStudy: 'CIA triad, threats, controls, authentication, incident response, risk basics.'
        },
        {
          skillArea: 'SOC, blue team, threat hunting',
          teachers: [
            { name: 'John Hammond', url: 'https://www.youtube.com/@JohnHammondBytes' },
            { name: 'HackerSploit', url: 'https://www.youtube.com/@HackerSploit' },
            { name: 'Black Hills Information Security', url: 'https://www.youtube.com/@BlackHillsInformationSecurity' }
          ],
          whyTrust: 'Hands-on labs, CTF-style learning, and practitioner-friendly security explanations.',
          suggestedStudy: 'SIEM, logs, malware basics, alerts, phishing, investigation, report writing.'
        },
        {
          skillArea: 'IAM and cloud security',
          teachers: [
            { name: 'Microsoft Security', url: 'https://www.youtube.com/@MicrosoftSecurity' },
            { name: 'AWS Security', url: 'https://www.youtube.com/@amazonwebservices' },
            { name: 'Okta', url: 'https://www.youtube.com/@OktaInc' }
          ],
          whyTrust: 'Official vendor channels for identity and cloud security.',
          suggestedStudy: 'MFA, SSO, RBAC, IAM policies, conditional access, zero trust concepts.'
        },
        {
          skillArea: 'GRC, audit, privacy',
          teachers: [
            { name: 'ISACA', url: 'https://www.youtube.com/@ISACAHQ' },
            { name: 'IAPP', url: 'https://www.youtube.com/@iapp' },
            { name: 'NIST', url: 'https://www.youtube.com/@NIST' }
          ],
          whyTrust: 'Institutional/standards-first content, suitable for audit and compliance roles.',
          suggestedStudy: 'Risk, controls, audit evidence, privacy, governance frameworks, standards awareness.'
        }
      ]
    },
    {
      id: 'software',
      name: 'Software Dev & Versioning',
      emoji: '💻',
      subcategories: [
        {
          skillArea: 'Python',
          teachers: [
            { name: 'Apna College (Shradha Khapra)', url: 'https://www.youtube.com/@ApnaCollegeOfficial' },
            { name: 'Corey Schafer', url: 'https://www.youtube.com/@coreyms' },
            { name: 'Programming with Mosh', url: 'https://www.youtube.com/@programmingwithmosh' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
            { name: 'Tech With Tim', url: 'https://www.youtube.com/@techwithtim' }
          ],
          whyTrust: 'Excellent clarity; long-form courses and project-driven learning.',
          suggestedStudy: 'Python fundamentals, OOP, APIs, automation, Flask/Django, testing, projects.'
        },
        {
          skillArea: 'C++ & Systems Programming',
          teachers: [
            { name: 'The Cherno (C++ Series)', url: 'https://www.youtube.com/@TheCherno' },
            { name: 'Apna College (Shradha Khapra)', url: 'https://www.youtube.com/@ApnaCollegeOfficial' },
            { name: 'CodeWithHarry', url: 'https://www.youtube.com/@CodeWithHarry' },
            { name: 'Jenny\'s Lectures CS IT', url: 'https://www.youtube.com/@JennyslecturesCSIT' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Comprehensive modern C++ pointers, memory management, STL, object-oriented programming, and low-level system optimization tutorials.',
          suggestedStudy: 'Master pointers, dynamic memory allocation, STL containers, templates, smart pointers, RAII, and C++11/17/20 features.'
        },
        {
          skillArea: 'JavaScript/frontend',
          teachers: [
            { name: 'The Net Ninja', url: 'https://www.youtube.com/@NetNinja' },
            { name: 'Traversy Media', url: 'https://www.youtube.com/@traversymedia' },
            { name: 'Fireship', url: 'https://www.youtube.com/@Fireship' }
          ],
          whyTrust: 'Clear playlists, project-based tutorials, concise modern web updates.',
          suggestedStudy: 'HTML/CSS/JS, React, TypeScript basics, APIs, deployment, frontend workflows.'
        },
        {
          skillArea: 'Backend, APIs and system basics',
          teachers: [
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
            { name: 'Amigoscode', url: 'https://www.youtube.com/@amigoscode' },
            { name: 'CodeWithMosh', url: 'https://www.youtube.com/@programmingwithmosh' }
          ],
          whyTrust: 'Good long-form learning and practical backend projects.',
          suggestedStudy: 'REST APIs, databases, authentication, Git, testing, deployment.'
        },
        {
          skillArea: 'Git and GitHub',
          teachers: [
            { name: 'GitHub', url: 'https://www.youtube.com/@GitHub' },
            { name: 'The Coding Train', url: 'https://www.youtube.com/@TheCodingTrain' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Official GitHub plus beginner-friendly explanations.',
          suggestedStudy: 'Git basics, branching, pull requests, GitHub Actions basics, portfolio readiness.'
        }
      ]
    },
    {
      id: 'qa',
      name: 'QA, Testing & Quality Engineering',
      emoji: '🧪',
      subcategories: [
        {
          skillArea: 'Manual testing and QA concepts',
          teachers: [
            { name: 'Software Testing Mentor', url: 'https://www.youtube.com/@SoftwareTestingMentor' },
            { name: 'Guru99', url: 'https://www.youtube.com/@Guru99' },
            { name: 'The Testing Academy', url: 'https://www.youtube.com/@TheTestingAcademy' }
          ],
          whyTrust: 'Beginner-friendly explanations and interview-focused testing coverage.',
          suggestedStudy: 'SDLC/STLC, test cases, bug reports, regression, severity/priority, Agile testing.'
        },
        {
          skillArea: 'Automation testing',
          teachers: [
            { name: 'SDET-QA Automation Techie', url: 'https://www.youtube.com/@SDETQA' },
            { name: 'Rahul Shetty Academy', url: 'https://www.youtube.com/@rahulshettyacademy' },
            { name: 'Automation Step by Step', url: 'https://www.youtube.com/@AutomationStepByStep' }
          ],
          whyTrust: 'Structured Selenium/API automation content and common interview patterns.',
          suggestedStudy: 'Selenium, API testing, Postman, Java/Python basics, frameworks, CI integration.'
        },
        {
          skillArea: 'Performance and API testing',
          teachers: [
            { name: 'Postman', url: 'https://www.youtube.com/@Postman' },
            { name: 'BlazeMeter', url: 'https://www.youtube.com/@BlazeMeter' },
            { name: 'Grafana', url: 'https://www.youtube.com/@Grafana' }
          ],
          whyTrust: 'Official tool channels with practical demos.',
          suggestedStudy: 'API collections, load testing, performance basics, metrics and reports.'
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps, SRE & Platforms',
      emoji: '🚀',
      subcategories: [
        {
          skillArea: 'DevOps foundations and projects',
          teachers: [
            { name: 'TechWorld with Nana', url: 'https://www.youtube.com/@TechWorldWithNana' },
            { name: 'KodeKloud', url: 'https://www.youtube.com/@KodeKloud' },
            { name: 'Abhishek Veeramalla', url: 'https://www.youtube.com/@AbhishekVeeramalla' }
          ],
          whyTrust: 'Excellent structured frameworks, demos, and job-ready DevOps paths.',
          suggestedStudy: 'Linux, Git, Docker, Kubernetes, Jenkins, Terraform, CI/CD, monitoring.'
        },
        {
          skillArea: 'Docker and containers',
          teachers: [
            { name: 'Bret Fisher Docker and DevOps', url: 'https://www.youtube.com/@BretFisher' },
            { name: 'Docker', url: 'https://www.youtube.com/@Docker' },
            { name: 'TechWorld with Nana', url: 'https://www.youtube.com/@TechWorldWithNana' }
          ],
          whyTrust: 'Bret Fisher and Docker are strong for real-world container practices.',
          suggestedStudy: 'Dockerfiles, Compose, images, registries, networking, troubleshooting.'
        },
        {
          skillArea: 'Kubernetes and CNCF',
          teachers: [
            { name: 'CNCF (Cloud Native)', url: 'https://www.youtube.com/@CNCF' },
            { name: 'KodeKloud', url: 'https://www.youtube.com/@KodeKloud' },
            { name: 'TechWorld with Nana', url: 'https://www.youtube.com/@TechWorldWithNana' }
          ],
          whyTrust: 'Official CNCF ecosystem plus hands-on courses.',
          suggestedStudy: 'Pods, deployments, services, ingress, config maps, secrets, Helm basics.'
        },
        {
          skillArea: 'Terraform, CI/CD, monitoring',
          teachers: [
            { name: 'HashiCorp', url: 'https://www.youtube.com/@HashiCorp' },
            { name: 'Jenkins', url: 'https://www.youtube.com/@JenkinsCI' },
            { name: 'Grafana', url: 'https://www.youtube.com/@Grafana' }
          ],
          whyTrust: 'Official channels for tools used in production environments.',
          suggestedStudy: 'IaC, pipelines, dashboards, alerting, logs, observability basics.'
        }
      ]
    },
    {
      id: 'data',
      name: 'Data, BI & Analytics',
      emoji: '📊',
      subcategories: [
        {
          skillArea: 'Excel and Power BI',
          teachers: [
            { name: 'Microsoft Power BI', url: 'https://www.youtube.com/@mspowerbi' },
            { name: 'Guy in a Cube', url: 'https://www.youtube.com/@GuyInACube' },
            { name: 'Leila Gharani', url: 'https://www.youtube.com/@LeilaGharani' }
          ],
          whyTrust: 'Official Power BI plus very clear business reporting teachers.',
          suggestedStudy: 'Excel formulas, Power Query, DAX, dashboards, reports, data modeling.'
        },
        {
          skillArea: 'SQL and analytics portfolio',
          teachers: [
            { name: 'Alex The Analyst', url: 'https://www.youtube.com/@AlexTheAnalyst' },
            { name: 'Luke Barousse', url: 'https://www.youtube.com/@LukeBarousse' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Strong data-career orientation and portfolio-driven study paths.',
          suggestedStudy: 'SQL, Excel, Tableau/Power BI, projects, resume/portfolio, job search.'
        },
        {
          skillArea: 'Tableau and visualization',
          teachers: [
            { name: 'Tableau', url: 'https://www.youtube.com/@tableau' },
            { name: 'Andy Kriebel', url: 'https://www.youtube.com/@AndyKriebel' },
            { name: 'Data with Danny', url: 'https://www.youtube.com/@DataWithDanny' }
          ],
          whyTrust: 'Official Tableau + respected visualization/data challenge educators.',
          suggestedStudy: 'Charts, dashboards, storytelling, SQL case studies, visualization best practices.'
        },
        {
          skillArea: 'Google Analytics/Looker Studio',
          teachers: [
            { name: 'Google Analytics', url: 'https://www.youtube.com/@GoogleAnalytics' },
            { name: 'Google Search Central', url: 'https://www.youtube.com/@GoogleSearchCentral' }
          ],
          whyTrust: 'Official Google channels; useful for marketing analytics roles.',
          suggestedStudy: 'GA4, Looker Studio, events, reports, search analytics.'
        }
      ]
    },
    {
      id: 'ai-ml',
      name: 'Data Engineering, Data Science & AI',
      emoji: '🧠',
      subcategories: [
        {
          skillArea: 'Data engineering',
          teachers: [
            { name: 'Data with Zach', url: 'https://www.youtube.com/@DataWithZach' },
            { name: 'Seattle Data Guy', url: 'https://www.youtube.com/@SeattleDataGuy' },
            { name: 'Databricks', url: 'https://www.youtube.com/@Databricks' }
          ],
          whyTrust: 'Practical real-world data engineering and platform-specific content.',
          suggestedStudy: 'Pipelines, warehouses/lakes, Spark, Databricks, Airflow, orchestration, data quality.'
        },
        {
          skillArea: 'Data science and ML',
          teachers: [
            { name: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/@statquest' },
            { name: 'Krish Naik', url: 'https://www.youtube.com/@krishnaik06' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Excellent conceptual clarity; strong student engagement across ML topics.',
          suggestedStudy: 'Statistics, regression/classification, Python ML, model evaluation, projects.'
        },
        {
          skillArea: 'AI/LLM/GenAI',
          teachers: [
            { name: 'DeepLearningAI', url: 'https://www.youtube.com/@Deeplearningai' },
            { name: 'Google for Developers', url: 'https://www.youtube.com/@GoogleDevelopers' },
            { name: 'IBM Technology', url: 'https://www.youtube.com/@IBMTechnology' }
          ],
          whyTrust: 'Trusted institutional and technical explainers for GenAI concepts.',
          suggestedStudy: 'Prompting, embeddings, LLM apps, AI agents, responsible AI, GenAI APIs.'
        }
      ]
    },
    {
      id: 'databases',
      name: 'Databases & Admin',
      emoji: '🗄️',
      subcategories: [
        {
          skillArea: 'SQL Server and Azure data',
          teachers: [
            { name: 'Microsoft SQL Server', url: 'https://www.youtube.com/@Microsoft' },
            { name: 'Microsoft Developer', url: 'https://www.youtube.com/@MicrosoftDeveloper' },
            { name: 'Brent Ozar Unlimited', url: 'https://www.youtube.com/@BrentOzar' }
          ],
          whyTrust: 'Official and respected performance-tuning explanations.',
          suggestedStudy: 'SQL Server, indexing, backups, performance, query tuning, Azure SQL basics.'
        },
        {
          skillArea: 'Oracle and MySQL',
          teachers: [
            { name: 'Oracle Developers', url: 'https://www.youtube.com/@OracleDevelopers' },
            { name: 'Oracle Learning', url: 'https://www.youtube.com/@OracleLearning' },
            { name: 'MySQL', url: 'https://www.youtube.com/@MySQL' }
          ],
          whyTrust: 'Official Oracle/MySQL ecosystem learning.',
          suggestedStudy: 'SQL, database admin, PL/SQL basics, backup/recovery, cloud database concepts.'
        },
        {
          skillArea: 'PostgreSQL and MongoDB',
          teachers: [
            { name: 'Postgres Open', url: 'https://www.youtube.com/@PostgresOpen' },
            { name: 'MongoDB', url: 'https://www.youtube.com/@MongoDB' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' }
          ],
          whyTrust: 'Official/community technical talks and long-form courses.',
          suggestedStudy: 'Postgres admin basics, MongoDB CRUD, indexes, aggregation, Atlas basics.'
        }
      ]
    },
    {
      id: 'business-apps',
      name: 'ERP, CRM & Power Apps',
      emoji: '💼',
      subcategories: [
        {
          skillArea: 'Salesforce',
          teachers: [
            { name: 'Salesforce Developers', url: 'https://www.youtube.com/@salesforcedevs' },
            { name: 'Salesforce Admins', url: 'https://www.youtube.com/@SalesforceAdmins' },
            { name: 'Apex Hours', url: 'https://www.youtube.com/@ApexHours' }
          ],
          whyTrust: 'Official role channels plus practitioner-focused Salesforce sessions.',
          suggestedStudy: 'Admin setup, objects, flows, reports, Apex basics, platform app builder concepts.'
        },
        {
          skillArea: 'ServiceNow',
          teachers: [
            { name: 'ServiceNow Community', url: 'https://www.youtube.com/@ServiceNowCommunity' },
            { name: 'ServiceNow Dev Program', url: 'https://www.youtube.com/@ServiceNowDevProgram' }
          ],
          whyTrust: 'Official/community channels; suitable for CSA and developer learning.',
          suggestedStudy: 'Tables, forms, workflows, catalog items, ITSM, scripting basics.'
        },
        {
          skillArea: 'SAP and ERP',
          teachers: [
            { name: 'SAP Developers', url: 'https://www.youtube.com/@SAPDevelopers' },
            { name: 'SAP Community', url: 'https://www.youtube.com/@SAPCommunity' },
            { name: 'Simplilearn', url: 'https://www.youtube.com/@SimplilearnOfficial' }
          ],
          whyTrust: 'Official SAP dev/community and general ERP explainers.',
          suggestedStudy: 'SAP modules, ABAP/BTP awareness, ERP process flows, FI/MM/SD concepts.'
        },
        {
          skillArea: 'Dynamics, Power Platform',
          teachers: [
            { name: 'Microsoft Power Platform', url: 'https://www.youtube.com/@MicrosoftPowerPlatform' },
            { name: 'Reza Dorrani', url: 'https://www.youtube.com/@RezaDorrani' },
            { name: 'Shane Young', url: 'https://www.youtube.com/@ShaneYoungCloud' }
          ],
          whyTrust: 'Excellent practical Power Apps/Power Automate examples.',
          suggestedStudy: 'Canvas apps, flows, Dataverse, approvals, model-driven apps, dashboards.'
        }
      ]
    },
    {
      id: 'leadership',
      name: 'Business Analysis, Product & Leadership',
      emoji: '🎯',
      subcategories: [
        {
          skillArea: 'Business analysis',
          teachers: [
            { name: 'IIBA', url: 'https://www.youtube.com/@IIBA_Org' },
            { name: 'The BA Guide', url: 'https://www.youtube.com/@TheBAGuide' },
            { name: 'Modern Analyst', url: 'https://www.youtube.com/@IIBA_Org' }
          ],
          whyTrust: 'Best for BA frameworks, requirements, and interview-style role understanding.',
          suggestedStudy: 'Requirements, stakeholder analysis, user stories, process maps, acceptance criteria.'
        },
        {
          skillArea: 'Project and agile management',
          teachers: [
            { name: 'PMI', url: 'https://www.youtube.com/@PMInstitute' },
            { name: 'Scrum.org', url: 'https://www.youtube.com/@ScrumOrg' },
            { name: 'Atlassian', url: 'https://www.youtube.com/@Atlassian' }
          ],
          whyTrust: 'Official standards bodies and tool/process demos.',
          suggestedStudy: 'Project lifecycle, Scrum, Kanban, Jira, risk, stakeholder communication.'
        },
        {
          skillArea: 'Product management',
          teachers: [
            { name: 'Product School', url: 'https://www.youtube.com/@ProductSchool' },
            { name: 'Mind the Product', url: 'https://www.youtube.com/@MindtheProduct' },
            { name: "Lenny's Podcast", url: 'https://www.youtube.com/@LennysPodcast' }
          ],
          whyTrust: 'Strong product thinking and practical product career discussions.',
          suggestedStudy: 'Roadmaps, discovery, metrics, prioritization, PRDs, stakeholder alignment.'
        }
      ]
    },
    {
      id: 'design',
      name: 'UI/UX, Design & Accessibility',
      emoji: '🎨',
      subcategories: [
        {
          skillArea: 'UX principles and research',
          teachers: [
            { name: 'Nielsen Norman Group', url: 'https://www.youtube.com/@NNgroup' },
            { name: 'AJ&Smart', url: 'https://www.youtube.com/@AJSmart' },
            { name: 'Flux Academy', url: 'https://www.youtube.com/@FluxAcademy' }
          ],
          whyTrust: 'NN/g is a leading UX authority; AJ&Smart/Flux are highly practical.',
          suggestedStudy: 'User research, usability testing, design thinking, wireframes, portfolio critique.'
        },
        {
          skillArea: 'Figma and product design',
          teachers: [
            { name: 'Figma', url: 'https://www.youtube.com/@figma' },
            { name: 'Mizko', url: 'https://www.youtube.com/@Mizko' },
            { name: 'DesignCourse', url: 'https://www.youtube.com/@DesignCourse' }
          ],
          whyTrust: 'Official Figma + practical interface/design system teachers.',
          suggestedStudy: 'Components, auto layout, prototypes, responsive UI, design systems.'
        },
        {
          skillArea: 'Accessibility and inclusive design',
          teachers: [
            { name: 'W3C Web Accessibility Initiative', url: 'https://www.youtube.com/@w3c-wai' },
            { name: 'Microsoft Design', url: 'https://www.youtube.com/@MicrosoftDesign' }
          ],
          whyTrust: 'Standards-aligned accessibility and inclusive design resources.',
          suggestedStudy: 'WCAG basics, keyboard navigation, contrast, inclusive product decisions.'
        }
      ]
    },
    {
      id: 'automation-rpa',
      name: 'Automation, RPA & No-Code',
      emoji: '🤖',
      subcategories: [
        {
          skillArea: 'UiPath and RPA',
          teachers: [
            { name: 'UiPath', url: 'https://www.youtube.com/@UiPath' },
            { name: 'Anders Jensen', url: 'https://www.youtube.com/@AndersJensenRPA' },
            { name: 'Automation Anywhere', url: 'https://www.youtube.com/@AutomationAnywhere' }
          ],
          whyTrust: 'Official RPA channels plus highly practical independent automation tutorials.',
          suggestedStudy: 'Selectors, workflows, bots, queues, exception handling, RPA projects.'
        },
        {
          skillArea: 'Power Automate and Power Apps',
          teachers: [
            { name: 'Microsoft Power Platform', url: 'https://www.youtube.com/@MicrosoftPowerPlatform' },
            { name: 'Reza Dorrani', url: 'https://www.youtube.com/@RezaDorrani' },
            { name: 'Shane Young', url: 'https://www.youtube.com/@ShaneYoungCloud' }
          ],
          whyTrust: 'Strong hands-on tutorials and real business workflows.',
          suggestedStudy: 'Power Automate, Power Apps, approvals, connectors, Dataverse, automation use cases.'
        },
        {
          skillArea: 'n8n, Make, Zapier',
          teachers: [
            { name: 'n8n', url: 'https://www.youtube.com/@n8n-io' },
            { name: 'Make', url: 'https://www.youtube.com/@MakeCom' },
            { name: 'Zapier', url: 'https://www.youtube.com/@Zapier' }
          ],
          whyTrust: 'Official workflow automation channels.',
          suggestedStudy: 'Triggers, API calls, webhooks, error handling, workflow documentation.'
        }
      ]
    }
  ];

// Selection Framework criteria from page 1 of the PDF
export const SELECTION_CRITERIA = [
  {
    id: 'framework',
    title: 'Study Framework Quality',
    desc: 'Does the teacher provide a playlist or course sequence from basics to projects/interview/exam prep?',
    color: 'border-l-[#10b981]'
  },
  {
    id: 'clarity',
    title: 'Explanation Clarity',
    desc: 'Are concepts explained using visuals, labs, examples, analogies, or troubleshooting steps?',
    color: 'border-l-indigo-400'
  },
  {
    id: 'readiness',
    title: 'Hands-on Readiness',
    desc: 'Does the learner actually build, configure, query, deploy, troubleshoot or document something?',
    color: 'border-l-amber-400'
  },
  {
    id: 'trust',
    title: 'Trust Signal',
    desc: 'Official vendor/institution status, recognized instructor, community reputation, public comments, and recurring high-view videos.',
    color: 'border-l-cyan-400'
  },
  {
    id: 'engagement',
    title: 'Engagement Sanity Check',
    desc: 'Prefer videos/playlists with healthy likes/views/comments relative to niche size. Avoid channels that only sell courses without clear free learning value.',
    color: 'border-l-pink-400'
  },
  {
    id: 'recency',
    title: 'Recency Check',
    desc: 'For fast-changing tools - cloud, security, AI, DevOps - verify content from the last 12-24 months unless it is fundamentals-only.',
    color: 'border-l-emerald-400'
  }
];

// MapIT Learning routes from PDF Page 6/7
export const LEARNING_ROUTES = [
  {
    path: 'Entry IT Support',
    stack: 'Microsoft Learn + Microsoft 365 + Professor Messer + ServiceNow Community',
    skills: 'Windows/M365 troubleshooting, ticketing, ITIL/SLA basics, security basics'
  },
  {
    path: 'Network Support / NOC',
    stack: "Jeremy's IT Lab + David Bombal + Chris Greer + Cisco",
    skills: 'Networking fundamentals, Packet Tracer, Wireshark, monitoring, firewall basics'
  },
  {
    path: 'Cloud Support',
    stack: 'John Savill + AWS + Google Cloud Tech + Stephane Maarek / ExamPro',
    skills: 'Cloud fundamentals, IAM, storage/compute/networking, monitoring, billing, certification prep'
  },
  {
    path: 'SOC / Cybersecurity',
    stack: 'Professor Messer + John Hammond + Microsoft Security + Black Hills InfoSec',
    skills: 'Security foundations, logs, alert triage, incident response, threat labs'
  },
  {
    path: 'Data / BI',
    stack: 'Alex The Analyst + Guy in a Cube + Microsoft Power BI + freeCodeCamp.org',
    skills: 'SQL, Excel, dashboards, Power BI, portfolio projects'
  },
  {
    path: 'DevOps',
    stack: 'TechWorld with Nana + KodeKloud + Bret Fisher + HashiCorp / CNCF',
    skills: 'Linux, Git, Docker, Kubernetes, Jenkins, Terraform, CI/CD, monitoring'
  },
  {
    path: 'Automation / Low-code',
    stack: 'Microsoft Power Platform + Reza Dorrani + UiPath + n8n',
    skills: 'Business process automation, Power Automate, RPA, workflow integrations'
  }
];

// Helper function to map teacher names & subject areas to highly relevant, direct YouTube videos or playlists
export function getDirectVideoUrl(teacherName: string, skillArea: string, fallbackUrl: string): string {
  const name = teacherName.trim();
  let topic = skillArea.trim();

  // Clean or map the topic to be super high-intent for YouTube search
  const lowerTopic = topic.toLowerCase();
  if (lowerTopic.includes('service desk') || lowerTopic.includes('itsm')) {
    topic = "Jira Service Management ITSM";
  } else if (lowerTopic.includes('windows server')) {
    topic = "Windows Server Active Directory administration";
  } else if (lowerTopic.includes('ccna') || lowerTopic.includes('networking')) {
    topic = "CCNA Networking course";
  } else if (lowerTopic.includes('packet analysis')) {
    topic = "Wireshark Packet Analysis tutorial";
  } else if (lowerTopic.includes('aws')) {
    topic = "AWS Cloud Practitioner training";
  } else if (lowerTopic.includes('azure')) {
    topic = "Azure Fundamentals AZ-900 AZ-104";
  } else if (lowerTopic.includes('google cloud') || lowerTopic.includes('gcp')) {
    topic = "Google Cloud Associate Engineer";
  } else if (lowerTopic.includes('security+')) {
    topic = "CompTIA Security+ SY0-701";
  } else if (lowerTopic.includes('soc')) {
    topic = "SOC Analyst Blue Team training";
  } else if (lowerTopic.includes('python')) {
    topic = "Python Programming tutorial";
  } else if (lowerTopic.includes('javascript')) {
    topic = "JavaScript tutorial";
  } else if (lowerTopic.includes('manual testing')) {
    topic = "Manual Software Testing QA course";
  } else if (lowerTopic.includes('automation testing')) {
    topic = "Automation Testing Selenium";
  } else if (lowerTopic.includes('devops')) {
    topic = "DevOps Roadmap and tools";
  } else if (lowerTopic.includes('docker')) {
    topic = "Docker tutorial for beginners";
  } else if (lowerTopic.includes('kubernetes')) {
    topic = "Kubernetes tutorial";
  } else if (lowerTopic.includes('terraform')) {
    topic = "Terraform infrastructure as code";
  } else if (lowerTopic.includes('sql')) {
    topic = "SQL tutorial for data analytics";
  } else if (lowerTopic.includes('power bi')) {
    topic = "Power BI tutorial";
  } else if (lowerTopic.includes('excel')) {
    topic = "Microsoft Excel data analytics";
  } else if (lowerTopic.includes('dynamics') || lowerTopic.includes('power apps')) {
    topic = "Microsoft Power Apps tutorial";
  } else if (lowerTopic.includes('figma')) {
    topic = "Figma UI UX tutorial";
  } else if (lowerTopic.includes('carbon') || lowerTopic.includes('sustainability')) {
    topic = "Green Software carbon telemetry";
  }

  // Construct the search query
  const searchQuery = `${name} ${topic}`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
}

export function getCategoryColor(catId: string): string {
  switch (catId) {
    case 'green-computing': return '#22c55e'; // green / sustainability
    case 'foundations': return '#3b82f6'; // blue
    case 'support': return '#38bdf8'; // sky blue
    case 'sysadmin': return '#a855f7'; // purple
    case 'networking': return '#10b981'; // emerald
    case 'cloud': return '#06b6d4'; // cyan
    case 'security': return '#ef4444'; // red
    case 'software': return '#ec4899'; // pink
    case 'qa': return '#d946ef'; // fuchsia
    case 'devops': return '#6366f1'; // indigo
    case 'data': return '#f59e0b'; // amber
    case 'ai-ml': return '#f43f5e'; // rose
    case 'databases': return '#14b8a6'; // teal
    case 'business-apps': return '#8b5cf6'; // violet
    case 'leadership': return '#64748b'; // slate
    case 'design': return '#e11d48'; // rose
    case 'automation-rpa': return '#0ea5e9'; // sky
    default: return '#10b981';
  }
}

export default function YoutubeTeachers({
  theme = 'dark',
  bookmarks = [],
  toggleBookmark,
  isBookmarked,
  searchQuery: searchQueryProp,
  setSearchQuery: setSearchQueryProp,
  selectedCategoryId: selectedCategoryIdProp,
  setSelectedCategoryId: setSelectedCategoryIdProp,
  highlightedCategoryIds = [],
  adviceIndex = 0,
  hideInternalSearch = false
}: YoutubeTeachersProps = {}) {
  const isLight = theme === 'light';
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const searchQuery = searchQueryProp !== undefined ? searchQueryProp : localSearchQuery;
  const setSearchQuery = setSearchQueryProp || setLocalSearchQuery;

  const [localSelectedCategoryId, setLocalSelectedCategoryId] = useState('foundations');
  const selectedCategoryId = selectedCategoryIdProp !== undefined ? selectedCategoryIdProp : localSelectedCategoryId;
  const setSelectedCategoryId = setSelectedCategoryIdProp || setLocalSelectedCategoryId;

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllSubcategories, setShowAllSubcategories] = useState<boolean>(false);

  // Dynamic recommendations Feed & Resync States
  const [skillAreaFeeds, setSkillAreaFeeds] = useState<Record<string, { name: string; url: string }[]>>({});
  const [activeSettingsSkillArea, setActiveSettingsSkillArea] = useState<string | null>(null);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(['framework', 'clarity', 'handsOn', 'trust']);
  const [primarySort, setPrimarySort] = useState<string>('balanced');
  const [regionPref, setRegionPref] = useState<'All' | 'India' | 'Global'>('All');
  const [isSyncingId, setIsSyncingId] = useState<string | null>(null);

  const handleResyncSkillArea = (skillArea: string, domainId: string) => {
    setIsSyncingId(skillArea);
    setTimeout(() => {
      const candidates = CHANNELS_POOL.filter(ch => {
        const matchByDomain = ch.domain === domainId || ch.domain === 'general';
        const matchByKeywords = skillArea.toLowerCase().split(/[ ,/]+/).some(word => 
          word.length > 3 && (ch.bestFor.toLowerCase().includes(word) || ch.name.toLowerCase().includes(word))
        );
        return matchByDomain || matchByKeywords;
      });

      const pool = candidates.length >= 8 ? candidates : CHANNELS_POOL;

      const scored = pool.map(ch => {
        // High weights for active choices, basement weight for inactive options
        const wFramework = selectedCriteria.includes('framework') ? 10 : 2;
        const wClarity = selectedCriteria.includes('clarity') ? 10 : 2;
        const wHandsOn = selectedCriteria.includes('handsOn') ? 10 : 2;
        const wTrust = selectedCriteria.includes('trust') ? 10 : 2;
        const wEngagement = selectedCriteria.includes('engagement') ? 10 : 2;
        const wRecency = selectedCriteria.includes('recency') ? 10 : 2;

        let score = 
          (ch.studyFramework * wFramework) +
          (ch.explanationClarity * wClarity) +
          (ch.handsOnReadiness * wHandsOn) +
          (ch.trustSignal * wTrust) +
          (ch.engagementSanity * wEngagement) +
          (ch.recencyCheck * wRecency);
        
        // Boost for specific primary sort selection
        if (primarySort === 'framework') score += ch.studyFramework * 15;
        else if (primarySort === 'clarity') score += ch.explanationClarity * 15;
        else if (primarySort === 'handsOn') score += ch.handsOnReadiness * 15;
        else if (primarySort === 'trust') score += ch.trustSignal * 15;
        else if (primarySort === 'engagement') score += ch.engagementSanity * 15;
        else if (primarySort === 'recency') score += ch.recencyCheck * 15;

        if (regionPref === 'India') {
          if (ch.isIndian) score += 45;
          else score -= 25;
        } else if (regionPref === 'Global') {
          if (!ch.isIndian) score += 30;
          else score -= 15;
        }
        return { ch, score };
      });

      scored.sort((a, b) => b.score - a.score);

      const selected: { name: string; url: string }[] = [];
      const seen = new Set<string>();
      
      for (const item of scored) {
        if (selected.length >= 3) break;
        if (!seen.has(item.ch.name)) {
          seen.add(item.ch.name);
          selected.push({ name: item.ch.name, url: item.ch.url });
        }
      }

      if (selected.length === 0) {
        selected.push({ name: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp" });
        selected.push({ name: "Programming with Mosh", url: "https://www.youtube.com/@programmingwithmosh" });
      }

      setSkillAreaFeeds(prev => ({
        ...prev,
        [skillArea]: selected
      }));
      setIsSyncingId(null);
    }, 850);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize category selection when search query changes to ensure a matching category is selected
  useEffect(() => {
    if (searchQuery.trim()) {
      const matchedCats = getFilteredCategories();
      if (matchedCats.length > 0) {
        const isCurrentMatched = matchedCats.some(c => c.id === selectedCategoryId);
        if (!isCurrentMatched) {
          setSelectedCategoryId(matchedCats[0].id);
        }
      }
    }
  }, [searchQuery]);

  // Reset mobile subcategory list expander when category changes to keep the layout snug and clean
  useEffect(() => {
    setShowAllSubcategories(false);
  }, [selectedCategoryId]);

  // Filtering directory items based on the search query
  const getFilteredCategories = () => {
    if (!searchQuery.trim()) {
      return TEACHERS_DIRECTORY;
    }
    const q = searchQuery.toLowerCase().trim();
    const isCpp = q === 'c++' || q === 'cpp' || q === 'cplusplus' || q === 'c plus plus';
    return TEACHERS_DIRECTORY.map(cat => {
      const filteredSubs = (cat.subcategories || []).filter(sub => {
        const matchesQuery = 
          (sub?.skillArea && sub.skillArea.toLowerCase().includes(q)) ||
          (sub?.whyTrust && sub.whyTrust.toLowerCase().includes(q)) ||
          (sub?.suggestedStudy && sub.suggestedStudy.toLowerCase().includes(q)) ||
          (Array.isArray(sub?.teachers) && sub.teachers.some(t => t?.name && t.name.toLowerCase().includes(q)));
        const matchesCpp = isCpp && (
          (sub?.skillArea && (sub.skillArea.toLowerCase().includes('c++') || sub.skillArea.toLowerCase().includes('cpp'))) ||
          (sub?.whyTrust && sub.whyTrust.toLowerCase().includes('c++')) ||
          (sub?.suggestedStudy && sub.suggestedStudy.toLowerCase().includes('c++'))
        );
        return matchesQuery || matchesCpp;
      });
      return {
        ...cat,
        subcategories: filteredSubs
      };
    }).filter(cat => cat.subcategories.length > 0);
  };

  const filteredCategories = getFilteredCategories();
  const currentCategory = TEACHERS_DIRECTORY.find(cat => cat.id === selectedCategoryId) || TEACHERS_DIRECTORY[0];

  return (
    <div className="space-y-6">
      
      {/* Guidelines cards moved below listed video directories */}

      {/* Main Directory & Categories Navigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Side: Category Navigator (4/12 or 3/12) */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          
          <button
            type="button"
            onClick={() => {
              if (setSearchQuery) setSearchQuery('');
            }}
            className={`w-full ${isLight ? 'bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200' : 'bg-[#070b14] border-[#1e2e54] text-[#10b981] hover:bg-[#0d1629]'} border-2 p-3 text-[10px] text-center flex items-center justify-between cursor-pointer transition-all shadow-[2px_2px_0px_#10b981] active:translate-y-0.5`}
            style={{ fontFamily: '"Press Start 2P", monospace' }}
            title="Click DOMAINS to reset search query and view complete domains list"
          >
            <span>DOMAINS</span>
            {searchQuery.trim() && (
              <span className="text-[9px] text-red-400 font-mono font-bold bg-red-500/10 border border-red-500/40 px-1.5 py-0.5 normal-case">
                Reset Search ✕
              </span>
            )}
          </button>
          
          <div className="flex flex-col gap-1.5 max-h-[500px] overflow-y-auto pr-1">
            {searchQuery.trim() ? (
              // If search is active, show only categories with matching items
              filteredCategories.map((cat) => {
                const isActive = selectedCategoryId === cat.id;
                const isHighlighted = highlightedCategoryIds.includes(cat.id);
                const catColor = getCategoryColor(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      if (isMobile) {
                        setTimeout(() => {
                          document.getElementById('youtube-teachers-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 80);
                      }
                    }}
                    style={{
                      borderColor: isActive 
                        ? catColor 
                        : (isHighlighted 
                            ? catColor 
                            : (isLight ? '#cbd5e1' : '#121c38')),
                      boxShadow: isActive 
                        ? `2px 2px 0px 0px ${catColor}` 
                        : (isHighlighted 
                            ? `0px 0px 8px ${catColor}73` 
                            : 'none'),
                      backgroundColor: isActive
                        ? (isLight ? `${catColor}15` : `${catColor}1c`)
                        : (isHighlighted
                            ? (isLight ? `${catColor}0d` : `${catColor}08`)
                            : undefined)
                    }}
                    className={`p-3 text-left border-2 transition-all relative group rounded-none cursor-pointer uppercase font-mono text-xs flex justify-between items-center pl-6 ${
                      isActive 
                        ? (isLight ? 'text-slate-900 font-bold' : 'text-white font-bold') 
                        : (isHighlighted
                            ? (isLight ? 'text-slate-800 font-medium' : 'text-slate-200 font-medium')
                            : (isLight ? 'bg-white hover:bg-gray-50 text-slate-700' : 'bg-[#081121] hover:bg-[#0c162b] text-gray-400'))
                    }`}
                  >
                    {/* Left vertical color indicator bar */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1" 
                      style={{ backgroundColor: catColor }}
                    />
                    
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-base select-none" style={{ color: catColor }}>•</span>
                      <span className="font-bold tracking-tight">{cat.name}</span>
                      {isHighlighted && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#10b981]/15 border border-[#10b981]/20 text-[#10b981] font-bold tracking-wider shrink-0 rounded-xs ml-1 uppercase">
                          Active Path
                        </span>
                      )}
                    </span>
                    <span className={`text-[9.5px] border px-1.5 py-0.5 ${isLight ? 'bg-gray-100 border-gray-200 text-slate-600' : 'bg-[#121c38] border-[#1e2e54] text-gray-400'}`}>
                      {cat.subcategories.length} MATCH
                    </span>
                  </button>
                );
              })
            ) : (
              // Regular list when search is inactive
              TEACHERS_DIRECTORY.map((cat) => {
                const isActive = selectedCategoryId === cat.id;
                const isHighlighted = highlightedCategoryIds.includes(cat.id);
                const catColor = getCategoryColor(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      if (isMobile) {
                        setTimeout(() => {
                          document.getElementById('youtube-teachers-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 80);
                      }
                    }}
                    style={{
                      borderColor: isActive 
                        ? catColor 
                        : (isHighlighted 
                            ? catColor 
                            : (isLight ? '#cbd5e1' : '#121c38')),
                      boxShadow: isActive 
                        ? `2px 2px 0px 0px ${catColor}` 
                        : (isHighlighted 
                            ? `0px 0px 8px ${catColor}73` 
                            : 'none'),
                      backgroundColor: isActive
                        ? (isLight ? `${catColor}15` : `${catColor}1c`)
                        : (isHighlighted
                            ? (isLight ? `${catColor}0d` : `${catColor}08`)
                            : undefined)
                    }}
                    className={`p-3 text-left border-2 transition-all relative group rounded-none cursor-pointer uppercase font-mono text-xs flex justify-between items-center pl-6 ${
                      isActive 
                        ? (isLight ? 'text-slate-900 font-bold' : 'text-white font-bold') 
                        : (isHighlighted
                            ? (isLight ? 'text-slate-800 font-medium' : 'text-slate-200 font-medium')
                            : (isLight ? 'bg-white hover:bg-gray-50 text-slate-700' : 'bg-[#081121] hover:bg-[#0c162b] text-gray-400'))
                    }`}
                  >
                    {/* Left vertical color indicator bar */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1" 
                      style={{ backgroundColor: catColor }}
                    />

                    <span className="flex items-center gap-2">
                      <span className="font-bold text-base select-none" style={{ color: catColor }}>•</span>
                      <span className="font-bold tracking-tight">{cat.name}</span>
                      {isHighlighted && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#10b981]/15 border border-[#10b981]/20 text-[#10b981] font-bold tracking-wider shrink-0 rounded-xs ml-1 uppercase">
                          Active Path
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform" style={{ color: isActive ? catColor : '#4b5563' }} />
                  </button>
                );
              })
            )}

            {filteredCategories.length === 0 && (
              <div className="p-4 text-center border-2 border-dashed border-red-500/30 bg-red-950/10 font-mono text-[11px] text-red-400">
                ⚠️ No learning domains found for "{searchQuery}"
              </div>
            )}
          </div>



          {/* Rotating Career Design Advice slider card moved here from About system */}
          <div className="bg-[#070b13] border-2 border-cyan-400 p-4 rounded-none shadow-[3px_3px_0px_#22d3ee] relative overflow-hidden select-none mt-4">
            <div className="absolute top-0 right-0 p-1 bg-cyan-400 text-black font-mono text-[8px] uppercase tracking-wider font-bold">
              Tactical Hub
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[10px] text-white uppercase font-bold tracking-wider">
                ADVICE CAROUSEL
              </span>
            </div>

            <div className="bg-black/80 border border-cyan-900/40 p-3 font-mono text-[11px] text-cyan-300 min-h-[70px] flex flex-col justify-between">
              <p className="leading-relaxed italic">
                "{CORNER_TIPS[adviceIndex]}"
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: List of recommended channels/skills in selected Category (8/12) */}
        <div id="youtube-teachers-detail-panel" className="lg:col-span-8 flex flex-col gap-4 scroll-mt-20">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                borderColor: getCategoryColor(currentCategory.id),
                boxShadow: isLight 
                  ? `3px 3px 0px 0px #cbd5e1` 
                  : `3px 3px 0px 0px ${getCategoryColor(currentCategory.id)}55`
              }}
              className={`border-2 p-4 relative flex flex-col ${isLight ? 'bg-white text-slate-800' : 'bg-[#080d1a] text-white'}`}
            >
              
              {/* Header section displaying active category specs */}
              <div className={`flex items-center justify-between border-b-2 pb-3 mb-4 font-mono ${isLight ? 'border-gray-100' : 'border-[#121c38]'}`}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg select-none" style={{ color: getCategoryColor(currentCategory.id) }}>•</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-md font-bold uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>{currentCategory.name}</h3>
                      {toggleBookmark && isBookmarked && (
                        <button
                          onClick={() => toggleBookmark({
                            id: currentCategory.id,
                            name: currentCategory.name,
                            type: 'domain',
                            subtext: 'YouTube Domain Category'
                          })}
                        className="p-1 text-gray-500 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center"
                        title={isBookmarked(currentCategory.id, 'domain') ? 'Remove category bookmark' : 'Bookmark this category'}
                      >
                        <CustomBookmarkIcon className={`w-4 h-4 ${isBookmarked(currentCategory.id, 'domain') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <span 
                className="text-[11px] border px-2 py-0.5 uppercase font-mono font-bold"
                style={{
                  color: getCategoryColor(currentCategory.id),
                  borderColor: `${getCategoryColor(currentCategory.id)}33`,
                  backgroundColor: `${getCategoryColor(currentCategory.id)}15`
                }}
              >
                {searchQuery.trim() 
                  ? `${filteredCategories.find(c => c.id === currentCategory.id)?.subcategories.length || 0} matching tools`
                  : `${currentCategory.subcategories.length} core divisions`
                }
              </span>
            </div>

            {/* List rendered under active state */}
            <div className="space-y-4">
              {(() => {
                const activeCategoryWithFilter = searchQuery.trim() 
                  ? filteredCategories.find(cat => cat.id === currentCategory.id)
                  : currentCategory;

                const listToRender = activeCategoryWithFilter?.subcategories || [];

                if (listToRender.length === 0) {
                  return (
                    <div className="py-12 text-center text-gray-500 font-mono text-[11px] border border-dashed border-[#121c38]">
                      <HelpCircle className="w-10 h-10 mb-2 mx-auto text-gray-700" />
                      <p>This division doesn't have matches matching "{searchQuery}".</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-3 px-3 py-1.5 border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-black transition uppercase text-[10px] font-mono"
                      >
                        Reset search criteria
                      </button>
                    </div>
                  );
                }

                const maxSubcategoriesToRender = isMobile && !showAllSubcategories ? 3 : undefined;
                const slicedList = listToRender.slice(0, maxSubcategoriesToRender);

                return (
                  <>
                    {slicedList.map((sub, idx) => {
                      const activeTeachers = skillAreaFeeds[sub.skillArea] || sub.teachers;
                      return (
                        <div 
                          key={idx}
                          className={`border-2 p-4 font-mono transition-all duration-200 relative group/div ${isLight ? 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/30 hover:border-gray-300' : 'border-[#121c38] bg-[#050912]/90 hover:border-[#1e2e54]/90 hover:bg-[#070c18]'}`}
                        >
                          <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 border-b pb-3 mb-3 ${isLight ? 'border-gray-200' : 'border-[#121c38]/60'}`}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                              <div>
                                <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-wider mb-1 block">✔ DIVISION AREA {idx + 1}</span>
                                <div className="flex items-center gap-2">
                                  <h4 className={`text-sm font-bold uppercase leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                    {sub.skillArea}
                                  </h4>
                                  {toggleBookmark && isBookmarked && (
                                    <button
                                      onClick={() => toggleBookmark({
                                        id: sub.skillArea,
                                        name: sub.skillArea,
                                        type: 'division',
                                        subtext: `${currentCategory.name} Division`
                                      })}
                                      className="p-1 text-gray-400 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center shrink-0"
                                      title={isBookmarked(sub.skillArea, 'division') ? 'Remove division bookmark' : 'Bookmark this division'}
                                    >
                                      <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(sub.skillArea, 'division') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Embedded Resync Engine Quicktrigger Button with custom styling */}
                              <div className="relative">
                                <button
                                  onClick={() => {
                                    setActiveSettingsSkillArea(activeSettingsSkillArea === sub.skillArea ? null : sub.skillArea);
                                  }}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded border transition-all cursor-pointer ${isLight ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' : 'border-amber-900/60 bg-amber-950/20 text-amber-400 hover:bg-amber-950/45 hover:border-amber-700'}`}
                                  title="Configure dynamic recommendation preferences (includes Indian educators Shradha Khapra, Khan Sir, Physics Wallah, and 110+ international courses)"
                                >
                                  <RefreshCw className={`w-3 h-3 ${isSyncingId === sub.skillArea ? 'animate-spin' : ''}`} />
                                  <span className="font-bold uppercase tracking-wider">Preferences</span>
                                </button>
                              </div>
                            </div>
                            
                            {/* Interactive YouTube clickable anchors as requested */}
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="text-[10px] text-gray-500 mr-1 hidden sm:inline">Stack:</span>
                              {activeTeachers.map((teach, i) => {
                                const isTeacherSaved = isBookmarked ? isBookmarked(teach.name, 'youtubeTeacher') : false;
                                const directUrl = getDirectVideoUrl(teach.name, sub.skillArea, teach.url);
                                return (
                                  <div key={i} className={`inline-flex items-center gap-1 border px-2 py-1 text-[10.5px] rounded-none transition-all uppercase relative group/item ${isLight ? 'bg-pink-50 hover:bg-pink-100/50 text-pink-700 border-pink-200/60' : 'bg-[#1c1326] hover:bg-red-950/20 text-pink-400 hover:text-red-400 border-pink-900/60 hover:border-red-900'}`}>
                                    <a
                                      href={directUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 cursor-pointer"
                                      title={`Open ${teach.name} on YouTube in a new tab`}
                                    >
                                      <Youtube className="w-3.5 h-3.5 shrink-0 text-red-500" />
                                      <strong className="font-bold underline">{teach.name}</strong>
                                      <ExternalLink className="w-2.5 h-2.5 opacity-60 text-gray-400" />
                                    </a>
                                    {toggleBookmark && (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          toggleBookmark({
                                            id: teach.name,
                                            name: teach.name,
                                            type: 'youtubeTeacher',
                                            subtext: 'YouTube Instructor',
                                            url: directUrl
                                          });
                                        }}
                                        className="p-0.5 text-gray-500 hover:text-yellow-400 transition cursor-pointer ml-1"
                                        title={isTeacherSaved ? 'Remove instructor bookmark' : 'Bookmark instructor'}
                                      >
                                        <CustomBookmarkIcon className={`w-3 h-3 ${isTeacherSaved ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Dynamic Resync Options & Criteria sliders wrapper */}
                          {activeSettingsSkillArea === sub.skillArea && (
                            <div className={`mb-4 p-4 border rounded-none font-mono text-xs ${isLight ? 'bg-white border-blue-200 text-slate-800' : 'bg-[#0a0f1d] border-amber-500/35 text-slate-200'} space-y-3`}>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                                  Curated Selection Criteria Adjuster
                                </span>
                                <button 
                                  onClick={() => setActiveSettingsSkillArea(null)}
                                  className="text-[10px] text-gray-500 hover:text-amber-500 underline uppercase"
                                >
                                  [Close Panel]
                                </button>
                              </div>

                              {/* Ready-made preset buttons */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCriteria(['framework', 'trust', 'recency']);
                                    setPrimarySort('framework');
                                    setRegionPref('All');
                                  }}
                                  className="p-1.5 text-[9.5px] text-center border bg-black/10 hover:bg-black/25 uppercase border-gray-700/50 cursor-pointer"
                                  title="Focus heavily on study syllabus coverage and trust markers"
                                >
                                  📚 Study Outline
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCriteria(['clarity', 'engagement', 'recency']);
                                    setPrimarySort('clarity');
                                    setRegionPref('All');
                                  }}
                                  className="p-1.5 text-[9.5px] text-center border bg-black/10 hover:bg-black/25 uppercase border-gray-700/50 cursor-pointer"
                                  title="Focus heavily on clear explanations and active viewer engagement"
                                >
                                  🎙️ Explanation Clarity
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCriteria(['handsOn', 'framework', 'recency']);
                                    setPrimarySort('handsOn');
                                    setRegionPref('All');
                                  }}
                                  className="p-1.5 text-[9.5px] text-center border bg-black/10 hover:bg-black/25 uppercase border-gray-700/50 cursor-pointer"
                                  title="Focus heavily on hands-on practice, labs, and modern coding guidelines"
                                >
                                  🛠️ Hands-on Labs
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCriteria(['framework', 'clarity', 'trust']);
                                    setPrimarySort('balanced');
                                    setRegionPref('India');
                                  }}
                                  className="p-1.5 text-[9.5px] text-center border bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20 uppercase cursor-pointer"
                                  title="Load reputed Indian teachers and top native technical ed-tech creators"
                                >
                                  🇮🇳 Reputed Indian Ed
                                </button>
                              </div>

                              {/* Interactive Criteria Option Buttons */}
                              <div className="space-y-2 pt-1">
                                <span className={`text-[9.5px] uppercase tracking-wider block font-bold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                                  1. Choose Active Recommendation Criteria:
                                </span>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {[
                                    { id: 'framework', label: '📚 Syllabus outline', desc: 'Comprehensive depth coverage' },
                                    { id: 'clarity', label: '🎙️ Explanation clarity', desc: 'Beginner-friendly pedagogy' },
                                    { id: 'handsOn', label: '🛠️ Hands-on labs', desc: 'Practical sandbox setups' },
                                    { id: 'trust', label: '🏆 Global trust', desc: 'Reputation & credentials' },
                                    { id: 'recency', label: '📅 Recency update', desc: 'Aligned with 2026 standards' }
                                  ].map((crit) => {
                                    const isSelected = selectedCriteria.includes(crit.id);
                                    return (
                                      <button
                                        key={crit.id}
                                        type="button"
                                        onClick={() => {
                                          if (isSelected) {
                                            setSelectedCriteria(selectedCriteria.filter(c => c !== crit.id));
                                          } else {
                                            setSelectedCriteria([...selectedCriteria, crit.id]);
                                          }
                                        }}
                                        className={`p-2 text-left border rounded-none transition-all flex flex-col justify-between h-14 cursor-pointer ${
                                          isSelected
                                            ? isLight
                                              ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800 font-bold shadow-[0_1px_3px_rgba(16,185,129,0.1)]'
                                              : 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                                            : isLight
                                              ? 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                                              : 'border-slate-850 bg-[#040810]/65 text-slate-400 hover:border-slate-700'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between w-full text-[10.5px]">
                                          <span className="truncate pr-1">{crit.label}</span>
                                          <span className="text-[10px] scale-110 font-bold leading-none">{isSelected ? '✔' : '☐'}</span>
                                        </div>
                                        <span className={`text-[8px] truncate leading-none ${isSelected ? (isLight ? 'text-emerald-700/80' : 'text-amber-500/80') : 'text-slate-500'} font-normal font-sans`}>
                                          {crit.desc}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Sort-Order and Region Preferences layout */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="space-y-1">
                                  <label className={`text-[9.5px] uppercase tracking-wider block font-bold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                                    2. Primary Sorting Preference:
                                  </label>
                                  <select 
                                    value={primarySort} 
                                    onChange={(e) => setPrimarySort(e.target.value)}
                                    className={`w-full px-2 py-1.5 outline-none text-xs rounded-none border ${isLight ? 'bg-white border-gray-200 text-slate-800' : 'bg-black text-white border-gray-800'}`}
                                  >
                                    <option value="balanced">🤝 Balanced (Cumulative Sum)</option>
                                    <option value="framework">📚 Study Syllabus Depth</option>
                                    <option value="clarity">🎙️ Pedagogical Clarity</option>
                                    <option value="handsOn">🛠️ Practical Practice & Labs</option>
                                    <option value="trust">🏆 Verified Institution Trust</option>
                                    <option value="recency">📅 2026 Freshness check</option>
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <label className={`text-[9.5px] uppercase tracking-wider block font-bold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                                    3. Regional Scope Focus:
                                  </label>
                                  <select 
                                    value={regionPref} 
                                    onChange={(e) => setRegionPref(e.target.value as any)}
                                    className={`w-full px-2 py-1.5 outline-none text-xs rounded-none border ${isLight ? 'bg-white border-gray-200 text-slate-800' : 'bg-black text-white border-gray-800'}`}
                                  >
                                    <option value="All">🌐 All Global & Indian</option>
                                    <option value="India">🇮🇳 Native Indian Educators Focus</option>
                                    <option value="Global">🌎 Exclusive Global Content Focus</option>
                                  </select>
                                </div>
                              </div>

                              {/* Option Select & Resync Execute trigger */}
                              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/60 pt-2.5">
                                <div className="text-[10px] text-gray-400 uppercase leading-relaxed font-sans">
                                  * Curates from database containing Shradha Khapra, Khan Sir, PW, and 110+ international platforms.
                                </div>

                                <button
                                  onClick={() => handleResyncSkillArea(sub.skillArea, selectedCategoryId)}
                                  disabled={isSyncingId !== null}
                                  className="w-full sm:w-auto px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/40 text-slate-950 font-bold uppercase transition flex items-center justify-center gap-1.5 rounded-none cursor-pointer text-xs"
                                >
                                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingId === sub.skillArea ? 'animate-spin' : ''}`} />
                                  <span>{isSyncingId === sub.skillArea ? 'CURATING RECOMMENDATIONS...' : 'SAVE PREFERENCES'}</span>
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <span className="text-[9.5px] text-gray-500 uppercase tracking-widest font-bold">Why Trust This ChannelStack:</span>
                              <p className={`text-[11px] font-sans normal-case leading-relaxed font-light ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                                {sub.whyTrust}
                              </p>
                            </div>
                            <div className={`space-y-1 border-t md:border-t-0 md:border-l pt-3.5 md:pt-0 md:pl-4 ${isLight ? 'border-gray-200' : 'border-[#121c38]/60'}`}>
                              <span className="text-[9.5px] text-amber-500 uppercase tracking-widest font-bold">Suggested Study framework / use:</span>
                              <p className={`text-[11px] font-sans normal-case leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                                {sub.suggestedStudy}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {isMobile && listToRender.length > 3 && (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => setShowAllSubcategories(!showAllSubcategories)}
                          className="w-full py-2.5 bg-slate-950 hover:bg-[#121c38] border border-[#1e2e54] hover:border-emerald-500 text-emerald-400 font-mono text-xs font-bold uppercase transition focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{showAllSubcategories ? '▲ Show Fewer Divisions' : `▼ Show All Divisions (${listToRender.length})`}</span>
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* 2-column full width rectangular panel representing the Study Principles and Selection Trust Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 font-mono">
        {/* STUDY PRINCIPLES */}
        <div className={`border-2 p-5 flex flex-col justify-between ${isLight ? 'bg-white border-gray-200 text-slate-800 shadow-[3px_3px_0px_0px_#cbd5e1]' : 'bg-[#050912]/90 border-[#121c38] text-white shadow-[3px_3px_0px_#121c38]'}`}>
          <div>
            <div className={`flex items-center gap-1.5 border-b pb-2 mb-4 justify-between ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
              <span className={`font-bold uppercase tracking-wider flex items-center gap-1.5 text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Compass className="w-4.5 h-4.5 text-[#10b981]" /> STUDY PRINCIPLES & GUIDELINES
              </span>
            </div>
            
            <ul className={`space-y-3 leading-relaxed text-[11px] ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
              <li className="flex gap-2 items-start">
                <span className="text-[#10b981] shrink-0 font-bold">▪</span>
                <span>For each tool, first start with the <strong className={isLight ? "text-slate-900 font-bold" : "text-white"}>official/vendor channel</strong>, then utilize one independent community teacher for real-world lab applications.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#10b981] shrink-0 font-bold">▪</span>
                <span>Prioritize channels offering <strong className={isLight ? "text-slate-900 font-bold" : "text-white"}>complete, structured playlists</strong> over standalone fragmented videos.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#10b981] shrink-0 font-bold">▪</span>
                <span>Always cross-reference and verify study topics against the <strong className={isLight ? "text-slate-900 font-bold" : "text-white"}>latest published exam outlines</strong> on official vendor portals.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#10b981] shrink-0 font-bold">▪</span>
                <span>MapIT relies on <strong className={isLight ? "text-slate-900 font-bold" : "text-white"}>qualitative trust signals</strong>, ranking teachers iteratively based on content structure, clear lab walk-throughs, and trainee feedback loops.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-dashed border-gray-600/20 text-[10px] text-gray-400 font-sans leading-relaxed">
            💡 <strong className={isLight ? "text-slate-800" : "text-gray-300 animate-pulse font-bold"}>Aesthetic SynergyTip:</strong> Save and import playlists directly into your main YouTube training account to index course progression metrics.
          </div>
        </div>

        {/* TRUST FRAMEWORK */}
        <div className={`border-2 p-5 ${isLight ? 'bg-white border-gray-200 text-slate-800 shadow-[3px_3px_0px_0px_#cbd5e1]' : 'bg-[#070b13] border-[#121c38] text-white shadow-[3px_3px_0px_#121c38]'}`}>
          <div className={`flex items-center gap-1.5 border-b pb-2 mb-4 justify-between ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
            <span className={`font-bold uppercase tracking-wider flex items-center gap-2 text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Award className="w-4.5 h-4.5 text-amber-500 animate-pulse shrink-0" /> QUALITY SELECTION CRITERIA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SELECTION_CRITERIA.map((criterion) => (
              <div key={criterion.id} className={`p-3 border border-transparent border-l-4 ${criterion.color} rounded-none ${isLight ? 'bg-gray-150/40' : 'bg-[#0a0f1d]'}`}>
                <p className={`font-bold uppercase text-[10px] leading-tight tracking-wide mb-1 flex items-center gap-1.5 ${isLight ? 'text-slate-900 font-extrabold' : 'text-white'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  {criterion.title}
                </p>
                <p className={`text-[10px] normal-case leading-relaxed font-sans font-light ${isLight ? 'text-slate-650' : 'text-gray-400'}`}>
                  {criterion.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
