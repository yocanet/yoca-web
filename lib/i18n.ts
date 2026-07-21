import type { CheckupQuestion, Locale } from '@/types';

/** Yoca — locale dictionaries (en / tr / az). Server-side; pass strings to client components as props. */

export interface Dict {
  meta: {
    homeTitle: string;
    homeDescription: string;
    checkupTitle: string;
    checkupDescription: string;
  };
  nav: { home: string; about: string; services: string; work: string; products: string; checkup: string; contact: string };
  services: {
    heading: string;
    sub: string;
    items: Array<{ name: string; desc: string; points: string[] }>;
  };
  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    deliverables: string;
    processTitle: string;
    processSub: string;
    process: Array<{ name: string; desc: string }>;
    tabs: { problem: string; deliverables: string; stack: string };
    groups: Array<{
      key: string;
      system: string;
      title: string;
      desc: string;
      problem: string;
      deliverables: string[];
      stack: string[];
    }>;
  };
  products: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    sub: string;
    statusLive: string;
    statusSoon: string;
    statusExp: string;
    liveDemo: string;
    metricsNote: string;
    items: Array<{
      key: string;
      name: string;
      category: string;
      desc: string;
      status: 'live' | 'soon' | 'exp';
      url?: string;
      metrics: Array<{ value: string; label: string }>;
    }>;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    sub: string;
    storyTitle: string;
    story1: string;
    story2: string;
    story3: string;
    valuesTitle: string;
    valuesSub: string;
    values: Array<{ title: string; body: string }>;
    stackTitle: string;
    stackSub: string;
  };
  work: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    sub: string;
    sector: string;
    market: string;
    year: string;
    servicesLabel: string;
    problem: string;
    approach: string;
    solution: string;
    result: string;
    viewCase: string;
    backToWork: string;
    allWork: string;
    filterAll: string;
    filterClients: string;
    filterProducts: string;
    metricNote: string;
    quoteLabel: string;
    empty: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    description: string;
    name: string;
    email: string;
    company: string;
    message: string;
    consent: string;
    submit: string;
    success: string;
    based: string;
    direct: string;
    plannerSystems: string;
    plannerBudget: string;
    systems: string[];
    budgets: string[];
    scheduleTitle: string;
    scheduleSub: string;
    calendlyUrl: string;
  };
  cookies: {
    text: string;
    acceptAll: string;
    essentialOnly: string;
  };
  notFound: {
    heading: string;
    text: string;
    back: string;
  };
  errorPage: {
    heading: string;
    text: string;
    retry: string;
  };
  common: {
    languageSwitcher: string;
    loading: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    line: string;
  };
  systems: {
    heading: string;
    sub: string;
    items: Array<{ name: string; tagline: string; body: string; points: string[] }>;
  };
  clients: { heading: string };
  partners: { heading: string; sub: string; verified: string };
  clocks: { active: string; istanbul: string; baku: string; london: string; dubai: string };
  team: { heading: string; sub: string; linkedin: string };
  cta: { heading: string; body: string; button: string };
  footer: {
    message: string;
    rights: string;
    company: string;
    connect: string;
    hook: string;
    hookCta: string;
    colSystems: string;
    colProducts: string;
  };
  checkup: {
    eyebrow: string;
    title: string;
    description: string;
    introTitle: string;
    introSub: string;
    introStart: string;
    introPoints: string[];
    step: string;
    of: string;
    next: string;
    back: string;
    submit: string;
    contactTitle: string;
    contactDesc: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    consent: string;
    success: string;
    errorRequired: string;
    errorEmail: string;
    errorGeneric: string;
    questions: CheckupQuestion[];
  };
}

const en: Dict = {
  meta: {
    homeTitle: 'Yoca — Creative Growth Partner',
    homeDescription:
      'Yoca builds brands, digital experiences, growth systems and digital products through strategy, design, technology and performance.',
    checkupTitle: 'Free Digital Check-Up — Measure Your Digital Health | Yoca',
    checkupDescription:
      'Answer a short set of questions and get a personal analysis of your digital presence: website, SEO, ads, social and growth setup.',
  },
  nav: { home: 'Home', about: 'About', services: 'Services', work: 'Work', products: 'Products', checkup: 'Digital Check-Up', contact: 'Contact' },
  services: {
    heading: 'What we build around your next move.',
    sub: 'We do not begin by selling a predefined package. We identify what needs to change, then combine the right capabilities around it.',
    items: [
      { name: 'Brand Strategy & Identity', desc: 'Positioning, naming, verbal identity and visual systems built to make the brand clear, relevant and recognisable.', points: ['Positioning & brand architecture', 'Naming & verbal identity', 'Visual identity systems', 'Brand guidelines & rollout'] },
      { name: 'Web & Digital Experiences', desc: 'Corporate websites, platforms and conversion-focused digital experiences designed around real user behaviour.', points: ['UX architecture & prototyping', 'Corporate & campaign websites', 'E-commerce experiences', 'Performance, accessibility & SEO foundations'] },
      { name: 'Growth & Performance', desc: 'Acquisition, performance marketing, analytics and optimisation connected through one measurable growth model.', points: ['Google, Meta & TikTok campaigns', 'Conversion tracking & analytics setup', 'SEO & content strategy', 'CRO & landing page optimisation'] },
      { name: 'Creative Production', desc: 'Campaign ideas, social content, advertising creatives and visual systems made to earn attention.', points: ['Campaign concepts', 'Social media content systems', 'Ad creatives & motion', 'Art direction'] },
      { name: 'AI & Automation', desc: 'Practical AI tools and automated workflows that reduce repetition, accelerate decisions and improve operations.', points: ['Workflow automation', 'AI-assisted content pipelines', 'Chat & support assistants', 'Internal tools & integrations'] },
      { name: 'Digital Product Development', desc: 'From idea validation to MVP and launch, we design and develop useful digital products with room to scale.', points: ['Idea validation & scoping', 'MVP design & development', 'Product iteration & analytics', 'Launch & growth support'] },
    ],
  },
  servicesPage: {
    metaTitle: 'Services — Strategy, Design, Growth & Product | Yoca',
    metaDescription: 'Explore Yoca services: brand strategy, web and digital experiences, growth and performance, creative production, AI automation and digital product development.',
    eyebrow: 'Services',
    deliverables: 'What this covers',
    processTitle: 'One process. No black boxes.',
    processSub: 'Every engagement follows the same transparent rhythm, so you always know where the work stands and why.',
    process: [
      { name: 'Understand', desc: 'We map your market, audience and current setup — decisions start from evidence, not assumptions.' },
      { name: 'Define', desc: 'Together we agree on the change that matters most and the clearest route to it.' },
      { name: 'Build', desc: 'Strategy, design and engineering work side by side in short, reviewable cycles.' },
      { name: 'Grow', desc: 'We measure, report openly and keep optimising what the data proves is working.' },
    ],
    tabs: { problem: 'The problem it solves', deliverables: 'Deliverables', stack: 'Tech stack' },
    groups: [
      {
        key: 'brand',
        system: 'Yoca Brand System™',
        title: 'Brand & Creative',
        desc: 'Brand strategy, identity and creative production united under one system that makes the brand clear, relevant and impossible to confuse.',
        problem: 'The brand is invisible or interchangeable: unclear positioning, an inconsistent identity and creative work that fails to earn attention.',
        deliverables: ['Positioning & brand architecture', 'Naming & verbal identity', 'Visual identity systems', 'Campaign concepts & art direction', 'Social content systems', 'Ad creatives & motion'],
        stack: ['Figma', 'Adobe Creative Cloud', 'Notion', 'Frontify'],
      },
      {
        key: 'growth',
        system: 'Yoca Growth Engine™',
        title: 'Growth & Digital Experience',
        desc: 'Conversion-focused digital experiences and performance marketing connected into one measurable growth engine.',
        problem: 'Traffic without conversion, ads without tracking — a website that looks fine but does not sell, and no single number that tells the truth.',
        deliverables: ['UX architecture & conversion-focused websites', 'E-commerce experiences', 'Google / Meta / TikTok campaigns', 'Tracking, analytics & attribution', 'SEO & content strategy', 'CRO & landing page optimisation'],
        stack: ['Next.js', 'GA4', 'Google Tag Manager', 'Meta CAPI', 'Semrush', 'Hotjar'],
      },
      {
        key: 'scale',
        system: 'Yoca Scale Framework™',
        title: 'Product & Automation',
        desc: 'AI automation and digital product development that let the business grow without growing its complexity.',
        problem: 'Operations drown in repetition and good ideas never ship: no MVP discipline, no automation, no product ecosystem.',
        deliverables: ['Workflow automation', 'AI-assisted content pipelines', 'Chat & support assistants', 'Idea validation & MVP development', 'Product iteration & analytics', 'Launch & growth support'],
        stack: ['Supabase', 'Vercel', 'OpenAI API', 'Zapier / Make', 'Cloudflare'],
      },
    ],
  },
  products: {
    metaTitle: 'Products — YocaServe, WonKick, Demo Hub & Labs | Yoca',
    metaDescription: 'Yoca’s own product ecosystem: YocaServe, WonKick, Yoca Demo Hub and Yoca Labs — built and grown with the same systems we apply to client brands.',
    eyebrow: 'Yoca Products',
    heading: 'Products we build and grow ourselves.',
    sub: 'Our product ecosystem is where the Yoca methodology is stress-tested daily — the same systems we apply to client brands, running at our own risk.',
    statusLive: 'Live',
    statusSoon: 'In Development',
    statusExp: 'Experimental',
    liveDemo: 'Live Demo',
    metricsNote: '* Product metrics reflect internal reporting and are updated periodically.',
    items: [
      {
        key: 'yocaserve',
        name: 'YocaServe',
        category: 'Hospitality Tech',
        desc: 'A fast and flexible QR menu and digital service system created for restaurants, cafés, hotels and hospitality businesses.',
        status: 'live',
        metrics: [
          { value: '120+', label: 'Active venues' },
          { value: '+38%', label: 'Avg. order value' },
        ],
      },
      {
        key: 'wonkick',
        name: 'WonKick',
        category: 'Football / Interactive',
        desc: 'A football arcade hub where fans build squads, solve daily football challenges and compete through interactive game modes.',
        status: 'soon',
        metrics: [
          { value: '10K+', label: 'Daily challenges played' },
          { value: '3', label: 'Game modes in beta' },
        ],
      },
      {
        key: 'demo-hub',
        name: 'Yoca Demo Hub',
        category: 'Showcase',
        desc: 'A multilingual showcase of digital concepts, websites and experiences designed and developed by Yoca.',
        status: 'live',
        metrics: [
          { value: '25+', label: 'Live concepts' },
          { value: '4', label: 'Languages' },
        ],
      },
      {
        key: 'labs',
        name: 'Yoca Labs',
        category: 'Creative Technology',
        desc: 'Yoca’s experimental layer for visual AI, creative technology and the next generation of digital experiences.',
        status: 'exp',
        metrics: [
          { value: '12', label: 'Experiments shipped' },
          { value: '2025', label: 'Founded' },
        ],
      },
    ],
  },
  about: {
    metaTitle: 'About Yoca — Your Own Creative Agency',
    metaDescription: 'Yoca is an independent creative growth partner connecting strategy, design, technology and performance in one system. Meet the approach, the values and the team.',
    eyebrow: 'About Yoca',
    heading: 'Your Own Creative Agency.',
    sub: 'An independent team that treats your brand like its own — connecting strategy, design, technology and growth in one accountable system.',
    storyTitle: 'Why we exist',
    story1: 'Most brands don’t fail because of a lack of ideas. They fail because strategy, design, technology and marketing live in separate rooms, run by separate vendors, measured by separate numbers.',
    story2: 'Yoca was built to close that gap. We work as one compact senior team around a single question: what actually needs to change for this brand to grow — and what is the clearest way to build it?',
    story3: 'That is also why we are called Your Own Creative Agency: we work embedded, transparent and accountable, closer to an in-house team than an external supplier.',
    valuesTitle: 'The principles we work by',
    valuesSub: 'Not wall posters — the actual rules that shape daily decisions on every project.',
    values: [
      { title: 'Data before opinion', body: 'Every recommendation starts from research and measurement. When the data disagrees with us, the data wins.' },
      { title: 'ROI over output', body: 'We are not paid to produce deliverables. We are paid to move a number that matters to your business.' },
      { title: 'Transparent reporting', body: 'You see what we see: open dashboards, honest reviews and no vanity metrics in between.' },
      { title: 'Craft with intent', body: 'Design earns its place by working — beauty that doesn’t serve clarity or conversion is decoration.' },
    ],
    stackTitle: 'The tools behind the system',
    stackSub: 'A first-party, measurement-ready stack we set up and manage for every engagement.',
  },
  work: {
    metaTitle: 'Selected Work — Brands and Digital Experiences | Yoca',
    metaDescription: 'Selected brands, websites, platforms and digital experiences created by Yoca across different sectors and markets.',
    eyebrow: 'Selected Work',
    heading: 'Different challenges. Clear decisions. Work designed to move.',
    sub: 'Explore selected brands, websites, platforms and digital experiences created across different sectors and markets.',
    sector: 'Sector',
    market: 'Market',
    year: 'Year',
    servicesLabel: 'Services',
    problem: 'The Challenge',
    approach: 'Applied System',
    solution: 'Execution & Tech',
    result: 'Verified Results',
    viewCase: 'View Case Study',
    backToWork: 'Back to Work',
    allWork: 'View All Work',
    filterAll: 'All',
    filterClients: 'Client Case Studies',
    filterProducts: 'Yoca Products',
    metricNote: '* Metrics reflect reported client outcomes across engagement periods.',
    quoteLabel: 'Client Quote',
    empty: 'No projects in this category yet.',
  },
  contact: {
    metaTitle: 'Contact Yoca — Start a Project',
    metaDescription: 'Tell us what you are building. Share the project, its stage and what you want to change, and we will help define the right next move.',
    eyebrow: 'Contact',
    heading: 'Let’s build the next move.',
    description: 'Tell us what you are working on, where the project stands and what you want to change. Clear context helps us start with a better conversation.',
    name: 'Full Name',
    email: 'Email Address',
    company: 'Company or Brand',
    message: 'Tell us about the project',
    consent: 'I agree to the processing of my information.',
    submit: 'Send Project Details',
    success: 'Thank you. Your project details have been received. We will review them and contact you through the information provided.',
    based: 'Based in Türkiye. Working across markets.',
    direct: 'Prefer email?',
    plannerSystems: 'Which systems do you need?',
    plannerBudget: 'Estimated budget',
    systems: ['Brand System', 'Growth Engine', 'Scale Framework', 'Digital Product'],
    budgets: ['Under $5,000', '$5,000 – $15,000', '$15,000 – $40,000', '$40,000+', 'Not sure yet'],
    scheduleTitle: 'Prefer to talk it through?',
    scheduleSub: 'Book a free 30-minute intro call and let’s map the right next move together.',
    calendlyUrl: '',
  },
  cookies: {
    text: 'We use essential cookies to keep the website working and optional analytics cookies to understand how it is used.',
    acceptAll: 'Accept All',
    essentialOnly: 'Essential Only',
  },
  notFound: {
    heading: 'This page moved without leaving a strategy behind.',
    text: 'The page you are looking for does not exist or may have been moved.',
    back: 'Return Home',
  },
  errorPage: {
    heading: 'Something broke on our side.',
    text: 'An unexpected error occurred. Please try again in a moment.',
    retry: 'Try Again',
  },
  common: {
    languageSwitcher: 'Language',
    loading: 'Loading…',
  },
  hero: {
    eyebrow: 'Independent Creative Growth Partner',
    title: 'We turn ideas into brands, and brands into systems built to grow.',
    description:
      'Yoca connects strategy, design, technology and growth in one creative system—helping ambitious ideas launch clearly, grow intelligently and scale without losing their identity.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Free Digital Check-Up',
    line: 'Strategy. Identity. Experience. Growth.',
  },
  systems: {
    heading: 'One methodology. Three connected systems.',
    sub: 'Every engagement runs the same sequence — brand first, growth second, scale third — so each stage strengthens the next.',
    items: [
      {
        name: 'Yoca Brand System™',
        tagline: 'Positioning & identity',
        body: 'The positioning, message, identity and experience that give the brand a meaningful place in its market.',
        points: ['Positioning & architecture', 'Verbal & visual identity', 'Experience principles'],
      },
      {
        name: 'Yoca Growth Engine™',
        tagline: 'Measurable momentum',
        body: 'Communication, campaigns, performance and conversion connected into one repeatable growth system.',
        points: ['Performance campaigns', 'Conversion & analytics', 'Content & SEO'],
      },
      {
        name: 'Yoca Scale Framework™',
        tagline: 'Built to compound',
        body: 'The infrastructure, processes and product ecosystem needed to grow without unnecessary complexity.',
        points: ['Automation & AI', 'Product ecosystem', 'Operational tooling'],
      },
    ],
  },
  clients: { heading: 'Brands we move forward with.' },
  partners: {
    heading: 'Official partners of the platforms we grow on.',
    sub: 'Certified partnerships that keep our campaigns, data and tooling first-party.',
    verified: 'Verified Partner',
  },
  clocks: { active: 'Actively working for our clients right now.', istanbul: 'Istanbul', baku: 'Baku', london: 'London', dubai: 'Dubai' },
  team: {
    heading: 'The people behind the system.',
    sub: 'A compact senior team — strategy, creative, engineering and growth working side by side, without layers.',
    linkedin: 'LinkedIn profile of',
  },
  cta: {
    heading: 'What are you building next?',
    body: 'Tell us where you are, where you want to go and what is standing in the way. We will help define the right next move.',
    button: 'Start the Conversation',
  },
  footer: {
    message: 'Good ideas deserve a system built to move them forward.',
    rights: 'Yoca. Your Own Creative Agency. All rights reserved.',
    company: 'Company',
    connect: 'Connect',
    hook: 'Ready to Engineer Your Growth?',
    hookCta: 'Start a Project',
    colSystems: 'Systems',
    colProducts: 'Products',
  },
  checkup: {
    eyebrow: 'Digital Check-Up',
    title: 'How healthy is your digital presence?',
    description:
      'Answer a few short questions about your brand, channels and goals. We will review your answers and prepare a personal digital analysis with clear next steps.',
    introTitle: 'Get your free growth analysis in 3 minutes.',
    introSub:
      'Answer 16 quick questions about your brand, channels and goals. We review every submission personally and reply with a clear, honest assessment — no strings attached.',
    introStart: 'Start the Check-Up',
    introPoints: ['16 quick questions — about 3 minutes', 'A 0–100 digital health score', 'Personal review with honest next steps'],
    step: 'Step',
    of: 'of',
    next: 'Next',
    back: 'Back',
    submit: 'Get My Analysis',
    contactTitle: 'Almost done. Where should we send your analysis?',
    contactDesc: 'We review every check-up personally and reply with a short, honest assessment.',
    name: 'Full Name',
    company: 'Company or Brand',
    email: 'Email Address',
    phone: 'Phone Number',
    consent: 'I agree to the processing of my information.',
    success:
      'Your application has been received. We are preparing your digital analysis and will contact you shortly.',
    errorRequired: 'Please fill in the required fields.',
    errorEmail: 'Please enter a valid email address.',
    errorGeneric: 'Something went wrong. Please try again or email us directly.',
    questions: [
      { key: 'sector', title: 'Which sector are you in?', options: ['E-commerce / Retail', 'Professional Services', 'Hospitality / Tourism', 'Healthcare', 'Technology / SaaS', 'Real Estate / Construction', 'Other'] },
      { key: 'audience', title: 'Who do you sell to?', options: ['Businesses (B2B)', 'Consumers (B2C)', 'Both'] },
      { key: 'size', title: 'How big is your team?', options: ['Just me', '2–10 people', '11–50 people', '50+ people'] },
      { key: 'website', title: 'How would you describe your website?', options: ['We don’t have one', 'Old — we’re not proud of it', 'New, but it doesn’t bring results', 'Current and performing well'] },
      { key: 'mobile', title: 'Is your website comfortable to use on a phone?', options: ['No / not sure', 'Partly', 'Yes, fully mobile-friendly'] },
      { key: 'ecommerce', title: 'Do you sell online?', options: ['No online sales', 'Through marketplaces only', 'Our own online store', 'Own store + marketplaces'] },
      { key: 'seo', title: 'What is your SEO situation?', options: ['Never worked on it', 'Tried before, then stopped', 'Ongoing but limited', 'Strong organic traffic'] },
      { key: 'content', title: 'How often do you publish content?', options: ['Rarely / never', 'Occasionally', 'Regularly with a plan'] },
      { key: 'google_ads', title: 'Are you running Google Ads?', options: ['No', 'We did in the past', 'Yes, managing it ourselves', 'Yes, with professional management'] },
      { key: 'meta_ads', title: 'Are you running Meta (Instagram / Facebook) ads?', options: ['No', 'We did in the past', 'Yes, managing it ourselves', 'Yes, with professional management'] },
      { key: 'other_channels', title: 'Any other active channels?', options: ['None', 'TikTok', 'LinkedIn', 'YouTube', 'More than one of these'] },
      { key: 'social', title: 'How active is your social media?', options: ['Inactive', 'Irregular posting', 'Regular posting', 'Strong, engaged community'] },
      { key: 'analytics', title: 'How do you measure your results?', options: ['We don’t measure', 'Analytics installed but unused', 'We check reports regularly', 'Full tracking with conversions'] },
      { key: 'crm', title: 'How do you track leads and customers?', options: ['We don’t track them', 'Spreadsheets / notes', 'A basic CRM tool', 'Integrated CRM with automation'] },
      { key: 'budget', title: 'What is your monthly marketing budget?', options: ['No fixed budget', 'Under $1,000', '$1,000 – $5,000', '$5,000+'] },
      { key: 'goal', title: 'What is your main growth goal?', options: ['Brand awareness', 'More leads and enquiries', 'Online sales growth', 'Launching a new market or product', 'More efficiency from what we have'] },
    ],
  },
};

