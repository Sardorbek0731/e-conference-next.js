"use client";

import "./articles.css";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "../../../hooks/useFetch.js";
import { images } from "../../../data/data.js";
import { getArticles } from "../../../services/articleService.js";

export default function Articles() {
  const { data, isPending, error } = useFetch(getArticles);

  if (error) return <h1>{error}</h1>;

  return (
    <section className="articles">
      <div className="sectionTitle">
        <h1>Articles</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      <div className="articleCards">
        {isPending ? (
          <h1>Loading...</h1>
        ) : (
          data.map(({ title, authors, pdfURL, addedTime, id }) => {
            return (
              <div className="articleCard" key={id}>
                <Link href={`/articles/${id}`}>
                  <div className="articleHeader">
                    <Image src={images.logo} alt="Article Image" />
                    <h3>{title}</h3>
                  </div>
                  <div className="articleBody">
                    <h4>
                      <span>Author: </span>
                      {authors.join(", ")}
                    </h4>
                  </div>
                </Link>

                <div className="articleFooter">
                  <div className="articleDownload-buttons">
                    <a
                      href={pdfURL}
                      download
                      target="_blank"
                      className="downloadPDF"
                    >
                      Download (PDF)
                    </a>
                    <Link href="/" className="zenodo">
                      ZENODO
                    </Link>
                  </div>

                  <h5>{addedTime}</h5>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
