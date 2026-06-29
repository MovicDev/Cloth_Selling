/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Collection, Testimonial, FabricInspiration } from '../types';

export const initialProducts: Product[] = [
  {
    id: "royal-gold-emperor-ankara",
    name: "Royal Gold Emperor Ankara",
    pricePerYard: 12, // $12 or ~₦8,500
    category: "Ankara Fabrics",
    description: "A breathtaking, high-density 100% premium African wax print. Embellished with fine golden outlines that trace majestic monarch and organic patterns, this fabric provides a rigid structure that holds pleats beautifully. Perfect for premium native wear dresses, customized corporate ensembles, and headwraps.",
    images: [
      "https://images.unsplash.com/photo-1597484662317-9bd7edd32d18?q=80&w=800",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800",
      "https://images.unsplash.com/photo-1582236940843-ef7213ee44e1?q=80&w=800"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-woman-elegantly-walking-in-traditional-dress-34440-large.mp4",
    colors: ["Gold & Maroon", "Teal & Yellow", "Royal Blue & Gold"],
    width: "46 inches (1.17m)",
    suitableUses: ["Native wear gowns", "Sophisticated kaftans", "Aso-Ebi Uniforms", "Blazers", "Premium headties/geles"],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    viewsCount: 342
  },
  {
    id: "imperial-cashmere-senator",
    name: "Imperial Cashmere Senator",
    pricePerYard: 22, // $22 or ~₦16,000
    category: "Senator Materials",
    description: "Woven in Yorkshire mills with a premium wool-cashmere blend, this fabric of sovereign standards has a flawless, smooth finish that cascades into pristine tailor lines. It features robust crease-resistance and an elegant, semi-matte sheen. Made specifically for high-class Senator styles and exquisite menswear kaftans.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800",
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800"
    ],
    colors: ["Charcoal Grey", "Navy Blue", "Champagne Beige", "materiall Olive"],
    width: "60 inches (1.52m)",
    suitableUses: ["Senator outfits", "Traditional attire for men", "Two-piece kaftans", "Luxury Agbada underlay", "Slim-fit trousers"],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    viewsCount: 498
  },
  {
    id: "gothic-floral-cord-lace",
    name: "Gothic Floral French Cord Lace",
    pricePerYard: 35, // $35 or ~₦25,000
    category: "Lace Fabrics",
    description: "An incredibly delicate, intricate French cord lace with heavy floral embroidery structures. Each petal is outlined with premium satin cords, raising the layout into a 3D aesthetic. Hand-finished with micro-glistening threads, this material catches ambient lighting perfectly. Designed for glamorous bridal dress options and high-society receptions.",
    images: [
      "https://images.unsplash.com/photo-1583095117926-0498b8fd9be5?q=80&w=800",
      "https://images.unsplash.com/photo-1520004434532-668416a08753?q=80&w=800"
    ],
    colors: ["Ivory White", "Rose Quartz", "Emerald Queen", "Deep Burgundy"],
    width: "54 inches (1.37m)",
    suitableUses: ["Bridal wear", "Evening dinner gowns", "Luxury Aso-Ebi dresses", "Capes", "Overlay panels for senator designs"],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    viewsCount: 221
  },
  {
    id: "materiall-deluxe-cashmere",
    name: "materiall Cashmere Deluxe",
    pricePerYard: 28, // $28 or ~₦20,000
    category: "Cashmere Materials",
    description: "Softness defined. Made with rare grade-A Mongolian cashmere fibers, this luxury tailoring material feels like a second skin. It possesses superior drape quality and natural stretch, keeping you insulated yet breathable. Suited perfectly for executive tailoring styles, winter-layering, and luxury unisex outfits.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=800"
    ],
    colors: ["Camel", "Soft Sand", "Onyx Black", "Burgundy Velvet"],
    width: "58 inches (1.47m)",
    suitableUses: ["Luxury blazers", "Executive suits", "Senator tunics", "Double-breasted coats", "Tailored trousers"],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    viewsCount: 189
  },
  {
    id: "egyptian-giza-cotton",
    name: "Egyptian Giza Cotton Royale",
    pricePerYard: 18, // $18 or ~₦13,000
    category: "Cotton Fabrics",
    description: "Spun from long-staple certified Egyptian cotton fibers, this premium shirting material provides unmatched structural breathability and crisp starch-friendly response. Ideal for custom tailored button-downs, light senator khaftans, and breezy elegant resort wear.",
    images: [
      "https://images.unsplash.com/photo-1576016770956-debb63d900bb?q=80&w=800",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800"
    ],
    colors: ["Pure White", "Powder Blue", "Crisp Mint", "Muted Salmon"],
    width: "60 inches (1.52m)",
    suitableUses: ["Executive dress shirts", "Lightweight traditional kaftans", "Summer dresses", "Suits lining", "Unisex loungewear"],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    viewsCount: 175
  },
  {
    id: "savile-row-slate-herringbone",
    name: "Savile Row Slate Herringbone",
    pricePerYard: 32, // $32 or ~₦23,000
    category: "Suiting Materials",
    description: "A signature classic 100% merino-wool suiting weight fabric in a complex charcoal herringbone weave. Designed with traditional standards in mind, this suiting fabric offers magnificent structure down the chest, sharp crease holding down the leg, and heavy comfort suitable for both day wear and presidential evenings.",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800"
    ],
    colors: ["Slate Charcoal", "Midnight Sovereign Blue", "Chocolate Tweed"],
    width: "60 inches (1.52m)",
    suitableUses: ["Three-piece bespoke suits", "Tailored blazers", "Double-breasted waistcoats", "Luxury corporate trousers"],
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    viewsCount: 145
  },
  {
    id: "amalfi-coast-silk-vintage",
    name: "Amalfi Coast Silk Vintage Print",
    pricePerYard: 25, // $25 or ~₦18,000
    category: "Vintage & Designer Prints",
    description: "An elegant, highly lustrous pure silk-satin weave with print patterns inspired by Italian fresco arts and mid-century modern architectures. The material moves like liquid, creating a cinematic shimmer in natural sunlight. Perfect for lavish boubous, flowing shirts, vintage style accessories, and glamorous evening kaftans.",
    images: [
      "https://images.unsplash.com/photo-1614713570624-9dfcff4543b3?q=80&w=800",
      "https://images.unsplash.com/photo-1502239608882-93b729c6af43?q=80&w=800"
    ],
    colors: ["Mediterranean Teal", "Tuscan Ochre & Gold", "Sienna Sunset"],
    width: "56 inches (1.42m)",
    suitableUses: ["Flowing unisex shirts", "Glamorous Silk Boubous", "Summer kimonos", "Premium lining layers", "Scarves and accessories"],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    viewsCount: 310
  },
  {
    id: "plain-pattern-deluxe-sovereign",
    name: "Deluxe Sovereign Plain & Pattern Combo",
    pricePerYard: 16, // $16 or ~₦12,000
    category: "Plain & Pattern Fabrics",
    description: "A bespoke curated matching pair package, consisting of 4 yards of high-quality patterned designer fabric paired beautifully with 3 yards of highly saturated solid cashmere. The plain material has identical weight to the pattern weave, guaranteeing flawless styling transition. Highly sought-after for weddings, family assemblies, and Sunday best wear.",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
      "https://images.unsplash.com/photo-1582236940843-ef7213ee44e1?q=80&w=800"
    ],
    colors: ["Burgundy Motif + Solid Burgundy", "Royal Indigo Waves + Navy Solid", "Forest Vines + Emerald Solid"],
    width: "48 inches (Plain) / 46 inches (Pattern)",
    suitableUses: ["Traditional full couples' attire", "Senator & pattern patch designs", "Festive kaftans", "Aso-Ebi signature wear"],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    viewsCount: 298
  }
];

