export interface CityData {
  name: string
  slug: string
  tier: 1 | 2 | 3
  country: string
  hreflang: string
}

export const TIER1_INDIA: CityData[] = [
  { name: 'Mumbai', slug: 'mumbai', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Thane', slug: 'thane', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Pune', slug: 'pune', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Nashik', slug: 'nashik', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Nagpur', slug: 'nagpur', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Aurangabad', slug: 'aurangabad', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Navi Mumbai', slug: 'navi-mumbai', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Delhi', slug: 'delhi', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Noida', slug: 'noida', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Gurugram', slug: 'gurugram', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Faridabad', slug: 'faridabad', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Ghaziabad', slug: 'ghaziabad', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Bangalore', slug: 'bangalore', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Hyderabad', slug: 'hyderabad', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Chennai', slug: 'chennai', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Kolkata', slug: 'kolkata', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Ahmedabad', slug: 'ahmedabad', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Surat', slug: 'surat', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Jaipur', slug: 'jaipur', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Lucknow', slug: 'lucknow', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Chandigarh', slug: 'chandigarh', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Indore', slug: 'indore', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Bhopal', slug: 'bhopal', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Patna', slug: 'patna', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Bhubaneswar', slug: 'bhubaneswar', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Kochi', slug: 'kochi', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Coimbatore', slug: 'coimbatore', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Vadodara', slug: 'vadodara', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Rajkot', slug: 'rajkot', tier: 1, country: 'IN', hreflang: 'en-IN' },
  { name: 'Ludhiana', slug: 'ludhiana', tier: 1, country: 'IN', hreflang: 'en-IN' },
]

export const TIER2_INDIA: CityData[] = [
  'Agra','Varanasi','Meerut','Prayagraj','Kanpur','Jodhpur','Udaipur','Amritsar','Jalandhar','Dehradun','Shimla','Srinagar','Jammu','Ranchi','Guwahati','Mangalore','Mysore','Hubli','Tiruchirappalli','Madurai','Salem','Visakhapatnam','Vijayawada','Warangal','Nellore','Kakinada','Bhavnagar','Jamnagar','Raipur','Bilaspur','Jabalpur','Gwalior','Ujjain','Ajmer','Bikaner','Kota','Bareilly','Moradabad','Aligarh','Gorakhpur','Jhansi','Mathura','Firozabad','Saharanpur','Jaunpur','Sultanpur','Ayodhya','Azamgarh','Mirzapur','Basti','Deoria','Ballia','Pratapgarh','Gonda','Faizabad','Etawah','Banda','Unnao','Hardoi','Lakhimpur','Sitapur','Shahjahanpur','Rampur','Bulandshahr','Muzaffarnagar','Hapur','Baghpat','Greater Noida','Anand','Gandhidham','Navsari','Vapi','Junagadh','Porbandar','Mehsana','Bharuch','Godhra','Dahod','Korba','Durg','Bhilai','Jagdalpur','Ambikapur','Satna','Rewa','Sagar','Damoh','Chhindwara','Khandwa','Burhanpur','Dewas'
].map(name => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), tier: 2 as const, country: 'IN', hreflang: 'en-IN' }))

export const TIER3_MAHARASHTRA: CityData[] = [
  'Solapur','Kolhapur','Latur','Sangli','Satara','Ahmednagar','Jalgaon','Dhule','Amravati','Akola','Nanded','Yavatmal','Wardha','Gondia','Bhandara','Raigad','Ratnagiri','Sindhudurg','Alibaug','Panvel','Mira-Bhayandar','Kalyan','Dombivali','Ulhasnagar','Bhiwandi','Vasai-Virar','Ambernath','Badlapur','Karjat','Murbad','Wada','Shahapur','Andheri','Dadar','Borivali','Malad','Goregaon','Bandra','Kurla','Ghatkopar','Diva','Powai','Chembur','Mulund','Vikhroli','Vashi','Kharghar','Airoli','Belapur','Pimpri-Chinchwad','Hinjewadi','Wakad','Kharadi','Hadapsar','Aundh','Baner','Kothrud','Chinchwad','Palghar','Dahanu','Lonavala','Mahabaleshwar','Shirdi','Asangaon','Thakurli','Kasara','Titwala','Khopoli','Pen','Roha','Mangaon','Karad','Baramati','Pandharpur','Osmanabad','Beed','Parbhani','Hingoli','Washim','Buldhana','Chandrapur','Gadchiroli','Chiplun','Kudal','Sawantwadi','Vengurla','Malegaon','Manmad','Kopargaon','Shrirampur','Newasa','Igatpuri','Trimbakeshwar','Bhandardara','Talegaon','Chakan','Nigdi','Dehu Road','Lonavla','Rajgurunagar'
].map(name => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), tier: 3 as const, country: 'IN', hreflang: 'en-IN' }))

