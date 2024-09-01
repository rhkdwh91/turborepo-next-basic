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
import dayjs from "dayjs";
import { Badge } from "@ui/src/components/atom/Badge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
          {post.tags?.map((tag) => (
            <Badge variant="outline" key={tag.name}>
              {tag.value}
            </Badge>
          ))}
        </p>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div
            className="flex items-center"
            onClick={(e) => handleClickProfile(e, post.user?.username)}
          >
            <ProfileImage src={post.user?.profileImage ?? ""} />
            <span>{post.user?.username}</span>
          </div>
          <div className="flex items-center gap-6 justify-between mt-5 pt-5 border-t border-gray-700 w-full">
            <span>{post.postView?.count ?? 0} Views</span>
            <span>{dayjs(post.createAt).format("YYYY-MM-DD")} createdAt</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
