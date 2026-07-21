import type { CaseStudyRow, Locale } from '@/types';

/**
 * Yoca — selected work / case studies (client-safe data module).
 *
 * Content is managed from the admin panel (Supabase `case_studies` table).
 * The fully localized defaults below (EN/TR/AZ/AR) act as the fallback when
 * the table is empty — and as the "import defaults" source for the admin panel.
 *
 * NOTE: metric badges & stats are SAMPLE placeholders — replace them with
 * verified client data from /admin before launch. Client quotes ship empty
 * on purpose (no fabricated testimonials): add real ones via /admin.
 */

export interface CaseStudy {
  slug: string;
  name: string;
  sector: string;
  market: string;
  year: string;
  services: string[];
  image: string;
  kind: 'client' | 'product';
  videoUrl?: string | null;
  summary: string;
  problem: string;
  approach: string;
  solution: string;
  results: string;
  metricBadge?: string;
  stats?: Array<{ label: string; value: string; bar?: number }>;
  quote?: string;
  quoteAuthor?: string;
}

interface CaseStudyBase {
  slug: string;
  year: string;
  market: string;
  image: string;
  services: string[];
  kind: 'client' | 'product';
}

const BASE: CaseStudyBase[] = [
  { slug: "marina-vista", year: "2025", market: "MENA", image: "/work/marina-vista.webp", services: ["Brand", "Web"], kind: 'client' },
  { slug: "vertex-studio", year: "2025", market: "Europe", image: "/work/vertex-studio.webp", services: ["Brand", "Web"], kind: 'client' },
  { slug: "novis-clinic", year: "2024", market: "Türkiye", image: "/work/novis-clinic.webp", services: ["Web", "Growth"], kind: 'client' },
  { slug: "roam-safaris", year: "2024", market: "Africa / Global", image: "/work/roam-safaris.webp", services: ["Web", "Product", "Growth"], kind: 'client' },
];

type LocalizedFields = Pick<CaseStudy, 'name' | 'sector' | 'summary' | 'problem' | 'approach' | 'solution' | 'results' | 'metricBadge' | 'stats'>;