export const TIER3_OTHER: CityData[] = [
  'Haridwar','Rishikesh','Panipat','Karnal','Rohtak','Hisar','Ambala','Patiala','Bathinda','Mohali','Hoshiarpur','Muzaffarpur','Darbhanga','Bhagalpur','Gaya','Dhanbad','Jamshedpur','Bokaro','Asansol','Siliguri','Durgapur','Sambalpur','Berhampur','Agartala','Silchar','Dibrugarh','Imphal','Shillong','Aizawl','Kohima','Itanagar','Gangtok','Dharamshala','Hamirpur','Solan','Nahan','Chamba','Roorkee','Haldwani','Kashipur','Rudrapur','Pithoragarh','Almora','Nainital','Sonipat','Rewari','Bhiwani','Jind','Sirsa','Fatehabad','Kaithal','Yamunanagar','Kurukshetra','Moga','Kapurthala','Firozpur','Muktsar','Barnala','Sangrur','Nawanshahr','Phagwara','Nalanda','Begusarai','Samastipur','Madhubani','Sitamarhi','Arrah','Buxar','Chapra','Motihari','Purnia','Katihar','Kishanganj','Hazaribagh','Deoghar','Giridih','Ramgarh','Medinipur','Burdwan','Baharampur','Krishnanagar','Cuttack','Rourkela','Balasore','Puri','Jeypore','Tezpur','Nagaon','Jorhat','Bongaigaon','Nalbari','Karimganj','Abohar','Bhatinda','Pathankot'
].map(name => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), tier: 3 as const, country: 'IN', hreflang: 'en-IN' }))

export const INTERNATIONAL: CityData[] = [
  ...[
    'New York','San Francisco','Los Angeles','Chicago','Houston','Seattle','Boston','Austin','Dallas','Washington DC','Atlanta','Miami','San Jose','Denver','Phoenix'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'US', hreflang: 'en' })),
  ...[
    'London','Manchester','Birmingham','Leeds','Glasgow','Liverpool','Bristol','Sheffield','Edinburgh','Leicester'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'UK', hreflang: 'en' })),
  ...[
    'Toronto','Vancouver','Calgary','Montreal','Ottawa','Edmonton','Mississauga','Brampton','Hamilton'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'CA', hreflang: 'en' })),
  ...[
    'Sydney','Melbourne','Brisbane','Perth','Adelaide','Canberra','Gold Coast'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'AU', hreflang: 'en' })),
  ...[
    'Dubai','Abu Dhabi','Sharjah','Doha','Kuwait City','Riyadh','Jeddah','Muscat','Bahrain','Manama'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'ME', hreflang: 'en' })),
  ...[
    'Singapore','Kuala Lumpur','Bangkok','Jakarta'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'SEA', hreflang: 'en' })),
  ...[
    'Amsterdam','Frankfurt','Berlin','Paris','Dublin','Zurich'
  ].map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), tier: 1 as const, country: 'EU', hreflang: 'en' })),
]

export const ALL_CITIES: CityData[] = [
  ...TIER1_INDIA,
  ...TIER2_INDIA,
  ...TIER3_MAHARASHTRA,
  ...TIER3_OTHER,
  ...INTERNATIONAL,
]

export function getCityBySlug(slug: string): CityData | undefined {
  return ALL_CITIES.find(c => c.slug === slug)
}
