/**
 * Product registry — maps product slugs to their category path and data file.
 *
 * Route structure: /products/<...categories>/<slug>
 * Example: /products/laser-cutting-machines/sheet-laser-cutting/a-series
 *
 * The `categories` array is ordered from broadest to most specific.
 * Each entry has a `slug` (URL segment) and `label` (display name for breadcrumbs).
 */

export interface LocalizedString {
  en: string;
  id: string;
}

export interface CategorySegment {
  slug: string;
  label: LocalizedString;
}

export interface ProductEntry {
  slug: string;
  categories: CategorySegment[];
}

export const productRegistry: ProductEntry[] = [
  // Sheet Laser Cutting Machines
  {
    slug: "p-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
      },
    ],
  },
  {
    slug: "a-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
      },
    ],
  },
  {
    slug: "c-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
      },
    ],
  },
  {
    slug: "g-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
      },
    ],
  },
  {
    slug: "i-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
      },
    ],
  },
  {
    slug: "h-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
      },
    ],
  },

  // Tube Laser Cutting Machines
  {
    slug: "t-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "tube-laser-cutting",
        label: {
          en: "Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Pipa",
        },
      },
    ],
  },
  {
    slug: "k-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "tube-laser-cutting",
        label: {
          en: "Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Pipa",
        },
      },
    ],
  },
  {
    slug: "q0-pro-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "tube-laser-cutting",
        label: {
          en: "Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Pipa",
        },
      },
    ],
  },

  // Combo Sheet & Tube Laser Cutting Machines
  {
    slug: "at-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "combo-sheet-tube-laser-cutting",
        label: {
          en: "Sheet & Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat & Pipa",
        },
      },
    ],
  },
  {
    slug: "ct-series",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "combo-sheet-tube-laser-cutting",
        label: {
          en: "Sheet & Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat & Pipa",
        },
      },
    ],
  },

  // Automation Devices
  {
    slug: "iloader-eco",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
      },
    ],
  },
  {
    slug: "iloader",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
      },
    ],
  },
  {
    slug: "k-loader",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
      },
    ],
  },
  {
    slug: "k-loader-pro",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
      },
    ],
  },
  {
    slug: "m-loader",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
      },
    ],
  },
  {
    slug: "t-loader",
    categories: [
      {
        slug: "laser-cutting-machines",
        label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
      },
    ],
  },

  // Welding Machines — MIG Welding
  {
    slug: "dex2-m-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "mig-welding",
        label: { en: "MIG Welding Machine", id: "Mesin Las MIG" },
      },
    ],
  },
  {
    slug: "ehave2-cm-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "mig-welding",
        label: { en: "MIG Welding Machine", id: "Mesin Las MIG" },
      },
    ],
  },

  // Welding Machines — TIG Welding
  {
    slug: "metatig-acdc-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "tig-welding",
        label: { en: "TIG Welding Machine", id: "Mesin Las TIG" },
      },
    ],
  },
  {
    slug: "metatig-dc-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "tig-welding",
        label: { en: "TIG Welding Machine", id: "Mesin Las TIG" },
      },
    ],
  },

  // Welding Machines — MMA Welding
  {
    slug: "st-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "mma-welding",
        label: { en: "MMA Welding Machine", id: "Mesin Las MMA" },
      },
    ],
  },

  // Welding Machines — Submerged Arc Welding
  {
    slug: "sa-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "submerged-arc-welding",
        label: {
          en: "Submerged Arc Welding Machine",
          id: "Mesin Las Busur Terendam",
        },
      },
    ],
  },

  // Welding Machines — Handheld Laser Welding
  {
    slug: "lux-series",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "handheld-laser-welding",
        label: {
          en: "Handheld Laser Welding Machine",
          id: "Mesin Las Laser Genggam",
        },
      },
    ],
  },

  // Welding Machines — IoT Software
  {
    slug: "smarc",
    categories: [
      {
        slug: "welding-machines",
        label: { en: "Welding Machines", id: "Mesin Las" },
      },
      {
        slug: "iot-software",
        label: { en: "IoT Software", id: "Perangkat Lunak IoT" },
      },
    ],
  },
];

/**
 * Look up a product by type + remaining segments.
 * `type` is the top-level category slug (e.g. "laser-cutting-machines").
 * `segments` contains sub-category slugs followed by the product slug as the last element.
 */
