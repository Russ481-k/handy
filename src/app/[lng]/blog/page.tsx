"use client";

import { useState, use } from "react";
import Image from "next/image";
import { useTranslation } from "../../i18n/client";
import { IoTimeOutline, IoPersonOutline } from "react-icons/io5";
import styles from "./blog.module.scss";
import type { CustomTypeOptions } from "../../i18n/types";

type BlogPost =
  CustomTypeOptions["resources"]["common"]["blog_page"]["posts"][number];

export default function BlogPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: t("blog_page.categories.all") },
    { id: "development", label: t("blog_page.categories.development") },
    { id: "technology", label: t("blog_page.categories.technology") },
    { id: "design", label: t("blog_page.categories.design") },
    { id: "culture", label: t("blog_page.categories.culture") },
  ];

  const posts = t<BlogPost[]>("blog_page.posts", {
    returnObjects: true,
  });

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("blog_page.title")}</h1>
        <p>{t("blog_page.subtitle")}</p>
      </section>

      <section className={styles.content}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredPosts.map((post, index) => (
            <article key={index} className={styles.post}>
              <div className={styles.thumbnail}>
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.readTime}>
                    <IoTimeOutline />
                    {post.readTime}
                  </span>
                  <span className={styles.author}>
                    <IoPersonOutline />
                    {post.author}
                  </span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.tags}>
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
