import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

import postsKeys from "./postsKeys";
import tagsKeys from "./tagKeys";
import profileKeys from "./profileKeys";

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
export const queryKeys = mergeQueryKeys(postsKeys, tagsKeys, profileKeys);
