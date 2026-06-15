import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IcBolt,
  IcCheck,
  IcChevronLeft,
  IcClose,
  IcShield,
} from "@/components/icons";
import { articlePath, type ArticleMeta } from "@/lib/marketing/articles";

function YogurtGuideBody() {
  return (
    <div className="ar-prose">
      <p>
        You already know the basics: check the sugar, count the ingredients, look
        for live cultures. But knowing <em>what</em> to check doesn&apos;t protect
        you from <em>who&apos;s</em> counting on you not to check it. Some of the
        biggest reputations in the dairy aisle are quietly riding on a single good
        product — while the rest of the lineup coasts on the glow.
      </p>

      <h2>The halo effect: how one good product covers for a bad one</h2>
      <p>
        Here&apos;s the trick brands have figured out. Build your reputation on one
        hero product — a probiotic claim, a &ldquo;Greek-style&rdquo; label, an
        &ldquo;Icelandic heritage&rdquo; story, a &ldquo;plant-based&rdquo; badge
        — and that reputation radiates outward to <em>everything else with your logo
        on it</em>. Shoppers stop reading labels for the rest of the lineup because
        the brand already &ldquo;passed the vibe check.&rdquo;
      </p>

      <blockquote className="ar-quote">
        The flagship product earns the trust. The flavored, mixed-in, sweetened
        version spends it.
      </blockquote>

      <p>
        This is the single most useful lens for the yogurt aisle, and it applies
        across categories you&apos;d never think to group together.
      </p>

      <div className="ar-callout">
        <div>
          <h4>The halo checklist</h4>
          <p>
            Before you trust a cup because of the <em>brand</em>, ask: is this the
            specific product that earned the brand its reputation, or a
            flavored/mixed-in/sweetened cousin riding on it? The cousin is where
            added sugar hides.
          </p>
        </div>
      </div>

      <h2>Probiotic-forward brands: great pitch, sneaky fine print</h2>
      <p>
        A brand whose entire identity is &ldquo;good for your gut&rdquo; has every
        incentive to keep that promise front and center — and every incentive to
        bury the sugar count underneath it. A flavored probiotic cup can carry
        14–17g of added sugar, which is more than some products that are{" "}
        <em>honestly marketed as dessert</em>. The probiotic claim isn&apos;t false.
        It&apos;s just doing a lot of distracting.
      </p>

      <h2>&ldquo;Greek-style mix-ins&rdquo;: the protein halo in disguise</h2>
      <p>
        Greek yogurt earned its reputation fair and square — high protein, low
        sugar, simple ingredients. The problem is what happens when a Greek-yogurt
        brand launches a line with candy pieces, cookie crumbles, or granola swirled
        in. You&apos;re buying it <em>because</em> it says Greek on the label,
        assuming the protein-forward, low-sugar profile carries over. The mix-ins
        can push added sugar past 15g — while the brand&apos;s &ldquo;healthy
        Greek&rdquo; reputation does the heavy lifting on your trust.
      </p>

      <div className="ar-compare">
        <div className="ar-ex good">
          <h4>Plain Greek — Good</h4>
          <ul>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> 0g added sugar
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> 15g protein per cup
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Live active cultures listed
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Two ingredients: milk, cultures
            </li>
          </ul>
        </div>
        <div className="ar-ex bad">
          <h4>&ldquo;Greek-style&rdquo; mix-in cup — Caution</h4>
          <ul>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> 15g+ added sugar from
              candy/cookie pieces
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Protein diluted by the
              mix-in portion
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Same brand, same shelf,
              very different verdict
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Trust transferred from the
              plain line — incorrectly
            </li>
          </ul>
        </div>
      </div>

      <h2>The &ldquo;basic&rdquo; carton that&apos;s actually the smart money</h2>
      <p>
        Here&apos;s a halo working in reverse: store-brand plain Greek yogurt often
        gets passed over because it <em>looks</em> generic — plain packaging, no
        story, no heritage claim. But plain Greek yogurt is one of the most
        commoditized products in the dairy case. The ingredient list is milk and
        cultures, full stop, and the nutrition profile of a store-brand plain Greek
        cup is frequently indistinguishable from a premium-positioned one — sometimes
        0g sugar and 15–18g protein, at a meaningfully lower price.
      </p>
      <p>The &ldquo;basic&rdquo; cup isn&apos;t cutting corners. It just isn&apos;t paying for a story.</p>

      <h2>The heritage halo: &ldquo;ancient recipe&rdquo; doesn&apos;t mean &ldquo;different nutrition&rdquo;</h2>
      <p>
        Yogurts that lean on a heritage story — Icelandic, Bulgarian, &ldquo;old
        world&rdquo; anything — often <em>do</em> deliver on the low-sugar,
        high-protein promise for their core product. That part&apos;s real. What&apos;s
        worth knowing is that the heritage framing can also justify a price premium
        that isn&apos;t backed by a meaningfully different nutrition profile than a
        well-made yogurt without the story. And just like the Greek-style halo above,
        a flavored line from a heritage brand doesn&apos;t automatically inherit the
        restraint of its plain version — check each cup, not the legend on the carton.
      </p>

      <h2>If plain Greek tastes too sour for you, here&apos;s the actual upgrade path</h2>
      <p>
        Plenty of people bounce off plain Greek yogurt because it&apos;s genuinely
        tart, and the &ldquo;solution&rdquo; they reach for is a flavored cup loaded
        with 15–19g of added sugar. There&apos;s a better middle path:
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Swapple verdict preview</h4>
          <p>
            A <strong>zero-added-sugar, stevia-sweetened Greek yogurt</strong> typically
            lands a <strong>Good</strong> verdict for sugar-conscious priorities while
            still delivering 15g+ protein — a real option if plain feels too tart but a
            19g-sugar flavored cup feels like too much.
          </p>
        </div>
      </div>

      <p>
        And if even that doesn&apos;t hit the sweetness you&apos;re after: a small
        spoonful of honey or maple syrup stirred into plain Greek yourself almost
        always lands under what a pre-flavored cup contains by default — and you
        control the exact amount.
      </p>

      <h2>The plant-based halo: where &ldquo;dairy-free&rdquo; gets read as &ldquo;healthier&rdquo;</h2>
      <p>
        This is the newest and arguably strongest halo in the aisle. &ldquo;Plant-based&rdquo;
        carries such a strong health connotation that shoppers often stop checking the
        rest of the label entirely. But oat-based yogurts frequently land around 5–8g
        sugar <em>and</em> only 1–3g protein per serving — a worse sugar-to-protein
        ratio than a middle-of-the-road dairy yogurt. Almond-based versions can dip
        under 1g of protein per serving, putting them nutritionally closer to a
        flavored beverage than to yogurt — something the word &ldquo;yogurt&rdquo; on
        the front of the package quietly papers over.
      </p>
      <p>
        None of this means plant-based yogurt is bad. It means &ldquo;plant-based&rdquo;
        answers a different question (what it&apos;s made from) than the one most people
        are actually asking (is this a good source of protein with controlled sugar) —
        and the halo lets one substitute for the other.
      </p>

      <div className="ar-scan">
        <h3>Find the halos on your shelf</h3>
        <p>
          Point Swapple at any carton — flagship or flavored, name brand or store brand
          — and get a verdict based on what&apos;s actually in <em>that cup</em>, not
          what the brand is known for.
        </p>
        <Link href="/sign-in" className="lp-btn lp-btn-white ar-scan-btn">
          Try a free scan
        </Link>
      </div>

      <h2>The bottom line</h2>
      <p>
        Brand reputations are built on specific products, not entire lineups. The
        probiotic claim, the Greek-style label, the heritage story, the plant-based
        badge — each one is true of <em>something</em> in that brand&apos;s lineup.
        The surprising part is how rarely it&apos;s true of <em>everything</em>, and
        how much that one good product is quietly vouching for all the others.
      </p>
    </div>
  );
}

