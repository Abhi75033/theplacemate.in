import { CityData } from './cities'
import { CourseData } from './courses'

// Priority city slugs — these get extra deep content for ranking boost
export const INDEXABLE_CITY_SLUGS = new Set([
  // Maharashtra
  'mumbai', 'thane', 'pune', 'nashik', 'nagpur', 'aurangabad', 'navi-mumbai',
  'kalyan', 'dombivali', 'panvel', 'pimpri-chinchwad', 'solapur', 'kolhapur',
  'andheri', 'dadar', 'borivali', 'bandra', 'kurla', 'vashi', 'kharghar',
  // Bangalore
  'bangalore',
  // Delhi NCR
  'delhi', 'noida', 'gurugram', 'faridabad', 'ghaziabad', 'greater-noida',
])

interface CityIndustryData {
  intro: string
  whyLearn: string[]
  placementInfo: string
  faqs: { q: string; a: string }[]
  internshipText: string
  // Extra fields for priority cities
  isPriority: boolean
  topEmployers?: string[]
  avgSalary?: string
  itParks?: string
  jobMarketStats?: { label: string; value: string }[]
}

const CITY_INDUSTRIES: Record<string, { industries: string; employers: string; techScene: string; avgSalary?: string; itParks?: string }> = {
  mumbai: { industries: 'fintech, media, entertainment, and enterprise IT', employers: 'Jio, Tata Consultancy Services, Godrej, Kotak, and a thriving startup scene in BKC and Andheri', techScene: 'Mumbai is India\'s financial capital with a rapidly growing tech ecosystem. The city hosts major fintech companies, digital media firms, and enterprise software development centers.', avgSalary: '₹6-12 LPA', itParks: 'BKC, Andheri MIDC, Powai, Goregaon IT Park' },
  thane: { industries: 'IT services, manufacturing tech, and logistics software', employers: 'Wipro, L&T Technology Services, and the growing Thane-Belapur IT corridor companies', techScene: 'Thane has emerged as a satellite tech hub alongside Mumbai, offering lower operational costs while maintaining proximity to Mumbai\'s corporate centers.', avgSalary: '₹5-10 LPA', itParks: 'Thane-Belapur IT Corridor, Wagle Estate' },
  pune: { industries: 'automotive tech, SaaS, IT services, and cybersecurity', employers: 'Infosys, Persistent Systems, Tata Motors, and over 200 startups in Hinjewadi and Kharadi tech parks', techScene: 'Pune is India\'s second-largest IT hub with a strong engineering talent pipeline from top universities and a vibrant startup culture.', avgSalary: '₹5-11 LPA', itParks: 'Hinjewadi IT Park, Kharadi, Magarpatta, Talawade MIDC' },
  nashik: { industries: 'agritech, manufacturing software, and emerging IT services', employers: 'regional IT companies, Ambad industrial zone tech firms, and remote-first startups', techScene: 'Nashik is developing its IT sector with new tech parks and government initiatives to attract software companies to the region.', avgSalary: '₹3.5-7 LPA' },
  nagpur: { industries: 'government IT, logistics tech, and emerging software services', employers: 'MIHAN IT SEZ tenants, TCS, Infosys BPO, and regional IT service providers', techScene: 'Nagpur is central India\'s growing IT destination with the MIHAN SEZ attracting major technology companies and creating skilled tech jobs.', avgSalary: '₹3.5-8 LPA', itParks: 'MIHAN IT SEZ, Butibori MIDC' },
  delhi: { industries: 'e-commerce, edtech, government IT, and enterprise software', employers: 'Zomato, PolicyBazaar, Paytm, HCL, and numerous NCR-based startups', techScene: 'Delhi-NCR is one of India\'s largest tech employment markets, hosting headquarters of major unicorns and a dense concentration of tech startups.', avgSalary: '₹6-14 LPA', itParks: 'Nehru Place, Okhla, Connaught Place tech hubs' },
  noida: { industries: 'IT outsourcing, mobile development, and fintech', employers: 'HCL Technologies, Samsung R&D, Adobe, and the Sector 62 tech corridor companies', techScene: 'Noida\'s IT sector has grown significantly with major tech parks in Sectors 62, 125, and 135 housing both multinational and Indian tech companies.', avgSalary: '₹5-12 LPA', itParks: 'Sector 62, Sector 125, Sector 135 IT corridors' },
  gurugram: { industries: 'SaaS, fintech, e-commerce backend, and enterprise AI', employers: 'Google India, Microsoft, Razorpay, Bain & Company, and DLF Cyber City startups', techScene: 'Gurugram is the corporate tech capital of North India with Cyber Hub and DLF Cyber City hosting India\'s highest concentration of tech companies per square kilometer.', avgSalary: '₹7-16 LPA', itParks: 'DLF Cyber City, Udyog Vihar, Golf Course Road' },
  bangalore: { industries: 'product engineering, cloud computing, AI/ML, and semiconductor design', employers: 'Google, Microsoft, Flipkart, Infosys, Swiggy, Razorpay, and thousands of startups', techScene: 'Bangalore is India\'s undisputed tech capital, home to the largest number of tech startups, multinational R&D centers, and the highest density of software engineers in the country.', avgSalary: '₹7-18 LPA', itParks: 'Electronic City, Whitefield, Manyata Tech Park, Koramangala' },
  hyderabad: { industries: 'cloud infrastructure, pharmaceutical tech, and enterprise software', employers: 'Amazon, Google, Microsoft, Deloitte, and HITEC City\'s 1,500+ tech companies', techScene: 'Hyderabad\'s HITEC City and Financial District form one of India\'s largest tech corridors, with major cloud computing and enterprise software operations.', avgSalary: '₹6-14 LPA', itParks: 'HITEC City, Financial District, Gachibowli' },
  chennai: { industries: 'automotive software, SaaS, IT services, and hardware design', employers: 'Zoho, Freshworks, Cognizant, TCS, and the Tidel Park and OMR tech corridor', techScene: 'Chennai is a major IT hub with homegrown SaaS success stories like Zoho and Freshworks, alongside large IT services operations on the Old Mahabalipuram Road corridor.', avgSalary: '₹5-12 LPA', itParks: 'Tidel Park, OMR IT Expressway, SIPCOT IT Park' },
  kolkata: { industries: 'IT services, fintech, and digital transformation', employers: 'TCS, Cognizant, Wipro, ITC Infotech, and Salt Lake Sector V tech companies', techScene: 'Kolkata\'s Sector V in Salt Lake is the city\'s primary IT hub, with growing demand for full stack developers and AI engineers across major IT service companies.', avgSalary: '₹4-10 LPA', itParks: 'Salt Lake Sector V, New Town Rajarhat' },
  ahmedabad: { industries: 'textile tech, pharma IT, e-commerce, and SaaS startups', employers: 'Tata Consultancy Services, Adani Group tech divisions, and SG Highway startup ecosystem', techScene: 'Ahmedabad\'s tech sector is expanding rapidly with the SG Highway corridor becoming a hub for IT companies and the city\'s entrepreneurial culture driving tech innovation.', avgSalary: '₹4-9 LPA', itParks: 'SG Highway, GIFT City, Gandhinagar IT Hub' },
  jaipur: { industries: 'tourism tech, e-commerce, and IT outsourcing', employers: 'Genpact, WNS, regional IT firms, and the growing Sitapura Industrial Area tech cluster', techScene: 'Jaipur is Rajasthan\'s tech capital with a growing IT sector supported by government initiatives like the Mahindra World City IT SEZ and lower operational costs.', avgSalary: '₹3.5-8 LPA', itParks: 'Sitapura Industrial Area, Mahindra World City SEZ' },
  lucknow: { industries: 'government IT, edtech, and emerging software services', employers: 'TCS, HCL, UPDESCO, and IT parks in Gomti Nagar and Chinhat', techScene: 'Lucknow is emerging as a significant IT hub in Uttar Pradesh with new tech parks, government digital initiatives, and growing demand for skilled tech professionals.', avgSalary: '₹3.5-8 LPA' },
  chandigarh: { industries: 'IT services, edtech, and government technology', employers: 'Infosys Chandigarh, Quark Media, and IT Park Chandigarh companies', techScene: 'Chandigarh\'s IT Park and proximity to Punjab and Haryana markets make it a growing destination for IT companies looking beyond the saturated Delhi-NCR market.', avgSalary: '₹4-9 LPA' },
  kochi: { industries: 'IT services, fintech, and maritime tech', employers: 'Infosys, UST Global, IBS Software, and Infopark companies', techScene: 'Kochi\'s Infopark and SmartCity are Kerala\'s primary IT destinations, hosting major tech companies and creating strong demand for trained software professionals.', avgSalary: '₹4-10 LPA', itParks: 'Infopark Kochi, SmartCity Kochi' },
  dubai: { industries: 'fintech, proptech, logistics tech, and smart city solutions', employers: 'Emirates Group tech, Careem, Noon, and DIFC Innovation Hub companies', techScene: 'Dubai is the Middle East\'s tech hub with Dubai Internet City and DIFC hosting major technology operations. The UAE government\'s digital transformation agenda creates strong demand for skilled tech talent.', avgSalary: 'AED 8K-20K/month' },
  singapore: { industries: 'fintech, e-commerce, cloud infrastructure, and cybersecurity', employers: 'Google, Grab, Shopee, DBS Bank tech, and Block71 startup ecosystem', techScene: 'Singapore is Southeast Asia\'s leading tech hub with world-class infrastructure, a strong regulatory environment, and headquarters of major regional tech companies.', avgSalary: 'SGD 4K-10K/month' },
  london: { industries: 'fintech, healthtech, AI research, and enterprise SaaS', employers: 'Google DeepMind, Revolut, Monzo, and the Silicon Roundabout startup cluster', techScene: 'London is Europe\'s largest tech hub with a thriving fintech scene, world-class AI research labs, and a startup ecosystem that rivals Silicon Valley in diversity and innovation.', avgSalary: '£35K-70K/year' },
  toronto: { industries: 'AI research, fintech, healthtech, and enterprise software', employers: 'Shopify, Wealthsimple, RBC tech, and the MaRS Discovery District startups', techScene: 'Toronto is Canada\'s largest tech market and a global AI research center, with the Vector Institute attracting world-class talent and major tech companies expanding their Canadian operations.', avgSalary: 'CAD 60K-120K/year' },
  sydney: { industries: 'fintech, govtech, healthtech, and cloud services', employers: 'Atlassian, Canva, Commonwealth Bank tech, and the Surry Hills startup precinct', techScene: 'Sydney is Australia\'s tech capital, home to major success stories like Atlassian and Canva, with strong demand for developers across financial services and government digital transformation projects.', avgSalary: 'AUD 70K-130K/year' },
  'new-york': { industries: 'fintech, media tech, adtech, and enterprise AI', employers: 'Google, Bloomberg, JPMorgan Chase tech, and Silicon Alley startups', techScene: 'New York City is the second-largest tech hub in the world, with massive demand for engineers across financial services, media, advertising technology, and a rapidly growing startup ecosystem.', avgSalary: 'USD 80K-160K/year' },
  surat: { industries: 'diamond tech, textile automation, and e-commerce platforms', employers: 'local tech startups, diamond industry IT solutions, and DREAM City tech zone', techScene: 'Surat is Gujarat\'s fastest-growing city with a booming IT sector driven by the diamond and textile industries adopting digital transformation at scale.', avgSalary: '₹3.5-8 LPA' },
  indore: { industries: 'IT outsourcing, SaaS, and fintech', employers: 'TCS, Infosys BPO, Impetus Technologies, and Crystal IT Park companies', techScene: 'Indore is emerging as central India\'s IT hub with the Super Corridor and Crystal IT Park attracting major technology companies.', avgSalary: '₹3.5-8 LPA', itParks: 'Super Corridor, Crystal IT Park' },
  coimbatore: { industries: 'manufacturing software, IoT, and IT services', employers: 'Cognizant, Bosch, KGISL, and TIDEL Park Coimbatore companies', techScene: 'Coimbatore is Tamil Nadu\'s second-largest IT hub with a strong manufacturing base driving demand for IoT, automation, and software solutions.', avgSalary: '₹4-9 LPA', itParks: 'TIDEL Park Coimbatore, Saravanampatti IT Corridor' },
  bhopal: { industries: 'government IT, edtech, and emerging tech services', employers: 'BSNL, regional IT firms, and MP government digital initiatives', techScene: 'Bhopal is developing as Madhya Pradesh\'s tech center with new IT parks and government digitization projects creating demand for trained developers.', avgSalary: '₹3-7 LPA' },
  patna: { industries: 'edtech, government IT, and emerging software services', employers: 'regional IT companies, EdTech startups, and Bihar government digital services', techScene: 'Patna\'s tech ecosystem is in its early growth phase, with government digitization initiatives and edtech startups creating new opportunities for trained tech professionals.', avgSalary: '₹3-6 LPA' },
}

