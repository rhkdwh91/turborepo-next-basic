"use client";

import { useState, MouseEvent, ChangeEvent } from "react";
import { Editor, EditorState } from "kyz-editor";
import { Input, Button } from "@chakra-ui/react";
import usePostMutation from "hooks/mutation/usePostMutation";
import styles from "./page.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import { Post } from "types/post";
import { redirect } from "next/navigation";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

interface ViewProps {
  uid: number;
}

export default function View({ uid }: ViewProps) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Post>(
    queryKeys.posts.detail(uid).queryKey,
  );
  if (!data) {
    redirect("/");
  }
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState<string>(data.content);
  const { modifyPostMutation } = usePostMutation();

  const handleChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    setContent(JSON.stringify(editorStateJSON));
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!modifyPostMutation.isPending) {
      modifyPostMutation.mutate({
        uid,
        title,
        content,
        tag: "",
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
          value={title}
          onChange={handleChangeTitle}
        />
        <Editor
          placeholder={<Placeholder />}
          onChange={handleChange}
          initialEditorState={content}
          editable
        />
        <Button
          onClick={handleSubmit}
          isDisabled={modifyPostMutation.isPending}
        >
          수정
        </Button>
      </div>
    </main>
  );
}