function SalmonGuideBody() {
  return (
    <div className="ar-prose">
      <p>
        You&apos;ve heard the rule: wild is better, farmed is the compromise. But
        that rule is doing the same thing every food halo does — letting one word
        on a sticker stand in for everything you&apos;d actually want to know.
        &ldquo;Wild-caught&rdquo; isn&apos;t a nutrition guarantee, and
        &ldquo;farmed&rdquo; isn&apos;t a contamination sentence. The real story
        is hiding in details the sticker was never designed to tell you.
      </p>

      <h2>The halo on &ldquo;wild-caught&rdquo;</h2>
      <p>
        &ldquo;Wild-caught&rdquo; sounds like a single, trustworthy category — but
        it covers an enormous range of species, fisheries, and seasons, and the halo
        lets all of them borrow the reputation of the best of them. A wild sockeye
        and a wild pink salmon are both &ldquo;wild-caught,&rdquo; but they&apos;re
        not nutritionally interchangeable, and neither is a fish caught at peak
        season versus one caught and frozen months earlier. The word does the
        marketing; the species and handling do the actual work.
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Swapple verdict preview</h4>
          <p>
            Wild-caught Alaskan sockeye typically earns a <strong>Good</strong>{" "}
            verdict across the board — high omega-3s, well-managed fishery. A vague
            &ldquo;wild-caught&rdquo; label with no species or origin listed is
            closer to <strong>Caution</strong>: the claim may be true, but you
            can&apos;t verify what you&apos;re actually getting.
          </p>
        </div>
      </div>

      <h2>The halo on &ldquo;farmed&rdquo; — and why it&apos;s not the villain you think</h2>
      <p>
        Here&apos;s the surprising part: &ldquo;farmed&rdquo; has become shorthand
        for &ldquo;lower quality,&rdquo; but the actual range of outcomes in farmed
        salmon is <em>wider</em> than the range in wild salmon — which means some
        farmed salmon beats some wild salmon, and some farmed salmon is exactly the
        corner-cutting product people assume all farmed salmon is. The word
        &ldquo;farmed&rdquo; tells you about the production method. It tells you
        almost nothing about the result.
      </p>

      <div className="ar-compare">
        <div className="ar-ex good">
          <div className="ar-ex-img ar-ph">
            <span>Certified farmed</span>
          </div>
          <h4>ASC/BAP-certified farmed — Good</h4>
          <ul>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Comparable omega-3s
              to mid-range wild
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Audited feed and waste
              standards
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Consistent year-round
              availability
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Often the better-value
              pick
            </li>
          </ul>
        </div>
        <div className="ar-ex bad">
          <div className="ar-ex-img ar-ph">
            <span>Uncertified farmed</span>
          </div>
          <h4>Uncertified, unlabeled farmed — Caution</h4>
          <ul>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Omega-3 content varies
              widely by feed
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> No third-party
              oversight on practices
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> &ldquo;Farmed&rdquo; is
              the only info on the sticker
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Price advantage may
              reflect the gap
            </li>
          </ul>
        </div>
      </div>

      <blockquote className="ar-quote">
        &ldquo;Wild&rdquo; tells you where it swam. &ldquo;Farmed&rdquo; tells you
        where it grew. Neither one tells you what&apos;s actually on the fillet.
      </blockquote>

      <h2>The contaminant story isn&apos;t as one-sided as you&apos;d guess</h2>
      <p>
        The common assumption is that wild salmon is the &ldquo;clean&rdquo; choice
        and farmed salmon carries more contaminants. That&apos;s sometimes true — but
        it depends heavily on <em>which</em> wild population and <em>which</em>{" "}
        farm, because contaminant levels track pollution exposure and feed sourcing,
        not the wild/farmed label itself. A wild fish from a heavily trafficked
        migratory route can carry a different contaminant profile than a wild fish
        from a remote fishery, just as a poorly-regulated farm can differ enormously
        from a certified one. The wild/farmed axis is a rough proxy — it&apos;s not
        the actual variable that matters.
      </p>

      <h2>The &ldquo;color-added&rdquo; word that quietly does the most work</h2>
      <p>
        Farmed salmon&apos;s flesh color often comes from added pigment in the feed
        — and while this gets framed as the most damning thing on the label,
        it&apos;s actually the most <em>transparent</em> one, because regulations
        require it to be disclosed. The bigger blind spot is what&apos;s happening
        on labels that <em>don&apos;t</em> say &ldquo;color added&rdquo; at all:
        wild salmon&apos;s color comes from its natural diet, but that diet (and
        therefore the nutrition that comes with it) varies by species and season in
        ways the sticker never breaks down. The disclosed variable isn&apos;t the
        one you should be most worried about.
      </p>

      <h2>What this means if you&apos;re optimizing for omega-3s on a budget</h2>
      <p>
        If your actual goal is omega-3 intake per dollar, the wild/farmed framing can
        lead you astray. A few things worth knowing:
      </p>
      <ul>
        <li>
          <strong>Canned wild salmon (especially sockeye or pink)</strong> is
          frequently one of the best omega-3-per-dollar options in the entire store
          — far cheaper than fresh fillets, with a nutrition profile that holds up
          well because it&apos;s processed near catch.
        </li>
        <li>
          <strong>Certified farmed salmon</strong> can deliver omega-3 levels in the
          same range as mid-tier wild salmon, often at a lower price point — the
          certification is doing more useful work than the wild/farmed label.
        </li>
        <li>
          <strong>Frozen wild fillets</strong> often beat &ldquo;fresh&rdquo; wild
          fillets on both price and nutrition, since &ldquo;fresh&rdquo; counter fish
          may have been previously frozen and thawed anyway — you&apos;re sometimes
          paying a premium for a word, not a difference.
        </li>
      </ul>

      <div className="ar-scan">
        <h3>Scan your salmon in seconds</h3>
        <p>
          Point Swapple at any package — fresh, frozen, or canned — and get a verdict
          based on species, certification, and what&apos;s actually in{" "}
          <em>that fillet</em>, not just the wild-or-farmed headline.
        </p>
        <Link href="/sign-in" className="lp-btn lp-btn-white ar-scan-btn">
          Try a free scan
        </Link>
      </div>

      <h2>The bottom line</h2>
      <p>
        &ldquo;Wild vs. farmed&rdquo; isn&apos;t a wrong question — it&apos;s just a
        much smaller part of the answer than the sticker implies. Species,
        certification, and how the fish was handled after catch tell you more than
        the production method alone. The two-word label is a halo doing the job of a
        full nutrition panel, and it can&apos;t.
      </p>
    </div>
  );
}

