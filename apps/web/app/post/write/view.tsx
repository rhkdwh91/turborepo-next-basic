"use client";

import { useState, MouseEvent, ChangeEvent } from "react";
import { Editor, initialState, EditorState } from "kyz-editor";
import { Input, Button } from "@chakra-ui/react";
import usePostMutation from "hooks/mutation/usePostMutation";
import useS3ImageEditor from "hooks/useS3ImageEditor";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Page(): JSX.Element {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>(initialState);
  const { createPostMutation } = usePostMutation();
  const { fileRef, handleImage, insertImageEditor } = useS3ImageEditor();

  const handleChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    setContent(JSON.stringify(editorStateJSON));
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!createPostMutation.isPending && session?.user) {
      createPostMutation.mutate({
        title,
        content,
        tags: "",
        username: session.user.username,
      });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <input
          ref={fileRef}
          type="file"
          name="user_file"
          accept="image/*"
          onChange={handleImage}
          style={{ display: "none" }}
        />
        <Input
          placeholder="title"
          size="lg"
          marginY={4}
          value={title}
          onChange={handleChangeTitle}
        />
        <Editor
          placeholder={<Placeholder />}
          onChange={handleChange}
          initialEditorState={content}
          insertImage={insertImageEditor}
          editable
        />
        <Button
          onClick={handleSubmit}
          isDisabled={createPostMutation.isPending}
        >
          저장
        </Button>
      </div>
    </main>
  );
}
