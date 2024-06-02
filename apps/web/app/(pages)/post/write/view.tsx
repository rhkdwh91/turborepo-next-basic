"use client";

import styles from "./page.module.css";
import LexicalEditor from "components/ui/organism/LexicalEditor";

export default function Page() {
  return (
    <main className={styles.main}>
      <LexicalEditor />
    </main>
  );
}
