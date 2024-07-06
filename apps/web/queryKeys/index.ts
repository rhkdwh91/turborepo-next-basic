import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

import postsKeys, { infinityPostskeys } from "./postsKeys";
import tagsKeys from "./tagKeys";
import categoryKey from "./categoryKey";
import profileKeys from "./profileKeys";
import userKeys from "./userKeys";
import authorKeys from "./authorKey";
import writerApplicationKeys from "./writerApplicationKeys";

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
          staleTime: Infinity,
          gcTime: Infinity,
        },
      },
    }),
);
export const queryKeys = mergeQueryKeys(
  postsKeys,
  infinityPostskeys,
  tagsKeys,
  categoryKey,
  profileKeys,
  userKeys,
  authorKeys,
  writerApplicationKeys,
);