function CerealGuideBody() {
  return (
    <div className="ar-prose">
      <p>
        By now you know the cereal aisle is a minefield of &ldquo;heart
        healthy,&rdquo; &ldquo;made with whole grains,&rdquo; and cartoon
        mascots doing a lot of emotional labor. But the surprising part
        isn&apos;t that cereal marketing oversells — it&apos;s <em>which</em>{" "}
        cereals get away with it, and which &ldquo;kid&rdquo; cereals are
        quietly better than the &ldquo;adult&rdquo; ones sitting two shelves
        up.
      </p>

      <h2>The &ldquo;whole grain&rdquo; halo doesn&apos;t mean what you think</h2>
      <p>
        &ldquo;Whole grain&rdquo; is a true claim almost everywhere it appears —
        and that&apos;s exactly the problem. A box can lead with &ldquo;whole
        grain&rdquo; in giant letters while whole grain wheat is the{" "}
        <em>fourth</em> ingredient, behind sugar, corn syrup, and a sugar
        variant with a different name. The claim is accurate. It&apos;s also
        doing nothing to tell you where that grain sits in the ingredient list,
        or how much sugar is riding alongside it.
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Swapple verdict preview</h4>
          <p>
            A cereal with a fiber-to-sugar ratio above 1.0 — meaning more grams
            of fiber than added sugar per serving — typically earns a{" "}
            <strong>Good</strong> verdict regardless of what&apos;s on the
            front of the box. Below 0.3, and &ldquo;whole grain&rdquo; or not,
            you&apos;re in <strong>Caution</strong> or <strong>Avoid</strong>{" "}
            territory.
          </p>
        </div>
      </div>

      <h2>The fiber-to-sugar ratio: the one number that cuts through everything</h2>
      <p>
        Here&apos;s the math that actually settles it, and it takes less time
        than reading the front of the box:
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Quick rule</h4>
          <p>
            Divide grams of fiber by grams of added sugar per serving.{" "}
            <strong>Above 1.0</strong> is a genuinely strong cereal.{" "}
            <strong>0.3 to 1.0</strong> is middle-of-the-road — fine
            occasionally. <strong>Below 0.3</strong> means you&apos;re eating a
            sugar delivery system with a cereal-shaped marketing budget.
          </p>
        </div>
      </div>

      <p>
        This single ratio flips a surprising number of boxes that look identical
        on the front.
      </p>

      <h2>
        The surprising part: some &ldquo;adult&rdquo; cereals lose to
        &ldquo;kids&apos;&rdquo; cereals
      </h2>
      <p>
        Here&apos;s where it gets interesting. The cereal aisle is segmented by{" "}
        <em>who the box is talking to</em> — &ldquo;adult,&rdquo;
        health-positioned boxes use beige packaging, mature fonts, and words
        like &ldquo;ancient grains&rdquo; or &ldquo;protein.&rdquo; Kids&apos;
        cereals use cartoon characters and bright colors. The assumption is that
        the adult shelf is automatically the better-for-you shelf.
      </p>
      <p>It often isn&apos;t.</p>

      <div className="ar-compare">
        <div className="ar-ex good">
          <div className="ar-ex-img ar-ph">
            <span>High-fiber flakes</span>
          </div>
          <h4>High-fiber bran cereal — Good</h4>
          <ul>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> 5g+ fiber, under
              5g added sugar
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Fiber-to-sugar
              ratio over 1.0
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Whole grain is
              the first ingredient
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Unglamorous
              packaging, undersells itself
            </li>
          </ul>
        </div>
        <div className="ar-ex bad">
          <div className="ar-ex-img ar-ph">
            <span>&ldquo;Ancient grain&rdquo; cereal</span>
          </div>
          <h4>&ldquo;Adult&rdquo; granola-style cereal — Caution</h4>
          <ul>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> 12–16g added
              sugar per serving
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Fiber-to-sugar
              ratio under 0.3
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> &ldquo;Honey&rdquo;
              and oils often outrank the grain
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> &ldquo;Ancient
              grains&rdquo; claim covers for the rest
            </li>
          </ul>
        </div>
      </div>

      <blockquote className="ar-quote">
        The box doesn&apos;t have to lie. It just has to put the truth somewhere
        you won&apos;t look.
      </blockquote>

      <h2>&ldquo;Made with real fruit&rdquo; — true, and almost beside the point</h2>
      <p>
        This claim is usually accurate in a narrow, technical sense: there is
        real fruit, or real fruit juice concentrate, somewhere in the
        formulation. What it doesn&apos;t tell you is the <em>quantity</em> —
        often a small fraction of the total — or that fruit juice concentrate is
        processed in a way that strips the fiber and leaves behind something
        that behaves like added sugar on the ingredient list and in your body.
        &ldquo;Real fruit&rdquo; is true. &ldquo;Mostly sugar with a
        fruit-shaped alibi&rdquo; would also be true, and the box only prints
        one of them.
      </p>

      <h2>
        What about granola? The &ldquo;healthiest&rdquo; cereal aisle item is
        often the worst offender
      </h2>
      <p>
        If there&apos;s one category where the health halo runs hardest into the
        fiber-to-sugar math, it&apos;s granola. Granola&apos;s entire identity —
        oats, nuts, &ldquo;wholesome,&rdquo; often sold near the health food
        section rather than with other cereals — primes you to skip the label
        entirely. But the combination of oils and sweeteners used to get that
        clustered, crunchy texture means granola frequently posts some of the
        worst fiber-to-sugar ratios in the whole aisle, sometimes worse than
        cereals explicitly marketed as treats. The halo here isn&apos;t a
        brand&apos;s reputation — it&apos;s the <em>category&apos;s</em>{" "}
        reputation, and it&apos;s strong enough that people pour it over yogurt
        assuming it&apos;s the healthy addition.
      </p>

      <h2>
        If you genuinely want something sweet — better paths than the marketing
        aisle
      </h2>
      <ul>
        <li>
          <strong>A plain high-fiber cereal with fruit added yourself</strong>{" "}
          (banana, berries) gets you natural sweetness plus the fiber, rather
          than a cereal where &ldquo;fruit&rdquo; is doing PR work for added
          sugar.
        </li>
        <li>
          <strong>
            A small amount of a sweeter cereal mixed into a high-fiber base
          </strong>{" "}
          lets you keep the ratio reasonable while still getting the flavor —
          portion control via mixing, not deprivation.
        </li>
        <li>
          <strong>Unsweetened cereal + your own sweetener</strong> (a teaspoon
          of honey, same as the yogurt fix) puts you in control of the actual
          gram count instead of inheriting whatever the formulation team decided
          was &ldquo;enough.&rdquo;
        </li>
      </ul>

      <div className="ar-scan">
        <h3>Scan your cereal in seconds</h3>
        <p>
          Point Swapple at any box — bran, granola, &ldquo;ancient grain,&rdquo;
          or cartoon mascot — and get a verdict based on the fiber-to-sugar math,
          not the front-of-box claims.
        </p>
        <Link href="/sign-in" className="lp-btn lp-btn-white ar-scan-btn">
          Try a free scan
        </Link>
      </div>

      <h2>The bottom line</h2>
      <p>
        &ldquo;Whole grain,&rdquo; &ldquo;made with real fruit,&rdquo; and
        &ldquo;ancient grains&rdquo; are all claims that can be true and still
        tell you almost nothing about whether a cereal is good for you. The
        fiber-to-sugar ratio is the number that was never designed to be on the
        front of the box — which is exactly why it&apos;s the one worth
        checking.
      </p>
    </div>
  );
}

