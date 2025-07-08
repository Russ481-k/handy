"use client";

import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import styles from "@/styles/modules/contact.module.scss";
import { Hero } from "@/components/hero/Hero";
import { WavySection } from "@/components/common/WavySection";
import { Wave } from "@/components/common/Wave";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "common");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    try {
      // Here you would typically send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className={styles.main}>
      <Hero
        title={t("contact_page.title")}
        description={t("contact_page.description")}
      />
      <Wave />
      <section className={styles.content}>
        <div className={styles.contactInfo}>
          <h2>{t("contact_page.contact_info.title")}</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <IoLocationOutline />
              <h3>{t("contact_page.contact_info.address.title")}</h3>
              <p>{t("contact_page.contact_info.address.value")}</p>
            </div>
            <div className={styles.infoItem}>
              <IoMailOutline />
              <h3>{t("contact_page.contact_info.email.title")}</h3>
              <p>{t("contact_page.contact_info.email.value")}</p>
            </div>
            <div className={styles.infoItem}>
              <IoCallOutline />
              <h3>{t("contact_page.contact_info.phone.title")}</h3>
              <p>{t("contact_page.contact_info.phone.value")}</p>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("contact_page.form.name")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("contact_page.form.email")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t("contact_page.form.subject")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contact_page.form.message")}
              required
              rows={6}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {t("contact_page.form.submit")}
          </button>
          {status === "success" && (
            <p className={styles.success}>{t("contact_page.form.success")}</p>
          )}
          {status === "error" && (
            <p className={styles.error}>{t("contact_page.form.error")}</p>
          )}
        </form>
      </section>
    </main>
  );
}
