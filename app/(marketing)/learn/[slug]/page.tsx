import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { ArticlePageContent } from "@/components/marketing/ArticlePageContent";
import { ARTICLES, getArticle, getRelatedArticles } from "@/lib/marketing/articles";
import { PRICING_CARDS_ENABLED } from "@/lib/featureFlags";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: `${article.title} — Swapple Guide`,
    description: article.description,
  };
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);

  return (
    <>
      <MarketingNav showPricing={PRICING_CARDS_ENABLED} />
      <main>
        <ArticlePageContent article={article} related={related} />
      </main>
      <MarketingFooter showPricing={PRICING_CARDS_ENABLED} />
    </>
  );
}
