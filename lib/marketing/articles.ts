export interface ArticleMeta {
  slug: string;
  featured: boolean;
  tag: string;
  category?: string;
  readTime: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "pick-a-yogurt",
    featured: true,
    tag: "Buying guide",
    category: "Pantry staples",
    readTime: "7 min read",
    title: 'Why Your "Healthy" Yogurt Might Not Be: The Brand Halo Effect Explained',
    description:
      "You already know the basics: check the sugar, count the ingredients, look for live cultures. But knowing what to check doesn't protect you from who's counting on you not to check it.",
    image: "/images/articles/yogurt-aisle.png",
    imageAlt:
      "Grocery store shelf displaying a wide variety of yogurt brands and flavors, including Greek, organic, and probiotic options.",
    imageCaption:
      "Same logos, wildly different cups — the brand halo lets one good product vouch for the rest of the lineup.",
  },
  {
    slug: "wild-vs-farmed-salmon",
    featured: false,
    tag: "Buying guide",
    readTime: "7 min read",
    title:
      'The Salmon Sticker Is Lying to You (Sort Of): What "Wild" and "Farmed" Actually Hide',
    description:
      'You\'ve heard the rule: wild is better, farmed is the compromise. But that rule is doing the same thing every food halo does — letting one word on a sticker stand in for everything you\'d actually want to know. "Wild-caught" isn\'t a nutrition guarantee, and "farmed" isn\'t a contamination sentence. The real story is hiding in details the sticker was never designed to tell you.',
    image: "/images/articles/salmon-wild-farmed.png",
    imageAlt: "Wild-caught vs farm-raised salmon fillets on ice",
    imageCaption:
      "Side by side on the seafood counter — wild-caught runs deeper red with leaner fat lines; farm-raised is paler with heavier marbling and a lower price tag.",
  },
  {
    slug: "reading-cereal-box",
    featured: false,
    tag: "Buying guide",
    readTime: "7 min read",
    title:
      'The Cereal Aisle\'s Favorite Trick: How "Whole Grain" and "Made With Real Fruit" Hide the Sugar',
    description:
      'By now you know the cereal aisle is a minefield of "heart healthy," "made with whole grains," and cartoon mascots doing a lot of emotional labor. But the surprising part isn\'t which cereals oversell — it\'s which ones get away with it, and which "kid" cereals quietly beat the "adult" ones two shelves up.',
    image: "/images/articles/cereal-aisle.png",
    imageAlt:
      "cereal aisle shelves with classic, organic, and premium brands",
    imageCaption:
      "The aisle sorts by who's on the box — beige \"adult\" packaging up high, cartoon characters below. The better-for-you shelf isn't always where the marketing says it is.",
  },
  {
    slug: "olive-oil-aisle",
    featured: false,
    tag: "Buying guide",
    readTime: "7 min read",
    title:
      '"Extra Virgin" Doesn\'t Mean What You Think: The Olive Oil Halo, Decoded',
    description:
      '"Extra virgin" is the most trusted phrase on the entire bottle — and the most overworked. The surprising part isn\'t that some "extra virgin" oil isn\'t great. It\'s how much information sits two inches away from that phrase, completely unread.',
    image: "/images/articles/olive-oil-aisle.png",
    imageAlt:
      "olive oil aisle with extra virgin, refined, light, and pomace varieties",
    imageCaption:
      "Seven types on one shelf — but the grade on the front is only the entry ticket. Harvest date, origin, and packaging tell you what the bottle actually is.",
  },
  {
    slug: "protein-bar-or-candy-bar",
    featured: false,
    tag: "Buying guide",
    readTime: "7 min read",
    title:
      'The Protein Bar Aisle\'s Best Disguise: How "High Protein" Hides a Candy Bar',
    description:
      '"Protein bar" might be the single most successful halo in the entire snack aisle. The word "protein" on the wrapper does so much work that it can override everything else — texture, ingredient list, even the fact that the bar is, nutritionally, closer to a candy bar with a gym membership. The surprising part isn\'t that some protein bars are basically candy. It\'s how confidently the protein number alone gets used to wave that fact away.',
    image: "/images/articles/protein-bar-compare.png",
    imageAlt:
      "RXBAR whole-food ingredients vs Barebells dessert-style protein bars side by side",
    imageCaption:
      "Same snack aisle, two philosophies — one bar lists egg whites and dates on the front; the other sells strawberry cheesecake and caramel cashew. The protein number is the headline; the ingredient list is the footnote.",
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
}

export function articlePath(slug: string): string {
  return `/learn/${slug}`;
}