// Salary data by region for cities without specific entries
const REGION_SALARIES: Record<string, string> = {
  IN: '₹3-8 LPA', US: 'USD 70K-140K/year', UK: '£30K-65K/year', CA: 'CAD 55K-110K/year',
  AU: 'AUD 65K-120K/year', ME: 'AED 7K-18K/month', SEA: 'SGD 3K-8K/month', EU: '€40K-80K/year',
}

// Multiple intro templates to avoid duplication
const INTRO_TEMPLATES = [
  (city: string, course: string, scene: string) =>
    `${scene} PlaceMate's ${course} program equips students in ${city} with production-ready skills through live mentorship, portfolio-grade projects, and a structured internship that mirrors real workplace workflows. Our graduates from ${city} have gone on to join both local employers and remote-first companies across India and globally.`,
  (city: string, course: string, scene: string) =>
    `${scene} For aspiring ${course.toLowerCase()} professionals in ${city}, PlaceMate delivers a career-accelerating program combining expert instruction with hands-on experience. Students build real applications during the course and complete a verified internship — giving them a competitive edge over traditional classroom graduates in the ${city} job market.`,
  (city: string, course: string, scene: string) =>
    `${scene} PlaceMate brings industry-grade ${course.toLowerCase()} training to ${city} through our flexible online and hybrid model. Each cohort works on production projects, participates in code reviews and daily standups, and completes an internship with real deliverables — preparing them for the hiring standards of companies operating in and around ${city}.`,
]

