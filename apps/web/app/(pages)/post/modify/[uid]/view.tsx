"use client";

import { useState, MouseEvent, ChangeEvent } from "react";
import { Editor, EditorState } from "kyz-editor";
import { Input, Button, Tag, Box } from "@chakra-ui/react";
import usePostMutation from "hooks/mutation/usePostMutation";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import { redirect } from "next/navigation";
import useS3ImageEditor from "hooks/useS3ImageEditor";
import { useSession } from "next-auth/react";
import { Tag as ITag } from "types/tag";
import { cloneDeep } from "lodash";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

interface ViewProps {
  uid: number;
}

export default function View({ uid }: ViewProps) {
  const { data: session } = useSession();
  const { data } = useQuery({
    ...queryKeys.posts.detail(uid),
    staleTime: Infinity,
  });
  const { data: tags } = useQuery({
    ...queryKeys.tags.list(),
    staleTime: Infinity,
  });
  if (!data) {
    redirect("/");
  }
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState<string>(data.content);
  const { modifyPostMutation } = usePostMutation();
  const { fileRef, handleImage, insertImageEditor } = useS3ImageEditor();
  const [formTags, setFormTags] = useState<ITag[]>(data.tags ?? []);

  const handleChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    setContent(JSON.stringify(editorStateJSON));
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClickTag = (tag: ITag) => {
    const newFormTags = cloneDeep(formTags);
    if (formTags.find((formTags) => formTags.name === tag.name)) {
      return setFormTags(
        cloneDeep(newFormTags.filter((formTags) => formTags.name !== tag.name)),
      );
    }
    newFormTags.push(tag);
    setFormTags(newFormTags);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!modifyPostMutation.isPending && session?.user) {
      modifyPostMutation.mutate({
        uid,
        title,
        content,
        tags: formTags,
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
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          {tags?.map((tag) => (
            <Tag
              key={tag.name}
              cursor="pointer"
              colorScheme={
                formTags.find((formTags) => formTags.name === tag.name)
                  ? "teal"
                  : "gray"
              }
              onClick={() => handleClickTag(tag)}
            >
              {tag.value}
            </Tag>
          ))}
        </Box>
        <Editor
          placeholder={<Placeholder />}
          onChange={handleChange}
          initialEditorState={content}
          insertImage={insertImageEditor}
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