export function findProduct(
  type: string,
  segments: string[],
): ProductEntry | null {
  if (segments.length < 1) return null;

  const slug = segments[segments.length - 1];
  const subCategoryPath = segments.slice(0, -1);
  const fullPath = [type, ...subCategoryPath];

  const entry = productRegistry.find(
    (p) =>
      p.slug === slug &&
      p.categories.length === fullPath.length &&
      p.categories.every((cat, i) => cat.slug === fullPath[i]),
  );

  return entry ?? null;
}

/**
 * Build the canonical URL path for a product.
 */
export function productPath(entry: ProductEntry): string {
  const categoryPath = entry.categories.map((c) => c.slug).join("/");
  return `/products/${categoryPath}/${entry.slug}`;
}

/**
 * Look up a product by slug only and return its canonical path.
 * Returns `/products/<slug>` as fallback if not found in registry.
 */
export function productHref(slug: string): string {
  const entry = productRegistry.find((p) => p.slug === slug);
  if (!entry) return `/products/${slug}`;
  return productPath(entry);
}

// ---------------------------------------------------------------------------
// Category registry
// ---------------------------------------------------------------------------

export interface SubCategory {
  slug: string;
  label: LocalizedString;
  description?: LocalizedString;
  productSlugs: string[];
}

export interface CategoryEntry {
  slug: string;
  label: LocalizedString;
  description?: LocalizedString;
  subCategories: SubCategory[];
}

