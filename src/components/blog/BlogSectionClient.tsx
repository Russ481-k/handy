"use client";

import { useState } from "react";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";
import { BlogPost } from "@/types/blog";
import styles from "@/styles/modules/blog.module.scss";

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
  // 이미지 오류 상태를 추적하기 위한 상태 배열
  const [imageErrors, setImageErrors] = useState<boolean[]>(
    Array(posts.length).fill(false)
  );

  // 이미지 오류 처리 함수
  const handleImageError = (index: number) => {
    const newImageErrors = [...imageErrors];
    newImageErrors[index] = true;
    setImageErrors(newImageErrors);
  };

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
          {filteredPosts.map((post) => {
            // 원래 posts 배열에서의 index 찾기
            const originalIndex = posts.findIndex((p) => p.id === post.id);
            const showFallbackImage =
              imageErrors[originalIndex] ||
              !post.thumbnail ||
              post.thumbnail === "";

            return (
              <article key={post.id} className={styles.post}>
                <div className={styles.thumbnail}>
                  {showFallbackImage ? (
                    <div className={styles.fallbackImage}>
                      <span>{post.title.charAt(0)}</span>
                    </div>
                  ) : (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={600}
                      height={400}
                      className={styles.image}
                      onError={() => handleImageError(originalIndex)}
                    />
                  )}
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.date}>{post.date}</span>
                    <span className={styles.readTime}>
                      <IoTimeOutline />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postDescription}>{post.excerpt}</p>
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.postTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
