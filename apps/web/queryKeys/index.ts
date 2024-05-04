import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

import postsKeys from "./postsKeys";
import tagsKeys from "./tagKeys";

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
        },
      },
    }),
);
export const queryKeys = mergeQueryKeys(postsKeys, tagsKeys);
