import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import userKeys from "./userKeys";

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

export const queryKeys = mergeQueryKeys(userKeys);
