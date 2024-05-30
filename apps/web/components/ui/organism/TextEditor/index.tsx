import styles from "@/app/(pages)/post/modify/[uid]/page.module.css";
import { Box, Button, Input, Tag } from "@chakra-ui/react";
import { Editor, EditorState, initialState } from "kyz-editor";
import { ChangeEvent, MouseEvent, useState } from "react";
import usePostMutation from "@/hooks/mutation/usePostMutation";
import useS3ImageEditor from "@/hooks/useS3ImageEditor";
import { Tag as ITag } from "@/types/tag";
import { cloneDeep } from "lodash";
import { Post } from "types/post";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";

interface TextEditorProps {
  uid?: number;
  data?: Post;
}

export default function TextEditor({ uid, data }: TextEditorProps) {
  const { data: session } = useSession();
  const { data: tags } = useQuery({
    ...queryKeys.tags.list(),
    staleTime: Infinity,
  });
  const [title, setTitle] = useState(data?.title ?? "");
  const [content, setContent] = useState<string>(data?.content ?? initialState);
  const { createPostMutation, modifyPostMutation } = usePostMutation();
  const { fileRef, handleImage, insertImageEditor } = useS3ImageEditor();
  const [formTags, setFormTags] = useState<ITag[]>(data?.tags ?? []);

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
    if (uid && !modifyPostMutation.isPending && session?.user) {
      return modifyPostMutation.mutate({
        uid,
        title,
        content,
        tags: formTags,
      });
    }
    if (!uid && !createPostMutation.isPending && session?.user) {
      createPostMutation.mutate({
        uid,
        title,
        content,
        tags: formTags,
      });
    }
  };
  return (
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
        placeholder={
          <div className="editor-placeholder">Enter some rich text...</div>
        }
        onChange={handleChange}
        initialEditorState={content}
        insertImage={insertImageEditor}
        editable
      />
      <Button onClick={handleSubmit} isDisabled={modifyPostMutation.isPending}>
        수정
      </Button>
    </div>
  );
}
