"use client";

import { useState } from "react";
import { BlogPost } from "@/types/blog";
import styles from "@/styles/modules/blog.module.scss";
import { BlogCard } from "./BlogCard";

interface BlogSectionClientProps {
  posts: BlogPost[];
  title: string;
  subtitle: string;
}

export function BlogSectionClient({
  posts,
  title,
  subtitle,
}: BlogSectionClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "전체" },
    { id: "development", label: "개발" },
    { id: "technology", label: "기술" },
    { id: "design", label: "디자인" },
    { id: "culture", label: "문화" },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
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
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
