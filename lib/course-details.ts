export interface CurriculumModule {
  title: string
  topics: string[]
}

export interface CourseFAQ {
  q: string
  a: string
}

export interface CourseTestimonial {
  name: string
  role: string
  city: string
  quote: string
  avatar: string
}

export const COURSE_CURRICULUM: Record<string, CurriculumModule[]> = {
  'full-stack-web-development': [
    { title: 'HTML, CSS & JavaScript Fundamentals', topics: ['Semantic HTML5', 'CSS Grid & Flexbox', 'Responsive design', 'ES6+ JavaScript', 'DOM manipulation'] },
    { title: 'React & Component Architecture', topics: ['JSX & component lifecycle', 'Hooks & state management', 'React Router', 'Context API & Redux', 'Performance optimization'] },
    { title: 'Next.js & Server-Side Rendering', topics: ['App Router & file-based routing', 'SSR, SSG & ISR strategies', 'API routes', 'Middleware & authentication', 'SEO optimization'] },
    { title: 'Node.js & Express Backend', topics: ['REST API design', 'Authentication with JWT', 'Middleware patterns', 'Error handling', 'File uploads & streaming'] },
    { title: 'Database & ORM', topics: ['PostgreSQL fundamentals', 'Prisma ORM', 'Database modeling', 'Migrations & seeding', 'Query optimization'] },
    { title: 'Cloud Deployment & DevOps Basics', topics: ['AWS EC2 & S3', 'Docker basics', 'CI/CD with GitHub Actions', 'Environment management', 'Monitoring & logging'] },
  ],
  'generative-ai-engineering': [
    { title: 'Python for AI Development', topics: ['Python advanced patterns', 'Data structures', 'Async programming', 'Package management', 'Testing frameworks'] },
    { title: 'LLM Fundamentals & Prompt Engineering', topics: ['Transformer architecture', 'Prompt design patterns', 'Few-shot & chain-of-thought', 'Token optimization', 'Model evaluation'] },
    { title: 'LangChain & Agent Frameworks', topics: ['Chain composition', 'Agent design', 'Tool integration', 'Memory systems', 'Output parsing'] },
    { title: 'RAG Pipelines & Vector Databases', topics: ['Document chunking', 'Embedding models', 'Pinecone & ChromaDB', 'Retrieval strategies', 'Hybrid search'] },
    { title: 'Fine-Tuning & Model Optimization', topics: ['LoRA & QLoRA techniques', 'Dataset preparation', 'Training pipelines', 'Evaluation metrics', 'Model deployment'] },
    { title: 'AI Product Deployment', topics: ['FastAPI backends', 'Streaming responses', 'Cost optimization', 'Rate limiting', 'Production monitoring'] },
  ],
  'graphic-designing': [
    { title: 'Design Principles & Color Theory', topics: ['Typography fundamentals', 'Color psychology', 'Layout & composition', 'Visual hierarchy', 'Grid systems'] },
    { title: 'Adobe Photoshop Mastery', topics: ['Layer management', 'Photo manipulation', 'Retouching techniques', 'Compositing', 'Export workflows'] },
    { title: 'Adobe Illustrator & Vector Art', topics: ['Pen tool mastery', 'Logo design', 'Icon creation', 'Pattern design', 'Print-ready files'] },
    { title: 'Brand Identity Design', topics: ['Brand strategy', 'Logo systems', 'Brand guidelines', 'Stationery design', 'Brand applications'] },
    { title: 'Social Media & Digital Creatives', topics: ['Platform-specific sizing', 'Canva Pro workflows', 'Motion graphics basics', 'Ad creative design', 'Content calendars'] },
  ],
  'ui-ux-design': [
    { title: 'UX Research & Strategy', topics: ['User interviews', 'Persona creation', 'Journey mapping', 'Competitive analysis', 'Information architecture'] },
    { title: 'Wireframing & Prototyping', topics: ['Low-fidelity wireframes', 'Interactive prototypes', 'User flow design', 'Figma components', 'Auto-layout mastery'] },
    { title: 'Visual Design & Design Systems', topics: ['Typography systems', 'Color token architecture', 'Component libraries', 'Spacing & grid systems', 'Dark mode design'] },
    { title: 'Usability Testing & Iteration', topics: ['Test script writing', 'Moderated testing', 'Heuristic evaluation', 'A/B testing basics', 'Data-driven redesign'] },
    { title: 'Design Handoff & Portfolio', topics: ['Developer handoff specs', 'Figma-to-code workflow', 'Case study writing', 'Portfolio presentation', 'Design critique skills'] },
  ],
  'backend-engineering': [
    { title: 'Advanced Node.js & TypeScript', topics: ['Event loop deep dive', 'Streams & buffers', 'TypeScript generics', 'Dependency injection', 'Worker threads'] },
    { title: 'API Design & Architecture', topics: ['REST best practices', 'GraphQL schema design', 'gRPC fundamentals', 'API versioning', 'Rate limiting & throttling'] },
    { title: 'Database Engineering', topics: ['PostgreSQL advanced queries', 'Indexing strategies', 'Redis caching patterns', 'Database replication', 'Sharding concepts'] },
    { title: 'System Design & Scalability', topics: ['Load balancing', 'Microservices patterns', 'Message queues with RabbitMQ', 'Event-driven architecture', 'CAP theorem'] },
    { title: 'Security & Monitoring', topics: ['OWASP security practices', 'OAuth2 & OpenID Connect', 'Request logging', 'APM tools', 'Incident response'] },
  ],
  'ai-automation': [
    { title: 'Automation Fundamentals', topics: ['Process mapping', 'Trigger & action patterns', 'Data flow design', 'Error handling', 'Scheduling & cron'] },
    { title: 'n8n & Make.com Workflows', topics: ['Visual workflow building', 'API integrations', 'Data transformation', 'Conditional logic', 'Webhook triggers'] },
    { title: 'Python Automation Scripts', topics: ['Web scraping with BeautifulSoup', 'Selenium browser automation', 'Email automation', 'File processing', 'API interaction scripts'] },
    { title: 'AI-Powered Automation', topics: ['OpenAI API integration', 'Document processing', 'Chatbot building', 'Content generation pipelines', 'Classification workflows'] },
    { title: 'Client Projects & Delivery', topics: ['Requirement gathering', 'Solution architecture', 'Testing & QA', 'Documentation', 'Client handoff process'] },
  ],
  'devops-deployment': [
    { title: 'Linux & Networking Fundamentals', topics: ['Shell scripting', 'File system management', 'Network protocols', 'SSH & security', 'Process management'] },
    { title: 'Docker & Containerization', topics: ['Dockerfile best practices', 'Multi-stage builds', 'Docker Compose', 'Container networking', 'Image optimization'] },
    { title: 'Kubernetes Orchestration', topics: ['Pod management', 'Services & ingress', 'ConfigMaps & secrets', 'Helm charts', 'Cluster monitoring'] },
    { title: 'CI/CD Pipelines', topics: ['GitHub Actions workflows', 'Automated testing', 'Deployment strategies', 'Blue-green deployments', 'Rollback procedures'] },
    { title: 'Infrastructure as Code', topics: ['Terraform basics', 'AWS resource provisioning', 'State management', 'Ansible configuration', 'Infrastructure monitoring'] },
  ],
  'freelancing-accelerator': [
    { title: 'Freelance Business Setup', topics: ['Niche selection', 'Service packaging', 'Pricing strategies', 'Legal basics', 'Tool stack setup'] },
    { title: 'Portfolio & Personal Branding', topics: ['Portfolio website creation', 'Case study writing', 'LinkedIn optimization', 'Content marketing', 'Social proof building'] },
    { title: 'Client Acquisition', topics: ['Upwork profile optimization', 'Proposal writing', 'Cold outreach strategy', 'Fiverr gig creation', 'Referral systems'] },
    { title: 'Project Management', topics: ['Scope definition', 'Timeline estimation', 'Client communication', 'Revision management', 'Payment collection'] },
    { title: 'Scaling & Growth', topics: ['Recurring revenue models', 'Subcontracting', 'Agency transition', 'Passive income streams', 'Advanced negotiation'] },
  ],
}

