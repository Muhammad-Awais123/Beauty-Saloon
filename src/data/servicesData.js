export const INITIAL_SERVICES = [
  {
    id: 'hydrafacial-elite',
    name: 'HydraFacial Elite Rejuvenation',
    category: 'Facial Treatments',
    shortDesc: 'A patented 3-step medical-grade facial that cleanses, extracts, and hydrates with super serums.',
    fullDesc: 'The HydraFacial Elite Rejuvenation is our signature medical-grade hydradermabrasion treatment. Using patented Vortex-Fusion technology, it deeply cleanses congested pores, painlessly extracts impurities, and saturates the skin with intensive peptides, hyaluronic acid, and botanical antioxidants. Your skin is left instantly radiant, plump, and deeply hydrated with zero downtime.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 195,
    rating: 4.9,
    reviewsCount: 128,
    isPopular: true,
    isFeatured: true,
    image: '/images/services/service-hydrafacial.jpg',
    specialistIds: ['dr-elena-vance', 'sarah-jenkins'],
    benefits: [
      'Immediate glow and smooth skin texture',
      'Painless blackhead and sebum extraction',
      'Deep cellular hydration with antioxidant infusion',
      'Minimizes enlarged pores and fine lines',
      'No redness, irritation, or downtime'
    ],
    suitableFor: [
      'All skin types including sensitive & acne-prone skin',
      'Dull, dehydrated skin lacking radiance',
      'Congested pores and uneven texture',
      'Pre-event instant skin enhancement'
    ],
    recoveryInfo: 'Zero downtime. You can return to daily activities immediately and apply mineral makeup right away.',
    expectedResults: 'Instant visible clarity and plumpness after one session. Optimal long-term results with monthly maintenance.',
    procedureSteps: [
      { step: 1, title: 'Cleanse & Peel', desc: 'Gentle exfoliation and relaxing resurfacing to uncover a fresh layer of skin.' },
      { step: 2, title: 'Extract & Hydrate', desc: 'Painless vortex suction removes debris from pores while nourishing with intense moisturizers.' },
      { step: 3, title: 'Fuse & Protect', desc: 'Saturates the skin’s surface with tailored antioxidants and peptides to maximize your glow.' }
    ],
    faqs: [
      { q: 'How often should I get a HydraFacial?', a: 'We recommend one treatment every 4 weeks for lasting skin health and radiance.' },
      { q: 'Is it painful?', a: 'Not at all. Most patients describe it as a gentle, soothing massage with a cool paintbrush sensation.' }
    ]
  },
  {
    id: 'pico-laser-toning',
    name: 'Pico Laser Brightening & Toning',
    category: 'Laser Treatments',
    shortDesc: 'Ultra-fast picosecond laser targeting hyperpigmentation, melasma, sun spots, and acne marks.',
    fullDesc: 'Our advanced Pico Laser delivers ultra-short picosecond pulses of energy that shatter stubborn pigmentation into microscopic particles without heating surrounding tissue. It stimulates collagen synthesis to refine pores, even out tone, and restore skin luminosity.',
    duration: '45 mins',
    durationMinutes: 45,
    price: 320,
    rating: 4.95,
    reviewsCount: 94,
    isPopular: true,
    isFeatured: true,
    image: '/images/services/service-laser.jpg',
    specialistIds: ['dr-elena-vance', 'dr-marcus-chen'],
    benefits: [
      'Fades dark spots, sun damage, and melasma',
      'Refines pores and smooths acne scarring',
      'Stimulates deep dermal collagen production',
      'Significantly faster clearance than traditional lasers'
    ],
    suitableFor: [
      'Hyperpigmentation, freckles, and melasma',
      'Post-inflammatory erythema / acne marks',
      'Uneven skin tone and enlarged pores'
    ],
    recoveryInfo: 'Mild pinkish flush for 2 to 4 hours. Daily sunscreen is mandatory following treatment.',
    expectedResults: 'Noticeable brightening within 7-10 days, with progressive improvement over 3 to 5 sessions.',
    procedureSteps: [
      { step: 1, title: 'Clinical Cleansing', desc: 'Double deep-cleanse and skin analysis with protective eyewear placement.' },
      { step: 2, title: 'Picosecond Energy Delivery', desc: 'Precision laser passes over targeted areas to fragment unwanted pigment.' },
      { step: 3, title: 'Calming Cryo-Mask', desc: 'Application of medical soothing peptide gel and cryo-cooling to calm the skin.' }
    ],
    faqs: [
      { q: 'Does Pico laser cause peeling?', a: 'Unlike ablative lasers, Pico laser works under the surface with minimal to no visible peeling.' }
    ]
  },
  {
    id: 'botox-anti-wrinkle',
    name: 'Precision Botulinum Toxin Smoothing',
    category: 'Anti-Aging',
    shortDesc: 'Subtle, natural neuromodulator injections by board-certified dermatologists for forehead and crow’s feet.',
    fullDesc: 'Élan specializes in the "natural look" micro-dosing technique. Using FDA-approved neuromodulators, our doctors gently relax hyperactive facial muscles causing frown lines, forehead creases, and crow’s feet while fully preserving your genuine facial expressions.',
    duration: '30 mins',
    durationMinutes: 30,
    price: 280,
    rating: 4.88,
    reviewsCount: 165,
    isPopular: true,
    isFeatured: true,
    image: '/images/services/service-anti-aging.jpg',
    specialistIds: ['dr-marcus-chen', 'dr-sophia-martinez'],
    benefits: [
      'Smooths dynamic lines on forehead, glabella, and eyes',
      'Prevents deepening of static wrinkles',
      'Natural, refreshed look without a "frozen" appearance',
      'Quick in-office procedure with tiny micro-needles'
    ],
    suitableFor: [
      'Expression lines and forehead furrows',
      'Crow’s feet around the eye area',
      'Preventative anti-aging for adults 25+'
    ],
    recoveryInfo: 'No strenuous workout or lying down for 4 hours. No downtime.',
    expectedResults: 'Initial smoothing in 3-5 days, peak results in 14 days lasting 3-5 months.',
    procedureSteps: [
      { step: 1, title: 'Facial Dynamic Assessment', desc: 'Detailed muscle contraction mapping during facial expressions.' },
      { step: 2, title: 'Micro-Injections', desc: 'Accurate, gentle micro-injections using ultra-fine medical needles.' },
      { step: 3, title: 'Post-Care Instructions', desc: 'Application of soothing arnica if needed and 2-week checkup scheduling.' }
    ],
    faqs: [
      { q: 'Will my face look frozen?', a: 'Never at Élan. Our philosophy is natural refinement that leaves you looking well-rested and vibrant.' }
    ]
  },
  {
    id: 'profhilo-bio-remodeling',
    name: 'Profhilo® Hyaluronic Bio-Remodeling',
    category: 'Skin Treatments',
    shortDesc: 'Revolutionary ultra-pure hyaluronic acid treatment that remodels skin laxity and boosts firmness.',
    fullDesc: 'Profhilo is an award-winning injectable bio-remodeling treatment containing one of the highest concentrations of pure hyaluronic acid on the market. Rather than filling, it disperses beneath the skin to stimulate 4 types of collagen and elastin, firming and tightening sagging tissue.',
    duration: '45 mins',
    durationMinutes: 45,
    price: 450,
    rating: 4.96,
    reviewsCount: 78,
    isPopular: false,
    isFeatured: true,
    image: '/images/services/service-profhilo.jpg',
    specialistIds: ['dr-elena-vance', 'dr-sophia-martinez'],
    benefits: [
      'Intense bio-remodeling of sagging skin tissue',
      'Stimulates 4 essential types of collagen & elastin',
      'Deep cellular hydration with glossy glass-skin finish',
      'Only 5 injection points per side of the face'
    ],
    suitableFor: [
      'Mild to moderate skin laxity on face, neck, and hands',
      'Thinning, crepey skin requiring deep hydration and bounce'
    ],
    recoveryInfo: 'Small localized bumps at injection points settle within 12 to 24 hours.',
    expectedResults: 'Skin firmness, elasticity, and luminosity peak after the second session (4 weeks apart).',
    procedureSteps: [
      { step: 1, title: 'BAP Mapping', desc: 'Marking the 5 Bio-Aesthetic Points per side away from major vessels.' },
      { step: 2, title: 'Deep Dermis Delivery', desc: 'Precise bolus placement of ultra-pure high & low molecular weight HA.' },
      { step: 3, title: 'Hydrating Shield', desc: 'Application of sterile barrier cream.' }
    ],
    faqs: [
      { q: 'How many sessions are required?', a: 'An initial protocol of 2 sessions spaced 4 weeks apart is standard, followed by a maintenance session every 6 months.' }
    ]
  },
  {
    id: 'co2-fractional-laser',
    name: 'CO2 Fractional Laser Resurfacing',
    category: 'Laser Treatments',
    shortDesc: 'Gold standard ablative fractional laser for severe acne scars, deep lines, and structural renewal.',
    fullDesc: 'Our Fractional CO2 Laser creates thousands of microscopic thermal treatment zones deep into the dermis while leaving intervening skin intact. This triggers rapid tissue regeneration, replaces damaged scar tissue, and dramatically tightens aging skin.',
    duration: '75 mins',
    durationMinutes: 75,
    price: 490,
    rating: 4.82,
    reviewsCount: 52,
    isPopular: false,
    isFeatured: false,
    image: '/images/services/service-co2.jpg',
    specialistIds: ['dr-marcus-chen'],
    benefits: [
      'Dramatic improvement in ice-pick, boxcar, and rolling acne scars',
      'Tightens loose skin and softens deep peri-oral lines',
      'Resurfaces coarse, sun-damaged skin texture'
    ],
    suitableFor: [
      'Severe acne scarring and enlarged pores',
      'Deep wrinkles and sun damaged skin'
    ],
    recoveryInfo: 'Moderate downtime of 4-6 days with redness and micro-crusting. Aftercare kit included.',
    expectedResults: 'Transformative textural smoothing and skin contraction starting at week 3, improving over 6 months.',
    procedureSteps: [
      { step: 1, title: 'Topical Anesthetic', desc: 'High-strength numbing cream applied for 40 minutes for maximum comfort.' },
      { step: 2, title: 'Fractional Micro-Beams', desc: 'Computerized scanner delivers customized depth patterns across the skin.' },
      { step: 3, title: 'Regenerative Recovery Pack', desc: 'Sterile soothing sheet and wound-healing growth factor serum.' }
    ],
    faqs: [
      { q: 'Is numbing provided?', a: 'Yes, a medical grade topical anesthetic is applied for 40 minutes before treatment.' }
    ]
  },
  {
    id: 'exosome-regenerative-therapy',
    name: 'Clinical Exosome Skin & Scalp Therapy',
    category: 'Hair Treatments',
    shortDesc: 'Next-generation biotechnology using stem-cell derived exosomes for hair restoration and cellular repair.',
    fullDesc: 'Exosomes are cellular messengers rich in growth factors, peptides, and co-enzymes. When delivered to the scalp or dermis via micro-channeling, they activate dormant hair follicles, accelerate cellular turnover, and reverse thinning hair.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 390,
    rating: 4.91,
    reviewsCount: 63,
    isPopular: true,
    isFeatured: false,
    image: '/images/services/service-hair.jpg',
    specialistIds: ['dr-elena-vance', 'sarah-jenkins'],
    benefits: [
      'Awakens dormant hair follicles for increased density',
      'Rejuvenates cellular health of the scalp microenvironment',
      'Promotes thicker, stronger, and more resilient hair strands',
      'Non-surgical with faster response than traditional PRP'
    ],
    suitableFor: [
      'Early to moderate androgenetic alopecia in men & women',
      'Telogen effluvium (post-stress or post-partum shedding)',
      'Dry, weak, or brittle hair needing vitality'
    ],
    recoveryInfo: 'Mild scalp redness for 12 hours. Avoid washing hair until the following morning.',
    expectedResults: 'Reduced shedding within 4 weeks; new follicle growth visible around 8-12 weeks.',
    procedureSteps: [
      { step: 1, title: 'Scalp Detox & Sanitization', desc: 'Cleansing the scalp and preparing follicles.' },
      { step: 2, title: 'Micro-Infusion Delivery', desc: 'Precision micro-channeling to deliver purified lyophilized exosome solution.' },
      { step: 3, title: 'Low-Level Laser Therapy (LLLT)', desc: '15-minute red light scalp stimulation to enhance absorption.' }
    ],
    faqs: [
      { q: 'How many sessions are recommended?', a: 'A course of 3 to 4 sessions spaced 3 weeks apart delivers optimal hair restoration.' }
    ]
  },
  {
    id: 'body-contouring-emsculpt',
    name: 'HIFEM Non-Invasive Body Sculpting',
    category: 'Body Treatments',
    shortDesc: 'High-Intensity Focused Electromagnetic technology to build muscle and burn subcutaneous fat simultaneously.',
    fullDesc: 'Our non-invasive body contouring system induces supramaximal muscle contractions that cannot be achieved through voluntary exercise. A single 30-minute session is equivalent to approximately 20,000 crunches or squats, toning muscle tissue and accelerating localized lipolysis.',
    duration: '45 mins',
    durationMinutes: 45,
    price: 350,
    rating: 4.87,
    reviewsCount: 84,
    isPopular: false,
    isFeatured: false,
    image: '/images/services/service-body.jpg',
    specialistIds: ['dr-marcus-chen', 'sarah-jenkins'],
    benefits: [
      'Simultaneous muscle hypertrophy and targeted fat reduction',
      'Equivalent to 20,000 intense muscle contractions per session',
      'Non-invasive, no needles, no recovery downtime',
      'Strengthens core stability and lifts gluteal muscles'
    ],
    suitableFor: [
      'Abdomen toning and diastasis recti improvement',
      'Gluteal lifting and firming',
      'Thigh, arm, and calf muscle definition'
    ],
    recoveryInfo: 'Mild muscle soreness similar to an intense workout for 24-48 hours.',
    expectedResults: 'Enhanced muscle definition and fat reduction after 4 sessions over 2 weeks.',
    procedureSteps: [
      { step: 1, title: 'Body Composition Analysis', desc: 'Measurement of target area muscle density and fat percentage.' },
      { step: 2, title: 'Applicator Placement', desc: 'Ergonomic electromagnetic pads secured over target muscle groups.' },
      { step: 3, title: 'Phased Contraction Program', desc: 'Automated 30-minute cycle alternating warm-up, supramaximal pulses, and lactic acid clearing.' }
    ],
    faqs: [
      { q: 'Does it hurt?', a: 'You will feel intense muscle contractions, but it is completely non-painful with no anesthesia needed.' }
    ]
  },
  {
    id: 'iv-vitamin-radiance',
    name: 'Glutathione & Vitamin C Radiance Drip',
    category: 'Wellness',
    shortDesc: 'Intravenous micronutrient therapy for master antioxidant detoxification, immune defense, and systemic skin glow.',
    fullDesc: 'Formulated with high-dose USP-grade Glutathione, Vitamin C, B-Complex, and Zinc, our Radiance IV infusion bypasses the digestive tract for 100% cellular bioavailability. It neutralizes systemic oxidative stress, purges toxins from the liver, and imparts an overall luminous skin glow.',
    duration: '50 mins',
    durationMinutes: 50,
    price: 180,
    rating: 4.93,
    reviewsCount: 110,
    isPopular: false,
    isFeatured: false,
    image: '/images/services/service-wellness.jpg',
    specialistIds: ['dr-sophia-martinez', 'sarah-jenkins'],
    benefits: [
      'Master antioxidant Glutathione purges free radicals and heavy metals',
      'Instant cellular hydration and sustained energy lift',
      'Supports collagen synthesis and luminous skin tone from within',
      'Strengthens immune resilience and mental clarity'
    ],
    suitableFor: [
      'Fatigued, stressed, or sleep-deprived individuals',
      'Dull skin tone needing systemic brightening',
      'Frequent travelers and immunity boosting'
    ],
    recoveryInfo: 'Immediate return to activities. Feeling of refreshed hydration and vitality within hours.',
    expectedResults: 'Energy boost within hours; skin clarity and glow apparent within 24-48 hours.',
    procedureSteps: [
      { step: 1, title: 'Health & Vital Check', desc: 'Blood pressure and medical screening by our clinical nurse.' },
      { step: 2, title: 'Sterile IV Cannulation', desc: 'Comfortable micro-cannula insertion in a quiet, private relaxation lounge.' },
      { step: 3, title: 'Slow Nutrient Infusion', desc: 'Relaxing 45-minute drip with herbal tea and optional soothing eye mask.' }
    ],
    faqs: [
      { q: 'How often can I have an IV drip?', a: 'Bi-weekly or monthly sessions maintain peak antioxidant levels and optimal vitality.' }
    ]
  }
];

export const SERVICE_CATEGORIES = [
  'All Treatments',
  'Skin Treatments',
  'Facial Treatments',
  'Laser Treatments',
  'Hair Treatments',
  'Body Treatments',
  'Anti-Aging',
  'Wellness'
];
