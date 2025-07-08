"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import styles from "@/styles/modules/blog.module.scss";
import { BlogCard } from "./BlogCard";
import { Wave } from "../common/Wave";

interface BlogSectionClientProps {
  posts: BlogPost[];
  titles: {
    title: string;
    description: string;
  };
}

export function BlogSectionClient({ posts, titles }: BlogSectionClientProps) {
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 className={styles.title}>{titles.title}</motion.h2>
          <motion.p className={styles.description}>
            {titles.description}
          </motion.p>
        </div>

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

        <motion.div className={styles.grid}>
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id || index} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
