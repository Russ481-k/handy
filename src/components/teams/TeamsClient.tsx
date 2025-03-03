"use client";

import { motion } from "framer-motion";
import { Teams } from "@/types/section";
import styles from "@/styles/modules/teams.module.scss";
import { TeamCard } from "./TeamCard";

interface TeamsClientProps {
  teams: Teams[];
  titles: {
    about: string;
    mission: {
      title: string;
      description: string;
    };
    vision: {
      title: string;
      description: string;
    };
    team: string;
  };
  isPage?: boolean;
}

export function TeamsClient({
  teams,
  titles,
  isPage = false,
}: TeamsClientProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {titles.about}
        </motion.h2>

        <motion.div
          className={styles.info}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div className={styles.infoBox}>
            <motion.h3>{titles.mission.title}</motion.h3>
            <motion.p>{titles.mission.description}</motion.p>
          </motion.div>
          <motion.div className={styles.infoBox}>
            <motion.h3>{titles.vision.title}</motion.h3>
            <motion.p>{titles.vision.description}</motion.p>
          </motion.div>
        </motion.div>

        <motion.div className={styles.team}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {titles.team}
          </motion.h3>

          <motion.div className={styles.grid}>
            {teams.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={styles.cardWrapper}
              >
                <TeamCard
                  member={member}
                  className={isPage ? styles.pageCard : ""}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