// Multiple FAQ templates
const FAQ_TEMPLATES = [
  (city: string, course: string, mode: string, duration: string, industries: string) => [
    { q: `Can I join PlaceMate's ${course} program from ${city}?`, a: `Yes! PlaceMate's ${course} training is fully accessible from ${city} through our ${mode.toLowerCase()} model. You attend live sessions with industry mentors, collaborate with peers on team projects, and complete a structured internship — all without needing to relocate from ${city}.` },
    { q: `What ${course.toLowerCase()} jobs are available in ${city}?`, a: `${city}'s growing tech ecosystem has demand for ${course.toLowerCase()} professionals across ${industries}. Both local companies and remote-first employers actively hire graduates with portfolio projects and internship experience like what PlaceMate provides.` },
    { q: `Does PlaceMate provide job placement support in ${city}?`, a: `Every PlaceMate graduate receives dedicated placement assistance — ATS-optimized resume building, LinkedIn optimization, technical mock interviews, and access to our hiring partner network. We share opportunities matching the ${city} job market and support remote job searches as well.` },
    { q: `What is the ${course} course fee and duration for ${city} students?`, a: `The ${course} program runs for ${duration} and includes flexible EMI options starting from ₹3,000/month. Fees include the full training, internship phase, and placement support. Contact our counseling team for the latest batch schedule for students joining from ${city}.` },
  ],
  (city: string, course: string, mode: string, duration: string, industries: string) => [
    { q: `Is PlaceMate's ${course} course available online in ${city}?`, a: `Absolutely. Our ${course} program uses a ${mode.toLowerCase()} delivery model, making it accessible to students in ${city}. You get live mentor-led sessions, recorded modules for self-paced learning, and real-time project collaboration with your cohort members.` },
    { q: `What career opportunities exist for ${course.toLowerCase()} graduates in ${city}?`, a: `The ${city} region has increasing demand for ${course.toLowerCase()} skills across ${industries}. PlaceMate graduates are equipped with production project portfolios and verified internship certificates that employers in these sectors specifically look for during hiring.` },
    { q: `How does PlaceMate help ${city} students get placed?`, a: `PlaceMate provides comprehensive career services: resume optimization, mock technical interviews, portfolio reviews, and direct referrals to hiring partners. Our placement team actively curates job openings relevant to ${city} and helps students prepare for company-specific interview processes.` },
    { q: `What are the fees for joining from ${city}?`, a: `Our ${course} program (${duration}) offers affordable EMI plans starting at ₹3,000/month with zero-interest options for qualifying students. The fee covers expert-led training, internship placement, project mentorship, and full placement support. Reach out for ${city}-specific batch details.` },
  ],
]

