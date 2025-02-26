"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../../../i18n/client";
import {
  IoTimeOutline,
  IoPersonOutline,
  IoArrowBack,
  IoShareSocialOutline,
} from "react-icons/io5";
import styles from "./blog-detail.module.scss";
import type { CustomTypeOptions } from "../../../i18n/types";

type BlogPost =
  CustomTypeOptions["resources"]["common"]["blog_page"]["posts"][number];

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ lng: string; slug: string }>;
}) {
  const { lng, slug } = use(params);
  const { t } = useTranslation(lng, "common");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const posts = t<BlogPost[]>("blog_page.posts", {
      returnObjects: true,
    });
    setPost(posts[0]);
    setRelatedPosts(posts.slice(1, 4));
  }, [t]);

  if (!post) return null;

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Link href={`/${lng}/blog`} className={styles.backLink}>
            <IoArrowBack />
            {t("blog_detail.back_to_blog")}
          </Link>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <IoTimeOutline className={styles.metaIcon} />
              {post.readTime}
            </span>
            <span className={styles.metaItem}>
              <IoPersonOutline className={styles.metaIcon} />
              {post.author}
            </span>
            <span className={styles.metaItem}>{post.date}</span>
          </div>
        </div>
      </div>

      <article className={styles.article}>
        <div className={styles.thumbnail}>
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={1200}
            height={600}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <p>{post.description}</p>
          {/* 여기에 실제 블로그 내용이 들어갑니다 */}
        </div>

        <div className={styles.tags}>
          <h3 className={styles.tagTitle}>{t("blog_detail.tags")}</h3>
          <div className={styles.tagList}>
            {post.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.share}>
          <button className={styles.shareButton}>
            <IoShareSocialOutline />
            {t("blog_detail.share")}
          </button>
        </div>
      </article>

      <section className={styles.relatedPosts}>
        <h2 className={styles.sectionTitle}>
          {t("blog_detail.related_posts")}
        </h2>
        <div className={styles.relatedGrid}>
          {relatedPosts.map((post, index) => (
            <div key={index} className={styles.relatedPost}>
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={400}
                height={200}
                className={styles.relatedImage}
              />
              <h3 className={styles.relatedTitle}>{post.title}</h3>
              <p className={styles.relatedDescription}>{post.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
