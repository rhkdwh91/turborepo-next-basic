import { Button } from "@ui/src/components/atom/Button";
import { Input } from "@ui/src/components/atom/Input";
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
import clsx from "clsx";

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
    <div className="w-[600px] mx-auto min-h-screen">
      <Input
        ref={fileRef}
        type="file"
        name="user_file"
        accept="image/*"
        onChange={handleImage}
        style={{ display: "none" }}
      />
      <Input placeholder="title" value={title} onChange={handleChangeTitle} />
      <div className="flex justify-center gap-2 flex-nowrap mt-4">
        {tags?.map((tag) => (
          <span
            className={clsx(
              "border-2 border-zinc-800 border-solid py-1 px-2 rounded cursor-pointer",
              {
                "bg-rose-900": formTags.find(
                  (formTag) => formTag.value === tag.value,
                ),
              },
            )}
            key={tag.name}
            onClick={() => handleClickTag(tag)}
          >
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
