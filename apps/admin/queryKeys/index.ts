import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import userKeys from "./userKeys";
import tagKeys from "@/queryKeys/tagKeys";
import categoryKey from "@/queryKeys/categoryKey";
import writerApplicationKeys from "@/queryKeys/writerApplicationKeys";

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
  userKeys,
  tagKeys,
  categoryKey,
  writerApplicationKeys,
);