export const COURSE_FAQS: Record<string, CourseFAQ[]> = {
  'full-stack-web-development': [
    { q: 'Do I need prior coding experience for this course?', a: 'No prior experience is required. The program starts from HTML and JavaScript basics and progressively builds toward advanced React and Node.js development. Students from non-technical backgrounds have successfully completed this program.' },
    { q: 'What projects will I build during the program?', a: 'You will build 5 to 8 production applications including a portfolio website, an e-commerce platform, a social media dashboard, a real-time chat application, and a full SaaS product. All projects are deployed live with real domains.' },
    { q: 'Is this course available in online and offline mode?', a: 'Yes, PlaceMate offers both online and hybrid modes for Full Stack Web Development. Online students attend live sessions via video call, while hybrid students can attend in-person sessions at select partner locations.' },
    { q: 'What kind of placement support is provided after the course?', a: 'You receive resume reviews, LinkedIn optimization, 5+ mock interview rounds, portfolio feedback, and access to our hiring partner network. Our career team actively shares relevant job openings and facilitates referrals.' },
    { q: 'How is this program different from free YouTube tutorials?', a: 'Free tutorials teach isolated concepts without structure, feedback, or accountability. PlaceMate provides a structured curriculum, mentor-led code reviews, team projects with agile workflows, real internship experience, and career support — all elements that make you job-ready.' },
    { q: 'Are there EMI or installment payment options available?', a: 'Yes, flexible EMI options start from ₹3,000 per month with zero interest for qualifying students. Need-based scholarships are also available. Contact our counseling team for personalized payment plans.' },
  ],
  'generative-ai-engineering': [
    { q: 'Do I need a machine learning background for this course?', a: 'No ML background is needed. The program teaches AI engineering from a practical product-building perspective, not academic ML theory. You need basic Python familiarity, which we cover in the first module.' },
    { q: 'Will I learn to build real AI products?', a: 'Yes, you will build 4 to 6 AI products including a RAG-powered chatbot, an AI content generator, a document analysis tool, and a custom AI agent. All products are deployed with production-grade APIs.' },
    { q: 'Which AI models and tools are covered?', a: 'The program covers OpenAI GPT models, LangChain, vector databases like Pinecone and ChromaDB, HuggingFace transformers, fine-tuning with LoRA, and deployment with FastAPI. We update the curriculum quarterly to include the latest tools.' },
    { q: 'Is the GenAI field saturated?', a: 'Demand for AI engineers who can build production AI products significantly exceeds supply. Companies need professionals who can integrate LLMs into real applications, not just prompt engineers. This program focuses on production AI development.' },
    { q: 'What is the expected salary after completing this program?', a: 'AI engineering roles typically start at ₹12 to ₹25 LPA for freshers with strong portfolios. Our graduates have secured positions ranging from ₹15 LPA to ₹28 LPA depending on their prior experience and interview performance.' },
  ],
  'graphic-designing': [
    { q: 'Do I need any artistic background?', a: 'No artistic background is required. The program teaches design principles, color theory, and tool mastery from scratch. Many successful designers come from non-artistic backgrounds and develop their skills through structured practice.' },
    { q: 'What software will I learn?', a: 'You will gain proficiency in Adobe Photoshop, Illustrator, InDesign, Lightroom, After Effects basics, and Canva Pro. The program focuses on the tools most used by professional designers and design agencies.' },
    { q: 'Can I start freelancing after this course?', a: 'Yes, the program includes portfolio building and client acquisition basics. Many graduates start freelancing within weeks of completion with brand identity projects, social media design packages, and print design services.' },
    { q: 'Is graphic design still a viable career in 2025?', a: 'Visual communication demand continues to grow across every industry. Companies need brand designers, social media creatives, packaging designers, and marketing collateral specialists. The shift to digital has expanded career opportunities.' },
    { q: 'What will my portfolio include after the program?', a: 'Your portfolio will feature 8 to 12 projects including brand identity systems, social media campaigns, print layouts, packaging designs, and digital advertising creatives — all created during the program with mentor feedback.' },
  ],
  'ui-ux-design': [
    { q: 'Is UI/UX design suitable for non-designers?', a: 'Absolutely. UI/UX design is a problem-solving discipline, not an art form. Many successful product designers come from engineering, psychology, business, and other non-design backgrounds. The program teaches all required skills from fundamentals.' },
    { q: 'What tools will I master?', a: 'Figma is the primary tool, covering component design, auto-layout, prototyping, and design systems. You will also learn Framer for advanced interactions, FigJam for collaboration, and Maze for usability testing.' },
    { q: 'How many case studies will I complete?', a: 'You will complete 4 to 6 detailed case studies covering mobile app design, web application design, dashboard design, and a complete product redesign. Each case study includes research, wireframes, prototypes, and usability testing results.' },
    { q: 'What roles can I apply for after this program?', a: 'Graduates can apply for UI Designer, UX Designer, Product Designer, Interaction Designer, and UX Researcher roles. Some graduates also move into freelance product design consulting for startups.' },
    { q: 'Do I need to know coding?', a: 'No coding is required. However, the program covers design-to-developer handoff workflows and basic understanding of HTML/CSS concepts so you can communicate effectively with engineering teams.' },
  ],
  'backend-engineering': [
    { q: 'What prerequisites are needed for this program?', a: 'You should have basic programming experience in any language and understanding of web fundamentals. This is an intermediate-level program designed for those who want to specialize in server-side architecture and API development.' },
    { q: 'Which languages and frameworks are covered?', a: 'The primary stack is Node.js with TypeScript, Express, and Fastify. You will also learn FastAPI with Python for comparison. Database coverage includes PostgreSQL and Redis, with Docker for containerization.' },
    { q: 'Will I learn system design?', a: 'Yes, system design is a core focus. You will study load balancing, caching strategies, message queues, microservices, database sharding, and distributed system patterns. These are the topics asked in senior engineering interviews.' },
    { q: 'What kind of APIs will I build?', a: 'You will build REST APIs, GraphQL APIs, real-time WebSocket servers, and a complete microservices application. All projects handle authentication, rate limiting, error handling, and proper logging.' },
    { q: 'Is backend engineering in demand?', a: 'Backend engineers remain among the most sought-after roles in tech. Every application needs server infrastructure, APIs, and data management. Companies consistently struggle to find engineers with production backend experience.' },
  ],
  'ai-automation': [
    { q: 'Do I need programming experience?', a: 'Basic familiarity helps but is not required. The program covers both no-code automation platforms like n8n and Make.com as well as Python scripting. Non-programmers can build powerful automations using visual workflow builders.' },
    { q: 'What types of automation will I learn?', a: 'You will learn email automation, CRM workflows, social media scheduling, data processing pipelines, AI-powered document analysis, chatbot creation, and custom business process automation.' },
    { q: 'Can I earn money with automation skills?', a: 'Automation consulting is a high-demand freelance niche. Businesses pay ₹20,000 to ₹2,00,000 per automation project. Many graduates start earning within the first month by automating workflows for small businesses.' },
    { q: 'Which platforms are covered?', a: 'n8n, Make.com, Zapier, Google Apps Script, Airtable, and Python with Selenium and BeautifulSoup. The program emphasizes n8n for its flexibility and self-hosting capabilities.' },
    { q: 'How is this different from just learning Zapier?', a: 'This program teaches automation engineering, not just button-clicking on a single platform. You learn to design automation architectures, handle edge cases, integrate AI capabilities, and deliver professional solutions to clients.' },
  ],
  'devops-deployment': [
    { q: 'What background do I need for DevOps?', a: 'Basic Linux command line familiarity and understanding of web application architecture. This is an intermediate program best suited for developers who want to specialize in infrastructure, deployment, and operations.' },
    { q: 'Which cloud platform is covered?', a: 'AWS is the primary cloud platform. You will learn EC2, S3, RDS, ECS, Lambda, and CloudWatch. The infrastructure-as-code concepts transfer to Azure and GCP as well.' },
    { q: 'Will I get hands-on with Kubernetes?', a: 'Yes, Kubernetes is covered extensively. You will set up clusters, deploy multi-container applications, configure ingress controllers, manage secrets, and implement monitoring with Prometheus and Grafana.' },
    { q: 'What CI/CD tools are taught?', a: 'GitHub Actions is the primary CI/CD platform. You will build complete pipelines including automated testing, Docker image building, staging deployments, production releases, and rollback procedures.' },
    { q: 'What is the career outlook for DevOps engineers?', a: 'DevOps and cloud engineering roles have grown over 35 percent year-over-year. Companies are investing heavily in infrastructure automation, and experienced DevOps engineers command salaries of ₹15 to ₹35 LPA in the Indian market.' },
  ],
  'freelancing-accelerator': [
    { q: 'Can I join this without technical skills?', a: 'This program is open to all skill levels. Whether you are a developer, designer, writer, or marketer, the freelancing strategies taught apply across all service-based businesses. The focus is on business skills, not technical training.' },
    { q: 'Will I actually get clients during the program?', a: 'The program includes real client simulation exercises and guided platform setup. Many students land their first paying client during or within two weeks of completing the program through optimized Upwork and Fiverr profiles.' },
    { q: 'How much can I earn as a freelancer?', a: 'Earnings vary widely based on your skill niche and effort. Our graduates typically earn ₹30,000 to ₹2,00,000 per month within six months. Top performers scale to ₹5,00,000 per month within the first year by building recurring client relationships.' },
    { q: 'Is freelancing a sustainable career?', a: 'Freelancing is a growing global market worth over $1.5 trillion. With proper positioning, portfolio development, and client management systems, freelancing provides both income stability and lifestyle flexibility that traditional employment cannot match.' },
    { q: 'What platforms will I learn to use?', a: 'Upwork, Fiverr, LinkedIn, Toptal application strategy, and direct cold outreach via email. The program also covers building your own portfolio website and using Notion for project management.' },
  ],
}

