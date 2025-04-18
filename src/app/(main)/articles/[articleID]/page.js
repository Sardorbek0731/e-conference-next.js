import "./article.css";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../../../components/loading/Loading";
import BackButton from "../../../../components/backButton/BackButton";
import { notFound } from "next/navigation";
import { getArticleById } from "../../../../services/articleService";
import { icons } from "../../../../data/data";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { articleID } = params;
  try {
    const article = await getArticleById(articleID);
    if (!article) notFound();

    const publishedDate = article.createdAt
      ? new Date(
          article.createdAt.seconds * 1000 + article.createdAt.nanoseconds / 1e6
        ).toISOString()
      : new Date().toISOString();

    return {
      title: "E-Conference" + " | " + article.title,
      other: {
        citation_title: article.title,
        citation_publication_date: publishedDate.slice(0, 10),
        citation_journal_title: "E-Conference-Online",
        citation_pdf_url: article.pdfURL,
        ...article.authors.reduce(
          (acc, author, index) => ({
            ...acc,
            [`citation_author_${index}`]: author,
          }),
          {}
        ),
      },
    };
  } catch (err) {
    return notFound();
  }
}

async function ArticleContent({ articleID }) {
  const article = await getArticleById(articleID);
  if (!article) notFound();

  const publishedDate = article.createdAt
    ? new Date(
        article.createdAt.seconds * 1000 + article.createdAt.nanoseconds / 1e6
      ).toISOString()
    : new Date().toISOString();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: article.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `http://e-conference-online.com/articles/${article.id}`,
    },
    publisher: {
      "@type": "Organization",
      name: "E-Conference Online",
      logo: {
        "@type": "ImageObject",
        url: "https://e-conference-online.com/assets/logo-Dzx-hfE_.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="article container">
        <div className="articleButtons">
          <BackButton />
          <div className="articePageDownload-buttons">
            <a
              href={article.pdfURL}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="articlePDF"
            >
              <span className="downloadArticleIcon">
                <Image
                  src={icons.downArrow}
                  alt="Download PDF"
                  width={24}
                  height={24}
                />
              </span>
              Download (PDF)
            </a>
            <Link href="https://zenodo.org" className="articlePage-zenodo">
              ZENODO
            </Link>
          </div>
        </div>
        <div className="articleItem">
          <h1 className="articleTitle">{article.title}</h1>
          <h3 className="articleAuther">{article.authors.join(", ")}</h3>
          <div
            className="articleContent"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>
    </>
  );
}

export default function Article({ params }) {
  const { articleID } = params;

  return (
    <Suspense fallback={<Loading isPending={true} />}>
      <ArticleContent articleID={articleID} />
    </Suspense>
  );
}
