/* ══════════════════════════════════════════════════════════════
   BLOG-DATA.JS
   Single source of truth for every blog post on LootLo.

   HOW TO ADD A NEW BLOG:
   Copy one object in the `blogPosts` array below, change the
   fields, give it a unique `slug`, and add items to `items[]`.
   Both blog.html (listing) and blog-post.html (detail) read from
   this file automatically — nothing else needs to change.

   NOTE ON SEO: this demo renders content client-side with JS for
   portability. For production SEO you'll want each post statically
   generated (e.g. an Astro page per slug pulling from this same
   shape of data/Supabase table) so crawlers see the HTML directly
   instead of relying on JS execution.
   ══════════════════════════════════════════════════════════════ */

const blogPosts = [
  {
    slug: "top-10-tshirts-2026",
    title: "Top 10 T-Shirts to Buy Right Now",
    category: "Fashion",
    categoryIcon: "👕",
    excerpt: "From everyday basics to statement prints — the 10 t-shirts actually worth your money this season, and exactly why each one earned its spot.",
    metaDescription: "Our curated pick of the 10 best t-shirts to buy right now in India — covering fit, fabric, and value across Myntra, Levi's, and more.",
    keywords: "best t-shirts 2026, top 10 t-shirts, mens t-shirts India, cotton t-shirts, oversized t-shirts",
    coverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
    date: "2026-07-18",
    updated: "2026-07-20",
    readTime: 6,
    author: "LootLo Editorial",
    intro: [
      "T-shirts look simple until you're staring at forty near-identical listings, each claiming to be the softest, the most breathable, the best cut. We bought, wore, and washed our way through the season's biggest releases to find the ones that hold their shape, their color, and their price-to-quality ratio.",
      "Every pick below was chosen for a specific reason — fabric weight, fit consistency, or value at its price tier — and we've spelled that reason out so you can match it to what you actually need, not just what's trending."
    ],
    methodology: "Ranked by fabric quality, fit consistency across sizes, wash durability, and price-to-value — not by affiliate commission.",
    items: [
      {
        rank: 1,
        name: "Levi's Classic Crew Tee",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
        priceTier: "₹₹",
        badge: "Top Pick",
        why: "The 100% combed cotton holds its shape wash after wash, and the crew neck doesn't stretch out the way cheaper tees do within a month. If you only buy one tee off this list, this is the safe, does-everything choice.",
        tags: ["100% cotton", "True to size", "Fade-resistant"],
        stores: [{ name: "Myntra", url: "#" }, { name: "Levi's", url: "#" }]
      },
      {
        rank: 2,
        name: "H&M Oversized Fit Tee",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
        priceTier: "₹",
        badge: "Best Value",
        why: "Oversized fits are everywhere right now, but most feel shapeless. This one is cut with a dropped shoulder that actually looks intentional, and at this price it's the easiest way to try the trend without committing.",
        tags: ["Drop shoulder", "Budget pick", "Streetwear fit"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 3,
        name: "Decathlon Domyos Dry Tee",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
        priceTier: "₹",
        badge: "Best for Gym",
        why: "Made our list purely on function — the moisture-wicking fabric genuinely keeps you dry through a full workout, and it's priced low enough to buy three without blinking.",
        tags: ["Moisture-wicking", "Quick-dry", "Gym-tested"],
        stores: [{ name: "Decathlon", url: "#" }]
      },
      {
        rank: 4,
        name: "Nykaa Fashion Ribbed Tee",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
        priceTier: "₹₹",
        why: "The ribbed knit gives it a slightly more elevated look than a flat-knit basic, so it works layered under a jacket or worn alone. Included for anyone who wants their tee to double as a going-out piece.",
        tags: ["Ribbed knit", "Fitted", "Versatile"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 5,
        name: "Uniqlo Airism Cotton Tee",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
        priceTier: "₹₹",
        badge: "Editor's Choice",
        why: "The Airism blend genuinely feels cooler against skin in humid weather — noticeable within the first wear. Earned its spot as the pick for anyone in a hot, humid city.",
        tags: ["Breathable", "Cooling fabric", "All-day comfort"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 6,
        name: "Roadster Graphic Print Tee",
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
        priceTier: "₹",
        why: "The print doesn't crack or fade after repeated washes the way most sub-₹600 graphic tees do. Made the list as the go-to for anyone who wants a statement piece that survives the wash cycle.",
        tags: ["Graphic print", "Crack-resistant", "Budget pick"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 7,
        name: "Marks & Spencer Pure Cotton Tee",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
        priceTier: "₹₹₹",
        why: "Noticeably heavier fabric weight than most in this list, which gives it a more premium drape. Included for anyone prioritizing feel and longevity over price.",
        tags: ["Heavyweight cotton", "Premium feel"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 8,
        name: "Puma Essentials Tee",
        image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80",
        priceTier: "₹",
        why: "A reliable athleisure basic — slightly stretchier knit than a standard cotton tee, so it moves well whether you're at the gym or running errands.",
        tags: ["Stretch knit", "Athleisure", "Everyday basic"],
        stores: [{ name: "Myntra", url: "#" }, { name: "Decathlon", url: "#" }]
      },
      {
        rank: 9,
        name: "Zara Slim Fit Tee",
        image: "https://images.unsplash.com/photo-1618677831922-14b7a4432dd8?w=600&q=80",
        priceTier: "₹₹",
        why: "The slim cut without being tight is genuinely hard to find at this price — most 'slim fit' tees run either boxy or uncomfortably snug. This one gets the taper right.",
        tags: ["Slim fit", "Tapered cut"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 10,
        name: "Van Heusen Flex Tee",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        priceTier: "₹₹",
        why: "Rounds out the list as the smart-casual option — clean enough to wear under a blazer, casual enough for weekends. A genuinely dual-purpose pick.",
        tags: ["Smart casual", "Versatile"],
        stores: [{ name: "Myntra", url: "#" }]
      }
    ]
  },
  {
    slug: "top-8-sneakers-under-2000",
    title: "Top 8 Sneakers Under ₹2,000",
    category: "Footwear",
    categoryIcon: "👟",
    excerpt: "Solid everyday sneakers that don't cross the ₹2,000 mark — tested for comfort, grip, and how they hold up after a few months of daily wear.",
    metaDescription: "8 sneakers under ₹2,000 worth buying in India right now, picked for comfort, durability, and everyday versatility.",
    keywords: "sneakers under 2000, budget sneakers India, casual shoes, best sneakers 2026",
    coverImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
    date: "2026-07-10",
    updated: "2026-07-10",
    readTime: 5,
    author: "LootLo Editorial",
    intro: [
      "Under ₹2,000 is where most sneakers start cutting corners — thin soles, glued-not-stitched panels, foam that packs down in a month. These eight held up better than their price tag suggests, and we're telling you exactly what each one gets right."
    ],
    methodology: "Tested for sole grip, cushioning after 30+ days of wear, and stitching quality relative to price.",
    items: [
      {
        rank: 1,
        name: "Campus Oxy Running Shoes",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
        priceTier: "₹",
        badge: "Best Value",
        why: "The EVA sole hasn't flattened even after regular daily wear, which is rare at this price point. The obvious pick if budget is the main constraint.",
        tags: ["EVA sole", "Lightweight", "Daily wear"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 2,
        name: "Bata Power Comfort Sneaker",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
        priceTier: "₹",
        why: "Wider toe box than most in this range, which matters if you've had blister issues with narrow sneakers before. Included specifically for that comfort-first reason.",
        tags: ["Wide fit", "Cushioned insole"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 3,
        name: "Sparx Sport Sneaker",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
        priceTier: "₹",
        badge: "Top Pick",
        why: "Best grip in the group on both dry pavement and slightly wet surfaces — a small detail that matters if you're walking or commuting daily, not just wearing these for looks.",
        tags: ["Grippy sole", "Commute-friendly"],
        stores: [{ name: "Myntra", url: "#" }, { name: "Decathlon", url: "#" }]
      },
      {
        rank: 4,
        name: "Liberty Force 10 Sneaker",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
        priceTier: "₹",
        why: "The stitched (not just glued) sole held up the longest in our wear test — a durability detail most shoes in this range skip. Included for buyers who keep sneakers for a year or more.",
        tags: ["Stitched sole", "Long-lasting"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 5,
        name: "Asian Rebel Running Shoe",
        image: "https://images.unsplash.com/photo-1465479423260-c4afc24172c6?w=600&q=80",
        priceTier: "₹",
        why: "Lightest sneaker in this list, which makes it stand out for anyone doing a lot of walking rather than just casual wear. Trades some cushioning for that lighter feel.",
        tags: ["Lightweight", "Walking-friendly"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 6,
        name: "Red Tape Athleisure Sneaker",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
        priceTier: "₹₹",
        why: "Sits right at the ₹2,000 ceiling but the cleaner, less 'sporty' silhouette makes it the pick for anyone who wants a sneaker that also works with jeans, not just gym wear.",
        tags: ["Clean silhouette", "Versatile styling"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 7,
        name: "Fila Memory Foam Sneaker",
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&q=80",
        priceTier: "₹₹",
        why: "The memory foam insole noticeably outperforms the flat foam pads used in cheaper sneakers — made the list for comfort on long standing or walking days.",
        tags: ["Memory foam insole", "All-day comfort"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 8,
        name: "Campus Marvel Casual Sneaker",
        image: "https://images.unsplash.com/photo-1517260911058-c02f5c1d6b6e?w=600&q=80",
        priceTier: "₹",
        why: "Closes out the list as the pure budget option — not the flashiest, but it does the basic job of a daily sneaker reliably and cheaply.",
        tags: ["Budget pick", "Everyday use"],
        stores: [{ name: "Myntra", url: "#" }]
      }
    ]
  },
  {
    slug: "top-10-skincare-summer",
    title: "Top 10 Skincare Picks for Summer",
    category: "Beauty",
    categoryIcon: "🧴",
    excerpt: "Lightweight, non-greasy skincare that actually holds up in heat and humidity — from cleansers to SPF.",
    metaDescription: "10 skincare products built for hot, humid weather — cleansers, moisturizers, and SPF picks that won't feel heavy in summer.",
    keywords: "summer skincare, best sunscreen India, lightweight moisturizer, oily skin skincare",
    coverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80",
    date: "2026-06-28",
    updated: "2026-07-05",
    readTime: 7,
    author: "LootLo Editorial",
    intro: [
      "Heavy creams and thick sunscreens are the two things that make summer skincare miserable. Everything on this list was chosen because it disappears into skin instead of sitting on top of it — no white cast, no greasy finish, no clogged pores by 2pm."
    ],
    methodology: "Prioritized lightweight texture, SPF effectiveness, and performance in high-humidity conditions.",
    items: [
      {
        rank: 1,
        name: "Minimalist SPF 50 PA++++ Sunscreen",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
        priceTier: "₹₹",
        badge: "Top Pick",
        why: "Genuinely no white cast on medium-to-deep skin tones, which is the single biggest complaint with sunscreens in this range. That alone earns it the top spot.",
        tags: ["No white cast", "Broad spectrum", "Non-greasy"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 2,
        name: "Cetaphil Gentle Foaming Cleanser",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
        priceTier: "₹₹",
        why: "Strips away sweat and sunscreen build-up without leaving skin tight afterward — the balance most foaming cleansers get wrong. Included as the safe pick for sensitive skin.",
        tags: ["Sulfate-free", "Sensitive skin", "Dermatologist-tested"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 3,
        name: "Neutrogena Hydro Boost Gel",
        image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=600&q=80",
        priceTier: "₹₹",
        why: "A gel-based moisturizer instead of a cream means it sinks in fast without the heavy, occlusive feel most moisturizers have in summer. Made the list purely for that texture.",
        tags: ["Gel texture", "Lightweight", "Hyaluronic acid"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 4,
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
        priceTier: "₹",
        badge: "Best Value",
        why: "Genuinely helps control shine through humid afternoons at a price most serums can't touch. Earned its spot as the budget pick for oily skin specifically.",
        tags: ["Oil control", "Budget pick"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 5,
        name: "La Roche-Posay Anthelios Fluid",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
        priceTier: "₹₹₹",
        badge: "Editor's Choice",
        why: "The most water-resistant sunscreen we tested — held up through sweat during an outdoor commute better than anything else on this list. Worth the higher price for that alone.",
        tags: ["Water-resistant", "High SPF"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 6,
        name: "Plum Green Tea Toner",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80",
        priceTier: "₹",
        why: "A genuinely alcohol-free toner that calms redness after sun exposure instead of stinging. Included as the after-sun step most summer routines skip.",
        tags: ["Alcohol-free", "Soothing"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 7,
        name: "Mamaearth Vitamin C Face Wash",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
        priceTier: "₹",
        why: "Noticeably brightens dullness caused by sun exposure over a few weeks of consistent use — a fair claim, not an exaggerated one, based on our testing.",
        tags: ["Vitamin C", "Brightening"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 8,
        name: "Dot & Key Watermelon Sleeping Mask",
        image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=600&q=80",
        priceTier: "₹₹",
        why: "Replenishes moisture lost during the day without feeling greasy on the pillow — a real problem with heavier night creams in summer. Made the list for that reason specifically.",
        tags: ["Overnight hydration", "Non-greasy"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 9,
        name: "Biotique Bio Papaya Scrub",
        image: "https://images.unsplash.com/photo-1608248597674-db17ce723c22?w=600&q=80",
        priceTier: "₹",
        why: "A gentle enough exfoliant to use twice a week without irritation, which matters more in summer when skin is already stressed by heat and sweat.",
        tags: ["Gentle exfoliant", "Natural formula"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      },
      {
        rank: 10,
        name: "Nivea Soft Light Moisturizer",
        image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=600&q=80",
        priceTier: "₹",
        why: "Closes out the list as the all-purpose, everyone-already-has-it option — not exciting, but reliably non-greasy and cheap enough to use liberally.",
        tags: ["All-purpose", "Budget pick"],
        stores: [{ name: "Nykaa Fashion", url: "#" }]
      }
    ]
  },
  {
    slug: "top-6-wfh-gadgets",
    title: "Top 6 Work-From-Home Gadgets Worth Buying",
    category: "Tech",
    categoryIcon: "💻",
    excerpt: "The desk gadgets that actually improve a WFH setup — not just ones that look good in a webcam frame.",
    metaDescription: "6 work-from-home gadgets worth buying in India — picked for genuine day-to-day usefulness, not gimmick value.",
    keywords: "WFH gadgets, work from home setup, desk accessories India, best laptop stand",
    coverImage: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&q=80",
    date: "2026-07-15",
    updated: "2026-07-15",
    readTime: 5,
    author: "LootLo Editorial",
    intro: [
      "Most WFH gadget lists are just whatever's trending. We only kept things here that solved a specific daily annoyance — neck strain, tangled cables, a laptop fan running hot by 11am — and skipped the gadgets that look nice in photos but sit unused after week one."
    ],
    methodology: "Selected for solving a specific, common WFH problem — not for novelty or unboxing appeal.",
    items: [
      {
        rank: 1,
        name: "Portronics Adjustable Laptop Stand",
        image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&q=80",
        priceTier: "₹₹",
        badge: "Top Pick",
        why: "Raising the screen to eye level made the single biggest difference to neck strain of anything on this list. If you buy one thing, make it this.",
        tags: ["Ergonomic", "Adjustable height"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 2,
        name: "Logitech MX Anywhere Mouse",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
        priceTier: "₹₹₹",
        why: "Works reliably on glass and uneven desk surfaces where cheaper optical mice fail — a small but constant frustration this one just removes.",
        tags: ["Multi-surface tracking", "Wireless"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 3,
        name: "boAt Deuce USB-C Cable (2m)",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
        priceTier: "₹",
        why: "The extra length means you're not tethered right next to a wall socket — genuinely changes how flexible your desk setup can be, for very little money.",
        tags: ["2m length", "Durable braiding"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 4,
        name: "Zebronics Zeb-Transformer M Speaker",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
        priceTier: "₹₹",
        why: "Laptop speakers are consistently thin and tinny on calls — this fixes that without needing a full desktop audio setup.",
        tags: ["Desk speaker", "Clear call audio"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 5,
        name: "Ambrane 10-in-1 USB-C Hub",
        image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&q=80",
        priceTier: "₹₹",
        why: "Solves the single-port laptop problem in one purchase instead of buying dongles one at a time as you run into each limitation.",
        tags: ["Multi-port", "One-cable setup"],
        stores: [{ name: "Myntra", url: "#" }]
      },
      {
        rank: 6,
        name: "Portronics Laptop Cooling Pad",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80",
        priceTier: "₹",
        why: "Closes the list as the cheap fix for laptops that throttle or get uncomfortably hot after a few hours of back-to-back calls.",
        tags: ["Active cooling", "Budget pick"],
        stores: [{ name: "Myntra", url: "#" }]
      }
    ]
  }
];

// Helper so both pages can share one lookup pattern
function getPostBySlug(slug) {
  return blogPosts.find(p => p.slug === slug) || null;
}

function getRelatedPosts(currentSlug, count = 3) {
  return blogPosts.filter(p => p.slug !== currentSlug).slice(0, count);
}