const tr: Dict = {
  meta: {
    homeTitle: 'Yoca — Yaratıcı Büyüme Partneri',
    homeDescription:
      'Yoca; strateji, tasarım, teknoloji ve performansı birleştirerek markalar, dijital deneyimler, büyüme sistemleri ve ürünler geliştirir.',
    checkupTitle: 'Ücretsiz Dijital Check-Up — Dijital Sağlığınızı Ölçün | Yoca',
    checkupDescription:
      'Kısa bir soru setini yanıtlayın; web sitesi, SEO, reklam, sosyal medya ve büyüme kurulumunuz için kişisel bir analiz alın.',
  },
  nav: { home: 'Ana Sayfa', about: 'Hakkımızda', services: 'Hizmetler', work: 'Projeler', products: 'Ürünler', checkup: 'Dijital Check-Up', contact: 'İletişim' },
  services: {
    heading: 'Bir sonraki adımınızın ihtiyaç duyduğu yapıyı kuruyoruz.',
    sub: 'Önceden hazırlanmış bir paket satarak başlamayız. Değişmesi gereken noktayı belirler, doğru yetkinlikleri bunun etrafında birleştiririz.',
    items: [
      { name: 'Marka Stratejisi ve Kimlik', desc: 'Markayı net, anlamlı ve ayırt edilebilir hâle getiren konumlandırma, isimlendirme, marka dili ve görsel kimlik sistemleri.', points: ['Konumlandırma ve marka mimarisi', 'İsimlendirme ve marka dili', 'Görsel kimlik sistemleri', 'Marka rehberi ve uygulama'] },
      { name: 'Web ve Dijital Deneyimler', desc: 'Gerçek kullanıcı davranışlarına göre tasarlanan kurumsal siteler, platformlar ve dönüşüm odaklı dijital deneyimler.', points: ['UX mimarisi ve prototipleme', 'Kurumsal ve kampanya siteleri', 'E-ticaret deneyimleri', 'Performans, erişilebilirlik ve SEO altyapısı'] },
      { name: 'Büyüme ve Performans', desc: 'Tek bir ölçülebilir büyüme modeli altında birleştirilen müşteri kazanımı, performans pazarlaması, analiz ve optimizasyon.', points: ['Google, Meta ve TikTok kampanyaları', 'Dönüşüm takibi ve analitik kurulumu', 'SEO ve içerik stratejisi', 'CRO ve açılış sayfası optimizasyonu'] },
      { name: 'Yaratıcı Üretim', desc: 'Dikkat kazanmak için geliştirilen kampanya fikirleri, sosyal medya içerikleri, reklam kreatifleri ve görsel sistemler.', points: ['Kampanya konseptleri', 'Sosyal medya içerik sistemleri', 'Reklam kreatifleri ve motion', 'Sanat yönetimi'] },
      { name: 'Yapay Zekâ ve Otomasyon', desc: 'Tekrarlayan işleri azaltan, karar süreçlerini hızlandıran ve operasyonu geliştiren uygulanabilir yapay zekâ araçları ve otomasyonlar.', points: ['İş akışı otomasyonu', 'Yapay zekâ destekli içerik süreçleri', 'Sohbet ve destek asistanları', 'Kurum içi araçlar ve entegrasyonlar'] },
      { name: 'Dijital Ürün Geliştirme', desc: 'Fikir doğrulamadan MVP ve yayına kadar ölçeklenebilir, kullanılabilir dijital ürünler tasarlar ve geliştiririz.', points: ['Fikir doğrulama ve kapsam', 'MVP tasarımı ve geliştirme', 'Ürün iterasyonu ve analitik', 'Lansman ve büyüme desteği'] },
    ],
  },
  servicesPage: {
    metaTitle: 'Hizmetler — Strateji, Tasarım, Büyüme ve Ürün | Yoca',
    metaDescription: 'Yoca hizmetlerini keşfedin: marka stratejisi, web ve dijital deneyimler, büyüme ve performans, yaratıcı üretim, yapay zekâ otomasyonu ve dijital ürün geliştirme.',
    eyebrow: 'Hizmetler',
    deliverables: 'Neleri kapsar',
    processTitle: 'Tek süreç. Kapalı kutu yok.',
    processSub: 'Her iş birliği aynı şeffaf ritimle ilerler; işin hangi aşamada olduğunu ve nedenini her zaman bilirsiniz.',
    process: [
      { name: 'Anla', desc: 'Pazarınızı, hedef kitlenizi ve mevcut yapınızı haritalarız — kararlar varsayımdan değil, veriden başlar.' },
      { name: 'Tanımla', desc: 'En kritik değişimi ve ona giden en net rotayı birlikte belirleriz.' },
      { name: 'İnşa Et', desc: 'Strateji, tasarım ve yazılım; kısa ve incelenebilir döngülerle yan yana çalışır.' },
      { name: 'Büyüt', desc: 'Ölçer, şeffaf raporlar ve verinin işe yaradığını kanıtladığı noktaları optimize etmeye devam ederiz.' },
    ],
    tabs: { problem: 'Hangi problemi çözer?', deliverables: 'Neler teslim edilir?', stack: 'Teknoloji altyapısı' },
    groups: [
      {
        key: 'brand',
        system: 'Yoca Brand System™',
        title: 'Marka ve Kreatif',
        desc: 'Marka stratejisi, kimlik ve yaratıcı üretim; markayı net, anlamlı ve karıştırılamaz kılan tek bir sistem altında birleşir.',
        problem: 'Marka görünmez veya sıradan: Belirsiz konumlandırma, tutarsız kimlik ve dikkat kazanamayan kreatif işler.',
        deliverables: ['Konumlandırma ve marka mimarisi', 'İsimlendirme ve marka dili', 'Görsel kimlik sistemleri', 'Kampanya konseptleri ve sanat yönetimi', 'Sosyal medya içerik sistemleri', 'Reklam kreatifleri ve motion'],
        stack: ['Figma', 'Adobe Creative Cloud', 'Notion', 'Frontify'],
      },
      {
        key: 'growth',
        system: 'Yoca Growth Engine™',
        title: 'Büyüme ve Dijital Deneyim',
        desc: 'Dönüşüm odaklı dijital deneyimler ve performans pazarlaması, tek bir ölçülebilir büyüme motorunda birleşir.',
        problem: 'Dönüşümsüz trafik, takipsiz reklam — güzel görünen ama satmayan bir site ve gerçeği söyleyen tek bir metrik bile yok.',
        deliverables: ['UX mimarisi ve dönüşüm odaklı siteler', 'E-ticaret deneyimleri', 'Google / Meta / TikTok kampanyaları', 'Takip, analitik ve atıflama', 'SEO ve içerik stratejisi', 'CRO ve açılış sayfası optimizasyonu'],
        stack: ['Next.js', 'GA4', 'Google Tag Manager', 'Meta CAPI', 'Semrush', 'Hotjar'],
      },
      {
        key: 'scale',
        system: 'Yoca Scale Framework™',
        title: 'Ürün ve Otomasyon',
        desc: 'Yapay zekâ otomasyonu ve dijital ürün geliştirme; işletme, karmaşıklığı büyümeden büyüsün diye.',
        problem: 'Operasyon tekrarda boğuluyor, iyi fikirler asla yayına çıkmıyor: MVP disiplini yok, otomasyon yok, ürün ekosistemi yok.',
        deliverables: ['İş akışı otomasyonu', 'Yapay zekâ destekli içerik süreçleri', 'Sohbet ve destek asistanları', 'Fikir doğrulama ve MVP geliştirme', 'Ürün iterasyonu ve analitik', 'Lansman ve büyüme desteği'],
        stack: ['Supabase', 'Vercel', 'OpenAI API', 'Zapier / Make', 'Cloudflare'],
      },
    ],
  },
  products: {
    metaTitle: 'Ürünler — YocaServe, WonKick, Demo Hub ve Labs | Yoca',
    metaDescription: 'Yoca’nın kendi ürün ekosistemi: YocaServe, WonKick, Yoca Demo Hub ve Yoca Labs — müşteri markalarına uyguladığımız sistemlerle inşa edilip büyütülüyor.',
    eyebrow: 'Yoca Ürünleri',
    heading: 'Kendimiz inşa edip büyüttüğümüz ürünler.',
    sub: 'Ürün ekosistemimiz, Yoca metodolojisinin her gün gerçek koşullarda test edildiği yer — müşteri markalarına uyguladığımız sistemler, kendi riskimizle çalışıyor.',
    statusLive: 'Yayında',
    statusSoon: 'Geliştiriliyor',
    statusExp: 'Deneysel',
    liveDemo: 'Canlı Demo',
    metricsNote: '* Ürün metrikleri dahili raporlamayı yansıtır ve periyodik olarak güncellenir.',
    items: [
      {
        key: 'yocaserve',
        name: 'YocaServe',
        category: 'Konaklama Teknolojisi',
        desc: 'Restoranlar, kafeler, oteller ve konaklama işletmeleri için geliştirilen hızlı ve esnek QR menü ve dijital servis sistemi.',
        status: 'live',
        metrics: [
          { value: '120+', label: 'Aktif işletme' },
          { value: '+%38', label: 'Ortalama sipariş tutarı' },
        ],
      },
      {
        key: 'wonkick',
        name: 'WonKick',
        category: 'Futbol / İnteraktif',
        desc: 'Futbolseverlerin kadro kurduğu, günlük futbol görevlerini çözdüğü ve interaktif oyun modlarında yarıştığı bir futbol arcade merkezi.',
        status: 'soon',
        metrics: [
          { value: '10B+', label: 'Günlük oynanan görev' },
          { value: '3', label: 'Betadaki oyun modu' },
        ],
      },
      {
        key: 'demo-hub',
        name: 'Yoca Demo Hub',
        category: 'Vitrin',
        desc: 'Yoca tarafından tasarlanan ve geliştirilen dijital konseptlerin, internet sitelerinin ve deneyimlerin çok dilli vitrini.',
        status: 'live',
        metrics: [
          { value: '25+', label: 'Canlı konsept' },
          { value: '4', label: 'Dil' },
        ],
      },
      {
        key: 'labs',
        name: 'Yoca Labs',
        category: 'Yaratıcı Teknoloji',
        desc: 'Görsel yapay zekâ, yaratıcı teknoloji ve yeni nesil dijital deneyimler için Yoca’nın deneysel geliştirme alanı.',
        status: 'exp',
        metrics: [
          { value: '12', label: 'Yayınlanan deney' },
          { value: '2025', label: 'Kuruluş' },
        ],
      },
    ],
  },
  about: {
    metaTitle: 'Hakkımızda — Yoca | Your Own Creative Agency',
    metaDescription: 'Yoca; strateji, tasarım, teknoloji ve performansı tek sistemde birleştiren bağımsız bir yaratıcı büyüme partneridir. Yaklaşımı, değerleri ve ekibi tanıyın.',
    eyebrow: 'Hakkımızda',
    heading: 'Your Own Creative Agency.',
    sub: 'Markanıza kendi markası gibi davranan bağımsız bir ekip — strateji, tasarım, teknoloji ve büyümeyi tek ve hesap verebilir bir sistemde birleştirir.',
    storyTitle: 'Neden varız',
    story1: 'Çoğu marka fikir eksikliğinden başarısız olmaz. Strateji, tasarım, teknoloji ve pazarlamanın ayrı odalarda, ayrı tedarikçilerle, ayrı metriklerle yaşamasından başarısız olur.',
    story2: 'Yoca bu boşluğu kapatmak için kuruldu. Kompakt ve kıdemli tek bir ekip olarak tek bir sorunun etrafında çalışırız: Bu markanın büyümesi için gerçekte neyin değişmesi gerekiyor ve bunu inşa etmenin en net yolu ne?',
    story3: 'Adımızın Your Own Creative Agency olmasının nedeni de bu: Dışarıdan bir tedarikçi gibi değil, şirket içi bir ekibe daha yakın biçimde — gömülü, şeffaf ve hesap verebilir çalışırız.',
    valuesTitle: 'Çalışma ilkelerimiz',
    valuesSub: 'Duvar posteri değil — her projede günlük kararları şekillendiren gerçek kurallar.',
    values: [
      { title: 'Görüşten önce veri', body: 'Her öneri araştırma ve ölçümle başlar. Veri bizimle aynı fikirde değilse, veri kazanır.' },
      { title: 'Çıktı değil, ROI', body: 'İş teslim etmek için değil; işletmeniz için önemli olan bir sayıyı hareket ettirmek için çalışırız.' },
      { title: 'Şeffaf raporlama', body: 'Bizim gördüğümüzü siz de görürsünüz: Açık panolar, dürüst değerlendirmeler ve arada gösteriş metrikleri yok.' },
      { title: 'Amaçlı ustalık', body: 'Tasarım, işe yaradığı için yerini hak eder — netliğe veya dönüşüme hizmet etmeyen güzellik, süslemedir.' },
    ],
    stackTitle: 'Sistemin arkasındaki araçlar',
    stackSub: 'Her iş birliği için kurduğumuz ve yönettiğimiz, ölçüme hazır birincil veri altyapısı.',
  },
  work: {
    metaTitle: 'Seçili Projeler — Markalar ve Dijital Deneyimler | Yoca',
    metaDescription: 'Yoca tarafından farklı sektörler ve pazarlar için geliştirilen seçili markalar, internet siteleri, platformlar ve dijital deneyimler.',
    eyebrow: 'Seçili Projeler',
    heading: 'Farklı ihtiyaçlar. Net kararlar. Harekete geçiren işler.',
    sub: 'Farklı sektörler ve pazarlar için geliştirilen seçili markaları, internet sitelerini, platformları ve dijital deneyimleri inceleyin.',
    sector: 'Sektör',
    market: 'Pazar',
    year: 'Yıl',
    servicesLabel: 'Hizmetler',
    problem: 'Meydan Okuma',
    approach: 'Uygulanan Sistem',
    solution: 'Uygulama ve Teknoloji',
    result: 'Doğrulanmış Sonuçlar',
    viewCase: 'Projeyi İncele',
    backToWork: 'Projelere Dön',
    allWork: 'Tüm Projeleri Gör',
    filterAll: 'Tümü',
    filterClients: 'Müşteri Projeleri',
    filterProducts: 'Yoca Ürünleri',
    metricNote: '* Metrikler, çalışma dönemleri boyunca raporlanan müşteri sonuçlarını yansıtır.',
    quoteLabel: 'Müşteri Yorumu',
    empty: 'Bu kategoride henüz proje yok.',
  },
  contact: {
    metaTitle: 'Yoca ile İletişim — Projenizi Başlatın',
    metaDescription: 'Neyi inşa ettiğinizi anlatın. Projenizi, bulunduğu aşamayı ve değiştirmek istediklerinizi paylaşın; doğru sonraki adımı birlikte tanımlayalım.',
    eyebrow: 'İletişim',
    heading: 'Bir sonraki adımı birlikte inşa edelim.',
    description: 'Üzerinde çalıştığınız projeyi, bugün hangi aşamada olduğunu ve neyi değiştirmek istediğinizi anlatın. Net bir başlangıç, daha iyi bir görüşme sağlar.',
    name: 'Ad Soyad',
    email: 'E-posta Adresi',
    company: 'Şirket veya Marka',
    message: 'Projenizi Anlatın',
    consent: 'Bilgilerimin işlenmesini kabul ediyorum.',
    submit: 'Proje Bilgilerini Gönder',
    success: 'Teşekkürler. Proje bilgileriniz bize ulaştı. Bilgileri inceleyerek bıraktığınız iletişim kanalı üzerinden sizinle iletişime geçeceğiz.',
    based: 'Türkiye merkezli. Farklı pazarlarda çalışıyoruz.',
    direct: 'E-posta mı tercih edersiniz?',
    plannerSystems: 'Hangi sistemlere ihtiyacınız var?',
    plannerBudget: 'Tahmini bütçe',
    systems: ['Brand System', 'Growth Engine', 'Scale Framework', 'Dijital Ürün'],
    budgets: ['5.000 $ altı', '5.000 – 15.000 $', '15.000 – 40.000 $', '40.000 $+', 'Henüz belirsiz'],
    scheduleTitle: 'Konuşarak ilerlemek mi istersiniz?',
    scheduleSub: 'Ücretsiz 30 dakikalık tanışma görüşmesi planlayın; doğru sonraki adımı birlikte belirleyelim.',
    calendlyUrl: '',
  },
  cookies: {
    text: 'İnternet sitesinin çalışması için zorunlu çerezleri, kullanımını anlayabilmek için isteğe bağlı analiz çerezlerini kullanıyoruz.',
    acceptAll: 'Tümünü Kabul Et',
    essentialOnly: 'Yalnızca Zorunlu',
  },
  notFound: {
    heading: 'Bu sayfa, arkasında bir strateji bırakmadan taşınmış.',
    text: 'Aradığınız sayfa bulunmuyor veya başka bir adrese taşınmış olabilir.',
    back: 'Ana Sayfaya Dön',
  },
  errorPage: {
    heading: 'Bizim tarafımızda bir sorun oluştu.',
    text: 'Beklenmeyen bir hata meydana geldi. Lütfen kısa bir süre sonra tekrar deneyin.',
    retry: 'Tekrar Dene',
  },
  common: {
    languageSwitcher: 'Dil',
    loading: 'Yükleniyor…',
  },
  hero: {
    eyebrow: 'Bağımsız Yaratıcı Büyüme Partneri',
    title: 'Fikirleri markaya, markaları büyüyen sistemlere dönüştürüyoruz.',
    description:
      'Yoca; strateji, tasarım, teknoloji ve büyümeyi tek bir yaratıcı sistemde birleştirir. İddialı fikirlerin net biçimde yayına çıkmasını, akıllıca büyümesini ve kimliğini kaybetmeden ölçeklenmesini sağlar.',
    primaryCta: 'Projeyi Başlat',
    secondaryCta: 'Ücretsiz Dijital Check-Up',
    line: 'Strateji. Kimlik. Deneyim. Büyüme.',
  },
  systems: {
    heading: 'Tek metodoloji. Birbirine bağlı üç sistem.',
    sub: 'Her iş birliği aynı sırayla ilerler — önce marka, sonra büyüme, sonra ölçek — böylece her aşama bir sonrakini güçlendirir.',
    items: [
      {
        name: 'Yoca Brand System™',
        tagline: 'Konumlandırma ve kimlik',
        body: 'Markanın pazarda anlamlı bir yer edinmesini sağlayan konumlandırma, mesaj, kimlik ve deneyim.',
        points: ['Konumlandırma ve mimari', 'Sözel ve görsel kimlik', 'Deneyim ilkeleri'],
      },
      {
        name: 'Yoca Growth Engine™',
        tagline: 'Ölçülebilir ivme',
        body: 'İletişim, kampanya, performans ve dönüşümün tekrarlanabilir tek bir büyüme sisteminde birleşmesi.',
        points: ['Performans kampanyaları', 'Dönüşüm ve analitik', 'İçerik ve SEO'],
      },
      {
        name: 'Yoca Scale Framework™',
        tagline: 'Birleşerek büyüyen yapı',
        body: 'Gereksiz karmaşa olmadan büyümek için gereken altyapı, süreçler ve ürün ekosistemi.',
        points: ['Otomasyon ve yapay zekâ', 'Ürün ekosistemi', 'Operasyonel araçlar'],
      },
    ],
  },
  clients: { heading: 'Birlikte yol aldığımız markalar.' },
  partners: {
    heading: 'Üzerinde büyüdüğümüz platformların resmi iş ortağıyız.',
    sub: 'Kampanyalarımızı, verimizi ve araçlarımızı birincil kaynaktan yöneten sertifikalı iş ortaklıkları.',
    verified: 'Doğrulanmış İş Ortağı',
  },
  clocks: { active: 'Şu an müşterilerimiz için aktif çalışıyoruz.', istanbul: 'İstanbul', baku: 'Bakü', london: 'Londra', dubai: 'Dubai' },
  team: {
    heading: 'Sistemin arkasındaki insanlar.',
    sub: 'Katmansız çalışan kompakt bir kıdemli ekip — strateji, kreatif, yazılım ve büyüme yan yana.',
    linkedin: 'LinkedIn profili:',
  },
  cta: {
    heading: 'Sırada neyi inşa ediyorsunuz?',
    body: 'Bugün nerede olduğunuzu, nereye ulaşmak istediğinizi ve önünüzde neyin durduğunu anlatın. Doğru sonraki adımı birlikte tanımlayalım.',
    button: 'Konuşmayı Başlat',
  },
  footer: {
    message: 'İyi fikirler, onları ileri taşıyacak doğru sistemi hak eder.',
    rights: 'Yoca. Your Own Creative Agency. Tüm hakları saklıdır.',
    company: 'Şirket',
    connect: 'Bağlantı',
    hook: 'Büyümenizi Mühendisliğe Dönüştürmeye Hazır mısınız?',
    hookCta: 'Projeyi Başlat',
    colSystems: 'Sistemler',
    colProducts: 'Ürünler',
  },
  checkup: {
    eyebrow: 'Dijital Check-Up',
    title: 'Dijital varlığınız ne kadar sağlıklı?',
    description:
      'Markanız, kanallarınız ve hedefleriniz hakkında birkaç kısa soruyu yanıtlayın. Yanıtlarınızı inceleyip net adımlar içeren kişisel bir dijital analiz hazırlayalım.',
    introTitle: '3 dakikada ücretsiz büyüme analizinizi alın.',
    introSub:
      'Markanız, kanallarınız ve hedefleriniz hakkında 16 kısa soruyu yanıtlayın. Her başvuruyu tek tek inceliyor, net ve dürüst bir değerlendirmeyle dönüyoruz — hiçbir koşul yok.',
    introStart: 'Check-Up’a Başla',
    introPoints: ['16 kısa soru — yaklaşık 3 dakika', '0–100 arası dijital sağlık skoru', 'Kişisel inceleme, dürüst sonraki adımlar'],
    step: 'Adım',
    of: '/',
    next: 'İleri',
    back: 'Geri',
    submit: 'Analizimi Gönder',
    contactTitle: 'Neredeyse bitti. Analizinizi nereye gönderelim?',
    contactDesc: 'Her check-up başvurusunu tek tek inceliyor ve kısa, dürüst bir değerlendirmeyle dönüyoruz.',
    name: 'Ad Soyad',
    company: 'Şirket veya Marka',
    email: 'E-posta Adresi',
    phone: 'Telefon Numarası',
    consent: 'Bilgilerimin işlenmesini kabul ediyorum.',
    success:
      'Başvurunuz alındı. Dijital analiz raporunuz hazırlanıyor; kısa süre içinde sizinle iletişime geçeceğiz.',
    errorRequired: 'Lütfen zorunlu alanları doldurun.',
    errorEmail: 'Lütfen geçerli bir e-posta adresi girin.',
    errorGeneric: 'Bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.',
    questions: [
      { key: 'sector', title: 'Hangi sektördesiniz?', options: ['E-ticaret / Perakende', 'Profesyonel Hizmetler', 'Konaklama / Turizm', 'Sağlık', 'Teknoloji / SaaS', 'Gayrimenkul / İnşaat', 'Diğer'] },
      { key: 'audience', title: 'Kime satış yapıyorsunuz?', options: ['İşletmelere (B2B)', 'Tüketicilere (B2C)', 'Her ikisi'] },
      { key: 'size', title: 'Ekibiniz ne kadar büyük?', options: ['Sadece ben', '2–10 kişi', '11–50 kişi', '50+ kişi'] },
      { key: 'website', title: 'Web sitenizi nasıl tanımlarsınız?', options: ['Web sitemiz yok', 'Eski — pek gurur duymuyoruz', 'Yeni ama sonuç getirmiyor', 'Güncel ve iyi çalışıyor'] },
      { key: 'mobile', title: 'Siteniz telefonda rahat kullanılıyor mu?', options: ['Hayır / emin değilim', 'Kısmen', 'Evet, tamamen mobil uyumlu'] },
      { key: 'ecommerce', title: 'Online satış yapıyor musunuz?', options: ['Online satış yok', 'Yalnızca pazaryerlerinde', 'Kendi online mağazamız var', 'Kendi mağaza + pazaryerleri'] },
      { key: 'seo', title: 'SEO durumunuz nedir?', options: ['Hiç çalışılmadı', 'Denedik, sonra bıraktık', 'Devam ediyor ama sınırlı', 'Güçlü organik trafiğimiz var'] },
      { key: 'content', title: 'Ne sıklıkla içerik yayınlıyorsunuz?', options: ['Nadiren / hiç', 'Ara sıra', 'Planlı ve düzenli'] },
      { key: 'google_ads', title: 'Google Ads reklamı veriyor musunuz?', options: ['Hayır', 'Geçmişte verdik', 'Evet, kendimiz yönetiyoruz', 'Evet, profesyonel yönetimle'] },
      { key: 'meta_ads', title: 'Meta (Instagram / Facebook) reklamı veriyor musunuz?', options: ['Hayır', 'Geçmişte verdik', 'Evet, kendimiz yönetiyoruz', 'Evet, profesyonel yönetimle'] },
      { key: 'other_channels', title: 'Başka aktif kanalınız var mı?', options: ['Yok', 'TikTok', 'LinkedIn', 'YouTube', 'Birden fazlası'] },
      { key: 'social', title: 'Sosyal medyanız ne kadar aktif?', options: ['Aktif değil', 'Düzensiz paylaşım', 'Düzenli paylaşım', 'Güçlü ve etkileşimli topluluk'] },
      { key: 'analytics', title: 'Sonuçlarınızı nasıl ölçüyorsunuz?', options: ['Ölçmüyoruz', 'Analytics kurulu ama kullanılmıyor', 'Raporları düzenli takip ediyoruz', 'Dönüşüm takibiyle tam ölçüm'] },
      { key: 'crm', title: 'Müşteri adaylarını nasıl takip ediyorsunuz?', options: ['Takip etmiyoruz', 'Excel / notlar', 'Basit bir CRM aracı', 'Otomasyonlu entegre CRM'] },
      { key: 'budget', title: 'Aylık pazarlama bütçeniz nedir?', options: ['Sabit bütçe yok', '1.000 $ altı', '1.000 – 5.000 $', '5.000 $+'] },
      { key: 'goal', title: 'Ana büyüme hedefiniz nedir?', options: ['Marka bilinirliği', 'Daha fazla müşteri adayı', 'Online satış büyümesi', 'Yeni pazar veya ürün lansmanı', 'Mevcut yapıdan daha fazla verim'] },
    ],
  },
};

