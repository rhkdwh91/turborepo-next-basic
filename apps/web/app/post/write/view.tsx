"use client";

import { useState, MouseEvent, ChangeEvent } from "react";
import { Editor, initialState, EditorState } from "kyz-editor";
import { Input, Button } from "@chakra-ui/react";
import usePostMutation from "hooks/mutation/usePostMutation";
import styles from "./page.module.css";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Page(): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>(initialState);
  const { createPostMutation } = usePostMutation();

  const handleChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    setContent(JSON.stringify(editorStateJSON));
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!createPostMutation.isPending) {
      createPostMutation.mutate({
        title,
        content,
        tag: "",
        userName: "admin",
      });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <Input
          placeholder="title"
          size="lg"
          marginY={4}
          textColor="white"
          value={title}
          onChange={handleChangeTitle}
        />
        <Editor
          placeholder={<Placeholder />}
          onChange={handleChange}
          initialEditorState={content}
          editable
        />
        <Button onClick={handleSubmit}>저장</Button>
      </div>
    </main>
  );
}
