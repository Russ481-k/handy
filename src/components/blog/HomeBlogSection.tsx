"use client";

import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import styles from "@/styles/modules/HomeBlogSection.module.scss";
import { BlogCard } from "./BlogCard";

interface HomeBlogSectionProps {
  posts: BlogPost[];
  title: string;
}

export function HomeBlogSection({ posts, title }: HomeBlogSectionProps) {
  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>
            최신 기술 트렌드와 인사이트를 공유합니다.
          </p>
        </motion.div>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={styles.article}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