// Internship text templates
const INTERNSHIP_TEMPLATES = [
  (city: string, course: string) =>
    `As a ${course} student from ${city}, you'll participate in PlaceMate's structured internship program working on real company projects. This includes daily standups, code reviews via pull requests, and presenting your work to stakeholders. The remote collaboration model means you can complete your internship from ${city} while gaining the same experience as working at a tech company. Upon completion, you receive a verified internship certificate recognized by employers.`,
  (city: string, course: string) =>
    `PlaceMate's internship for ${city} students involves hands-on work on production-grade projects under senior developer mentorship. You'll follow agile workflows — sprint planning, daily syncs, and demo presentations — building the exact skills that hiring managers in ${city} and beyond look for. The internship is fully remote, so you contribute from ${city} while collaborating with team members across different locations, just like modern tech teams operate.`,
  (city: string, course: string) =>
    `Students from ${city} join a dedicated internship cohort where they work on real ${course.toLowerCase()} projects for partner companies. The experience covers the full development lifecycle — from requirement analysis to deployment — with weekly mentor reviews. This isn't a simulated project; it's actual work that goes into production. You receive a verifiable certificate and can showcase the project in your portfolio to ${city}-area employers and remote opportunities.`,
]

// Placement text templates
const PLACEMENT_TEMPLATES = [
  (city: string, course: string, employers: string, industries: string) =>
    `PlaceMate graduates from ${city} benefit from our dedicated career services team that understands the local hiring landscape. We prepare students for roles across ${industries} with targeted resume optimization, technical interview preparation, and direct referrals to our hiring partner network. Companies like ${employers} actively seek candidates with production project experience and verified internships — exactly what our program delivers to ${city} students.`,
  (city: string, course: string, employers: string, industries: string) =>
    `Our placement support for ${city} graduates goes beyond generic job boards. PlaceMate's career team provides personalized guidance including LinkedIn profile optimization for the ${city} market, mock interviews simulating real company processes, and curated job matches across ${industries}. Top employers including ${employers} have hired our graduates for their ${course.toLowerCase()} skills and hands-on project portfolios.`,
  (city: string, course: string, employers: string, industries: string) =>
    `${city} students receive PlaceMate's full-spectrum placement assistance designed to match them with relevant opportunities. This includes building ATS-friendly resumes highlighting your portfolio projects, conducting mock interviews with industry professionals, and leveraging our network of hiring partners across ${industries}. Employers such as ${employers} value the practical, portfolio-driven approach that sets PlaceMate graduates apart from traditional training institute candidates.`,
]