export const categoryRegistry: CategoryEntry[] = [
  {
    slug: "laser-cutting-machines",
    label: { en: "Laser Cutting Machines", id: "Mesin Laser Cutting" },
    description: {
      en: "Industrial-grade fiber laser cutting machines built for Indonesia’s heavy industries—manufacturing, metal-working, fabrication, shipyards, and oil & gas. Fiber laser technology delivers fast, precise cutting for steel plate, stainless, and aluminium, with clean edges and repeatable accuracy for high-volume production. Choose the right setup for your operation: sheet, tube, or combined sheet & tube, with optional CNC control, nesting software, and automation to reduce waste and operating costs. Get end-to-end support in Indonesia: sizing consultation, installation, operator training, and spare parts availability.",
      id: "Mesin Laser Cutting Fiber Industrial untuk kebutuhan produksi di Indonesia—mulai dari manufaktur, metal-working, fabrikasi, shipyard, hingga oil & gas. Teknologi fiber laser cutting memberikan pemotongan plat baja, stainless, aluminium (dan material metal lain) dengan akurasi tinggi, kecepatan stabil, dan hasil rapi, cocok untuk produksi massal maupun job order. Tersedia opsi sheet / tube / sheet & tube, integrasi CNC, nesting software, dan automation untuk meningkatkan efisiensi dan menekan biaya operasional. Dapatkan solusi lengkap: konsultasi spesifikasi, instalasi, training operator, dan dukungan spare part di Indonesia.",
    },
    subCategories: [
      {
        slug: "sheet-laser-cutting",
        label: {
          en: "Sheet Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat Logam",
        },
        description: {
          en: "Explore our range of industrial sheet metal fiber laser cutting machines built for high uptime and consistent accuracy. As an Indonesia distributor for Bodor (and selected China-built industrial solutions), we help manufacturers and fabrication workshops upgrade cutting performance—often at a lower total cost than well-known premium brands. Use this page to compare series, understand ideal power and bed size for your workload, and request a fast quotation.",
          id: "Lihat pilihan sheet metal fiber laser cutting machine industri dengan fokus pada uptime tinggi dan presisi stabil. Sebagai distributor di Indonesia untuk Bodor (serta solusi industri pilihan dari Tiongkok), kami membantu pabrik dan workshop fabrikasi meningkatkan performa cutting—seringkali dengan biaya total lebih rendah dibanding brand premium terkenal. Bandingkan seri, tentukan power & ukuran bed yang tepat, lalu minta penawaran cepat.",
        },
        productSlugs: [
          "p-series",
          "a-series",
          "c-series",
          "g-series",
          "i-series",
          "h-series",
        ],
      },
      {
        slug: "tube-laser-cutting",
        label: {
          en: "Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Pipa",
        },
        description: {
          en: "Industrial tube laser cutting machines for fast, accurate cutting of round/square tubes and metal profiles. We supply Bodor tube fiber laser systems in Indonesia—premium-like output with a more efficient total cost than many established brands. Compare models and request a quotation.",
          id: "Mesin tube laser cutting industri untuk pemotongan cepat dan presisi pada pipa bulat/kotak serta profil logam. Kami menyediakan sistem tube fiber laser Bodor di Indonesia—hasil setara kelas premium dengan biaya total lebih efisien dibanding banyak brand mapan. Bandingkan model dan minta penawaran.",
        },
        productSlugs: ["k-series", "t-series", "q0-pro-series"],
      },
      {
        slug: "combo-sheet-tube-laser-cutting",
        label: {
          en: "Sheet & Tube Laser Cutting Machine",
          id: "Mesin Laser Cutting Plat & Pipa",
        },
        description: {
          en: "Need one system for both plate and pipe? Our sheet & tube laser cutting machines handle flat sheets and tubular profiles—built for workshops that want flexibility without sacrificing precision. Available in Indonesia with production-ready performance and efficient total cost. Request a quotation.",
          id: "Butuh satu mesin untuk plat dan pipa? Mesin sheet & tube laser cutting memproses lembaran dan profil tube—cocok untuk workshop yang butuh fleksibilitas tanpa mengorbankan presisi. Tersedia di Indonesia dengan performa siap produksi dan biaya total efisien. Minta penawaran.",
        },
        productSlugs: ["at-series", "ct-series"],
      },
      {
        slug: "automation-devices",
        label: { en: "Automation Devices", id: "Perangkat Otomasi" },
        description: {
          en: "Increase uptime and reduce manual handling with laser cutting automation devices—material loaders, unloaders, and production flow add-ons designed to boost throughput and safety. Ideal for high-volume sheet cutting lines in Indonesia. Talk to us for the right automation setup.",
          id: "Tingkatkan uptime dan kurangi handling manual dengan automation device untuk laser cutting—material loader, unloader, dan add-on alur produksi untuk menaikkan output dan keselamatan kerja. Cocok untuk lini sheet cutting volume tinggi di Indonesia. Konsultasikan setup automation yang tepat.",
        },
        productSlugs: [
          "iloader-eco",
          "iloader",
          "k-loader",
          "k-loader-pro",
          "m-loader",
          "t-loader",
        ],
      },
    ],
  },
  {
    slug: "welding-machines",
    label: { en: "Welding Machines", id: "Mesin Las" },
    description: {
      en: "Industrial welding machines built for Indonesia’s demanding sectors—manufacturing, metal-working, heavy fabrication, shipyards, and oil & gas. We supply a complete range of processes: MIG, TIG, MMA/Stick, Submerged Arc Welding (SAW), and Laser Welding, supporting materials like carbon steel, stainless, and aluminium. Designed for strong, consistent weld quality and higher productivity, these systems fit both workshop production and on-site jobs. Get the right setup with process matching and options for wire feeders, torches, consumables, installation, operator training, and spare parts support in Indonesia.",
      id: "Mesin Las Industrial untuk kebutuhan fabrikasi dan produksi di Indonesia—mulai dari manufaktur, metal-working, konstruksi baja, shipyard, hingga oil & gas. Kami menyediakan rangkaian lengkap: MIG, TIG, MMA/Stick, Submerged Arc Welding (SAW), dan Laser Welding, untuk berbagai material seperti mild steel, stainless, dan aluminium. Solusi ini dirancang untuk hasil las yang kuat dan konsisten, efisiensi kerja lebih tinggi, serta kompatibel untuk pekerjaan workshop maupun site. Dapatkan rekomendasi tipe mesin sesuai aplikasi, lengkap dengan opsi wire feeder, torch, consumables, instalasi, training operator, dan dukungan spare part di Indonesia.",
    },
    subCategories: [
      {
        slug: "mig-welding",
        label: { en: "MIG Welding Machine", id: "Mesin Las MIG" },
        description: {
          en: "Industrial MIG (GMAW) welding machines for fast, consistent production welding—ideal for fabrication, manufacturing, and general steelwork. We supply Megmeet welding solutions in Indonesia to deliver stable arcs, clean weld appearance, and efficient total cost for workshops competing with higher-priced legacy brands.",
          id: "Mesin las MIG (GMAW) industri untuk produksi cepat dan konsisten—cocok untuk fabrikasi, manufaktur, dan pekerjaan baja umum. Kami menyediakan solusi las Megmeet di Indonesia untuk arc yang stabil, hasil rapi, dan biaya total yang lebih efisien dibanding banyak brand mapan yang lebih mahal.",
        },
        productSlugs: ["dex2-m-series", "ehave2-cm-series"],
      },
      {
        slug: "tig-welding",
        label: { en: "TIG Welding Machine", id: "Mesin Las TIG" },
        description: {
          en: "Industrial TIG (GTAW) welding machines for clean, precise welds—ideal for stainless steel, thin materials, and high-finish work. We supply Megmeet TIG solutions in Indonesia to help fabricators achieve controlled heat input, neat beads, and dependable performance at a competitive total cost.",
          id: "Mesin las TIG (GTAW) industri untuk hasil bersih dan presisi—cocok untuk stainless steel, material tipis, dan pekerjaan finishing tinggi. Kami menyediakan solusi TIG Megmeet di Indonesia untuk kontrol heat input yang baik, bead rapi, dan performa andal dengan biaya total yang kompetitif.",
        },
        productSlugs: ["metatig-acdc-series", "metatig-dc-series"],
      },
      {
        slug: "mma-welding",
        label: { en: "MMA Welding Machine", id: "Mesin Las MMA" },
        description: {
          en: "Industrial MMA/Stick (SMAW) welding machines built for tough site conditions—reliable for maintenance, construction, and field repair. We supply Megmeet MMA/Stick solutions in Indonesia for stable starts, solid penetration, and dependable performance where portability and versatility matter most.",
          id: "Mesin las MMA/Stick (SMAW) industri untuk kondisi kerja berat—andal untuk maintenance, konstruksi, dan perbaikan lapangan. Kami menyediakan solusi MMA/Stick Megmeet di Indonesia untuk start yang stabil, penetrasi baik, dan performa yang dapat diandalkan saat portabilitas dan fleksibilitas jadi prioritas.",
        },
        productSlugs: ["st-series"],
      },
      {
        slug: "submerged-arc-welding",
        label: {
          en: "Submerged Arc Welding Machine",
          id: "Mesin Las Busur Terendam",
        },
        description: {
          en: "Submerged Arc Welding (SAW) systems for high-deposition, high-repeatability welding—ideal for long weld seams on thick plate in fabrication and heavy industry. We help Indonesia manufacturers select SAW setups that prioritize throughput, weld consistency, and production efficiency.",
          id: "Sistem Submerged Arc Welding (SAW) untuk pengelasan dengan deposition tinggi dan repeatability tinggi—ideal untuk sambungan panjang pada pelat tebal di fabrikasi dan industri berat. Kami membantu manufaktur di Indonesia memilih setup SAW yang fokus pada throughput, konsistensi hasil, dan efisiensi produksi.",
        },
        productSlugs: ["sa-series"],
      },
      {
        slug: "handheld-laser-welding",
        label: {
          en: "Handheld Laser Welding Machine",
          id: "Mesin Las Laser Genggam",
        },
        description: {
          en: "Handheld laser welding solutions for clean seams with low heat input—ideal for stainless fabrication, thin materials, and jobs where distortion must be minimized. We help Indonesia workshops evaluate handheld laser welding for practical throughput and finish improvements.",
          id: "Solusi handheld laser welding untuk seam rapi dengan heat input rendah—cocok untuk fabrikasi stainless, material tipis, dan pekerjaan yang perlu distorsi minimal. Kami membantu workshop di Indonesia mengevaluasi handheld laser welding untuk peningkatan produktivitas dan kualitas finishing yang realistis.",
        },
        productSlugs: ["lux-series"],
      },
      {
        slug: "iot-software",
        label: { en: "IoT Software", id: "Perangkat Lunak IoT" },
        description: {
          en: "Cloud-based smart welding IoT platform for real-time monitoring, welder management, and quality traceability.\nNow fully authorized in Indonesia.",
          id: "Platform IoT las pintar berbasis cloud untuk pemantauan real-time, manajemen tukang las, dan keterlacakan kualitas.\nKini resmi tersedia di Indonesia.",
        },
        productSlugs: ["smarc"],
      },
    ],
  },
];

/**
 * Find a category by its top-level type slug.
 */
export function findCategory(type: string): CategoryEntry | null {
  return categoryRegistry.find((c) => c.slug === type) ?? null;
}

export interface SubCategoryMatch {
  category: CategoryEntry;
  subCategory: SubCategory;
}

/**
 * Find a subcategory within a type by matching segment slugs.
 * `type` is the top-level category slug, `segments` is the subcategory path.
 * Currently matches a single segment (the subcategory slug).
 */
export function findSubCategory(
  type: string,
  segments: string[],
): SubCategoryMatch | null {
  const category = findCategory(type);
  if (!category) return null;

  // Match subcategory by the last segment in the path
  const subSlug = segments[segments.length - 1];
  const subCategory = category.subCategories.find((s) => s.slug === subSlug);
  if (!subCategory) return null;

  return { category, subCategory };
}
