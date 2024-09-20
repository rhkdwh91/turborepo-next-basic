import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

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