function hashStr(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0
  return h
}

function getDefaultCityData(city: CityData, course: CourseData): { industries: string; employers: string; techScene: string; avgSalary?: string } {
  const isIndia = city.country === 'IN'
  const countryContext: Record<string, { market: string; industries: string; employers: string }> = {
    US: { market: 'the United States\' competitive tech market', industries: 'software engineering, cloud services, fintech, and AI startups', employers: 'Fortune 500 tech divisions, Y Combinator startups, and regional software companies' },
    UK: { market: 'the United Kingdom\'s thriving technology sector', industries: 'fintech, healthtech, enterprise SaaS, and digital agencies', employers: 'London-headquartered tech firms, NHS Digital, and UK fintech unicorns' },
    CA: { market: 'Canada\'s rapidly expanding technology industry', industries: 'AI research, fintech, e-commerce, and government digital services', employers: 'Shopify, major banks\' tech divisions, and the growing Canadian startup ecosystem' },
    AU: { market: 'Australia\'s maturing digital economy', industries: 'fintech, mining tech, govtech, and cloud infrastructure', employers: 'Atlassian, Canva, major bank tech teams, and government digitization projects' },
    ME: { market: 'the Middle East\'s ambitious digital transformation sector', industries: 'smart city tech, fintech, e-commerce, and government platforms', employers: 'regional tech unicorns, sovereign digital initiatives, and international tech companies\' Gulf offices' },
    SEA: { market: 'Southeast Asia\'s booming digital economy', industries: 'ride-hailing tech, e-commerce platforms, fintech, and logistics software', employers: 'super-app companies, regional e-commerce giants, and international tech firms\' APAC offices' },
    EU: { market: 'Europe\'s diverse and growing technology landscape', industries: 'automotive software, enterprise SaaS, fintech, and deep tech', employers: 'European tech unicorns, automotive R&D centers, and international tech companies\' EU headquarters' },
  }
  const ctx = countryContext[city.country]
  if (ctx) {
    return { industries: ctx.industries, employers: ctx.employers, techScene: `${city.name} is a key player in ${ctx.market}, offering growing career opportunities for trained technology professionals.`, avgSalary: REGION_SALARIES[city.country] }
  }
  const h = hashStr(city.name)
  const tier2Variants = [
    `${city.name} represents India's emerging tier-2 tech ecosystem, where lower living costs and growing IT parks are attracting both companies and talent seeking alternatives to saturated metro markets.`,
    `The tech landscape in ${city.name} is evolving rapidly, with new coworking spaces, IT service companies, and remote-friendly startups establishing a presence. Professionals trained in modern technologies are finding increasing opportunities in this growing market.`,
    `${city.name}'s technology sector is gaining momentum as businesses across the region embrace digital transformation. The city offers a compelling combination of affordability, quality of life, and expanding tech job opportunities for skilled professionals.`,
    `With India's tech industry decentralizing from metros, ${city.name} is emerging as a promising destination for software professionals. Companies are increasingly hiring remote and hybrid talent from cities like ${city.name}, valuing skills over location.`,
  ]
  const tier3Variants = [
    `${city.name} is part of India's next wave of technology adoption, where digitization of local industries and remote work culture are creating fresh opportunities for tech professionals trained in modern tools.`,
    `The digital economy is reaching ${city.name} as businesses in the region modernize their operations. For skilled tech professionals, this translates to growing demand from local enterprises, government digitization projects, and remote-first companies hiring nationwide.`,
    `${city.name}'s economy is undergoing digital transformation, with traditional businesses seeking tech talent for automation, web presence, and data-driven operations. Remote work has also opened doors for ${city.name} professionals to work with companies across India.`,
    `As India's digital infrastructure expands, ${city.name} is connecting to the national tech job market through remote work and freelancing platforms. Professionals with practical project portfolios and modern tech skills are finding opportunities regardless of their city's size.`,
  ]
  const tierDescriptions: Record<number, string[]> = {
    1: [`${city.name} is among India's prominent technology centers, with established IT infrastructure and a growing demand for skilled software professionals across multiple sectors.`],
    2: tier2Variants,
    3: tier3Variants,
  }
  const variants = tierDescriptions[city.tier] || tier2Variants
  const employerVariants = [
    `regional IT firms, BPO companies, emerging startups, and remote-first product companies hiring from ${city.name}`,
    `local technology service providers, national IT companies with ${city.name} offices, and remote-friendly startups offering competitive salaries`,
    `growing IT companies in the ${city.name} region, freelancing clients on national platforms, and remote product companies hiring from tier-2 and tier-3 cities`,
  ]
  return {
    industries: isIndia ? `IT services, digital transformation, e-commerce, and ${course.title.toLowerCase()}-adjacent industries` : 'technology services and digital innovation',
    employers: isIndia ? employerVariants[h % employerVariants.length] : `local and international technology companies operating in the ${city.name} region`,
    techScene: variants[h % variants.length],
    avgSalary: REGION_SALARIES[city.country] || '₹3-8 LPA',
  }
}

