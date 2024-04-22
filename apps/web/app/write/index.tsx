"use client";

import { useState } from "react";
import { Editor, initialState, EditorState } from "kyz-editor";
import styles from "./page.module.css";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Page(): JSX.Element {
  const [editorState, setEditorState] = useState<string>(initialState);
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <main className={styles.main}>
      <Editor
        placeholder={<Placeholder />}
        onChange={onChange}
        initialEditorState={editorState}
      />
    </main>
  );
}