export const COURSE_TESTIMONIALS: Record<string, CourseTestimonial[]> = {
  'full-stack-web-development': [
    { name: 'Aarav Shah', role: 'Full Stack Engineer @ Razorpay', city: 'Mumbai', avatar: 'AS', quote: 'Shipped 6 production apps during the cohort. The internship phase connected me with Razorpay, and mock interviews prepared me for every technical round I faced.' },
    { name: 'Neha Gupta', role: 'Frontend Developer @ Flipkart', city: 'Bangalore', avatar: 'NG', quote: 'The React and Next.js modules were incredibly practical. Building real products with code reviews from senior engineers gave me confidence I never had from self-learning.' },
    { name: 'Vikram Joshi', role: 'Software Engineer @ Freshworks', city: 'Chennai', avatar: 'VJ', quote: 'Coming from a mechanical engineering background, I was nervous about switching to tech. The structured curriculum and mentor support made the transition smooth and successful.' },
  ],
  'generative-ai-engineering': [
    { name: 'Karan Mehta', role: 'AI Engineer @ AI Startup', city: 'Delhi', avatar: 'KM', quote: 'Built a production RAG pipeline that processes 10K documents daily. The hands-on approach with LangChain and vector databases was exactly what the industry demands.' },
    { name: 'Shreya Patel', role: 'ML Engineer @ Zomato', city: 'Pune', avatar: 'SP', quote: 'The fine-tuning module alone was worth the entire program. I deployed a custom model that reduced our content moderation costs by 60 percent at my current company.' },
    { name: 'Arjun Nair', role: 'AI Product Developer', city: 'Kochi', avatar: 'AN', quote: 'Started with basic Python knowledge and left building full AI SaaS products. The mentor feedback on architecture decisions was invaluable for my growth as an engineer.' },
  ],
  'graphic-designing': [
    { name: 'Ananya Sharma', role: 'Freelance Designer', city: 'Jaipur', avatar: 'AS', quote: 'Built a portfolio of 12 projects and landed three recurring clients within two months. The brand identity module transformed how I approach design projects professionally.' },
    { name: 'Rahul Verma', role: 'Graphic Designer @ Agency', city: 'Mumbai', avatar: 'RV', quote: 'The Photoshop and Illustrator training was thorough and practical. My mentor helped me develop a signature style that sets my work apart in a competitive market.' },
    { name: 'Pooja Singh', role: 'Creative Lead @ Startup', city: 'Noida', avatar: 'PS', quote: 'From zero design knowledge to leading a creative team in under a year. The program gave me both technical skills and design thinking that my team relies on daily.' },
  ],
  'ui-ux-design': [
    { name: 'Preethi Rao', role: 'Product Designer @ Swiggy', city: 'Bangalore', avatar: 'PR', quote: 'Built 12 case studies and received an offer before the cohort ended. The usability testing sessions with real users taught me more than any textbook ever could.' },
    { name: 'Amit Desai', role: 'UX Designer @ PayTM', city: 'Noida', avatar: 'AD', quote: 'The design systems module changed how I think about scalable design. My Figma skills went from basic to advanced, and the portfolio review sessions were game-changing.' },
    { name: 'Riya Kapoor', role: 'UI Designer @ Startup', city: 'Pune', avatar: 'RK', quote: 'As a psychology graduate, I found UX research intuitive, but needed structured training in visual design. This program filled every gap and helped me land my dream role.' },
  ],
  'backend-engineering': [
    { name: 'Rohan Deshmukh', role: 'Backend Developer @ Zerodha', city: 'Hyderabad', avatar: 'RD', quote: 'Built a production API handling 10K requests per minute during my internship. That single project carried my entire interview process at three different companies.' },
    { name: 'Deepak Kumar', role: 'SDE @ Amazon', city: 'Bangalore', avatar: 'DK', quote: 'The system design modules prepared me for senior-level interviews even as a fresher. Understanding distributed systems and caching patterns gave me a significant edge.' },
    { name: 'Sanya Malhotra', role: 'Backend Engineer @ Cred', city: 'Mumbai', avatar: 'SM', quote: 'The microservices project was incredibly realistic. Building, deploying, and monitoring a multi-service application taught me what production backend engineering actually looks like.' },
  ],
  'ai-automation': [
    { name: 'Vishal Reddy', role: 'Automation Consultant', city: 'Hyderabad', avatar: 'VR', quote: 'Started freelancing automation services within three weeks. My first client paid ₹45,000 for a CRM automation workflow I built using skills from the n8n module.' },
    { name: 'Meera Iyer', role: 'Operations Lead @ Startup', city: 'Chennai', avatar: 'MI', quote: 'Automated 15 manual processes at my company using techniques from this program. My manager promoted me to operations lead based on the efficiency improvements I delivered.' },
    { name: 'Tushar Patil', role: 'AI Automation Freelancer', city: 'Pune', avatar: 'TP', quote: 'The combination of no-code tools and Python scripting made me versatile. I can now handle automation projects that range from simple Zapier workflows to complex AI pipelines.' },
  ],
  'devops-deployment': [
    { name: 'Simran Kaur', role: 'DevOps Engineer @ TCS', city: 'Pune', avatar: 'SK', quote: 'Transitioned from IT support to DevOps engineering. The Kubernetes and Terraform modules gave me practical skills that impressed interviewers at every company I applied to.' },
    { name: 'Aditya Rao', role: 'Cloud Engineer @ Infosys', city: 'Bangalore', avatar: 'AR', quote: 'Set up a complete CI/CD pipeline during the program that I still reference at my current job. The AWS hands-on labs were more practical than any certification prep course.' },
    { name: 'Manish Tiwari', role: 'SRE @ Product Company', city: 'Gurugram', avatar: 'MT', quote: 'The monitoring stack setup with Prometheus and Grafana was a highlight. I deployed production-grade observability for my internship project and it became a talking point in every interview.' },
  ],
  'freelancing-accelerator': [
    { name: 'Kavya Nair', role: 'Freelance Web Developer', city: 'Kochi', avatar: 'KN', quote: 'Earned ₹1.8 lakh in my second month of freelancing. The proposal writing techniques and Upwork optimization strategies directly led to my first three client wins.' },
    { name: 'Siddharth Jain', role: 'Freelance Marketer', city: 'Jaipur', avatar: 'SJ', quote: 'The program taught me to treat freelancing as a business, not just gig work. My monthly revenue has grown from zero to ₹3 lakh within six months of graduating.' },
    { name: 'Divya Menon', role: 'Freelance Designer & Developer', city: 'Mumbai', avatar: 'DM', quote: 'Client communication and scope management skills from this program saved me from common freelancer mistakes. I now have five recurring clients and a waitlist for new projects.' },
  ],
}