const az: Dict = {
  meta: {
    homeTitle: 'Yoca — Kreativ İnkişaf Tərəfdaşı',
    homeDescription:
      'Yoca strategiya, dizayn, texnologiya və performansı birləşdirərək brendlər, rəqəmsal təcrübələr, inkişaf sistemləri və məhsullar yaradır.',
    checkupTitle: 'Pulsuz Rəqəmsal Check-Up — Rəqəmsal Sağlamlığınızı Ölçün | Yoca',
    checkupDescription:
      'Qısa sual dəstinə cavab verin; sayt, SEO, reklam, sosial media və inkişaf quruluşunuz üçün fərdi analiz əldə edin.',
  },
  nav: { home: 'Ana səhifə', about: 'Haqqımızda', services: 'Xidmətlər', work: 'Layihələr', products: 'Məhsullar', checkup: 'Rəqəmsal Check-Up', contact: 'Əlaqə' },
  services: {
    heading: 'Növbəti addımınız üçün lazım olan sistemi qururuq.',
    sub: 'Əvvəlcədən hazırlanmış paket satmaqla başlamırıq. Dəyişməli olan nöqtəni müəyyən edir və uyğun bacarıqları onun ətrafında birləşdiririk.',
    items: [
      { name: 'Brend Strategiyası və Kimlik', desc: 'Brendi aydın, uyğun və tanınan edən mövqeləndirmə, adlandırma, verbal kimlik və vizual sistemlər.', points: ['Mövqeləndirmə və brend arxitekturası', 'Adlandırma və verbal kimlik', 'Vizual kimlik sistemləri', 'Brend qaydaları və tətbiq'] },
      { name: 'Veb və Rəqəmsal Təcrübələr', desc: 'Real istifadəçi davranışlarına əsaslanan korporativ saytlar, platformalar və konversiya yönümlü rəqəmsal təcrübələr.', points: ['UX arxitekturası və prototipləşdirmə', 'Korporativ və kampaniya saytları', 'E-ticarət təcrübələri', 'Performans, əlçatanlıq və SEO təməli'] },
      { name: 'İnkişaf və Performans', desc: 'Vahid ölçülə bilən inkişaf modeli ilə birləşdirilən istifadəçi cəlbi, performans marketinqi, analitika və optimizasiya.', points: ['Google, Meta və TikTok kampaniyaları', 'Konversiya izləməsi və analitika qurulumu', 'SEO və məzmun strategiyası', 'CRO və açılış səhifəsi optimizasiyası'] },
      { name: 'Kreativ İstehsal', desc: 'Diqqət qazanmaq üçün hazırlanan kampaniya ideyaları, sosial media məzmunu, reklam kreativləri və vizual sistemlər.', points: ['Kampaniya konseptləri', 'Sosial media məzmun sistemləri', 'Reklam kreativləri və motion', 'Art direksiya'] },
      { name: 'Süni İntellekt və Avtomatlaşdırma', desc: 'Təkrarlanan işləri azaldan, qərarları sürətləndirən və əməliyyatları yaxşılaşdıran praktik süni intellekt alətləri və avtomatlaşdırmalar.', points: ['İş axını avtomatlaşdırması', 'Sİ dəstəkli məzmun prosesləri', 'Söhbət və dəstək asistentləri', 'Daxili alətlər və inteqrasiyalar'] },
      { name: 'Rəqəmsal Məhsul İnkişafı', desc: 'İdeyanın təsdiqindən MVP və buraxılışa qədər miqyaslana bilən faydalı rəqəmsal məhsullar hazırlayırıq.', points: ['İdeyanın təsdiqi və əhatə dairəsi', 'MVP dizaynı və inkişafı', 'Məhsul iterasiyası və analitika', 'Buraxılış və inkişaf dəstəyi'] },
    ],
  },
  servicesPage: {
    metaTitle: 'Xidmətlər — Strategiya, Dizayn, İnkişaf və Məhsul | Yoca',
    metaDescription: 'Yoca xidmətlərini kəşf edin: brend strategiyası, veb və rəqəmsal təcrübələr, inkişaf və performans, kreativ istehsal, Sİ avtomatlaşdırması və rəqəmsal məhsul inkişafı.',
    eyebrow: 'Xidmətlər',
    deliverables: 'Nələri əhatə edir',
    processTitle: 'Vahid proses. Qapalı qutu yoxdur.',
    processSub: 'Hər əməkdaşlıq eyni şəffaf ritmlə irəliləyir; işin hansı mərhələdə olduğunu və səbəbini hər zaman bilirsiniz.',
    process: [
      { name: 'Anla', desc: 'Bazarınızı, auditoriyanızı və mövcud quruluşunuzu xəritələyirik — qərarlar fərziyyədən deyil, faktlardan başlayır.' },
      { name: 'Müəyyən et', desc: 'Ən vacib dəyişikliyi və ona gedən ən aydın yolu birlikdə müəyyən edirik.' },
      { name: 'Qur', desc: 'Strategiya, dizayn və proqramlaşdırma qısa, izlənə bilən dövrlərlə yan-yana işləyir.' },
      { name: 'Böyüt', desc: 'Ölçürük, şəffaf hesabat veririk və datanın işlədiyini sübut etdiyi nöqtələri optimallaşdırmağa davam edirik.' },
    ],
    tabs: { problem: 'Hansı problemi həll edir?', deliverables: 'Nələr təhvil verilir?', stack: 'Texnologiya dəsti' },
    groups: [
      {
        key: 'brand',
        system: 'Yoca Brand System™',
        title: 'Brend və Kreativ',
        desc: 'Brend strategiyası, kimlik və kreativ istehsal — brendi aydın, mənalı və qarışdırıla bilməz edən vahid sistemdə birləşir.',
        problem: 'Brend görünmür və ya adiləşib: qeyri-müəyyən mövqeləndirmə, ziddiyyətli kimlik və diqqət qazana bilməyən kreativ işlər.',
        deliverables: ['Mövqeləndirmə və brend arxitekturası', 'Adlandırma və verbal kimlik', 'Vizual kimlik sistemləri', 'Kampaniya konseptləri və art direksiya', 'Sosial media məzmun sistemləri', 'Reklam kreativləri və motion'],
        stack: ['Figma', 'Adobe Creative Cloud', 'Notion', 'Frontify'],
      },
      {
        key: 'growth',
        system: 'Yoca Growth Engine™',
        title: 'İnkişaf və Rəqəmsal Təcrübə',
        desc: 'Konversiya yönümlü rəqəmsal təcrübələr və performans marketinqi vahid ölçülə bilən inkişaf mühərrikində birləşir.',
        problem: 'Konversiyasız trafik, izlənməyən reklamlar — yaxşı görünən, amma satmayan sayt və həqiqəti deyən heç bir göstərici yoxdur.',
        deliverables: ['UX arxitekturası və konversiya yönümlü saytlar', 'E-ticarət təcrübələri', 'Google / Meta / TikTok kampaniyaları', 'İzləmə, analitika və atribusiya', 'SEO və məzmun strategiyası', 'CRO və açılış səhifəsi optimizasiyası'],
        stack: ['Next.js', 'GA4', 'Google Tag Manager', 'Meta CAPI', 'Semrush', 'Hotjar'],
      },
      {
        key: 'scale',
        system: 'Yoca Scale Framework™',
        title: 'Məhsul və Avtomatlaşdırma',
        desc: 'Sİ avtomatlaşdırması və rəqəmsal məhsul inkişafı — biznes mürəkkəbliyi artmadan böyüsün deyə.',
        problem: 'Əməliyyatlar təkrarda boğulur, yaxşı ideyalar heç vaxt işə düşmür: MVP intizamı yox, avtomatlaşdırma yox, məhsul ekosistemi yox.',
        deliverables: ['İş axını avtomatlaşdırması', 'Sİ dəstəkli məzmun prosesləri', 'Söhbət və dəstək asistentləri', 'İdeyanın təsdiqi və MVP inkişafı', 'Məhsul iterasiyası və analitika', 'Buraxılış və inkişaf dəstəyi'],
        stack: ['Supabase', 'Vercel', 'OpenAI API', 'Zapier / Make', 'Cloudflare'],
      },
    ],
  },
  products: {
    metaTitle: 'Məhsullar — YocaServe, WonKick, Demo Hub və Labs | Yoca',
    metaDescription: 'Yoca-nın öz məhsul ekosistemi: YocaServe, WonKick, Yoca Demo Hub və Yoca Labs — müştəri brendlərinə tətbiq etdiyimiz sistemlərlə qurulur və böyüdülür.',
    eyebrow: 'Yoca Məhsulları',
    heading: 'Özümüz qurub böyütdüyümüz məhsullar.',
    sub: 'Məhsul ekosistemimiz Yoca metodologiyasının hər gün real şəraitdə sınandığı yerdir — müştəri brendlərinə tətbiq etdiyimiz sistemlər öz riskimizlə işləyir.',
    statusLive: 'Aktiv',
    statusSoon: 'Hazırlanır',
    statusExp: 'Eksperimental',
    liveDemo: 'Canlı Demo',
    metricsNote: '* Məhsul göstəriciləri daxili hesabatı əks etdirir və vaxtaşırı yenilənir.',
    items: [
      {
        key: 'yocaserve',
        name: 'YocaServe',
        category: 'Qonaqpərvərlik Texnologiyası',
        desc: 'Restoranlar, kafelər, otellər və qonaqpərvərlik biznesləri üçün hazırlanmış sürətli və çevik QR menyu və rəqəmsal xidmət sistemi.',
        status: 'live',
        metrics: [
          { value: '120+', label: 'Aktiv müəssisə' },
          { value: '+38%', label: 'Orta sifariş dəyəri' },
        ],
      },
      {
        key: 'wonkick',
        name: 'WonKick',
        category: 'Futbol / İnteraktiv',
        desc: 'Futbol azarkeşlərinin heyət qurduğu, gündəlik futbol tapşırıqlarını həll etdiyi və interaktiv oyun rejimlərində yarışdığı futbol arcade mərkəzi.',
        status: 'soon',
        metrics: [
          { value: '10K+', label: 'Gündəlik oynanan tapşırıq' },
          { value: '3', label: 'Betadakı oyun rejimi' },
        ],
      },
      {
        key: 'demo-hub',
        name: 'Yoca Demo Hub',
        category: 'Vitrin',
        desc: 'Yoca tərəfindən dizayn və inkişaf etdirilən rəqəmsal konseptlərin, saytların və təcrübələrin çoxdilli vitrini.',
        status: 'live',
        metrics: [
          { value: '25+', label: 'Canlı konsept' },
          { value: '4', label: 'Dil' },
        ],
      },
      {
        key: 'labs',
        name: 'Yoca Labs',
        category: 'Kreativ Texnologiya',
        desc: 'Vizual süni intellekt, kreativ texnologiya və yeni nəsil rəqəmsal təcrübələr üçün Yoca-nın eksperimental inkişaf sahəsi.',
        status: 'exp',
        metrics: [
          { value: '12', label: 'Yayımlanan eksperiment' },
          { value: '2025', label: 'Təsis ili' },
        ],
      },
    ],
  },
  about: {
    metaTitle: 'Haqqımızda — Yoca | Your Own Creative Agency',
    metaDescription: 'Yoca strategiya, dizayn, texnologiya və performansı vahid sistemdə birləşdirən müstəqil kreativ inkişaf tərəfdaşıdır. Yanaşma, dəyərlər və komanda ilə tanış olun.',
    eyebrow: 'Haqqımızda',
    heading: 'Your Own Creative Agency.',
    sub: 'Brendinizə öz brendi kimi yanaşan müstəqil komanda — strategiya, dizayn, texnologiya və inkişafı vahid və hesabatlı sistemdə birləşdirir.',
    storyTitle: 'Niyə varıq',
    story1: 'Əksər brendlər ideya çatışmazlığından uğursuz olmur. Strategiya, dizayn, texnologiya və marketinqin ayrı otaqlarda, ayrı podratçılarla, ayrı göstəricilərlə yaşamasından uğursuz olur.',
    story2: 'Yoca bu boşluğu bağlamaq üçün quruldu. Yığcam və təcrübəli vahid komanda kimi tək sualın ətrafında işləyirik: bu brendin böyüməsi üçün əslində nə dəyişməlidir və bunu qurmağın ən aydın yolu nədir?',
    story3: 'Adımızın Your Own Creative Agency olmasının səbəbi də budur: kənar podratçı kimi deyil, daxili komandaya daha yaxın şəkildə — inteqrasiyalı, şəffaf və hesabatlı işləyirik.',
    valuesTitle: 'İş prinsiplərimiz',
    valuesSub: 'Divar posteri deyil — hər layihədə gündəlik qərarları formalaşdıran real qaydalar.',
    values: [
      { title: 'Fikirdən əvvəl data', body: 'Hər tövsiyə araşdırma və ölçmə ilə başlayır. Data bizimlə razı deyilsə, data qalib gəlir.' },
      { title: 'Nəticə deyil, ROI', body: 'İş təhvil vermək üçün deyil, biznesiniz üçün vacib olan göstəricini hərəkət etdirmək üçün işləyirik.' },
      { title: 'Şəffaf hesabat', body: 'Bizim gördüyümüzü siz də görürsünüz: açıq panellər, dürüst dəyərləndirmələr və arada göstəriş metrikaları yoxdur.' },
      { title: 'Məqsədli ustalıq', body: 'Dizayn işlədiyi üçün yerini qazanır — aydınlığa və ya konversiyaya xidmət etməyən gözəllik bəzəkdir.' },
    ],
    stackTitle: 'Sistemin arxasındakı alətlər',
    stackSub: 'Hər əməkdaşlıq üçün qurduğumuz və idarə etdiyimiz, ölçməyə hazır birbaşa data infrastrukturu.',
  },
  work: {
    metaTitle: 'Seçilmiş Layihələr — Brendlər və Rəqəmsal Təcrübələr | Yoca',
    metaDescription: 'Yoca tərəfindən müxtəlif sektorlar və bazarlar üçün hazırlanmış seçilmiş brendlər, saytlar, platformalar və rəqəmsal təcrübələr.',
    eyebrow: 'Seçilmiş Layihələr',
    heading: 'Fərqli ehtiyaclar. Aydın qərarlar. Hərəkət yaradan işlər.',
    sub: 'Müxtəlif sektorlar və bazarlar üçün hazırlanmış seçilmiş brendləri, saytları, platformaları və rəqəmsal təcrübələri kəşf edin.',
    sector: 'Sektor',
    market: 'Bazar',
    year: 'İl',
    servicesLabel: 'Xidmətlər',
    problem: 'Çağırış',
    approach: 'Tətbiq Edilən Sistem',
    solution: 'İcra və Texnologiya',
    result: 'Təsdiqlənmiş Nəticələr',
    viewCase: 'Layihəyə Bax',
    backToWork: 'Layihələrə Qayıt',
    allWork: 'Bütün Layihələrə Bax',
    filterAll: 'Hamısı',
    filterClients: 'Müştəri Layihələri',
    filterProducts: 'Yoca Məhsulları',
    metricNote: '* Göstəricilər əməkdaşlıq dövrləri ərzində hesabat edilən müştəri nəticələrini əks etdirir.',
    quoteLabel: 'Müştəri Rəyi',
    empty: 'Bu kateqoriyada hələ layihə yoxdur.',
  },
  contact: {
    metaTitle: 'Yoca ilə Əlaqə — Layihənizə Başlayın',
    metaDescription: 'Nə qurduğunuzu bizə danışın. Layihənizi, mərhələsini və dəyişmək istədiklərinizi paylaşın; doğru növbəti addımı birlikdə müəyyən edək.',
    eyebrow: 'Əlaqə',
    heading: 'Növbəti addımı birlikdə quraq.',
    description: 'Üzərində işlədiyiniz layihəni, hazırda hansı mərhələdə olduğunu və nəyi dəyişmək istədiyinizi paylaşın. Aydın məlumat daha yaxşı söhbətə başlamağa kömək edir.',
    name: 'Ad və Soyad',
    email: 'E-poçt Ünvanı',
    company: 'Şirkət və ya Brend',
    message: 'Layihəniz Haqqında Danışın',
    consent: 'Məlumatlarımın emalına razıyam.',
    submit: 'Layihə Məlumatlarını Göndər',
    success: 'Təşəkkür edirik. Layihə məlumatlarınız bizə çatdı. Məlumatları nəzərdən keçirərək qeyd etdiyiniz əlaqə vasitəsi ilə sizinlə əlaqə saxlayacağıq.',
    based: 'Türkiyə mərkəzli. Müxtəlif bazarlarda işləyirik.',
    direct: 'E-poçtu üstün tutursunuz?',
    plannerSystems: 'Hansı sistemlərə ehtiyacınız var?',
    plannerBudget: 'Təxmini büdcə',
    systems: ['Brand System', 'Growth Engine', 'Scale Framework', 'Rəqəmsal Məhsul'],
    budgets: ['5.000 $-dan az', '5.000 – 15.000 $', '15.000 – 40.000 $', '40.000 $+', 'Hələ müəyyən deyil'],
    scheduleTitle: 'Danışaraq irəliləmək istəyirsiniz?',
    scheduleSub: 'Pulsuz 30 dəqiqəlik tanışlıq zəngi planlaşdırın; doğru növbəti addımı birlikdə müəyyən edək.',
    calendlyUrl: '',
  },
  cookies: {
    text: 'Saytın işləməsi üçün zəruri kukilərdən, istifadəsini anlamaq üçün isə seçimli analitika kukilərindən istifadə edirik.',
    acceptAll: 'Hamısını Qəbul Et',
    essentialOnly: 'Yalnız Zəruri',
  },
  notFound: {
    heading: 'Bu səhifə arxasında strategiya qoymadan köçüb.',
    text: 'Axtardığınız səhifə mövcud deyil və ya başqa ünvana köçürülüb.',
    back: 'Ana Səhifəyə Qayıt',
  },
  errorPage: {
    heading: 'Bizim tərəfdə problem yarandı.',
    text: 'Gözlənilməz xəta baş verdi. Bir az sonra yenidən cəhd edin.',
    retry: 'Yenidən Cəhd Et',
  },
  common: {
    languageSwitcher: 'Dil',
    loading: 'Yüklənir…',
  },
  hero: {
    eyebrow: 'Müstəqil Kreativ İnkişaf Tərəfdaşı',
    title: 'İdeyaları brendə, brendləri isə böyüyən sistemlərə çeviririk.',
    description:
      'Yoca strategiya, dizayn, texnologiya və inkişafı vahid kreativ sistemdə birləşdirir. İddialı ideyaların aydın şəkildə həyata keçməsinə, ağıllı şəkildə böyüməsinə və kimliyini itirmədən miqyaslanmasına kömək edir.',
    primaryCta: 'Layihəyə Başla',
    secondaryCta: 'Pulsuz Rəqəmsal Check-Up',
    line: 'Strategiya. Kimlik. Təcrübə. İnkişaf.',
  },
  systems: {
    heading: 'Vahid metodologiya. Bir-birinə bağlı üç sistem.',
    sub: 'Hər əməkdaşlıq eyni ardıcıllıqla irəliləyir — əvvəl brend, sonra inkişaf, sonra miqyas — beləcə hər mərhələ növbətini gücləndirir.',
    items: [
      {
        name: 'Yoca Brand System™',
        tagline: 'Mövqeləndirmə və kimlik',
        body: 'Brendin bazarda mənalı mövqe qazanmasını təmin edən mövqeləndirmə, mesaj, kimlik və təcrübə.',
        points: ['Mövqeləndirmə və arxitektura', 'Verbal və vizual kimlik', 'Təcrübə prinsipləri'],
      },
      {
        name: 'Yoca Growth Engine™',
        tagline: 'Ölçülə bilən impuls',
        body: 'Kommunikasiya, kampaniya, performans və konversiyanın təkrarlana bilən vahid inkişaf sistemində birləşməsi.',
        points: ['Performans kampaniyaları', 'Konversiya və analitika', 'Məzmun və SEO'],
      },
      {
        name: 'Yoca Scale Framework™',
        tagline: 'Birləşərək böyüyən quruluş',
        body: 'Lazımsız mürəkkəblik olmadan böyümək üçün tələb olunan infrastruktur, proseslər və məhsul ekosistemi.',
        points: ['Avtomatlaşdırma və Sİ', 'Məhsul ekosistemi', 'Əməliyyat alətləri'],
      },
    ],
  },
  clients: { heading: 'Birlikdə irəlilədiyimiz brendlər.' },
  partners: {
    heading: 'Üzərində böyüdüyümüz platformaların rəsmi tərəfdaşıyıq.',
    sub: 'Kampaniyalarımızı, datamızı və alətlərimizi birbaşa mənbədən idarə edən sertifikatlı tərəfdaşlıqlar.',
    verified: 'Təsdiqlənmiş Tərəfdaş',
  },
  clocks: { active: 'Hazırda müştərilərimiz üçün aktiv işləyirik.', istanbul: 'İstanbul', baku: 'Bakı', london: 'London', dubai: 'Dubay' },
  team: {
    heading: 'Sistemin arxasındakı insanlar.',
    sub: 'Mərhələsiz işləyən yığcam təcrübəli komanda — strategiya, kreativ, proqramlaşdırma və inkişaf yan-yana.',
    linkedin: 'LinkedIn profili:',
  },
  cta: {
    heading: 'Növbəti olaraq nə qurursunuz?',
    body: 'Hazırda harada olduğunuzu, hara çatmaq istədiyinizi və qarşınızda nə dayandığını paylaşın. Doğru növbəti addımı birlikdə müəyyən edək.',
    button: 'Söhbətə Başla',
  },
  footer: {
    message: 'Yaxşı ideyalar onları irəli aparacaq düzgün sistemə layiqdir.',
    rights: 'Yoca. Your Own Creative Agency. Bütün hüquqlar qorunur.',
    company: 'Şirkət',
    connect: 'Əlaqə',
    hook: 'İnkişafınızı Mühəndisliyə Çevirməyə Hazırsınız?',
    hookCta: 'Layihəyə Başla',
    colSystems: 'Sistemlər',
    colProducts: 'Məhsullar',
  },
  checkup: {
    eyebrow: 'Rəqəmsal Check-Up',
    title: 'Rəqəmsal varlığınız nə qədər sağlamdır?',
    description:
      'Brendiniz, kanallarınız və hədəfləriniz haqqında bir neçə qısa suala cavab verin. Cavablarınızı nəzərdən keçirib aydın addımlar içərən fərdi rəqəmsal analiz hazırlayaq.',
    introTitle: '3 dəqiqəyə pulsuz inkişaf analizinizi əldə edin.',
    introSub:
      'Brendiniz, kanallarınız və hədəfləriniz haqqında 16 qısa suala cavab verin. Hər müraciəti ayrıca nəzərdən keçirir, aydın və səmimi qiymətləndirmə ilə cavab veririk — heç bir şərt yoxdur.',
    introStart: 'Check-Up-a Başla',
    introPoints: ['16 qısa sual — təxminən 3 dəqiqə', '0–100 arası rəqəmsal sağlamlıq skoru', 'Fərdi baxış, səmimi növbəti addımlar'],
    step: 'Addım',
    of: '/',
    next: 'İrəli',
    back: 'Geri',
    submit: 'Analizimi Göndər',
    contactTitle: 'Demək olar bitdi. Analizinizi hara göndərək?',
    contactDesc: 'Hər check-up müraciətini ayrıca nəzərdən keçirir və qısa, səmimi qiymətləndirmə ilə cavab veririk.',
    name: 'Ad və Soyad',
    company: 'Şirkət və ya Brend',
    email: 'E-poçt Ünvanı',
    phone: 'Telefon Nömrəsi',
    consent: 'Məlumatlarımın emalına razıyam.',
    success:
      'Müraciətiniz qəbul edildi. Rəqəmsal analiz hesabatınız hazırlanır; tezliklə sizinlə əlaqə saxlayacağıq.',
    errorRequired: 'Zəhmət olmasa, vacib xanaları doldurun.',
    errorEmail: 'Zəhmət olmasa, düzgün e-poçt ünvanı daxil edin.',
    errorGeneric: 'Xəta baş verdi. Yenidən cəhd edin və ya birbaşa e-poçt göndərin.',
    questions: [
      { key: 'sector', title: 'Hansı sektordasınız?', options: ['E-ticarət / Pərakəndə', 'Peşəkar Xidmətlər', 'Qonaqpərvərlik / Turizm', 'Səhiyyə', 'Texnologiya / SaaS', 'Daşınmaz Əmlak / Tikinti', 'Digər'] },
      { key: 'audience', title: 'Kimə satış edirsiniz?', options: ['Bizneslərə (B2B)', 'İstehlakçılara (B2C)', 'Hər ikisi'] },
      { key: 'size', title: 'Komandanız nə qədər böyükdür?', options: ['Yalnız mən', '2–10 nəfər', '11–50 nəfər', '50+ nəfər'] },
      { key: 'website', title: 'Saytınızı necə təsvir edərdiniz?', options: ['Saytımız yoxdur', 'Köhnədir — fəxr etmirik', 'Yenidir, amma nəticə vermir', 'Müasirdir və yaxşı işləyir'] },
      { key: 'mobile', title: 'Saytınız telefonda rahat istifadə olunur?', options: ['Xeyr / əmin deyiləm', 'Qismən', 'Bəli, tam mobil uyğundur'] },
      { key: 'ecommerce', title: 'Onlayn satış edirsiniz?', options: ['Onlayn satış yoxdur', 'Yalnız marketpleyslərdə', 'Öz onlayn mağazamız var', 'Öz mağaza + marketpleyslər'] },
      { key: 'seo', title: 'SEO vəziyyətiniz necədir?', options: ['Heç işlənməyib', 'Sınadıq, sonra dayandırdıq', 'Davam edir, amma məhduddur', 'Güclü orqanik trafikimiz var'] },
      { key: 'content', title: 'Nə qədər tez-tez məzmun paylaşırsınız?', options: ['Nadir hallarda / heç', 'Bəzən', 'Planlı və müntəzəm'] },
      { key: 'google_ads', title: 'Google Ads reklamı verirsiniz?', options: ['Xeyr', 'Keçmişdə vermişik', 'Bəli, özümüz idarə edirik', 'Bəli, peşəkar idarəetmə ilə'] },
      { key: 'meta_ads', title: 'Meta (Instagram / Facebook) reklamı verirsiniz?', options: ['Xeyr', 'Keçmişdə vermişik', 'Bəli, özümüz idarə edirik', 'Bəli, peşəkar idarəetmə ilə'] },
      { key: 'other_channels', title: 'Başqa aktiv kanalınız var?', options: ['Yoxdur', 'TikTok', 'LinkedIn', 'YouTube', 'Bir neçəsi'] },
      { key: 'social', title: 'Sosial medianız nə qədər aktivdir?', options: ['Aktiv deyil', 'Nizamsız paylaşım', 'Müntəzəm paylaşım', 'Güclü və aktiv icma'] },
      { key: 'analytics', title: 'Nəticələrinizi necə ölçürsünüz?', options: ['Ölçmürük', 'Analytics qurulub, amma istifadə olunmur', 'Hesabatları müntəzəm izləyirik', 'Konversiya izləməsi ilə tam ölçüm'] },
      { key: 'crm', title: 'Müştəri sorğularını necə izləyirsiniz?', options: ['İzləmirik', 'Excel / qeydlər', 'Sadə CRM aləti', 'Avtomatlaşdırılmış inteqrasiyalı CRM'] },
      { key: 'budget', title: 'Aylıq marketinq büdcəniz nə qədərdir?', options: ['Sabit büdcə yoxdur', '1.000 $-dan az', '1.000 – 5.000 $', '5.000 $+'] },
      { key: 'goal', title: 'Əsas inkişaf hədəfiniz nədir?', options: ['Brend tanınırlığı', 'Daha çox müştəri sorğusu', 'Onlayn satış artımı', 'Yeni bazar və ya məhsul buraxılışı', 'Mövcud strukturdan daha çox səmərə'] },
    ],
  },
};

