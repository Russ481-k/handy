"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </section>

      <section className={styles.content}>
        <motion.div
          className={styles.categories}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
        </motion.div>

        <div className={styles.grid}>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