function OliveOilGuideBody() {
  return (
    <div className="ar-prose">
      <p>
        &ldquo;Extra virgin&rdquo; is the most trusted phrase on the entire bottle
        — and the most overworked. It&apos;s a real classification, but it&apos;s
        also become the word brands lean on so hard that everything else on the
        label gets ignored. The surprising part isn&apos;t that some &ldquo;extra
        virgin&rdquo; oil isn&apos;t great. It&apos;s how much information sits two
        inches away from that phrase, completely unread, that would actually tell
        you whether the bottle is worth it.
      </p>

      <h2>The halo on &ldquo;extra virgin&rdquo; itself</h2>
      <p>
        &ldquo;Extra virgin&rdquo; is a grade based on acidity and processing
        method — it&apos;s a real, meaningful standard. But it&apos;s also a{" "}
        <em>floor</em>, not a ceiling, and the gap between a bottle that barely
        qualifies and one that&apos;s exceptional is enormous. Because &ldquo;extra
        virgin&rdquo; has become shorthand for &ldquo;the good kind,&rdquo;
        shoppers often stop there — treating it as the finish line when it&apos;s
        actually just the entry ticket.
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Swapple verdict preview</h4>
          <p>
            An extra virgin olive oil with a <strong>harvest date</strong>, a{" "}
            <strong>single named origin</strong>, and{" "}
            <strong>dark glass or tin</strong> packaging typically earns a{" "}
            <strong>Good</strong> verdict. &ldquo;Extra virgin&rdquo; alone, with
            none of those three, lands in <strong>Caution</strong> — not because
            it&apos;s necessarily bad, but because you have no way to tell.
          </p>
        </div>
      </div>

      <h2>The date that matters isn&apos;t the one on the front</h2>
      <p>
        Every bottle has a &ldquo;best by&rdquo; date — and it&apos;s nearly
        useless, because olive oil producers can set it years out regardless of
        when the olives were actually pressed. The date that actually tells you
        something is the <strong>harvest date</strong>, and it&apos;s the one
        most shoppers have never thought to look for. Olive oil is, in a real
        sense, a seasonal product whose quality degrades from the moment of
        pressing — and the bottle&apos;s most prominent date is the one least
        connected to that fact.
      </p>

      <blockquote className="ar-quote">
        The &ldquo;best by&rdquo; date tells you when the bottle expires. The
        harvest date tells you how long it&apos;s already been declining.
      </blockquote>

      <h2>&ldquo;Blended&rdquo; isn&apos;t a red flag — vagueness is</h2>
      <p>
        A lot of advice treats any blend as suspicious, but that&apos;s not quite
        right. The actual signal is whether the label names a{" "}
        <em>single country or region</em> versus a vague &ldquo;blend of oils
        from [list of several countries].&rdquo; A single-origin oil can be
        traced, audited, and held to one region&apos;s standards. A multi-country
        blend isn&apos;t automatically lower quality — but it&apos;s much harder
        to verify, and &ldquo;blend of EU and non-EU oils&rdquo; is doing the
        same vagueness work that &ldquo;natural flavors&rdquo; does on a food
        label.
      </p>

      <div className="ar-compare">
        <div className="ar-ex good">
          <div className="ar-ex-img ar-ph">
            <span>Single-origin EVOO</span>
          </div>
          <h4>Single-origin, dated, dark glass — Good</h4>
          <ul>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Harvest date listed
              (not just best-by)
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> One named country or
              region
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> &ldquo;Cold-pressed&rdquo;
              or &ldquo;first cold pressed&rdquo; on back
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Dark glass or tin,
              not clear bottle
            </li>
          </ul>
        </div>
        <div className="ar-ex bad">
          <div className="ar-ex-img ar-ph">
            <span>Generic &ldquo;EVOO&rdquo; blend</span>
          </div>
          <h4>&ldquo;Extra virgin&rdquo; alone, clear bottle — Caution</h4>
          <ul>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Only a &ldquo;best
              by&rdquo; date, no harvest date
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> &ldquo;Blend of oils
              from several countries&rdquo;
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> No mention of
              pressing method
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Clear bottle on a
              sunlit shelf
            </li>
          </ul>
        </div>
      </div>

      <h2>The light exposure problem nobody mentions</h2>
      <p>
        Here&apos;s something genuinely surprising: a high-quality extra virgin oil
        sold in a <strong>clear glass bottle, sitting under store lighting</strong>,
        can degrade faster on the shelf than a lower-grade oil in a{" "}
        <strong>dark, light-blocking container</strong>. Light is one of the
        fastest ways to break down the compounds that make extra virgin oil
        valuable in the first place. The bottle&apos;s grade tells you what it{" "}
        <em>was</em> at the moment of pressing. The packaging tells you what
        it&apos;s becoming while it sits there waiting for you to buy it — and
        clear glass is often used precisely on the premium-positioned bottles
        meant to look &ldquo;pure&rdquo; and photogenic.
      </p>

      <h2>
        &ldquo;Light,&rdquo; &ldquo;pure,&rdquo; and &ldquo;extra light&rdquo; —
        the halo working in reverse
      </h2>
      <p>
        These terms sound like health claims — &ldquo;light&rdquo; suggests fewer
        calories or a gentler product. In olive oil, they actually refer to a
        more processed, more refined oil with a milder flavor, and calorically
        there&apos;s essentially no difference from extra virgin. This is a rare
        case where a wellness-sounding word describes something <em>less</em> like
        the original product, not more — the opposite of how &ldquo;light&rdquo;
        usually signals a halo. If you&apos;re buying &ldquo;light&rdquo; olive
        oil for health reasons, the word is quietly pointing you in the wrong
        direction.
      </p>

      <h2>
        What &ldquo;cold-pressed&rdquo; actually adds — and why it&apos;s on the
        back
      </h2>
      <p>
        &ldquo;Cold-pressed&rdquo; or &ldquo;first cold pressed&rdquo; refers to
        extraction without heat or chemical solvents, which preserves more of the
        oil&apos;s natural compounds. It&apos;s arguably more informative than
        &ldquo;extra virgin&rdquo; alone, and yet it almost always appears in
        smaller print on the back panel — while &ldquo;extra virgin&rdquo; gets
        the front-of-bottle treatment. The more specific, more verifiable claim
        is the one that didn&apos;t get the marketing budget.
      </p>

      <div className="ar-scan">
        <h3>Decode your olive oil in seconds</h3>
        <p>
          Point Swapple at any bottle and get a verdict based on harvest date,
          origin, and packaging — not just whether it says &ldquo;extra
          virgin&rdquo; on the front.
        </p>
        <Link href="/sign-in" className="lp-btn lp-btn-white ar-scan-btn">
          Try a free scan
        </Link>
      </div>

      <h2>The bottom line</h2>
      <p>
        &ldquo;Extra virgin&rdquo; is real, but it&apos;s the floor of the
        category, not a guarantee of what&apos;s actually in the bottle. A harvest
        date, a single named origin, and dark packaging tell you more than the
        grade ever will — and they&apos;re sitting right there on the label, just
        never where the marketing wants your eyes to go.
      </p>
    </div>
  );
}

