import styles from "@/app/(pages)/post/modify/[uid]/page.module.css";
import { Button } from "@ui/src/components/atom/Button";
import { Editor, EditorState, initialState } from "kyz-editor";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useSavePostMutation } from "@/hooks/service/mutations/usePostMutation";
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

export default function LexicalEditor({ uid, data }: TextEditorProps) {
  const { data: session } = useSession();
  const { data: tags } = useQuery({
    ...queryKeys.tags.list(),
    staleTime: Infinity,
  });
  const [title, setTitle] = useState(data?.title ?? "");
  const [content, setContent] = useState<string>(data?.content ?? initialState);
  const savePostMutation = useSavePostMutation(uid);
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
    if (!savePostMutation.isPending && session?.user) {
      return savePostMutation.mutate({
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
      <input placeholder="title" value={title} onChange={handleChangeTitle} />
      <div>
        {tags?.map((tag) => (
          <span key={tag.name} onClick={() => handleClickTag(tag)}>
            {tag.value}
          </span>
        ))}
      </div>
      <Editor
        placeholder={
          <div className="editor-placeholder">Enter some rich text...</div>
        }
        onChange={handleChange}
        initialEditorState={content}
        insertImage={insertImageEditor}
        editable
      />
      <Button onClick={handleSubmit} disabled={savePostMutation.isPending}>
        {uid ? "수정" : "생성"}
      </Button>
    </div>
  );
}