export const initialCollections: Collection[] = [
  {
    id: "ankara",
    name: "Ankara Fabrics",
    description: "Vibrant high-density wax prints enriched with real gold lining detailing.",
    image: "https://i.pinimg.com/1200x/13/5a/ce/135acee94d16a4092d42dcb452586753.jpg  ",
    count: 14
  },
  {
    id: "senator",
    name: "Senator Materials",
    description: "Sovereign cashmere-blend wools designed for sharp menswear kaftans.",
    image: "https://i.pinimg.com/736x/6b/c2/1d/6bc21de12e975bec00e42c302ccfa582.jpg  ",
    count: 22
  },
  {
    id: "lace",
    name: "Lace Fabrics",
    description: "Intricately detailed floral sequined and cord lace suited for bridal standards.",
    image: "https://i.pinimg.com/1200x/48/a2/ae/48a2ae05d3d096f024db29c2ad26c8d0.jpg",
    count: 12
  },
  {
    id: "cashmere",
    name: "Cashmere Materials",
    description: "Premium Mongolian fibers offering natural drape and executive insulation.",
    image: "https://i.pinimg.com/1200x/2b/8b/d8/2b8bd8253db24f5516fff8d66e9eee1e.jpg",
    count: 18
  },
  {
    id: "suiting",
    name: "Suiting Materials",
    description: "Classic Savile Row weights including slate herringbone and navy pinstripes.",
    image: "https://i.pinimg.com/1200x/57/42/4c/57424c8c16d8adadb6bc8ade6a2eb433.jpg",
    count: 15
  },
  {
    id: "plain-pattern",
    name: "Plain & Pattern Fabrics",
    description: "Exquisite pre-paired duos perfectly weight-matched for custom tailoring.",
    image: "https://i.pinimg.com/1200x/8a/e5/95/8ae59584060f3df07bb5af444adf1278.jpg",
    count: 19
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Adeola Alade",
    role: "Lead Fashion Designer, House of Adeola",
    content: "The cord lace and senator materials from this showroom are genuinely unrivaled. The drape is consistent, and the gold embroideries on the cord lace hold up magnificently. My wedding clients have been thrilled. Delivery is consistently ahead of schedule.",
    rating: 5,
    completedOutfitImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800",
    fabricUsed: "Gothic Floral French Cord Lace"
  },
  {
    id: "t2",
    name: "Alaba Yusuf",
    role: "Creative Director, Al Yusuf Bespoke",
    content: "When tailoring luxury Kaftans, you absolutely need material that doesn't crease after three hours of wear. The Cashmere Senator has been a game changer for my presidential clients. They keep coming back for more colors.",
    rating: 5,
    completedOutfitImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
    fabricUsed: "Imperial Cashmere Senator"
  },
  {
    id: "t3",
    name: "Chioma Okereke",
    role: "High-Society Stylist & Planner",
    content: "We ordered 80 yards of the Emperor Ankara for an VIP Aso-Ebi event in Abuja. Every yard was consistently flawless, and the metallic golden outline shimmered under the ballroom lights perfectly. Absolute trust in this brand.",
    rating: 5,
    completedOutfitImage: "https://images.unsplash.com/photo-1582236940843-ef7213ee44e1?q=80&w=800",
    fabricUsed: "Royal Gold Emperor Ankara"
  }
];

export const initialInspirations: FabricInspiration[] = [
  {
    id: "ins-1",
    title: "The Modern Senator Kaftan Style",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-with-suit-on-a-chair-smiling-41221-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500",
    fabricUsed: "Imperial Cashmere Senator",
    designer: "Yusuf Bespoke",
    description: "Watch how a pristine Imperial Cashmere holds custom senator piping along the shoulders and chest flaps."
  },
  {
    id: "ins-2",
    title: "VIP Wedding Gown Splendor",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glowing-light-on-a-wedding-dress-41312-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1583095117926-0498b8fd9be5?q=80&w=500",
    fabricUsed: "Gothic Floral French Cord Lace",
    designer: "Adeola Alade Bridal",
    description: "An incredibly elegant lace-accent overlay on a silk structure gown during a royal reception walk."
  },
  {
    id: "ins-3",
    title: "Summer Runway Fluid Shirt",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-wearing-silk-outfit-walking-in-studio-34201-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1614713570624-9dfcff4543b3?q=80&w=500",
    fabricUsed: "Amalfi Coast Silk Vintage Print",
    designer: "Studio Amalfi",
    description: "Witness the majestic fluid movement of 100% fine satin silk vintage print under dynamic breezes."
  }
];