function ProteinBarGuideBody() {
  return (
    <div className="ar-prose">
      <p>
        &ldquo;Protein bar&rdquo; might be the single most successful halo in the
        entire snack aisle. The word &ldquo;protein&rdquo; on the wrapper does so
        much work that it can override everything else — texture, ingredient list,
        even the fact that the bar is, nutritionally, closer to a candy bar with a
        gym membership. The surprising part isn&apos;t that some protein bars are
        basically candy. It&apos;s how confidently the <em>protein number alone</em>{" "}
        gets used to wave that fact away.
      </p>

      <h2>The halo on &ldquo;high protein&rdquo; itself</h2>
      <p>
        A bar can legitimately advertise 20g of protein and still be a poor
        choice — because the protein number is presented in isolation, disconnected
        from what&apos;s sitting next to it. &ldquo;High protein&rdquo; is true.
        It&apos;s also the number brands know you&apos;re scanning for first, which
        means it&apos;s the number most likely to be doing halo work for the rest
        of the label.
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Swapple verdict preview</h4>
          <p>
            A bar where <strong>protein outweighs added sugar by 2x or more</strong>
            , built on <strong>whole-food ingredients</strong>, typically earns a{" "}
            <strong>Good</strong> verdict. A bar with an impressive protein number
            but added sugar in the same range — or higher — often lands in{" "}
            <strong>Caution</strong>, regardless of how the front of the wrapper
            frames it.
          </p>
        </div>
      </div>

      <h2>The four-point test, and why it works</h2>
      <p>
        Here&apos;s the test that actually separates a real snack from a candy bar
        in a gym outfit — and notice that none of these four things is &ldquo;how
        much protein does it have&rdquo;:
      </p>

      <div className="ar-callout">
        <div className="ic">
          <IcBolt s={22} sw={2} />
        </div>
        <div>
          <h4>Quick rule</h4>
          <p>
            Protein vs. added sugar (protein should win, ideally 2x or more),
            ingredient count (under 10 whole-food ingredients is a good sign),
            fiber source (oats or nuts, not isolated fiber syrups), and calorie
            density (under 250 kcal for a snack-sized bar). A bar can pass the
            protein headline and fail all four of these.
          </p>
        </div>
      </div>

      <h2>
        &ldquo;Fiber-filled&rdquo; — true, and possibly the most misleading word
        on the wrapper
      </h2>
      <p>
        This is the genuinely surprising one. A bar can list 10g+ of fiber and
        market itself as a fiber-rich choice — but if that fiber comes from
        isolated fiber syrups (the kind used partly to offset sugar on the
        nutrition panel, and partly because they&apos;re sweet), it doesn&apos;t
        behave the same way in your body as fiber from oats, nuts, or whole
        grains. Some of these isolated fibers are also notorious for causing
        digestive discomfort at the doses found in protein bars — something the
        &ldquo;20g protein, 10g fiber!&rdquo; headline never warns you about. The
        fiber number can be technically accurate and still not mean what the word
        &ldquo;fiber&rdquo; usually implies.
      </p>

      <div className="ar-compare">
        <div className="ar-ex good">
          <div className="ar-ex-img ar-ph">
            <span>Whole-food bar</span>
          </div>
          <h4>Whole-food ingredient bar — Good</h4>
          <ul>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Protein source is
              eggs, nuts, or dairy
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Fiber from oats,
              nuts, or dates
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Under 10
              ingredients, all recognizable
            </li>
            <li>
              <IcCheck s={16} sw={2.5} className="shrink-0" /> Protein clears
              added sugar by 2x+
            </li>
          </ul>
        </div>
        <div className="ar-ex bad">
          <div className="ar-ex-img ar-ph">
            <span>Dessert-style bar</span>
          </div>
          <h4>&ldquo;Dessert flavor&rdquo; protein bar — Caution</h4>
          <ul>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Fiber from isolated
              fiber syrup
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Added sugar close
              to or exceeding protein
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Coatings and
              inclusions add 100+ kcal
            </li>
            <li>
              <IcClose s={16} sw={2.5} className="shrink-0" /> Flavor name does
              the marketing (&ldquo;cheesecake,&rdquo; &ldquo;cookie dough&rdquo;)
            </li>
          </ul>
        </div>
      </div>

      <blockquote className="ar-quote">
        The protein number is the headline. The fiber source is the footnote. Read
        the footnote first.
      </blockquote>

      <h2>The &ldquo;dessert flavor&rdquo; naming convention is itself a tell</h2>
      <p>
        Here&apos;s a pattern worth noticing once you see it: bars named after
        desserts — cheesecake, cookie dough, brownie, cinnamon roll — are
        signaling something about formulation, not just flavor. To hit those flavor
        profiles, bars typically lean harder on sugars, chocolate or candy-style
        coatings, and inclusions (chips, swirls, pieces) that add calories
        without adding protein or fiber. A bar named after a fruit, a grain, or a
        nut tends to be closer to its named ingredient. A bar named after a
        dessert is, often, closer to being one — and the protein number on the
        front is what makes that feel okay.
      </p>

      <h2>
        Coatings and inclusions: where the &ldquo;extra&rdquo; calories actually
        live
      </h2>
      <p>
        If you compare two bars with similar protein and similar base ingredients,
        the calorie gap between them is often explained by what&apos;s layered on
        top — a chocolate coating, caramel drizzle, candy pieces. These additions
        can add 80–150 calories without meaningfully changing the protein or fiber
        numbers, which means two bars that look nutritionally similar on the front
        panel can differ by a third or more in calories once you account for
        what&apos;s coating them. The calorie-density check from the four-point
        test exists specifically to catch this, because the protein and fiber
        lines won&apos;t.
      </p>

      <h2>If you want something that tastes like dessert — a better path</h2>
      <ul>
        <li>
          <strong>A whole-food bar plus your own add-in</strong> (a few chocolate
          chips, a drizzle of nut butter) lets you get the flavor hit while
          controlling the amount, rather than inheriting whatever ratio the
          formulation team landed on.
        </li>
        <li>
          <strong>Checking the fiber source specifically</strong> — oats, nuts,
          dates, chicory root in moderate amounts — rather than just the fiber gram
          count, tells you whether that number is doing real work or filling a
          gap.
        </li>
        <li>
          <strong>Treating &ldquo;dessert-named&rdquo; bars as dessert</strong> —
          genuinely fine occasionally, but evaluated with the same expectations
          you&apos;d bring to an actual treat, not a snack.
        </li>
      </ul>

      <div className="ar-scan">
        <h3>Scan your protein bar in seconds</h3>
        <p>
          Point Swapple at any wrapper and get a verdict based on the full
          four-point test — not just the protein number on the front.
        </p>
        <Link href="/sign-in" className="lp-btn lp-btn-white ar-scan-btn">
          Try a free scan
        </Link>
      </div>

      <h2>The bottom line</h2>
      <p>
        &ldquo;High protein&rdquo; is the headline number, and headline numbers are
        exactly what marketing optimizes around. The fiber source, the ingredient
        count, the coatings, and how protein stacks up against added sugar tell the
        real story — and none of them are on the front of the wrapper.
      </p>
    </div>
  );
}

