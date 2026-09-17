import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const dirs = [
  'images/logo',
  'images/hero',
  'images/services',
  'images/team',
  'images/blog',
  'images/packages',
  'images/before-after',
  'images/gallery'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(publicDir, d), { recursive: true });
});

// Helper to create clean SVG with solid colors (NO GRADIENTS)
function createSvgPlaceholder({
  title,
  subtitle,
  category,
  bgColor = '#2A4636',
  textColor = '#FFFFFF',
  accentColor = '#AFC5B3',
  width = 800,
  height = 600,
  iconType = 'sparkle',
  badgeText = ''
}) {
  const iconMarkup = {
    sparkle: `<path d="M400 160 L415 225 L480 240 L415 255 L400 320 L385 255 L320 240 L385 225 Z" fill="${accentColor}" opacity="0.85"/>
              <circle cx="340" cy="180" r="8" fill="${accentColor}" opacity="0.6"/>
              <circle cx="460" cy="300" r="6" fill="${accentColor}" opacity="0.6"/>`,
    laser: `<circle cx="400" cy="240" r="70" stroke="${accentColor}" stroke-width="4" fill="none" opacity="0.8"/>
            <circle cx="400" cy="240" r="40" stroke="${accentColor}" stroke-width="2" stroke-dasharray="6 6" fill="none" opacity="0.7"/>
            <path d="M400 150 L400 330 M310 240 L490 240" stroke="${accentColor}" stroke-width="2" opacity="0.5"/>`,
    doctor: `<circle cx="400" cy="210" r="50" fill="${accentColor}" opacity="0.3"/>
             <circle cx="400" cy="190" r="30" fill="${accentColor}" opacity="0.9"/>
             <path d="M330 290 Q400 240 470 290 L470 330 L330 330 Z" fill="${accentColor}" opacity="0.7"/>`,
    facial: `<ellipse cx="400" cy="240" rx="60" ry="75" fill="none" stroke="${accentColor}" stroke-width="4" opacity="0.8"/>
             <path d="M370 230 Q400 260 430 230" stroke="${accentColor}" stroke-width="3" fill="none"/>
             <circle cx="375" cy="210" r="4" fill="${accentColor}"/>
             <circle cx="425" cy="210" r="4" fill="${accentColor}"/>`,
    clinic: `<rect x="340" y="180" width="120" height="130" rx="6" fill="none" stroke="${accentColor}" stroke-width="3" opacity="0.7"/>
             <path d="M400 140 L320 190 L480 190 Z" fill="${accentColor}" opacity="0.5"/>
             <rect x="385" y="240" width="30" height="70" fill="${accentColor}" opacity="0.7"/>`
  }[iconType] || '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <!-- Solid Background -->
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    
    <!-- Subtle Elegant Grid / Geometric Geometry (Solid Colors Only) -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="8" fill="none" stroke="${accentColor}" stroke-width="1" stroke-opacity="0.25"/>
    <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="6" fill="none" stroke="${accentColor}" stroke-width="1" stroke-opacity="0.12"/>
    
    <!-- Category Pill -->
    ${category ? `
      <g transform="translate(50, 60)">
        <rect width="160" height="32" rx="16" fill="${accentColor}" fill-opacity="0.18"/>
        <text x="80" y="21" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" fill="${textColor}" text-anchor="middle" letter-spacing="1.5">${category.toUpperCase()}</text>
      </g>
    ` : ''}

    <!-- Icon Graphic -->
    <g transform="translate(0, ${category ? 0 : -20})">
      ${iconMarkup}
    </g>

    <!-- Content Block -->
    <g transform="translate(${width / 2}, ${height - 110})">
      ${badgeText ? `
        <rect x="-80" y="-70" width="160" height="24" rx="4" fill="${accentColor}" fill-opacity="0.3"/>
        <text x="0" y="-54" font-family="'DM Sans', sans-serif" font-size="11" font-weight="600" fill="${textColor}" text-anchor="middle">${badgeText}</text>
      ` : ''}
      <text x="0" y="-15" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="${textColor}" text-anchor="middle">${title}</text>
      <text x="0" y="18" font-family="'DM Sans', sans-serif" font-size="14" font-weight="400" fill="${textColor}" fill-opacity="0.8" text-anchor="middle">${subtitle || 'Élan Aesthetic Clinic — Advanced Care'}</text>
    </g>
  </svg>`;
}

// Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" width="320" height="64">
  <!-- Minimalist Aesthetic Leaf/Gem Icon -->
  <g transform="translate(12, 10)">
    <circle cx="22" cy="22" r="21" fill="#2A4636"/>
    <path d="M22 8 C15 15 15 29 22 36 C29 29 29 15 22 8 Z" fill="#FAF8F5"/>
    <circle cx="22" cy="22" r="3" fill="#D8A47F"/>
  </g>
  <!-- Typography -->
  <text x="66" y="34" font-family="'Playfair Display', Georgia, serif" font-size="26" font-weight="700" fill="#191A1C" letter-spacing="1.5">ÉLAN</text>
  <text x="66" y="49" font-family="'DM Sans', sans-serif" font-size="10" font-weight="600" fill="#5C7E67" letter-spacing="3.2">AESTHETIC CLINIC</text>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#2A4636"/>
  <path d="M32 14 C22 24 22 40 32 50 C42 40 42 24 32 14 Z" fill="#FAF8F5"/>
  <circle cx="32" cy="32" r="4.5" fill="#D8A47F"/>
</svg>`;

// Write Logos
fs.writeFileSync(path.join(publicDir, 'images/logo/elan-logo.svg'), logoSvg);
fs.writeFileSync(path.join(publicDir, 'images/logo/elan-favicon.svg'), faviconSvg);

// Define files to create
const files = [
  // Hero Images
  { file: 'images/hero/hero-clinic.jpg', title: 'State-of-the-Art Sanctuary', subtitle: 'Medical Excellence & Tranquility', category: 'The Clinic', bgColor: '#1D3327', accentColor: '#AFC5B3', iconType: 'clinic', width: 1200, height: 800 },
  { file: 'images/hero/hero-treatment.jpg', title: 'Advanced Rejuvenation Suite', subtitle: 'Precision Laser & Dermal Therapies', category: 'Care', bgColor: '#2A4636', accentColor: '#D5C4B4', iconType: 'sparkle', width: 1000, height: 750 },
  { file: 'images/hero/hero-doctor.jpg', title: 'Board-Certified Specialists', subtitle: 'Leading Physicians & Dermatologists', category: 'Expertise', bgColor: '#243A2E', accentColor: '#AFC5B3', iconType: 'doctor', width: 900, height: 700 },

  // Services
  { file: 'images/services/service-hydrafacial.jpg', title: 'HydraFacial Elite', subtitle: 'Cleanse, Extract & Deep Hydration', category: 'Facial Treatments', bgColor: '#2C5242', accentColor: '#AFC5B3', iconType: 'facial' },
  { file: 'images/services/service-laser.jpg', title: 'Pico Laser Toning', subtitle: 'Hyperpigmentation & Melasma Clearance', category: 'Laser Treatments', bgColor: '#1E3A2F', accentColor: '#D8A47F', iconType: 'laser' },
  { file: 'images/services/service-anti-aging.jpg', title: 'Precision Neuromodulators', subtitle: 'Subtle Anti-Wrinkle Smoothing', category: 'Anti-Aging', bgColor: '#2E3A33', accentColor: '#AFC5B3', iconType: 'sparkle' },
  { file: 'images/services/service-profhilo.jpg', title: 'Profhilo® Bio-Remodeling', subtitle: 'Pure Hyaluronic Collagen Stimulation', category: 'Skin Treatments', bgColor: '#264234', accentColor: '#D5C4B4', iconType: 'facial' },
  { file: 'images/services/service-co2.jpg', title: 'CO2 Fractional Laser', subtitle: 'Deep Acne Scarring & Resurfacing', category: 'Laser Treatments', bgColor: '#1C3127', accentColor: '#AFC5B3', iconType: 'laser' },
  { file: 'images/services/service-hair.jpg', title: 'Exosome Scalp Therapy', subtitle: 'Cellular Messenger Follicle Renewal', category: 'Hair Treatments', bgColor: '#274435', accentColor: '#AFC5B3', iconType: 'sparkle' },
  { file: 'images/services/service-body.jpg', title: 'HIFEM Body Sculpting', subtitle: 'Supramaximal Muscle Toning & Firming', category: 'Body Treatments', bgColor: '#20392C', accentColor: '#D5C4B4', iconType: 'sparkle' },
  { file: 'images/services/service-wellness.jpg', title: 'Glutathione Radiance Drip', subtitle: 'Antioxidant Detox & Cellular Glow', category: 'Wellness', bgColor: '#1D3528', accentColor: '#AFC5B3', iconType: 'sparkle' },

  // Team
  { file: 'images/team/team-doctor-01.jpg', title: 'Dr. Elena Vance, MD', subtitle: 'Medical Director & Chief Dermatologist', category: 'Harvard Trained', bgColor: '#1E372A', accentColor: '#D5C4B4', iconType: 'doctor', badgeText: '14+ Years Experience' },
  { file: 'images/team/team-doctor-02.jpg', title: 'Dr. Marcus Chen, MBBS', subtitle: 'Senior Aesthetic Physician', category: 'Laser Specialist', bgColor: '#243F30', accentColor: '#AFC5B3', iconType: 'doctor', badgeText: '11+ Years Experience' },
  { file: 'images/team/team-doctor-03.jpg', title: 'Dr. Sophia Martinez, MD', subtitle: 'Longevity & Injectable Physician', category: 'Aesthetic Medicine', bgColor: '#2A4636', accentColor: '#D8A47F', iconType: 'doctor', badgeText: '9+ Years Experience' },
  { file: 'images/team/team-doctor-04.jpg', title: 'Sarah Jenkins, LE', subtitle: 'Lead Medical Aesthetician', category: 'HydraFacial Master', bgColor: '#1D3427', accentColor: '#AFC5B3', iconType: 'doctor', badgeText: '8+ Years Experience' },

  // Packages
  { file: 'images/packages/package-glow.jpg', title: 'Élan Glow Package', subtitle: 'HydraFacial + LED + Peptide Ampoules', category: 'Signature Glow', bgColor: '#254434', accentColor: '#AFC5B3', iconType: 'sparkle' },
  { file: 'images/packages/package-clear.jpg', title: 'Clear Skin & Pore Package', subtitle: '3x Pico Laser + Medical Peel', category: 'Clear Complexion', bgColor: '#1C3326', accentColor: '#D8A47F', iconType: 'laser' },
  { file: 'images/packages/package-anti-aging.jpg', title: 'Anti-Aging Harmony', subtitle: 'Profhilo + Botox + Exosomes', category: 'Timeless Youth', bgColor: '#284737', accentColor: '#D5C4B4', iconType: 'facial' },
  { file: 'images/packages/package-bridal.jpg', title: 'Couture Bridal Radiance', subtitle: '6-Week Comprehensive Transformation', category: 'Bridal Series', bgColor: '#223D2E', accentColor: '#AFC5B3', iconType: 'sparkle' },
  { file: 'images/packages/package-transformation.jpg', title: 'Total Body & Longevity', subtitle: 'HIFEM Contouring + IV Radiance Drips', category: 'Body & Vitality', bgColor: '#1B3024', accentColor: '#D5C4B4', iconType: 'sparkle' },

  // Blog
  { file: 'images/blog/blog-profhilo.jpg', title: 'Profhilo vs Fillers', subtitle: 'Bio-Remodeling Science Explained', category: 'Treatments', bgColor: '#284636', accentColor: '#AFC5B3', iconType: 'facial' },
  { file: 'images/blog/blog-laser.jpg', title: 'Pico Laser for Melasma', subtitle: 'Photoacoustic Melanin Breakdown', category: 'Skincare', bgColor: '#1E382A', accentColor: '#D8A47F', iconType: 'laser' },
  { file: 'images/blog/blog-skincare.jpg', title: 'Skin Barrier Repair', subtitle: '5 Clinical Habits for Lipid Balance', category: 'Beauty Tips', bgColor: '#244031', accentColor: '#AFC5B3', iconType: 'sparkle' },
  { file: 'images/blog/blog-wellness.jpg', title: 'Master Antioxidant Power', subtitle: 'IV Glutathione & Vitamin C Synergy', category: 'Wellness', bgColor: '#2B4838', accentColor: '#D5C4B4', iconType: 'sparkle' },
  { file: 'images/blog/blog-clinic.jpg', title: 'New Laser Suite', subtitle: 'Expanded 6,000 sq ft Private Wing', category: 'Clinic News', bgColor: '#1B3124', accentColor: '#AFC5B3', iconType: 'clinic' },

  // Before & After
  { file: 'images/before-after/ba-laser-before.jpg', title: 'Before Treatment', subtitle: 'Stubborn Melasma & Sun Damage', category: 'Baseline Analysis', bgColor: '#3A3835', accentColor: '#D5C4B4', iconType: 'laser', badgeText: 'Day 0 Baseline' },
  { file: 'images/before-after/ba-laser-after.jpg', title: 'After 3 Sessions', subtitle: 'Clear Luminescence & Refined Pores', category: 'Post 8 Weeks', bgColor: '#224030', accentColor: '#AFC5B3', iconType: 'laser', badgeText: '8 Weeks Post Pico' },
  { file: 'images/before-after/ba-botox-before.jpg', title: 'Before Treatment', subtitle: 'Dynamic Forehead Furrows', category: 'Baseline Analysis', bgColor: '#383633', accentColor: '#D5C4B4', iconType: 'sparkle', badgeText: 'Day 0 Baseline' },
  { file: 'images/before-after/ba-botox-after.jpg', title: 'After 14 Days', subtitle: 'Natural Smoothing & Rested Brow', category: 'Post 2 Weeks', bgColor: '#1F3C2D', accentColor: '#AFC5B3', iconType: 'sparkle', badgeText: '14 Days Post Injections' },
  { file: 'images/before-after/ba-co2-before.jpg', title: 'Before Treatment', subtitle: 'Depressed Rolling Acne Scars', category: 'Baseline Analysis', bgColor: '#3C3A36', accentColor: '#D5C4B4', iconType: 'laser', badgeText: 'Day 0 Baseline' },
  { file: 'images/before-after/ba-co2-after.jpg', title: 'After 12 Weeks', subtitle: 'Even Collagen Dermal Matrix', category: 'Post 12 Weeks', bgColor: '#233E30', accentColor: '#AFC5B3', iconType: 'laser', badgeText: '12 Weeks Post Resurfacing' },
  { file: 'images/before-after/ba-profhilo-before.jpg', title: 'Before Treatment', subtitle: 'Crepey Mid-Face Laxity', category: 'Baseline Analysis', bgColor: '#3A3632', accentColor: '#D5C4B4', iconType: 'facial', badgeText: 'Day 0 Baseline' },
  { file: 'images/before-after/ba-profhilo-after.jpg', title: 'After 8 Weeks', subtitle: 'Restored Elasticity & Bounce', category: 'Post 2 Sessions', bgColor: '#213F30', accentColor: '#AFC5B3', iconType: 'facial', badgeText: '8 Weeks Post Profhilo' },
  { file: 'images/before-after/ba-hydra-before.jpg', title: 'Before Treatment', subtitle: 'T-Zone Dehydration & Sebum', category: 'Baseline Analysis', bgColor: '#363835', accentColor: '#D5C4B4', iconType: 'facial', badgeText: 'Pre-Treatment' },
  { file: 'images/before-after/ba-hydra-after.jpg', title: 'After HydraFacial', subtitle: 'Pristine Glass-Skin Hydration', category: 'Immediate Glow', bgColor: '#254333', accentColor: '#AFC5B3', iconType: 'facial', badgeText: 'Same Day Immediate' },
  { file: 'images/before-after/ba-hair-before.jpg', title: 'Before Treatment', subtitle: 'Diffused Follicular Thinning', category: 'Baseline Analysis', bgColor: '#383835', accentColor: '#D5C4B4', iconType: 'sparkle', badgeText: 'Day 0 Baseline' },
  { file: 'images/before-after/ba-hair-after.jpg', title: 'After 16 Weeks', subtitle: 'Dense Follicle Regrowth', category: 'Post 3 Sessions', bgColor: '#1E3B2B', accentColor: '#AFC5B3', iconType: 'sparkle', badgeText: '16 Weeks Exosomes' },

  // Gallery
  { file: 'images/gallery/gallery-clinic-01.jpg', title: 'Private Consultation Suite', subtitle: 'Designed for Discretion and Comfort', category: 'Clinic', bgColor: '#1D3226', accentColor: '#AFC5B3', iconType: 'clinic' },
  { file: 'images/gallery/gallery-treatment-01.jpg', title: 'Pico Laser Operating Room', subtitle: 'Hospital Grade Sterilization & Optics', category: 'Treatments', bgColor: '#243C2E', accentColor: '#D8A47F', iconType: 'laser' },
  { file: 'images/gallery/gallery-team-01.jpg', title: 'Physician Anatomical Review', subtitle: 'Dr. Elena Vance Leading Dermal Case', category: 'Team', bgColor: '#294435', accentColor: '#AFC5B3', iconType: 'doctor' },
  { file: 'images/gallery/gallery-treatment-02.jpg', title: 'HydraFacial Infusion Suite', subtitle: 'Relaxing Ergonomic Treatment Chairs', category: 'Treatments', bgColor: '#1E3628', accentColor: '#D5C4B4', iconType: 'facial' },
  { file: 'images/gallery/gallery-clinic-02.jpg', title: 'VIP Post-Care Recovery Lounge', subtitle: 'Botanical Teas & Chromotherapy', category: 'Clinic', bgColor: '#264234', accentColor: '#AFC5B3', iconType: 'clinic' },
  { file: 'images/gallery/gallery-results-01.jpg', title: 'Glass-Skin Dermal Finish', subtitle: 'Radiant Collagen Hydration Matrix', category: 'Results', bgColor: '#223E2F', accentColor: '#AFC5B3', iconType: 'sparkle' },
  { file: 'images/gallery/gallery-team-02.jpg', title: 'Clinical Board Collaboration', subtitle: 'Multi-Specialist Treatment Mapping', category: 'Team', bgColor: '#1F372A', accentColor: '#D5C4B4', iconType: 'doctor' },
  { file: 'images/gallery/gallery-results-02.jpg', title: '3-Session Pigment Clearance', subtitle: 'Flawless Tone Restoration', category: 'Results', bgColor: '#274435', accentColor: '#AFC5B3', iconType: 'sparkle' }
];

files.forEach(f => {
  const content = createSvgPlaceholder(f);
  fs.writeFileSync(path.join(publicDir, f.file), content);
});

console.log(`Successfully generated ${files.length + 2} local assets in /public/images/!`);