// Auto-generate details for courses without manual entries
function generateCurriculum(c: {title:string; techs:string[]; duration:string}): CurriculumModule[] {
  const t = c.techs
  return [
    {title:`${c.title} Fundamentals`,topics:[`Introduction to ${c.title}`,'Industry overview & career paths',`Setting up your ${t[0]||c.title} environment`,'Core concepts & terminology','Hands-on starter project']},
    {title:`Core ${t[0]||c.title} Skills`,topics:[`${t[0]} deep dive`,...t.slice(1,4).map(x=>`Working with ${x}`),'Best practices & patterns']},
    {title:`Advanced ${t[Math.min(1,t.length-1)]||c.title}`,topics:[`Advanced ${t[1]||t[0]} techniques`,...t.slice(3,6).map(x=>`${x} integration`),'Performance optimization','Real-world project work']},
    {title:'Project Building & Portfolio',topics:['Capstone project planning','Building production-grade deliverables','Code/design review sessions','Portfolio presentation','Industry mentor feedback']},
    {title:'Internship & Career Prep',topics:['Resume building for '+c.title+' roles','Mock interviews & assessments','LinkedIn & portfolio optimization','Placement partner introductions','Career roadmap planning']},
  ]
}
function generateFAQs(c:{title:string;duration:string;mode:string;techs:string[]}): CourseFAQ[] {
  return [
    {q:`Do I need prior experience for the ${c.title} course?`,a:`No prior experience is required. Our ${c.title} program starts from fundamentals and progressively builds to advanced concepts over ${c.duration}. Students from all backgrounds have successfully completed this program.`},
    {q:`What tools and technologies will I learn?`,a:`You will gain hands-on proficiency in ${c.techs.slice(0,5).join(', ')} and more. The curriculum is updated regularly to match current industry requirements.`},
    {q:`Is the ${c.title} course available online?`,a:`Yes, PlaceMate offers ${c.title} training in ${c.mode.toLowerCase()} format. Online students attend live mentor-led sessions, complete hands-on projects, and participate in the internship phase — all remotely.`},
    {q:`What placement support is provided after completing ${c.title}?`,a:`Every graduate receives comprehensive placement assistance including resume optimization, mock interviews, portfolio reviews, LinkedIn optimization, and access to our hiring partner network for job referrals.`},
    {q:`What is the fee structure for ${c.title}?`,a:`The ${c.title} program (${c.duration}) offers flexible EMI plans starting at ₹3,000/month. Contact our counseling team for current batch schedules and detailed fee information.`},
  ]
}
function generateTestimonials(c:{title:string}): CourseTestimonial[] {
  const names: [string,string,string,string][] = [
    ['Priya Sharma','Professional','Delhi','PS'],['Rahul Kumar','Specialist','Bangalore','RK'],['Sneha Patel','Consultant','Mumbai','SP']
  ]
  const quotes = [
    `The ${c.title} program gave me practical skills that directly translated to my current role. The project-based approach and mentor feedback were invaluable.`,
    `Coming from a non-technical background, I was impressed by how structured and beginner-friendly the ${c.title} curriculum was. Landed my first role within two months of graduating.`,
    `The internship component set this apart from other programs. Working on real projects with daily standups prepared me for the actual workplace environment.`,
  ]
  return names.map((n,i)=>({name:n[0],role:`${c.title} ${n[1]}`,city:n[2],avatar:n[3],quote:quotes[i]}))
}

export function getCurriculum(slug:string, course?:{title:string;techs:string[];duration:string}): CurriculumModule[] {
  return COURSE_CURRICULUM[slug] || (course ? generateCurriculum(course) : [])
}
export function getFAQs(slug:string, course?:{title:string;duration:string;mode:string;techs:string[]}): CourseFAQ[] {
  return COURSE_FAQS[slug] || (course ? generateFAQs(course) : [])
}
export function getTestimonials(slug:string, course?:{title:string}): CourseTestimonial[] {
  return COURSE_TESTIMONIALS[slug] || (course ? generateTestimonials(course) : [])
}