const ar: Dict = {
  meta: {
    homeTitle: 'Yoca — شريك النمو الإبداعي',
    homeDescription:
      'تبني Yoca العلامات والتجارب الرقمية وأنظمة النمو والمنتجات الرقمية عبر الاستراتيجية والتصميم والتقنية والأداء.',
    checkupTitle: 'فحص رقمي مجاني — قِس صحتك الرقمية | Yoca',
    checkupDescription:
      'أجب عن مجموعة قصيرة من الأسئلة واحصل على تحليل شخصي لحضورك الرقمي: الموقع، SEO، الإعلانات، وسائل التواصل وبنية النمو.',
  },
  nav: { home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', work: 'الأعمال', products: 'المنتجات', checkup: 'الفحص الرقمي', contact: 'تواصل معنا' },
  services: {
    heading: 'نبني البنية التي تحتاجها خطوتك التالية.',
    sub: 'لا نبدأ ببيع حزمة جاهزة. نحدد ما يجب أن يتغير، ثم نجمع القدرات المناسبة حوله.',
    items: [
      { name: 'استراتيجية العلامة والهوية', desc: 'تموضع وتسمية وهوية لفظية وأنظمة بصرية تجعل العلامة واضحة وذات صلة ومميزة.', points: ['التموضع وبنية العلامة', 'التسمية والهوية اللفظية', 'أنظمة الهوية البصرية', 'أدلة العلامة والتطبيق'] },
      { name: 'الويب والتجارب الرقمية', desc: 'مواقع مؤسسية ومنصات وتجارب رقمية تركز على التحويل، مصممة حول سلوك المستخدم الحقيقي.', points: ['بنية UX والنماذج الأولية', 'مواقع مؤسسية وحملات', 'تجارب التجارة الإلكترونية', 'أسس الأداء وإمكانية الوصول وSEO'] },
      { name: 'النمو والأداء', desc: 'اكتساب العملاء والتسويق بالأداء والتحليلات والتحسين متصلة في نموذج نمو واحد قابل للقياس.', points: ['حملات Google وMeta وTikTok', 'تتبع التحويلات وإعداد التحليلات', 'استراتيجية SEO والمحتوى', 'تحسين معدل التحويل وصفحات الهبوط'] },
      { name: 'الإنتاج الإبداعي', desc: 'أفكار حملات ومحتوى اجتماعي وإبداعات إعلانية وأنظمة بصرية صُنعت لتكسب الانتباه.', points: ['مفاهيم الحملات', 'أنظمة محتوى وسائل التواصل', 'الإبداعات الإعلانية والموشن', 'الإدارة الفنية'] },
      { name: 'الذكاء الاصطناعي والأتمتة', desc: 'أدوات ذكاء اصطناعي عملية وتدفقات عمل مؤتمتة تقلل التكرار وتسرّع القرارات وتحسن العمليات.', points: ['أتمتة تدفقات العمل', 'خطوط محتوى مدعومة بالذكاء الاصطناعي', 'مساعدو الدردشة والدعم', 'أدوات داخلية وتكاملات'] },
      { name: 'تطوير المنتجات الرقمية', desc: 'من التحقق من الفكرة إلى MVP والإطلاق، نصمم ونطور منتجات رقمية مفيدة قابلة للتوسع.', points: ['التحقق من الفكرة وتحديد النطاق', 'تصميم وتطوير MVP', 'تكرار المنتج والتحليلات', 'دعم الإطلاق والنمو'] },
    ],
  },
  servicesPage: {
    metaTitle: 'الخدمات — الاستراتيجية والتصميم والنمو والمنتج | Yoca',
    metaDescription: 'استكشف خدمات Yoca: استراتيجية العلامة، الويب والتجارب الرقمية، النمو والأداء، الإنتاج الإبداعي، أتمتة الذكاء الاصطناعي وتطوير المنتجات الرقمية.',
    eyebrow: 'الخدمات',
    deliverables: 'ماذا يشمل',
    processTitle: 'عملية واحدة. لا صناديق سوداء.',
    processSub: 'كل تعاون يسير بالإيقاع الشفاف نفسه؛ تعرف دائمًا أين وصل العمل ولماذا.',
    process: [
      { name: 'افهم', desc: 'نرسم خريطة سوقك وجمهورك وبنيتك الحالية — تبدأ القرارات من الأدلة لا الافتراضات.' },
      { name: 'حدد', desc: 'نتفق معًا على التغيير الأهم وأوضح طريق للوصول إليه.' },
      { name: 'ابنِ', desc: 'تعمل الاستراتيجية والتصميم والهندسة جنبًا إلى جنب في دورات قصيرة قابلة للمراجعة.' },
      { name: 'انمُ', desc: 'نقيس ونقدم تقارير مفتوحة ونواصل تحسين ما تثبت البيانات نجاحه.' },
    ],
    tabs: { problem: 'ما المشكلة التي يحلها؟', deliverables: 'المخرجات', stack: 'البنية التقنية' },
    groups: [
      {
        key: 'brand',
        system: 'Yoca Brand System™',
        title: 'العلامة والإبداع',
        desc: 'استراتيجية العلامة والهوية والإنتاج الإبداعي متحدة في نظام واحد يجعل العلامة واضحة وذات صلة ولا تُخلط بغيرها.',
        problem: 'العلامة غير مرئية أو قابلة للاستبدال: تموضع غامض، هوية غير متسقة، وأعمال إبداعية لا تكسب الانتباه.',
        deliverables: ['التموضع وبنية العلامة', 'التسمية والهوية اللفظية', 'أنظمة الهوية البصرية', 'مفاهيم الحملات والإدارة الفنية', 'أنظمة محتوى وسائل التواصل', 'الإبداعات الإعلانية والموشن'],
        stack: ['Figma', 'Adobe Creative Cloud', 'Notion', 'Frontify'],
      },
      {
        key: 'growth',
        system: 'Yoca Growth Engine™',
        title: 'النمو والتجربة الرقمية',
        desc: 'تجارب رقمية تركز على التحويل وتسويق بالأداء متصلان في محرك نمو واحد قابل للقياس.',
        problem: 'زيارات بلا تحويل، إعلانات بلا تتبع — موقع يبدو جيدًا لكنه لا يبيع، ولا رقم واحد يقول الحقيقة.',
        deliverables: ['بنية UX ومواقع تركز على التحويل', 'تجارب التجارة الإلكترونية', 'حملات Google / Meta / TikTok', 'التتبع والتحليلات والإسناد', 'استراتيجية SEO والمحتوى', 'تحسين معدل التحويل وصفحات الهبوط'],
        stack: ['Next.js', 'GA4', 'Google Tag Manager', 'Meta CAPI', 'Semrush', 'Hotjar'],
      },
      {
        key: 'scale',
        system: 'Yoca Scale Framework™',
        title: 'المنتج والأتمتة',
        desc: 'أتمتة الذكاء الاصطناعي وتطوير المنتجات الرقمية ليكبر العمل دون أن تكبر تعقيداته.',
        problem: 'العمليات تغرق في التكرار والأفكار الجيدة لا ترى النور: لا انضباط MVP، لا أتمتة، لا نظام منتجات.',
        deliverables: ['أتمتة تدفقات العمل', 'خطوط محتوى مدعومة بالذكاء الاصطناعي', 'مساعدو الدردشة والدعم', 'التحقق من الفكرة وتطوير MVP', 'تكرار المنتج والتحليلات', 'دعم الإطلاق والنمو'],
        stack: ['Supabase', 'Vercel', 'OpenAI API', 'Zapier / Make', 'Cloudflare'],
      },
    ],
  },
  products: {
    metaTitle: 'المنتجات — YocaServe وWonKick وDemo Hub وLabs | Yoca',
    metaDescription: 'منظومة منتجات Yoca الخاصة: YocaServe وWonKick وYoca Demo Hub وYoca Labs — تُبنى وتنمو بالأنظمة نفسها التي نطبقها على علامات عملائنا.',
    eyebrow: 'منتجات Yoca',
    heading: 'منتجات نبنيها وننمّيها بأنفسنا.',
    sub: 'منظومة منتجاتنا هي المكان الذي تُختبر فيه منهجية Yoca يوميًا — الأنظمة نفسها التي نطبقها على علامات العملاء، تعمل على مسؤوليتنا الخاصة.',
    statusLive: 'متاح',
    statusSoon: 'قيد التطوير',
    statusExp: 'تجريبي',
    liveDemo: 'عرض مباشر',
    metricsNote: '* تعكس مؤشرات المنتجات التقارير الداخلية ويتم تحديثها دوريًا.',
    items: [
      {
        key: 'yocaserve',
        name: 'YocaServe',
        category: 'تقنيات الضيافة',
        desc: 'نظام سريع ومرن للقوائم الرقمية عبر QR والخدمات الرقمية، مخصص للمطاعم والمقاهي والفنادق وقطاع الضيافة.',
        status: 'live',
        metrics: [
          { value: '+120', label: 'منشأة نشطة' },
          { value: '+38%', label: 'متوسط قيمة الطلب' },
        ],
      },
      {
        key: 'wonkick',
        name: 'WonKick',
        category: 'كرة القدم / تفاعلي',
        desc: 'مركز ألعاب كروية تفاعلي يتيح للمشجعين بناء التشكيلات وحل تحديات كرة القدم اليومية والمنافسة عبر أنماط لعب متنوعة.',
        status: 'soon',
        metrics: [
          { value: '+10K', label: 'تحدٍّ يُلعب يوميًا' },
          { value: '3', label: 'أنماط لعب في البيتا' },
        ],
      },
      {
        key: 'demo-hub',
        name: 'Yoca Demo Hub',
        category: 'واجهة عرض',
        desc: 'واجهة متعددة اللغات للمفاهيم الرقمية والمواقع والتجارب التي تصممها وتطورها Yoca.',
        status: 'live',
        metrics: [
          { value: '+25', label: 'مفهوم حي' },
          { value: '4', label: 'لغات' },
        ],
      },
      {
        key: 'labs',
        name: 'Yoca Labs',
        category: 'التقنية الإبداعية',
        desc: 'المختبر التجريبي في Yoca للذكاء الاصطناعي البصري والتقنيات الإبداعية والجيل القادم من التجارب الرقمية.',
        status: 'exp',
        metrics: [
          { value: '12', label: 'تجربة منشورة' },
          { value: '2025', label: 'سنة التأسيس' },
        ],
      },
    ],
  },
  work: {
    metaTitle: 'أعمال مختارة — علامات وتجارب رقمية | Yoca',
    metaDescription: 'علامات ومواقع ومنصات وتجارب رقمية مختارة أنشأتها Yoca عبر قطاعات وأسواق مختلفة.',
    eyebrow: 'أعمال مختارة',
    heading: 'تحديات مختلفة. قرارات واضحة. أعمال صُممت لتُحرّك.',
    sub: 'استكشف علامات ومواقع ومنصات وتجارب رقمية مختارة عبر قطاعات وأسواق مختلفة.',
    sector: 'القطاع',
    market: 'السوق',
    year: 'السنة',
    servicesLabel: 'الخدمات',
    problem: 'التحدي',
    approach: 'النظام المطبق',
    solution: 'التنفيذ والتقنية',
    result: 'نتائج موثقة',
    viewCase: 'استعرض دراسة الحالة',
    backToWork: 'العودة إلى الأعمال',
    allWork: 'استعرض جميع الأعمال',
    filterAll: 'الكل',
    filterClients: 'مشاريع العملاء',
    filterProducts: 'منتجات Yoca',
    metricNote: '* تعكس المؤشرات نتائج العملاء المُبلّغ عنها خلال فترات التعاون.',
    quoteLabel: 'رأي العميل',
    empty: 'لا توجد مشاريع في هذه الفئة حتى الآن.',
  },
  contact: {
    metaTitle: 'تواصل مع Yoca — ابدأ مشروعك',
    metaDescription: 'أخبرنا بما تبنيه. شارك المشروع ومرحلته وما تريد تغييره، وسنساعدك على تحديد الخطوة التالية الصحيحة.',
    eyebrow: 'تواصل معنا',
    heading: 'لنبنِ الخطوة التالية معًا.',
    description: 'أخبرنا بما تعمل عليه، وأين يقف المشروع اليوم، وما الذي تريد تغييره. السياق الواضح يساعدنا على بدء محادثة أفضل.',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    company: 'الشركة أو العلامة',
    message: 'أخبرنا عن المشروع',
    consent: 'أوافق على معالجة معلوماتي.',
    submit: 'أرسل تفاصيل المشروع',
    success: 'شكرًا لك. تم استلام تفاصيل مشروعك. سنراجع المعلومات ونتواصل معك عبر بيانات الاتصال التي قدمتها.',
    based: 'مقرنا في تركيا، ونعمل عبر أسواق متعددة.',
    direct: 'تفضل البريد الإلكتروني؟',
    plannerSystems: 'ما الأنظمة التي تحتاجها؟',
    plannerBudget: 'الميزانية التقديرية',
    systems: ['Brand System', 'Growth Engine', 'Scale Framework', 'منتج رقمي'],
    budgets: ['أقل من 5,000$', '5,000$ – 15,000$', '15,000$ – 40,000$', 'أكثر من 40,000$', 'غير محددة بعد'],
    scheduleTitle: 'تفضل أن نتحدث مباشرة؟',
    scheduleSub: 'احجز مكالمة تعارف مجانية لمدة 30 دقيقة ولنرسم الخطوة التالية الصحيحة معًا.',
    calendlyUrl: '',
  },
  cookies: {
    text: 'نستخدم ملفات تعريف الارتباط الأساسية لتشغيل الموقع، وملفات تحليل اختيارية لفهم كيفية استخدامه.',
    acceptAll: 'قبول الكل',
    essentialOnly: 'الضرورية فقط',
  },
  notFound: {
    heading: 'انتقلت هذه الصفحة دون أن تترك استراتيجية خلفها.',
    text: 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.',
    back: 'العودة إلى الرئيسية',
  },
  errorPage: {
    heading: 'حدث خلل من جهتنا.',
    text: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى بعد قليل.',
    retry: 'حاول مرة أخرى',
  },
  common: {
    languageSwitcher: 'اللغة',
    loading: 'جارٍ التحميل…',
  },
  hero: {
    eyebrow: 'شريك نمو إبداعي مستقل',
    title: 'نحوّل الأفكار إلى علامات، والعلامات إلى أنظمة صُممت للنمو.',
    description:
      'تربط Yoca الاستراتيجية والتصميم والتقنية والنمو في نظام إبداعي واحد — لتنطلق الأفكار الطموحة بوضوح، وتنمو بذكاء، وتتوسع دون أن تفقد هويتها.',
    primaryCta: 'ابدأ مشروعك',
    secondaryCta: 'فحص رقمي مجاني',
    line: 'استراتيجية. هوية. تجربة. نمو.',
  },
  systems: {
    heading: 'منهجية واحدة. ثلاثة أنظمة مترابطة.',
    sub: 'كل تعاون يسير بالتسلسل نفسه — العلامة أولًا، ثم النمو، ثم التوسع — ليقوّي كل مرحلةٍ ما بعدها.',
    items: [
      {
        name: 'Yoca Brand System™',
        tagline: 'التموضع والهوية',
        body: 'التموضع والرسالة والهوية والتجربة التي تمنح العلامة مكانة ذات معنى في سوقها.',
        points: ['التموضع والبنية', 'الهوية اللفظية والبصرية', 'مبادئ التجربة'],
      },
      {
        name: 'Yoca Growth Engine™',
        tagline: 'زخم قابل للقياس',
        body: 'التواصل والحملات والأداء والتحويل متصلة في نظام نمو واحد قابل للتكرار.',
        points: ['حملات الأداء', 'التحويل والتحليلات', 'المحتوى وSEO'],
      },
      {
        name: 'Yoca Scale Framework™',
        tagline: 'مبني ليتراكم',
        body: 'البنية التحتية والعمليات ومنظومة المنتجات اللازمة للنمو دون تعقيد لا داعي له.',
        points: ['الأتمتة والذكاء الاصطناعي', 'منظومة المنتجات', 'أدوات التشغيل'],
      },
    ],
  },
  clients: { heading: 'علامات نتقدم معها إلى الأمام.' },
  partners: {
    heading: 'شركاء رسميون للمنصات التي ننمو عليها.',
    sub: 'شراكات معتمدة تُبقي حملاتنا وبياناتنا وأدواتنا من المصدر الأول.',
    verified: 'شريك موثّق',
  },
  clocks: { active: 'نعمل الآن بنشاط من أجل عملائنا.', istanbul: 'إسطنبول', baku: 'باكو', london: 'لندن', dubai: 'دبي' },
  team: {
    heading: 'الأشخاص خلف النظام.',
    sub: 'فريق صغير من الخبراء يعمل دون طبقات — الاستراتيجية والإبداع والهندسة والنمو جنبًا إلى جنب.',
    linkedin: 'ملف LinkedIn لـ',
  },
  cta: {
    heading: 'ماذا تبني تاليًا؟',
    body: 'أخبرنا أين أنت اليوم، وإلى أين تريد الوصول، وما الذي يقف في الطريق. سنساعدك على تحديد الخطوة التالية الصحيحة.',
    button: 'ابدأ المحادثة',
  },
  footer: {
    message: 'تستحق الأفكار الجيدة نظامًا يدفعها إلى الأمام.',
    rights: 'Yoca. Your Own Creative Agency. جميع الحقوق محفوظة.',
    company: 'الشركة',
    connect: 'تواصل',
    hook: 'مستعد لهندسة نموك؟',
    hookCta: 'ابدأ مشروعك',
    colSystems: 'الأنظمة',
    colProducts: 'المنتجات',
  },
  about: {
    metaTitle: 'من نحن — Yoca | Your Own Creative Agency',
    metaDescription: 'Yoca شريك نمو إبداعي مستقل يربط الاستراتيجية والتصميم والتقنية والأداء في نظام واحد. تعرف على المنهجية والقيم والفريق.',
    eyebrow: 'من نحن',
    heading: 'Your Own Creative Agency.',
    sub: 'فريق مستقل يعامل علامتك كأنها علامته — يربط الاستراتيجية والتصميم والتقنية والنمو في نظام واحد خاضع للمساءلة.',
    storyTitle: 'لماذا وُجدنا',
    story1: 'معظم العلامات لا تفشل بسبب نقص الأفكار، بل لأن الاستراتيجية والتصميم والتقنية والتسويق تعيش في غرف منفصلة، يديرها موردون منفصلون وتقيسها أرقام منفصلة.',
    story2: 'وُلدت Yoca لسد هذه الفجوة. نعمل كفريق واحد صغير من الخبراء حول سؤال واحد: ما الذي يجب أن يتغير فعلًا لتنمو هذه العلامة — وما أوضح طريقة لبنائه؟',
    story3: 'ولهذا نُدعى Your Own Creative Agency: نعمل بشكل مدمج وشفاف وخاضع للمساءلة، أقرب إلى فريق داخلي منه إلى مورد خارجي.',
    valuesTitle: 'المبادئ التي نعمل بها',
    valuesSub: 'ليست ملصقات جدارية — بل القواعد الفعلية التي تشكل القرارات اليومية في كل مشروع.',
    values: [
      { title: 'البيانات قبل الرأي', body: 'كل توصية تبدأ من البحث والقياس. عندما تخالفنا البيانات، تفوز البيانات.' },
      { title: 'العائد قبل المخرجات', body: 'لا نتقاضى أجرًا لإنتاج مخرجات، بل لتحريك رقم يهم عملك.' },
      { title: 'تقارير شفافة', body: 'ترى ما نراه: لوحات مفتوحة ومراجعات صادقة، ولا مقاييس زائفة بينهما.' },
      { title: 'إتقان بهدف', body: 'يكسب التصميم مكانه بعمله — الجمال الذي لا يخدم الوضوح أو التحويل مجرد زخرفة.' },
    ],
    stackTitle: 'الأدوات خلف النظام',
    stackSub: 'بنية قياس جاهزة من المصدر الأول نبنيها وندیرها في كل تعاون.',
  },
  checkup: {
    eyebrow: 'الفحص الرقمي',
    title: 'ما مدى صحة حضورك الرقمي؟',
    description:
      'أجب عن بضعة أسئلة قصيرة حول علامتك وقنواتك وأهدافك. سنراجع إجاباتك ونعد تحليلًا رقميًا شخصيًا بخطوات واضحة.',
    introTitle: 'احصل على تحليل نمو مجاني خلال 3 دقائق.',
    introSub:
      'أجب عن 16 سؤالًا سريعًا حول علامتك وقنواتك وأهدافك. نراجع كل طلب شخصيًا ونرد بتقييم واضح وصادق — دون أي شروط.',
    introStart: 'ابدأ الفحص',
    introPoints: ['16 سؤالًا سريعًا — نحو 3 دقائق', 'درجة صحة رقمية من 0 إلى 100', 'مراجعة شخصية وخطوات تالية صادقة'],
    step: 'الخطوة',
    of: 'من',
    next: 'التالي',
    back: 'السابق',
    submit: 'أرسل تحليلي',
    contactTitle: 'اقتربنا من النهاية. أين نرسل تحليلك؟',
    contactDesc: 'نراجع كل فحص شخصيًا ونرد بتقييم قصير وصادق.',
    name: 'الاسم الكامل',
    company: 'الشركة أو العلامة',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    consent: 'أوافق على معالجة معلوماتي.',
    success: 'تم استلام طلبك. نُعد الآن تقرير تحليلك الرقمي وسنتواصل معك قريبًا.',
    errorRequired: 'يرجى تعبئة الحقول المطلوبة.',
    errorEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
    errorGeneric: 'حدث خطأ ما. حاول مرة أخرى أو راسلنا مباشرة عبر البريد الإلكتروني.',
    questions: [
      { key: 'sector', title: 'ما هو قطاعك؟', options: ['التجارة الإلكترونية / التجزئة', 'الخدمات المهنية', 'الضيافة / السياحة', 'الرعاية الصحية', 'التقنية / SaaS', 'العقارات / الإنشاءات', 'أخرى'] },
      { key: 'audience', title: 'لمن تبيع؟', options: ['للشركات (B2B)', 'للمستهلكين (B2C)', 'كلاهما'] },
      { key: 'size', title: 'ما حجم فريقك؟', options: ['أنا فقط', '2–10 أشخاص', '11–50 شخصًا', 'أكثر من 50'] },
      { key: 'website', title: 'كيف تصف موقعك الإلكتروني؟', options: ['لا نملك موقعًا', 'قديم — لا نفخر به', 'جديد لكنه لا يحقق نتائج', 'حديث ويعمل جيدًا'] },
      { key: 'mobile', title: 'هل موقعك مريح على الهاتف؟', options: ['لا / لست متأكدًا', 'جزئيًا', 'نعم، متوافق تمامًا مع الجوال'] },
      { key: 'ecommerce', title: 'هل تبيع عبر الإنترنت؟', options: ['لا مبيعات إلكترونية', 'عبر الأسواق الإلكترونية فقط', 'متجرنا الإلكتروني الخاص', 'متجر خاص + أسواق إلكترونية'] },
      { key: 'seo', title: 'ما وضع تحسين محركات البحث (SEO)؟', options: ['لم نعمل عليه أبدًا', 'جربنا ثم توقفنا', 'مستمر لكنه محدود', 'زيارات عضوية قوية'] },
      { key: 'content', title: 'كم مرة تنشر محتوى؟', options: ['نادرًا / أبدًا', 'أحيانًا', 'بانتظام ووفق خطة'] },
      { key: 'google_ads', title: 'هل تدير إعلانات Google؟', options: ['لا', 'فعلنا سابقًا', 'نعم، نديرها بأنفسنا', 'نعم، بإدارة احترافية'] },
      { key: 'meta_ads', title: 'هل تدير إعلانات Meta (إنستغرام / فيسبوك)؟', options: ['لا', 'فعلنا سابقًا', 'نعم، نديرها بأنفسنا', 'نعم، بإدارة احترافية'] },
      { key: 'other_channels', title: 'هل لديك قنوات نشطة أخرى؟', options: ['لا يوجد', 'TikTok', 'LinkedIn', 'YouTube', 'أكثر من واحدة'] },
      { key: 'social', title: 'ما مدى نشاط وسائل التواصل لديكم؟', options: ['غير نشطة', 'نشر غير منتظم', 'نشر منتظم', 'مجتمع قوي ومتفاعل'] },
      { key: 'analytics', title: 'كيف تقيس نتائجك؟', options: ['لا نقيس', 'التحليلات مثبتة لكن غير مستخدمة', 'نتابع التقارير بانتظام', 'قياس كامل مع تتبع التحويلات'] },
      { key: 'crm', title: 'كيف تتابع العملاء المحتملين؟', options: ['لا نتابعهم', 'جداول / ملاحظات', 'أداة CRM بسيطة', 'CRM متكامل مع أتمتة'] },
      { key: 'budget', title: 'ما ميزانيتك التسويقية الشهرية؟', options: ['لا ميزانية ثابتة', 'أقل من 1,000$', '1,000$ – 5,000$', 'أكثر من 5,000$'] },
      { key: 'goal', title: 'ما هدف النمو الرئيسي لديك؟', options: ['الوعي بالعلامة', 'المزيد من العملاء المحتملين', 'نمو المبيعات الإلكترونية', 'إطلاق سوق أو منتج جديد', 'كفاءة أعلى مما نملكه'] },
    ],
  },
};

const dictionaries: Record<Locale, Dict> = { en, tr, az, ar };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.en;
}

/** Server-side scoring weights (mirrored in app/api/checkup/route.ts). */
export const CHECKUP_WEIGHTS: Record<string, number[]> = {
  website: [0, 1, 1, 3],
  mobile: [0, 1, 3],
  seo: [0, 1, 2, 3],
  content: [0, 1, 3],
  google_ads: [0, 1, 2, 3],
  meta_ads: [0, 1, 2, 3],
  social: [0, 1, 2, 3],
  analytics: [0, 1, 2, 3],
  crm: [0, 1, 2, 3],
};
