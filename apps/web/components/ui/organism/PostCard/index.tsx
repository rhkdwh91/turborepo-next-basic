import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/src/components/organism/Card";
import { useRouter } from "next/navigation";
import { MouseEvent, useMemo } from "react";
import { Post } from "@/types/post";
import ProfileImage from "@ui/src/components/atom/ProfileImage";

interface PostCardProps {
  post: Post;
}

export default function Index({ post }: PostCardProps) {
  const router = useRouter();
  const content = useMemo(() => {
    const parseContent = JSON.parse(post.content);
    const rootChildrenText =
      parseContent.root.children[0]?.children[0]?.text ??
      "" + parseContent.root.children[1]?.children[0]?.text ??
      "";
    if (rootChildrenText) {
      return String(rootChildrenText);
    }
    return "";
  }, [post]);

  const createAt = useMemo(() => {
    return post.createAt.split("T")[0];
  }, [post]);

  const handleClickPost = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    router.push(`/post/${post.uid}`);
  };

  const handleClickProfile = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    username?: string,
  ) => {
    e.stopPropagation();
    if (username) {
      router.push(`/author/${username}`);
    }
  };
  return (
    <Card className="cursor-pointer" onClick={handleClickPost}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{content}...</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {post.tags?.map((tag) => <span key={tag.name}>{tag.value}</span>)}
        </p>
      </CardContent>
      <CardFooter>
        <p>
          <div
            className="flex items-center"
            onClick={(e) => handleClickProfile(e, post.user?.username)}
          >
            <ProfileImage src={post.user?.profileImage ?? ""} />
            <span>{post.user?.username}</span>
          </div>
          <span>{post.postView?.count ?? 0} Views</span>
          <span>{createAt} createdAt</span>
        </p>
      </CardFooter>
    </Card>
  );
}