const CONTENT: Record<Locale, Record<string, LocalizedFields>> = {
  en: {
    "marina-vista": {
      name: "Marina Vista",
      sector: "Real Estate / Hospitality",
      summary: "A refined digital destination for a coastal living concept, balancing premium positioning with effortless exploration.",
      problem: "The concept had a premium physical vision but no digital presence able to communicate it. Early materials leaned on generic real-estate language that blurred what made the location distinctive.",
      approach: "We started from the experience of arriving, not from floor plans: how the coastline, light and pace of the place should feel on a screen. Information architecture was rebuilt around exploration rather than listings.",
      solution: "A calm, image-led digital experience with restrained typography, full-bleed visuals and a clear enquiry path that respects the visitor’s own rhythm.",
      results: "The brand now enters conversations positioned as a destination rather than a development, and the enquiry flow gives the sales team clearer, better-qualified context from the first message.",
      metricBadge: "+64% qualified enquiries",
      stats: [{ label: "Qualified enquiries", value: "+64%", bar: 64 }, { label: "Time on site", value: "2.4×", bar: 80 }, { label: "Bounce rate", value: "−31%", bar: 31 }],
    },
    "vertex-studio": {
      name: "Vertex Studio",
      sector: "Creative Studio",
      summary: "A sharp portfolio experience created to let the studio’s thinking and visual work lead the conversation.",
      problem: "The studio’s work was strong, but its own presence felt interchangeable with every other portfolio site — the identity said nothing about how the studio thinks.",
      approach: "We treated the studio itself as the case study: a verbal identity built on how they reason about problems, and a visual system disciplined enough to step back behind the work.",
      solution: "A high-contrast editorial identity and portfolio experience where projects open with the decision behind them, not just the final images.",
      results: "The studio now starts new-business conversations from its point of view instead of its price, and the portfolio finally reads the way the team actually works.",
      metricBadge: "3.1× inbound leads",
      stats: [{ label: "Inbound leads", value: "3.1×", bar: 85 }, { label: "Avg. project value", value: "+45%", bar: 45 }, { label: "Pitch-to-win rate", value: "+22 pts", bar: 22 }],
    },
    "novis-clinic": {
      name: "Novis Clinic",
      sector: "Healthcare",
      summary: "A calm and trustworthy healthcare experience structured around clarity, accessibility and patient confidence.",
      problem: "Patients arrived at the old website anxious and left confused: dense medical language, unclear pathways and no sense of who they would actually meet.",
      approach: "Every page was rebuilt around the questions patients actually ask before booking — what happens, who treats me, what does it cost, how do I prepare — in language reviewed for calm and clarity.",
      solution: "A quiet, accessible interface with clear treatment journeys, transparent practical information and an appointment flow designed to reduce hesitation rather than push conversion.",
      results: "The clinic’s team reports conversations that start further along: patients arrive already understanding their treatment path, and the front desk spends less time repeating basics.",
      metricBadge: "+87% online bookings",
      stats: [{ label: "Online bookings", value: "+87%", bar: 87 }, { label: "Front-desk calls", value: "−40%", bar: 40 }, { label: "Organic traffic", value: "+120%", bar: 95 }],
    },
    "roam-safaris": {
      name: "Roam Safaris",
      sector: "Tourism",
      summary: "An immersive travel platform that transforms exploration into a clear and compelling journey.",
      problem: "Trips were extraordinary; the booking experience was not. Route options lived in PDFs and email threads, and travellers could not see how one journey differed from another.",
      approach: "We mapped how travellers actually decide — season, pace, landscape, comfort — and turned those decisions into the structure of the product instead of a filter bolted onto a list.",
      solution: "A journey-first platform where each route unfolds visually from day to day, with practical detail layered in only when the traveller asks for it.",
      results: "Enquiries now arrive with a chosen route and travel window attached, which shortens the planning conversation and lets the team focus on tailoring rather than explaining.",
      metricBadge: "+210% route enquiries",
      stats: [{ label: "Route enquiries", value: "+210%", bar: 100 }, { label: "Planning time", value: "−55%", bar: 55 }, { label: "Returning visitors", value: "+73%", bar: 73 }],
    },
  },
  tr: {
    "marina-vista": {
      name: "Marina Vista",
      sector: "Gayrimenkul / Konaklama",
      summary: "Premium konumlandırmayı kolay keşif deneyimiyle birleştiren, sahil yaşamı konsepti için geliştirilmiş rafine bir dijital deneyim.",
      problem: "Konseptin güçlü bir fiziksel vizyonu vardı ancak bunu anlatabilecek bir dijital varlığı yoktu. İlk materyaller, lokasyonu ayrıştıran değerleri silikleştiren jenerik gayrimenkul dili kullanıyordu.",
      approach: "Kat planlarından değil, oraya varma deneyiminden başladık: Sahilin, ışığın ve o yerin temposunun ekranda nasıl hissettirmesi gerektiğinden. Bilgi mimarisi listeleme mantığı yerine keşif etrafında yeniden kuruldu.",
      solution: "Kontrollü tipografi, tam ekran görseller ve ziyaretçinin kendi ritmine saygı duyan net bir iletişim akışıyla sakin, görsel odaklı bir dijital deneyim.",
      results: "Marka artık bir konut projesi olarak değil, bir destinasyon olarak konuşuluyor; iletişim akışı satış ekibine ilk mesajdan itibaren daha net ve nitelikli bağlam sunuyor.",
      metricBadge: "+%64 nitelikli talep",
      stats: [{ label: "Nitelikli talepler", value: "+64%", bar: 64 }, { label: "Sitede geçirilen süre", value: "2.4×", bar: 80 }, { label: "Hemen çıkma oranı", value: "−31%", bar: 31 }],
    },
    "vertex-studio": {
      name: "Vertex Studio",
      sector: "Kreatif Stüdyo",
      summary: "Stüdyonun düşünce biçimini ve görsel çalışmalarını merkeze alan güçlü bir portfolyo deneyimi.",
      problem: "Stüdyonun işleri güçlüydü ancak kendi varlığı diğer tüm portfolyo siteleriyle yer değiştirebilir hissettiriyordu; kimlik, stüdyonun nasıl düşündüğüne dair hiçbir şey söylemiyordu.",
      approach: "Stüdyonun kendisini bir vaka çalışması olarak ele aldık: Problemlere yaklaşım biçimleri üzerine kurulan bir marka dili ve işlerin arkasında durmayı bilen disiplinli bir görsel sistem.",
      solution: "Projelerin yalnızca final görsellerle değil, arkalarındaki kararla açıldığı yüksek kontrastlı, editoryal bir kimlik ve portfolyo deneyimi.",
      results: "Stüdyo artık yeni iş görüşmelerine fiyatıyla değil bakış açısıyla başlıyor; portfolyo, ekibin gerçekte çalıştığı biçimde okunuyor.",
      metricBadge: "3,1× gelen talep",
      stats: [{ label: "Gelen talepler", value: "3.1×", bar: 85 }, { label: "Ortalama proje değeri", value: "+45%", bar: 45 }, { label: "Teklif kazanma oranı", value: "+22 pts", bar: 22 }],
    },
    "novis-clinic": {
      name: "Novis Clinic",
      sector: "Sağlık",
      summary: "Netlik, erişilebilirlik ve hasta güveni etrafında yapılandırılmış sakin ve güvenilir bir sağlık deneyimi.",
      problem: "Hastalar eski siteye kaygılı geliyor, kafası karışmış hâlde ayrılıyordu: Yoğun tıbbi dil, belirsiz yönlendirmeler ve karşılaşacakları ekibe dair hiçbir fikir yoktu.",
      approach: "Her sayfa, hastaların randevudan önce gerçekten sorduğu sorular etrafında yeniden kuruldu: Ne olacak, beni kim tedavi edecek, maliyeti ne, nasıl hazırlanmalıyım. Dil, sakinlik ve netlik için gözden geçirildi.",
      solution: "Net tedavi yolculukları, şeffaf pratik bilgiler ve dönüşümü zorlamak yerine tereddüdü azaltmak için tasarlanan randevu akışıyla sakin, erişilebilir bir arayüz.",
      results: "Klinik ekibi görüşmelerin artık daha ileriden başladığını aktarıyor: Hastalar tedavi süreçlerini anlayarak geliyor ve ön büro temel bilgileri tekrar etmeye daha az zaman harcıyor.",
      metricBadge: "+%87 online randevu",
      stats: [{ label: "Online randevular", value: "+87%", bar: 87 }, { label: "Ön büro aramaları", value: "−40%", bar: 40 }, { label: "Organik trafik", value: "+120%", bar: 95 }],
    },
    "roam-safaris": {
      name: "Roam Safaris",
      sector: "Turizm",
      summary: "Keşif duygusunu net ve etkileyici bir seyahat yolculuğuna dönüştüren sürükleyici bir turizm platformu.",
      problem: "Seyahatler olağanüstüydü ancak rezervasyon deneyimi öyle değildi. Rota seçenekleri PDF’lerde ve e-posta yazışmalarında yaşıyor, gezginler bir yolculuğun diğerinden nasıl ayrıştığını göremiyordu.",
      approach: "Gezginlerin gerçekte nasıl karar verdiğini haritaladık: Mevsim, tempo, coğrafya, konfor. Bu kararları bir listeye eklenmiş filtreler yerine ürünün kendisinin yapısına dönüştürdük.",
      solution: "Her rotanın günden güne görsel olarak açıldığı, pratik detayların yalnızca gezgin istediğinde katman katman sunulduğu yolculuk odaklı bir platform.",
      results: "Talepler artık seçilmiş bir rota ve seyahat aralığıyla geliyor; planlama görüşmeleri kısalıyor ve ekip anlatmak yerine kişiselleştirmeye odaklanabiliyor.",
      metricBadge: "+%210 rota talebi",
      stats: [{ label: "Rota talepleri", value: "+210%", bar: 100 }, { label: "Planlama süresi", value: "−55%", bar: 55 }, { label: "Geri dönen ziyaretçiler", value: "+73%", bar: 73 }],
    },
  },
  az: {
    "marina-vista": {
      name: "Marina Vista",
      sector: "Daşınmaz Əmlak / Qonaqpərvərlik",
      summary: "Premium mövqeləndirməni rahat kəşf təcrübəsi ilə birləşdirən sahil həyatı konsepti üçün hazırlanmış zərif rəqəmsal təcrübə.",
      problem: "Konseptin güclü fiziki vizyonu var idi, lakin bunu çatdıra biləcək rəqəmsal varlığı yox idi. İlk materiallar lokasiyanı fərqləndirən dəyərləri zəiflədən ümumi daşınmaz əmlak dilinə söykənirdi.",
      approach: "Mərtəbə planlarından deyil, oraya çatma təcrübəsindən başladıq: sahilin, işığın və məkanın tempinin ekranda necə hiss olunmalı olduğundan. İnformasiya arxitekturası siyahılar əvəzinə kəşf ətrafında yenidən quruldu.",
      solution: "Təmkinli tipoqrafiya, tam ekran vizuallar və ziyarətçinin öz ritminə hörmət edən aydın müraciət axını ilə sakit, vizual yönümlü rəqəmsal təcrübə.",
      results: "Brend artıq tikinti layihəsi kimi deyil, destinasiya kimi mövqelənir; müraciət axını satış komandasına ilk mesajdan daha aydın və keyfiyyətli kontekst verir.",
      metricBadge: "+64% keyfiyyətli müraciət",
      stats: [{ label: "Keyfiyyətli müraciətlər", value: "+64%", bar: 64 }, { label: "Saytda keçirilən vaxt", value: "2.4×", bar: 80 }, { label: "İmtina dərəcəsi", value: "−31%", bar: 31 }],
    },
    "vertex-studio": {
      name: "Vertex Studio",
      sector: "Kreativ Studiya",
      summary: "Studiyanın düşüncə tərzini və vizual işlərini ön plana çıxaran güclü portfolio təcrübəsi.",
      problem: "Studiyanın işləri güclü idi, lakin öz təqdimatı digər portfolio saytlarından fərqlənmirdi; kimlik studiyanın necə düşündüyü barədə heç nə demirdi.",
      approach: "Studiyanın özünə keys kimi yanaşdıq: problemlərə yanaşma tərzi üzərində qurulan verbal kimlik və işlərin arxasında dayanmağı bacaran intizamlı vizual sistem.",
      solution: "Layihələrin yalnız final görüntülərlə deyil, arxasındakı qərarla açıldığı yüksək kontrastlı, editorial kimlik və portfolio təcrübəsi.",
      results: "Studiya yeni əməkdaşlıq söhbətlərinə artıq qiyməti ilə deyil, baxış bucağı ilə başlayır; portfolio komandanın real iş tərzini əks etdirir.",
      metricBadge: "3.1× daxil olan sorğu",
      stats: [{ label: "Daxil olan sorğular", value: "3.1×", bar: 85 }, { label: "Orta layihə dəyəri", value: "+45%", bar: 45 }, { label: "Təklif qazanma nisbəti", value: "+22 pts", bar: 22 }],
    },
    "novis-clinic": {
      name: "Novis Clinic",
      sector: "Səhiyyə",
      summary: "Aydınlıq, əlçatanlıq və pasiyent etibarı üzərində qurulmuş sakit və güvənli səhiyyə təcrübəsi.",
      problem: "Pasiyentlər köhnə sayta narahat gəlir, çaşqın ayrılırdılar: sıx tibbi dil, qeyri-müəyyən yönləndirmələr və qarşılaşacaqları komanda barədə heç bir təsəvvür yox idi.",
      approach: "Hər səhifə pasiyentlərin görüşdən əvvəl həqiqətən verdiyi suallar ətrafında yenidən quruldu: nə baş verəcək, məni kim müalicə edəcək, qiyməti nədir, necə hazırlaşım. Dil sakitlik və aydınlıq üçün nəzərdən keçirildi.",
      solution: "Aydın müalicə yolları, şəffaf praktik məlumat və konversiyanı sıxışdırmaq əvəzinə tərəddüdü azaltmaq üçün qurulmuş görüş axını ilə sakit, əlçatan interfeys.",
      results: "Klinikanın komandası söhbətlərin artıq daha irəlidən başladığını bildirir: pasiyentlər müalicə yolunu anlayaraq gəlir, qəbul isə əsas məlumatları təkrarlamağa daha az vaxt sərf edir.",
      metricBadge: "+87% onlayn rezervasiya",
      stats: [{ label: "Onlayn rezervasiyalar", value: "+87%", bar: 87 }, { label: "Qəbul zəngləri", value: "−40%", bar: 40 }, { label: "Orqanik trafik", value: "+120%", bar: 95 }],
    },
    "roam-safaris": {
      name: "Roam Safaris",
      sector: "Turizm",
      summary: "Kəşf hissini aydın və cəlbedici səyahət yoluna çevirən immersiv turizm platforması.",
      problem: "Səyahətlər qeyri-adi idi, rezervasiya təcrübəsi isə yox. Marşrut seçimləri PDF-lərdə və e-poçt yazışmalarında yaşayırdı və səyahətçilər bir yolun digərindən nə ilə fərqləndiyini görə bilmirdilər.",
      approach: "Səyahətçilərin real qərar vermə tərzini xəritələdik: mövsüm, temp, landşaft, komfort. Bu qərarları siyahıya əlavə edilmiş filtr əvəzinə məhsulun öz strukturuna çevirdik.",
      solution: "Hər marşrutun gündən-günə vizual şəkildə açıldığı, praktik detalların yalnız səyahətçi istədikdə təqdim olunduğu səyahət yönümlü platforma.",
      results: "Müraciətlər artıq seçilmiş marşrut və səyahət tarixləri ilə gəlir; planlaşdırma söhbətləri qısalır və komanda izah etmək əvəzinə fərdiləşdirməyə fokuslanır.",
      metricBadge: "+210% marşrut sorğusu",
      stats: [{ label: "Marşrut sorğuları", value: "+210%", bar: 100 }, { label: "Planlaşdırma vaxtı", value: "−55%", bar: 55 }, { label: "Geri qayıdan ziyarətçilər", value: "+73%", bar: 73 }],
    },
  },
  ar: {
    "marina-vista": {
      name: "Marina Vista",
      sector: "العقارات / الضيافة",
      summary: "تجربة رقمية راقية لمفهوم حياة ساحلية، تجمع بين التموضع الفاخر وسهولة الاستكشاف.",
      problem: "كان للمفهوم رؤية عمرانية مميزة لكن دون حضور رقمي قادر على التعبير عنها، واعتمدت المواد الأولى على لغة عقارية عامة أضعفت ما يميز الموقع.",
      approach: "بدأنا من تجربة الوصول إلى المكان لا من المخططات: كيف يجب أن يُحَس الساحل والضوء وإيقاع المكان على الشاشة. وأعيد بناء هيكلة المحتوى حول الاستكشاف بدلًا من القوائم.",
      solution: "تجربة رقمية هادئة تقودها الصورة، بخطوط متزنة ومشاهد بملء الشاشة ومسار تواصل واضح يحترم إيقاع الزائر.",
      results: "أصبحت العلامة تُقدَّم كوجهة لا كمشروع عقاري، ويمنح مسار التواصل فريق المبيعات سياقًا أوضح وأكثر جدية منذ الرسالة الأولى.",
      metricBadge: "+64% طلبات مؤهلة",
      stats: [{ label: "طلبات مؤهلة", value: "+64%", bar: 64 }, { label: "الوقت في الموقع", value: "2.4×", bar: 80 }, { label: "معدل الارتداد", value: "−31%", bar: 31 }],
    },
    "vertex-studio": {
      name: "Vertex Studio",
      sector: "استوديو إبداعي",
      summary: "تجربة ملف أعمال واضحة تضع فكر الاستوديو وأعماله البصرية في مقدمة المشهد.",
      problem: "كانت أعمال الاستوديو قوية، لكن حضوره الخاص بدا قابلًا للاستبدال بأي موقع أعمال آخر؛ فالهوية لم تقل شيئًا عن طريقة تفكيره.",
      approach: "تعاملنا مع الاستوديو نفسه كدراسة حالة: هوية لفظية مبنية على طريقة تحليله للمشكلات، ونظام بصري منضبط يعرف متى يتراجع خلف العمل.",
      solution: "هوية تحريرية عالية التباين وتجربة ملف أعمال تُفتتح فيها المشاريع بالقرار الذي يقف خلفها، لا بالصور النهائية فقط.",
      results: "أصبح الاستوديو يبدأ محادثات الأعمال الجديدة من وجهة نظره لا من سعره، وصار ملف الأعمال يُقرأ كما يعمل الفريق فعلًا.",
      metricBadge: "3.1× عملاء واردون",
      stats: [{ label: "العملاء الواردون", value: "3.1×", bar: 85 }, { label: "متوسط قيمة المشروع", value: "+45%", bar: 45 }, { label: "معدل كسب العروض", value: "+22 pts", bar: 22 }],
    },
    "novis-clinic": {
      name: "Novis Clinic",
      sector: "الرعاية الصحية",
      summary: "تجربة صحية هادئة وموثوقة مبنية حول الوضوح وسهولة الوصول وثقة المريض.",
      problem: "كان المرضى يصلون إلى الموقع القديم قلقين ويغادرونه مرتبكين: لغة طبية كثيفة، ومسارات غير واضحة، ولا فكرة عمن سيقابلونه فعلًا.",
      approach: "أعيد بناء كل صفحة حول الأسئلة التي يطرحها المرضى فعلًا قبل الحجز: ماذا سيحدث، من سيعالجني، كم التكلفة، كيف أستعد — بلغة رُوجعت لتكون هادئة وواضحة.",
      solution: "واجهة هادئة وسهلة الوصول، بمسارات علاج واضحة ومعلومات عملية شفافة، ومسار حجز صُمم لتقليل التردد لا للضغط على الزائر.",
      results: "يشير فريق العيادة إلى أن المحادثات أصبحت تبدأ من نقطة أبعد: يصل المرضى وهم يفهمون مسار علاجهم، ويقضي موظفو الاستقبال وقتًا أقل في تكرار الأساسيات.",
      metricBadge: "+87% حجوزات إلكترونية",
      stats: [{ label: "الحجوزات الإلكترونية", value: "+87%", bar: 87 }, { label: "مكالمات الاستقبال", value: "−40%", bar: 40 }, { label: "الزيارات العضوية", value: "+120%", bar: 95 }],
    },
    "roam-safaris": {
      name: "Roam Safaris",
      sector: "السياحة",
      summary: "منصة سفر غامرة تحول روح الاستكشاف إلى رحلة واضحة وجذابة.",
      problem: "كانت الرحلات استثنائية، لكن تجربة الحجز لم تكن كذلك. عاشت خيارات المسارات في ملفات PDF وسلاسل بريد إلكتروني، ولم يستطع المسافرون رؤية ما يميز رحلة عن أخرى.",
      approach: "رسمنا خريطة الطريقة التي يقرر بها المسافرون فعلًا — الموسم والإيقاع والطبيعة والراحة — وحولنا هذه القرارات إلى بنية المنتج نفسه بدلًا من فلاتر مضافة إلى قائمة.",
      solution: "منصة تبدأ من الرحلة، يتكشف فيها كل مسار بصريًا يومًا بيوم، مع تفاصيل عملية تظهر فقط عندما يطلبها المسافر.",
      results: "تصل الطلبات الآن ومعها مسار مختار وإطار زمني للسفر، ما يختصر محادثة التخطيط ويتيح للفريق التركيز على التخصيص بدلًا من الشرح.",
      metricBadge: "+210% طلبات المسارات",
      stats: [{ label: "طلبات المسارات", value: "+210%", bar: 100 }, { label: "وقت التخطيط", value: "−55%", bar: 55 }, { label: "الزوار العائدون", value: "+73%", bar: 73 }],
    },
  },
};

export function staticCaseStudies(locale: Locale): CaseStudy[] {
  const localized = CONTENT[locale] ?? CONTENT.en;
  return BASE.map((base) => ({ ...base, ...(localized[base.slug] ?? CONTENT.en[base.slug]) }));
}

/** Default rows for the admin panel's "import defaults" action. */
export function getDefaultCaseStudyRows(): Array<Omit<CaseStudyRow, 'id'>> {
  return BASE.map((base, index) => ({
    slug: base.slug,
    year: base.year,
    market: base.market,
    image_url: base.image,
    services: base.services,
    order_index: index,
    is_active: true,
    kind: base.kind,
    video_url: null,
    content: {
      en: CONTENT.en[base.slug],
      tr: CONTENT.tr[base.slug],
      az: CONTENT.az[base.slug],
      ar: CONTENT.ar[base.slug],
    },
  }));
}
