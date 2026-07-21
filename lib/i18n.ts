import type { CheckupQuestion, Locale } from '@/types';

/** Yoca — locale dictionaries (en / tr / az). Server-side; pass strings to client components as props. */

export interface Dict {
  meta: {
    homeTitle: string;
    homeDescription: string;
    checkupTitle: string;
    checkupDescription: string;
  };
  nav: { home: string; services: string; work: string; checkup: string; contact: string };
  services: {
    heading: string;
    sub: string;
    items: Array<{ name: string; desc: string }>;
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
  bento: {
    heading: string;
    sub: string;
    main: { tag: string; title: string; body: string; metric: string; metricLabel: string };
    growth: { title: string; body: string };
    scale: { title: string; body: string };
  };
  clients: { heading: string };
  partners: { heading: string; sub: string; verified: string };
  clocks: { active: string; istanbul: string; london: string; dubai: string };
  team: { heading: string; sub: string; linkedin: string };
  cta: { heading: string; body: string; button: string };
  footer: { message: string; rights: string; company: string; connect: string };
  checkup: {
    eyebrow: string;
    title: string;
    description: string;
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
  nav: { home: 'Home', services: 'Services', work: 'Work', checkup: 'Digital Check-Up', contact: 'Contact' },
  services: {
    heading: 'What we build around your next move.',
    sub: 'We do not begin by selling a predefined package. We identify what needs to change, then combine the right capabilities around it.',
    items: [
      { name: 'Brand Strategy & Identity', desc: 'Positioning, naming, verbal identity and visual systems built to make the brand clear, relevant and recognisable.' },
      { name: 'Web & Digital Experiences', desc: 'Corporate websites, platforms and conversion-focused digital experiences designed around real user behaviour.' },
      { name: 'Growth & Performance', desc: 'Acquisition, performance marketing, analytics and optimisation connected through one measurable growth model.' },
      { name: 'Creative Production', desc: 'Campaign ideas, social content, advertising creatives and visual systems made to earn attention.' },
      { name: 'AI & Automation', desc: 'Practical AI tools and automated workflows that reduce repetition, accelerate decisions and improve operations.' },
      { name: 'Digital Product Development', desc: 'From idea validation to MVP and launch, we design and develop useful digital products with room to scale.' },
    ],
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
    problem: 'Problem',
    approach: 'Approach',
    solution: 'Solution',
    result: 'Result',
    viewCase: 'View Case Study',
    backToWork: 'Back to Work',
    allWork: 'View All Work',
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
    secondaryCta: 'Explore Our Work',
    line: 'Strategy. Identity. Experience. Growth.',
  },
  bento: {
    heading: 'Three systems. One connected growth model.',
    sub: 'From the first strategic decision to long-term scale, every stage is designed to strengthen the next.',
    main: {
      tag: 'Yoca Growth Engine™',
      title: 'Turn attention into measurable momentum.',
      body: 'We connect communication, campaigns, performance and conversion to build a repeatable growth system.',
      metric: 'Conversion-focused',
      metricLabel: 'Live performance view',
    },
    growth: {
      title: 'Yoca Brand System™',
      body: 'The positioning, message, identity and experience that give the brand a meaningful place in its market.',
    },
    scale: {
      title: 'Yoca Scale Framework™',
      body: 'The infrastructure, processes and product ecosystem needed to grow without unnecessary complexity.',
    },
  },
  clients: { heading: 'Brands we move forward with.' },
  partners: {
    heading: 'Official partners of the platforms we grow on.',
    sub: 'Certified partnerships that keep our campaigns, data and tooling first-party.',
    verified: 'Verified Partner',
  },
  clocks: { active: 'Actively working for our clients right now.', istanbul: 'Istanbul', london: 'London', dubai: 'Dubai' },
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
  },
  checkup: {
    eyebrow: 'Digital Check-Up',
    title: 'How healthy is your digital presence?',
    description:
      'Answer a few short questions about your brand, channels and goals. We will review your answers and prepare a personal digital analysis with clear next steps.',
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
  nav: { home: 'Ana Sayfa', services: 'Hizmetler', work: 'Projeler', checkup: 'Dijital Check-Up', contact: 'İletişim' },
  services: {
    heading: 'Bir sonraki adımınızın ihtiyaç duyduğu yapıyı kuruyoruz.',
    sub: 'Önceden hazırlanmış bir paket satarak başlamayız. Değişmesi gereken noktayı belirler, doğru yetkinlikleri bunun etrafında birleştiririz.',
    items: [
      { name: 'Marka Stratejisi ve Kimlik', desc: 'Markayı net, anlamlı ve ayırt edilebilir hâle getiren konumlandırma, isimlendirme, marka dili ve görsel kimlik sistemleri.' },
      { name: 'Web ve Dijital Deneyimler', desc: 'Gerçek kullanıcı davranışlarına göre tasarlanan kurumsal siteler, platformlar ve dönüşüm odaklı dijital deneyimler.' },
      { name: 'Büyüme ve Performans', desc: 'Tek bir ölçülebilir büyüme modeli altında birleştirilen müşteri kazanımı, performans pazarlaması, analiz ve optimizasyon.' },
      { name: 'Yaratıcı Üretim', desc: 'Dikkat kazanmak için geliştirilen kampanya fikirleri, sosyal medya içerikleri, reklam kreatifleri ve görsel sistemler.' },
      { name: 'Yapay Zekâ ve Otomasyon', desc: 'Tekrarlayan işleri azaltan, karar süreçlerini hızlandıran ve operasyonu geliştiren uygulanabilir yapay zekâ araçları ve otomasyonlar.' },
      { name: 'Dijital Ürün Geliştirme', desc: 'Fikir doğrulamadan MVP ve yayına kadar ölçeklenebilir, kullanılabilir dijital ürünler tasarlar ve geliştiririz.' },
    ],
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
    problem: 'Problem',
    approach: 'Yaklaşım',
    solution: 'Çözüm',
    result: 'Sonuç',
    viewCase: 'Projeyi İncele',
    backToWork: 'Projelere Dön',
    allWork: 'Tüm Projeleri Gör',
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
    secondaryCta: 'Projelerimizi İncele',
    line: 'Strateji. Kimlik. Deneyim. Büyüme.',
  },
  bento: {
    heading: 'Üç sistem. Birbirine bağlı tek bir büyüme modeli.',
    sub: 'İlk stratejik karardan uzun vadeli ölçeklenmeye kadar her aşama, bir sonraki adımı güçlendirecek şekilde tasarlanır.',
    main: {
      tag: 'Yoca Growth Engine™',
      title: 'İlgiyi ölçülebilir bir büyüme hareketine dönüştürün.',
      body: 'İletişimi, kampanyaları, performansı ve dönüşümü birbirine bağlayarak tekrarlanabilir bir büyüme sistemi kurarız.',
      metric: 'Dönüşüm odaklı',
      metricLabel: 'Canlı performans görünümü',
    },
    growth: {
      title: 'Yoca Brand System™',
      body: 'Markanın pazarda anlamlı bir yer edinmesini sağlayan konumlandırma, mesaj, kimlik ve deneyim.',
    },
    scale: {
      title: 'Yoca Scale Framework™',
      body: 'Gereksiz karmaşa olmadan büyümek için gereken altyapı, süreçler ve ürün ekosistemi.',
    },
  },
  clients: { heading: 'Birlikte yol aldığımız markalar.' },
  partners: {
    heading: 'Üzerinde büyüdüğümüz platformların resmi iş ortağıyız.',
    sub: 'Kampanyalarımızı, verimizi ve araçlarımızı birincil kaynaktan yöneten sertifikalı iş ortaklıkları.',
    verified: 'Doğrulanmış İş Ortağı',
  },
  clocks: { active: 'Şu an müşterilerimiz için aktif çalışıyoruz.', istanbul: 'İstanbul', london: 'Londra', dubai: 'Dubai' },
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
  },
  checkup: {
    eyebrow: 'Dijital Check-Up',
    title: 'Dijital varlığınız ne kadar sağlıklı?',
    description:
      'Markanız, kanallarınız ve hedefleriniz hakkında birkaç kısa soruyu yanıtlayın. Yanıtlarınızı inceleyip net adımlar içeren kişisel bir dijital analiz hazırlayalım.',
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
  nav: { home: 'Ana səhifə', services: 'Xidmətlər', work: 'Layihələr', checkup: 'Rəqəmsal Check-Up', contact: 'Əlaqə' },
  services: {
    heading: 'Növbəti addımınız üçün lazım olan sistemi qururuq.',
    sub: 'Əvvəlcədən hazırlanmış paket satmaqla başlamırıq. Dəyişməli olan nöqtəni müəyyən edir və uyğun bacarıqları onun ətrafında birləşdiririk.',
    items: [
      { name: 'Brend Strategiyası və Kimlik', desc: 'Brendi aydın, uyğun və tanınan edən mövqeləndirmə, adlandırma, verbal kimlik və vizual sistemlər.' },
      { name: 'Veb və Rəqəmsal Təcrübələr', desc: 'Real istifadəçi davranışlarına əsaslanan korporativ saytlar, platformalar və konversiya yönümlü rəqəmsal təcrübələr.' },
      { name: 'İnkişaf və Performans', desc: 'Vahid ölçülə bilən inkişaf modeli ilə birləşdirilən istifadəçi cəlbi, performans marketinqi, analitika və optimizasiya.' },
      { name: 'Kreativ İstehsal', desc: 'Diqqət qazanmaq üçün hazırlanan kampaniya ideyaları, sosial media məzmunu, reklam kreativləri və vizual sistemlər.' },
      { name: 'Süni İntellekt və Avtomatlaşdırma', desc: 'Təkrarlanan işləri azaldan, qərarları sürətləndirən və əməliyyatları yaxşılaşdıran praktik süni intellekt alətləri və avtomatlaşdırmalar.' },
      { name: 'Rəqəmsal Məhsul İnkişafı', desc: 'İdeyanın təsdiqindən MVP və buraxılışa qədər miqyaslana bilən faydalı rəqəmsal məhsullar hazırlayırıq.' },
    ],
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
    problem: 'Problem',
    approach: 'Yanaşma',
    solution: 'Həll',
    result: 'Nəticə',
    viewCase: 'Layihəyə Bax',
    backToWork: 'Layihələrə Qayıt',
    allWork: 'Bütün Layihələrə Bax',
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
    secondaryCta: 'Layihələrimizə Bax',
    line: 'Strategiya. Kimlik. Təcrübə. İnkişaf.',
  },
  bento: {
    heading: 'Üç sistem. Vahid inkişaf modeli.',
    sub: 'İlk strateji qərarından uzunmüddətli miqyaslanmaya qədər hər mərhələ növbəti addımı gücləndirmək üçün hazırlanır.',
    main: {
      tag: 'Yoca Growth Engine™',
      title: 'Diqqəti ölçülə bilən inkişaf impulsuna çevirin.',
      body: 'Kommunikasiya, kampaniya, performans və konversiyanı birləşdirərək təkrarlana bilən inkişaf sistemi qururuq.',
      metric: 'Konversiya yönümlü',
      metricLabel: 'Canlı performans görünüşü',
    },
    growth: {
      title: 'Yoca Brand System™',
      body: 'Brendin bazarda mənalı mövqe qazanmasını təmin edən mövqeləndirmə, mesaj, kimlik və təcrübə.',
    },
    scale: {
      title: 'Yoca Scale Framework™',
      body: 'Lazımsız mürəkkəblik olmadan böyümək üçün tələb olunan infrastruktur, proseslər və məhsul ekosistemi.',
    },
  },
  clients: { heading: 'Birlikdə irəlilədiyimiz brendlər.' },
  partners: {
    heading: 'Üzərində böyüdüyümüz platformaların rəsmi tərəfdaşıyıq.',
    sub: 'Kampaniyalarımızı, datamızı və alətlərimizi birbaşa mənbədən idarə edən sertifikatlı tərəfdaşlıqlar.',
    verified: 'Təsdiqlənmiş Tərəfdaş',
  },
  clocks: { active: 'Hazırda müştərilərimiz üçün aktiv işləyirik.', istanbul: 'İstanbul', london: 'London', dubai: 'Dubay' },
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
  },
  checkup: {
    eyebrow: 'Rəqəmsal Check-Up',
    title: 'Rəqəmsal varlığınız nə qədər sağlamdır?',
    description:
      'Brendiniz, kanallarınız və hədəfləriniz haqqında bir neçə qısa suala cavab verin. Cavablarınızı nəzərdən keçirib aydın addımlar içərən fərdi rəqəmsal analiz hazırlayaq.',
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

const dictionaries: Record<Locale, Dict> = { en, tr, az };

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
