/* ===================================================================
   Canvas Print — site data

   Edit content here. Keys map to i18n labels where noted.
   Localized strings use { en: "...", bn: "..." } objects.

   CONTENTS
   ────────────────────────────────────────────────────────────────
   SITE               Contact info, hours, social links
   NAV                Header navigation
   STATS / TRUSTED    About page counters & client names
   SERVICES           Service catalogue
   PORTFOLIO          Work samples + filter categories
   TESTIMONIALS       Review quotes
   FAQS               Question / answer pairs
   PRICING            Plan cards + price table
   PRODUCTS           Shop catalogue (variants, prices)
   FOOTER_GROUPS      Footer link columns
   =================================================================== */
(function () {
    "use strict";

    window.SITE = {
        name: "Canvas Print",
        legalName: "Canvas Print",
        url: "https://canvasprintbd.com",
        email: "hello@canvasprintbd.com",
        phone: "+880 1700-000000",
        phoneHref: "+8801700000000",
        whatsapp: "8801700000000",
        address: "Jamalganj, Sunamganj, Sylhet, Bangladesh",
        area: "Jamalganj",
        city: "Sunamganj",
        division: "Sylhet",
        socials: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        },
        hours: [
            { day: { en: "Saturday – Thursday", bn: "শনিবার – বৃহস্পতিবার" }, time: "9:00 AM – 8:00 PM" },
            { day: { en: "Friday", bn: "শুক্রবার" }, time: "3:00 PM – 8:00 PM" }
        ]
    };

    /* ── Navigation ── */
    window.NAV = [
        { key: "home", href: "/" },
        { key: "company", children: [
            { key: "about", href: "/about.html" },
            { key: "services", href: "/services.html" },
            { key: "portfolio", href: "/portfolio.html" },
            { key: "faq", href: "/faq.html" }
        ] },
        { key: "shop", href: "/shop.html" },
        { key: "pricing", href: "/pricing.html" },
        { key: "contact", href: "/contact.html" }
    ];

    /* ── About page: stats & trusted logos ── */
    window.STATS = [
        { value: 12, suffix: "+", key: "years" },
        { value: 8500, suffix: "+", key: "projects" },
        { value: 1200, suffix: "+", key: "clients" },
        { value: 48, suffix: "h", key: "turnaround" }
    ];

    window.TRUSTED = ["Haor Cafe", "Sylhet Tech", "Green Agro", "Bloom Boutique", "Bright Academy", "Surma Foods"];

    /* ── Services (home + services page) ── */
    window.SERVICES = [
        { slug: "business-cards", kind: "card", priceFrom: "৳400", home: true,
          name: { en: "Business Cards", bn: "বিজনেস কার্ড" },
          tagline: { en: "First impressions, beautifully printed.", bn: "প্রথম ইমপ্রেশন, সুন্দরভাবে প্রিন্ট করা।" },
          description: { en: "Premium business cards on heavyweight stock with matte, gloss, or soft-touch finishes. Spot UV, foiling, and rounded corners available.", bn: "ভারী স্টকে প্রিমিয়াম বিজনেস কার্ড — ম্যাট, গ্লস বা সফট-টাচ ফিনিশসহ। স্পট UV, ফয়েলিং ও রাউন্ড কর্নার পাওয়া যায়।" },
          features: ["300–600 GSM stock", "Matte / gloss / soft-touch", "Spot UV & foil options", "Rounded corner cutting"] },

        { slug: "flyers", kind: "flyer", priceFrom: "৳6", home: true,
          name: { en: "Flyers", bn: "ফ্লায়ার" },
          tagline: { en: "Spread the word with impact.", bn: "প্রভাব ফেলে বার্তা ছড়িয়ে দিন।" },
          description: { en: "Vibrant single or double-sided flyers ideal for promotions, events, and announcements with crisp colour reproduction.", bn: "প্রোমোশন, ইভেন্ট ও ঘোষণার জন্য উজ্জ্বল এক বা দুই পাশের ফ্লায়ার, ঝকঝকে রঙে।" },
          features: ["A4 / A5 / DL sizes", "Single or double-sided", "Art paper & matte options", "Bulk pricing tiers"] },

        { slug: "brochures", kind: "brochure", priceFrom: "৳35", home: true,
          name: { en: "Brochures", bn: "ব্রোশিওর" },
          tagline: { en: "Tell your story, fold by fold.", bn: "ভাঁজে ভাঁজে আপনার গল্প বলুন।" },
          description: { en: "Bi-fold, tri-fold, and multi-page brochures with precise folding and binding — perfect for catalogues and profiles.", bn: "বাই-ফোল্ড, ট্রাই-ফোল্ড ও মাল্টি-পেজ ব্রোশিওর, নিখুঁত ভাঁজ ও বাইন্ডিংসহ।" },
          features: ["Bi-fold & tri-fold", "Saddle stitching", "Premium coated stock", "Custom page counts"] },

        { slug: "letterheads", kind: "stationery", priceFrom: "৳8", home: false,
          name: { en: "Letterheads", bn: "লেটারহেড" },
          tagline: { en: "Stationery that means business.", bn: "ব্যবসার উপযোগী স্টেশনারি।" },
          description: { en: "Professional letterheads printed on quality bond paper, perfectly aligned to your brand identity.", bn: "মানসম্পন্ন বন্ড কাগজে পেশাদার লেটারহেড, আপনার ব্র্যান্ডের সাথে মানানসই।" },
          features: ["A4 bond paper", "Brand-matched colour", "Watermark options", "Matching envelopes"] },

        { slug: "envelopes", kind: "stationery", priceFrom: "৳10", home: false,
          name: { en: "Envelopes", bn: "খাম" },
          tagline: { en: "Deliver in style.", bn: "স্টাইলে পৌঁছে দিন।" },
          description: { en: "Custom-printed envelopes in DL, A5, and A4 formats with full-colour branding inside and out.", bn: "DL, A5 ও A4 ফরম্যাটে কাস্টম-প্রিন্টেড খাম, ভেতরে-বাইরে ফুল-কালার ব্র্যান্ডিংসহ।" },
          features: ["DL / A5 / A4", "Window & plain", "Self-seal options", "Full-colour print"] },

        { slug: "invoices", kind: "stationery", priceFrom: "৳250", home: false,
          name: { en: "Invoices & Bills", bn: "ইনভয়েস ও বিল" },
          tagline: { en: "Carbonless, numbered, professional.", bn: "কার্বনলেস, নম্বরযুক্ত, পেশাদার।" },
          description: { en: "Custom invoice and receipt books with sequential numbering and duplicate/triplicate carbonless copies.", bn: "ক্রমিক নম্বর ও ডুপ্লিকেট/ট্রিপলিকেট কার্বনলেস কপিসহ কাস্টম ইনভয়েস ও রসিদ বই।" },
          features: ["NCR carbonless", "Sequential numbering", "Duplicate / triplicate", "Padding & binding"] },

        { slug: "packaging", kind: "packaging", priceFrom: "৳45", home: true,
          name: { en: "Packaging Boxes", bn: "প্যাকেজিং বক্স" },
          tagline: { en: "Unboxing worth remembering.", bn: "মনে রাখার মতো আনবক্সিং।" },
          description: { en: "Custom product packaging, mono cartons, and gift boxes with die-cutting, lamination, and structural design support.", bn: "ডাই-কাটিং, ল্যামিনেশন ও স্ট্রাকচারাল ডিজাইনসহ কাস্টম প্যাকেজিং, মনো কার্টন ও গিফট বক্স।" },
          features: ["Custom die-cut", "Mono cartons", "Lamination & foiling", "Structural design help"] },

        { slug: "roll-up-banners", kind: "banner", priceFrom: "৳1,800", home: false,
          name: { en: "Roll-up Banners", bn: "রোল-আপ ব্যানার" },
          tagline: { en: "Portable, premium, presentation-ready.", bn: "বহনযোগ্য, প্রিমিয়াম, উপস্থাপনার জন্য প্রস্তুত।" },
          description: { en: "Retractable roll-up stands with high-resolution prints, ideal for exhibitions, storefronts, and events.", bn: "উচ্চ-রেজোলিউশন প্রিন্টসহ রিট্র্যাক্টেবল রোল-আপ স্ট্যান্ড, প্রদর্শনী ও ইভেন্টের জন্য আদর্শ।" },
          features: ["80×200 cm standard", "Premium PET film", "Aluminium stand included", "Carry bag"] },

        { slug: "pvc-banners", kind: "banner", priceFrom: "৳40", home: false,
          name: { en: "PVC Banners", bn: "PVC ব্যানার" },
          tagline: { en: "Built for the outdoors.", bn: "বাইরের পরিবেশের জন্য তৈরি।" },
          description: { en: "Weather-resistant large-format PVC banners with eyelets and reinforced hemming for any outdoor campaign.", bn: "আইলেট ও শক্তিশালী হেমিংসহ আবহাওয়া-প্রতিরোধী বড় আকারের PVC ব্যানার।" },
          features: ["Weatherproof PVC", "Eyelets & hemming", "Any custom size", "Vivid solvent print"] },

        { slug: "stickers", kind: "sticker", priceFrom: "৳3", home: true,
          name: { en: "Stickers & Labels", bn: "স্টিকার ও লেবেল" },
          tagline: { en: "Stick your brand everywhere.", bn: "আপনার ব্র্যান্ড সর্বত্র লাগান।" },
          description: { en: "Die-cut stickers and product labels in gloss, matte, or transparent vinyl — waterproof and fade-resistant.", bn: "গ্লস, ম্যাট বা স্বচ্ছ ভিনাইলে ডাই-কাট স্টিকার ও লেবেল — ওয়াটারপ্রুফ ও ফেইড-প্রতিরোধী।" },
          features: ["Custom die-cut", "Vinyl & paper", "Waterproof options", "Roll or sheet"] },

        { slug: "calendars", kind: "calendar", priceFrom: "৳120", home: false,
          name: { en: "Calendars", bn: "ক্যালেন্ডার" },
          tagline: { en: "Stay on brand all year round.", bn: "সারা বছর ব্র্যান্ডের সাথে।" },
          description: { en: "Wall and desk calendars with custom photography, branding, and premium binding for corporate gifting.", bn: "কাস্টম ছবি, ব্র্যান্ডিং ও প্রিমিয়াম বাইন্ডিংসহ ওয়াল ও ডেস্ক ক্যালেন্ডার।" },
          features: ["Wall & desk formats", "Spiral binding", "Custom imagery", "Bulk corporate orders"] },

        { slug: "notebooks", kind: "notebook", priceFrom: "৳150", home: false,
          name: { en: "Notebooks & Diaries", bn: "নোটবুক ও ডায়েরি" },
          tagline: { en: "Everyday essentials, branded.", bn: "প্রতিদিনের প্রয়োজন, ব্র্যান্ডেড।" },
          description: { en: "Custom notebooks and diaries with branded covers, ribbon markers, and a choice of ruling and binding.", bn: "ব্র্যান্ডেড কভার, রিবন মার্কার ও পছন্দমতো রুলিং-বাইন্ডিংসহ কাস্টম নোটবুক ও ডায়েরি।" },
          features: ["Hard & soft cover", "Ribbon markers", "Custom ruling", "Branded covers"] },

        { slug: "id-cards", kind: "idcard", priceFrom: "৳35", home: false,
          name: { en: "ID Cards", bn: "আইডি কার্ড" },
          tagline: { en: "Identity, professionally produced.", bn: "পরিচয়, পেশাদারভাবে তৈরি।" },
          description: { en: "Durable PVC ID cards with lanyards, perfect for organisations, schools, and events.", bn: "ল্যানিয়ার্ডসহ টেকসই PVC আইডি কার্ড — প্রতিষ্ঠান, স্কুল ও ইভেন্টের জন্য আদর্শ।" },
          features: ["PVC cards", "Lanyards & holders", "Variable data", "Bulk batches"] },

        { slug: "menu-cards", kind: "menu", priceFrom: "৳60", home: false,
          name: { en: "Menu Cards", bn: "মেনু কার্ড" },
          tagline: { en: "Make every dish look delicious.", bn: "প্রতিটি ডিশ লোভনীয় দেখান।" },
          description: { en: "Restaurant menus printed on laminated or rigid stock — built to survive busy service and look beautiful.", bn: "ল্যামিনেটেড বা রিজিড স্টকে রেস্তোরাঁর মেনু — ব্যস্ত সার্ভিসেও টেকসই ও সুন্দর।" },
          features: ["Laminated finish", "Rigid & folding", "Spill-resistant", "Reprint friendly"] },

        { slug: "invitation-cards", kind: "invitation", priceFrom: "৳25", home: false,
          name: { en: "Invitation Cards", bn: "নিমন্ত্রণ কার্ড" },
          tagline: { en: "Occasions deserve elegance.", bn: "অনুষ্ঠান চায় আভিজাত্য।" },
          description: { en: "Wedding and event invitations with foil stamping, embossing, and luxury paper for unforgettable moments.", bn: "ফয়েল স্ট্যাম্পিং, এম্বসিং ও বিলাসবহুল কাগজে বিয়ে ও ইভেন্টের নিমন্ত্রণপত্র।" },
          features: ["Foil & emboss", "Luxury paper", "Custom envelopes", "RSVP inserts"] },

        { slug: "certificates", kind: "certificate", priceFrom: "৳40", home: false,
          name: { en: "Certificates", bn: "সার্টিফিকেট" },
          tagline: { en: "Recognition, beautifully framed.", bn: "স্বীকৃতি, সুন্দরভাবে উপস্থাপিত।" },
          description: { en: "Award and achievement certificates on premium textured stock with optional foiling and seals.", bn: "ঐচ্ছিক ফয়েলিং ও সিলসহ প্রিমিয়াম টেক্সচারড স্টকে অ্যাওয়ার্ড ও অর্জন সার্টিফিকেট।" },
          features: ["Textured stock", "Gold foil seals", "A4 & A3", "Frame-ready"] },

        { slug: "custom-printing", kind: "poster", priceFrom: "Custom", home: true,
          name: { en: "Custom Printing", bn: "কাস্টম প্রিন্টিং" },
          tagline: { en: "If you can imagine it, we can print it.", bn: "যা কল্পনা করতে পারেন, আমরা তা প্রিন্ট করি।" },
          description: { en: "Have something unique in mind? Our team handles bespoke print projects end-to-end, from concept to delivery.", bn: "অনন্য কিছু ভাবছেন? আমাদের টিম ধারণা থেকে ডেলিভারি পর্যন্ত বিশেষ প্রিন্ট প্রকল্প সামলায়।" },
          features: ["Dedicated project lead", "Material sourcing", "Prototyping", "Any quantity"] }
    ];

    /* ── Portfolio ── */
    /* Royalty-free mockups (Unsplash / Pexels) — stored locally in /assets/img/portfolio/ */
    window.PORTFOLIO_IMAGES = {
        "haor-cafe-menu": "/assets/img/portfolio/haor-cafe-menu.jpg",
        "sylhet-tech-cards": "/assets/img/portfolio/sylhet-tech-cards.jpg",
        "green-agro-cartons": "/assets/img/portfolio/green-agro-cartons.jpg",
        "bloom-gift-boxes": "/assets/img/portfolio/bloom-gift-boxes.jpg",
        "annual-gala-invite": "/assets/img/portfolio/annual-gala-invite.jpg",
        "surma-foods-labels": "/assets/img/portfolio/surma-foods-labels.jpg",
        "bright-academy-certs": "/assets/img/portfolio/bright-academy-certs.jpg",
        "expo-roll-up-stand": "/assets/img/portfolio/expo-roll-up-stand.jpg",
        "corporate-profile": "/assets/img/portfolio/corporate-profile.jpg",
        "festival-poster": "/assets/img/portfolio/festival-poster.jpg",
        "conference-id-cards": "/assets/img/portfolio/conference-id-cards.jpg",
        "boutique-stationery": "/assets/img/portfolio/boutique-stationery.jpg",
        "wall-calendar": "/assets/img/portfolio/wall-calendar.jpg",
        "startup-pitch-flyers": "/assets/img/portfolio/startup-pitch-flyers.jpg",
        "premium-notebooks": "/assets/img/portfolio/premium-notebooks.jpg"
    };

    window.PORTFOLIO = [
        { id: "haor-cafe-menu", title: { en: "Haor Cafe Menu", bn: "হাওর ক্যাফে মেনু" }, category: "Branding", kind: "menu" },
        { id: "sylhet-tech-cards", title: { en: "Sylhet Tech Cards", bn: "সিলেট টেক কার্ড" }, category: "Business", kind: "card" },
        { id: "green-agro-cartons", title: { en: "Green Agro Cartons", bn: "গ্রিন এগ্রো কার্টন" }, category: "Packaging", kind: "packaging" },
        { id: "bloom-gift-boxes", title: { en: "Bloom Gift Boxes", bn: "ব্লুম গিফট বক্স" }, category: "Packaging", kind: "packaging" },
        { id: "annual-gala-invite", title: { en: "Annual Gala Invite", bn: "বার্ষিক গালা নিমন্ত্রণ" }, category: "Events", kind: "invitation" },
        { id: "surma-foods-labels", title: { en: "Surma Foods Labels", bn: "সুরমা ফুডস লেবেল" }, category: "Branding", kind: "sticker" },
        { id: "bright-academy-certs", title: { en: "Bright Academy Certs", bn: "ব্রাইট একাডেমি সার্টিফিকেট" }, category: "Corporate", kind: "certificate" },
        { id: "expo-roll-up-stand", title: { en: "Expo Roll-up Stand", bn: "এক্সপো রোল-আপ স্ট্যান্ড" }, category: "Marketing", kind: "banner" },
        { id: "corporate-profile", title: { en: "Corporate Profile", bn: "কর্পোরেট প্রোফাইল" }, category: "Corporate", kind: "brochure" },
        { id: "festival-poster", title: { en: "Festival Poster", bn: "উৎসব পোস্টার" }, category: "Marketing", kind: "poster" },
        { id: "conference-id-cards", title: { en: "Conference ID Cards", bn: "কনফারেন্স আইডি কার্ড" }, category: "Events", kind: "idcard" },
        { id: "boutique-stationery", title: { en: "Boutique Stationery", bn: "বুটিক স্টেশনারি" }, category: "Branding", kind: "stationery" },
        { id: "wall-calendar", title: { en: "2026 Wall Calendar", bn: "২০২৬ ওয়াল ক্যালেন্ডার" }, category: "Corporate", kind: "calendar" },
        { id: "startup-pitch-flyers", title: { en: "Startup Pitch Flyers", bn: "স্টার্টআপ পিচ ফ্লায়ার" }, category: "Marketing", kind: "flyer" },
        { id: "premium-notebooks", title: { en: "Premium Notebooks", bn: "প্রিমিয়াম নোটবুক" }, category: "Corporate", kind: "notebook" }
    ];

    window.PORTFOLIO_CATEGORIES = ["All", "Business", "Corporate", "Events", "Packaging", "Branding", "Marketing"];

    /* ── Testimonials ── */
    window.TESTIMONIALS = [
        { name: "Tanvir Ahmed", role: { en: "Founder, Haor Cafe", bn: "প্রতিষ্ঠাতা, হাওর ক্যাফে" }, rating: 5,
          quote: { en: "Canvas Print redid our entire menu and packaging. The soft-touch finish on the boxes genuinely lifted how customers see our brand. Flawless.", bn: "Canvas Print আমাদের পুরো মেনু ও প্যাকেজিং নতুন করে তৈরি করেছে। বক্সের সফট-টাচ ফিনিশ আমাদের ব্র্যান্ডের চেহারাই বদলে দিয়েছে। নিখুঁত।" } },
        { name: "Sadia Rahman", role: { en: "Marketing Lead, Sylhet Tech", bn: "মার্কেটিং লিড, সিলেট টেক" }, rating: 5,
          quote: { en: "We needed 2,000 brochures in two days for a trade fair. They delivered on time, colour-perfect, and the team was a pleasure to work with.", bn: "ট্রেড ফেয়ারের জন্য দুই দিনে ২,০০০ ব্রোশিওর দরকার ছিল। তারা সময়মতো, নিখুঁত রঙে পৌঁছে দিয়েছে। দারুণ টিম।" } },
        { name: "Imran Hossain", role: { en: "Event Manager", bn: "ইভেন্ট ম্যানেজার" }, rating: 5,
          quote: { en: "The roll-up banners and invitation cards for our event were stunning. Foil detailing was crisp and the whole order felt premium.", bn: "আমাদের ইভেন্টের রোল-আপ ব্যানার ও নিমন্ত্রণ কার্ড অসাধারণ ছিল। ফয়েল ডিটেইলিং ঝকঝকে আর পুরো অর্ডারটাই প্রিমিয়াম।" } },
        { name: "Nusrat Jahan", role: { en: "Owner, Bloom Boutique", bn: "মালিক, ব্লুম বুটিক" }, rating: 5,
          quote: { en: "From business cards to stickers, everything is consistent and beautifully made. My go-to printer in Sunamganj, no question.", bn: "বিজনেস কার্ড থেকে স্টিকার — সবকিছু সামঞ্জস্যপূর্ণ ও সুন্দরভাবে তৈরি। সুনামগঞ্জে আমার প্রিয় প্রিন্টার।" } },
        { name: "Rakib Chowdhury", role: { en: "Operations, Green Agro", bn: "অপারেশনস, গ্রিন এগ্রো" }, rating: 5,
          quote: { en: "Reliable, affordable, and genuinely helpful. They suggested a better stock for our packaging that saved cost without losing quality.", bn: "নির্ভরযোগ্য, সাশ্রয়ী এবং সত্যিই সহায়ক। তারা আমাদের প্যাকেজিংয়ের জন্য ভালো স্টক সুপারিশ করেছে যা মান না কমিয়ে খরচ বাঁচিয়েছে।" } },
        { name: "Farzana Akter", role: { en: "Principal, Bright Academy", bn: "অধ্যক্ষ, ব্রাইট একাডেমি" }, rating: 5,
          quote: { en: "Certificates, ID cards, and calendars — all handled in one order and delivered early. Professional from start to finish.", bn: "সার্টিফিকেট, আইডি কার্ড ও ক্যালেন্ডার — সব এক অর্ডারে এবং আগেভাগে ডেলিভারি। শুরু থেকে শেষ পর্যন্ত পেশাদার।" } },
        { name: "Mahmudul Karim", role: { en: "Director, Surma Foods", bn: "পরিচালক, সুরমা ফুডস" }, rating: 5,
          quote: { en: "The label printing for our entire product line was spot on. Consistent colours across hundreds of SKUs and not a single reprint needed.", bn: "আমাদের পুরো প্রোডাক্ট লাইনের লেবেল প্রিন্ট একদম নিখুঁত। শত শত SKU জুড়ে সামঞ্জস্যপূর্ণ রঙ আর একবারও পুনঃপ্রিন্ট লাগেনি।" } },
        { name: "Shahana Begum", role: { en: "Wedding Planner", bn: "ওয়েডিং প্ল্যানার" }, rating: 5,
          quote: { en: "Every invitation set I've ordered has been gorgeous. The foil work and paper quality make my clients feel truly special.", bn: "আমার অর্ডার করা প্রতিটি নিমন্ত্রণপত্র ছিল চমৎকার। ফয়েল কাজ ও কাগজের মান আমার ক্লায়েন্টদের সত্যিই বিশেষ অনুভব করায়।" } },
        { name: "Arif Mahmood", role: { en: "Co-founder, Green Agro", bn: "সহ-প্রতিষ্ঠাতা, গ্রিন এগ্রো" }, rating: 5,
          quote: { en: "Their packaging team understood our brand instantly. The cartons are sturdy, beautiful, and arrived exactly when promised.", bn: "তাদের প্যাকেজিং টিম মুহূর্তেই আমাদের ব্র্যান্ড বুঝে নিয়েছে। কার্টনগুলো মজবুত, সুন্দর আর ঠিক সময়মতো পৌঁছেছে।" } },
        { name: "Tahmina Islam", role: { en: "Manager, Bloom Boutique", bn: "ম্যানেজার, ব্লুম বুটিক" }, rating: 5,
          quote: { en: "From concept to delivery they handled everything with care. Our new stationery and tags look premium and totally on brand.", bn: "ধারণা থেকে ডেলিভারি পর্যন্ত তারা সব যত্নসহকারে সামলেছে। আমাদের নতুন স্টেশনারি ও ট্যাগ দেখতে প্রিমিয়াম ও ব্র্যান্ডের সাথে মানানসই।" } }
    ];

    /* ── FAQ ── */
    window.FAQS = [
        { q: { en: "What file formats do you accept for printing?", bn: "প্রিন্টিংয়ের জন্য কোন ফাইল ফরম্যাট গ্রহণ করেন?" },
          a: { en: "We recommend print-ready PDFs, but we also accept AI, PSD, PNG, and JPG files. For the sharpest results, supply files at 300 DPI with a 3 mm bleed.", bn: "আমরা প্রিন্ট-রেডি PDF সুপারিশ করি, তবে AI, PSD, PNG ও JPG ফাইলও গ্রহণ করি। সেরা ফলাফলের জন্য ৩০০ DPI ও ৩ মিমি ব্লিডসহ ফাইল দিন।" } },
        { q: { en: "How long does a typical order take?", bn: "সাধারণত একটি অর্ডারে কত সময় লাগে?" },
          a: { en: "Most standard orders are ready within 48–72 hours after design approval. Same-day rush service is available for select products.", bn: "ডিজাইন অনুমোদনের পর বেশিরভাগ অর্ডার ৪৮–৭২ ঘণ্টায় প্রস্তুত হয়। নির্দিষ্ট পণ্যের জন্য একই দিনের সেবাও আছে।" } },
        { q: { en: "Do you deliver outside Sunamganj?", bn: "সুনামগঞ্জের বাইরে কি ডেলিভারি দেন?" },
          a: { en: "Yes. We deliver across Bangladesh through trusted courier partners, and confirm time and cost in your quotation.", bn: "হ্যাঁ। বিশ্বস্ত কুরিয়ার পার্টনারের মাধ্যমে আমরা বাংলাদেশজুড়ে ডেলিভারি দিই এবং কোটেশনে সময় ও খরচ নিশ্চিত করি।" } },
        { q: { en: "Can I get a sample or proof before the full run?", bn: "পুরো অর্ডারের আগে কি নমুনা বা প্রুফ পাওয়া যায়?" },
          a: { en: "Absolutely. We provide a digital proof for every order, and physical samples can be arranged for larger projects.", bn: "অবশ্যই। প্রতিটি অর্ডারে আমরা ডিজিটাল প্রুফ দিই এবং বড় প্রকল্পের জন্য ফিজিক্যাল নমুনার ব্যবস্থা করা যায়।" } },
        { q: { en: "What is the minimum order quantity?", bn: "ন্যূনতম অর্ডার পরিমাণ কত?" },
          a: { en: "Minimums vary by product. Business cards start at 100 pieces, while banners and packaging can be ordered as single units.", bn: "পণ্যভেদে ন্যূনতম পরিমাণ ভিন্ন। বিজনেস কার্ড ১০০ পিস থেকে শুরু, আর ব্যানার ও প্যাকেজিং একক ইউনিটেও অর্ডার করা যায়।" } },
        { q: { en: "Do you help with design if I don’t have artwork?", bn: "ডিজাইন না থাকলে কি সাহায্য করেন?" },
          a: { en: "Yes. Our in-house design team can create artwork from scratch or polish your existing files for a modest fee.", bn: "হ্যাঁ। আমাদের ইন-হাউস ডিজাইন টিম শূন্য থেকে ডিজাইন তৈরি বা আপনার ফাইল উন্নত করে দিতে পারে।" } },
        { q: { en: "How do I pay for my order?", bn: "অর্ডারের জন্য কীভাবে পেমেন্ট করব?" },
          a: { en: "We accept bKash, Nagad, bank transfer, and cash on collection. Larger orders typically require a 50% advance.", bn: "আমরা বিকাশ, নগদ, ব্যাংক ট্রান্সফার ও সংগ্রহের সময় নগদ গ্রহণ করি। বড় অর্ডারে সাধারণত ৫০% অগ্রিম লাগে।" } },
        { q: { en: "What if I’m not satisfied with the print quality?", bn: "প্রিন্টের মানে সন্তুষ্ট না হলে কী হবে?" },
          a: { en: "Your satisfaction is guaranteed. If a finished product doesn’t match the approved proof due to our fault, we reprint it free of charge.", bn: "আপনার সন্তুষ্টি নিশ্চিত। আমাদের ত্রুটির কারণে অনুমোদিত প্রুফের সাথে না মিললে আমরা বিনামূল্যে পুনরায় প্রিন্ট করি।" } }
    ];

    /* ── Pricing ── */
    window.PRICING = [
        { name: { en: "Starter", bn: "স্টার্টার" }, price: "৳400", featured: false, cta: "getQuote",
          description: { en: "Perfect for individuals and small one-off print jobs.", bn: "ব্যক্তি ও ছোট এককালীন প্রিন্ট কাজের জন্য আদর্শ।" },
          features: { en: ["Up to 100 business cards", "Standard 300 GSM stock", "Matte or gloss finish", "Digital proof included", "3–4 day turnaround"],
                      bn: ["১০০টি পর্যন্ত বিজনেস কার্ড", "স্ট্যান্ডার্ড ৩০০ GSM স্টক", "ম্যাট বা গ্লস ফিনিশ", "ডিজিটাল প্রুফ অন্তর্ভুক্ত", "৩–৪ দিনে ডেলিভারি"] } },
        { name: { en: "Business", bn: "বিজনেস" }, price: "৳2,500", featured: true, cta: "getQuote",
          description: { en: "Our most popular option for growing brands and teams.", bn: "ক্রমবর্ধমান ব্র্যান্ড ও টিমের জন্য আমাদের সবচেয়ে জনপ্রিয় অপশন।" },
          features: { en: ["Cards, flyers & brochures bundle", "Premium stock & finishes", "Spot UV or lamination", "Priority 48-hour turnaround", "Free local delivery", "Dedicated print advisor"],
                      bn: ["কার্ড, ফ্লায়ার ও ব্রোশিওর বান্ডেল", "প্রিমিয়াম স্টক ও ফিনিশ", "স্পট UV বা ল্যামিনেশন", "অগ্রাধিকার ৪৮-ঘণ্টা ডেলিভারি", "বিনামূল্যে স্থানীয় ডেলিভারি", "ডেডিকেটেড প্রিন্ট পরামর্শক"] } },
        { name: { en: "Enterprise", bn: "এন্টারপ্রাইজ" }, price: "Custom", featured: false, cta: "talkToSales",
          description: { en: "High-volume and recurring print programs for organisations.", bn: "প্রতিষ্ঠানের জন্য বড় ভলিউম ও নিয়মিত প্রিন্ট প্রোগ্রাম।" },
          features: { en: ["Unlimited product range", "Volume & contract pricing", "Custom finishes & packaging", "Same-day rush options", "Account management", "Nationwide delivery"],
                      bn: ["সীমাহীন পণ্য পরিসর", "ভলিউম ও চুক্তিভিত্তিক মূল্য", "কাস্টম ফিনিশ ও প্যাকেজিং", "একই দিনের রাশ অপশন", "অ্যাকাউন্ট ম্যানেজমেন্ট", "দেশব্যাপী ডেলিভারি"] } }
    ];

    window.PRICE_TABLE = [
        { product: { en: "Business Cards", bn: "বিজনেস কার্ড" }, spec: { en: "100 pcs, 300 GSM, matte", bn: "১০০ পিস, ৩০০ GSM, ম্যাট" }, from: "৳400" },
        { product: { en: "Flyers (A5)", bn: "ফ্লায়ার (A5)" }, spec: { en: "Per piece, art paper, full colour", bn: "প্রতি পিস, আর্ট পেপার, ফুল কালার" }, from: "৳6" },
        { product: { en: "Brochures (tri-fold)", bn: "ব্রোশিওর (ট্রাই-ফোল্ড)" }, spec: { en: "Per piece, coated stock", bn: "প্রতি পিস, কোটেড স্টক" }, from: "৳35" },
        { product: { en: "Roll-up Banner", bn: "রোল-আপ ব্যানার" }, spec: { en: "80×200 cm, stand included", bn: "৮০×২০০ সেমি, স্ট্যান্ডসহ" }, from: "৳1,800" },
        { product: { en: "PVC Banner", bn: "PVC ব্যানার" }, spec: { en: "Per sq.ft, weatherproof", bn: "প্রতি বর্গফুট, ওয়েদারপ্রুফ" }, from: "৳40" },
        { product: { en: "Stickers", bn: "স্টিকার" }, spec: { en: "Per piece, die-cut vinyl", bn: "প্রতি পিস, ডাই-কাট ভিনাইল" }, from: "৳3" },
        { product: { en: "Packaging Box", bn: "প্যাকেজিং বক্স" }, spec: { en: "Per box, custom die-cut", bn: "প্রতি বক্স, কাস্টম ডাই-কাট" }, from: "৳45" },
        { product: { en: "Invitation Card", bn: "নিমন্ত্রণ কার্ড" }, spec: { en: "Per card, foil optional", bn: "প্রতি কার্ড, ফয়েল ঐচ্ছিক" }, from: "৳25" }
    ];

    /* ── Shop products ── */
    window.PRODUCT_CATEGORIES = ["all", "cards", "stationery", "marketing", "packaging", "events", "signage"];

    /* Royalty-free mockups (Unsplash / Pexels) — stored locally in /assets/img/products/ */
    window.PRODUCT_IMAGES = {
        "business-cards": "/assets/img/products/business-cards.jpg",
        "id-cards": "/assets/img/products/id-cards.jpg",
        "loyalty-cards": "/assets/img/products/loyalty-cards.jpg",
        "greeting-cards": "/assets/img/products/greeting-cards.jpg",
        "letterheads": "/assets/img/products/letterheads.jpg",
        "envelopes": "/assets/img/products/envelopes.jpg",
        "notepads": "/assets/img/products/notepads.jpg",
        "diaries": "/assets/img/products/diaries.jpg",
        "flyers": "/assets/img/products/flyers.jpg",
        "brochures": "/assets/img/products/brochures.jpg",
        "posters": "/assets/img/products/posters.jpg",
        "catalogues": "/assets/img/products/catalogues.jpg",
        "product-boxes": "/assets/img/products/product-boxes.jpg",
        "gift-boxes": "/assets/img/products/gift-boxes.jpg",
        "stickers": "/assets/img/products/stickers.jpg",
        "invitation-cards": "/assets/img/products/invitation-cards.jpg",
        "certificates": "/assets/img/products/certificates.jpg",
        "event-programs": "/assets/img/products/event-programs.jpg",
        "table-cards": "/assets/img/products/table-cards.jpg",
        "roll-up-banners": "/assets/img/products/roll-up-banners.jpg",
        "pvc-banners": "/assets/img/products/pvc-banners.jpg",
        "standees": "/assets/img/products/standees.jpg"
    };

    window.PRODUCTS = [
        /* ── Cards ── */
        { slug: "business-cards", category: "cards", kind: "card", badge: "popular",
          name: { en: "Business Cards", bn: "বিজনেস কার্ড" },
          tagline: { en: "First impressions, beautifully printed.", bn: "প্রথম ইমপ্রেশন সুন্দরভাবে প্রিন্ট করা।" },
          description: { en: "Premium business cards on heavyweight stock. Available in matte, gloss, or soft-touch lamination with optional spot UV, foiling, and rounded corners.", bn: "ভারী স্টকে প্রিমিয়াম বিজনেস কার্ড। ম্যাট, গ্লস বা সফট-টাচ ল্যামিনেশনসহ। স্পট UV, ফয়েলিং ও রাউন্ড কর্নারও পাওয়া যায়।" },
          features: ["300–600 GSM stock", "Matte / Gloss / Soft-touch", "Spot UV & foil options", "Rounded corners available"],
          variants: [
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 400 },
            { id: "250", label: { en: "250 pcs", bn: "২৫০ পিস" }, price: 850 },
            { id: "500", label: { en: "500 pcs", bn: "৫০০ পিস" }, price: 1400 },
            { id: "1000", label: { en: "1,000 pcs", bn: "১,০০০ পিস" }, price: 2200 }
          ],
          options: [{ id: "finish", label: { en: "Finish", bn: "ফিনিশ" }, choices: [
            { id: "matte", label: { en: "Matte", bn: "ম্যাট" } },
            { id: "gloss", label: { en: "Gloss", bn: "গ্লস" } },
            { id: "soft", label: { en: "Soft Touch", bn: "সফট টাচ" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        { slug: "id-cards", category: "cards", kind: "idcard", badge: null,
          name: { en: "ID Cards", bn: "আইডি কার্ড" },
          tagline: { en: "Identity, professionally produced.", bn: "পরিচয়, পেশাদারভাবে তৈরি।" },
          description: { en: "Durable PVC ID cards for organisations, schools, and events. Includes lanyards and holders on request.", bn: "প্রতিষ্ঠান, স্কুল ও ইভেন্টের জন্য টেকসই PVC আইডি কার্ড। অনুরোধে ল্যানিয়ার্ড ও হোল্ডারসহ।" },
          features: ["PVC / paper options", "Lanyards & holders", "Variable data printing", "Same-day rush available"],
          variants: [
            { id: "10", label: { en: "10 pcs", bn: "১০ পিস" }, price: 350 },
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 700 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 1200 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 2000 }
          ],
          options: [{ id: "material", label: { en: "Material", bn: "উপাদান" }, choices: [
            { id: "pvc", label: { en: "PVC", bn: "PVC" } },
            { id: "paper", label: { en: "Paper / Laminated", bn: "পেপার / ল্যামিনেটেড" } }
          ]}],
          delivery: { en: "2–3 business days", bn: "২–৩ কার্যদিবস" } },

        { slug: "loyalty-cards", category: "cards", kind: "card", badge: null,
          name: { en: "Loyalty Cards", bn: "লয়্যালটি কার্ড" },
          tagline: { en: "Keep customers coming back.", bn: "গ্রাহকদের বারবার ফিরিয়ে আনুন।" },
          description: { en: "Custom loyalty punch cards and reward cards for cafes, salons, and retail businesses. Printed on premium 350 GSM stock.", bn: "ক্যাফে, সেলন ও রিটেইল ব্যবসার জন্য কাস্টম লয়্যালটি পাঞ্চ কার্ড ও রিওয়ার্ড কার্ড।" },
          features: ["350 GSM stock", "Matte or gloss finish", "Custom punch slots", "Bulk pricing available"],
          variants: [
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 500 },
            { id: "250", label: { en: "250 pcs", bn: "২৫০ পিস" }, price: 1000 },
            { id: "500", label: { en: "500 pcs", bn: "৫০০ পিস" }, price: 1700 }
          ],
          options: [{ id: "finish", label: { en: "Finish", bn: "ফিনিশ" }, choices: [
            { id: "matte", label: { en: "Matte", bn: "ম্যাট" } },
            { id: "gloss", label: { en: "Gloss", bn: "গ্লস" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        { slug: "greeting-cards", category: "cards", kind: "invitation", badge: null,
          name: { en: "Greeting Cards", bn: "গ্রিটিং কার্ড" },
          tagline: { en: "Say it beautifully.", bn: "সুন্দরভাবে বলুন।" },
          description: { en: "Personalised greeting cards for birthdays, Eid, weddings, and corporate occasions. Printed on thick premium card stock with envelope included.", bn: "জন্মদিন, ঈদ, বিয়ে ও কর্পোরেট অনুষ্ঠানের জন্য ব্যক্তিগতকৃত গ্রিটিং কার্ড।" },
          features: ["A6 / A5 sizes", "Envelope included", "Matte or gloss", "Custom messages"],
          variants: [
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 600 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 1000 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 1700 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "a6", label: { en: "A6 (small)", bn: "A6 (ছোট)" } },
            { id: "a5", label: { en: "A5 (medium)", bn: "A5 (মাঝারি)" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        /* ── Stationery ── */
        { slug: "letterheads", category: "stationery", kind: "stationery", badge: null,
          name: { en: "Letterheads", bn: "লেটারহেড" },
          tagline: { en: "Stationery that means business.", bn: "ব্যবসার উপযোগী স্টেশনারি।" },
          description: { en: "Professional branded letterheads on quality bond paper, perfectly aligned to your brand identity. Ideal for quotations, letters, and official communication.", bn: "মানসম্পন্ন বন্ড কাগজে পেশাদার ব্র্যান্ডেড লেটারহেড।" },
          features: ["A4 bond paper", "80–100 GSM", "Brand-matched colour", "Watermark options"],
          variants: [
            { id: "100", label: { en: "100 sheets", bn: "১০০ শীট" }, price: 800 },
            { id: "250", label: { en: "250 sheets", bn: "২৫০ শীট" }, price: 1500 },
            { id: "500", label: { en: "500 sheets", bn: "৫০০ শীট" }, price: 2500 }
          ],
          options: [{ id: "paper", label: { en: "Paper weight", bn: "কাগজের ওজন" }, choices: [
            { id: "80gsm", label: { en: "80 GSM", bn: "৮০ GSM" } },
            { id: "100gsm", label: { en: "100 GSM", bn: "১০০ GSM" } }
          ]}],
          delivery: { en: "3–4 business days", bn: "৩–৪ কার্যদিবস" } },

        { slug: "envelopes", category: "stationery", kind: "stationery", badge: null,
          name: { en: "Envelopes", bn: "খাম" },
          tagline: { en: "Deliver in style.", bn: "স্টাইলে পৌঁছে দিন।" },
          description: { en: "Custom-printed envelopes in DL, A5, and A4 formats with full-colour branding inside and out. Self-seal and window options available.", bn: "DL, A5 ও A4 ফরম্যাটে কাস্টম-প্রিন্টেড খাম।" },
          features: ["DL / A5 / A4", "Window & plain", "Self-seal available", "Full-colour print"],
          variants: [
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 1000 },
            { id: "250", label: { en: "250 pcs", bn: "২৫০ পিস" }, price: 2000 },
            { id: "500", label: { en: "500 pcs", bn: "৫০০ পিস" }, price: 3500 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "dl", label: { en: "DL", bn: "DL" } },
            { id: "a5", label: { en: "A5", bn: "A5" } },
            { id: "a4", label: { en: "A4", bn: "A4" } }
          ]}],
          delivery: { en: "4–5 business days", bn: "৪–৫ কার্যদিবস" } },

        { slug: "notepads", category: "stationery", kind: "notebook", badge: null,
          name: { en: "Notepads", bn: "নোটপ্যাড" },
          tagline: { en: "Everyday branded essentials.", bn: "প্রতিদিনের ব্র্যান্ডেড প্রয়োজন।" },
          description: { en: "Custom branded notepads, perfect for corporate gifting and promotional giveaways. 50 or 100 sheets per pad, glued and padded.", bn: "কর্পোরেট গিফটিং ও প্রমোশনাল গিভঅ্যাওয়ের জন্য কাস্টম ব্র্যান্ডেড নোটপ্যাড।" },
          features: ["50 or 100 sheets/pad", "Glued & backed", "A4 / A5 sizes", "Custom cover design"],
          variants: [
            { id: "25", label: { en: "25 pads", bn: "২৫ প্যাড" }, price: 2500 },
            { id: "50", label: { en: "50 pads", bn: "৫০ প্যাড" }, price: 4500 },
            { id: "100", label: { en: "100 pads", bn: "১০০ প্যাড" }, price: 8000 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "a5", label: { en: "A5", bn: "A5" } },
            { id: "a4", label: { en: "A4", bn: "A4" } }
          ]}],
          delivery: { en: "5–7 business days", bn: "৫–৭ কার্যদিবস" } },

        { slug: "diaries", category: "stationery", kind: "notebook", badge: null,
          name: { en: "Custom Diaries", bn: "কাস্টম ডায়েরি" },
          tagline: { en: "Stay organised, stay branded.", bn: "সংগঠিত থাকুন, ব্র্যান্ডেড থাকুন।" },
          description: { en: "Hardcover or softcover diaries with custom branding, ribbon markers, and your choice of ruling. Perfect for corporate year-end gifting.", bn: "হার্ডকভার বা সফটকভার ডায়েরি, কাস্টম ব্র্যান্ডিং ও রিবন মার্কারসহ।" },
          features: ["Hard & soft cover", "Ribbon markers", "Custom ruling", "Branded covers"],
          variants: [
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 3750 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 6500 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 11000 }
          ],
          options: [{ id: "cover", label: { en: "Cover", bn: "কভার" }, choices: [
            { id: "hard", label: { en: "Hardcover", bn: "হার্ডকভার" } },
            { id: "soft", label: { en: "Softcover", bn: "সফটকভার" } }
          ]}],
          delivery: { en: "7–10 business days", bn: "৭–১০ কার্যদিবস" } },

        /* ── Marketing ── */
        { slug: "flyers", category: "marketing", kind: "flyer", badge: "popular",
          name: { en: "Flyers", bn: "ফ্লায়ার" },
          tagline: { en: "Spread the word with impact.", bn: "প্রভাব ফেলে বার্তা ছড়িয়ে দিন।" },
          description: { en: "Vibrant single or double-sided flyers ideal for promotions, events, and announcements. Available in A4, A5, and DL sizes with crisp colour reproduction.", bn: "প্রোমোশন, ইভেন্ট ও ঘোষণার জন্য উজ্জ্বল এক বা দুই পাশের ফ্লায়ার।" },
          features: ["A4 / A5 / DL sizes", "Single or double-sided", "Art paper & matte", "Bulk pricing tiers"],
          variants: [
            { id: "250", label: { en: "250 pcs", bn: "২৫০ পিস" }, price: 1500 },
            { id: "500", label: { en: "500 pcs", bn: "৫০০ পিস" }, price: 2500 },
            { id: "1000", label: { en: "1,000 pcs", bn: "১,০০০ পিস" }, price: 4000 },
            { id: "2500", label: { en: "2,500 pcs", bn: "২,৫০০ পিস" }, price: 8500 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "a5", label: { en: "A5", bn: "A5" } },
            { id: "a4", label: { en: "A4", bn: "A4" } },
            { id: "dl", label: { en: "DL", bn: "DL" } }
          ]}],
          delivery: { en: "2–4 business days", bn: "২–৪ কার্যদিবস" } },

        { slug: "brochures", category: "marketing", kind: "brochure", badge: "popular",
          name: { en: "Brochures", bn: "ব্রোশিওর" },
          tagline: { en: "Tell your story, fold by fold.", bn: "ভাঁজে ভাঁজে আপনার গল্প বলুন।" },
          description: { en: "Bi-fold, tri-fold, and multi-page brochures with precise folding and binding. Perfect for catalogues, company profiles, and event programmes.", bn: "বাই-ফোল্ড, ট্রাই-ফোল্ড ও মাল্টি-পেজ ব্রোশিওর, নিখুঁত ভাঁজ ও বাইন্ডিংসহ।" },
          features: ["Bi-fold & tri-fold", "Saddle stitching", "Premium coated stock", "Custom page counts"],
          variants: [
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 1750 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 3000 },
            { id: "250", label: { en: "250 pcs", bn: "২৫০ পিস" }, price: 6500 }
          ],
          options: [{ id: "fold", label: { en: "Fold type", bn: "ফোল্ড ধরন" }, choices: [
            { id: "bifold", label: { en: "Bi-fold", bn: "বাই-ফোল্ড" } },
            { id: "trifold", label: { en: "Tri-fold", bn: "ট্রাই-ফোল্ড" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        { slug: "posters", category: "marketing", kind: "poster", badge: null,
          name: { en: "Posters", bn: "পোস্টার" },
          tagline: { en: "Bold visuals that demand attention.", bn: "দৃষ্টি আকর্ষণকারী সাহসী ভিজ্যুয়াল।" },
          description: { en: "High-impact posters in A3, A2, and A1 sizes on premium matte or gloss art paper. Ideal for events, promotions, and point-of-sale displays.", bn: "A3, A2 ও A1 সাইজে হাই-ইমপ্যাক্ট পোস্টার, প্রিমিয়াম ম্যাট বা গ্লস আর্ট পেপারে।" },
          features: ["A3 / A2 / A1 sizes", "Matte or gloss", "150 GSM art paper", "Full bleed printing"],
          variants: [
            { id: "10", label: { en: "10 pcs", bn: "১০ পিস" }, price: 900 },
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 1800 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 3000 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "a3", label: { en: "A3", bn: "A3" } },
            { id: "a2", label: { en: "A2", bn: "A2" } },
            { id: "a1", label: { en: "A1", bn: "A1" } }
          ]}],
          delivery: { en: "2–3 business days", bn: "২–৩ কার্যদিবস" } },

        { slug: "catalogues", category: "marketing", kind: "brochure", badge: null,
          name: { en: "Catalogues", bn: "ক্যাটালগ" },
          tagline: { en: "Showcase your full range.", bn: "আপনার পূর্ণ পরিসর প্রদর্শন করুন।" },
          description: { en: "Professionally bound product catalogues with saddle-stitching or perfect binding. Printed on premium coated stock for a luxury look and feel.", bn: "স্যাডেল-স্টিচিং বা পারফেক্ট বাইন্ডিংসহ পেশাদার বাউন্ড প্রোডাক্ট ক্যাটালগ।" },
          features: ["Saddle or perfect binding", "Coated gloss / matte", "Custom page counts", "A5 / A4 sizes"],
          variants: [
            { id: "10", label: { en: "10 copies", bn: "১০ কপি" }, price: 2500 },
            { id: "25", label: { en: "25 copies", bn: "২৫ কপি" }, price: 5500 },
            { id: "50", label: { en: "50 copies", bn: "৫০ কপি" }, price: 9500 }
          ],
          options: [{ id: "binding", label: { en: "Binding", bn: "বাইন্ডিং" }, choices: [
            { id: "saddle", label: { en: "Saddle stitch", bn: "স্যাডেল স্টিচ" } },
            { id: "perfect", label: { en: "Perfect bind", bn: "পারফেক্ট বাইন্ড" } }
          ]}],
          delivery: { en: "5–7 business days", bn: "৫–৭ কার্যদিবস" } },

        /* ── Packaging ── */
        { slug: "product-boxes", category: "packaging", kind: "packaging", badge: null,
          name: { en: "Product Boxes", bn: "প্রোডাক্ট বক্স" },
          tagline: { en: "Unboxing worth remembering.", bn: "মনে রাখার মতো আনবক্সিং।" },
          description: { en: "Custom product packaging and mono cartons with die-cutting, lamination, and structural design support. Tell us your product dimensions for a custom quote.", bn: "ডাই-কাটিং, ল্যামিনেশন ও স্ট্রাকচারাল ডিজাইনসহ কাস্টম প্রোডাক্ট প্যাকেজিং।" },
          features: ["Custom die-cut", "Mono cartons", "Lamination & foiling", "Structural design help"],
          variants: [
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 1125 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 2000 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 3500 }
          ],
          options: [{ id: "finish", label: { en: "Finish", bn: "ফিনিশ" }, choices: [
            { id: "matte", label: { en: "Matte lamination", bn: "ম্যাট ল্যামিনেশন" } },
            { id: "gloss", label: { en: "Gloss lamination", bn: "গ্লস ল্যামিনেশন" } },
            { id: "uv", label: { en: "Spot UV", bn: "স্পট UV" } }
          ]}],
          delivery: { en: "7–10 business days", bn: "৭–১০ কার্যদিবস" } },

        { slug: "gift-boxes", category: "packaging", kind: "packaging", badge: null,
          name: { en: "Gift Boxes", bn: "গিফট বক্স" },
          tagline: { en: "Give gifts that leave an impression.", bn: "এমন উপহার দিন যা মনে থাকে।" },
          description: { en: "Luxury rigid gift boxes with custom branding, ribbon, and tissue paper. Perfect for corporate gifting, hampers, and premium retail products.", bn: "কাস্টম ব্র্যান্ডিং, রিবন ও টিস্যু পেপারসহ লাক্সারি রিজিড গিফট বক্স।" },
          features: ["Rigid board construction", "Custom print", "Ribbon & tissue included", "Luxury feel"],
          variants: [
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 3750 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 6500 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 11000 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "small", label: { en: "Small (up to 20×15×8 cm)", bn: "ছোট (২০×১৫×৮ সেমি পর্যন্ত)" } },
            { id: "medium", label: { en: "Medium (up to 30×25×12 cm)", bn: "মাঝারি (৩০×২৫×১২ সেমি পর্যন্ত)" } }
          ]}],
          delivery: { en: "7–10 business days", bn: "৭–১০ কার্যদিবস" } },

        { slug: "stickers", category: "packaging", kind: "sticker", badge: "popular",
          name: { en: "Stickers & Labels", bn: "স্টিকার ও লেবেল" },
          tagline: { en: "Stick your brand everywhere.", bn: "আপনার ব্র্যান্ড সর্বত্র লাগান।" },
          description: { en: "Die-cut stickers and product labels in gloss, matte, or transparent vinyl. Waterproof and fade-resistant, perfect for products and promotions.", bn: "গ্লস, ম্যাট বা স্বচ্ছ ভিনাইলে ডাই-কাট স্টিকার ও লেবেল। ওয়াটারপ্রুফ ও ফেইড-প্রতিরোধী।" },
          features: ["Custom die-cut shape", "Vinyl & paper", "Waterproof options", "Roll or sheet format"],
          variants: [
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 300 },
            { id: "250", label: { en: "250 pcs", bn: "২৫০ পিস" }, price: 625 },
            { id: "500", label: { en: "500 pcs", bn: "৫০০ পিস" }, price: 1050 },
            { id: "1000", label: { en: "1,000 pcs", bn: "১,০০০ পিস" }, price: 1800 }
          ],
          options: [{ id: "material", label: { en: "Material", bn: "উপাদান" }, choices: [
            { id: "vinyl-gloss", label: { en: "Vinyl Gloss", bn: "ভিনাইল গ্লস" } },
            { id: "vinyl-matte", label: { en: "Vinyl Matte", bn: "ভিনাইল ম্যাট" } },
            { id: "clear", label: { en: "Clear / Transparent", bn: "ক্লিয়ার / স্বচ্ছ" } },
            { id: "paper", label: { en: "Paper", bn: "পেপার" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        /* ── Events ── */
        { slug: "invitation-cards", category: "events", kind: "invitation", badge: null,
          name: { en: "Invitation Cards", bn: "নিমন্ত্রণ কার্ড" },
          tagline: { en: "Occasions deserve elegance.", bn: "অনুষ্ঠান চায় আভিজাত্য।" },
          description: { en: "Wedding and event invitations with foil stamping, embossing, and luxury paper. Available with matching envelopes and RSVP inserts.", bn: "ফয়েল স্ট্যাম্পিং, এম্বসিং ও বিলাসবহুল কাগজে বিয়ে ও ইভেন্টের নিমন্ত্রণপত্র।" },
          features: ["Foil & emboss options", "Luxury paper", "Custom envelopes", "RSVP inserts"],
          variants: [
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 625 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 1100 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 1900 },
            { id: "200", label: { en: "200 pcs", bn: "২০০ পিস" }, price: 3200 }
          ],
          options: [{ id: "finish", label: { en: "Finish", bn: "ফিনিশ" }, choices: [
            { id: "standard", label: { en: "Standard Matte", bn: "স্ট্যান্ডার্ড ম্যাট" } },
            { id: "foil", label: { en: "Gold / Silver Foil", bn: "গোল্ড / সিলভার ফয়েল" } },
            { id: "emboss", label: { en: "Embossed", bn: "এম্বসড" } }
          ]}],
          delivery: { en: "4–6 business days", bn: "৪–৬ কার্যদিবস" } },

        { slug: "certificates", category: "events", kind: "certificate", badge: null,
          name: { en: "Certificates", bn: "সার্টিফিকেট" },
          tagline: { en: "Recognition, beautifully framed.", bn: "স্বীকৃতি, সুন্দরভাবে উপস্থাপিত।" },
          description: { en: "Award and achievement certificates on premium textured stock. Available with optional gold foil seals, border designs, and A4 or A3 sizes.", bn: "প্রিমিয়াম টেক্সচারড স্টকে অ্যাওয়ার্ড ও অর্জন সার্টিফিকেট।" },
          features: ["Textured premium stock", "Gold foil seals", "A4 & A3 sizes", "Frame-ready"],
          variants: [
            { id: "10", label: { en: "10 pcs", bn: "১০ পিস" }, price: 400 },
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 875 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 1500 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 2600 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "a4", label: { en: "A4", bn: "A4" } },
            { id: "a3", label: { en: "A3", bn: "A3" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        { slug: "event-programs", category: "events", kind: "brochure", badge: null,
          name: { en: "Event Programs", bn: "ইভেন্ট প্রোগ্রাম" },
          tagline: { en: "Guide your guests through the day.", bn: "অতিথিদের সারাদিন পথ দেখান।" },
          description: { en: "Professionally printed event programs, order-of-service booklets, and wedding programs. Saddle-stitched with premium cover stock.", bn: "পেশাদারভাবে প্রিন্টেড ইভেন্ট প্রোগ্রাম, অর্ডার-অব-সার্ভিস বুকলেট ও বিয়ের প্রোগ্রাম।" },
          features: ["Saddle stitch binding", "Premium cover stock", "A5 / A4 sizes", "Full colour"],
          variants: [
            { id: "50", label: { en: "50 copies", bn: "৫০ কপি" }, price: 1750 },
            { id: "100", label: { en: "100 copies", bn: "১০০ কপি" }, price: 3000 },
            { id: "250", label: { en: "250 copies", bn: "২৫০ কপি" }, price: 6500 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "a5", label: { en: "A5", bn: "A5" } },
            { id: "a4", label: { en: "A4", bn: "A4" } }
          ]}],
          delivery: { en: "4–6 business days", bn: "৪–৬ কার্যদিবস" } },

        { slug: "table-cards", category: "events", kind: "card", badge: null,
          name: { en: "Table Cards / Menu Cards", bn: "টেবিল কার্ড / মেনু কার্ড" },
          tagline: { en: "Make every table count.", bn: "প্রতিটি টেবিল সুন্দর করুন।" },
          description: { en: "Tent cards, table numbers, and restaurant menu cards on laminated or rigid stock. Built to withstand busy service while looking beautiful.", bn: "ল্যামিনেটেড বা রিজিড স্টকে টেন্ট কার্ড, টেবিল নম্বর ও রেস্তোরাঁর মেনু কার্ড।" },
          features: ["Laminated finish", "Rigid & folding", "Spill-resistant", "Custom sizes"],
          variants: [
            { id: "25", label: { en: "25 pcs", bn: "২৫ পিস" }, price: 750 },
            { id: "50", label: { en: "50 pcs", bn: "৫০ পিস" }, price: 1300 },
            { id: "100", label: { en: "100 pcs", bn: "১০০ পিস" }, price: 2200 }
          ],
          options: [{ id: "type", label: { en: "Type", bn: "ধরন" }, choices: [
            { id: "tent", label: { en: "Tent / Folded", bn: "টেন্ট / ফোল্ডেড" } },
            { id: "flat", label: { en: "Flat / Single-sided", bn: "ফ্ল্যাট / এক পাশ" } }
          ]}],
          delivery: { en: "3–4 business days", bn: "৩–৪ কার্যদিবস" } },

        /* ── Signage ── */
        { slug: "roll-up-banners", category: "signage", kind: "banner", badge: null,
          name: { en: "Roll-up Banners", bn: "রোল-আপ ব্যানার" },
          tagline: { en: "Portable, premium, presentation-ready.", bn: "বহনযোগ্য, প্রিমিয়াম, উপস্থাপনার জন্য প্রস্তুত।" },
          description: { en: "Retractable roll-up stands with high-resolution prints on premium PET film. Aluminium stand and carry bag included. Ideal for exhibitions and storefronts.", bn: "উচ্চ-রেজোলিউশন প্রিন্টসহ রিট্র্যাক্টেবল রোল-আপ স্ট্যান্ড। অ্যালুমিনিয়াম স্ট্যান্ড ও ক্যারি ব্যাগসহ।" },
          features: ["80×200 cm standard", "Premium PET film", "Aluminium stand included", "Carry bag"],
          variants: [
            { id: "1", label: { en: "1 pc", bn: "১ পিস" }, price: 1800 },
            { id: "2", label: { en: "2 pcs", bn: "২ পিস" }, price: 3200 },
            { id: "5", label: { en: "5 pcs", bn: "৫ পিস" }, price: 7500 }
          ],
          options: [{ id: "size", label: { en: "Size", bn: "সাইজ" }, choices: [
            { id: "80x200", label: { en: "80×200 cm (standard)", bn: "৮০×২০০ সেমি (স্ট্যান্ডার্ড)" } },
            { id: "100x200", label: { en: "100×200 cm (wide)", bn: "১০০×২০০ সেমি (ওয়াইড)" } }
          ]}],
          delivery: { en: "5–7 business days", bn: "৫–৭ কার্যদিবস" } },

        { slug: "pvc-banners", category: "signage", kind: "banner", badge: null,
          name: { en: "PVC Banners", bn: "PVC ব্যানার" },
          tagline: { en: "Built for the outdoors.", bn: "বাইরের পরিবেশের জন্য তৈরি।" },
          description: { en: "Weather-resistant large-format PVC banners with eyelets and reinforced hemming. Priced per square foot — tell us your required size in the order notes.", bn: "আইলেট ও শক্তিশালী হেমিংসহ আবহাওয়া-প্রতিরোধী বড় আকারের PVC ব্যানার।" },
          features: ["Weatherproof PVC", "Eyelets & hemming", "Any custom size", "Vivid solvent print"],
          variants: [
            { id: "10sqft", label: { en: "Up to 10 sq.ft", bn: "১০ বর্গফুট পর্যন্ত" }, price: 400 },
            { id: "20sqft", label: { en: "Up to 20 sq.ft", bn: "২০ বর্গফুট পর্যন্ত" }, price: 750 },
            { id: "50sqft", label: { en: "Up to 50 sq.ft", bn: "৫০ বর্গফুট পর্যন্ত" }, price: 1700 }
          ],
          options: [{ id: "finish", label: { en: "Material", bn: "উপাদান" }, choices: [
            { id: "standard", label: { en: "Standard PVC (280 GSM)", bn: "স্ট্যান্ডার্ড PVC" } },
            { id: "premium", label: { en: "Premium PVC (440 GSM)", bn: "প্রিমিয়াম PVC" } }
          ]}],
          delivery: { en: "3–5 business days", bn: "৩–৫ কার্যদিবস" } },

        { slug: "standees", category: "signage", kind: "banner", badge: null,
          name: { en: "Standees / Cut-outs", bn: "স্ট্যান্ডি / কাট-আউট" },
          tagline: { en: "Life-size presence, anywhere.", bn: "যেকোনো জায়গায় জীবন্ত উপস্থিতি।" },
          description: { en: "Full-colour life-size standees and shaped cut-outs printed on rigid foam board or correx. Perfect for photo booths, events, and retail displays.", bn: "ফোম বোর্ড বা করেক্সে ফুল-কালার লাইফ-সাইজ স্ট্যান্ডি ও শেপড কাট-আউট।" },
          features: ["Rigid foam board", "Full colour", "Custom shapes", "Self-standing base"],
          variants: [
            { id: "1", label: { en: "1 pc", bn: "১ পিস" }, price: 2200 },
            { id: "2", label: { en: "2 pcs", bn: "২ পিস" }, price: 4000 },
            { id: "5", label: { en: "5 pcs", bn: "৫ পিস" }, price: 9000 }
          ],
          options: [{ id: "board", label: { en: "Board type", bn: "বোর্ড ধরন" }, choices: [
            { id: "foam", label: { en: "Foam board", bn: "ফোম বোর্ড" } },
            { id: "correx", label: { en: "Correx / Fluted board", bn: "করেক্স / ফ্লুটেড বোর্ড" } }
          ]}],
          delivery: { en: "4–6 business days", bn: "৪–৬ কার্যদিবস" } }
    ];

    /* ── Footer link columns ── */
    window.FOOTER_GROUPS = [
        { titleKey: "company", links: [
            { label: { en: "About", bn: "আমাদের সম্পর্কে" }, href: "/about.html" },
            { label: { en: "Portfolio", bn: "পোর্টফোলিও" }, href: "/portfolio.html" },
            { label: { en: "Pricing", bn: "মূল্য" }, href: "/pricing.html" },
            { label: { en: "FAQ", bn: "জিজ্ঞাসা" }, href: "/faq.html" }
        ]},
        { titleKey: "services", links: [
            { label: { en: "Business Cards", bn: "বিজনেস কার্ড" }, href: "/services.html#business-cards" },
            { label: { en: "Brochures", bn: "ব্রোশিওর" }, href: "/services.html#brochures" },
            { label: { en: "Banners", bn: "ব্যানার" }, href: "/services.html#roll-up-banners" },
            { label: { en: "Packaging", bn: "প্যাকেজিং" }, href: "/services.html#packaging" }
        ]},
        { titleKey: "resources", links: [
            { label: { en: "Get a Quote", bn: "কোটেশন নিন" }, href: "/quote.html" },
            { label: { en: "Contact", bn: "যোগাযোগ" }, href: "/contact.html" },
            { label: { en: "Privacy Policy", bn: "প্রাইভেসি পলিসি" }, href: "/privacy.html" },
            { label: { en: "Terms", bn: "শর্তাবলী" }, href: "/terms.html" }
        ]}
    ];
})();
