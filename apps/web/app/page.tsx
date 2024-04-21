"use client"

import { useState } from "react";
import { Editor, initialState, EditorState } from "kyz-editor";
import styles from "./page.module.css";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <table>
        <thead>
          <tr>
            <td>no</td><td>title</td><td>name</td><td>date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td><td>testtest</td><td>admin</td><td>2024.04.21</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
