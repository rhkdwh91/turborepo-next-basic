"use client";

import styles from "./page.module.css";
import TextEditor from "@/components/ui/organism/TextEditor";

export default function Page() {
  return (
    <main className={styles.main}>
      <TextEditor />
    </main>
  );
}