const ARTICLE_BODIES: Record<string, () => ReactNode> = {
  "pick-a-yogurt": YogurtGuideBody,
  "wild-vs-farmed-salmon": SalmonGuideBody,
  "reading-cereal-box": CerealGuideBody,
  "olive-oil-aisle": OliveOilGuideBody,
  "protein-bar-or-candy-bar": ProteinBarGuideBody,
};

const ARTICLE_TAGS: Record<string, string[]> = {
  "pick-a-yogurt": ["Yogurt", "Brand halo", "Added sugar", "Buying guide"],
  "wild-vs-farmed-salmon": ["Seafood", "Omega-3", "Wild vs farmed", "Buying guide"],
  "reading-cereal-box": ["Cereal", "Fiber", "Added sugar", "Buying guide"],
  "olive-oil-aisle": ["Olive oil", "Brand halo", "Pantry", "Buying guide"],
  "protein-bar-or-candy-bar": ["Snacks", "Protein", "Added sugar", "Buying guide"],
};

interface ArticlePageContentProps {
  article: ArticleMeta;
  related: ArticleMeta[];
}

export function ArticlePageContent({ article, related }: ArticlePageContentProps) {
  const Body = ARTICLE_BODIES[article.slug] ?? YogurtGuideBody;
  const tags = ARTICLE_TAGS[article.slug] ?? [article.tag];

  return (
    <>
      <article>
        <header className="ar-hero">
          <div className="ar-narrow">
            <Link href="/learn" className="ar-back">
              <IcChevronLeft s={16} sw={2.2} />
              All articles
            </Link>
            <span className="ar-tag">{article.tag}</span>
            <h1 className="ar-title">{article.title}</h1>
            <p className="ar-dek">{article.description}</p>
            <div className="ar-byline">
              <div className="ar-avatar" aria-hidden>
                S
              </div>
              <div>
                <div className="ar-by-name">Swapple Editorial</div>
                <div className="ar-by-meta">Updated June 2026 · {article.readTime}</div>
              </div>
              <span className="ar-by-rev">
                <IcShield s={14} sw={2.5} />
                Reviewed for accuracy
              </span>
            </div>
            {article.image ? (
              <div className="ar-feat">
                <Image
                  src={article.image}
                  alt={article.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>
            ) : (
              <div className="ar-feat ar-ph">
                <span>Featured photo</span>
              </div>
            )}
            {article.imageCaption ? (
              <p className="ar-feat-cap">{article.imageCaption}</p>
            ) : article.image ? null : (
              <p className="ar-feat-cap">
                Plain Greek yogurt with live cultures — a baseline Good pick for most
                eaters.
              </p>
            )}
          </div>
        </header>

        <div className="ar-narrow">
          <Body />

          <footer className="ar-end">
            {tags.map((tag) => (
              <span key={tag} className="ar-pill">
                {tag}
              </span>
            ))}
          </footer>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="ar-related">
          <div className="ar-narrow">
            <span className="ar-tag">Keep reading</span>
            <h2 className="ar-title ar-rel-title">More from the guide</h2>
            <div className="ar-rel-grid">
              {related.map((rel) => (
                <Link key={rel.slug} href={articlePath(rel.slug)} className="ar-rel-card">
                  <span className="ar-tag">{rel.tag}</span>
                  <h4>{rel.title}</h4>
                  <p>{rel.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