export function getCityContent(city: CityData, course: CourseData): CityIndustryData {
  const data = CITY_INDUSTRIES[city.slug] || getDefaultCityData(city, course)
  const isPriority = INDEXABLE_CITY_SLUGS.has(city.slug)
  // Use different hash seeds per template type for maximum variation
  const hIntro = hashStr(city.name + course.slug + 'intro')
  const hFaq = hashStr(city.name + course.slug + 'faq')
  const hPlacement = hashStr(city.name + course.slug + 'place')
  const hInternship = hashStr(city.name + course.slug + 'intern')

  const intro = INTRO_TEMPLATES[hIntro % INTRO_TEMPLATES.length](city.name, course.title, data.techScene)

  const salaryLine = data.avgSalary ? ` Average salary packages for ${course.title.toLowerCase()} roles in the ${city.name} region range around ${data.avgSalary} for freshers with project experience.` : ''
  const itParkLine = (data as any).itParks ? ` Key tech zones include ${(data as any).itParks}.` : ''

  const whyLearn = [
    `${city.name} has a strong and growing demand for ${course.title.toLowerCase()} professionals across ${data.industries} — creating consistent hiring opportunities for skilled graduates.${salaryLine}`,
    `Leading employers including ${data.employers} actively recruit candidates who can demonstrate practical ${course.title.toLowerCase()} skills through portfolio projects and production experience.${itParkLine}`,
    `PlaceMate's placement network connects ${city.name} graduates with hiring partners operating locally and across India. Our career team provides targeted referrals and interview preparation aligned with regional hiring patterns.`,
    `The ${course.mode.toLowerCase()} learning format enables ${city.name} students to build industry-standard skills without relocating. You attend live mentor sessions, collaborate with your cohort, and complete hands-on projects — on a schedule that works for you.`,
  ]

  const placementInfo = PLACEMENT_TEMPLATES[hPlacement % PLACEMENT_TEMPLATES.length](city.name, course.title, data.employers, data.industries)
  let faqs = FAQ_TEMPLATES[hFaq % FAQ_TEMPLATES.length](city.name, course.title, course.mode, course.duration, data.industries)

  // Priority cities get 4 EXTRA FAQs for richer rich results
  if (isPriority) {
    const salary = data.avgSalary || '₹4-10 LPA'
    faqs = [
      ...faqs,
      { q: `What is the average salary for ${course.title.toLowerCase()} freshers in ${city.name}?`, a: `Based on current market data, entry-level ${course.title.toLowerCase()} professionals in the ${city.name} region can expect salary packages in the range of ${salary}. PlaceMate graduates often command higher starting packages due to their verified internship experience and production-quality project portfolios that employers specifically value during hiring.` },
      { q: `Which companies hire ${course.title.toLowerCase()} professionals in ${city.name}?`, a: `Top employers for ${course.title.toLowerCase()} roles in ${city.name} include ${data.employers}. Additionally, remote-first companies and startups across India actively hire from ${city.name}. PlaceMate's hiring partner network gives graduates access to both local and national opportunities through direct referrals.` },
      { q: `Is ${course.title} training from ${city.name} valued by recruiters?`, a: `Yes. PlaceMate's ${course.title} certification is backed by a verified internship and real project portfolio — which recruiters in ${city.name} and across India value significantly more than classroom-only certificates. Our career services team ensures your resume and LinkedIn profile highlight these differentiators for maximum impact with ${city.name}-area employers.` },
      { q: `Can I learn ${course.title.toLowerCase()} part-time while working in ${city.name}?`, a: `Absolutely. PlaceMate offers both weekday and weekend batch schedules specifically designed for working professionals in ${city.name}. Our ${course.mode.toLowerCase()} model includes recorded session access, so you can revise on your own time while attending live mentor sessions on a schedule that fits your work commitments.` },
    ]
  }

  const internshipText = INTERNSHIP_TEMPLATES[hInternship % INTERNSHIP_TEMPLATES.length](city.name, course.title)

  // Build top employers list from the employers string for priority cities
  const topEmployers = isPriority ? data.employers.split(/,\s*/).map(e => e.trim()).filter(e => e.length > 2 && e.length < 50).slice(0, 8) : undefined

  // Job market stats for priority cities
  const jobMarketStats = isPriority ? [
    { label: 'Avg. Fresher Salary', value: data.avgSalary || '₹4-10 LPA' },
    { label: 'Key Industries', value: data.industries.split(',').slice(0, 2).join(', ').trim() },
    { label: 'Course Duration', value: course.duration },
    { label: 'Placement Rate', value: '92%+' },
    { label: 'Hiring Partners', value: '150+' },
    { label: 'Learning Mode', value: course.mode },
  ] : undefined

  return {
    intro, whyLearn, placementInfo, faqs, internshipText,
    isPriority,
    topEmployers,
    avgSalary: data.avgSalary,
    itParks: (data as any).itParks,
    jobMarketStats,
  }
}

