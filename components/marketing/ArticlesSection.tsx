import Image from "next/image";
import Link from "next/link";
import { IcArrow } from "@/components/icons";
import { MarketingWrap } from "./MarketingWrap";
import { ARTICLES, articlePath } from "@/lib/marketing/articles";

export function ArticlesSection() {
  const [featured, ...rest] = ARTICLES;

  return (
    <section id="articles" className="lp-sec">
      <MarketingWrap>
        <div className="lp-art-head">
          <div className="lp-sec-head">
            <span className="lp-eyebrow">The Swapple Guide</span>
            <h2 className="lp-display">
              Learn to read any
              <br />
              aisle like a pro
            </h2>
          </div>
          <Link href="/learn" className="lp-art-more">
            All articles
            <IcArrow s={16} sw={2.1} />
          </Link>
        </div>

        <div className="lp-art-grid">
          <Link href={articlePath(featured.slug)} className="lp-art feat">
            <div className={`lp-art-img${featured.image ? "" : " lp-ph"}`}>
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.imageAlt ?? featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 600px"
                />
              ) : null}
              <span className="lp-art-tag">{featured.tag}</span>
            </div>
            <div className="lp-art-body">
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className="lp-art-meta">
                {featured.category ? (
                  <span className="accent">{featured.category}</span>
                ) : null}
                {featured.category ? <span>·</span> : null}
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Link>

          {rest.map((article) => (
            <Link key={article.slug} href={articlePath(article.slug)} className="lp-art">
              <div className={`lp-art-img${article.image ? "" : " lp-ph"}`}>
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.imageAlt ?? article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 400px"
                  />
                ) : null}
                <span className="label">{article.tag}</span>
              </div>
              <div className="lp-art-body">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="lp-art-meta">
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </MarketingWrap>
    </section>
  );
}
