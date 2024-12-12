import { useRef, useCallback } from "react";

interface InfiniteScrollProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const useInfiniteScroll = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fetchNextPage();
            }
          });
        },
        { threshold: 0.7 },
      );
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return [lastElementRef];
};

export default useInfiniteScroll;
